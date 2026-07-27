# ReflectSpend — Design System & Visual Specification v1.0

Dokumen ini berisi arsitektur **Design Tokens**, **Spesifikasi Komponen**, **Aturan Tipografi & Warna**, serta **Pedoman UI/UX** untuk aplikasi **ReflectSpend** yang diambil langsung dari dokumen [ReflectSpend_PRD.md](file:///c:/Users/dyjo/Desktop/ReflectSpend/ReflectSpend_PRD.md).

---

## 1. Filosofi & Prinsip Desain

Diadaptasi dari **Apple Human Interface Guidelines (HIG)** dan pendekatan visual **Notion**.

| Prinsip | Penjelasan | Implikasi Desain |
|---|---|---|
| **Clarity** | Konten & data emosi lebih penting daripada dekorasi | Hindari ilustrasi berlebihan; hirarki tipografi sebagai elemen visual utama |
| **Deference** | UI tidak boleh bersaing dengan data pengguna | Background netral (`#FFFFFF` & `#F7F7F5`); aksen warna hanya untuk aksi & indikator emosi |
| **Depth via Hierarchy** | Kedalaman visual berasal dari layering dan border tipis | Garis pemisah 1px (`#E5E5E3`) & kontras background, bukan drop shadow tebal |
| **Non-judgmental** | Aplikasi mencatat & merefleksikan, bukan menghakimi | Merah (`#FF3B30`) **hanya** untuk nominal pengeluaran & aksi hapus — tidak untuk kartu alarm/peringatan moral |
| **Speed over Completeness** | Input harian harus selesai dalam <60 detik | Form terbagi menjadi Bagian Wajib (di atas) & Opsional (collapsed) |
| **Whitespace as Structure** | Ruang kosong sebagai pemisah ritme visual | Margin antar-section ≥24px; hindari garis pembatas yang menumpuk |

---

## 2. Arsitektur Design Tokens (3-Layer Architecture)

Design System ReflectSpend disusun dalam 3 lapisan token:
1. **Primitive Tokens**: Nilai mentah hex, font size, spacing base, radius.
2. **Semantic Tokens**: Alias tujuan (background, text, status, emotion).
3. **Component Tokens**: Spesifikasi variabel khusus untuk komponen UI.

---

### A. Primitive Tokens (Nilai Mentah)

#### Color Palette
```css
/* Base Neutrals */
--color-white: #FFFFFF;
--color-sand-50: #F7F7F5;
--color-sand-100: #EFEFED;
--color-sand-200: #E5E5E3;
--color-charcoal-400: #A0A0A0;
--color-charcoal-600: #6B6B6B;
--color-charcoal-900: #1A1A1A;

/* Brand Accent & Semantics */
--color-blue-apple: #007AFF;
--color-green-apple: #34C759;
--color-red-apple: #FF3B30;
--color-orange-apple: #FF9500;
--color-amber-apple: #FFB800;
--color-indigo-apple: #5E5CE6;
--color-gray-apple: #8E8E93;
```

#### Typography Scale (Font: `Inter`, fallback `SF Pro Text`, `system-ui`)
*Seluruh nominal angka menggunakan `font-variant-numeric: tabular-nums`.*

| Token Size | Size | Weight | Line Height | Penggunaan |
|---|---|---|---|---|
| `primitive/font-display` | 34px | 700 | 40px | Nominal besar di Dashboard Utama |
| `primitive/font-title-1` | 28px | 600 | 34px | Judul Halaman |
| `primitive/font-title-2` | 22px | 600 | 28px | Judul Section |
| `primitive/font-headline` | 17px | 600 | 22px | Nama Kategori & Judul Kartu |
| `primitive/font-body` | 17px | 400 | 24px | Isi Teks Utama & Catatan Jurnal |
| `primitive/font-callout` | 15px | 400 | 20px | Teks Insight Naratif |
| `primitive/font-subhead` | 15px | 500 | 20px | Label Form & Input Header |
| `primitive/font-footnote` | 13px | 400 | 18px | Metadata, Tanggal & Helper Text |
| `primitive/font-caption` | 11px | 500 | 14px | Tag, Chip & Badge Emosi |

#### Spacing System (Base Unit 4px, Grid 8pt)
- `space-xs`: 4px
- `space-sm`: 8px
- `space-md`: 16px (Margin horizontal layar & padding kartu)
- `space-lg`: 24px (Pemisah antar section)
- `space-xl`: 32px
- `space-2xl`: 48px

#### Corner Radius & Border
- `radius-sm`: 8px (Chip / Tag)
- `radius-md`: 10px (Input Field & Button)
- `radius-lg`: 12px (Kartu / Container Utama)
- `radius-sheet`: 16px (Bagian atas Bottom Sheet / Modal)
- `border-thin`: `1px solid #E5E5E3`

---

### B. Semantic Tokens (Alias Berorientasi Fungsi)

```css
/* Background Semantic */
--bg-primary: var(--color-white);
--bg-secondary: var(--color-sand-50);
--bg-tertiary: var(--color-sand-100);

/* Border Semantic */
--border-default: var(--color-sand-200);
--border-focus: var(--color-blue-apple);

/* Text Semantic */
--text-primary: var(--color-charcoal-900);
--text-secondary: var(--color-charcoal-600);
--text-tertiary: var(--color-charcoal-400);

/* Financial Semantic */
--accent-primary: var(--color-blue-apple);
--semantic-income: var(--color-green-apple);
--semantic-expense: var(--color-red-apple);
--semantic-transfer: var(--color-gray-apple);
--semantic-warning: var(--color-orange-apple);

/* Emotion Spectrum */
--emotion-senang: var(--color-amber-apple);  /* 🟡 Amber */
--emotion-puas: var(--color-green-apple);    /* 🟢 Green */
--emotion-stres: var(--color-red-apple);      /* 🔴 Red */
--emotion-cemas: var(--color-orange-apple);   /* 🟠 Orange */
--emotion-sedih: var(--color-indigo-apple);   /* 🟣 Indigo */
--emotion-bosan: var(--color-gray-apple);     /* ⚪ Gray */
```

> **Aturan Penggunaan Warna Emosi:**  
> Warna emosi **hanya** boleh muncul sebagai *dot indicator* (8px), *border chip*, atau *fill grafik/chart*. Tidak boleh dijadikan warna background kartu secara penuh.

---

### C. Component Tokens & Specifications

#### C1. Summary Card (Kartu Ringkasan Finansial)
- **Background**: `var(--bg-primary)`
- **Border**: `1px solid var(--border-default)`
- **Radius**: `12px` (`radius-lg`)
- **Padding**: `16px` (`space-md`)
- **Shadow**: `none`
- **Layout**:
  - Header: Caption Uppercase (`11px/500`, tracking 0.5) `var(--text-secondary)`
  - Value: Display (`34px/700`), warna mengikuti jenis (`var(--semantic-expense)` atau `var(--semantic-income)`)
  - Subtext: Footnote (`13px/400`) `var(--text-secondary)` (ditulis netral, tanpa emoji berlebihan)

#### C2. Transaction List Item (Item Riwayat Transaksi)
- **Min Height**: `64px`
- **Padding**: `12px 16px`
- **Border Bottom**: `1px solid var(--border-default)` (inset 56px dari kiri)
- **Structure**:
  - Left: Circular Icon Container (36px, `var(--bg-secondary)`)
  - Middle: Headline (`17px/600`) + Footnote (`13px/400`) metadata
  - Right: Nominal (`17px/600`, `tabular-nums`) + Dot Emosi (`8px` circle)
  - Badge Impulsif: Caption (`11px/500`) `var(--semantic-warning)` jika `Direncanakan = Tidak`

#### C3. Choice Chip (Chip Pilihan Emosi / Kategori)
- **Height**: `36px` - `44px` (Tap target minimum 44px)
- **Radius**: `8px` (`radius-sm`)
- **State Inactive**:
  - Background: `var(--bg-primary)`
  - Border: `1px solid var(--border-default)`
  - Text: `var(--text-secondary)`
- **State Active**:
  - Background: Tint 8% dari warna emosi/kategori terkait
  - Border: `1.5px solid` warna emosi/kategori
  - Text: `var(--text-primary)` (`font-weight: 500`)
  - Indicator: Dot Emosi (8px) di sisi kiri teks

#### C4. Emotion Scale Selector (Slider Intensitas 1–10)
- **Value Display**: Display (`28px/600`) di atas slider untuk feedback instan
- **Slider Track**: Height `4px`, Background `var(--bg-tertiary)`, Active Fill `var(--accent-primary)`
- **Slider Thumb**: Size `28px x 28px`, `var(--bg-primary)`, Shadow `0 2px 6px rgba(0,0,0,0.15)`
- **Labels**: Footnote `var(--text-secondary)` di ujung kiri ("Ringan") & ujung kanan ("Sangat kuat")
- **Fallback Form**: Segmented button 2 baris (1–5 & 6–10)

#### C5. Buttons (Sistem Tombol Aksi)
| Tipe | Background | Text Color | Height | Border | Radius |
|---|---|---|---|---|---|
| **Primary** | `var(--accent-primary)` (`#007AFF`) | `#FFFFFF` | 50px | None | 10px |
| **Secondary** | `var(--bg-secondary)` (`#F7F7F5`) | `var(--text-primary)` | 44px | `1px solid var(--border-default)` | 10px |
| **Text/Link** | Transparent | `var(--accent-primary)` | Auto | None | 0 |
| **Destructive** | Transparent | `var(--semantic-expense)` (`#FF3B30`) | 44px | None | 10px |

#### C6. Navigation Architecture & FAB
- **Bottom Tab Bar**:
  - Height: `56px` + safe area inset bottom
  - 4 Tab: Beranda (`house`), Riwayat (`list.bullet`), Insight (`chart.bar`), Refleksi (`book`)
  - Icon Size: `20px`
  - Active Tab: `var(--accent-primary)`
- **Floating Action Button (FAB)**:
  - Position: Floating kanan bawah (`16px` dari kanan, `72px` dari bawah)
  - Size: `56px x 56px` (Circle)
  - Background: `var(--accent-primary)` (`#007AFF`)
  - Icon: `plus` (White, 24px)
  - Shadow: `0 4px 12px rgba(0, 122, 255, 0.3)`

---

## 3. Implementasi CSS Variables (`assets/design-tokens.css`)

```css
/* ReflectSpend Design System CSS Variables */
:root {
  /* Primitive Colors */
  --rs-color-white: #FFFFFF;
  --rs-color-sand-50: #F7F7F5;
  --rs-color-sand-100: #EFEFED;
  --rs-color-sand-200: #E5E5E3;
  --rs-color-charcoal-400: #A0A0A0;
  --rs-color-charcoal-600: #6B6B6B;
  --rs-color-charcoal-900: #1A1A1A;

  /* Semantics */
  --rs-blue: #007AFF;
  --rs-green: #34C759;
  --rs-red: #FF3B30;
  --rs-orange: #FF9500;
  --rs-amber: #FFB800;
  --rs-indigo: #5E5CE6;
  --rs-gray: #8E8E93;

  /* Application Aliases */
  --rs-bg-primary: var(--rs-color-white);
  --rs-bg-secondary: var(--rs-color-sand-50);
  --rs-bg-tertiary: var(--rs-color-sand-100);
  --rs-border-default: var(--rs-color-sand-200);
  --rs-border-focus: var(--rs-blue);

  --rs-text-primary: var(--rs-color-charcoal-900);
  --rs-text-secondary: var(--rs-color-charcoal-600);
  --rs-text-tertiary: var(--rs-color-charcoal-400);

  --rs-income: var(--rs-green);
  --rs-expense: var(--rs-red);
  --rs-transfer: var(--rs-gray);
  --rs-warning: var(--rs-orange);

  /* Emotion Spectrum */
  --rs-emotion-senang: var(--rs-amber);
  --rs-emotion-puas: var(--rs-green);
  --rs-emotion-stres: var(--rs-red);
  --rs-emotion-cemas: var(--rs-orange);
  --rs-emotion-sedih: var(--rs-indigo);
  --rs-emotion-bosan: var(--rs-gray);

  /* Typography */
  --rs-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  
  /* Spacing */
  --rs-space-xs: 4px;
  --rs-space-sm: 8px;
  --rs-space-md: 16px;
  --rs-space-lg: 24px;
  --rs-space-xl: 32px;

  /* Radius & Borders */
  --rs-radius-sm: 8px;
  --rs-radius-md: 10px;
  --rs-radius-lg: 12px;
  --rs-radius-sheet: 16px;
  --rs-border: 1px solid var(--rs-border-default);
}

/* Utility Rule for Tabular Numbers in Financial UI */
.rs-tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```

---

## 4. Checklist Kepatuhan UI/UX (Pre-Delivery Checklist)

Setiap halaman atau komponen ReflectSpend wajib mematuhi aturan berikut sebelum dirilis:

- [ ] **Tabular Numerals**: Semua nominal uang menggunakan font `Inter` / `SF Pro` dengan `.rs-tabular-nums`.
- [ ] **Non-judgmental Red**: Merah (`#FF3B30`) hanya digunakan pada teks angka pengeluaran & tombol Hapus, bukan sebagai background banner/card.
- [ ] **Emotion Color Boundary**: Warna emosi hanya berbentuk dot 8px, border chip, atau bar chart — tidak pernah mewarnai background container secara penuh.
- [ ] **Touch Target**: Seluruh tombol, chip, dan tab navigasi memiliki tap target minimal 44px × 44px.
- [ ] **Border over Shadow**: Kartu & container menggunakan `border: 1px solid #E5E5E3` tanpa drop shadow tebal (Notion style).
- [ ] **Speed Requirement**: Form pencatatan pengeluaran dapat diisi dalam waktu kurang dari 60 detik. Field opsional dikelompokkan dalam accordion collapsed.
