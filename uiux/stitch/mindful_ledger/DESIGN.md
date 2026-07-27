---
name: Mindful Ledger
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#414755'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#5d5f5d'
  on-secondary: '#ffffff'
  secondary-container: '#e2e3e1'
  on-secondary-container: '#636563'
  tertiary: '#9e3d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c64f00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#e2e3e1'
  secondary-fixed-dim: '#c6c7c5'
  on-secondary-fixed: '#1a1c1b'
  on-secondary-fixed-variant: '#454746'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb595'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7c2e00'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-amount:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 41px
    letterSpacing: -0.5px
  page-title:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.4px
  section-title:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  card-title:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
  body-main:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 22px
  body-secondary:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
  metadata:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.1px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is built on the philosophy of "Financial Mindfulness." It prioritizes a calm, non-judgmental environment that encourages users to reflect on their spending habits without the anxiety typically associated with fintech. 

The aesthetic is **Corporate / Modern**, heavily influenced by minimalist editorial design and high-end productivity tools. It utilizes significant whitespace, a restrained color palette, and clear information hierarchy to reduce cognitive load. Visual depth is achieved through subtle tonal layering rather than heavy shadows, creating a flat yet sophisticated interface that feels organized and trustworthy.

## Colors

This design system utilizes a high-clarity palette designed for readability. The primary background remains pure white to maximize contrast for financial data. 

**Semantic and Emotion Colors** are used sparingly to provide instant visual feedback. Income and Positive emotions utilize green/gold tones, while Expenses and Stress-related inputs use urgent reds and oranges. All semantic colors should be paired with their respective text roles to ensure accessibility.

## Typography

The design system relies on **Inter** for its modern, neutral characteristics and exceptional legibility at small sizes. 

- **Tabular Numerals:** For all financial data and transaction lists, the `tnum` (tabular numbers) OpenType feature must be enabled. This ensures that columns of numbers align vertically, making it easier for users to compare values.
- **Visual Hierarchy:** Use `metadata` for timestamps and secondary labels. `label-caps` should be used for small, non-interactive headers within sidebars or settings.

## Layout & Spacing

The system follows a strict **8px spacing grid**. All padding, margins, and component heights should be multiples of 8 (or 4 for micro-adjustments).

- **Grid:** On Desktop, use a 12-column fixed-width grid (max-width 1200px) centered in the viewport. On Mobile, use a fluid 4-column grid with 16px side margins.
- **Reflow:** For multi-step layouts, content should be centered with a maximum width of 600px to maintain focus and readability.
- **Navigation:** Mobile uses a fixed bottom navigation bar (height: 64px). Desktop uses a fixed left sidebar (width: 240px) with items spaced at `sm` (8px) intervals.

## Elevation & Depth

This design system avoids heavy drop shadows to maintain its minimalist aesthetic. Depth is communicated through:

1.  **Tonal Layering:** The `background_secondary` (#F7F7F5) is used for the main canvas, while white (#FFFFFF) is used for elevated cards and interactive surfaces.
2.  **Stroke Definition:** All containers and cards utilize a 1px solid border in `#E5E5E3`. This provides structural definition without visual weight.
3.  **Active States:** Interactive elements like chips or list items may use a very soft, high-diffusion shadow (0px 4px 12px rgba(0,0,0,0.03)) only when hovered or pressed to indicate tactile feedback.

## Shapes

The shape language is "Soft-Modern." It uses consistent corner radii to feel approachable yet precise.

- **Cards:** Use `12px` to distinguish them from smaller UI elements.
- **Form Elements:** Inputs and Buttons use `10px` for a compact, professional look.
- **Chips:** Emotion choice chips use a fully rounded (pill) radius to signify their distinct, selectable nature.

## Components

### Buttons & Inputs
- **Primary Button:** Height: 50px. Background: `#007AFF`. Text: White, Semibold.
- **Input Fields:** Background: `#EFEFED`. Border: 1px `#E5E5E3`. Typography: `body-main`.
- **Floating Action Button (FAB):** 56x56px circle, Background: `#007AFF`. Icon: White "+" (SF Pro or similar). Fixed to bottom-right (24px offset).

### Cards & Lists
- **Summary Cards:** White background, 1px `#E5E5E3` border, `12px` radius. Use for high-level balance and insight overviews.
- **Transaction List Items:** Height: 72px. Icon on the left (rounded-square background in `#F7F7F5`), title and emotion tag in the center, and tabular amount on the right.
- **Emotion Indicators:** Small 8x8px circular dots placed next to transaction titles or category icons, colored by the Emotion Palette.

### Specialized Components
- **Choice Chips:** Used for emotion logging. Pill-shaped. Unselected: Border 1px `#E5E5E3`, Background transparent. Selected: Background color matching the emotion, text: White.
- **Progress Bars:** Track height: 6px. Background: `#EFEFED`. Fill: Primary Accent or Semantic color based on context (e.g., green for income goal, red for budget limit).
- **Navigation:**
    - **Bottom Nav:** 1px top border `#E5E5E3`. Icons use `text_secondary` when inactive and `primary_accent` when active.
    - **Sidebar:** 1px right border `#E5E5E3`. Active state indicated by a 3px vertical line on the far left or a subtle background fill of `#EFEFED`.