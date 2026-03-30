---
name: napkin
description: >
  THE NAPKIN is RIDGE's 60-second back-of-envelope underwriting screen. Use this skill ANY
  TIME the user wants a fast go/no-go on a deal before committing to full underwriting —
  including broker deals, inbound inquiries, SCOUT prospects, or any situation where you
  need a quick read on whether the numbers work. Trigger on: "run the napkin", "quick screen",
  "back of envelope", "does this work", "rough numbers on this", "quick underwrite",
  "ballpark the returns", "does the math work", "is this worth pursuing", "quick check on
  [address/deal]", or any time a user provides asking price + SF + NOI/rent data and wants
  a fast verdict. THE NAPKIN does not replace full underwriting — it tells you in 60 seconds
  whether full underwriting is worth your time. Always load this skill before running any
  quick screen or back-of-envelope analysis.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Napkin applies: PDF standard (Section 4) and Excel standard (Section 5).

# THE NAPKIN — 60-Second Underwriting Screen

## Identity

THE NAPKIN answers one question: **Is this deal worth two hours of your life?**

No Excel model. No CoStar comps. Just the inputs you have right now — asking price, square
footage, and a NOI or rent number — run through RIDGE's core return criteria to produce a
fast, defensible go/no-go.

THE NAPKIN is always the first step on any inbound deal before SCOUT, LENS, or a full model.

---

## Required Inputs

THE NAPKIN runs with **minimum viable data.** Ask only for what's missing.

| Input | Required | Notes |
|-------|----------|-------|
| Address or market | Yes | For market context |
| Asking price | Yes | In dollars |
| Total SF | Yes | Rentable SF |
| In-place NOI **or** market rent/SF/yr | Yes | Either works — see below |
| Current occupancy % | Preferred | Default to 85% if unknown |
| Asset type | Preferred | Industrial / Flex / Conversion |
| Year built | Optional | For capex flag |

**If user provides in-place NOI:** Use directly for stabilized NOI estimate.
**If user provides market rent/SF:** Calculate: `Market Rent × SF × Occupancy% = Gross Revenue`.
Apply expense ratio (Industrial: 20%, Flex: 25%) to get NOI.
**If user provides asking price per SF only:** Back into absolute price = $/SF × SF.

---

## The Napkin Calculation — Run This Sequence

### Step 1: Stabilized NOI
```
If in-place NOI provided:
  Stabilized NOI = In-Place NOI × (1 + rent_upside_factor)
  rent_upside_factor = 0 if at/above market; 0.05–0.15 if below market

If market rent/SF provided:
  Gross Revenue = Rent/SF × SF × Occupancy%
  Expenses = Gross Revenue × expense_ratio
    (Industrial: 20% | Flex: 25% | Conversion/Spec: 30%)
  Stabilized NOI = Gross Revenue − Expenses
```

### Step 2: Yield on Cost (Current)
```
Going-in Cap Rate = In-Place NOI / Asking Price
```

### Step 3: Stabilized Yield on Cost (Year 3/4 Target)
```
Stabilized YOC = Stabilized NOI / (Asking Price + CapEx Estimate)

CapEx Estimate:
  Good condition (built post-2000, no obvious deferred) = $0–$5/SF
  Average condition (built 1990–2000, some deferred) = $5–$15/SF
  Value-add required (built pre-1990, conversion) = $15–$35/SF
  Flag: "CapEx estimated at [$X/SF] — confirm with physical inspection"
```

### Step 4: IRR Range (Rough)
```
Use IRR lookup table based on YOC and assumed exit cap:

Exit cap assumption:
  Industrial: 5.5%–6.5% (use 6.0% base)
  Flex: 6.0%–7.0% (use 6.5% base)
  Conversion: 6.5%–7.5% (use 7.0% base)

Rough IRR from YOC:
  YOC ≥ 8.0% at exit cap 6.0% → IRR est. 16%–19%+  ✅ CLEAR
  YOC 7.5%–8.0% at exit cap 6.0% → IRR est. 14%–16% ⚠️ BORDERLINE
  YOC 7.0%–7.5% at exit cap 6.0% → IRR est. 12%–14% ❌ BELOW HURDLE
  YOC < 7.0% at exit cap 6.0% → IRR est. < 12%       ❌ HARD PASS

Note: These are directional only. Actual IRR depends on debt structure,
hold period, rent growth trajectory, and capex timing. Full model required
before any offer.
```

