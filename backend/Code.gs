/**
 * ReflectSpend v1.0 — Google Apps Script Backend API
 * 
 * Skrip ini dipasang di Google Sheets (Extensions -> Apps Script)
 * untuk menerima dan mengirim data transaksi dari/ke frontend index.html secara real-time.
 */

// Konfigurasi Nama Sheet
const SHEETS = {
  TRANSACTIONS: 'Transactions',
  REFLECTIONS: 'Weekly_Reflections',
  DASHBOARD: 'Dashboard',
  CATEGORIES: 'Categories',
  EMOTIONS: 'Emotions'
};

/**
 * HTTP GET Handler: Mengambil data transaksi & insight
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const txSheet = ss.getSheetByName(SHEETS.TRANSACTIONS);
    const data = txSheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return responseJSON({ success: true, transactions: [] });
    }

    const headers = data[0];
    const transactions = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue; // Skip baris kosong

      let item = {};
      headers.forEach((h, index) => {
        item[h] = row[index];
      });
      transactions.push(item);
    }

    // Urutkan dari transaksi terbaru
    transactions.reverse();

    return responseJSON({
      success: true,
      count: transactions.length,
      transactions: transactions
    });

  } catch (error) {
    return responseJSON({ success: false, error: error.toString() });
  }
}

/**
 * HTTP POST Handler: Menyimpan transaksi baru dari frontend web
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (requestData.action === 'add_transaction') {
      const txSheet = ss.getSheetByName(SHEETS.TRANSACTIONS);
      const nextId = txSheet.getLastRow();

      const tanggal = requestData.tanggal || new Date().toISOString().split('T')[0];
      const jenis = requestData.jenis || 'Pengeluaran';
      const nominal = parseInt(requestData.nominal) || 0;
      const kategori = requestData.kategori || 'Lainnya';
      const metode = requestData.metode || 'QRIS';
      const emosi = requestData.emosi || '';
      const skala = parseInt(requestData.skala) || '';
      const direncanakan = requestData.direncanakan || 'Ya';
      const pemicu = requestData.pemicu || '';
      const beliLagi = requestData.akan_beli_lagi || '';
      const jurnal = requestData.jurnal || '';

      // Hitung Kolom Bantu
      const emosiDisplay = getEmosiDisplay(emosi);
      const bulan = tanggal.substring(0, 7); // YYYY-MM
      const minggu = getISOWeekString(new Date(tanggal));

      // Append baris baru ke sheet Transactions
      txSheet.appendRow([
        nextId,
        tanggal,
        jenis,
        nominal,
        kategori,
        metode,
        emosi,
        skala,
        direncanakan,
        pemicu,
        beliLagi,
        jurnal,
        emosiDisplay,
        bulan,
        minggu
      ]);

      return responseJSON({
        success: true,
        message: 'Transaksi berhasil disimpan ke Google Sheets!',
        id: nextId
      });
    }

    if (requestData.action === 'add_reflection') {
      const refSheet = ss.getSheetByName(SHEETS.REFLECTIONS);
      refSheet.appendRow([
        requestData.week || '',
        new Date().toISOString().split('T')[0],
        requestData.q1 || '',
        requestData.q2 || '',
        requestData.q3 || '',
        requestData.q4 || '',
        requestData.q5 || '',
        requestData.q6 || ''
      ]);

      return responseJSON({
        success: true,
        message: 'Refleksi mingguan berhasil disimpan!'
      });
    }

    return responseJSON({ success: false, error: 'Aksi tidak dikenal.' });

  } catch (error) {
    return responseJSON({ success: false, error: error.toString() });
  }
}

/**
 * Helper JSON Response Format dengan CORS Headers
 */
function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper Format Emoji Indicator
 */
function getEmosiDisplay(emosi) {
  switch (emosi) {
    case 'Stres': return '🔴 Stres';
    case 'Bosan': return '⚪ Bosan';
    case 'Senang': return '🟡 Senang';
    case 'Puas': return '🟢 Puas';
    case 'Cemas': return '🟠 Cemas';
    case 'Sedih': return '🟣 Sedih';
    default: return '';
  }
}

/**
 * Helper ISO Week Calculator
 */
function getISOWeekString(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return d.getUTCFullYear() + "-W" + (weekNo < 10 ? "0" + weekNo : weekNo);
}
