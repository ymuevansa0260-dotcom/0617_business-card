# Design

Digital business card for a music producer.  
Style direction: quiet Japanese minimalism — warm paper, moss green, clean typography, no decorative noise.

## Visual summary

A single business card sits centered in the viewport. The page background is pure white, like a gallery wall; the card itself reads as a warm, unbleached paper object with soft shadow. The type is in a single humanist sans-serif family (Noto Sans TC) with weight and spacing providing hierarchy. Color is sparse: dark ink for text, moss green for the job title and service labels, warm umber for accents.

## Color palette

Palette strategy: **Restrained** — neutral architecture with one primary brand color and one warm accent.

```css
:root {
  /* Page background: pure white gallery wall */
  --color-page: oklch(1.000 0.000 0);

  /* Card surface: warm unbleached paper, slightly darker than the page */
  --color-paper: oklch(0.970 0.014 85);

  /* Body text: very dark warm gray, >= 7:1 on pure white */
  --color-ink: oklch(0.220 0.010 80);

  /* Secondary text / labels: muted warm gray */
  --color-muted: oklch(0.520 0.010 80);

  /* Primary brand color: moss green */
  --color-primary: oklch(0.580 0.130 150);

  /* Accent color: warm umber wood tone */
  --color-accent: oklch(0.300 0.100 75);
}
```

### Usage rules

- Body text uses `--color-ink` on `--color-page` (or `--color-paper` for labels on the card).
- Primary links and the job title use `--color-primary`.
- Section labels for contact info use `--color-accent` as text; if used as a filled pill or badge, the text inside should be white due to the dark saturated fill.
- Muted secondary text uses `--color-muted`.

## Typography

- **Font family**: `Noto Sans TC`, with fallbacks `Helvetica Neue`, Arial, sans-serif.
- **Font weights**: 300 (light, for large display headings if needed), 400 (body), 500 (subheadings), 700 (name).
- **Scale**:
  - Page title / card name: 2.2rem / ~35px, weight 700, letter-spacing 0.12em
  - Company name: 0.8rem / ~13px, weight 400, letter-spacing 0.2em
  - Job title: 1rem / ~16px, weight 500, letter-spacing 0.1em
  - Contact value: 0.95rem / ~15px, weight 400
  - Contact label: 0.7rem / ~11px, weight 500, letter-spacing 0.08em
  - Service tag: 0.85rem / ~14px, weight 400
  - Section title: 0.8rem / ~13px, weight 500, letter-spacing 0.12em
- Body line length is naturally constrained by the card width (max 460px), well under 75ch.

## Layout

- The card is centered in the viewport with flexbox on `body`.
- Card max-width: 460px, taking 100% of viewport width minus padding on small screens.
- Inside the card:
  - **Header** (top zone): company name, person name, job title, centered, separated from body by a 1px hairline border.
  - **Body** (bottom zone): contact list with label/value pairs in a two-column grid, followed by the services tag list.
- No nested cards; the page is a single surface.
- Contact list uses CSS Grid (`76px 1fr`) to align labels and values cleanly.
- Service tags use flex wrap with a 10px gap.

## Components

### Business card

- Background: `--color-paper`
- Border radius: 6px
- Box shadow: `0 10px 40px rgba(34, 34, 34, 0.08)`
- Overflow hidden

### Card header

- Padding: 42px 36px 30px
- Background gradient from white to `--color-paper`
- Border bottom: 1px solid neutral hairline
- Text centered

### Contact list item

- Two-column grid
- Bottom border: 1px solid `--color-paper` mixed with ink
- Last item has no bottom border

### Service tag

- White background (`--color-page`)
- 1px border, border-radius 20px
- Padding 7px 16px

## Motion

- Keep motion minimal and purposeful.
- Optional page-load: a single 300ms ease-out opacity + translateY(8px → 0) on the card.
- Reduced-motion fallback: instant display, no transform.
- No hover effects that change layout; links may have a subtle opacity shift only.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Responsive behavior

- Below 480px: reduce padding on card header/body; shrink name to 1.8rem; contact label column narrows to 64px.
- Card always stays within the viewport with `max-width: 100%` and safe padding.

## Current implementation notes

- The business card surface is now **black** (#141414) with a subtle warm charcoal second tone.
- The card is **horizontal**: CSS Grid splits it into a left identity column and a right contact/services column on desktop, then stacks vertically on screens narrower than 680px.
- Paper texture is rendered with an SVG `feTurbulence` noise filter overlaid at low opacity in `overlay` blend mode, producing a matte, grainy paper feel visible on dark surfaces.
- Type colors were inverted for dark mode: `--color-ink` is warm off-white for primary text, `--color-primary` is a muted moss green, and `--color-accent` is warm umber for labels.
- The page background is `oklch(0.94 0.005 0)` (very light warm gray) so the black card floats cleanly.
- A short `card-enter` fade-in animation is included; it is disabled under `prefers-reduced-motion: reduce`.
- Responsive breakpoint at 680px flips the layout to vertical stacking for phones.
