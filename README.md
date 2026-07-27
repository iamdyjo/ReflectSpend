<div align="center">

  <h1>💳 ReflectSpend</h1>
  <p><strong>Pencatatan Keuangan Mindful & Analisis Pemicu Emosional</strong></p>

  <p>
    <a href="https://iamdyjo.github.io/ReflectSpend/"><img src="https://img.shields.io/badge/Live_Demo-GitHub_Pages-007AFF?style=for-the-badge&logo=github" alt="Live Demo"></a>
    <a href="manifest.json"><img src="https://img.shields.io/badge/PWA-100%25_Free-34C759?style=for-the-badge&logo=pwa" alt="PWA Support"></a>
    <a href="docs/DESIGN_SYSTEM.md"><img src="https://img.shields.io/badge/Design_System-Apple_HIG_%2B_Notion-1A1A1A?style=for-the-badge" alt="Design System"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-FF9500?style=for-the-badge" alt="License"></a>
  </p>

  <p><em>"Aplikasi keuangan biasa mencatat <strong>apa</strong> yang kamu beli. ReflectSpend mencatat <strong>kenapa</strong> kamu membelinya."</em></p>

  <br />

  <a href="https://iamdyjo.github.io/ReflectSpend/">
    <img src="https://raw.githubusercontent.com/iamdyjo/ReflectSpend/main/uiux/reflectspend-preview.png" alt="ReflectSpend Interface Preview" width="600" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);" onerror="this.style.display='none'" />
  </a>
</div>

---

## 🌟 Mengapa ReflectSpend?

Sebagian besar masalah pengeluaran impulsif **bukan disebabkan oleh kurangnya data nominal**, melainkan **kurangnya kesadaran emosional (mindfulness)**. ReflectSpend hadir untuk menghubungkan setiap Rupiah yang kamu belanjakan dengan kondisi emosional dan intensionalitas di baliknya.

### ✨ Fitur Utama (MVP v1.0)

* 🏠 **Beranda Interaktif**: Summary card `C1`, dual stat grid (saldo & % impulsif), insight naratif otomatis, dan transaksi terbaru.
* 📋 **Riwayat & 10 Filter Chips**: Pencarian real-time + 6 spektrum emosi (`🔴 Stres`, `⚪ Bosan`, `🟡 Senang`, `🟢 Puas`, `🟠 Cemas`, `🟣 Sedih`) + `⚡ Impulsif` + `💸 Pengeluaran` + `💰 Pemasukan`.
* 📊 **Analisis Pola Emosi**: Horizontal color-coded bar chart + indikator kepresisian threshold metrik (≥15 transaksi).
* 📖 **Kartu Refleksi Mingguan (Card Stepper)**: Evaluasi 6 pertanyaan mingguan interaktif dengan progress bar & kartu rangkuman arsip.
* ➕ **Modal Form Transaksi**: Segmented control jenis, form nominal `tabular-nums`, choice chips emosi, slider skala intensitas (1–10), dan toggle intensionalitas (Direncanakan vs Impulsif).
* 📱 **PWA & Hybrid Data (100% Gratis)**: Berjalan sebagai aplikasi seluler di HP (iOS & Android) tanpa biaya langganan, tersinkronisasi ke **Google Sheets** via Google Apps Script API dengan *fallback* instan ke browser `localStorage`.

---

## 🎨 Filosofi Desain (Apple HIG + Notion Aesthetic)

ReflectSpend dibangun menggunakan sistem **Design Tokens 3-Layer** yang didokumentasikan di **[docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)**:

