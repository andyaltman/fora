# itrvl Design System — Style Guide

A design language extracted from the Safari Brain dashboard. Apply it to any data-driven internal tool or intelligence surface.

---

## Folder structure

```
style-guide/
├── STYLE_GUIDE.md          ← This file
└── fonts/
    ├── Athelas/            ← Display / heading serif (4 weights)
    │   ├── Athelas-Regular.ttf
    │   ├── Athelas-Italic.ttf
    │   ├── Athelas-Bold.ttf
    │   └── Athelas-BoldItalic.ttf
    └── Atyp/               ← Body / UI sans (11 weights)
        ├── AtypDisplay-Thin.ttf
        ├── AtypDisplay-ThinItalic.ttf
        ├── AtypDisplay-Light.ttf
        ├── AtypDisplay-LightItalic.ttf
        ├── AtypDisplay-Regular.ttf
        ├── AtypDisplay-Italic.ttf
        ├── AtypDisplay-Medium.ttf
        ├── AtypDisplay-MediumItalic.ttf
        ├── AtypDisplay-Semibold.ttf
        ├── AtypDisplay-SemiboldItalic.ttf
        └── AtypDisplay-BoldItalic.ttf
```

---

## 1. Fonts

### Declaration

```css
@font-face {
  font-family: 'Athelas';
  src: url('fonts/Athelas/Athelas-Regular.ttf') format('truetype');
  font-weight: 400; font-style: normal;
}
@font-face {
  font-family: 'Athelas';
  src: url('fonts/Athelas/Athelas-Italic.ttf') format('truetype');
  font-weight: 400; font-style: italic;
}
@font-face {
  font-family: 'Athelas';
  src: url('fonts/Athelas/Athelas-Bold.ttf') format('truetype');
  font-weight: 700; font-style: normal;
}
@font-face {
  font-family: 'Athelas';
  src: url('fonts/Athelas/Athelas-BoldItalic.ttf') format('truetype');
  font-weight: 700; font-style: italic;
}

@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-Thin.ttf') format('truetype');
  font-weight: 100; font-style: normal;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-ThinItalic.ttf') format('truetype');
  font-weight: 100; font-style: italic;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-Light.ttf') format('truetype');
  font-weight: 300; font-style: normal;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-LightItalic.ttf') format('truetype');
  font-weight: 300; font-style: italic;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-Regular.ttf') format('truetype');
  font-weight: 400; font-style: normal;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-Italic.ttf') format('truetype');
  font-weight: 400; font-style: italic;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-Medium.ttf') format('truetype');
  font-weight: 500; font-style: normal;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-MediumItalic.ttf') format('truetype');
  font-weight: 500; font-style: italic;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-Semibold.ttf') format('truetype');
  font-weight: 600; font-style: normal;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-SemiboldItalic.ttf') format('truetype');
  font-weight: 600; font-style: italic;
}
@font-face {
  font-family: 'Atyp Display';
  src: url('fonts/Atyp/AtypDisplay-BoldItalic.ttf') format('truetype');
  font-weight: 700; font-style: italic;
}
```

### Usage rules

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display / hero headings | Athelas | 400 | Elegant serif; use for page titles and pull quotes |
| Display italic | Athelas | 400 italic | Blockquotes, agent quotes, inline emphasis |
| Display bold | Athelas | 700 | Sub-headings, card titles, property names |
| Body / UI text | Atyp Display | 300 | Default body weight — feels lighter than regular |
| Labels, tabs, nav | Atyp Display | 500 | Navigation items, stat labels |
| Emphasis / numbers | Atyp Display | 600 | Active tab labels, agent names in grids |
| Micro-labels | Atyp Display | 600 + uppercase + letter-spacing | Section labels, badge text |

```css
--font-display: 'Athelas', Georgia, serif;
--font-body:    'Atyp Display', 'Segoe UI', sans-serif;
```

---

## 2. Colour Palette

### CSS custom properties

