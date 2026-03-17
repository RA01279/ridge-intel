---
name: canvas-panel
description: >
  CANVAS PANEL is the in-app version of CANVAS integrated directly into RIDGE Deal Tools.
  Use this skill to execute CANVAS tenant sourcing workflows from within the deal tools app
  environment — finding tenants for a specific building (Fill mode), hunting businesses
  that need industrial or flex space for acquisition targeting (Hunt mode), or generating
  tenant prospect packages for IC or broker marketing. Trigger on: "run CANVAS", "find
  tenants for this building", "tenant search", "who should lease this space", "fill this
  building", "demand analysis", "tenant prospects", "who's looking for space in [market]",
  "CANVAS fill", "CANVAS hunt", "tenant sourcing", "what tenants fit this space", "build
  a tenant list", or any request to identify prospective tenants for industrial or flex
  space — whether for a specific property or to identify demand signals for sourcing.
  CANVAS PANEL operates identically to the CANVAS skill but is designed for the RIDGE
  Deal Tools app panel interface. Always load this skill for any tenant sourcing or
  demand-side analysis task.
---

# CANVAS PANEL — Tenant Intelligence Engine (App Integration)

## Identity

CANVAS PANEL is the app-integrated version of CANVAS. Same engine, same outputs —
purpose-built to run inside the RIDGE Deal Tools browser app as a dedicated panel
alongside SCOUT, The Gavel, and ISR.

CANVAS operates in two modes. The mode is determined by what the user has — a building
or a question.

| Mode | You have | Output |
|------|----------|--------|
| **FILL** | A specific building — find the tenants | Ranked tenant prospect list for that address |
| **HUNT** | A target profile — find the demand | Business list feeding RIDGE sourcing targets |

---

## Mode 1: FILL — Find Tenants for a Building

### Required Inputs
| Input | Required | Notes |
|-------|----------|-------|
| Property address | Yes | Full address |
| Total SF available | Yes | Can be partial or whole building |
| Bay sizes / divisibility | Preferred | Min divisible unit |
| Clear height | Preferred | Industrial spec confirmation |
| Dock doors / drive-ins | Preferred | Loading infrastructure |
| Office SF / finish level | Preferred | Drives flex vs. industrial tenant fit |
| Asking rent | Optional | Filters for tenant budget range |
| Market / submarket | Yes | Derived from address if not stated |

### Tenant Profiling Framework

CANVAS scores tenant prospects against four dimensions:

**1. Space Fit Score (1–5)**
- SF requirement matches available space (within 20% either direction) = 3
- Configuration match (dock access, clear height, power) = +1 each
- Office finish match = +1

**2. Creditworthiness Signal (1–5)**
- Established business 5+ years = 2
- National/regional tenant = +2
- Growing headcount / revenues = +1
- Local operator, limited history = 1 base

**3. Urgency Signal (1–5)**
- Known expansion / new facility requirement = 5
- Lease expiry within 12 months = 4
- In growth mode but not actively searching = 3
- No known urgency = 1–2

**4. Market Fit (1–5)**
- Business already operating in submarket = 3
- Business expanding into market = 4
- No connection to market = 1–2

**Total CANVAS Score: 4–20. Prioritize 14+.**

### Tenant Category Matrix — Industrial & Flex

Match building specs to tenant categories:

```
BUILDING PROFILE          → BEST TENANT CATEGORIES
──────────────────────────────────────────────────────
High bay (28+ ft clear)   → E-commerce fulfillment, 3PL, bulk distribution,
  + dock heavy              manufacturing (auto, building products)
                          
Mid-bay (20–27 ft clear)  → Light manufacturing, food/bev distribution,
  + dock + drive-in         building materials, parts distribution, contractor

Low bay (18–20 ft clear)  → Flex tenants: contractors, last-mile delivery,
  + drive-in only           medical device storage, specialty trades

Flex (12–16 ft clear)     → Professional trades, showroom + storage, light
  + heavy office             assembly, tech hardware, medical device

Multi-tenant flex         → Small business users: contractors, distributors,
  (sub-5,000 SF bays)       specialty retail backroom, service businesses
```

### FILL Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANVAS FILL — [Address] | [SF Available] | [Submarket]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUILDING PROFILE SUMMARY
  SF:           [X,XXX] SF available (min suite: [X,XXX])
  Height:       [XX] ft clear
  Loading:      [N dock] / [N drive-in]
  Power:        [X]A / [X]V [if known]
  Target tenants: [Best fit categories based on specs above]

TENANT PROSPECTS — RANKED BY CANVAS SCORE
──────────────────────────────────────────────────────────────────
Rank | Business Name | Category | SF Need | Score | Urgency Signal
─────┼───────────────┼──────────┼─────────┼───────┼────────────────
  1  | [Name]        | [Cat]    | [X,XXX] | 17/20 | Lease exp Q3
  2  | [Name]        | [Cat]    | [X,XXX] | 16/20 | Expansion mode
  3  | [Name]        | [Cat]    | [X,XXX] | 15/20 | Active search
  ...

