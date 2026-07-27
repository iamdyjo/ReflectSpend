# ReflectSpend — Panduan Setup Database Google Sheets v1.0

Dokumen ini berisi panduan langkah demi langkah untuk membuat dan mengonfigurasi **Database Google Sheets** yang terhubung langsung dengan **Glide App** atau antarmuka frontend ReflectSpend.

---

## 📋 Ringkasan Struktur Sheet

Database ReflectSpend terdiri dari **7 Sheet utama**:

| No | Nama Sheet | Fungsi Utama |
|---|---|---|
| 1 | `Transactions` | Menyimpan data mentah seluruh pengeluaran, pemasukan, dan transfer. |
| 2 | `Weekly_Reflections` | Menyimpan jawaban refleksi evaluasi mingguan pengguna. |
| 3 | `Dashboard` | Berisi formula kalkulasi agregat & insight naratif otomatis. |
| 4 | `Categories` | Master data pilihan kategori (Pengeluaran & Pemasukan). |
| 5 | `Emotions` | Master data 6 emosi (`Senang`, `Puas`, `Stres`, `Cemas`, `Sedih`, `Bosan`) + formula frekuensi. |
| 6 | `Payment_Methods` | Master data metode pembayaran (`QRIS`, `Cash`, `GoPay`, `BCA`, dll). |
| 7 | `Triggers` | Master data pemicu transaksi impulsif. |

---

## 🛠️ Langkah Demi Langkah (Setup 5 Menit)

### Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com) di browser.
2. Buat Spreadsheet kosong baru dan beri nama: **`ReflectSpend_Database`**.

### Langkah 2: Impor Seluruh Berkas CSV
Di folder [database/](file:///c:/Users/dyjo/Desktop/ReflectSpend/database/), telah disiapkan 7 berkas CSV template:
* `1_Transactions.csv`
* `2_Weekly_Reflections.csv`
* `3_Dashboard.csv`
* `4_Categories.csv`
* `5_Emotions.csv`
* `6_Payment_Methods.csv`
* `7_Triggers.csv`

**Cara Impor ke Google Sheets:**
1. Klik menu **File** → **Impor (Import)**.
2. Pilih tab **Unggah (Upload)** dan drag & drop berkas `1_Transactions.csv`.
3. Pada opsi impor:
   * Lokasi Impor: *Gantikan sheet saat ini* atau *Buat sheet baru*.
   * Tipe pemisah: *Otomatis terdeteksi*.
4. Ulangi langkah di atas untuk 6 berkas CSV sisanya hingga terdapat 7 sheet dengan nama:
   `Transactions`, `Weekly_Reflections`, `Dashboard`, `Categories`, `Emotions`, `Payment_Methods`, dan `Triggers`.

---

## 📑 Spesifikasi Kolom Bantu & Formula Google Sheets

### 1. Sheet `Transactions` (Kolom M, N, O)

Gunakan formula berikut pada baris ke-2 (lalu drag down / gunakan `ARRAYFORMULA`):

* **Kolom M (`Emosi_Display`)**:
  ```excel
  =IF(G2="","",IF(G2="Stres","🔴 Stres",IF(G2="Bosan","⚪ Bosan",IF(G2="Senang","🟡 Senang",IF(G2="Puas","🟢 Puas",IF(G2="Cemas","🟠 Cemas",IF(G2="Sedih","🟣 Sedih","")))))))
  ```
* **Kolom N (`Bulan`)**:
  ```excel
  =IF(B2="","",TEXT(B2,"YYYY-MM"))
  ```
* **Kolom O (`Minggu`)**:
  ```excel
  =IF(B2="","",TEXT(B2,"YYYY")&"-W"&TEXT(ISOWEEKNUM(B2),"00"))
  ```

---

### 2. Sheet `Dashboard` (Agregat & Insight)

Tempelkan formula berikut pada sel terkait di Sheet `Dashboard`:

* **Total Pengeluaran Bulan Ini**:
  ```excel
  =SUMIFS(Transactions!D:D, Transactions!C:C, "Pengeluaran", Transactions!B:B, ">="&EOMONTH(TODAY(),-1)+1, Transactions!B:B, "<="&EOMONTH(TODAY(),0))
  ```

* **Total Pemasukan Bulan Ini**:
  ```excel
  =SUMIFS(Transactions!D:D, Transactions!C:C, "Pemasukan", Transactions!B:B, ">="&EOMONTH(TODAY(),-1)+1, Transactions!B:B, "<="&EOMONTH(TODAY(),0))
  ```

* **Rata-rata Nominal saat Stres (Skala ≥8)**:
  ```excel
  =IFERROR(AVERAGEIFS(Transactions!D:D, Transactions!G:G, "Stres", Transactions!H:H, ">=8", Transactions!C:C, "Pengeluaran"), 0)
  ```

* **Persentase Transaksi Impulsif**:
  ```excel
  =IFERROR(COUNTIFS(Transactions!I:I,"Tidak",Transactions!C:C,"Pengeluaran")/COUNTIFS(Transactions!C:C,"Pengeluaran"), 0)
  ```

* **Insight Naratif Otomatis**:
  ```excel
  =IF(COUNTIFS(Transactions!C:C,"Pengeluaran")<15, "Catat "&(15-COUNTIFS(Transactions!C:C,"Pengeluaran"))&" transaksi lagi untuk melihat polamu.", TEXT(SUMIFS(Transactions!D:D,Transactions!G:G,"Stres",Transactions!C:C,"Pengeluaran")/SUMIFS(Transactions!D:D,Transactions!C:C,"Pengeluaran"),"0%")&" pengeluaranmu bulan ini terjadi saat merasa stres.")
  ```

---

## 🔗 Menghubungkan ke Glide App

1. Buka [GlideApps.com](https://www.glideapps.com) dan buat **New App**.
2. Pilih Data Source: **Google Sheets**.
3. Hubungkan Spreadsheet **`ReflectSpend_Database`**.
4. Glide akan otomatis mengenali 7 Sheet sebagai tabel terpisah.
5. Set pilihan (Choice Component) di Form Input Glide mengarah ke sheet `Categories`, `Emotions`, `Payment_Methods`, dan `Triggers`.

---

## 🛡️ Hak Akses & Keamanan
* Tetapkan privasi Spreadsheet sebagai **Private (Hanya Anda)**.
* Lakukan duplikasi/export backup manual secara berkala setiap akhir bulan.