```css
:root {
  /* Core palette */
  --color-deep-green:   #123438;   /* Primary brand — header bg, headings, CTA */
  --color-forest:       #3D5A3E;   /* Secondary green — hover states, positive indicators */
  --color-sage:         #6B7F5E;   /* Tertiary green — labels, muted text on dark bg */
  --color-sand:         #FF6E00;   /* Accent orange — active states, links, submit buttons */
  --color-sand-light:   #FF8F3D;   /* Lighter orange — hover on accent elements */

  /* Backgrounds */
  --color-off-white:    #FAF8F4;   /* Page background */
  --color-cream:        #F5F0E8;   /* Elevated surface, card hover background, tag fills */
  --color-warm-tan:     #F4F0E8;   /* Slightly warmer variant — callout backgrounds */

  /* Text */
  --color-charcoal:     #2A2A28;   /* Strong text — names, bold values */
  --color-text:         #3A3A38;   /* Body text */
  --color-text-light:   #6B6B68;   /* Secondary text — metadata, supporting copy */
  --color-text-muted:   #9A9A96;   /* Placeholder, disabled, timestamps */

  /* Borders */
  --color-border:       #E0D8CC;   /* Standard border */
  --color-border-light: #EDE8E0;   /* Subtle border — card edges, table rows */

  /* Shadows */
  --shadow-soft:  0 2px 12px rgba(42,42,40,0.06);
  --shadow-card:  0 4px 20px rgba(42,42,40,0.08);
  --shadow-hover: 0 8px 32px rgba(42,42,40,0.12);
}
```

### Status / semantic colours

These are used inline (not as CSS variables) — apply them directly to specific components.

| Semantic role | Text | Background | Border |
|---|---|---|---|
| High / positive | `#1a6b34` | `#d4edda` | `#1a6b34` |
| Medium / warning | `#856404` | `#fff3cd` | `#856404` |
| Low / negative | `#9a3412` | `#fde8d8` | `#9a3412` |
| Seed / neutral | `#5a5c6b` | `#e2e3e5` | `#9a9a96` |
| Green indicator | `#27AE60` | `rgba(39,174,96,0.12)` | — |
| Amber indicator | `#F5A623` | `rgba(245,166,35,0.12)` | — |
| Red indicator | `#E74C3C` | `rgba(231,76,60,0.10)` | — |
| Info banner bg | `#fef3e8` | — | left `#FF6E00` |
| Error text | `#c0392b` | `#fdf2f0` | — |
| Success season | `#1a5c2c` | `#e8f5ec` | `#c3dfc9` |
| Concern season | `#7a1c24` | `#fdf0f0` | `#ecc8c8` |

---

## 3. Base Styles

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-body);
  font-weight: 300;
  background: var(--color-off-white);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

---

## 4. Typography Scale

```css
/* Page / section title — Athelas, always weight 400 */
.heading-xl {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 400;
  color: var(--color-deep-green);
  line-height: 1.2;
}

/* Profile / entity title */
.heading-lg {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--color-deep-green);
}

/* Section header */
.heading-md {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-deep-green);
}

/* Card / sub-section heading */
.heading-sm {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-deep-green);
}

/* Card title / entity name */
.heading-xs {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-deep-green);
}

/* Micro label — ALL CAPS, wide tracking */
.label-micro {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-sage);
}

/* Standard body */
.body-sm {
  font-size: 0.84rem;
  font-weight: 300;
  color: var(--color-text-light);
  line-height: 1.6;
}

/* Italic pull quote (Athelas) */
.blockquote {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--color-charcoal);
}

/* Hero subtitle */
.hero-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-light);
  font-weight: 300;
  max-width: 900px;
}
```

---

## 5. Layout

### Page wrapper
```css
.main-content {
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 3rem;
}

/* Responsive */
@media (max-width: 960px) {
  .main-content { padding: 0 1.5rem; }
}
```

### Grids

```css
/* Card grid — auto-fills from 320 px minimum */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

/* Two-column with wide right */
.charts-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 2rem;
}

/* Three equal columns */
.three-col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 960px) {
  .charts-row,
  .three-col { grid-template-columns: 1fr; }
}
```

### Spacing rhythm

