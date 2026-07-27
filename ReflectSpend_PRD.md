# PRD — ReflectSpend

**Aplikasi Pencatatan Keuangan & Refleksi Emosi Pribadi**

| Atribut | Keterangan |
|---|---|
| **Nama Produk** | ReflectSpend |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | _[isi tanggal]_ |
| **Owner** | _[isi nama]_ |
| **Status** | Ready for Development |
| **Tipe Proyek** | Personal use (single user) |
| **Platform** | Glide App (PWA) + Google Sheets |

---

## Daftar Isi

1. [Overview](#1-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Target User & Persona](#3-target-user--persona)
4. [Scope](#4-scope)
5. [User Flow](#5-user-flow)
6. [Functional Requirements](#6-functional-requirements)
7. [Data Structure](#7-data-structure-google-sheets)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [UI/UX Design Specification](#9-uiux-design-specification)
10. [Implementation Guide](#10-implementation-guide)
11. [Testing & Launch Checklist](#11-testing--launch-checklist)
12. [Roadmap Post-MVP](#12-roadmap-post-mvp)
13. [Risks & Assumptions](#13-risks--assumptions)
14. [Appendix](#14-appendix)

---

# 1. Overview

## 1.1 Deskripsi Produk

ReflectSpend adalah aplikasi pencatatan keuangan personal yang menghubungkan **transaksi finansial** dengan **kondisi emosional** penggunanya. Berbeda dengan aplikasi keuangan konvensional yang hanya menjawab pertanyaan *"ke mana uang saya pergi?"*, ReflectSpend dirancang untuk menjawab *"mengapa saya mengeluarkan uang itu?"*.

Aplikasi dibangun menggunakan **Glide** sebagai antarmuka input harian, dengan **Google Sheets** sebagai database sekaligus dashboard analisis mendalam.

## 1.2 Latar Belakang Masalah

Banyak orang sudah mencatat pengeluaran, tetapi tetap boros. Penyebabnya bukan kurangnya data, melainkan kurangnya pemahaman terhadap **pemicu perilaku**. Pengeluaran impulsif jarang murni rasional — biasanya dipicu oleh stres, kebosanan, promo, atau tekanan sosial.

Tanpa mencatat konteks emosional, pengguna hanya melihat angka tanpa pola, sehingga sulit melakukan perubahan yang bertahan.

## 1.3 Solusi yang Diusulkan

Menambahkan tiga lapisan data pada setiap pencatatan pengeluaran:

1. **Emosi** — apa yang dirasakan setelah transaksi (6 pilihan + skala 1–10)
2. **Intensionalitas** — apakah transaksi direncanakan atau tidak
3. **Pemicu & Refleksi** — apa penyebabnya, dan apakah pengguna menyesalinya

Data ini kemudian diolah menjadi insight yang menghubungkan emosi dengan pola pengeluaran.

## 1.4 Tujuan Utama

- Membantu pengguna memahami **mengapa** mereka terlalu boros
- Membangun **kesadaran** (mindfulness) saat hendak berbelanja
- Mengidentifikasi **pemicu emosional** dari pengeluaran yang tidak perlu
- Mendorong perubahan kebiasaan finansial melalui refleksi berkala

## 1.5 Value Proposition

> Aplikasi keuangan biasa mencatat **apa** yang kamu beli.  
> ReflectSpend mencatat **kenapa** kamu membelinya.

---

# 2. Goals & Success Metrics

## 2.1 Goals

| No | Goal |
|---|---|
| G1 | Pengguna berhasil mengidentifikasi minimal 1 pola emosi yang menyebabkan pengeluaran boros |
| G2 | Pengguna lebih sadar dan berpikir ulang sebelum melakukan transaksi impulsif |
| G3 | Pengguna memahami koneksi antara perasaan (stres/bosan) dan keputusan finansial |
| G4 | Pencatatan terasa cukup ringan sehingga dilakukan konsisten, bukan berhenti di minggu kedua |

## 2.2 Success Metrics

| Metrik | Target | Cara Ukur |
|---|---|---|
| **Konsistensi pencatatan** | ≥30 entri transaksi per bulan | `COUNT` baris di sheet `Transactions` |
| **Kelengkapan data emosi** | ≥80% transaksi pengeluaran punya emosi & skala | `COUNTIFS` non-blank / total pengeluaran |
| **Kebiasaan refleksi** | ≥1 refleksi mingguan per bulan | `COUNT` baris di `Weekly_Reflections` |
| **Kecepatan input** | <60 detik per transaksi | Uji manual dengan stopwatch |
| **Perubahan perilaku** | Turun 10–20% transaksi tidak direncanakan di bulan ke-3 | Bandingkan % impulsif bulan 1 vs bulan 3 |
| **Penurunan penyesalan** | Turun jumlah transaksi berlabel "Tidak akan beli lagi" | `COUNTIF` per bulan |

## 2.3 Anti-Goals

Hal-hal yang **bukan** tujuan aplikasi ini:

- Bukan aplikasi akuntansi presisi (tidak perlu balance sempurna sampai rupiah terakhir)
- Bukan aplikasi investasi atau perencanaan pensiun
- Bukan alat untuk merasa bersalah — rasa bersalah membuat orang berhenti mencatat

---

# 3. Target User & Persona

## 3.1 Target Pengguna

- Karyawan muda / fresh graduate
- Siapa pun yang ingin belajar mengelola keuangan dan memahami hubungan emosi dengan uang
- Rentang usia: 22–30 tahun

## 3.2 Persona Utama

**Rangga, 24 tahun — Karyawan Muda**

| Aspek | Detail |
|---|---|
| **Pekerjaan** | Staff di perusahaan swasta, gaji UMR+ |
| **Perilaku** | Sering makan di luar setelah pulang kerja, belanja online saat weekend |
| **Kondisi** | Bingung kenapa akhir bulan uang cepat habis padahal merasa tidak beli barang mahal |
| **Motivasi** | Ingin punya tabungan, tapi belum tahu harus mulai dari mana |
| **Hambatan** | Pernah pakai aplikasi keuangan, berhenti setelah 2 minggu karena terasa merepotkan |

## 3.3 Pain Points

| Pain Point | Dampak |
|---|---|
| Tidak tahu ke mana uangnya pergi | Tidak bisa membuat rencana perbaikan |
| Tidak sadar emosi memicu belanja | Pola yang sama terus berulang |
| Aplikasi keuangan terlalu kaku & fokus angka | Berhenti pakai setelah beberapa minggu |
| Merasa dihakimi oleh laporan pengeluaran | Menghindari membuka aplikasi |

## 3.4 User Needs

| Kebutuhan | Terjemahan ke Fitur |
|---|---|
| "Saya ingin tahu penyebab saya boros" | Pencatatan emosi + pemicu + insight |
| "Saya tidak mau ribet mencatat" | Form cepat <60 detik, field opsional collapsed |
| "Saya ingin lihat data lengkap sesekali" | Dashboard Google Sheets terpisah |
| "Saya tidak mau merasa gagal" | Microcopy netral, warna alarm dibatasi |

---

# 4. Scope

## 4.1 In Scope (MVP)

| Kode | Fitur | Prioritas |
|---|---|---|
| F1 | Tambah Transaksi (Pengeluaran / Pemasukan / Transfer) | P0 |
| F2 | Pencatatan Emosi + Skala 1–10 | P0 |
| F3 | Pencatatan Intensionalitas (direncanakan / tidak) | P0 |
| F4 | Riwayat Transaksi + Filter | P0 |
| F5 | Dashboard Ringkas di Glide | P0 |
| F6 | Detail & Edit Transaksi | P1 |
| F7 | Halaman Insight (pola emosi vs pengeluaran) | P1 |
| F8 | Refleksi Mingguan (6 pertanyaan) | P1 |
| F9 | Dashboard Analisis di Google Sheets | P1 |
| F10 | Pemicu transaksi & "Akan beli lagi?" | P2 |
| F11 | Jurnal teks bebas | P2 |

## 4.2 Out of Scope (Tidak di MVP)

- Login / multi-user account
- Sinkronisasi otomatis ke rekening bank atau e-wallet API
- Push notification / reminder
- Habit tracker dengan badge & reward
- Target tabungan & budgeting otomatis
- AI recommendation engine
- Export ke PDF
- Mode offline penuh
- Publikasi ke Play Store / App Store

## 4.3 Keputusan Arsitektur

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Platform builder | **Glide** | Tercepat untuk personal project, integrasi native dengan Google Sheets |
| Database | **Google Sheets** (primary storage) | Dashboard analisis mendalam bisa dibuat langsung, tidak perlu fitur export |
| Sinkronisasi | **Otomatis (real-time)** | Awalnya direncanakan manual export, diubah karena Sheets jadi database utama |
| Autentikasi | **Tidak ada** | Aplikasi personal, akses dibatasi lewat privasi Google Sheets |

---

# 5. User Flow

## 5.1 Alur Utama Aplikasi

```text
Buka ReflectSpend
        ↓
Beranda / Dashboard Ringkas
        ↓
Pilih aktivitas:
├── [+ Tambah Transaksi]
├── [Riwayat Transaksi]
├── [Insight Emosi]
└── [Refleksi Mingguan]
```

## 5.2 Flow: Mencatat Pengeluaran (Core Flow)

Ini adalah alur terpenting karena di sinilah data emosi dikumpulkan.

```text
Beranda → Tekan FAB "+"
  ↓
Pilih Jenis: Pengeluaran
  ↓
[BAGIAN A — Informasi Transaksi]
├── Nominal
├── Tanggal (default: hari ini)
├── Kategori
└── Metode Pembayaran
  ↓
[BAGIAN B — Emosi Setelah Transaksi]
├── Pilih emosi (6 opsi)
└── Skala intensitas 1–10
  ↓
[BAGIAN C — Intensionalitas]
└── Transaksi ini direncanakan? (Ya/Tidak)
  ↓
[BAGIAN D — Detail Tambahan (opsional, collapsed)]
├── Pemicu transaksi
├── Akan beli lagi?
└── Jurnal / catatan bebas
  ↓
Tekan Simpan
  ↓
Validasi field wajib
  ↓
Data tersimpan ke Google Sheets
  ↓
Toast konfirmasi + kembali ke Beranda
```

**Contoh pesan konfirmasi:**
> "Transaksi tersimpan. Pengeluaran Rp75.000 saat merasa stres (skala 8)."

## 5.3 Flow: Mencatat Pemasukan

Alur lebih pendek karena pemasukan tidak memerlukan refleksi emosi.

```text
Beranda → FAB "+" → Pilih Jenis: Pemasukan
  ↓
Nominal → Tanggal → Kategori Pemasukan → Metode Penerimaan
  ↓
Catatan (opsional)
  ↓
Simpan
```

> Section emosi **disembunyikan otomatis** saat jenis = Pemasukan.

## 5.4 Flow: Mencatat Transfer

Transfer adalah perpindahan dana antar-akun milik sendiri (contoh: Bank BCA → GoPay). Tidak boleh dihitung sebagai pemasukan maupun pengeluaran.

```text
Beranda → FAB "+" → Pilih Jenis: Transfer
  ↓
Nominal → Tanggal → Sumber Dana → Tujuan Dana
  ↓
Catatan (opsional)
  ↓
Simpan
```

> **Aturan perhitungan:** semua baris dengan `Jenis = Transfer` **dikecualikan** dari total pemasukan, total pengeluaran, dan seluruh analisis emosi.

## 5.5 Flow: Melihat Riwayat Transaksi

```text
Tab Riwayat
  ↓
Sistem menampilkan transaksi terbaru (dikelompokkan per hari)
  ↓
Pengguna dapat:
├── Mencari transaksi
├── Filter: Jenis / Kategori / Emosi / Tanggal
├── Buka detail transaksi
│     ├── Edit
│     └── Hapus (dengan konfirmasi)
└── Scroll untuk periode sebelumnya
```

## 5.6 Flow: Melihat Insight

```text
Tab Insight
  ↓
Cek jumlah data
  ├── Jika <15 transaksi pengeluaran → tampilkan progress empty state
  └── Jika ≥15 transaksi → lanjut
  ↓
Pilih periode: Minggu ini / Bulan ini / Custom
  ↓
Sistem menampilkan:
├── Insight naratif utama
├── Bar chart pengeluaran per emosi
├── Perbandingan rata-rata nominal
└── Statistik transaksi tidak direncanakan
  ↓
CTA: "Isi Refleksi Mingguan"
```

**Contoh insight yang dihasilkan:**

| Tipe | Contoh Kalimat |
|---|---|
| Emosi | "40% pengeluaranmu bulan ini terjadi saat merasa stres." |
| Nominal | "Rata-rata transaksi saat bosan Rp95.000, lebih tinggi dari rata-rata umum Rp63.000." |
| Impulsif | "70% transaksi tidak direncanakan dipicu oleh promo atau keinginan mendadak." |
| Kategori | "Saat cemas, pengeluaran terbesarmu ada di kategori Makanan & Minuman." |
| Penyesalan | "5 transaksi senilai Rp430.000 kamu tandai sebagai 'tidak akan dibeli lagi'." |

## 5.7 Flow: Refleksi Mingguan

```text
Tab Refleksi
  ↓
Sistem menampilkan ringkasan data minggu ini sebagai konteks
  ↓
Pertanyaan 1 dari 6 → jawab / lewati → Lanjut
  ↓
Pertanyaan 2 ... 6
  ↓
Layar penutup: menampilkan target minggu depan
  ↓
Simpan → data masuk ke sheet Weekly_Reflections
```

## 5.8 Diagram Ringkas

```text
[Beranda]
   │
   ├── [FAB +] Tambah Transaksi
   │      ├── Pengeluaran → Info → Emosi → Intensionalitas → Detail → Simpan
   │      ├── Pemasukan   → Info → Simpan
   │      └── Transfer    → Info → Sumber/Tujuan → Simpan
   │
   ├── [Tab Riwayat] → Filter → Detail → Edit / Hapus
   │
   ├── [Tab Insight] → Periode → Pola & Grafik → CTA Refleksi
   │
   └── [Tab Refleksi] → Ringkasan → 6 Pertanyaan → Simpan
                                          │
                                          ▼
                              [Google Sheets Dashboard]
                              Analisis mendalam & pivot
```

---

# 6. Functional Requirements

## F1. Tambah Transaksi

### Field Specification

| Field | Tipe | Wajib | Kondisi Tampil | Pilihan / Format |
|---|---|---|---|---|
| **Tanggal** | Date | Ya | Selalu | Default: hari ini |
| **Jenis** | Choice | Ya | Selalu | `Pengeluaran` / `Pemasukan` / `Transfer` |
| **Nominal** | Number | Ya | Selalu | Integer, tanpa desimal |
| **Kategori** | Choice | Ya | Selalu | Lihat §14.1 (berbeda per jenis) |
| **Metode Pembayaran** | Choice | Ya | Selalu | Lihat §14.2 |
| **Emosi** | Choice | Ya | `Jenis = Pengeluaran` | `Senang` / `Stres` / `Bosan` / `Sedih` / `Cemas` / `Puas` |
| **Skala Emosi** | Number 1–10 | Ya | `Jenis = Pengeluaran` | Slider, 1 = ringan, 10 = sangat kuat |
| **Direncanakan?** | Choice | Ya | `Jenis = Pengeluaran` | `Ya` / `Tidak` |
| **Pemicu** | Choice | Tidak | `Jenis = Pengeluaran` | Lihat §14.3 |
| **Akan Beli Lagi?** | Choice | Tidak | `Jenis = Pengeluaran` | `Ya` / `Mungkin` / `Tidak` |
| **Jurnal** | Long Text | Tidak | Selalu | Teks bebas |

### Business Rules

| ID | Rule |
|---|---|
| BR-01 | Nominal harus > 0 |
| BR-02 | Skala emosi hanya menerima nilai bulat 1–10 |
| BR-03 | Field emosi, skala, dan intensionalitas otomatis tersembunyi jika jenis ≠ Pengeluaran |
| BR-04 | Tombol Simpan disabled sampai seluruh field wajib terisi |
| BR-05 | Transaksi dengan jenis Transfer dikecualikan dari kalkulasi pemasukan & pengeluaran |
| BR-06 | Tanggal tidak boleh lebih dari hari ini (tidak ada pencatatan masa depan di MVP) |

## F2. Riwayat Transaksi

**Requirement:**
- Menampilkan seluruh transaksi, diurutkan dari terbaru
- Dikelompokkan per hari dengan section header
- Search berdasarkan kategori atau isi jurnal
- Filter: Jenis, Kategori, Emosi, Rentang tanggal
- Setiap item menampilkan: ikon kategori, nama kategori, nominal, metode pembayaran, emosi, penanda impulsif

## F3. Detail & Edit Transaksi

**Requirement:**
- Menampilkan seluruh field termasuk yang opsional
- Tombol Edit membuka form yang sama dengan data ter-prefill
- Tombol Hapus memunculkan konfirmasi terlebih dahulu

## F4. Dashboard Ringkas (Glide)

**Data yang ditampilkan:**

| Metrik | Perhitungan |
|---|---|
| Saldo bulan ini | Total pemasukan − total pengeluaran |
| Total pemasukan | `SUM` nominal, jenis = Pemasukan, bulan berjalan |
| Total pengeluaran | `SUM` nominal, jenis = Pengeluaran, bulan berjalan |
| Kategori terbesar | Kategori dengan `SUM` nominal tertinggi |
| Emosi dominan | Emosi dengan frekuensi tertinggi |
| Transaksi tidak direncanakan | `COUNT` di mana Direncanakan = Tidak |
| 3 transaksi terakhir | 3 baris terbaru |

## F5. Insight

**Requirement:**
- Minimum 15 transaksi pengeluaran ber-emosi sebelum insight ditampilkan
- Sebelum threshold tercapai, tampilkan progress: "8 dari 15 transaksi"
- Insight di-generate dari formula di Google Sheets, dibaca Glide sebagai teks
- Bar chart horizontal: total pengeluaran per emosi
- Filter periode: Minggu ini / Bulan ini / Semua

## F6. Refleksi Mingguan

**Requirement:**
- Menampilkan ringkasan data minggu berjalan sebagai konteks
- 6 pertanyaan, satu per layar, dengan progress indicator
- Setiap pertanyaan dapat dilewati
- Identifikasi minggu menggunakan format `YYYY-Www` (contoh: `2025-W02`)

**Daftar Pertanyaan:**

| No | Pertanyaan |
|---|---|
| 1 | Pengeluaran apa yang paling berpengaruh minggu ini? |
| 2 | Emosi apa yang paling sering muncul saat kamu berbelanja? |
| 3 | Pembelian apa yang paling kamu sesali? |
| 4 | Apa pemicu utama pengeluaran yang tidak direncanakan? |
| 5 | Satu kebiasaan apa yang ingin kamu ubah minggu depan? |
| 6 | Apa target kecilmu untuk minggu depan? |

---

# 7. Data Structure (Google Sheets)

## 7.1 Sheet: `Transactions`

Data mentah seluruh transaksi.

| Kolom | Tipe | Contoh | Keterangan |
|---|---|---|---|
| `ID` | Auto-number | `1` | Dibuat otomatis oleh Glide |
| `Tanggal` | Date | `2025-01-10` | Format ISO |
| `Jenis` | Text | `Pengeluaran` | Pengeluaran / Pemasukan / Transfer |
| `Nominal` | Number | `75000` | Integer |
| `Kategori` | Text | `Makanan & Minuman` | — |
| `Metode_Pembayaran` | Text | `QRIS` | — |
| `Emosi` | Text | `Stres` | Kosong jika bukan pengeluaran |
| `Skala_Emosi` | Number | `8` | 1–10, kosong jika bukan pengeluaran |
| `Direncanakan` | Text | `Tidak` | Ya / Tidak |
| `Pemicu` | Text | `Stres Kerja` | Opsional |
| `Akan_Beli_Lagi` | Text | `Tidak` | Ya / Mungkin / Tidak |
| `Jurnal` | Text | `Pulang kerja lelah...` | Opsional |
| `Emosi_Display` | Formula | `🔴 Stres` | Kolom bantu untuk tampilan Glide |
| `Bulan` | Formula | `2025-01` | Kolom bantu untuk grouping |
| `Minggu` | Formula | `2025-W02` | Kolom bantu untuk grouping |

### Formula Kolom Bantu

```excel
// Emosi_Display
=IF(G2="","",
 IF(G2="Stres","🔴 Stres",
 IF(G2="Bosan","⚪ Bosan",
 IF(G2="Senang","🟡 Senang",
 IF(G2="Puas","🟢 Puas",
 IF(G2="Cemas","🟠 Cemas",
 IF(G2="Sedih","🟣 Sedih","")))))))

// Bulan
=IF(B2="","",TEXT(B2,"YYYY-MM"))

// Minggu
=IF(B2="","",TEXT(B2,"YYYY")&"-W"&TEXT(ISOWEEKNUM(B2),"00"))
```

## 7.2 Sheet: `Weekly_Reflections`

| Kolom | Tipe | Contoh |
|---|---|---|
| `Week` | Text | `2025-W02` |
| `Tanggal_Isi` | Date | `2025-01-12` |
| `Pengeluaran_Berpengaruh` | Text | `Makan di luar tiap hari kerja` |
| `Emosi_Dominan` | Text | `Stres` |
| `Pembelian_Disesalkan` | Text | `Baju online yang tidak cocok` |
| `Pemicu_Utama` | Text | `Bosan saat scrolling malam hari` |
| `Kebiasaan_Diubah` | Text | `Tidak buka e-commerce setelah jam 21.00` |
| `Target_Minggu_Depan` | Text | `Maksimal 2x makan di luar` |

## 7.3 Sheet: `Dashboard`

Berisi formula agregat yang hasilnya dibaca oleh Glide.

### Metrik Dasar

```excel
// Total Pengeluaran Bulan Ini
=SUMIFS(Transactions!D:D,
        Transactions!C:C,"Pengeluaran",
        Transactions!B:B,">="&EOMONTH(TODAY(),-1)+1,
        Transactions!B:B,"<="&EOMONTH(TODAY(),0))

// Total Pemasukan Bulan Ini
=SUMIFS(Transactions!D:D,
        Transactions!C:C,"Pemasukan",
        Transactions!B:B,">="&EOMONTH(TODAY(),-1)+1,
        Transactions!B:B,"<="&EOMONTH(TODAY(),0))

// Saldo Bulan Ini
=B2-B3

// Persentase Transaksi Tidak Direncanakan
=IFERROR(
   COUNTIFS(Transactions!I:I,"Tidak",Transactions!C:C,"Pengeluaran") /
   COUNTIFS(Transactions!C:C,"Pengeluaran"), 0)
```

### Analisis Emosi

```excel
// Total Pengeluaran per Emosi (contoh: Stres)
=SUMIFS(Transactions!D:D,
        Transactions!G:G,"Stres",
        Transactions!C:C,"Pengeluaran")

// Rata-rata Nominal saat Emosi Intens (skala ≥8)
=IFERROR(AVERAGEIFS(Transactions!D:D,
        Transactions!G:G,"Stres",
        Transactions!H:H,">=8",
        Transactions!C:C,"Pengeluaran"), 0)

// Rata-rata Nominal Umum
=IFERROR(AVERAGEIFS(Transactions!D:D,
        Transactions!C:C,"Pengeluaran"), 0)

// Emosi Dominan
=IFERROR(INDEX(Emotions!A:A,
   MATCH(MAX(Emotions!B:B),Emotions!B:B,0)),"—")
```

### Insight Naratif

```excel
// Insight Emosi Utama
=IF(COUNTIFS(Transactions!C:C,"Pengeluaran")<15,
  "Catat "&(15-COUNTIFS(Transactions!C:C,"Pengeluaran"))&" transaksi lagi untuk melihat polamu.",
  TEXT(SUMIFS(Transactions!D:D,Transactions!G:G,$B$10,Transactions!C:C,"Pengeluaran")/
       SUMIFS(Transactions!D:D,Transactions!C:C,"Pengeluaran"),"0%")&
  " pengeluaranmu bulan ini terjadi saat merasa "&LOWER($B$10)&".")

// Insight Perbandingan Nominal
=IF($B$14=0,"",
  "Rata-rata transaksi saat "&LOWER($B$10)&" adalah Rp"&TEXT($B$14,"#,##0")&
  ", "&TEXT(($B$14/$B$15)-1,"0%")&" lebih tinggi dari rata-rata umum.")
```

## 7.4 Sheet Pendukung

| Sheet | Isi | Fungsi |
|---|---|---|
| `Categories` | Daftar kategori pengeluaran & pemasukan | Sumber pilihan di Glide |
| `Emotions` | Daftar emosi + warna + hitungan frekuensi | Sumber pilihan & analisis |
| `Payment_Methods` | Daftar metode pembayaran | Sumber pilihan di Glide |
| `Triggers` | Daftar pemicu transaksi | Sumber pilihan di Glide |

## 7.5 Relasi Data

```text
Categories ──────┐
Emotions ────────┤
Payment_Methods ─┼──→ Transactions ──→ Dashboard ──→ (dibaca Glide)
Triggers ────────┘         │
                           └────────→ Weekly_Reflections (konteks)
```

---

# 8. Non-Functional Requirements

| Aspek | Requirement |
|---|---|
| **Performa** | Waktu muat awal <3 detik pada koneksi 4G |
| **Kecepatan input** | Form pengeluaran selesai dalam <60 detik |
| **Kapasitas** | Mampu menangani ≥2.000 baris transaksi tanpa penurunan performa signifikan |
| **Offline** | Tidak didukung penuh — Glide memerlukan koneksi untuk sinkronisasi |
| **Keamanan** | Google Sheets di-set private, hanya dapat diakses akun pemilik |
| **Backup** | Version history Google Sheets aktif; duplikasi manual tiap akhir bulan |
| **Kompatibilitas** | Chrome & Safari mobile, minimum lebar layar 375px |
| **Aksesibilitas** | WCAG AA — kontras ≥4.5:1, tap target ≥44px |

---

# 9. UI/UX Design Specification

## 9.1 Design Principles

Diadaptasi dari **Apple Human Interface Guidelines** dan pendekatan visual **Notion**.

| Prinsip | Penjelasan | Implikasi Desain |
|---|---|---|
| **Clarity** | Konten lebih penting daripada dekorasi | Hindari ilustrasi berlebihan; tipografi sebagai hirarki utama |
| **Deference** | UI tidak bersaing dengan data | Background netral; aksen warna hanya untuk aksi & status penting |
| **Depth via hierarchy** | Kedalaman dari layering, bukan shadow tebal | Border tipis & background bertingkat, bukan drop shadow berat |
| **Non-judgmental** | Aplikasi mencatat, bukan menghakimi | Merah hanya untuk nominal pengeluaran, bukan peringatan moral |
| **Speed over completeness** | Input harian harus selesai <60 detik | Field wajib di atas; field opsional dikelompokkan & collapsed |
| **Whitespace as structure** | Ala Notion: ruang kosong sebagai pemisah visual | Jarak antar-section ≥24px; hindari garis pemisah berlebih |

## 9.2 Design Tokens

### A. Color — Base

| Token | Hex | Penggunaan |
|---|---|---|
| `bg/primary` | `#FFFFFF` | Background utama layar & kartu |
| `bg/secondary` | `#F7F7F5` | Background grup/section (Notion-style) |
| `bg/tertiary` | `#EFEFED` | Field input, chip inactive |
| `border/default` | `#E5E5E3` | Garis pemisah, outline kartu |
| `border/focus` | `#007AFF` | Field aktif |
| `text/primary` | `#1A1A1A` | Judul, nominal, konten utama |
| `text/secondary` | `#6B6B6B` | Label, metadata, timestamp |
| `text/tertiary` | `#A0A0A0` | Placeholder, teks disabled |

### B. Color — Semantic

| Token | Hex | Penggunaan |
|---|---|---|
| `accent/primary` | `#007AFF` | Tombol utama, link, elemen aktif |
| `semantic/income` | `#34C759` | Nominal pemasukan |
| `semantic/expense` | `#FF3B30` | Nominal pengeluaran |
| `semantic/transfer` | `#8E8E93` | Nominal transfer (netral) |
| `semantic/warning` | `#FF9500` | Penanda transaksi tidak direncanakan |

> **Aturan penting:** merah `#FF3B30` **hanya** dipakai pada angka nominal pengeluaran dan aksi destruktif — tidak pada background kartu atau banner insight. Tujuannya agar pengguna tidak merasa dihukum saat membuka aplikasi.

### C. Color — Emosi

| Emosi | Hex | Indicator |
|---|---|---|
| Senang | `#FFB800` | 🟡 Amber |
| Puas | `#34C759` | 🟢 Green |
| Stres | `#FF3B30` | 🔴 Red |
| Cemas | `#FF9500` | 🟠 Orange |
| Sedih | `#5E5CE6` | 🟣 Indigo |
| Bosan | `#8E8E93` | ⚪ Gray |

**Aturan pemakaian:** warna emosi hanya muncul sebagai *dot indicator* (8px), *chip border*, atau *fill grafik*. Tidak boleh menjadi background penuh kartu.

### D. Typography

**Font family:** `Inter` — fallback: `SF Pro Text` / `Helvetica Neue` / system sans-serif.  
Dipilih karena karakter sharp, modern, dan keterbacaan angka yang tinggi.

| Style | Size | Weight | Line Height | Penggunaan |
|---|---|---|---|---|
| `Display` | 34px | 700 | 40px | Nominal besar di dashboard |
| `Title 1` | 28px | 600 | 34px | Judul halaman |
| `Title 2` | 22px | 600 | 28px | Judul section |
| `Headline` | 17px | 600 | 22px | Judul kartu, nama kategori |
| `Body` | 17px | 400 | 24px | Teks isi, jurnal |
| `Callout` | 15px | 400 | 20px | Teks insight |
| `Subhead` | 15px | 500 | 20px | Label form |
| `Footnote` | 13px | 400 | 18px | Metadata, tanggal, helper text |
| `Caption` | 11px | 500 | 14px | Tag, badge, chip kecil |

**Aturan angka:** seluruh nominal menggunakan `font-variant-numeric: tabular-nums` agar digit sejajar rapi pada daftar transaksi.

### E. Spacing & Layout

Base unit **4px**, ritme utama **8px** (8pt grid Apple).

| Token | Value | Penggunaan |
|---|---|---|
| `space/xs` | 4px | Jarak icon ke teks |
| `space/sm` | 8px | Jarak antar elemen dalam komponen |
| `space/md` | 16px | Padding kartu, margin horizontal layar |
| `space/lg` | 24px | Jarak antar section |
| `space/xl` | 32px | Jarak sebelum tombol utama |
| `space/2xl` | 48px | Padding atas halaman |

- **Screen margin:** 16px kiri-kanan
- **Max content width (web/tablet):** 640px, center-aligned
- **List item height:** minimum 64px

### F. Radius, Border & Elevation

| Elemen | Radius | Border | Shadow |
|---|---|---|---|
| Kartu / Container | 12px | `1px solid #E5E5E3` | none |
| Input field | 10px | `1px solid #E5E5E3` | none |
| Tombol | 10px | none | none |
| Chip / Tag | 8px | `1px solid` (kontekstual) | none |
| Bottom sheet / Modal | 16px (atas) | none | `0 -4px 24px rgba(0,0,0,0.08)` |

> Prinsip: **flat + border tipis**, bukan shadow. Inilah yang membuat Notion terasa bersih.

### G. Iconography

- **Library:** SF Symbols (iOS) atau Lucide Icons (cross-platform)
- **Stroke weight:** 1.5–2px
- **Ukuran:** 20px (inline), 24px (navigasi), 28px (empty state)
- **Warna:** `text/secondary` default, `accent/primary` saat aktif

| Konteks | Icon |
|---|---|
| Beranda | `house` |
| Tambah Transaksi | `plus` |
| Riwayat | `list.bullet` |
| Insight | `chart.bar` |
| Refleksi | `book` |
| Makanan & Minuman | `fork.knife` |
| Transport | `car` |
| Belanja | `bag` |
| Hiburan | `play.circle` |
| Tagihan & Langganan | `doc.text` |
| Kesehatan | `heart` |
| Pendidikan | `graduationcap` |
| Sosial | `person.2` |

## 9.3 Navigation Architecture

**Pola:** Bottom Tab Bar (4 tab) + Floating Action Button.

```text
┌─────────────────────────────────────┐
│                                     │
│           CONTENT AREA              │
│                                     │
│                              ┌───┐  │
│                              │ + │  │  ← FAB
│                              └───┘  │
├─────────────────────────────────────┤
│   🏠        📋        📊        📖   │
│ Beranda  Riwayat   Insight  Refleksi│
└─────────────────────────────────────┘
```

**Rasional:**
- Aksi paling sering (tambah transaksi) diberi FAB, bukan tab — sesuai HIG, aksi primer harus paling mudah dijangkau ibu jari
- 4 tab adalah jumlah optimal; menghindari menu "More" yang menyembunyikan fitur
- Label teks tetap ditampilkan di bawah icon untuk kejelasan

## 9.4 Component Library

### C1. Summary Card

```text
┌────────────────────────────────────┐
│ PENGELUARAN BULAN INI              │  ← Caption, uppercase, tracking 0.5
│ Rp2.850.000                        │  ← Display 34/700, warna expense
│ ↑ 12% dari bulan lalu              │  ← Footnote, text/secondary
└────────────────────────────────────┘
```
Background `bg/primary`, border 1px, radius 12px, padding 16px. Perbandingan bulan lalu ditulis netral tanpa emoji atau warna alarm.

### C2. Transaction List Item

```text
┌────────────────────────────────────┐
│ 🍴  Makanan & Minuman   −Rp75.000  │  ← Headline + nominal tabular
│     QRIS · 10 Jan               ●  │  ← Footnote + emotion dot
│     Tidak direncanakan             │  ← Caption, warna warning
└────────────────────────────────────┘
```
Height minimum 64px, padding vertikal 12px. Pemisah garis 1px `border/default` dengan inset 56px dari kiri.

### C3. Choice Chip

```text
Inactive:  ┌─────────┐   Active:  ┌─────────┐
           │  Stres  │            │● Stres  │
           └─────────┘            └─────────┘
   border #E5E5E3            border warna emosi
   bg #FFFFFF                bg tint 8% warna emosi
   text #6B6B6B              text #1A1A1A, weight 500
```
Layout wrap grid, gap 8px. Tap target minimum 44×44px.

### C4. Emotion Scale Selector

```text
Seberapa kuat perasaan ini?

              8

  ●━━━━━━━━━━━━━━━━━━━○━━━━
  Ringan        Sangat kuat
```
- **Opsi utama:** slider horizontal step 1, thumb 28px, track 4px
- **Fallback:** segmented button 1–10, dua baris (1–5 / 6–10)
- Nilai terpilih ditampilkan besar (`Title 1`) di atas slider untuk feedback instan
- Label anchor "Ringan" & "Sangat kuat" wajib ada

### C5. Button

| Tipe | Style | Penggunaan |
|---|---|---|
| **Primary** | bg `#007AFF`, text putih, height 50px, full-width, radius 10px | Simpan, Submit |
| **Secondary** | bg `#F7F7F5`, text `#1A1A1A`, border 1px | Batal, aksi sekunder |
| **Text** | text `#007AFF`, tanpa background | Link, "Lihat semua" |
| **Destructive** | text `#FF3B30` | Hapus transaksi |

### C6. Insight Card

```text
┌────────────────────────────────────┐
│ 📊  POLA TERDETEKSI                │
│                                    │
│ 40% pengeluaranmu bulan ini        │
│ terjadi saat merasa stres.         │
│                                    │
│ Lihat detail →                     │
└────────────────────────────────────┘
```
Background `bg/secondary`. Teks bersifat deskriptif-faktual, bukan instruktif atau menyalahkan.

### C7. Empty State

```text
        ┌───────┐
        │  📋   │
        └───────┘

   Belum ada transaksi

   Catat pengeluaran pertamamu
   untuk mulai melihat pola.

      [ + Tambah Transaksi ]
```
Selalu sertakan CTA. Untuk halaman Insight, tampilkan progress: "8 dari 15 transaksi".

## 9.5 Screen Specifications

### S1 — Beranda / Dashboard

```text
┌─────────────────────────────────────┐
│ ReflectSpend            Januari ▾   │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ SALDO BULAN INI                 │ │
│ │ Rp2.150.000                     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌──────────────┐ ┌────────────────┐ │
│ │ MASUK        │ │ KELUAR         │ │
│ │ Rp5.000.000  │ │ Rp2.850.000    │ │
│ └──────────────┘ └────────────────┘ │
│                                     │
│ RINGKASAN                           │
│ ┌─────────────────────────────────┐ │
│ │ Kategori terbesar     Makanan   │ │
│ │ Emosi dominan         ● Stres   │ │
│ │ Tidak direncanakan    12 transaksi│
│ └─────────────────────────────────┘ │
│                                     │
│ TRANSAKSI TERAKHIR    Lihat semua → │
│ ┌─────────────────────────────────┐ │
│ │ 🍴 Makanan       −Rp75.000   ●  │ │
│ │ 🚗 Transport     −Rp25.000   ●  │ │
│ │ 🛍 Belanja      −Rp150.000   ●  │ │
│ └─────────────────────────────────┘ │
│                              ┌───┐  │
│                              │ + │  │
├──────────────────────────────└───┘──┤
│  🏠      📋      📊      📖         │
└─────────────────────────────────────┘
```

**Catatan:** saldo ditampilkan paling atas dan paling besar — satu angka fokus per layar. Masuk/Keluar dalam dua kartu sejajar 50:50 dengan gap 8px.

### S2 — Tambah Transaksi

Bottom sheet full-height dengan header sticky.

```text
┌─────────────────────────────────────┐
│ Batal      Tambah Transaksi   Simpan│
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Keluar │ Masuk │ Transfer       │ │
│ └─────────────────────────────────┘ │
│                                     │
│              Rp                     │
│           75.000                    │  ← Display 34px, center
│                                     │
│ ─────────────────────────────────── │
│ Tanggal                  10 Jan  ›  │
│ Kategori          Makanan & Min.  › │
│ Metode Pembayaran           QRIS  › │
│                                     │
│ ═══════════════════════════════════ │
│ BAGAIMANA PERASAANMU?               │
│                                     │
│ ┌────┐┌────┐┌────┐┌────┐┌────┐┌───┐│
│ │Sen.││Str.││Bos.││Sed.││Cem.││Pua││
│ └────┘└────┘└────┘└────┘└────┘└───┘│
│                                     │
│                8                    │
│  ●━━━━━━━━━━━━━━━━━━━○━━━━          │
│  Ringan        Sangat kuat          │
│                                     │
│ Transaksi ini direncanakan?         │
│ ┌──────────┐ ┌──────────┐           │
│ │    Ya    │ │  Tidak   │           │
│ └──────────┘ └──────────┘           │
│                                     │
│ ─────────────────────────────────── │
│ Detail tambahan (opsional)       ▾  │
└─────────────────────────────────────┘
```

**Aturan kritis:**
1. Amount input diprioritaskan — keyboard numerik terbuka otomatis
2. Progressive disclosure — section emosi hanya muncul jika Jenis = Keluar; "Detail tambahan" tertutup default
3. Tombol Simpan di header kanan atas, disabled sampai field wajib terisi
4. Untuk Pemasukan & Transfer, form berhenti setelah metode pembayaran

### S3 — Riwayat Transaksi

```text
┌─────────────────────────────────────┐
│ Riwayat                        ⚙︎   │
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Cari transaksi               │ │
│ └─────────────────────────────────┘ │
│ ┌────┐┌──────┐┌─────┐┌────────┐     │
│ │Semua││Keluar││Masuk││Emosi ▾ │    │
│ └────┘└──────┘└─────┘└────────┘     │
├─────────────────────────────────────┤
│ HARI INI                −Rp100.000  │
│ 🍴 Makanan & Minuman    −Rp75.000   │
│    QRIS · Stres 8               ●   │
│ ─────────────────────────────────── │
│ 🚗 Transport            −Rp25.000   │
│    GoPay · Puas 6               ●   │
│                                     │
│ KEMARIN                 −Rp150.000  │
│ 🛍 Belanja             −Rp150.000   │
│    Debit · Bosan 7              ●   │
│    Tidak direncanakan               │
└─────────────────────────────────────┘
```

Transaksi dikelompokkan per hari dengan sticky section header dan subtotal di kanan.

### S4 — Detail Transaksi

```text
┌─────────────────────────────────────┐
│ ‹ Kembali                     Edit  │
├─────────────────────────────────────┤
│              🍴                     │
│         −Rp75.000                   │
│      Makanan & Minuman              │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Tanggal            10 Jan 2025  │ │
│ │ Metode                    QRIS  │ │
│ │ Emosi              ● Stres (8)  │ │
│ │ Direncanakan             Tidak  │ │
│ │ Pemicu             Stres Kerja  │ │
│ │ Akan beli lagi           Tidak  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ CATATAN                             │
│ ┌─────────────────────────────────┐ │
│ │ Pulang kerja lelah, beli        │ │
│ │ makanan lebih banyak dari       │ │
│ │ yang dibutuhkan.                │ │
│ └─────────────────────────────────┘ │
│                                     │
│         Hapus Transaksi             │
└─────────────────────────────────────┘
```

### S5 — Insight

```text
┌─────────────────────────────────────┐
│ Insight              Bulan Ini ▾    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 📊 POLA TERDETEKSI              │ │
│ │ 40% pengeluaranmu bulan ini     │ │
│ │ terjadi saat merasa stres.      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ PENGELUARAN PER EMOSI               │
│ ┌─────────────────────────────────┐ │
│ │ Stres  ████████████ Rp1.140.000 │ │
│ │ Bosan  ███████      Rp660.000   │ │
│ │ Senang ████         Rp380.000   │ │
│ │ Puas   ███          Rp285.000   │ │
│ │ Cemas  ██           Rp190.000   │ │
│ │ Sedih  █            Rp95.000    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ RATA-RATA NOMINAL                   │
│ ┌─────────────────────────────────┐ │
│ │ Saat bosan          Rp95.000    │ │
│ │ Rata-rata umum      Rp63.000    │ │
│ │ Selisih             +51%        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Sudah lihat polanya?            │ │
│ │ [ Isi Refleksi Mingguan ]       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

Horizontal bar chart dipilih karena label emosi lebih mudah dibaca dibanding pie chart.

### S6 — Refleksi Mingguan

```text
┌─────────────────────────────────────┐
│ Refleksi         Minggu 2, Jan ▾    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ RINGKASAN MINGGU INI            │ │
│ │ Total pengeluaran   Rp850.000   │ │
│ │ Kategori terbesar   Makanan     │ │
│ │ Emosi dominan       ● Stres     │ │
│ │ Tidak direncanakan  5 transaksi │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 1 dari 6                            │
│ ▓▓▓▓░░░░░░░░░░░░░░░░░░░░            │
│                                     │
│ Pengeluaran apa yang paling         │
│ berpengaruh minggu ini?             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Tulis jawabanmu...              │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│  [ Lewati ]        [ Lanjut → ]     │
└─────────────────────────────────────┘
```

Satu pertanyaan per layar untuk mengurangi beban kognitif dan meningkatkan kualitas jawaban.

## 9.6 Interaction & Feedback

| Interaksi | Feedback |
|---|---|
| Tap tombol | Opacity 0.6 selama 100ms |
| Simpan berhasil | Toast di atas: "Transaksi tersimpan" — auto-dismiss 2 detik |
| Simpan gagal | Inline error di bawah field, bukan alert modal |
| Field wajib kosong | Border `#FF3B30` + helper text |
| Loading data | Skeleton placeholder, bukan spinner |
| Pilih chip emosi | Haptic feedback ringan (jika didukung) |
| Hapus transaksi | Dialog konfirmasi: "Hapus transaksi ini? Tindakan ini tidak bisa dibatalkan." |

**Animasi:** durasi 200–300ms, easing `ease-out`. Tidak ada animasi dekoratif.

## 9.7 Microcopy & Tone of Voice

### Prinsip

Netral, faktual, tanpa menghakimi. Aplikasi ini adalah **cermin**, bukan **pelatih yang memarahi**.

| ❌ Hindari | ✅ Gunakan |
|---|---|
| "Kamu terlalu boros bulan ini!" | "Pengeluaran bulan ini Rp2.850.000, 12% lebih tinggi dari bulan lalu." |
| "Gagal menabung 😞" | "Target bulan ini belum tercapai." |
| "Belanja impulsif lagi?" | "12 transaksi tercatat sebagai tidak direncanakan." |
| "Emosi kamu buruk" | "Emosi yang paling sering muncul: Stres." |
| "Wajib diisi!" | "Nominal perlu diisi untuk melanjutkan." |

### Label Standar

| Konteks | Teks |
|---|---|
| Judul form emosi | "Bagaimana perasaanmu setelah transaksi ini?" |
| Label skala | "Seberapa kuat perasaan ini?" (anchor: Ringan / Sangat kuat) |
| Pertanyaan intensionalitas | "Transaksi ini direncanakan?" |
| Placeholder jurnal | "Apa yang terjadi sebelum kamu mengeluarkan uang ini?" |
| Empty state insight | "Catat 15 transaksi untuk mulai melihat polamu. Saat ini: 8." |

## 9.8 Accessibility

| Aspek | Standar |
|---|---|
| **Tap target** | Minimum 44×44px untuk semua elemen interaktif |
| **Kontras teks** | ≥4.5:1 untuk body text, ≥3:1 untuk teks ≥18px |
| **Ketergantungan warna** | Emosi selalu disertai label teks, tidak hanya dot warna |
| **Font size** | Minimum 13px; dukung Dynamic Type bila memungkinkan |
| **Touch spacing** | Jarak antar elemen tappable minimum 8px |
| **Focus state** | Border 2px `accent/primary` pada field aktif |

**Verifikasi kontras palet:**

| Kombinasi | Rasio | Status |
|---|---|---|
| `#1A1A1A` di atas `#FFFFFF` | 16.1:1 | ✅ Lolos AAA |
| `#6B6B6B` di atas `#FFFFFF` | 5.3:1 | ✅ Lolos AA |
| `#FFFFFF` di atas `#007AFF` | 4.6:1 | ✅ Lolos AA |
| `#A0A0A0` di atas `#FFFFFF` | 2.6:1 | ⚠️ Hanya untuk teks non-esensial |

## 9.9 Glide Implementation Mapping

Glide memiliki keterbatasan kustomisasi. Berikut pemetaan spesifikasi desain ke kapabilitas Glide.

### Theme Global

| Setting | Nilai |
|---|---|
| Accent color | `#007AFF` |
| Theme | Light |
| Font | Inter (atau sans-serif terdekat) |
| Corner style | Rounded (medium) |
| Navigation | Tab bar, 4 tab |

### Pemetaan Komponen

| Spesifikasi Desain | Komponen Glide | Kompromi / Catatan |
|---|---|---|
| Summary Card | **Big Numbers** / **Fields** dalam Container | Warna nominal mungkin tidak bisa dikustom per-nilai; gunakan prefix `−` / `+` |
| Transaction List Item | **Collection → List** | Emotion dot: gunakan kolom `Emosi_Display` berisi emoji |
| Segmented control Jenis | **Choice** (style: segmented) | — |
| Amount input | **Number Entry** | Tidak bisa di-style sebagai display besar |
| Choice Chip | **Choice** (style: chips / dropdown) | Jika opsi >6, dropdown lebih hemat ruang |
| Emotion Scale 1–10 | **Slider** | Jika tidak tersedia: Choice 10 opsi atau Number Entry dengan validasi |
| Direncanakan? | **Choice** (2 opsi) | Lebih eksplisit daripada Switch |
| Detail tambahan collapsed | **Container** + visibility condition, atau screen terpisah | Glide tidak punya accordion native |
| Insight Card | **Rich Text** membaca kolom formula Sheets | Teks di-generate via `CONCATENATE` |
| Bar chart per emosi | **Chart** (Bar) | Warna per-bar mungkin tidak bisa dikustom individual |
| Refleksi per layar | **Form** multi-step / beberapa screen | Jika sulit: 1 form panjang dengan section header jelas |
| Toast konfirmasi | **Action → Show notification** | — |
| Empty state | **Container** + visibility `row count = 0` | — |

### Prioritas Jika Ada Keterbatasan

1. **Kecepatan input** — jangan tambah langkah demi estetika
2. **Keterbacaan data** — hirarki tipografi lebih penting daripada warna
3. **Konsistensi** — lebih baik seragam sederhana daripada campur-campur
4. **Estetika** — terakhir

## 9.10 Design Checklist

- [ ] Semua tap target ≥44×44px
- [ ] Kontras teks utama ≥4.5:1
- [ ] Emosi selalu punya label teks, tidak hanya warna
- [ ] Form pengeluaran selesai dalam <60 detik
- [ ] Field opsional tidak menghalangi field wajib
- [ ] Tidak ada microcopy yang menghakimi
- [ ] Empty state tersedia di semua halaman list
- [ ] Nominal format `Rp` + pemisah ribuan titik
- [ ] Tanggal konsisten: `10 Jan 2025`
- [ ] Merah hanya pada nominal pengeluaran & aksi destruktif
- [ ] Diuji di layar 375px (iPhone SE)

---

# 10. Implementation Guide

## 10.1 Fase 1 — Setup Google Sheets (1–2 hari)

1. Buat Google Spreadsheet baru, beri nama `ReflectSpend_Database`
2. Buat sheet berikut:
   - `Transactions`
   - `Weekly_Reflections`
   - `Dashboard`
   - `Categories`
   - `Emotions`
   - `Payment_Methods`
   - `Triggers`
3. Isi header kolom sesuai §7
4. Isi master data pada sheet pendukung (lihat §14)
5. Tambahkan kolom bantu (`Emosi_Display`, `Bulan`, `Minggu`) beserta formulanya
6. Buat formula agregat di sheet `Dashboard`
7. Isi 5 baris data dummy untuk pengujian formula
8. Set sharing spreadsheet ke **Private**

## 10.2 Fase 2 — Setup Glide (1 hari)

1. Buka Glide, pilih **New App → Google Sheets**
2. Hubungkan ke `ReflectSpend_Database`
3. Atur theme sesuai §9.9
4. Buat 4 tab: Beranda, Riwayat, Insight, Refleksi
5. Sembunyikan sheet pendukung dari navigasi

## 10.3 Fase 3 — Bangun Form Transaksi (1–2 hari)

1. Tambahkan FAB dengan action **Show Form Screen** → sheet `Transactions`
2. Susun field sesuai urutan di §9.5 (S2)
3. Atur **visibility condition** pada field emosi:
   ```
   Show component when → Jenis → is → Pengeluaran
   ```
4. Terapkan kondisi yang sama untuk `Skala_Emosi`, `Direncanakan`, `Pemicu`, `Akan_Beli_Lagi`
5. Set `Tanggal` default ke hari ini
6. Set field wajib sebagai **Required**
7. Tambahkan action setelah submit: **Show notification** → "Transaksi tersimpan"

## 10.4 Fase 4 — Bangun Beranda (1 hari)

1. Tambahkan komponen **Big Numbers** untuk Saldo
2. Tambahkan dua **Field** sejajar untuk Masuk & Keluar
3. Tambahkan **Container** untuk section Ringkasan
4. Tambahkan **Collection → List** untuk 3 transaksi terakhir, dengan limit 3
5. Tambahkan **Button** "Lihat semua" → link ke tab Riwayat

## 10.5 Fase 5 — Bangun Riwayat (1 hari)

1. Tambahkan **Collection → List** dari sheet `Transactions`
2. Set sorting: `Tanggal` descending
3. Aktifkan **Group by** → `Tanggal`
4. Aktifkan **Search**
5. Tambahkan **Filter** untuk Jenis, Kategori, Emosi
6. Buat **Detail Screen** sesuai §9.5 (S4)
7. Tambahkan action Edit dan Delete (dengan konfirmasi)

## 10.6 Fase 6 — Bangun Insight (1 hari)

1. Tambahkan **Rich Text** yang membaca kolom insight dari sheet `Dashboard`
2. Tambahkan **Chart → Bar** untuk pengeluaran per emosi
3. Tambahkan **Container** untuk perbandingan rata-rata nominal
4. Tambahkan **Button** → link ke tab Refleksi
5. Atur empty state dengan visibility condition berdasarkan jumlah transaksi

## 10.7 Fase 7 — Bangun Refleksi (1 hari)

1. Tambahkan **Container** untuk ringkasan minggu ini
2. Tambahkan **Form** → sheet `Weekly_Reflections`
3. Susun 6 pertanyaan (multi-step bila memungkinkan)
4. Set `Week` terisi otomatis dengan format `YYYY-Www`

## 10.8 Fase 8 — Dashboard Google Sheets (2–3 hari)

1. Buat pivot table: pengeluaran per kategori per bulan
2. Buat pivot table: pengeluaran per emosi
3. Buat chart: tren pengeluaran harian
4. Buat chart: perbandingan direncanakan vs tidak
5. Buat tabel: daftar transaksi berlabel "Tidak akan beli lagi"
6. Buat perbandingan bulan ini vs bulan lalu

## 10.9 Fase 9 — Testing & Polish (2–3 hari)

Lihat §11.

## 10.10 Estimasi Total

| Fase | Durasi |
|---|---|
| Setup Sheets | 1–2 hari |
| Setup Glide | 1 hari |
| Form Transaksi | 1–2 hari |
| Beranda | 1 hari |
| Riwayat | 1 hari |
| Insight | 1 hari |
| Refleksi | 1 hari |
| Dashboard Sheets | 2–3 hari |
| Testing | 2–3 hari |
| **Total** | **11–15 hari** (≈2 minggu) |

---

# 11. Testing & Launch Checklist

## 11.1 Functional Testing

- [ ] Tambah transaksi Pengeluaran → data masuk lengkap ke Sheets
- [ ] Tambah transaksi Pemasukan → field emosi tidak muncul
- [ ] Tambah transaksi Transfer → tidak terhitung di total pemasukan/pengeluaran
- [ ] Tombol Simpan disabled saat field wajib kosong
- [ ] Nominal 0 atau negatif ditolak
- [ ] Skala emosi hanya menerima 1–10
- [ ] Edit transaksi → perubahan tersimpan
- [ ] Hapus transaksi → muncul konfirmasi, data terhapus
- [ ] Filter riwayat berfungsi untuk setiap kriteria
- [ ] Search riwayat menemukan hasil yang benar
- [ ] Dashboard menampilkan angka yang sesuai perhitungan manual
- [ ] Insight tidak muncul saat data <15 transaksi
- [ ] Insight muncul dan akurat setelah data cukup
- [ ] Refleksi mingguan tersimpan dengan kode minggu yang benar

## 11.2 UI/UX Testing

- [ ] Semua tap target ≥44px
- [ ] Tidak ada teks terpotong di layar 375px
- [ ] Nominal terformat rapi dengan pemisah ribuan
- [ ] Warna emosi konsisten di form, riwayat, dan chart
- [ ] Empty state muncul di semua halaman list
- [ ] Toast konfirmasi muncul setelah simpan
- [ ] Navigasi tab berfungsi tanpa delay

## 11.3 Performance Testing

- [ ] Waktu muat awal <3 detik
- [ ] Input satu transaksi selesai <60 detik (uji dengan stopwatch)
- [ ] Aplikasi tetap responsif dengan 100+ baris data

## 11.4 Launch Checklist

- [ ] Data dummy dihapus dari sheet `Transactions`
- [ ] Sharing Google Sheets di-set Private
- [ ] Version history Google Sheets aktif
- [ ] Aplikasi Glide di-publish
- [ ] Ditambahkan ke Home Screen HP
- [ ] Ikon aplikasi sudah di-set
- [ ] Backup manual pertama dibuat

---

# 12. Roadmap Post-MVP

## Fase 2 — Habit & Target (setelah 1 bulan penggunaan)

| Fitur | Deskripsi |
|---|---|
| Target Tabungan | Set target bulanan, tampilkan progress bar |
| Budget per Kategori | Batas pengeluaran per kategori + peringatan saat mendekati batas |
| Habit Tracker | Streak "hari tanpa belanja impulsif" |
| Badge & Pencapaian | Reward saat mencapai target atau menjaga streak |

## Fase 3 — Proaktif (setelah 3 bulan)

| Fitur | Deskripsi |
|---|---|
| Reminder Pencatatan | Notifikasi jika belum mencatat >2 hari |
| Reminder Refleksi | Notifikasi setiap Minggu malam |
| **Pre-purchase Check** | Sebelum belanja besar, jawab: "Apakah saya benar-benar butuh ini?" |
| **Cooling-off Period** | Untuk transaksi di atas nominal tertentu, tunda 24 jam & catat apakah masih ingin membeli |

## Fase 4 — Cerdas (jangka panjang)

| Fitur | Deskripsi |
|---|---|
| Prediksi Pengeluaran | Estimasi total bulan berjalan berdasarkan pola |
| Deteksi Pola Waktu | "Kamu cenderung belanja impulsif Jumat malam" |
| AI Summary | Rangkuman bulanan naratif + rekomendasi personal |
| Integrasi E-Wallet | Sinkronisasi otomatis via API |
| Migrasi ke FlutterFlow | Jika aplikasi ingin dikembangkan menjadi produk publik |

---

# 13. Risks & Assumptions

## 13.1 Risks

| ID | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R1 | Form terlalu panjang → pengguna malas mencatat | Tinggi | Field opsional collapsed; target input <60 detik |
| R2 | Berhenti mencatat setelah 2 minggu | Tinggi | Microcopy non-judgmental; insight muncul cepat sebagai reward |
| R3 | Data emosi diisi asal-asalan | Sedang | Skala visual mudah dipakai; hanya 1 pertanyaan emosi wajib |
| R4 | Insight tidak akurat karena data sedikit | Sedang | Threshold minimum 15 transaksi sebelum insight ditampilkan |
| R5 | Keterbatasan komponen Glide | Sedang | Prioritas fungsi di atas estetika (§9.9) |
| R6 | Performa Sheets menurun saat data besar | Rendah | Arsip data lama ke sheet terpisah tiap tahun |
| R7 | Kehilangan data karena kesalahan edit Sheets | Rendah | Version history + backup manual bulanan |

## 13.2 Assumptions

| ID | Asumsi |
|---|---|
| A1 | Pengguna memiliki koneksi internet saat mencatat |
| A2 | Pengguna familiar dengan Google Sheets untuk analisis mendalam |
| A3 | Pengguna bersedia mencatat setidaknya sekali sehari |
| A4 | Tujuan utama adalah self-awareness, bukan akurasi akuntansi |
| A5 | Aplikasi digunakan oleh satu orang saja |
| A6 | Pencatatan emosi dilakukan setelah transaksi, bukan sebelum |

## 13.3 Dependencies

| Dependency | Keterangan |
|---|---|
| Glide | Batasan fitur mengikuti paket yang digunakan |
| Google Sheets | Batas 10 juta sel per spreadsheet (jauh di atas kebutuhan) |
| Koneksi internet | Wajib untuk sinkronisasi |

---

# 14. Appendix

## 14.1 Master Data — Kategori

### Kategori Pengeluaran

| Kategori | Icon | Contoh |
|---|---|---|
| Makanan & Minuman | `fork.knife` | Makan siang, kopi, groceries |
| Transport | `car` | Bensin, ojol, parkir, tol |
| Belanja | `bag` | Pakaian, elektronik, online shopping |
| Hiburan | `play.circle` | Bioskop, game, nongkrong |
| Tagihan & Langganan | `doc.text` | Listrik, internet, Netflix, Spotify |
| Kesehatan | `heart` | Obat, dokter, vitamin, olahraga |
| Pendidikan | `graduationcap` | Kursus, buku, seminar |
| Sosial | `person.2` | Traktir, kado, sumbangan |
| Lainnya | `ellipsis.circle` | Tidak masuk kategori manapun |

### Kategori Pemasukan

| Kategori | Contoh |
|---|---|
| Gaji | Gaji bulanan |
| Bonus / THR | Bonus kinerja, THR |
| Freelance | Proyek sampingan |
| Penjualan | Jual barang bekas |
| Hadiah | Uang dari orang tua, hadiah |
| Pengembalian Dana | Refund, reimburse |
| Lainnya | — |

## 14.2 Master Data — Metode Pembayaran

| Metode | Tipe |
|---|---|
| Cash | Tunai |
| Debit / Transfer Bank | Bank |
| Kartu Kredit | Bank |
| QRIS | Digital |
| GoPay | E-Wallet |
| OVO | E-Wallet |
| Dana | E-Wallet |
| ShopeePay | E-Wallet |
| Paylater | Kredit |
| Lainnya | — |

## 14.3 Master Data — Pemicu Transaksi

| Pemicu | Keterangan |
|---|---|
| Kebutuhan | Memang diperlukan |
| Diskon / Promo | Terpicu penawaran |
| Stres Kerja | Pelarian dari tekanan |
| Bosan | Mengisi waktu kosong |
| Ajakan Teman | Tekanan sosial |
| Kebiasaan | Otomatis, tanpa berpikir |
| Keinginan Mendadak | Impulsif |
| Lainnya | — |

## 14.4 Master Data — Emosi

| Emosi | Warna | Emoji | Valensi |
|---|---|---|---|
| Senang | `#FFB800` | 🟡 | Positif |
| Puas | `#34C759` | 🟢 | Positif |
| Stres | `#FF3B30` | 🔴 | Negatif |
| Cemas | `#FF9500` | 🟠 | Negatif |
| Sedih | `#5E5CE6` | 🟣 | Negatif |
| Bosan | `#8E8E93` | ⚪ | Netral-negatif |

## 14.5 Glossary

| Istilah | Definisi |
|---|---|
| **Transaksi impulsif** | Transaksi dengan `Direncanakan = Tidak` |
| **Skala emosi** | Intensitas perasaan 1–10, bukan penilaian baik/buruk |
| **Intensionalitas** | Apakah transaksi direncanakan sebelumnya |
| **Insight** | Kesimpulan naratif otomatis dari pola data |
| **Threshold insight** | Minimum 15 transaksi pengeluaran ber-emosi |
| **Progressive disclosure** | Menampilkan field opsional hanya saat dibutuhkan |

## 14.6 Referensi Desain

| Sumber | Yang Diadopsi |
|---|---|
| Apple Human Interface Guidelines | Struktur navigasi, tap target, hirarki tipografi, feedback pattern |
| Notion | Whitespace, border tipis tanpa shadow, palet netral, tipografi sebagai struktur |
| iOS System Colors | Palet semantic (`#007AFF`, `#34C759`, `#FF3B30`, `#FF9500`) |

## 14.7 Changelog

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | _[isi tanggal]_ | Dokumen awal — mencakup overview, user flow, functional requirements, data structure, dan UI/UX specification |

---

**— Akhir Dokumen —**