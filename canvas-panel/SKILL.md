---
name: canvas-panel
description: >
  CANVAS PANEL is the in-app version of CANVAS integrated directly into RIDGE Deal Tools.
  Use this skill to execute CANVAS IOS demand sourcing workflows from within the deal tools
  app environment — finding users for a specific IOS site (Fill mode), hunting businesses
  that need trailer parking, container storage, contractor/material yard, equipment rental,
  or truck terminal space for acquisition targeting (Hunt mode), or generating IOS demand
  prospect packages for IC or broker marketing. Trigger on: "run CANVAS", "find users for
  this site", "IOS demand search", "who should lease this yard", "fill this site", "demand
  analysis", "IOS prospects", "who's looking for outdoor storage in [market]", "CANVAS fill",
  "CANVAS hunt", "IOS user sourcing", "build an IOS demand list", or any request to identify
  prospective IOS users for a site or submarket in DFW or Houston. CANVAS PANEL operates
  identically to the CANVAS skill but is designed for the RIDGE Deal Tools app panel
  interface. Always load this skill for any IOS demand sourcing or demand-side analysis task.
---

# CANVAS PANEL — IOS Demand Intelligence Engine (App Integration)

## Identity

CANVAS PANEL is the app-integrated version of CANVAS. Same engine, same outputs —
purpose-built to run inside the RIDGE Deal Tools browser app as a dedicated panel
alongside SCOUT, The Gavel, and ISR.

CANVAS operates in two modes. The mode is determined by what the user has — a site
or a question.

| Mode | You have | Output |
|------|----------|--------|
| **FILL** | A specific IOS site — find the users | Ranked IOS user prospect list for that address |
| **HUNT** | A target profile — find the demand | Business list feeding RIDGE sourcing targets |

---

## Mode 1: FILL — Find Users for an IOS Site

### Required Inputs
| Input | Required | Notes |
|-------|----------|-------|
| Site address | Yes | Full address |
| Total acreage available | Yes | Can be partial or whole site |
| Building coverage % | Preferred | Confirms the site is IOS-eligible (<30% gate) |
| Fencing / gate / paving condition | Preferred | Drives which target-user categories fit |
| Power availability | Preferred | Relevant for equipment maintenance/rental users |
| Zoning / entitlement status | Yes | By-right vs. SUP/CUP required — filters user urgency |
| Asking rate | Optional | $/acre or $/spot per month — filters user budget range |
| Market / submarket | Yes | DFW or Houston only — derived from address if not stated |

### Tenant Profiling Framework

CANVAS scores IOS user prospects against four dimensions:

**1. Space Fit Score (1–5)**
- Acreage requirement matches available acreage (within 20% either direction) = 3
- Configuration match (paving, fencing/gate, power) = +1 each
- Site subdivisibility match (if user needs a partial site) = +1

**2. Creditworthiness Signal (1–5)**
- Established business 5+ years = 2
- National/regional fleet or operator = +2
- Growing fleet size / revenues = +1
- Local operator, limited history = 1 base

**3. Urgency Signal (1–5)**
- Known SUP/CUP or site plan filing for outdoor storage use = 5
- Displacement from a redeveloped industrial site (confirmed) = 4
- In growth mode but not actively searching = 3
- No known urgency = 1–2

**4. Market Fit (1–5)**
- Business already operating in submarket = 3
- Business expanding into market = 4
- No connection to market = 1–2

**Total CANVAS Score: 4–20. Prioritize 14+.**

### Target-User Category Matrix — Industrial Outdoor Storage

Match site specs to target-user categories:

```
SITE PROFILE               → BEST TARGET-USER CATEGORIES
──────────────────────────────────────────────────────────
Fully paved, fenced/gated, → Container storage, trailer parking operators,
  no building required        truck terminals (parking-focused)

Partial paving, fenced,    → Contractor & material yards, auto/bus storage
  small office/shop           fleets, municipal/public works yards (conditional)

Fenced, shop building       → Equipment maintenance & rental yards,
  + yard                      heavy equipment dealer overflow lots

Unpaved/compacted base,    → Container storage (chassis pool), lower-cost
  fenced only                 trailer parking, material laydown yards

Large contiguous acreage   → Truck terminals (LTL/parking), large fleet
  (10+ acres)                 trailer parking, regional distribution overflow
```

### FILL Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANVAS FILL — [Address] | [Acreage Available] | [Submarket]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SITE PROFILE SUMMARY
  Acreage:      [X.X] acres available (min divisible: [X.X] acres)
  Building coverage: [X]% (gate: <30%)
  Site config:  [Paved/unpaved] | [Fenced/gated: Y/N]
  Power:        [Service type / capacity, if known]
  Target users: [Best fit categories based on specs above]

USER PROSPECTS — RANKED BY CANVAS SCORE
──────────────────────────────────────────────────────────────────
Rank | Business Name | Category | Acreage Need | Score | Urgency Signal
─────┼───────────────┼──────────┼──────────────┼───────┼────────────────
  1  | [Name]        | [Cat]    | [X.X] ac     | 17/20 | SUP filing active
  2  | [Name]        | [Cat]    | [X.X] ac     | 16/20 | Fleet expansion
  3  | [Name]        | [Cat]    | [X.X] ac     | 15/20 | Active search
  ...

