---
name: canvas
description: >
  CANVAS is RIDGE's IOS demand-side intelligence and land matching engine. Use this skill
  ANY TIME the user wants to find users for a specific IOS site, identify businesses that
  need trailer parking, container storage, contractor/material yard, equipment rental, or
  truck terminal space, or build a demand-side prospect list for Dalfen Industrial. Trigger
  on: "find users for this site", "who should lease this yard", "run CANVAS", "IOS demand
  search", "fill this site", "who needs outdoor storage", "find me trailer parking users",
  "IOS prospects", "demand analysis", "what fleets are in this area", "hunt for IOS users",
  or any request to source, identify, or rank potential Industrial Outdoor Storage users
  for a site or submarket. CANVAS operates in two modes — Fill (you have the site, find the
  users) and Hunt (find businesses that need IOS space, feed back into RIDGE acquisition
  targeting). Always load this skill before executing any IOS demand sourcing or demand
  analysis task.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. CANVAS applies: PDF standard (Section 4) and Excel standard (Section 5).

# CANVAS — IOS Demand Intelligence & Site Matching Engine

## Identity

CANVAS is RIDGE's demand-side sourcing engine for Industrial Outdoor Storage. It
identifies, scores, and ranks businesses that are likely users of IOS sites in Dallas–Fort
Worth and Houston — trailer parking operators, container storage users, contractor and
material yards, equipment maintenance and rental operators, truck terminals, and auto/bus
storage fleets. It operates in two modes and uses a four-source data stack.

**Every run produces three deliverables — always all three:**
1. `CANVAS_[Site/Market]_Prospects_[YYYYMMDD].xlsx` — Ranked IOS user prospect list
2. `CANVAS_[Site/Market]_Report_[YYYYMMDD].pdf` — Summary report, top-tier candidates
3. **RIDGE Feed** — Hunt mode candidates with implied acquisition targets flagged for RIDGE pipeline

---

## Operating Modes

### Mode 1 — FILL
**When to use:** You have a specific IOS site under contract, in LOI, or in the pipeline.
You need to identify businesses in the trade area that fit the site and are likely to lease it.

**Input required:**
- Site address
- Total acreage and building coverage % (if any building on site)
- Fencing / gate / paving condition
- Zoning and entitlement status (permitted use / SUP required)
- Asking rate ($/acre or $/spot per month)
- Target move-in timeline
- Municipal permit filing data (optional but preferred — see Data Sources)

**Logic:** Start with the site spec. Work outward into the trade area. Match businesses
by space need, target-user category, and displacement signals. Rank by fit score.

---

### Mode 2 — HUNT
**When to use:** You are scanning a market or submarket for businesses showing displacement
or growth signals — fleet expansion, permit filings for outdoor storage use, or displacement
from a redeveloped industrial site. Output feeds directly back into RIDGE as acquisition targets.

**Input required:**
- Target market / submarket or radius anchor point (DFW or Houston only)
- Target-user filters (default: all active categories — see Target-User Profile)
- Search parameters (default or custom — see Parameter Set)
- Municipal permit filing data (optional but preferred — see Data Sources)

**Logic:** Identify businesses showing growth or displacement signals first. Derive their
implied acreage requirement. Then identify the sites they should be in — flag those
sites as RIDGE acquisition candidates.

**RIDGE integration:** Every Hunt mode output includes a RIDGE Acquisition Feed section —
a list of sites implied by the tenant demand identified, with ownership signal notes
where assessor data is available.

---

## Data Source Stack

Use all available sources. Degrade gracefully if a source is unavailable — never skip
the run, just note the limitation.

### Source 1 — Google Maps / Places (Always Available)
**Role:** Wide-net discovery. Find businesses by target-user category within the defined radius.
**Use for:**
- Initial business identification by category
- Physical presence confirmation (not a virtual/residential address)
- Street view / satellite operational signals — trailer counts, container stacks, yard
  overflow onto shoulders or adjacent lots, visible fleet growth suggesting space constraint
- Business tenure proxy (Google listing age, review history depth)

