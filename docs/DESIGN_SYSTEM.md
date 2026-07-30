# ReflectSpend — Design System & Visual Specification v2.0

Dokumen ini berisi arsitektur **Design Tokens 3-Layer**, **Spesifikasi Komponen**, **Aturan Tipografi Geist (Sans & Mono)**, serta **Pedoman UI/UX** untuk aplikasi **ReflectSpend**.

---

## 1. Filosofi Desain: Calm, Welcoming & Minimalist

Diadaptasi dari prinsip **Linear** dan **Notion UI**, ReflectSpend mengedepankan suasana tenang (*calm & non-judgmental*).

| Prinsip | Penjelasan | Implikasi Desain |
|---|---|---|
| **Calm Atmosphere** | Pengguna tidak boleh merasa tertekan saat membuka keuangan | Menggunakan font modern **Geist Sans** yang ramah dan bersih (tanpa serif kaku), serta warna pastel muted |
| **Clarity** | Data emosi & nominal terlihat sejajar dan jernih | Menggunakan **Geist Mono** untuk seluruh angka Rupiah (*tabular monospaced*) |
| **Depth via Layering** | Kedalaman visual dari kontras permukaan netral | Garis pemisah tipis `1px solid` (`var(--rs-border-default)`) tanpa drop shadow tebal |
| **Non-judgmental** | Aplikasi mencatat tanpa menghakimi | Pengeluaran impulsif disajikan dengan istilah netral & saran koping emosional yang hangat |

---

## 2. Arsitektur Design Tokens (3-Layer Architecture)

```
Layer 1: Primitive Tokens (Raw Values: Hex/HSL, Font Scale, Spacing)
       ↓
Layer 2: Semantic Tokens (Purpose Aliases: Light/Dark Theme, Financial & Emotion States)
       ↓
Layer 3: Component Tokens (Component-Specific Specifications)
```

---

### A. Layer 1: Primitive Tokens

#### 1. Color Palette (Base Neutrals)
```css
--rs-color-white: #FFFFFF;
--rs-color-sand-50: #FAFAFA;
--rs-color-sand-100: #F4F4F5;
--rs-color-sand-200: #E4E4E7;
--rs-color-charcoal-400: #A1A1AA;
--rs-color-charcoal-600: #71717A;
--rs-color-charcoal-900: #18181B;
--rs-color-dark-surface: #121212;
--rs-color-dark-card: #1C1C1E;
--rs-color-dark-border: #2C2C2E;
```

#### 2. Notion & Apple Muted Pastels
```css
--rs-pastel-red-bg: #FDEBEC;
--rs-pastel-red-text: #9F2F2D;
--rs-pastel-green-bg: #EDF3EC;
--rs-pastel-green-text: #346538;
--rs-pastel-yellow-bg: #FBF3DB;
--rs-pastel-yellow-text: #956400;
--rs-pastel-blue-bg: #E1F3FE;
--rs-pastel-blue-text: #1F6C9F;
```

#### 3. Typography Scale (Geist Sans & Geist Mono)
- **Primary Font**: `Geist`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` (Semua Judul, Subjudul, dan Bodi Teks).
- **Monospace Font**: `Geist Mono`, `monospace` (Angka Nominal, Tabular Data, Code, dan Badge Status).

| Token | Size | Weight | Font Family | Penggunaan |
|---|---|---|---|---|
| `font-display` | 32px | 700 | Geist Mono | Nominal Saldo & Total Utama |
| `font-title-1` | 24px | 600 | Geist Sans | Judul Halaman & Header Brand |
| `font-title-2` | 20px | 600 | Geist Sans | Judul Section & Modal Title |
| `font-body` | 15px | 400 | Geist Sans | Isi Teks, Input Form, Catatan Jurnal |
| `font-mono-val` | 14px | 600 | Geist Mono | Nominal List Item Transaksi |
| `font-caption` | 12px | 500 | Geist Sans / Mono | Metadata, Chip Badge, Tanggal |

#### 4. Spacing Scale (8pt Grid)
- `space-2xs`: 4px
- `space-xs`: 8px
- `space-sm`: 12px
- `space-md`: 16px (Padding standar kartu & margin horizontal)
- `space-lg`: 24px (Gap antar section)
- `space-xl`: 32px

---

### B. Layer 2: Semantic Tokens

```css
/* Theme Surface Aliases */
--rs-bg-primary: var(--rs-color-white);
--rs-bg-secondary: var(--rs-color-sand-50);
--rs-bg-tertiary: var(--rs-color-sand-100);

--rs-border-default: var(--rs-color-sand-200);
--rs-border-focus: var(--rs-color-charcoal-900);

--rs-text-primary: var(--rs-color-charcoal-900);
--rs-text-secondary: var(--rs-color-charcoal-600);
--rs-text-tertiary: var(--rs-color-charcoal-400);

/* Financial & Status Semantics */
--rs-income: var(--rs-pastel-green-text);
--rs-expense: var(--rs-pastel-red-text);
--rs-transfer: var(--rs-color-charcoal-600);
--rs-warning: var(--rs-pastel-yellow-text);
```

---

### C. Layer 3: Component Tokens

| Komponen | Token Element | Default Value | Active / Hover |
|---|---|---|---|
| **Summary Card** | `bg` / `border` / `radius` | `var(--rs-bg-primary)` / `1px solid var(--rs-border-default)` / `16px` | Static |
| **Stat Bento Card** | `bg` / `border` / `radius` | `var(--rs-bg-secondary)` / `1px solid var(--rs-border-default)` / `12px` | `bg: var(--rs-bg-tertiary)` |
| **Primary Button** | `bg` / `text` / `radius` | `var(--rs-btn-primary-bg)` / `#FFFFFF` / `10px` | `transform: scale(0.98)` |
| **Segmented Control** | `bg` / `item-active` | `var(--rs-bg-tertiary)` / `var(--rs-bg-primary)` | `font-weight: 600` |
| **PIN Keypad Button** | `bg` / `border` / `radius` | `var(--rs-bg-secondary)` / `1px solid var(--rs-border-default)` / `50%` | `transform: scale(0.92)` |
