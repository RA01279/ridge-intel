---
name: canvas
description: >
  CANVAS is RIDGE's tenant intelligence and space matching engine. Use this skill ANY TIME
  the user wants to find tenants for a specific property, identify businesses that need
  industrial or flex space, or build a demand-side prospect list. Trigger on: "find tenants
  for this building", "who should lease this space", "run CANVAS", "tenant search",
  "fill this building", "who's looking for space", "find me tenants", "tenant prospects",
  "demand analysis", "what businesses are in this area", "hunt for tenants", or any request
  to source, identify, or rank potential tenants for industrial or flex assets. CANVAS
  operates in two modes — Fill (you have the building, find the tenants) and Hunt (find
  businesses that need space, feed back into RIDGE acquisition targeting). Always load this
  skill before executing any tenant sourcing or demand analysis task.
---

# CANVAS — Tenant Intelligence & Space Matching Engine

## Identity

CANVAS is RIDGE's demand-side sourcing engine. It identifies, scores, and ranks businesses
that are likely tenants for small and mid-bay industrial and flex space (2,000–25,000 SF).
It operates in two modes and uses three data sources in a tiered stack.

**Every run produces three deliverables — always all three:**
1. `CANVAS_[Property/Market]_Prospects_[YYYYMMDD].xlsx` — Ranked tenant prospect list
2. `CANVAS_[Property/Market]_Report_[YYYYMMDD].pdf` — Summary report, top-tier candidates
3. **RIDGE Feed** — Hunt mode candidates with implied acquisition targets flagged for RIDGE pipeline

---

## Operating Modes

### Mode 1 — FILL
**When to use:** You have a specific building under contract, in LOI, or in the pipeline.
You need to identify businesses in the trade area that fit the space and are likely to lease it.

**Input required:**
- Property address
- Total SF and bay configuration (drive-in / dock-high / both)
- Clear height
- Asking rent range ($/SF NNN)
- Target move-in timeline
- CoStar tenant export (optional but preferred — see Data Sources)

**Logic:** Start with the building spec. Work outward into the trade area. Match businesses
by space need, industry cluster, and displacement signals. Rank by fit score.

---

### Mode 2 — HUNT
**When to use:** You are scanning a market or submarket for businesses showing displacement
signals — outgrown their space, operating from suboptimal locations, growing headcount without
a corresponding space upgrade. Output feeds directly back into RIDGE as acquisition targets.

**Input required:**
- Target market / submarket or radius anchor point
- Industry filters (default: all active clusters — see Industry Clusters)
- Search parameters (default or custom — see Parameter Set)
- CoStar tenant export (optional but preferred — see Data Sources)

**Logic:** Identify businesses showing growth or displacement signals first. Derive their
implied space requirement. Then identify the buildings they should be in — flag those
buildings as RIDGE acquisition candidates.

**RIDGE integration:** Every Hunt mode output includes a RIDGE Acquisition Feed section —
a list of buildings implied by the tenant demand identified, with ownership signal notes
where assessor data is available.

---

## Data Source Stack

Use all available sources. Degrade gracefully if a source is unavailable — never skip
the run, just note the limitation.

### Source 1 — Google Maps / Places (Always Available)
**Role:** Wide-net discovery. Find businesses by industry category within the defined radius.
**Use for:**
- Initial business identification by category
- Physical presence confirmation (not a virtual/residential address)
- Street view operational signals — trucks, equipment, yard usage, visible overcrowding,
  outdoor storage suggesting space constraint
- Business tenure proxy (Google listing age, review history depth)

**Search approach:** Query by industry category + geography. Cross-reference street view
for every top-tier candidate before including in output.

### Source 2 — CoStar Tenant Export (User-Provided Upload)
**Role:** Precision layer. Existing tenant-in-market data with lease signals.
**Upload format:** Standard CoStar tenant export (.xlsx). User pulls this from CoStar
and uploads at session start. Filename pattern: `CoStar_Tenant_[Market]_[Date].xlsx`

