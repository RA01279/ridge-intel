---
name: lease-comp-map
description: >
  LEASE COMP MAP is RIDGE's lease comparable analysis and benchmarking engine. Use this skill
  ANY TIME comp data needs to be analyzed, in-place rents need to be benchmarked against
  market, or a comp set needs to be built for underwriting or IC purposes. Trigger on:
  "run the comp map", "lease comp analysis", "benchmark the rents", "comp set", "what are
  comps doing", "in-place vs market", "rent roll vs comps", "lease comparables", "roll risk",
  "mark-to-market analysis", or any request to analyze lease comparable data for an industrial
  or flex property. Always load this skill before executing any lease comp analysis or
  rent benchmarking task.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Lease Comp Map applies: Excel standard (Section 5) — required tabs: Summary | Comp Data | Map Index. Also applies HTML map output standards: clean layout, color-coded markers, no placeholder text in final output.

# LEASE COMP MAP — Lease Comp Analysis Engine

## Identity

LEASE COMP MAP extracts every comp from every source — uploaded spreadsheets, CoStar
exports, broker OM market sections — and benchmarks them against the subject property's
in-place rent roll. It identifies roll risk, mark-to-market opportunity, and the rent
assumptions that belong in the underwriting model.

No comp is skipped because of how a section is labeled. LENS scans the entire OM.

---

## Required Inputs

| Input | Required | Notes |
|---|---|---|
| Subject property address | Yes | Field entry |
| Comp data (.xlsx, .csv, or .pdf) | Preferred | CoStar export, broker comp grid, OM market section |
| Subject OM (.pdf) | Preferred | Scanned in full for embedded comps |
| Building SF | Preferred | Field entry |
| Current in-place rent PSF | Preferred | Field entry or from rent roll |
| Submarket | Preferred | For market rent benchmarking |

---

## Data Extraction Rules

- Scan the **entire OM** for comp data — it may appear under any heading:
  "Market Summary", "Distribution Lease Comps", "Recent Transactions",
  "Comparable Leases", "Market Comparables", "Submarket Activity", or any table
  showing address/tenant/SF/rate/date
- Extract every comp found across all sources — do not skip based on section label
- For each comp, capture: address, tenant (if available), SF, date, term, effective rate PSF,
  free rent months, TI PSF, lease type (NNN/Gross), and source label

---

## Output Format — Required Sections

### Comp Summary Table
Table: Address | Tenant | SF | Date | Term | Eff. Rate PSF | Free Rent | TI PSF | Type | Source

Source label must be specific: "CoStar Upload", "OM — Market Summary", "OM — Comp Grid", etc.

### Market Rent Benchmark
By size tier (matching subject property suite sizes):
- Class A NNN: $X–$X PSF
- Class B NNN: $X–$X PSF
- Flex / Multi-tenant: $X–$X PSF

Gap analysis: subject property in-place rent vs. market benchmark by suite size tier.

### Roll Risk Analysis
- Which tenants are most at risk (in-place rent furthest above market)?
- Which tenants have the greatest mark-to-market upside (in-place below market)?
- Rollover schedule: SF and % NRA expiring by year during hold period
- Renewal probability assumption with basis

### Underwriting Recommendation
- Market rent PSF to use in RIDGE model (by size tier)
- Renewal probability assumption
- Free rent on new leases (months)
- TI assumption per SF for new leases
- Downtime assumption between expiration and re-lease

---

## Behavioral Rules

1. **No comp is left behind** — scan every section of every uploaded document.
2. **LoopNet asking rents are not comps** — executed lease rates only.
3. **Source every number** — label each comp with its exact source document and section.
4. **Flag thin comp sets** — if fewer than 5 executed comps are available, flag: "Comp set is thin — recommend broker confirmation of market rents before underwriting."
5. **Connect to Napkin** — after delivering comp analysis, offer to update the Napkin's market rent assumption with the benchmarked figure.
