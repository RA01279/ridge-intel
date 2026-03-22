---
name: waterfall
description: >
  WATERFALL is RIDGE's GP/LP distribution waterfall modeling engine. Use this skill ANY TIME the user needs to model, analyze, or stress-test a real estate equity waterfall structure — including calculating LP/GP distributions across multiple IRR hurdle tiers, assessing GP carry economics, evaluating whether a structure is LP-friendly, or comparing waterfall terms against market norms for industrial CRE. Trigger on: "run the waterfall", "model the waterfall", "what does GP get", "what does LP get", "carried interest", "promote", "pref return", "distribution waterfall", "tier structure", "catch-up", "GP economics", or any request to analyze equity distribution in a CRE deal structure.
---

# WATERFALL — GP/LP Distribution Engine

## Identity

WATERFALL is RIDGE's equity distribution modeling module. It calculates and analyzes how cash flows from a real estate asset are distributed between the GP (General Partner / Entrada Partners) and LP (Limited Partners) according to a defined waterfall structure.

---

## Waterfall Structure — American Waterfall (Default)

RIDGE uses the **American waterfall** structure by default — distributions are made after each asset sale or distribution event, not held until the full portfolio is realized.

### Distribution Sequence (Strict Ordering)

**Step 1 — Return of Capital**
- LP and GP each receive their contributed capital back, pro-rata to their equity contribution
- No promote, no carry — pure return of invested dollars
- LP gets back: LP Equity × (LP% contribution)
- GP gets back: GP Equity × (GP% contribution)

**Step 2 — Preferred Return to LP**
- LP receives a preferred return on their contributed capital before GP participates in profits
- Default: 10% (compounded or simple — user selects)
- Compounded pref: LP Equity × ((1 + pref)^hold - 1)
- Simple pref: LP Equity × pref × hold years
- GP receives nothing in this step

**Step 3 — GP Catch-Up (if elected)**
- After LP receives pref, GP catches up to their target promote percentage
- Full catch-up (100%): GP receives 100% of distributions until GP has received X% of all profits distributed to date
- Partial catch-up: GP receives Y% of distributions in this tier
- Purpose: restores GP's pro-rata share of profits after LP's pref advantage

**Step 4 — Tiered Profit Split**
- Remaining profits split between GP and LP according to IRR hurdle tiers
- Up to 3 tiers supported:
  - **Tier 1**: Up to Hurdle 1 IRR → LP/GP split (e.g. 70/30)
  - **Tier 2**: Between Hurdle 1 and Hurdle 2 IRR → LP/GP split (e.g. 65/35)
  - **Tier 3**: Above Hurdle 2 IRR → LP/GP split (e.g. 60/40)
- IRR hurdles measured on LP equity contribution
- Higher GP promote at higher IRR tiers rewards outperformance

---

## Default Structure (Entrada Partners)

| Component | Default |
|---|---|
| GP Equity Contribution | 10% |
| LP Equity Contribution | 90% |
| Preferred Return | 10% compounded |
| GP Catch-Up | Yes — 100% catch-up |
| Tier 1 Hurdle | 10% LP IRR / 70-30 LP/GP split |
| Tier 2 Hurdle | 15% LP IRR / 65-35 LP/GP split |
| Tier 3 Hurdle | 20%+ LP IRR / 60-40 LP/GP split |

---

## Key Metrics — What to Calculate and Report

### LP Metrics
- **LP Equity In**: LP contribution in dollars
- **LP Total Distributions**: Sum of all LP receipts across all tiers
- **LP Equity Multiple**: LP Total Distributions / LP Equity In
- **LP IRR**: Internal rate of return on LP cash flows (equity out, distributions back)
- **LP Pref Coverage**: Was the full preferred return funded? If not, flag as shortfall

### GP Metrics
- **GP Equity In**: GP contribution in dollars
- **GP Total Distributions**: Sum of all GP receipts across all tiers
- **GP Equity Multiple**: GP Total Distributions / GP Equity In
- **GP Carried Interest (Carry)**: GP Total Distributions minus GP Equity Return (pure profit promote)
- **GP Effective Promote**: GP Carry / Total Profits (GP's share of upside above capital return)

### Deal Metrics
- **Total Equity**: GP + LP combined
- **Total Distributions**: Total cash returned to all partners
- **Deal Multiple**: Total Distributions / Total Equity
- **Value Creation**: Total Distributions minus Total Equity (net profit)

---

## LP Assessment Framework

When assessing whether a waterfall structure is LP-friendly, evaluate against these market norms for institutional industrial CRE:

| Metric | LP-Friendly | Market Standard | GP-Friendly |
|---|---|---|---|
| Pref Rate | 8%+ | 8-10% | Below 8% |
| GP Catch-Up | None or partial | 50-100% | Full 100% |
| Tier 1 GP Split | 15-20% | 20-25% | 25-30%+ |
| Tier 2 GP Split | 20-25% | 25-30% | 30-35%+ |
| Pref Type | Simple | Either | Compounded |
| LP IRR at base case | 12%+ | 10-12% | Below 10% |

---

## Output Format

Always produce these sections:

### WATERFALL DISTRIBUTION TABLE
Full tier-by-tier breakdown showing:
- Tier name and description
- Dollar amount distributed in tier
- GP receipt ($)
- LP receipt ($)
- Cumulative GP total
- Cumulative LP total
- Note on split or condition

### SUMMARY METRICS
| Metric | GP | LP |
|---|---|---|
| Equity Contributed | $ | $ |
| Total Distributions | $ | $ |
| Equity Multiple | x | x |
| IRR | % | % |
| Carried Interest / Promote | $ | — |

### LP ASSESSMENT
- Is this structure LP-friendly, market standard, or GP-friendly?
- How does LP IRR compare to market norms?
- Would a sophisticated institutional LP accept these terms?
- Any missing LP protections (clawback, NAV hurdle, etc.)?

### GP ECONOMICS
- GP carry amount and effective promote percentage
- Is GP compensation competitive for attracting LP capital?
- How does GP multiple compare to market norms?

### STRUCTURE FLAGS
- Any concerns with fairness, market norms, or missing provisions
- Clawback provisions — are they needed?
- Preferred return shortfall risk

### VERDICT
One sentence: market-standard, LP-friendly, or GP-heavy — and whether this structure will attract quality institutional LP capital.

---

## Integration with RIDGE

WATERFALL integrates with The Napkin output:
- When a Napkin screen shows HIGH CONVICTION or CONDITIONAL, a "💧 Run Waterfall" button appears
- Equity required and total distributions auto-populate from the Napkin calc
- Hold period carries over automatically

WATERFALL results feed into:
- IC Report — waterfall summary included in capital stack slide
- LOI Generator — distribution structure referenced in offer terms
- Pipeline — GP/LP structure logged against deal record

---

## Common Structures to Recognize

**Straight Split (No Pref)**: Simple GP/LP split with no preferred return — rare in institutional deals, flag as non-standard

**Pref Only (No Catch-Up)**: LP gets pref, then straight split — LP-friendly, common in core-plus

**Full Promote Structure**: Pref → 100% catch-up → tiered splits — most common in value-add industrial

**European Waterfall**: All capital returned across portfolio before any promote — flag when user requests, note RIDGE default is American
