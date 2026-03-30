# RIDGE Output Quality Standard
**Single source of truth for all RIDGE deliverable formatting, data integrity, and QA.**
All skills that produce a deliverable must reference and apply this document.

---

## SECTION 1 — FIRM IDENTITY & BRANDING

| Field | Value |
|---|---|
| Firm name | Entrada Partners |
| Platform | RIDGE — Real Intelligence for Deal Generation & Evaluation |
| Confidentiality footer | `ENTRADA PARTNERS \| CONFIDENTIAL & PROPRIETARY` |
| Target markets | Atlanta (primary), Savannah (primary), DFW, Houston — Austin: watch only |
| Asset types | Industrial, Flex Industrial, Single-Story Office (conversion only) |
| Deal size | $10M–$70M \| Sweet spot: $25M–$35M |
| IRR hurdle | 14.75%+ Levered |
| YOC target | 7.5%–8.0% by Year 3/4 |
| Equity multiple | 1.7x+ (program floor) |

---

## SECTION 2 — UNIVERSAL QUALITY RULES

These rules apply to every output type — PPTX, PDF, and Excel.

### 2.1 Data Integrity (Non-Negotiable)

- Every number must be sourced directly from the uploaded model, OM, or CoStar export — **never estimated or fabricated**
- If a value cannot be confirmed from source: use `[VERIFY]` — never guess
- After generation, cross-check every KPI against source using markitdown (PPTX/DOCX) or read_excel (XLSX) — verify values match
- **Number formatting is mandatory and consistent:**

| Type | Format | Never |
|---|---|---|
| Currency | $X,XXX,XXX | $X.XXm or shorthand |
| PSF | $XXX PSF (always include unit) | $XXX without unit |
| Percentages | X.X% (one decimal) | Rounding to whole number |
| Multiples | X.XXx (two decimals) | X.Xx |
| Square feet | XXX,XXX SF (comma-formatted) | 62k SF or abbreviation |

### 2.2 Zero-Tolerance Errors

The following automatically fail QA and require a full rebuild:

- Any truncated number (e.g., `$18,055,70` instead of `$18,055,700`)
- Any visible placeholder text in a final deliverable (`[Insert X]`, `TBD`, etc.)
- Any metric that contradicts another metric on the same document
- Any slide or page where empty space consumes more than 40% of the layout
- Any font size below 9pt in tables or 11pt in body text
- Firm name or confidentiality footer missing from any page or slide
- Any `[VERIFY]` placeholder remaining in a deliverable sent externally

### 2.3 Tone & Voice

- Direct, institutional — no hedging language
- Prohibited filler phrases: "it is worth noting", "it should be mentioned", "importantly", "significantly", "it is important to note"
- Every thesis statement leads with the conclusion, not the setup
- Every stated risk must include a specific mitigant — never state a risk without the corresponding defense
- Write for an IC audience: assume sophistication, cut explanatory padding

---

## SECTION 3 — POWERPOINT STANDARD

### 3.1 Color Palette — Midnight Executive (mandatory for all PPTX)

| Element | Hex | Usage |
|---|---|---|
| Navy | `#1E2761` | Slide titles, headers, footer strip, KPI boxes |
| White | `#FFFFFF` | Content slide background, text on dark backgrounds |
| Dark green | `#1B5E20` | Return metric KPI boxes (IRR, EM, YOC) |
| Medium blue | `#2196F3` | Accent elements, chart series, left border bars |
| Light blue | `#CADCFC` | KPI labels on dark backgrounds |
| Table row A | `#F0F4FF` | Alternating table rows |
| Table row B | `#FFFFFF` | Alternating table rows |
| Risk HIGH | `#C0392B` | Red badge background |
| Risk MEDIUM | `#E67E22` | Orange badge background |
| Risk LOW | `#27AE60` | Green badge background |

**NEVER use light gray KPI boxes. All callout boxes use navy (`#1E2761`) or dark green (`#1B5E20`) only.**

