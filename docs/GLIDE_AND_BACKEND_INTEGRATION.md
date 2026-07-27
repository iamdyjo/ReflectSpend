# ReflectSpend — Panduan Integrasi Frontend & Backend v1.0

Dokumen ini menjelaskan cara menghubungkan antarmuka frontend **ReflectSpend** (`index.html` / Glide App) dengan **Database Google Sheets**.

 Terdapat dua opsi integrasi yang didukung:
1. **Opsi A (Recommended for Glide)**: Integrasi Native Glide App + Google Sheets (Zero-Code).
2. **Opsi B (Recommended for Web App)**: Integrasi Standalone Web App (`index.html`) + Google Apps Script Web App API.

---

## 📱 Opsi A: Integrasi Native Glide App + Google Sheets (Zero-Code)

Jika Anda menggunakan **Glide App** sebagai antarmuka utama:

1. Buka [GlideApps.com](https://www.glideapps.com) dan buat akun/login.
2. Klik **New App** → Pilih Data Source: **Google Sheets**.
3. Pilih file spreadsheet **`ReflectSpend_Database`** yang telah dibuat dari langkah setup database.
4. Glide secara otomatis mendeteksi 7 tabel (`Transactions`, `Weekly_Reflections`, `Dashboard`, `Categories`, `Emotions`, `Payment_Methods`, `Triggers`).
5. **Konfigurasi Form Input di Glide**:
   * Tambahkan Komponen Form pada FAB `+`.
   * Hubungkan Pilihan Kategori ke Sheet `Categories`.
   * Hubungkan Choice Chip Emosi ke Sheet `Emotions`.
   * Hubungkan Slider Skala Intensitas ke kolom `Skala_Emosi` (1–10).
6. **Selesai**: Setiap transaksi yang diisi melalui Glide akan langsung tersinkronisasi real-time ke Google Sheets tanpa perlu koding backend tambahan.

---

## 🌐 Opsi B: Integrasi Standalone Web App (`index.html` + Apps Script API)

Jika Anda menggunakan antarmuka web kustom [index.html](file:///c:/Users/dyjo/Desktop/ReflectSpend/index.html):

### Langkah 1: Pasang Google Apps Script Backend (1 Menit)
1. Buka spreadsheet **`ReflectSpend_Database`** di Google Sheets.
2. Klik menu **Ekstensi (Extensions)** → **Apps Script**.
3. Hapus semua kode default, lalu salin dan tempelkan kode dari file **[backend/Code.gs](file:///c:/Users/dyjo/Desktop/ReflectSpend/backend/Code.gs)**.
4. Klik ikon **Simpan (Save)** 💾.

### Langkah 2: Deploy sebagai Web App API
1. Di halaman Apps Script, klik tombol **Deploy** (Terapkan) di kanan atas → **New deployment** (Terapkan baru).
2. Pilih tipe: **Web app**.
3. Konfigurasi:
   * **Description**: `ReflectSpend API v1.0`
   * **Execute as**: `Me` (Akun Anda)
   * **Who has access**: `Anyone` (Siapa saja) — *diperlukan agar frontend web dapat mengirim data via HTTP POST*.
4. Klik **Deploy** dan berikan izin autentikasi Google jika diminta.
5. Salin **Web App URL** yang dihasilkan (contoh: `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Langkah 3: Masukkan API Endpoint ke Frontend (`index.html`)

Buka file `index.html` dan perbarui konstanta `GOOGLE_SCRIPT_URL` pada bagian script Javascript:

```javascript
// Ganti URL berikut dengan Web App URL hasil deployment Anda
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```

---

## ⚡ Fitur Hybrid Offline/Online (`localStorage` Fallback)

Antarmuka `index.html` dilengkapi dengan mekanisme **Hybrid Storage**:
* **Jika Web App API terpasang**: Data transaksi baru otomatis dikirim ke Google Sheets via HTTP POST.
* **Jika Offline / URL belum diisi**: Data tetap tersimpan dengan aman secara lokal di browser (`localStorage`), sehingga aplikasi dapat digunakan kapan saja tanpa penundaan.
* **Indicator Status**: Menampilkan toast konfirmasi instan saat transaksi tersimpan.