| Token | Value | Use |
|-------|-------|-----|
| `0.3rem` | 4.8 px | Inline gaps, icon-to-text |
| `0.5rem` | 8 px | Tight element spacing |
| `0.75rem` | 12 px | Internal card padding rows |
| `1rem` | 16 px | Standard gap |
| `1.25rem` | 20 px | Card grid gap |
| `1.5rem` | 24 px | Section padding, modal body |
| `1.75rem` | 28 px | Card padding horizontal |
| `2rem` | 32 px | Chart container padding |
| `2.5rem` | 40 px | Section top padding |
| `3rem` | 48 px | Page horizontal padding |

---

## 6. Components

### 6.1 Header

```css
.site-header {
  background: var(--color-deep-green);
  color: var(--color-cream);
  padding: 1.25rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
}
.site-header h1 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.35rem;
  letter-spacing: 0.03em;
}
.header-meta {
  font-size: 0.78rem;
  color: var(--color-sage);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

### 6.2 Tab navigation

```css
.tab-nav {
  background: var(--color-cream);
  border-bottom: 1px solid var(--color-border);
  padding: 0 3rem;
  display: flex;
}
.tab-nav button {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-light);
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}
.tab-nav button:hover { color: var(--color-text); }
.tab-nav button.active {
  color: var(--color-deep-green);
  border-bottom-color: var(--color-sand);
  font-weight: 600;
}
.tab-nav button.disabled { opacity: 0.35; cursor: default; pointer-events: none; }
```

### 6.3 Cards

All cards share the same base — `border-radius: 3px` is a deliberate choice that reads as almost-square, not rounded.

```css
/* Base card */
.card {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
  padding: 1.5rem 1.75rem;
  transition: all 0.25s ease;
}
.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-1px);
  border-color: var(--color-sand);
}

/* Muted / filled card (uses cream background) */
.card-muted {
  background: var(--color-cream);
  border: 1px solid var(--color-border);
  border-radius: 3px;
  padding: 1.5rem 1.75rem;
}

/* Chart container */
.chart-container {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
  padding: 1.75rem;
}
.chart-container h4 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-deep-green);
  margin-bottom: 0.25rem;
}
.chart-container .chart-subtitle {
  font-size: 0.74rem;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
}
```

### 6.4 Quote / blockquote card

```css
.quote-card {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
  padding: 2rem 2.25rem;
  transition: all 0.3s ease;
}
.quote-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}
.quote-card blockquote {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.55;
  color: var(--color-charcoal);
  margin-bottom: 1.1rem;
  padding-left: 0.5rem;
}
.quote-card .attribution {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-light);
}
/* Left-border accent for "effective" variants */
.quote-card.effective { border-left: 3px solid var(--color-forest); }
```

### 6.5 Stat cards

```css
/* Horizontal stat row */
.stat-cards-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0;
}

/* Mini stat card */
.stat-card-mini {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
  padding: 1rem 1.5rem;
  min-width: 110px;
  text-align: center;
}
.stat-card-mini .scm-value {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-deep-green);
  line-height: 1;
}
.stat-card-mini .scm-label {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-top: 0.3rem;
}