### 3.2 Typography

| Element | Font | Size | Style |
|---|---|---|---|
| Slide title | Calibri | 32–36pt | Bold |
| KPI numbers | Calibri | 44–52pt | Bold |
| KPI labels | Calibri | 11pt | Regular, color `#CADCFC` on dark bg |
| Body text | Calibri | 13–14pt | Regular |
| Table headers | Calibri | 12pt | Bold, white on navy |
| Table body | Calibri | 12–13pt | Regular |
| Footer | Calibri | 9pt | Regular |

**NEVER place a horizontal accent line directly under a slide title.** Use whitespace separation or background color contrast only. Thin decorative lines are an AI-generated slide hallmark and are prohibited.

### 3.3 Layout Rules

- Every slide must have a footer strip: property address left | page number right | navy background
- Cover and section divider slides: dark navy background, white text
- Content slides: white background
- **KPI callout boxes: always 2 rows of 3 or 2 rows of 4 — never mixed sizing within the same slide**
- All boxes in a KPI grid must be identical in width, height, and padding
- Minimum 0.5" margins on all four sides
- Every content slide must include at least one visual element beyond text: chart, color-coded table, icon strip, or graphic

### 3.4 Required Slides — IC Presentation

| # | Slide | Key Requirements |
|---|---|---|
| 1 | **Cover** | Property name on one line (reduce font until it fits, max 54pt). Right panel: aerial/map image or labeled placeholder. Bottom strip: asset type badge, SF \| Price \| Cap Rate stats, Entrada branding. No empty lower half. |
| 2 | **Deal Snapshot** | 6–8 KPI callouts in uniform grid (2×3 or 2×4). Navy boxes for operational KPIs, dark green for return metrics. All boxes identical dimensions. |
| 3 | **Investment Thesis** | 3–4 points. Bold header (one line, navy) + 2-sentence supporting body. Left accent bar in medium blue instead of numbered circle. Breathing room between points. Body text max 13pt. |
| 4 | **Property Overview** | Two-column: site facts left, location/connectivity right. Photo placeholder or map if available. |
| 5 | **Sources & Uses / Capital Stack** | Table left (all amounts correctly formatted). Stacked bar visual right showing equity vs. debt % split with color fills and percentage labels. Both elements vertically centered. |
| 6 | **Return Metrics** | IRR and EM as dominant hero callouts. Full returns table below with status column (✅ PASS / ⚠️ AT FLOOR / ❌ MISS). |
| 7 | **Cash Flow Summary** | Year-by-year table, hold period only. DSCR by year included. |
| 8 | **In-Place Rent Roll** | Full tenant table with In-Place PSF and Market PSF columns. Delta column (in-place vs. market). Color-code rows: red if >15% below market, green if at/above market. |
| 9 | **Lease Expiration Waterfall** | Bar chart: X axis = calendar years, Y axis = SF expiring, bars color-coded by tenant. Horizontal dashed line at 100% occupancy. Title: "Lease Expiration Schedule". |
| 10 | **Market & Submarket Analysis** | Vacancy, rent, and supply KPI callouts. Bar chart of comp set PSF prices using pptxgenjs chart API. |
| 11 | **Sensitivity Analysis** | Color-coded IRR/EM tables: green ≥15%, yellow 12–15%, red <12%. Every cell colored — no plain white cells in the data range. |
| 12 | **Risk Matrix** | Severity as colored filled rectangles: HIGH=red, MEDIUM=orange, LOW=green. Never plain text. Each risk paired with specific mitigant. |
| 13 | **IC Recommendation** | Verdict banner (color-matched to outcome). KPI strip. Detailed next-steps as numbered list. |

### 3.5 QA Protocol (PPTX)

After every PPTX generation, execute in order:

1. Convert to images for visual inspection
2. Inspect every slide for: truncation, text overflow, empty space >40%, misalignment, color contrast failures, missing footer
3. Verify every KPI on every slide against source data
4. Fix any issue found, re-render, and do a second full pass
5. **Do not deliver without completing at least one full fix-and-verify cycle**

