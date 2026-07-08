# Design System SKILL — RIDGE × Dalfen Industrial

**Single source of truth for visual language across the RIDGE Intelligence app, Dalfen print collateral, and every PPTX/PDF/Excel deliverable produced by a RIDGE skill.**

This skill defines tokens and components. It is paired with — and never overrides — `output-standard/STANDARD.md`, which governs data integrity, hurdle formatting, and QA protocol on shipped deliverables.

---

## 1 · Two surfaces, one system

The system runs in two paired modes. Tokens cover both; choose by surface.

| Surface | Background | Type voice | Primary mark | Used for |
|---|---|---|---|---|
| **RIDGE — Web/App** | Dark (`--bg #0D1117`) | System sans + JetBrains Mono | RIDGE wordmark (action blue) | `index.html`, skill panels, in-app deliverables |
| **Dalfen — Print/IC** | Light (`#FFFFFF`) | Display serif + Plus Jakarta Sans | Dalfen wordmark (PLACEHOLDER — Entrada PMS 288 value, not Dalfen's) | IC memos, cover slides, PDF reports, brand collateral |

Within a single PPTX deck, a Dalfen-branded cover/divider may pair with RIDGE-styled content slides — that is the canonical "Midnight Executive" treatment in `STANDARD.md §3.1`.

---

## 2 · How to use the system

1. **Always import tokens.** Every HTML deliverable starts with `<link rel="stylesheet" href="colors_and_type.css">` (path-adjusted). Never re-declare hex codes inline.
2. **Use semantic classes first.** `.kpi`, `.kpi-label`, `.badge-conviction.high`, `.risk-pill.medium`, `.ridge-eyebrow` — these encode intent and are stable across surfaces.
3. **Use CSS variables for local components.** When a class doesn't fit, reach for `var(--navy)` / `var(--blue)` / `var(--space-4)` — never raw hex.
4. **PPTX/PDF generators read this same palette.** When generating a `.pptx` via pptxgenjs, mirror the hex codes from `:root` exactly (no rounding, no "close enough" greens). The QA pass in `STANDARD.md §3.5` will reject mismatches.
5. **One radius (6px), one base unit (4px).** Resist the urge to introduce 10px corners or 7px gaps. The system reads as institutional precisely because the rhythm is locked.

---

## 3 · Token reference

All tokens live in `colors_and_type.css`. Categories:

- **Brand core** — `--dalfen-pms-300/288`, `--dalfen-stone`, `--dalfen-ink`
- **RIDGE surface** — `--bg`, `--surface`, `--surface-2`, `--border`, `--border-strong`
- **RIDGE accent** — `--navy`, `--navy-deep`, `--blue`, `--blue-dim`, `--ice`, `--ice-row`
- **Semantic** — `--green`, `--amber`, `--red`, plus risk-specific `--green-mitigant`, `--amber-warm`
- **Conviction** — `--gold` (high), `--blue` (needs data), `--watch-mint` (watch list)
- **Type** — `--font-display` (Fraunces/Juana), `--font-sans` (Plus Jakarta), `--font-system`, `--font-mono` (JetBrains Mono)
- **Scale** — `--fs-h1/h2/h3/body/label/micro/kpi/kpi-hero`
- **Spacing** — `--space-1` (4px) through `--space-12` (48px)
- **Radius** — `--radius-sm` (3px), `--radius` (6px), `--radius-pill` (10px)

---

## 4 · Visual rules (non-negotiable)

These match and extend `STANDARD.md`:

1. **No light-gray KPI boxes.** Operational KPI = navy `#1E2761`. Return-metric KPI = dark green `#1B5E20`.
2. **No horizontal accent line under slide titles.** Use whitespace or background contrast.
3. **Borders carry hierarchy, not shadows.** Cards = 1px `var(--border)` only. Reserve shadow for `--shadow-toast` (bottom-right notice) and `--shadow-modal` (centered overlay).
4. **All financial metrics carry two decimals.** `14.75%`, `1.77x`, `7.50%`. Never `15%`, never `1.8x`.
5. **Risk encoding is always a filled rectangle.** Plain-text "High" with no fill is a QA failure.
6. **Conviction encoding uses left-border on cards** (`border-left: 4px solid var(--gold/blue/watch-mint)`), and pill badges in lists.
7. **Display serif (`--font-display`) pairs with navy or ink only.** Never on a blue background, never inside the RIDGE app.
8. **Mono carries every number.** KPIs, addresses, tickers, table data, monetary figures — all `var(--font-mono)`.

---

## 5 · Component inventory

Built and previewed under `preview/`. Each is a token-driven, drop-in pattern:

| Component | File | Used by |
|---|---|---|
| Color palettes (3) | `preview/colors-*.html` | All surfaces |
| Brand lockups | `preview/brand-lockups.html` | App header, IC cover, PDF mastheads |
| Type scale + KPI scale | `preview/type-scale.html` | All deliverables |
| Spacing / radius / elevation / icons | `preview/spacing-elevation-icons.html` | Layout reference |
| Buttons, inputs, badges, KPI grid, returns table, deal cards, verdict banner, toast | `preview/components.html` | RIDGE skill panels, IC slides, pipeline cards |

---

## 6 · When extending the system

- **New color** → propose it as a CSS var in `colors_and_type.css` first; never hex-inline. Justify against existing tokens.
- **New component** → add a preview HTML in `preview/`, register it via the asset manifest, link it from this SKILL.
- **New skill output** → consult `STANDARD.md` §2 first (data integrity), then §3/§4/§5 for the target format. This SKILL governs visual tokens; STANDARD governs structure and QA.

---

## 7 · Files

- `colors_and_type.css` — token source of truth
- `assets/ridge-wordmark.svg`, `assets/ridge-favicon.svg`, `assets/dalfen-wordmark.svg`, `assets/dalfen-wordmark-knockout.svg`
- `preview/*.html` — every preview card, registered to the Design System tab
- `output-standard/STANDARD.md` — paired deliverable QA rules

---

_Revision history_

| Date | Change |
|---|---|
| 2026-04-27 | Initial design system skill; tokens, brand, type, spacing, components, iconography established. |
