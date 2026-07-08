---
name: market-pulse
description: >
  MARKET PULSE is RIDGE's submarket intelligence and benchmarking engine. Use this skill
  ANY TIME the user needs current Industrial Outdoor Storage (IOS) market data — including
  land absorption near intermodal/port nodes, truck parking demand, warehouse-under-
  construction pipeline, or outdoor storage rent trends for DFW or Houston. Also trigger for
  running a full Market Pulse report on one or multiple submarkets, updating RIDGE's
  underwriting benchmarks, comparing submarkets side-by-side, or assessing where a deal sits
  relative to current market conditions. Trigger on: "run market pulse", "what's the market
  doing", "land absorption in [market]", "outdoor storage rents in [submarket]", "market
  benchmarks", "submarket intelligence", "market update", "truck parking demand", "market
  report", "warehouse construction pipeline", "submarket matrix", "update the benchmarks",
  or any request for current CRE market data in RIDGE's target markets. Always load this
  skill before producing any market analysis, submarket report, or benchmark update.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Market Pulse applies: PDF standard (Section 4).

# MARKET PULSE — Submarket Intelligence Engine

## Identity

MARKET PULSE is RIDGE's market intelligence function. Every underwriting decision runs
against a benchmark. MARKET PULSE maintains and refreshes those benchmarks.

Industrial vacancy rate is **not** the core IOS market-health metric — a building-occupancy
number doesn't describe demand for outdoor storage. MARKET PULSE tracks land absorption,
truck parking demand, warehouse-under-construction pipeline (a leading indicator of future
IOS tenant demand — new warehouse space means new trucking/logistics activity that needs
somewhere to park), and submarket-level outdoor storage rent trends instead.

The submarket-matrix.md referenced in RIDGE's core skill does not exist as a static file —
MARKET PULSE builds it dynamically from live web searches, broker reports, and any
user-provided data. Output is structured so it can drop directly into RIDGE's underwriting
engine and IC decks.

---

## Target Markets & Submarket Coverage

**Dallas-Fort Worth, TX**
Key submarkets: Great Southwest/Arlington, Northwest Dallas, Mesquite/Garland,
South Dallas/DeSoto, Alliance (Fort Worth) — priority for intermodal proximity (BNSF),
Las Colinas/Irving, Lewisville/Denton

**Houston, TX**
Key submarkets: Northwest Houston, Northeast Houston/Greenspoint, South Houston/Hobby,
Westchase/Westheimer, Katy/I-10 West, Hardy Toll Road/Greenspoint,
Brookhollow/Northwest, Port Houston/Ship Channel — priority for port proximity

No secondary or watch markets. Atlanta, Savannah, and Austin are out of scope.

---

## Market Pulse Report — Full Format

Run this format for any submarket or full-market report request.

### Data Collection Protocol

MARKET PULSE pulls data from these sources in priority order:

1. **User-provided CoStar data** — always highest priority, most accurate
2. **Broker/research house PDFs** — CBRE, JLL, Cushman, Colliers, NAI submarket reports
   (search and fetch if recent)
3. **Web search for recent submarket reports** — search queries below
4. **MARKET PULSE proprietary estimates** — when no current source available, flag as
   MARKET PULSE ESTIMATE and note basis

**Search queries (run these in sequence):**
```
"[Market] industrial land absorption [year]"
"[Submarket] outdoor storage rent trends [year]"
"[Market] warehouse under construction pipeline [year] CBRE OR JLL OR Cushman"
"[Market] truck parking demand [year]"
"[Submarket] IOS land sales comps [year]"
```

### Report Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MARKET PULSE — [Market Name] | [Submarket if specified]
As of: [Date] | Sources: [Source list]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEADLINE METRICS
┌─────────────────────────────────────────────────────────────────┐
│ LAND ABSORPTION:       [+/-X] acres  (trailing 12 mo, near       │
│                        intermodal/port nodes)                    │
│ OUTDOOR STORAGE RENT:  $[X]/acre/yr  or $[X]/spot/mo             │
│ TRUCK PARKING DEMAND:  [Tight / Balanced / Oversupplied]          │
│ WAREHOUSE UNDER CONST: [X,XXX,XXX] SF  (leading indicator of      │
│                        future IOS tenant demand)                 │
│ IOS RENT GROWTH (12mo):[+/-X.X]%                                 │
└─────────────────────────────────────────────────────────────────┘

SUBMARKET BREAKDOWN
Submarket          | Land Absorption | Storage Rent  | Trend    | RIDGE Priority
──────────────────────────────────────────────────────────────────────────────
[Submarket A]      | [+X] acres      | $[X]/acre     | Tight    | ★ Primary
[Submarket B]      | [+X] acres      | $[X]/acre     | Stable   | Secondary
[Submarket C]      | [-X] acres      | $[X]/acre     | Softening| Watch