---

## SECTION 4 — PDF STANDARD

### 4.1 Layout

- Page size: Letter (8.5" × 11") or A4
- Margins: 0.75" all sides minimum
- Header: Entrada Partners placeholder left | Document title center | Date right — on every page
- Footer: `ENTRADA PARTNERS | CONFIDENTIAL & PROPRIETARY | Page X of Y` — on every page
- Section dividers: full-width navy bar with white section title

### 4.2 Typography

| Element | Size | Style |
|---|---|---|
| Document title | 20pt | Bold, navy |
| Section headers | 14pt | Bold, navy |
| Subsection headers | 12pt | Bold |
| Body text | 11pt | Regular, 1.4 line spacing |
| Table headers | 11pt | Bold, white on navy |
| Table body | 10–11pt | Regular, alternating `#F0F4FF`/white rows |
| Captions/footnotes | 9pt | Gray |

### 4.3 Content Rules

- Every PDF must open with an Executive Summary (max 1 page): property/deal name, key findings, verdict/recommendation, top 3 risks, next steps
- Risk flags must use color-coded labels: HIGH (red background), MEDIUM (orange), LOW (green)
- Clause/section references must be exact: "Section 4.2(b)" not "the relevant section"
- Never use bullet-only pages — every bulleted section must have an introductory sentence

### 4.4 QA Protocol (PDF)

1. Verify page count is reasonable for content volume
2. Confirm header and footer appear on every page
3. Verify no text is cut off at page breaks
4. Confirm all risk flags have correct color coding
5. Spot-check 3 random data points against source document

---

## SECTION 5 — EXCEL STANDARD

### 5.1 Workbook Structure

- Tab 1: always named **"Summary"** — executive overview and key metrics only
- Subsequent tabs: named by content type (Rent Roll, Cash Flow, Sensitivity, Comp Set, etc.)
- **No unnamed or default "Sheet1"/"Sheet2" tabs in any deliverable**
- Tab color coding: Summary = navy | Financial = dark green | Comps = dark blue | Admin = gray

### 5.2 Formatting

- Header rows: navy fill (`#1E2761`), white bold text, 12pt
- Alternating data rows: `#F0F4FF` / white
- Frozen top row on every tab
- Column widths: auto-fit after population, minimum 10px
- Number formats — applied via cell format, never manually typed:

| Type | Format |
|---|---|
| Currency | `$#,##0` or `$#,##0.00` |
| PSF | `$#,##0.00` with "PSF" in column header |
| Percentages | `0.0%` format (never type "7.1%" as text) |
| Multiples | `0.00"x"` |

- Borders: thin gray on all data cells, medium on header row bottom
- Never use merged cells in data ranges — only in title rows

### 5.3 Required Tabs by Skill

| Skill | Required Tabs |
|---|---|
| The Gavel (Lease Abstract) | Summary \| Rent Roll \| Critical Dates \| Rent Schedule \| Risk Flags |
| Lease Comp Map | Summary \| Comp Data \| Map Index |
| CANVAS | Summary \| Prospect List \| Scoring Matrix \| Contact Log |
| Napkin Screen | Summary \| Assumptions \| Return Stack \| Sensitivity |
| Debt Tool | Summary \| Scenario Comparison \| Amortization Schedule |

### 5.4 QA Protocol (Excel)

1. Open file and verify all tabs present and correctly named
2. Confirm no `#REF!`, `#VALUE!`, or `#DIV/0!` errors in any cell
3. Spot-check 5 calculated cells against manual calculation
4. Verify number formatting applied (not raw decimals like `0.0712` instead of `7.1%`)
5. Confirm frozen rows work on all tabs

---

## SECTION 6 — REVISION HISTORY

| Date | Change |
|---|---|
| 2026-03-30 | Initial version created |