PROSPECT DETAILS — TOP 10
[For each top 10, provide:]
  Business: [Name] — [Category]
  Address:  [Current location]
  Contact:  [Name, title, phone/email if available via web search]
  Why fit:  [One sentence on why this tenant fits this space]
  Urgency:  [What's driving timing — lease expiry, growth, new market]
  Approach: [How to open — broker intro, direct call, property tour]
  CANVAS Score: [X/20]

MARKET DEMAND SUMMARY
  Total prospects identified:  [N]
  High urgency (score 16+):    [N]
  Active requirements (known): [N]
  Estimated lease-up timeline: [X–Y months at market absorption pace]
  Comparable buildings leased: [Reference 1–2 recent comp leases in submarket]

RECOMMENDED OUTREACH SEQUENCE
  Week 1: Contact [Top 3 names] — highest urgency + best fit
  Week 2: Broker canvass — [Name 1–2 active industrial brokers in submarket]
  Week 3: Secondary list outreach — [Next 5 prospects]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Mode 2: HUNT — Find Demand Signals for Sourcing

HUNT is the inverse of FILL. Instead of matching tenants to a building, HUNT identifies
businesses in a market whose space needs signal acquisition opportunities for RIDGE.

### HUNT Use Cases
- "Who in Atlanta is growing fast and will need more industrial space?"
- "Find businesses in DFW that are in lease-up situations"
- "What companies are driving demand in the Pooler/Garden City submarket?"
- "Find tenants whose lease is expiring at competitor properties"

### HUNT Inputs
| Input | Required |
|-------|----------|
| Market / submarket | Yes |
| Asset type focus | Yes |
| Target tenant size (SF) | Preferred |
| Specific sectors of interest | Optional |

### HUNT Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANVAS HUNT — [Market/Submarket] | [Asset Type]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEMAND LANDSCAPE
  Primary demand drivers in this submarket: [Sectors, activity level]
  Known active requirements (>20k SF): [List any confirmed requirements]
  Net absorption trend (12 mo): [Positive/Negative, magnitude]
  Typical lease term for target tenants: [X–Y years]

BUSINESSES WITH ACTIVE SPACE NEEDS
Rank | Business | Sector | Est. Req SF | Signal | Acquisition Implication
─────┼──────────┼────────┼─────────────┼────────┼─────────────────────────
  1  | [Name]   | [Sect] | [X,XXX] SF  | [Type] | [How to exploit]
  ...

ACQUISITION TARGETING IMPLICATION
  These tenant demand signals support sourcing in: [Specific submarkets]
  Building profiles in highest demand: [Specs]
  Lease-up risk in these submarkets: [Assessment]
  RIDGE sourcing recommendation: [Where to focus SCOUT next]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## App Panel Interface Notes

When running inside the RIDGE Deal Tools app:

**Input panel** — Left column:
- Mode toggle: FILL / HUNT
- Address autocomplete (Google Maps API)
- SF, height, loading config inputs
- Market dropdown
- "Run CANVAS" button

**Output panel** — Right column / main area:
- Ranked tenant table (sortable by Score, Urgency, SF Fit)
- Prospect detail cards (expand on click)
- Export to CSV / copy-to-clipboard
- "Add to Pipeline" button (for HUNT mode — surfaces as sourcing note)
- "Save to deal" button (for FILL mode — attaches to PIPELINE deal record)

---

## Data Sources

**CANVAS pulls from:**
1. Web search — business listings, press releases, expansion announcements, lease news
2. LinkedIn / company websites — headcount growth, job postings (signals growth)
3. CoStar (user-provided) — known lease expirations, existing tenant at competing buildings
4. Local business journals (Atlanta Business Chronicle, Dallas Morning News, etc.)
5. Port authority / economic development filings (Savannah)

**CANVAS never uses:**
- LoopNet tenant data (unreliable, stale)
- Broker rep lists (ask user to provide directly if they have them)

---

## Integration Points

| Tool | When CANVAS Connects |
|------|---------------------|
| PIPELINE | Attach tenant prospect list to active deal record |
| SCOUT | HUNT output feeds back as demand validation for SCOUT prospects |
| LOI Generator | Anchor lease-up thesis — "primary demand is from [category]" |
| acq-investment-report | Tenant demand summary for IC deck market slide |
| Market Pulse | Cross-reference CANVAS demand signals against market absorption data |

---

## Behavioral Rules

1. **Always run FILL before full lease-up modeling.** No IC deck should have a lease-up
   thesis without a CANVAS run backing it.

2. **Score every prospect.** Unscored lists are noise. CANVAS scoring forces prioritization.

3. **Contact information is the product.** A tenant name without a contact is half the work.
   Spend the search effort to find a decision-maker name and phone/email.

4. **HUNT informs SCOUT.** If HUNT surfaces high demand in a specific submarket that SCOUT
   hasn't covered yet, flag it: "Demand signals suggest we should run SCOUT in [submarket]."

5. **Lease expiry timing is the urgency signal.** Tenants with leases expiring in 6–18 months
   are the highest-urgency prospects. Prioritize identifying these.

6. **Never fabricate tenant data.** If web search doesn't surface a credible contact for a
   prospect, note it as "Contact: research required" rather than guessing.