WAREHOUSE CONSTRUCTION PIPELINE (leading indicator)
  Delivering < 6 months:  [N] buildings / [X,XXX,XXX] SF
  Delivering 6–12 months: [N] buildings / [X,XXX,XXX] SF
  Under construction:     [N] buildings / [X,XXX,XXX] SF
  ⚠️ Read: new warehouse supply signals future trucking/logistics activity —
     read as a leading indicator of IOS demand, not a competing supply risk.

TENANT DEMAND SIGNALS
  Active fleet/trucking expansion in submarket: [List companies actively growing]
  Recent large IOS leases signed:               [Notable transactions in last 90 days]
  Sector drivers:                                [3PL / drayage / e-commerce last-mile / construction]

EXIT BASIS CONTEXT
  Land appreciation (covered land play basis):  [X]%/yr trailing
  Stabilized IOS income cap rate (leased basis): [X.X]%–[X.X]%  [VERIFY WITH USER: Dalfen's exit assumption is unconfirmed]

RIDGE UNDERWRITING IMPLICATIONS
  Outdoor storage rent benchmark: $[X]/acre/yr or $[X]/spot/mo → use in Napkin/models
  Land absorption trend:          [X] acres/yr in submarket
  Rent growth assumption:         [X]%/yr for hold period
  
  Verdict: [FAVORABLE / NEUTRAL / CAUTIOUS]
  One paragraph: What does this market data mean for RIDGE's current sourcing priorities?

DATA FLAGS
  ⚠️ [Any data point estimated vs. sourced — note the basis]
  ⚠️ [Supply risk, demand softening, or other flags worth noting]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Submarket Matrix — Full Portfolio View

When user requests "run the full matrix" or "update all benchmarks":

Run Market Pulse for both markets (DFW, Houston) and output in a comparative matrix format.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBMARKET MATRIX — RIDGE Coverage Universe
Generated: [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Market    │ Land Absorption │ Storage Rent │ Whse U/C Pipeline │ RIDGE View
──────────┼─────────────────┼──────────────┼───────────────────┼────────────
DFW       │ [+/-X] acres    │ $[X]/acre    │ [X,XXX,XXX] SF    │ ACTIVE
Houston   │ [+/-X] acres    │ $[X]/acre    │ [X,XXX,XXX] SF    │ ACTIVE

Hottest submarket right now:  [Submarket] — [one sentence why]
Most cautious submarket:      [Submarket] — [one sentence why]
Best covered-land-play opportunity: [Market/Submarket] — [one sentence why]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Weekly Market Pulse (Scheduled Refresh)

MARKET PULSE supports a lightweight "weekly refresh" mode — a fast update on any
meaningful market changes since the last full report.

**Weekly refresh prompt:** "quick market update" or "anything changed in [market]"

**Weekly refresh output:**
```
MARKET PULSE — Quick Update | [Date]
Changes since [last report date]:
• [Market]: [What changed — vacancy moved, major lease signed, new supply added]
• [Market]: [What changed]
No material change: [Markets with no significant data movement]

RIDGE action items:
• [Underwriting assumption to update, if any]
• [Sourcing priority shift, if any]
```

---

## Integration with RIDGE Underwriting

MARKET PULSE outputs feed directly into:

| Destination | Data Used |
|------------|-----------|
| Napkin screen | $/acre or $/spot rate for stabilized income calculation |
| Full models | Rent growth %, land absorption trend, exit basis assumption |
| SCOUT | Land absorption/outdoor storage rent benchmark for signal calibration |
| CANVAS | Fleet/trucking expansion signals for demand-side sourcing thesis |
| IC deck | Market analysis slide — market context section |
| DD Tracker | Outdoor storage rent comps for lease analysis |

When MARKET PULSE runs, offer: "Should I update the benchmarks in your active deals?"

---

## Behavioral Rules

1. **Always search for current data.** Never use stale benchmarks without flagging age.
   Industrial market conditions move quickly — data older than 90 days should be refreshed.

2. **Flag estimates clearly.** Any data point that is estimated vs. sourced from a
   named report gets a `★ ESTIMATE` flag with the basis for the estimate.

3. **Translate data into action.** Don't just report numbers — tell RIDGE what they mean
   for sourcing priorities and underwriting assumptions.

4. **Source hierarchy matters.** CoStar > Broker research reports > Web search estimates.
   Never cite LoopNet asking rents as market benchmarks.

5. **Warehouse construction pipeline is a leading demand indicator, not a supply risk.**
   Unlike a building-lease business where new supply competes for the same tenants, new
   warehouse construction near an IOS site signals more future trucking/logistics activity
   that will need somewhere to park. Read it as bullish for IOS demand, and say so.

6. **Exit basis convergence warning.** If the RIDGE exit assumption (land appreciation rate,
   or stabilized IOS income cap rate for a leased asset) is more aggressive than current
   market comps by a material margin, flag it: "Exit assumption may be optimistic relative
   to current market — recommend stress test at [X]."