/* Coloured top border variants */
.stat-card-mini.conf-high  { border-top: 3px solid #1a6b34; }
.stat-card-mini.conf-med   { border-top: 3px solid #856404; }
.stat-card-mini.conf-low   { border-top: 3px solid #9a3412; }
.stat-card-mini.conf-seed  { border-top: 3px solid #9a9a96; }
```

### 6.6 Buttons

```css
/* Primary — deep green */
.btn-primary {
  font-family: var(--font-body);
  font-size: 0.84rem;
  font-weight: 500;
  color: white;
  background: var(--color-deep-green);
  border: none;
  border-radius: 3px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  letter-spacing: 0.03em;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--color-forest); }

/* Accent — orange */
.btn-accent {
  background: var(--color-sand);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-accent:hover { background: #e06200; }
.btn-accent:disabled { background: #ccc; cursor: default; }

/* Ghost / outlined */
.btn-ghost {
  font-family: var(--font-body);
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--color-deep-green);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 0.7rem 2.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.03em;
}
.btn-ghost:hover { border-color: var(--color-deep-green); background: var(--color-cream); }
.btn-ghost:disabled { opacity: 0.4; cursor: default; }

/* FAB / floating pill button */
.btn-fab {
  background: var(--color-deep-green);
  color: var(--color-off-white);
  border: none;
  border-radius: 28px;
  padding: 13px 20px;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(18,52,56,0.35);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s, transform 0.1s;
}
.btn-fab:hover { background: #1a4a50; transform: translateY(-1px); }
```

### 6.7 Filter pills

```css
.filter-pills {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.filter-pill {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.3rem 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.filter-pill:hover {
  border-color: var(--color-deep-green);
  color: var(--color-deep-green);
}
.filter-pill.active {
  background: var(--color-deep-green);
  border-color: var(--color-deep-green);
  color: white;
}
```

### 6.8 Agent / item chips (multi-select)

```css
.chip {
  background: var(--color-cream);
  border: 1px solid #d8d0c4;
  border-radius: 20px;
  padding: 6px 14px;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 300;
  color: #444;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;
  user-select: none;
}
.chip:hover { border-color: var(--color-deep-green); color: var(--color-deep-green); }
.chip.selected {
  background: var(--color-deep-green);
  border-color: var(--color-deep-green);
  color: var(--color-off-white);
  font-weight: 400;
}
.chip.selected:hover { background: #1a4a50; }
```

### 6.9 Badges and tags

```css
/* Domain / category tag */
.tag {
  display: inline-block;
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-sage);
  padding: 0.2rem 0.6rem;
  background: var(--color-cream);
  border-radius: 2px;
}

/* Confidence badge */
.conf-badge {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.18rem 0.5rem;
  border-radius: 2px;
}
.conf-badge.HIGH   { background: #d4edda; color: #1a6b34; }
.conf-badge.MEDIUM { background: #fff3cd; color: #856404; }
.conf-badge.LOW    { background: #fde8d8; color: #9a3412; }
.conf-badge.SEED   { background: #e2e3e5; color: #5a5c6b; }

/* Freshness badge */
.freshness-badge {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
}
.freshness-badge.recent { color: var(--color-forest); background: #e8f0e8; }
.freshness-badge.aging  { color: #856404; background: #fff3cd; }

/* Trend arrows */
.trend-arrow {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.1rem 0.3rem;
  border-radius: 2px;
}
.trend-arrow.up     { color: var(--color-forest); background: #e8f0e8; }
.trend-arrow.stable { color: var(--color-text-muted); background: var(--color-cream); }

/* Entity type badge (search results) */
.entity-type-badge {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.18rem 0.45rem;
  border-radius: 2px;
  flex-shrink: 0;
  line-height: 1.4;
}
.entity-type-badge.blue   { background: #e8f0f8; color: #2a5ca8; }
.entity-type-badge.green  { background: #e8f4ec; color: #246b3a; }
.entity-type-badge.tan    { background: #f4f0e0; color: #7a6020; }
.entity-type-badge.purple { background: #f0e8f4; color: #5a2880; }
```

### 6.10 Form elements

All inputs use the same visual language: thin border, 3 px radius, Atyp Display weight 300, orange focus ring.

```css
/* Text input */
.input {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--color-text);
  background: white;
  border: 1px solid #d0c8bc;
  border-radius: 8px;
  padding: 11px 14px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}
.input:focus { border-color: var(--color-deep-green); }
.input::placeholder { color: var(--color-text-muted); }

/* Search bar wrapper (icon + input + clear) */
.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: 3px;
  padding: 0 1.25rem;
  box-shadow: var(--shadow-soft);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-bar:focus-within {
  border-color: var(--color-sand);
  box-shadow: 0 0 0 3px rgba(255,110,0,0.08);
}
.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-text);
  background: transparent;
  padding: 1rem 0;
}

/* Select / dropdown */
.select {
  font-family: var(--font-body);
  font-size: 0.86rem;
  font-weight: 300;
  color: var(--color-text);
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  padding: 0.55rem 2rem 0.55rem 0.85rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236B6B68'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  transition: border-color 0.2s;
}
.select:focus { outline: none; border-color: var(--color-sand); }
.select:disabled { opacity: 0.45; cursor: default; }
```

### 6.11 Tables

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
.data-table th {
  text-align: left;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
}
.data-table td {
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid var(--color-border-light);
  vertical-align: middle;
  color: var(--color-text);
}
.data-table tr:hover td { background: var(--color-cream); }
/* Clickable cell link style */
.data-table .cell-link {
  cursor: pointer;
  color: var(--color-sand);
  font-weight: 500;
  transition: color 0.2s;
}
.data-table .cell-link:hover { color: var(--color-deep-green); }
```

### 6.12 Breadcrumb

```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  flex-wrap: wrap;
}
.breadcrumb .crumb {
  cursor: pointer;
  color: var(--color-sand);
  font-weight: 500;
  transition: color 0.2s;
}
.breadcrumb .crumb:hover { color: var(--color-deep-green); }
.breadcrumb .sep   { color: var(--color-border); }
.breadcrumb .current { color: var(--color-text); font-weight: 500; }
```

### 6.13 Info banners

```css
/* Warning / needs attention */
.banner-warning {
  font-size: 0.8rem;
  color: #9a3412;
  background: #fef3e8;
  border-left: 3px solid var(--color-sand);
  padding: 0.6rem 1rem;
  border-radius: 0 3px 3px 0;
}

/* Coverage gap / callout */
.banner-gap {
  font-size: 0.78rem;
  color: #9a3412;
  background: #fef3e8;
  border-left: 3px solid var(--color-sand);
  padding: 0.5rem 0.75rem;
  border-radius: 0 3px 3px 0;
}
```

### 6.14 Progress / confidence bars

```css
/* Segmented confidence bar */
.conf-bar-wrap {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  min-width: 80px;
  background: var(--color-border-light);
}
.conf-bar-seg        { height: 100%; }
.conf-bar-seg.high   { background: #27AE60; }
.conf-bar-seg.med    { background: #F5A623; }
.conf-bar-seg.low    { background: #E74C3C; }
.conf-bar-seg.seed   { background: #95A5A6; }

/* Thin single-segment bar */
.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--color-border-light);
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}
.progress-bar-fill.high   { background: #27AE60; }
.progress-bar-fill.medium { background: #F5A623; }
.progress-bar-fill.low    { background: #E74C3C; }
```

### 6.15 Domain pip indicators

Small dots used to show coverage across N categories.

```css
.domain-pips {
  display: flex;
  gap: 3px;
}
.domain-pip {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-border);
}
.domain-pip.active { background: var(--color-sage); }
```

### 6.16 Search dropdown

```css
.search-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  box-shadow: var(--shadow-hover);
  z-index: 200;
  max-height: 420px;
  overflow-y: auto;
  display: none;
}
.search-dropdown.open { display: block; }

.search-group-label {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.75rem 1.25rem 0.3rem;
  border-top: 1px solid var(--color-border-light);
}
.search-result-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.25rem;
  cursor: pointer;
  transition: background 0.15s;
}
.search-result-row:hover { background: var(--color-cream); }
.search-result-row.selected { background: var(--color-warm-tan); }
```

### 6.17 Modal

```css
.overlay {
  position: fixed;
  inset: 0;
  z-index: 950;
  background: rgba(18,52,56,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.overlay.open { opacity: 1; pointer-events: all; }

.modal {
  background: var(--color-off-white);
  border-radius: 12px;
  width: 100%;
  max-width: 680px;
  max-height: 82vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(18,52,56,0.3);
  transform: translateY(14px);
  transition: transform 0.2s;
  overflow: hidden;
}
.overlay.open .modal { transform: translateY(0); }

.modal-header {
  background: var(--color-deep-green);
  color: var(--color-off-white);
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.modal-header h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
}
.modal-header .subtitle {
  font-size: 0.75rem;
  opacity: 0.6;
  margin: 3px 0 0;
  font-family: var(--font-body);
  font-weight: 300;
}
.modal-close {
  background: none;
  border: none;
  color: var(--color-off-white);
  font-size: 24px;
  cursor: pointer;
  padding: 2px 8px;
  opacity: 0.65;
  line-height: 1;
  transition: opacity 0.15s;
}
.modal-close:hover { opacity: 1; }

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  min-height: 180px;
}

.modal-footer {
  padding: 14px 20px;
  border-top: 1px solid #e8e2d8;
  background: var(--color-off-white);
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  align-items: center;
}
```

### 6.18 Skeleton loaders

```css
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #ede8e0 25%, #e0d8cc 50%, #ede8e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 3px;
  display: block;
}
/* Usage: add height/width to .skeleton to fill a placeholder area */
.skeleton-text-sm  { height: 12px; width: 60%; margin-bottom: 8px; }
.skeleton-text-lg  { height: 16px; width: 80%; margin-bottom: 8px; }
.skeleton-card {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
  padding: 1.5rem 1.75rem;
  min-height: 180px;
}
```

### 6.19 Empty / error states

```css
.empty-state {
  padding: 3rem 0;
  text-align: center;
  color: var(--color-text-muted);
  font-style: italic;
  font-size: 0.9rem;
}
.error-state {
  padding: 2rem;
  text-align: center;
  color: #a0522d;
  font-style: italic;
  font-size: 0.9rem;
}
```

### 6.20 Footer

```css
.site-footer {
  background: var(--color-deep-green);
  color: var(--color-sage);
  text-align: center;
  padding: 1.5rem;
  font-size: 0.73rem;
  letter-spacing: 0.06em;
  margin-top: 3rem;
}
```

---

## 7. Animations

```css
/* Fade-in with upward drift — use on cards, grids */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
}

/* Staggered children — apply incrementing delays */
.animate-fade-in-up:nth-child(1) { animation-delay: 0.04s; }
.animate-fade-in-up:nth-child(2) { animation-delay: 0.08s; }
.animate-fade-in-up:nth-child(3) { animation-delay: 0.12s; }
.animate-fade-in-up:nth-child(4) { animation-delay: 0.16s; }
.animate-fade-in-up:nth-child(5) { animation-delay: 0.20s; }

/* Typing cursor */
@keyframes blinkCursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: var(--color-sand);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blinkCursor 0.7s infinite;
}

/* Loading dots */
@keyframes dotPulse {
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}
.loading-dots span {
  display: inline-block;
  animation: dotPulse 1.4s infinite;
  margin: 0 1px;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
```

---

## 8. Design Principles

1. **Cream, not white, is the canvas.** The page background is `#FAF8F4`, not white. Cards sit on top at `#FFFFFF`, creating a gentle lift without harsh contrast.

2. **Almost-square radius.** `border-radius: 3px` everywhere except modals (12 px) and pill elements (999 px). Avoid 6–8 px rounded corners — they feel too consumer.

3. **Orange is a signal, not decoration.** `#FF6E00` means "active", "primary action", or "link". Don't use it for general accents; it loses meaning.

4. **Deep green anchors trust.** `#123438` is used for the header, primary headings, and primary CTA buttons. Keep it restrained.

5. **Weight does the work.** Atyp Display weight 300 is the default. Scale up to 500 for UI labels, 600 for active/selected, 700 only for large numerics. Avoid weight 400 for body text — 300 reads softer.

6. **Athelas is for content, not chrome.** Use the serif only for headings, pull quotes, property/entity names, and blockquotes. Never for UI labels, tab text, or buttons.

7. **Micro-labels are always uppercase + tracked.** Any label under ~0.75 rem should be `text-transform: uppercase; letter-spacing: 0.06–0.16em; font-weight: 600;`. This distinguishes metadata from content.

8. **Hover = `translateY(-1px)` + `shadow-hover` + border to `--color-sand`.** Consistent across all interactive cards.

9. **Borders are warm, not grey.** `#E0D8CC` and `#EDE8E0` have a slight ochre warmth. Avoid neutral grey borders.

10. **Status colours are semantic, not branded.** Green/amber/red are reserved for HIGH/MEDIUM/LOW confidence and positive/warning/negative states. Don't reuse them decoratively.