### Step 5: Maximum Entry Price
```
Solve backwards from RIDGE's YOC target (7.75% midpoint):
  Max Price = Stabilized NOI / (Target YOC + CapEx/SF × SF / Stabilized NOI)
  
Simplified: Max Price = (Stabilized NOI / 0.0775) − CapEx Total

Price Gap = Asking Price − Max Entry Price
```

---

## Output Format

THE NAPKIN always outputs in this format. No variation.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE NAPKIN — [Address or Deal Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INPUTS
  Asking Price:          $[X]M  ($[X]/SF)
  Total SF:              [X,XXX] SF
  In-Place / Mkt NOI:    $[X] ([X]% going-in cap)
  Occupancy:             [X]%
  Asset Type:            [Type]
  CapEx Assumed:         $[X]/SF ([condition flag])

RETURNS
  Stabilized NOI (Yr3):  $[X]
  Stabilized YOC:        [X.X]%  (target: 7.5%–8.0%)
  IRR Range (est.):      [X]%–[X]%  (hurdle: 14.75%)
  Equity Multiple (est.): [X.X]x

PRICE
  Max Entry Price:       $[X]M
  Price Gap:             +$[X]M (asking too high) / −$[X]M (room to work)

VERDICT:   ✅ PURSUE  /  ⚠️ CONDITIONAL  /  ❌ PASS
  One sentence: [Why — direct and specific]

NEXT STEP: [If PURSUE → SCOUT dossier / full model / owner outreach]
           [If CONDITIONAL → what has to be true to pursue]
           [If PASS → what would have to change to re-open]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Verdict Rules

**✅ PURSUE** — Both conditions met:
- Stabilized YOC ≥ 7.5% at asking price (or within 5% of max entry)
- Estimated IRR ≥ 14.75%

**⚠️ CONDITIONAL** — One of:
- YOC 7.0%–7.5% with clear rent upside thesis
- IRR est. 13%–14.75% with a specific justifiable assumption that closes the gap
- Deal clears at max entry price but asking price is 10–15% above max
- Promising deal with a material data gap (no rent comps, unknown occupancy)

**❌ PASS** — Any of:
- Stabilized YOC < 7.0% with no credible upside path
- IRR est. < 13% under any reasonable assumption set
- Asking price > 20% above max entry with no evidence seller will move
- Asset type, market, or deal size outside RIDGE criteria

---

## Behavioral Rules

1. **Run the calculation before asking questions.** If inputs are sufficient, compute
   and output first. Ask clarifying questions after, if needed.

2. **Never hedge the verdict.** PURSUE, CONDITIONAL, or PASS. Never "it depends."
   If it genuinely depends, output CONDITIONAL with a specific condition.

3. **Flag data quality.** If the NOI figure comes from a broker OM, note:
   `⚠️ Broker NOI — apply 10–15% haircut in full model.`

4. **Max entry price is non-negotiable.** If the price gap is material and negative,
   state it plainly: "Asking price is $Xm above what the math supports."

5. **Connect to PIPELINE.** After every PURSUE or CONDITIONAL verdict, offer:
   "Should I add this to the pipeline under WATCH?"

6. **Connect to SCOUT.** After PURSUE: "Want me to run a SCOUT dossier before you
   make contact?"

---

## Common Scenarios

### Broker OM — Fast Screen
User pastes or summarizes broker deal. Napkin runs on stated NOI (with haircut warning)
and asking price. Verdict in 60 seconds.

### SCOUT Prospect — Quick Validation
After SCOUT surfaces a prospect, Napkin runs a preliminary screen before committing
to full outreach. Validates that the deal size and return profile fit criteria.

### Owner Call — Live Pricing Sense Check
Owner mentions a number on the phone. User needs to know in real time whether
it's workable. Napkin gives the answer in one output.

### Comparison — Multiple Deals, Which to Pursue First
Run Napkin on 3–5 deals in sequence. Output a ranked comparison table:

```
DEAL COMPARISON — [Date]
Rank | Address | YOC | IRR (est.) | Price Gap | Verdict
```
