# Design

Digital business card for a music producer.  
Style direction: dark, premium business card with subtle Japanese minimalism — black matte surface, single warm gold accent, geometric triangular grid pattern, restrained typography.

## Visual summary

A single horizontal business card sits centered in the viewport. The page background is light warm gray, like a concrete table; the card reads as black matte paper with a faint gold triangular grid and soft grain. The text is left-aligned, with name large and bold, job title in brass gold, and contact labels in the same gold. Color use is restrained: black, off-white text, one gold family, and muted labels.

## Color palette

Palette strategy: **Committed / Restrained** — a near-black surface carries the card, with one warm metal accent used sparingly for hierarchy and pattern.

```css
:root {
  /* Page background: light warm gray, like a concrete display surface */
  --color-page: #f0f0f0;

  /* Card surface: near-black matte */
  --color-card: #141414;

  /* Card gradient overlay: slightly lighter near edge for depth */
  --color-card-warm: #181818;

  /* Body text: warm off-white, high contrast on black */
  --color-ink: #f5f2eb;

  /* Secondary text / labels: muted warm gray */
  --color-muted: #a8a59d;

  /* Primary brand color: brass gold, job title and contact labels */
  --color-primary: #bfa37c;

  /* Accent color: lighter soft gold, section headings */
  --color-accent: #d4c5a9;

  /* Geometric pattern lines and borders: same brass gold with transparency */
  --color-gold: #bfa37c;
  --color-border: rgba(191, 163, 124, 0.20);
  --color-tag-bg: rgba(191, 163, 124, 0.10);
}
```

OKLCH design-token equivalents (for reference):

- `--color-page`: `oklch(0.94 0.002 70)`
- `--color-card`: `oklch(0.18 0.005 70)`
- `--color-ink`: `oklch(0.96 0.012 85)`
- `--color-muted`: `oklch(0.70 0.015 80)`
- `--color-primary`: `oklch(0.70 0.100 78)`
- `--color-accent`: `oklch(0.82 0.070 78)`

### Usage rules

- Body text (`--color-ink`) sits directly on the black card and reaches > 15:1 contrast.
- Primary labels and the job title use `--color-primary` (brass gold); against black it still exceeds 4.5:1.
- Section headings use `--color-accent` (lighter gold); reserved for service-list category labels.
- Muted secondary text uses `--color-muted`; only for the small company line and must remain readable.
- Gold is the single accent family. It appears in the geometric grid, job title, labels, borders, and tag backgrounds.

## Typography

- **Font family**: `Noto Sans TC`, with fallbacks `Helvetica Neue`, Arial, sans-serif.
- **Font weights**: 300 (light, for delicate metadata if needed), 400 (body/contact values), 500 (subheadings/labels), 700 (name).
- **Scale**:
  - Person name: 2.5rem / ~40px, weight 700, letter-spacing 0.12em
  - Company name: 0.8rem / ~13px, weight 400, letter-spacing 0.2em
  - Job title: 1.05rem / ~17px, weight 500, letter-spacing 0.12em
  - Contact value: 0.95rem / ~15px, weight 400
  - Contact label: 0.7rem / ~11px, weight 500, letter-spacing 0.08em
  - Service tag: 0.85rem / ~14px, weight 400
  - Service section title: 0.8rem / ~13px, weight 500, letter-spacing 0.12em
- All text is left-aligned within its column. The narrow card width keeps line length under 60ch.

## Layout

- The card is centered in the viewport using flexbox on `body`.
- Card max-width: 760px; on phones it stacks vertically and narrows to 460px.
- Inside the card (desktop):
  - **Left column** (2fr): company name, person name, job title.
  - **Right column** (3fr): contact list and service tags, separated by a thin gold-tinted vertical rule.
- No nested cards; the page is a single surface.
- Contact list uses CSS Grid (`72px 1fr`) to align labels and values.
- Service tags use flex wrap with a 10px gap.

## Components

### Business card

- Background: `--color-card` (#141414)
- Border radius: 10px
- Box shadow: `0 24px 70px rgba(0, 0, 0, 0.30)`
- Overflow hidden
- Two texture layers via pseudo-elements:
  1. `::before`: SVG fractal-noise grain at low opacity, blend mode `overlay`, for matte paper feel.
  2. `::after`: CSS repeating-linear-gradient triangular grid in gold, blend mode `screen`, masked to be stronger on the right side.

### Card header

- Padding: 42px 36px 42px 44px (desktop); 32px 28px 24px (mobile)
- Background: a subtle left-to-right gradient from opaque card color to semi-transparent, keeping the name fully legible over the geometric pattern.

### Card body

- Padding: 42px 44px 42px 36px (desktop); 24px 28px 32px (mobile)
- Border-left: 1px solid `--color-border`
- On mobile, border-left is removed and a top hairline border takes its place.

### Service tag

- Background: `--color-tag-bg`
- Border: 1px solid `--color-border`
- Border radius: 20px
- Padding: 7px 16px

## Motion

- A single, short page-load entrance: the card fades in and rises 12px over 0.6s using `cubic-bezier(0.16, 1, 0.3, 1)`.
- No continuous animations, no hover transforms that change layout.
- Reduced-motion fallback disables the entrance entirely.

## Responsive behavior

- Below 680px: the card switches to a single-column vertical stack. The geometric pattern mask flips from a left-to-right fade to a top-to-bottom fade, so the stacked text area stays clean.
- Card width becomes `max-width: 460px` and `min-height` is removed.
- Name scales down to 2rem on mobile.

## Current implementation notes

- The current `src/css/style.css` implements this black-and-gold system.
- The page background is light warm gray (`#f0f0f0`); the card surface is near-black (`#141414`).
- The geometric pattern is built purely with CSS `repeating-linear-gradient` lines at 60°, -60°, and 0°, colored in a semi-transparent brass gold and blended with `screen`.
- A CSS mask fades the geometric pattern so it is densest on the right side and almost disappears under the left text column.
- Paper grain is still provided by an SVG `feTurbulence` noise layer, keeping the black surface from feeling flat and plastic.
- `src/js/main.js` loads the card content from local sample data and does not auto-call the API.
