---
name: acq-investment-report
description: >
  ACQ INVESTMENT REPORT (ISR) is RIDGE's institutional IC presentation builder. Use this
  skill ANY TIME a deal needs a full investment committee package — including generating
  a 12-slide PowerPoint deck, producing return metric summaries, building the investment
  thesis, drafting the IC recommendation, or assembling a complete IC package from an
  uploaded acquisition model and broker OM. Trigger on: "build the IC deck", "run the ISR",
  "investment report", "IC presentation", "acquisition investment report", "IC package",
  "build the deck", "prepare for IC", or any request to generate a formal investment
  committee presentation for an acquisition. Always load this skill before building any
  IC deck or investment presentation.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. ACQ Investment Report applies: PowerPoint standard (Section 3) in full — all 14 required slides, Midnight Executive palette, and full QA protocol.

# ACQ INVESTMENT REPORT — IC Presentation Builder

## Identity

ACQ INVESTMENT REPORT builds the institutional IC deck. Given an uploaded acquisition
model (Excel) and optional broker OM (PDF), it generates a complete 12–14 slide PowerPoint
package structured for presentation to Entrada Partners' investment committee.

Every slide must meet the Midnight Executive standard defined in `output-standard/STANDARD.md`.
Every number must trace directly to the uploaded model. No fabrication. No rounding without
flagging. No empty slide halves.

---

## Required Inputs

| Input | Required | Notes |
|---|---|---|
| Acquisition model (.xlsx) | Yes | Primary data source — all return metrics |
| Broker OM (.pdf) | Preferred | Market context, property narrative, comp data |
| Property address | Yes | Field entry |
| Asset type | Yes | Field entry |
| Investment thesis | Preferred | User-entered; feeds Slide 3 directly |
| Key return metrics | Auto-extracted | From model: IRR, EM, YOC, LTV, NOI |

---

## Slide Build Sequence

Build slides in this order. Each slide has a designated data source.

1. **Cover** — address (one line), date, asset type badge, SF | Price | Cap Rate strip
2. **Deal Snapshot** — 2×4 KPI grid (8 metrics), navy + dark green boxes
3. **Investment Thesis** — user thesis input, 3–4 points, left accent bars
4. **Property Overview** — site facts + location narrative from OM
5. **Sources & Uses / Capital Stack** — table from model + stacked bar visual
6. **Return Metrics** — IRR/EM hero callouts + full returns table with status column
7. **Cash Flow Summary** — year-by-year from model, hold period only
8. **In-Place Rent Roll** — full tenant table with delta column, color-coded rows
9. **Lease Expiration Waterfall** — bar chart by year, colored by tenant
10. **Market & Submarket** — vacancy/rent KPIs + comp set bar chart
11. **Sensitivity Analysis** — color-coded IRR × price × hold/exit cap tables
12. **Risk Matrix** — colored severity badges, each risk with specific mitigant
13. **IC Recommendation** — verdict banner, KPI strip, numbered next steps

---

## Data Extraction Rules

- Parse all sheets of the uploaded Excel model — return metrics may appear on any tab
- Extract: IRR (levered + unlevered), EM (levered + unlevered), YOC by year, DSCR by year,
  NOI by year, purchase price, loan amount, LTV, equity required, exit value
- Scan the full OM PDF for: rent roll table, lease comps, market metrics, property narrative
- If a value appears in both sources and they conflict, flag with `[VERIFY — model vs. OM discrepancy]`
- Never fabricate a return metric — if it cannot be extracted, use `[VERIFY]`

---

## QA Checklist (run before delivering any deck)

- [ ] Every KPI on every slide traces to source model or OM
- [ ] No truncated numbers anywhere in the deck
- [ ] Cover slide property name fits on one line
- [ ] All KPI boxes identical dimensions within each slide
- [ ] Sensitivity table cells all color-coded (no plain white data cells)
- [ ] Risk severity badges are colored rectangles, not plain text
- [ ] Lease expiration waterfall chart present and data matches rent roll
- [ ] Footer on every slide with property address and page number
- [ ] No thin horizontal accent lines under any slide title
- [ ] IC Recommendation verdict banner color matches outcome (green/amber/red)