1. **Non-Judgmental Red (`#FF3B30`)**: Warna merah **hanya** dipakai pada nominal pengeluaran & tombol hapus — tidak pernah digunakan pada kartu alarm atau pesan scolding (*"Boros!"*).
2. **Tabular Numerals (`.rs-tabular-nums`)**: Format angka menggunakan `font-variant-numeric: tabular-nums` agar seluruh digit aligned secara vertikal.
3. **0-Shadow / Flat Borders**: Mengadopsi estetika Notion (background `#F7F7F5`, kartu `#FFFFFF`, border halus 1px `#E5E5E3`).
4. **Aksesibilitas (WCAG AA Compliant)**: Memenuhi kontras rasio minimal 4.5:1, `aria-label`, peran ARIA tab navigation, dan outline fokus keyboard `:focus-visible`.

---

## 🏗️ Struktur Repositori

```gfm
ReflectSpend/
├── index.html                  # Core PWA Web Application
├── assets/
│   └── design-tokens.css       # Production CSS Custom Properties & Design Tokens
├── backend/
│   └── Code.gs                 # Google Apps Script Web App API (Google Sheets Sync)
├── database/                   # Master Data CSV Templates untuk Google Sheets
│   ├── 1_Transactions.csv
│   ├── 2_Weekly_Reflections.csv
│   ├── 3_Dashboard.csv
│   ├── 4_Categories.csv
│   ├── 5_Emotions.csv
│   ├── 6_Payment_Methods.csv
│   └── 7_Triggers.csv
├── docs/                       # Spesifikasi Lengkap & Panduan
│   ├── DESIGN_SYSTEM.md        # Token 3-Layer & Spesifikasi UI Komponen C1–C6
│   ├── GOOGLE_SHEETS_SETUP.md  # Panduan Setup 5 Menit Google Sheets
│   └── GLIDE_AND_BACKEND_INTEGRATION.md # Panduan Deployment Web App API & Glide
├── ReflectSpend_PRD.md         # Document PRD ReflectSpend v1.0
├── manifest.json               # Web App Manifest (PWA)
└── sw.js                       # Service Worker (Offline Support)
```

---

## 🚀 Cara Menjalankan Aplikasi (Quick Start)

### 🌐 Opsi 1: Buka Langsung Live Demo (100% Gratis)
Aplikasi sudah ter-deploy dan dapat diakses langsung via browser maupun HP Anda:
👉 **[https://iamdyjo.github.io/ReflectSpend/](https://iamdyjo.github.io/ReflectSpend/)**

**Cara Pasang di HP (PWA):**
* **iPhone (Safari)**: Tap ikon **Share** → **Add to Home Screen**.
* **Android (Chrome)**: Tap titik tiga → **Install App** / **Add to Home Screen**.

---

### 💻 Opsi 2: Menjalankan Secara Lokal di Komputer
1. Clone repositori ini:
   ```bash
   git clone https://github.com/iamdyjo/ReflectSpend.git
   cd ReflectSpend
   ```
2. Buka berkas `index.html` di browser Anda (klik 2x atau gunakan server lokal `npx serve .`).

---

### 📊 Opsi 3: Hubungkan ke Database Google Sheets Pribadi
1. Ikuti panduan di **[docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md)** untuk mengimpor berkas CSV di folder `database/` ke Google Sheets Anda.
2. Pasang skrip **[backend/Code.gs](backend/Code.gs)** di Google Sheets (*Extensions -> Apps Script*) dan deploy sebagai *Web App*.
3. Tempelkan URL Web App ke variabel `GOOGLE_SCRIPT_URL` pada `index.html`.

---

## 🛠️ Agen Skills & Perkakas Pengembangan

Repositori ini dikembangkan dan diaudit menggunakan suite agen kustom di `.agents/`:
* **Ponytail Skill Suite**: Senior dev mode (`ponytail`, `ponytail-review`, `ponytail-audit`, `ponytail-debt`, `ponytail-gain`, `ponytail-help`).
* **UI/UX Pro Max Suite**: Design auditor & design system builder (`design-auditor`, `ui-ux-pro-max`, `banner-design`, `brand`, `design`, `design-system`, `slides`, `ui-styling`).

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT License](LICENSE). Bebas digunakan, dimodifikasi, dan dikembangkan untuk keperluan personal maupun komersial.