**Search approach:** Query by target-user category + geography. Cross-reference satellite/
street view for every top-tier candidate before including in output.

### Source 2 — Municipal Permit Filings (User-Provided or Public Record Pull)
**Role:** Precision layer — the highest-signal, IOS-specific data source. Tracks
businesses actively seeking or holding entitlement for outdoor storage use.
**Pull format:** City/county permit and zoning case records (SUP/CUP applications,
site plan filings referencing "outdoor storage," "trailer parking," or "laydown yard").
Filename pattern if user-provided: `Permits_[Jurisdiction]_[Date].xlsx`

**If filings are available, extract:**
- Applicant / business name and current address
- Filing type (SUP/CUP application, site plan, zoning variance)
- Filing status and date → urgency signal (active application = near-term space need)
- Site acreage referenced in the filing
- Jurisdiction (see `municipal-ordinance-reference/SKILL.md` for DFW suburb and Houston
  deed-restriction context)

**If filings are not available:** Proceed with Google Maps + fleet/trucking growth
signals only. Note in output header: "Municipal permit filings not provided — entitlement
urgency signals unavailable."

### Source 3 — Fleet / Trucking Growth Signals (Web Search + Company Sources)
**Role:** Growth signal layer. Identifies fleets and logistics operators expanding
headcount or truck/trailer count that will need yard space before they know it.
**Use for:**
- Fleet size trajectory over 12/24 months (growing fleet = space need incoming)
- Active driver/yard-hand job postings in target market (hiring surge = displacement signal)
- DOT/FMCSA carrier registration growth where available (new power units registered)
- Decision maker identification — fleet manager, terminal manager, owner/principal
- Company age and market tenure confirmation

### Source 4 — Displacement Tracking — Redeveloped Industrial Sites (Web Search + Public Record)
**Role:** Identifies businesses being pushed out of existing industrial buildings and
yards by redevelopment, and back-fills their prior footprint into implied IOS demand.
**Use for:**
- Building permit / demolition permit activity on existing industrial parcels
  (redevelopment of an old industrial building or yard displaces its outdoor-storage users)
- News/press coverage of industrial site sales or redevelopment announcements
- Identifying the outgoing tenant/user of a site slated for redevelopment and their
  next-site search status

---

## Target-User Profile

### Active by Default (Primary Dalfen IOS Users)
These categories are always included unless user explicitly removes them.

| Category | Typical Acreage Range | Site Config | Displacement Signal |
|---|---|---|---|
| Trailer Parking Operators | 2–15 acres | Paved, fenced, no building required | Fleet growth, yard overflow onto shoulders |
| Container Storage Users | 2–20 acres | Paved or compacted base, fenced/gated | Import/export volume growth, chassis pool expansion |
| Contractor & Material Yards | 1–10 acres | Fenced, partial paving, small office/shop optional | Material staging overflow, equipment storage growth |
| Equipment Maintenance & Rental Yards | 2–12 acres | Fenced, shop building + yard | Fleet expansion, service bay capacity constraint |
| Truck Terminals (LTL/parking, non-cross-dock) | 3–25 acres | Paved, fenced, fueling/parking focus | Route expansion, driver domicile growth |
| Auto / Bus Storage Fleets | 2–15 acres | Paved or compacted base, fenced/gated | Fleet growth, municipal contract expansion |

### Conditional (Size/Zoning Dependent)
Include when parameter set supports it or user activates explicitly.

| Category | Condition to Include |
|---|---|
| Municipal / Public Works Yards | Only when a municipal contract or franchise signal is present |
| Building Materials Laydown (regional supplier) | Regional/wholesale operators only, not retail |
| Heavy Equipment Dealer Overflow Lots | Only where the dealer's primary lot is at capacity |

### Excluded by Default
| Category | Reason |
|---|---|
| Small-bay industrial/flex tenants (office/warehouse users) | Wrong asset class — building-based leasing, not IOS |
| Cold storage / food distribution | Separate product — refrigeration infra not part of the IOS gate criteria |
| Retail / last-mile parcel depots requiring building improvements | Wrong use — building-dependent, not open-yard |

---

## Dynamic Parameter Set