**If upload is present, extract:**
- Current tenant address and SF occupied
- Lease expiration date → proximity signal (≤18 months = high priority)
- Rent paid vs. market (below market = captive tenant risk; above market = motivated to move)
- Lease type (NNN / modified gross / gross)
- Tenant industry / use type

**If upload is not present:** Proceed with Google Maps + LinkedIn only. Note in output
header: "CoStar tenant export not provided — lease expiration signals unavailable."

### Source 3 — LinkedIn (Available)
**Role:** Growth signal layer. Identifies businesses with expanding headcount that will
need space before they know they need it.
**Use for:**
- Headcount trajectory over 12/24 months (growing = space need incoming)
- Active job postings in target market (hiring surge = displacement signal)
- Decision maker identification — ops manager, facilities director, owner/principal
- Company age and market tenure confirmation

---

## Industry Clusters

### Active by Default (Small/Mid Bay Primary Users)
These clusters are always included unless user explicitly removes them.

| Cluster | Typical SF Range | Bay Type | Displacement Signal |
|---|---|---|---|
| Home Services (HVAC, plumbing, electrical, pest, landscaping) | 2,000–8,000 SF | Drive-in | Van/equipment overflow, outdoor storage |
| Construction Trades & Specialty Contractors | 3,000–12,000 SF | Drive-in | Material staging, tool/equipment storage |
| Auto Services & Fleet Maintenance | 4,000–15,000 SF | Drive-in | Bay capacity constraint, overflow parking |
| E-Commerce Fulfillment & Returns Processing | 3,000–20,000 SF | Both | Volume growth, residential address operation |
| Last-Mile / Courier Depot Ops | 2,500–12,000 SF | Both | Route expansion, van fleet growth |
| Med Device & Specialty Distribution | 2,000–10,000 SF | Drive-in | Clean space need, security requirement |

### Conditional (Size/Config Dependent)
Include when parameter set supports it or user activates explicitly.

| Cluster | Condition to Include |
|---|---|
| Light Manufacturing & Contract Assembly | Sub-15,000 SF ops only |
| Building Materials & Trade Supply | Local/regional operators only, not big-box |
| Government / Municipal Contractor Ops | Only when defense or infrastructure contract signals present |

### Excluded by Default
| Cluster | Reason |
|---|---|
| Food Production / Cold Storage | Separate product — build-out cost complicates standard flex underwriting |
| Heavy Manufacturing | Wrong size range |
| Large-Format Logistics / Distribution | Wrong size range |

---

## Dynamic Parameter Set

All parameters are adjustable per run. Defaults are calibrated for small/mid bay
industrial and flex in Atlanta, Savannah, and DFW.

| Parameter | Tight | Default | Wide |
|---|---|---|---|
| Search radius | 3 mi | 10 mi | 25 mi |
| Business tenure in market | 5+ yrs | 3+ yrs | 1+ yr |
| Employee count (min) | 20+ | 10+ | 5+ |
| Implied space need (SF) | 5,000+ SF | 2,500+ SF | 1,000+ SF |
| Lease expiration window | ≤12 months | ≤18 months | ≤36 months |
| Industry clusters | Selected only | All active defaults | Add conditional clusters |

**To adjust:** User states parameter changes at session start or mid-run.
Example: "Tighten radius to 5 miles, expand tenure to 1+ years."
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
| Space need match (implied SF vs. available SF) | 25% | 25 |
| Displacement signal strength | 25% | 25 |
| Industry cluster fit (active default = full credit) | 20% | 20 |
| Business tenure in market | 15% | 15 |
| Growth signal (LinkedIn headcount / job postings) | 10% | 10 |
| Decision maker identifiable | 5% | 5 |

### Space Need Match (25 pts)
- Implied SF within 20% of available SF → 25 pts
- Implied SF within 40% → 15 pts
- Implied SF outside 40% but still workable → 5 pts
- No match → 0 pts

