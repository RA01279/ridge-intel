<!-- Append this block to /output-standard/STANDARD.md just before the SECTION 6 — REVISION HISTORY table.
     After pasting, bump the revision-history table with a new row noting the design-system reference. -->

---

## SECTION 7 — DESIGN SYSTEM REFERENCE

All colors, typography, spacing, radii, and component tokens used in RIDGE exports (PPTX, PDF, Excel, in-app deliverables) trace to a single source:

**`/design-system/colors_and_type.css`**

This file is the canonical token sheet. Generators (pptxgenjs, ExcelJS, docx, PDF builders) must mirror its hex codes exactly — no rounding, no "close enough" greens. Component-level patterns (KPI boxes, conviction badges, risk pills, deal cards, verdict banners) are defined and previewed under `/design-system/preview/`. Visual rules (no light-gray KPI boxes, no accent line under titles, two-decimal financial metrics) are enumerated in `/design-system/SKILL.md` §4 and supersede any local skill defaults.

When this STANDARD and the design system SKILL.md disagree, STANDARD wins for data-integrity / hurdle / QA rules; SKILL.md wins for visual tokens.

### Files in `/design-system/`

| File | Purpose |
|---|---|
| `colors_and_type.css` | Canonical CSS variables (color, type, spacing, radius, shadow) |
| `SKILL.md` | Design system reference — usage rules, component inventory, visual non-negotiables |
| `preview/colors-primary.html` | Brand + accent palette swatches |
| `preview/colors-neutrals.html` | Surface / border / text neutrals |
| `preview/colors-semantic.html` | Status, risk, conviction colors |
| `preview/brand-lockups.html` | RIDGE wordmark + Entrada wordmark (light + knockout) |
| `preview/type-scale.html` | Type scale, KPI scale, voice samples |
| `preview/spacing-elevation-icons.html` | 4px spacing scale, radii, shadow primitives, 16-icon line set |
| `preview/components.html` | Buttons, inputs, badges, KPI grid, returns table, deal cards, verdict banners, toast |
| `preview/ui-kit-app-surfaces.html` | RIDGE app shell — header, hero, skill panel, pipeline cards |
| `assets/ridge-*.svg / .png` | RIDGE wordmark + favicon |
| `assets/entrada-*.svg / .png` | Entrada wordmarks (light, knockout, vertical, horizontal, e-mark) |