All parameters are adjustable per run. Defaults are calibrated for IOS demand in
Dallas–Fort Worth and Houston only.

| Parameter | Tight | Default | Wide |
|---|---|---|---|
| Search radius | 5 mi | 15 mi | 35 mi |
| Business tenure in market | 5+ yrs | 3+ yrs | 1+ yr |
| Fleet size / employee count (min) | 20+ | 10+ | 5+ |
| Implied space need (acres) | 3+ acres | 1+ acres | 0.5+ acres |
| Permit filing / lease urgency window | ≤6 months | ≤12 months | ≤24 months |
| Target-user categories | Selected only | All active defaults | Add conditional categories |

**To adjust:** User states parameter changes at session start or mid-run.
Example: "Tighten radius to 8 miles, expand tenure to 1+ years."
CANVAS confirms the adjusted parameter set before executing.

**Parameter memory:** CANVAS retains the last-used parameter set within a session.
If user runs Fill then Hunt in the same session, confirm whether to carry parameters
forward or reset to defaults.

---

## Scoring Model

Every prospect receives a **CANVAS Fit Score** (0–100). Score determines tier placement
in all outputs.

### Scoring Components

| Signal | Weight | Max Points |
|---|---|---|
| Space need match (implied acreage vs. available acreage) | 25% | 25 |
| Displacement signal strength | 25% | 25 |
| Target-user category fit (active default = full credit) | 20% | 20 |
| Business tenure in market | 15% | 15 |
| Growth signal (fleet size / job postings) | 10% | 10 |
| Decision maker identifiable | 5% | 5 |

### Space Need Match (25 pts)
- Implied acreage within 20% of available acreage → 25 pts
- Implied acreage within 40% → 15 pts
- Implied acreage outside 40% but still workable (subdivide/partial site) → 5 pts
- No match → 0 pts

### Displacement Signal Strength (25 pts)
Score the strongest signal present:
- Active SUP/CUP or site plan filing for outdoor storage use, ≤6 months old (municipal
  filing confirmed) → 25 pts
- Displacement from a redeveloped industrial site — confirmed demolition/redevelopment
  permit on prior site → 22 pts
- Filing 7–12 months old → 18 pts
- Visible yard overflow / trailer or container overcrowding (satellite/street view
  confirmed) → 15 pts
- Filing 13–24 months old → 10 pts
- No confirmed displacement signal → 0 pts

### Target-User Category Fit (20 pts)
- Active default category → 20 pts
- Conditional category (activated) → 12 pts
- Adjacent / unlisted but logical → 5 pts

### Business Tenure in Market (15 pts)
- 7+ years → 15 pts
- 5–7 years → 12 pts
- 3–5 years → 8 pts
- 1–3 years → 4 pts
- Under 1 year → 0 pts

### Growth Signal — Fleet / Hiring (10 pts)
- Fleet or headcount growth 20%+ over 12 months + active job postings → 10 pts
- Fleet or headcount growth 10–20% or active postings only → 6 pts
- Flat fleet size, no postings → 2 pts
- No growth data found → 0 pts (note in output)

### Decision Maker Identifiable (5 pts)
- Owner / principal identified with contact → 5 pts
- Fleet manager or terminal manager identified → 3 pts
- Business phone only, no named contact → 1 pt
- No contact found → 0 pts

### Tier Thresholds
| Tier | Score | Action |
|---|---|---|
| **Tier 1 — Priority** | 70–100 | Lead output, full PDF profile, immediate outreach |
| **Tier 2 — Active** | 50–69 | Excel list, monitor, outreach within 30 days |
| **Tier 3 — Watch** | 30–49 | Excel list only, revisit next session |
| **Below threshold** | <30 | Excluded from output |

---

## Workflow Sequence

### Fill Mode — Step by Step

**Step 1: Ingest site spec**
Confirm with user: address, acreage, building coverage %, fencing/gate/paving condition,
zoning/entitlement status, asking rate, timeline.
If municipal permit filings are provided, load them now.

**Step 2: Define trade area**
Apply radius parameter. Note any hard geographic boundaries (highways, rail corridors,
port/terminal access, municipal lines) that would logically constrain the trade area.