### Displacement Signal Strength (25 pts)
Score the strongest signal present:
- Lease expiring ≤12 months (CoStar confirmed) → 25 pts
- Lease expiring 13–18 months → 20 pts
- Operating from residential or clearly undersized address (Google Maps confirmed) → 18 pts
- Visible outdoor storage / overflow / overcrowding (street view confirmed) → 15 pts
- Lease expiring 19–36 months → 10 pts
- No confirmed displacement signal → 0 pts

### Industry Cluster Fit (20 pts)
- Active default cluster → 20 pts
- Conditional cluster (activated) → 12 pts
- Adjacent / unlisted but logical → 5 pts

### Business Tenure in Market (15 pts)
- 7+ years → 15 pts
- 5–7 years → 12 pts
- 3–5 years → 8 pts
- 1–3 years → 4 pts
- Under 1 year → 0 pts

### Growth Signal — LinkedIn (10 pts)
- Headcount growth 20%+ over 12 months + active job postings → 10 pts
- Headcount growth 10–20% or active postings only → 6 pts
- Flat headcount, no postings → 2 pts
- LinkedIn not found → 0 pts (note in output)

### Decision Maker Identifiable (5 pts)
- Owner / principal identified with contact → 5 pts
- Ops manager or facilities contact identified → 3 pts
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

**Step 1: Ingest building spec**
Confirm with user: address, SF, bay type, clear height, asking rent, timeline.
If CoStar tenant export is uploaded, load it now.

**Step 2: Define trade area**
Apply radius parameter. Note any hard geographic boundaries (highways, industrial
corridors, municipal lines) that would logically constrain the trade area.

**Step 3: Google Maps discovery**
Search each active industry cluster within the defined radius. For every result:
- Confirm physical address (not residential, not virtual)
- Pull street view — note operational signals (trucks, equipment, outdoor storage,
  visible overcrowding)
- Estimate implied SF need based on business type, employee count, visible operation scale

**Step 4: CoStar tenant layer (if export provided)**
Cross-reference Google Maps results against CoStar export.
Flag any CoStar tenants in the radius not captured by Google Maps — add to prospect list.
Apply lease expiration and rent signals to all matched records.

**Step 5: LinkedIn growth layer**
For every Tier 1 and Tier 2 candidate from Steps 3–4:
- Search company on LinkedIn
- Record headcount trend and active job postings
- Identify decision maker (owner, ops, facilities)

**Step 6: Score and tier**
Apply CANVAS Fit Score to every prospect. Assign tier. Drop below-threshold results.

**Step 7: Build outputs**
Generate all three deliverables. See Output Specifications below.

---

### Hunt Mode — Step by Step

**Step 1: Define search parameters**
Confirm market / submarket / radius anchor. Confirm industry filters and parameter set.
If CoStar tenant export is uploaded, load it now.

**Step 2: Lead with displacement signals**
Priority order:
1. CoStar tenants with lease expiration ≤18 months (if export provided)
2. Google Maps businesses operating from residential or clearly undersized addresses
3. LinkedIn — businesses with 20%+ headcount growth and no corresponding address upgrade
4. Street view — visible overcrowding, outdoor storage, overflow parking

**Step 3: Derive implied space requirement**
For each displaced business, estimate SF need:
- Employee count × 250–400 SF (light industrial / flex rule of thumb)
- Adjust up for equipment-heavy operations, adjust down for distribution-heavy ops
- Bay type requirement: drive-in vs. dock-high based on industry cluster

**Step 4: Google Maps and LinkedIn enrichment**
Same as Fill mode Steps 3 and 5 — confirm physical presence, growth signals,
decision maker identification.

**Step 5: Score and tier**
Apply CANVAS Fit Score. Assign tier.

**Step 6: RIDGE Acquisition Feed**
For each Tier 1 and Tier 2 prospect, identify the building type they need.
Flag submarkets with cluster concentration — multiple displaced tenants in the same
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

| # | Business Name | Address | Market | Industry Cluster | Implied SF Need | Bay Type | Tenure (yrs) | Displacement Signal | LinkedIn Growth | Decision Maker | Contact | CANVAS Score | Tier |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

- Sort by CANVAS Score descending
- Tier color coding:
  - Tier 1 = green `1E6B3C`
  - Tier 2 = amber `8B6914`
  - Tier 3 = navy `1A3A5C`

