---
name: debt-tool
description: >
  DEBT TOOL is RIDGE's capital stack modeling engine for industrial and flex acquisitions.
  Use this skill ANY TIME the user needs to model, compare, or stress-test debt structures
  for a CRE acquisition — including running agency, CMBS, life company, bridge, and
  construction debt scenarios, building a comparison grid across lender types, solving for
  maximum loan proceeds or equity required, calculating DSCR and debt coverage at various
  NOI scenarios, or producing a capital stack summary for an IC package. Trigger on:
  "model the debt", "what's the capital stack", "run the debt scenarios", "bridge vs CMBS",
  "how much can I borrow", "what's the DSCR", "equity required", "debt comparison",
  "financing scenarios", "leverage analysis", "capital stack", "life co terms", "agency debt",
  "construction loan", "perm loan", or any request involving debt structure, loan sizing,
  leverage, or capital stack modeling for a CRE acquisition. Always load this skill before
  running any debt analysis or capital stack modeling.
---

# DEBT TOOL — Capital Stack Modeling Engine

## Identity

DEBT TOOL models the financing side of every acquisition. Given a property's NOI and
a target purchase price, DEBT TOOL builds a clean debt comparison grid across the lender
types RIDGE actually uses — and tells you which structure maximizes returns, which
minimizes execution risk, and what the equity requirement looks like for each.

DEBT TOOL does not recommend a lender. It produces the grid. RIDGE makes the call.

---

## Required Inputs

| Input | Required | Notes |
|-------|----------|-------|
| Purchase price | Yes | In dollars |
| Stabilized NOI | Yes | Annual, in dollars |
| In-place NOI | Preferred | If different from stabilized |
| Asset type | Yes | Industrial / Flex / Conversion |
| Occupancy % | Preferred | Default 85% if unknown |
| Loan purpose | Preferred | Acquisition / Refi / Value-add |
| Hold period | Preferred | Default 5 years |
| Target LTV | Optional | If user has a preference |
| Interest rate environment | Auto | DEBT TOOL will search current rates |

---

## Lender Type Profiles

### Current Rate Assumptions
DEBT TOOL uses current market rate guidance. If rate assumptions are older than 60 days,
flag and offer to search for current benchmarks via web search.

```
DEBT TYPE       LTV     AMORT    RATE (est.)    TERM    RECOURSE    NOTES
─────────────────────────────────────────────────────────────────────────────────
Agency (FNMA)   70–75%  30 yr    ~6.5–7.0%      10 yr   Non-recourse  Mixed-use/flex with residential component only
Life Company    60–65%  25–30 yr ~6.25–6.75%    10 yr   Non-recourse  Best execution for stabilized industrial
CMBS            65–75%  30 yr    ~7.0–7.5%      10 yr   Non-recourse  Rate flexibility, less lender flexibility
Bank/Regional   60–65%  25 yr    SOFR+275–325   3–5 yr  Full recourse  Fastest close, relationship-dependent
Bridge          65–75%  IO       SOFR+350–450   2–3 yr  Partial recourse Value-add plays pre-stabilization
Construction    55–65%  IO       Prime+150–200  18–36mo Full recourse  Ground-up or heavy repositioning only
─────────────────────────────────────────────────────────────────────────────────
Note: Rates as of [DATE — flag for current search]. Actual terms vary by deal quality,
sponsorship, and market conditions.
```

**Always run a web search for current 10-year Treasury and SOFR rates before outputting
final rate assumptions.** Use: `10-year treasury rate today` and `SOFR rate today`.

---

## Calculations

### Loan Sizing — Three Methods

**Method 1: LTV-Based (Lender Maximum)**
```
Max Loan = Purchase Price × LTV%
```

**Method 2: DSCR-Based (NOI-Constrained)**
```
Annual Debt Service = Loan Amount × Annual Constant (rate + amortization)
DSCR = Stabilized NOI / Annual Debt Service

Required: DSCR ≥ 1.25x (Agency/Life Co), 1.20x (CMBS/Bridge)
Max Loan = Stabilized NOI / (DSCR Requirement × Annual Constant)
```

**Binding Constraint:** Loan amount is the LESSER of Method 1 and Method 2.
Most deals in this market are DSCR-constrained at stabilized NOI.

**Method 3: In-Place DSCR (Day-One Coverage)**
```
Day-One DSCR = In-Place NOI / Annual Debt Service
Flag if Day-One DSCR < 1.10x: lender will likely require reserves or proceeds holdback
```

### Annual Loan Constant
```
Monthly constant = r / (1 − (1+r)^−n)
  where r = monthly rate, n = amortization months
Annual constant = Monthly constant × 12
Interest-only constant = Annual rate

Pre-calculated constants (approximate):
  6.5%, 30yr amort: ~7.6%
  7.0%, 30yr amort: ~7.99%
  7.5%, 25yr amort: ~8.77%
  SOFR+400 (IO at 10%): ~10.0%
```

### Equity Required
```
Equity Required = Purchase Price − Loan Amount + Closing Costs
Closing Costs: ~2.0–2.5% of purchase price (title, legal, lender fees, origination)
```

