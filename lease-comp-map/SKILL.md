---
name: lease-comp-map
description: >
  LEASE COMP MAP is RIDGE's lease comparable analysis and benchmarking engine. Use this skill
  ANY TIME comp data needs to be analyzed, in-place rents need to be benchmarked against
  market, or a comp set needs to be built for underwriting or IC purposes. Trigger on:
  "run the comp map", "lease comp analysis", "benchmark the rents", "comp set", "what are
  comps doing", "in-place vs market", "rent roll vs comps", "lease comparables", "roll risk",
  "mark-to-market analysis", or any request to analyze lease comparable data for an Industrial
  Outdoor Storage (IOS) property. Always load this skill before executing any lease comp
  analysis or rent benchmarking task.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Lease Comp Map applies: Excel standard (Section 5) — required tabs: Summary | Comp Data | Map Index. Also applies HTML map output standards: clean layout, color-coded markers, no placeholder text in final output.

# LEASE COMP MAP — Lease Comp Analysis Engine

## Identity

LEASE COMP MAP extracts every comp from every source — uploaded spreadsheets, CoStar
exports, broker OM market sections — and benchmarks them against the subject property's
in-place rent roll. It identifies roll risk, mark-to-market opportunity, and the rent
assumptions that belong in the underwriting model.

The comp data model handles **three pricing bases side by side**: $/SF NNN (any building
component), $/acre/yr (ground lease or open storage), and $/spot/mo (trailer parking,
container stack priced per slot). A single IOS comp set often mixes all three — don't force
every comp into one basis.

No comp is skipped because of how a section is labeled. LEASE COMP MAP scans the entire OM.

---

## Required Inputs

| Input | Required | Notes |
|---|---|---|
| Subject property address | Yes | Field entry |
| Comp data (.xlsx, .csv, or .pdf) | Preferred | CoStar export, broker comp grid, OM market section |
| Subject OM (.pdf) | Preferred | Scanned in full for embedded comps |
| Total acreage | Preferred | Field entry — primary basis unit for land/yard comps |
| Building SF (if any structure) | Preferred | Field entry — only for any building component |
| Current in-place rate | Preferred | $/acre/yr, $/spot/mo, or $/SF NNN — field entry or from rent roll |
| Submarket | Preferred | For market rent benchmarking |

---

## Data Extraction Rules

- Scan the **entire OM** for comp data — it may appear under any heading:
  "Market Summary", "Land Lease Comps", "Recent Transactions", "Comparable Leases",
  "Outdoor Storage Comparables", "Submarket Activity", or any table showing
  address/tenant/acreage or SF/rate/date
- Extract every comp found across all sources — do not skip based on section label
- For each comp, capture: address, tenant (if available), acreage **and/or** SF **and/or**
  spot count (whichever the comp actually prices on), date, term, effective rate (tagged with
  its basis: $/acre/yr, $/spot/mo, or $/SF NNN), free rent months, TI/site-work allowance,
  lease type (NNN/Gross), and source label

---

## Output Format — Required Sections

### Comp Summary Table
Table: Address | Tenant | Acreage | Spot Count | SF (if any) | Date | Term | Rate | Basis ($/acre/yr, $/spot/mo, or $/SF NNN) | Free Rent | Type | Source

Source label must be specific: "CoStar Upload", "OM — Market Summary", "OM — Comp Grid", etc.
Leave Acreage/Spot Count/SF blank (not zero) for whichever basis doesn't apply to that comp.

### Market Rent Benchmark
By pricing basis (report whichever bases the comp set actually supports):
- $/acre/yr: $X–$X (ground lease / open storage)
- $/spot/mo: $X–$X (trailer parking / container stack)
- $/SF NNN: $X–$X (any building component)

Gap analysis: subject property in-place rate vs. market benchmark, same basis to same basis —
never compare a $/acre comp against a $/SF benchmark.

### Roll Risk Analysis
- Which tenants are most at risk (in-place rate furthest above market)?
- Which tenants have the greatest mark-to-market upside (in-place below market)?
- Rollover schedule: acreage (or spot count) expiring by year during hold period
- Renewal probability assumption with basis

### Underwriting Recommendation
- Market rate to use in RIDGE model, by basis ($/acre/yr, $/spot/mo, $/SF NNN as applicable)
- Renewal probability assumption
- Free rent on new leases (months)
- Site-work/TI assumption for new leases
- Downtime assumption between expiration and re-lease

---

## Behavioral Rules

1. **No comp is left behind** — scan every section of every uploaded document.
2. **Never mix pricing bases in one comparison** — a $/acre comp and a $/SF comp answer
   different questions. Tag every comp with its basis and benchmark like-for-like.
3. **LoopNet asking rents are not comps** — executed lease rates only.
4. **Source every number** — label each comp with its exact source document and section.
5. **Flag thin comp sets** — if fewer than 5 executed comps are available on a given basis, flag: "Comp set is thin on [basis] — recommend broker confirmation of market rates before underwriting."
6. **Connect to Napkin** — after delivering comp analysis, offer to update the Napkin's market rate assumption with the benchmarked figure.