**Step 3: Google Maps discovery**
Search each active target-user category within the defined radius. For every result:
- Confirm physical address (not residential, not virtual)
- Pull satellite/street view — note operational signals (trailer count, container stacks,
  yard overflow, visible fleet growth)
- Estimate implied acreage need based on business type, fleet size, visible operation scale

**Step 4: Municipal permit layer (if filings provided)**
Cross-reference Google Maps results against permit filing data.
Flag any filers in the radius not captured by Google Maps — add to prospect list.
Apply filing status and urgency signals to all matched records.

**Step 5: Fleet growth + displacement layer**
For every Tier 1 and Tier 2 candidate from Steps 3–4:
- Search company fleet size trend and active job postings
- Check for redevelopment/demolition activity on their current site
- Identify decision maker (owner, fleet manager, terminal manager)

**Step 6: Score and tier**
Apply CANVAS Fit Score to every prospect. Assign tier. Drop below-threshold results.

**Step 7: Build outputs**
Generate all three deliverables. See Output Specifications below.

---

### Hunt Mode — Step by Step

**Step 1: Define search parameters**
Confirm market / submarket / radius anchor (DFW or Houston only). Confirm target-user
filters and parameter set. If municipal permit filings are provided, load them now.

**Step 2: Lead with displacement signals**
Priority order:
1. Active SUP/CUP or site plan filings for outdoor storage use, ≤12 months (if filings provided)
2. Businesses displaced by a redeveloped industrial site (demolition/redevelopment permit confirmed)
3. Fleet/trucking operators with 20%+ growth and no corresponding yard upgrade
4. Satellite/street view — visible trailer/container overcrowding, yard overflow

**Step 3: Derive implied space requirement**
For each displaced business, estimate acreage need:
- Trailer/container count × typical stacking density for the category
  (see `site-metrics-calculator/SKILL.md` for usable-acreage math)
- Adjust up for equipment-heavy or maintenance-yard operations, adjust down for
  pure parking/storage operations
- Site config requirement: paving/fencing level based on target-user category

**Step 4: Google Maps and growth-signal enrichment**
Same as Fill mode Steps 3 and 5 — confirm physical presence, fleet growth signals,
decision maker identification.

**Step 5: Score and tier**
Apply CANVAS Fit Score. Assign tier.

**Step 6: RIDGE Acquisition Feed**
For each Tier 1 and Tier 2 prospect, identify the site type they need.
Flag submarkets with category concentration — multiple displaced users in the same
radius = demand signal for an acquisition target in that pocket.
Output RIDGE feed as a separate section in the Excel and PDF.

**Step 7: Build outputs**
Generate all three deliverables.

---

## Output Specifications

### Output 1 — Excel Prospect List

Read `/mnt/skills/public/xlsx/SKILL.md` before generating.

**Tab 1 — Prospect List**
Columns in order:

| # | Business Name | Address | Market | Target-User Category | Implied Acreage Need | Site Config | Tenure (yrs) | Displacement Signal | Fleet Growth | Decision Maker | Contact | CANVAS Score | Tier |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

- Sort by CANVAS Score descending
- Tier color coding:
  - Tier 1 = green `1E6B3C`
  - Tier 2 = amber `8B6914`
  - Tier 3 = navy `1A3A5C`

**Tab 2 — Permit Filing Signals** (only if municipal permit data provided)
Columns: Business Name | Current Address | Filing Type | Filing Status | Filing Date |
Months Since Filing | Site Acreage Referenced | Jurisdiction | Urgency

- Sort by months since filing ascending
- Highlight filings ≤6 months old in red `8B0000`
- Highlight filings 7–12 months old in orange `CC5500`

**Tab 3 — RIDGE Acquisition Feed** (Hunt mode only)
Columns: Submarket | Implied Demand (Acres) | Site Config | # Users Identified | Top User | Signal Strength | RIDGE Conviction

- Signal Strength: High / Medium / Watch
- RIDGE Conviction feeds directly into session deal review