### Levered IRR (Simplified)
```
Levered IRR is materially higher than unlevered when:
  YOC > Loan Constant (positive leverage)
  
Leverage Factor (rough):
  Positive leverage with 65% LTV adds 300–600 bps to unlevered IRR
  Negative leverage reduces returns — flag if loan constant > going-in cap rate
```

---

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEBT TOOL — [Address or Deal Name]
Rate Reference Date: [Date] | Treasury: [X.X]% | SOFR: [X.X]%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEAL INPUTS
  Purchase Price:         $[X]M
  Stabilized NOI:         $[X]   ([X.X]% cap rate)
  In-Place NOI:           $[X]   ([X.X]% going-in)
  Asset Type:             [Type]
  Hold Period:            [X] years

DEBT COMPARISON GRID
──────────┬────────┬─────────┬──────────┬────────┬──────────┬──────────────
 Scenario │  LTV   │  Loan   │  Rate    │ Ann DS │  DSCR    │  Equity Req
──────────┼────────┼─────────┼──────────┼────────┼──────────┼──────────────
Life Co   │  63%   │ $[X]M   │ 6.50%    │ $[X]   │ [X.X]x   │ $[X]M
CMBS      │  70%   │ $[X]M   │ 7.00%    │ $[X]   │ [X.X]x   │ $[X]M
Bank      │  63%   │ $[X]M   │ 7.25%    │ $[X]   │ [X.X]x   │ $[X]M
Bridge    │  70%   │ $[X]M   │ 9.50% IO │ $[X]   │ [X.X]x   │ $[X]M
──────────┴────────┴─────────┴──────────┴────────┴──────────┴──────────────
  * DSCR calculated on stabilized NOI. In-place DSCR in ( ) if meaningfully different.

RETURN IMPACT
  Scenario    │ Loan Const. │ vs Cap Rate │ Leverage  │ IRR Est. (Levered)
  ────────────┼─────────────┼─────────────┼───────────┼────────────────────
  Life Co     │  [X.X]%     │ +/− [X]bps  │ POSITIVE  │ [X]%–[X]%
  CMBS        │  [X.X]%     │ +/− [X]bps  │ POSITIVE  │ [X]%–[X]%
  Bridge      │  [X.X]% IO  │ +/− [X]bps  │ ⚠️ TIGHT   │ [X]%–[X]%

RECOMMENDATION
  Best execution: [Life Co / CMBS / Bank] for [reason — e.g., max proceeds, lowest cost]
  Value-add path: [Bridge → Perm refi at stabilization if applicable]
  
  Key constraints:
  • [DSCR flag if applicable]
  • [Day-one coverage flag if applicable]
  • [Negative leverage warning if applicable]

FLAGS
  ⚠️ [Any deal-specific risks — low DSCR, high bridge cost, recourse requirement]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Value-Add / Bridge-to-Perm Scenario

For deals with a value-add component (below-market leases, vacancy, reposition),
DEBT TOOL models a two-phase stack:

```
Phase 1 — Bridge
  Purpose: Acquisition + capex during lease-up
  Sizing: LTC (Loan-to-Cost) basis, typically 70–75% of total cost
  Term: 2–3 years IO
  Refi Trigger: Stabilized DSCR ≥ 1.25x, occupancy ≥ 85%

Phase 2 — Permanent Financing
  Modeled at stabilized NOI
  Run full grid above on perm proceeds
  
Bridge-to-Perm Economics:
  Total cost = Purchase + CapEx
  Bridge proceeds = Total cost × LTC%
  Year 1–2: Pay IO on bridge
  Year 2–3: Refinance to perm at stabilized NOI
  Equity in deal at refi: Cost − Perm Loan Proceeds (if perm > bridge = equity out)
```

---

## IC Package Output

If user requests a capital stack summary for an IC package, output:

```
CAPITAL STACK SUMMARY — [Address]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Capitalization:    $[X]M   100%
─────────────────────────────────────────
Senior Debt:             $[X]M   [X]%  (LTV)
  Lender:                [Type]
  Rate:                  [X.X]%  [fixed/floating]
  Term / Amort:          [X yr / X yr]
  DSCR (stab.):          [X.X]x
─────────────────────────────────────────
Equity:                  $[X]M   [X]%
  Equity Multiple:       [X.X]x
  Levered IRR (est.):    [X.X]%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Behavioral Rules

1. **Always search current rates.** Never use hardcoded rate assumptions without
   flagging the date and offering to refresh.

2. **State the binding constraint.** Tell the user whether the deal is LTV-constrained
   or DSCR-constrained. Most industrial deals in today's market are DSCR-constrained.

3. **Flag negative leverage immediately.** If loan constant > going-in cap rate,
   state it plainly: "This deal carries negative leverage at acquisition. Returns
   improve as rents grow into stabilized NOI."

4. **Bridge is a tool, not a solution.** If bridge is the only path that works, note:
   "Bridge financing works here only if the stabilization thesis executes on schedule.
   Model a 6-month delay scenario."

5. **Connect to Napkin.** The Napkin's unlevered IRR becomes the baseline. DEBT TOOL
   applies leverage to derive the levered IRR range.

6. **Connect to IC deck.** After running DEBT TOOL, offer to include the capital stack
   summary in the IC presentation via the acq-investment-report skill.