**Tab 2 — CoStar Lease Signals** (only if CoStar export provided)
Columns: Business Name | Current Address | Current SF | Lease Expiration | Months to Expiry |
Rent/SF | vs. Market | Roll Risk

- Sort by months to expiry ascending
- Highlight leases expiring ≤12 months in red `8B0000`
- Highlight leases expiring 13–18 months in orange `CC5500`

**Tab 3 — RIDGE Acquisition Feed** (Hunt mode only)
Columns: Submarket | Implied Demand (SF) | Bay Type | # Tenants Identified | Top Tenant | Signal Strength | RIDGE Conviction

- Signal Strength: High / Medium / Watch
- RIDGE Conviction feeds directly into session deal review

**Tab 4 — Run Parameters**
Record the exact parameter set used for this run:
radius, tenure floor, employee minimum, SF floor, lease expiration window,
industry clusters active, data sources used, run date.
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
Address | Industry Cluster | Est. SF Need | Bay Type Requirement

DISPLACEMENT SIGNAL
[Primary signal with source — CoStar lease expiry / street view / LinkedIn]

GROWTH SIGNAL
[LinkedIn headcount trend, active postings, hiring locations]

SPACE FIT ANALYSIS
[How their implied need maps to the subject property or target building type]

DECISION MAKER
[Name / Title / Contact if identified]

RECOMMENDED OUTREACH APPROACH
[1–2 sentence framing — position as operator solving a space problem, not a broker]

DATA SOURCES USED: [Google Maps ✓ / CoStar ✓ / LinkedIn ✓]
```

Formatting:
- Header: `CANVAS — Tenant Intelligence Report — [Property/Market] — [Date]`
- Footer every page: `CANVAS — RIDGE Tenant Sourcing Engine — Confidential`
- Tier 1 profiles: green left border `1E6B3C`
- Tier 2 summary table: amber header `8B6914`
- RIDGE Acquisition Feed section: navy header `1A3A5C`

---

### Output 3 — RIDGE Acquisition Feed (Hunt Mode)

Formatted as a direct input to the RIDGE Daily Prospect Report.
Append to session pipeline as a demand-validated sourcing signal.

For each submarket pocket where ≥3 Tier 1/2 tenants are identified:
```
SUBMARKET: [Name]
DEMAND SIGNAL: [X] businesses identified needing [SF range] [bay type] space
TOP TENANT: [Name] — [displacement signal summary]
IMPLIED ACQUISITION TARGET: [Building type / size / submarket description]
RIDGE CONVICTION: High / Needs More Data / Watch List
```

High Conviction requires: ≥3 Tier 1 tenants + submarket vacancy below 10% + no
new supply under construction in that pocket.

---

## RIDGE Integration Notes

- CANVAS runs as a standalone session or as a module within a RIDGE sourcing session
- Fill mode output informs leasing strategy and owner outreach framing —
  "we have tenants ready" is the strongest possible acquisition conversation opener
- Hunt mode output feeds directly into RIDGE pipeline — demand-validated acquisition
  targeting is more defensible than vacancy signal alone
- CoStar tenant export for CANVAS is a separate pull from the CoStar property export
  used for the RIDGE pipeline — both may be uploaded in the same session
- Parameter set and run log (Tab 4) should be retained session-to-session to track
  which pockets have been worked and avoid redundant coverage

---

## Output Naming Convention

```
CANVAS_[Property address or Market]_Fill_[YYYYMMDD].xlsx / .pdf
CANVAS_[Market]_Hunt_[YYYYMMDD].xlsx / .pdf
```

Replace spaces with underscores. Truncate address to street number + street name.

---

## Reference Files

- `/mnt/skills/public/xlsx/SKILL.md` — Excel generation mechanics (read before Output 1)
- `/mnt/skills/public/pdf/SKILL.md` — PDF generation mechanics (read before Output 2)
- `/mnt/skills/user/ridge/SKILL.md` — RIDGE pipeline integration (read for Hunt mode RIDGE feed)