PROSPECT DETAILS — TOP 10
[For each top 10, provide:]
  Business: [Name] — [Category]
  Address:  [Current location]
  Contact:  [Name, title, phone/email if available via web search]
  Why fit:  [One sentence on why this user fits this site]
  Urgency:  [What's driving timing — permit filing, redevelopment displacement, fleet growth]
  Approach: [How to open — broker intro, direct call, site tour]
  CANVAS Score: [X/20]

MARKET DEMAND SUMMARY
  Total prospects identified:  [N]
  High urgency (score 16+):    [N]
  Active requirements (known): [N]
  Estimated lease-up timeline: [X–Y months at market absorption pace]
  Comparable sites leased:     [Reference 1–2 recent comp leases in submarket]

RECOMMENDED OUTREACH SEQUENCE
  Week 1: Contact [Top 3 names] — highest urgency + best fit
  Week 2: Broker canvass — [Name 1–2 active industrial/IOS brokers in submarket]
  Week 3: Secondary list outreach — [Next 5 prospects]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Mode 2: HUNT — Find Demand Signals for Sourcing

HUNT is the inverse of FILL. Instead of matching users to a site, HUNT identifies
businesses in a market whose space needs signal acquisition opportunities for RIDGE.

### HUNT Use Cases
- "Who in DFW is growing their fleet and will need more yard space?"
- "Find businesses in Houston that have filed for outdoor storage entitlement"
- "What companies are being displaced by industrial redevelopment near [submarket]?"
- "Find trailer parking operators whose current site is being redeveloped"

### HUNT Inputs
| Input | Required |
|-------|----------|
| Market / submarket (DFW or Houston only) | Yes |
| Target-user category focus | Yes |
| Target user size (acreage) | Preferred |
| Specific sectors of interest | Optional |

### HUNT Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANVAS HUNT — [Market/Submarket] | [Target-User Category]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEMAND LANDSCAPE
  Primary demand drivers in this submarket: [Categories, activity level]
  Known active requirements (>5 acres): [List any confirmed requirements]
  Permit filing activity (12 mo): [# of SUP/CUP/site plan filings referencing outdoor storage]
  Typical lease term for target users: [X–Y years]

BUSINESSES WITH ACTIVE SPACE NEEDS
Rank | Business | Category | Est. Req Acreage | Signal | Acquisition Implication
─────┼──────────┼──────────┼───────────────────┼────────┼─────────────────────────
  1  | [Name]   | [Cat]    | [X.X] ac          | [Type] | [How to exploit]
  ...

ACQUISITION TARGETING IMPLICATION
  These user demand signals support sourcing in: [Specific submarkets]
  Site profiles in highest demand: [Specs — paving/fencing/acreage]
  Entitlement risk in these submarkets: [Assessment — by-right vs. SUP pattern]
  RIDGE sourcing recommendation: [Where to focus SCOUT next]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## App Panel Interface Notes

When running inside the RIDGE Deal Tools app:

**Input panel** — Left column:
- Mode toggle: FILL / HUNT
- Address autocomplete (Google Maps API)
- Acreage, coverage %, fencing/paving config inputs
- Market dropdown (DFW / Houston only)
- "Run CANVAS" button

**Output panel** — Right column / main area:
- Ranked IOS user table (sortable by Score, Urgency, Acreage Fit)
- Prospect detail cards (expand on click)
- Export to CSV / copy-to-clipboard
- "Add to Pipeline" button (for HUNT mode — surfaces as sourcing note)
- "Save to deal" button (for FILL mode — attaches to PIPELINE deal record)

---

## Data Sources

**CANVAS pulls from:**
1. Web search — business listings, press releases, fleet expansion announcements
2. Municipal permit / zoning filings (user-provided or public record) — SUP/CUP
   applications and site plans referencing outdoor storage, trailer parking, or laydown yards
3. Company websites / DOT-FMCSA carrier data where available — fleet size growth, job postings
4. CoStar (user-provided) — known industrial site redevelopment activity displacing
   existing outdoor-storage users
5. Public redevelopment/demolition permit records — tracks displacement from
   redeveloped industrial sites

**CANVAS never uses:**
- LoopNet tenant data (unreliable, stale)
- Broker rep lists (ask user to provide directly if they have them)

---

## Integration Points

| Tool | When CANVAS Connects |
|------|---------------------|
| PIPELINE | Attach IOS user prospect list to active deal record |
| SCOUT | HUNT output feeds back as demand validation for SCOUT prospects |
| LOI Generator | Anchor lease-up thesis — "primary demand is from [category]" |
| acq-investment-report | IOS demand summary for IC deck market slide |
| Market Pulse | Cross-reference CANVAS demand signals against land absorption / truck parking demand data |
| Zoning & Entitlement Screener | Confirm target-user category is a permitted use before treating a demand signal as actionable |

---

## Behavioral Rules

1. **Always run FILL before full lease-up modeling.** No IC deck should have a lease-up
   thesis without a CANVAS run backing it.

2. **Score every prospect.** Unscored lists are noise. CANVAS scoring forces prioritization.

3. **Contact information is the product.** A business name without a contact is half the work.
   Spend the search effort to find a decision-maker name and phone/email.

4. **HUNT informs SCOUT.** If HUNT surfaces high demand in a specific submarket that SCOUT
   hasn't covered yet, flag it: "Demand signals suggest we should run SCOUT in [submarket]."

5. **Permit filing timing is the strongest urgency signal.** An active SUP/CUP or site
   plan filing for outdoor storage use is the single highest-confidence signal CANVAS can
   surface — prioritize identifying these over inferred growth signals.

6. **Never fabricate user data.** If web search doesn't surface a credible contact for a
   prospect, note it as "Contact: research required" rather than guessing.