**Tab 4 — Run Parameters**
Record the exact parameter set used for this run:
radius, tenure floor, fleet/employee minimum, acreage floor, permit filing urgency window,
target-user categories active, data sources used, run date.
This enables parameter comparison across sessions.

---

### Output 2 — PDF Summary Report

Read `/mnt/skills/public/pdf/SKILL.md` before generating.

**Structure:**
```
1. RUN SUMMARY (parameters used, prospect count by tier, data sources active)
2. TIER 1 PROFILES (one page per Tier 1 prospect — see profile template below)
3. TIER 2 SUMMARY TABLE (condensed, no individual profiles)
4. RIDGE ACQUISITION FEED (Hunt mode only)
5. METHODOLOGY NOTES
```

**Tier 1 Profile Template (one page per prospect):**
```
BUSINESS NAME                          CANVAS SCORE: XX/100 — TIER 1
Address | Target-User Category | Est. Acreage Need | Site Config Requirement

DISPLACEMENT SIGNAL
[Primary signal with source — permit filing / redevelopment displacement / satellite view / fleet growth]

GROWTH SIGNAL
[Fleet size trend, active postings, hiring locations]

SPACE FIT ANALYSIS
[How their implied need maps to the subject site or target site type]

DECISION MAKER
[Name / Title / Contact if identified]

RECOMMENDED OUTREACH APPROACH
[1–2 sentence framing — position as operator solving a yard-space problem, not a broker]

DATA SOURCES USED: [Google Maps ✓ / Permit Filings ✓ / Fleet Growth ✓ / Redevelopment Tracking ✓]
```

Formatting:
- Header: `CANVAS — IOS Demand Intelligence Report — [Site/Market] — [Date]`
- Footer every page: `CANVAS — RIDGE IOS Demand Sourcing Engine — Confidential`
- Tier 1 profiles: green left border `1E6B3C`
- Tier 2 summary table: amber header `8B6914`
- RIDGE Acquisition Feed section: navy header `1A3A5C`

---

### Output 3 — RIDGE Acquisition Feed (Hunt Mode)

Formatted as a direct input to the RIDGE Daily Prospect Report.
Append to session pipeline as a demand-validated sourcing signal.

For each submarket pocket where ≥3 Tier 1/2 users are identified:
```
SUBMARKET: [Name]
DEMAND SIGNAL: [X] businesses identified needing [acreage range] [site config] space
TOP USER: [Name] — [displacement signal summary]
IMPLIED ACQUISITION TARGET: [Site config / size / submarket description]
RIDGE CONVICTION: High / Needs More Data / Watch List
```

High Conviction requires: ≥3 Tier 1 users + confirmed IOS-permitted zoning or SUP
precedent in that pocket + no comparable competing supply under development nearby.

---

## RIDGE Integration Notes

- CANVAS runs as a standalone session or as a module within a RIDGE sourcing session
- Fill mode output informs leasing strategy and owner outreach framing —
  "we have users ready" is the strongest possible acquisition conversation opener
- Hunt mode output feeds directly into RIDGE pipeline — demand-validated acquisition
  targeting is more defensible than a vacant-site signal alone
- Municipal permit filing data for CANVAS should be cross-referenced against
  `zoning-entitlement-screener/SKILL.md` and `municipal-ordinance-reference/SKILL.md`
  for jurisdiction-specific outdoor storage rules
- Parameter set and run log (Tab 4) should be retained session-to-session to track
  which pockets have been worked and avoid redundant coverage

---

## Output Naming Convention

```
CANVAS_[Site address or Market]_Fill_[YYYYMMDD].xlsx / .pdf
CANVAS_[Market]_Hunt_[YYYYMMDD].xlsx / .pdf
```

Replace spaces with underscores. Truncate address to street number + street name.

---

## Reference Files

- `/mnt/skills/public/xlsx/SKILL.md` — Excel generation mechanics (read before Output 1)
- `/mnt/skills/public/pdf/SKILL.md` — PDF generation mechanics (read before Output 2)
- `/mnt/skills/user/ridge/SKILL.md` — RIDGE pipeline integration (read for Hunt mode RIDGE feed)
