---
name: napkin
description: >
  THE NAPKIN is RIDGE's 60-second back-of-envelope underwriting screen. Use this skill ANY
  TIME the user wants a fast go/no-go on a deal before committing to full underwriting —
  including broker deals, inbound inquiries, SCOUT prospects, or any situation where you
  need a quick read on whether the numbers work. Trigger on: "run the napkin", "quick screen",
  "back of envelope", "does this work", "rough numbers on this", "quick underwrite",
  "ballpark the returns", "does the math work", "is this worth pursuing", "quick check on
  [address/deal]", or any time a user provides asking price + acreage + income/rent data and
  wants a fast verdict on an Industrial Outdoor Storage (IOS) deal. THE NAPKIN does not
  replace full underwriting — it tells you in 60 seconds whether full underwriting is worth
  your time. Always load this skill before running any quick screen or back-of-envelope
  analysis.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Napkin applies: PDF standard (Section 4) and Excel standard (Section 5).

# THE NAPKIN — 60-Second Underwriting Screen

## Identity

THE NAPKIN answers one question: **Is this deal worth two hours of your life?**

No Excel model. No CoStar comps. Just the inputs you have right now — asking price,
acreage, building coverage, and an income or rate number — run through RIDGE's core return
criteria to produce a fast, defensible go/no-go on a **$/acre land basis**, not $/SF or NOI.

THE NAPKIN is always the first step on any inbound deal before SCOUT, LENS, or a full model.

---

## Required Inputs

THE NAPKIN runs with **minimum viable data.** Ask only for what's missing.

| Input | Required | Notes |
|-------|----------|-------|
| Address or market | Yes | For market context — must be DFW or Houston |
| Asking price | Yes | In dollars |
| Total acreage | Yes | Replaces total SF as the primary basis unit |
| Building coverage % | Yes | Existing structure SF ÷ site SF — hard gate at <30%, checked first |
| Entitlement status | Yes | By-right, or SUP/CUP required — if SUP required, estimated months to approval |
| In-place income **or** market $/acre or $/spot rate | Yes | Either works — see below. Vacant is fine too — occupancy is not required |
| Transaction type | Preferred | Single asset / Portfolio / Sale-leaseback / Land entitlement / Forward sale / Development for IOS use / Covered land play |

**If user provides in-place income:** Use directly for stabilized income estimate.
**If user provides market $/acre or $/spot rate:** Calculate:
`Rate × Acreage (or spot count) × Occupancy% = Gross Revenue`.
Apply an expense ratio to get stabilized income — **[VERIFY WITH USER]**: Dalfen's actual
IOS expense ratio assumption (pavement/fencing maintenance, property tax, insurance — no
HVAC/roof/dock-door costs since there's typically no building) has not been confirmed;
do not silently reuse a building-asset expense ratio.
**If user provides asking price per acre only:** Back into absolute price = $/acre × acreage.

---

## The Napkin Calculation — Run This Sequence

### Step 1: Building Coverage Gate Check (run first, before any return math)
```
Building Coverage % = Existing Structure SF / Site SF (acreage converted to SF: 1 acre = 43,560 SF)

If Building Coverage % ≥ 30%:
  HARD PASS — state this immediately, plainly, before running any further numbers.
  This is Dalfen's gate criterion, not a soft preference.
```

### Step 2: Stabilized Income
```
If in-place income provided:
  Stabilized Income = In-Place Income × (1 + income_upside_factor)
  income_upside_factor = 0 if at/above market; 0.05–0.15 if below market

If market $/acre or $/spot rate provided:
  Gross Revenue = Rate × Acreage (or spot count) × Occupancy%
  Expenses = Gross Revenue × expense_ratio   [VERIFY WITH USER — see Required Inputs note]
  Stabilized Income = Gross Revenue − Expenses
```

### Step 3: Yield on Cost (Current)
```
Going-in Yield = In-Place Income / Asking Price
```

### Step 4: Entitlement Timeline & Carry Cost (explicit input, not an afterthought)
```
If entitlement is by-right: no adjustment.

If SUP/CUP required:
  Carrying Cost = (Months to Approval / 12) × Cost of Capital × Asking Price
  Add Carrying Cost to basis before computing Stabilized YOC.
  Flag denial risk explicitly — a deal that only works if the SUP is approved is a
  CONDITIONAL verdict at best, never a clean PURSUE.
```

### Step 5: Stabilized Yield on Cost (Target)
```
Stabilized YOC = Stabilized Income / (Asking Price + Carrying Cost + Site Work Estimate)

Site Work Estimate (paving, fencing, drainage buildout — not building capex):
  Minimal work needed (already paved/fenced, functioning IOS use) = $0–$2/SF of site
  Moderate work (partial paving/fencing, some drainage work) = $2–$6/SF of site
  Full buildout required (raw/undeveloped land) = $6–$15/SF of site
  Flag: "Site work estimated at [$X/SF of site] — confirm with physical inspection"

Target YOC: [VERIFY WITH USER] — Dalfen's actual Year 3/4 YOC target is unconfirmed (see
RIDGE_SKILL.md Investment Criteria). Do not silently reuse Entrada's old 7.5%–8.0% target.
```

### Step 6: IRR Range (Rough)
```
[VERIFY WITH USER] — the YOC→IRR lookup table below is Entrada's old calibration (single
exit cap assumption for building income, not land). Recalibrate once Dalfen's IRR hurdle
and expected exit basis (land appreciation vs. stabilized IOS income cap rate) are
confirmed. Until then, present any IRR estimate as directional and explicitly unconfirmed
against a real hurdle — do not silently score a deal against Entrada's old thresholds.

Note: These are directional only. Actual IRR depends on debt structure, hold period,
entitlement timeline, and site work costs. Full model required before any offer.
```

### Step 7: Maximum Entry Price
```
Solve backwards from Dalfen's confirmed YOC target once known:
  Max Price = (Stabilized Income / Target YOC) − Carrying Cost − Site Work Total

Until the target YOC is confirmed, state Max Entry Price as a function of the target
("at a 7.50% YOC target, max entry is $X; at 8.00%, max entry is $Y") rather than picking
a single unconfirmed number.

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
  Asking Price:          $[X]M  ($[X]/acre)
  Total Acreage:         [X.X] acres
  Building Coverage:     [X]%  (gate: <30% — [PASS/FAIL])
  Entitlement:           [By-right / SUP required — est. [X] months]
  In-Place / Mkt Income: $[X] ([X]% going-in yield)
  Transaction Type:      [Type]
  Site Work Assumed:     $[X]/SF of site ([condition flag])

RETURNS
  Stabilized Income (Yr3): $[X]
  Stabilized YOC:          [X.X]%  (target: [VERIFY WITH USER])
  IRR Range (est.):        [X]%–[X]%  (hurdle: [VERIFY WITH USER])
  Equity Multiple (est.):  [X.X]x

PRICE
  Max Entry Price:       $[X]M  (at [VERIFY WITH USER] YOC target)
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

**[VERIFY WITH USER]** — Dalfen's actual YOC target and IRR hurdle are unconfirmed (see
RIDGE_SKILL.md Investment Criteria). The thresholds below are Entrada's old numbers,
labeled `[Entrada — unverified for Dalfen]`; use them only as a rough industry-standard
sanity check, never as the actual verdict basis, until the user confirms Dalfen's hurdles.

**Hard gate, before any of the below:** Building coverage ≥ 30% is an automatic ❌ PASS
regardless of returns.

**✅ PURSUE** — Both conditions met (against confirmed hurdles once available):
- Stabilized YOC ≥ target at asking price (or within 5% of max entry) `[Entrada — unverified: was 7.5%]`
- Estimated IRR ≥ hurdle `[Entrada — unverified: was 14.75%]`

**⚠️ CONDITIONAL** — One of:
- YOC within 0.5pp of target with clear income upside thesis
- IRR est. within ~1.5pp of hurdle with a specific justifiable assumption that closes the gap
- Deal clears at max entry price but asking price is 10–15% above max
- Entitlement is not yet by-right — SUP/CUP approval is still pending
- Promising deal with a material data gap (no rent/land comps, unconfirmed acreage or coverage)
- Dalfen's return hurdle has not yet been confirmed this session — state the math, flag CONDITIONAL pending hurdle confirmation, don't force a PURSUE/PASS call on an assumed number

**❌ PASS** — Any of:
- Building coverage ≥ 30%
- Stabilized YOC well below target with no credible upside path
- IRR est. well below hurdle under any reasonable assumption set
- Asking price > 20% above max entry with no evidence seller will move
- Deed restriction or zoning prohibits outdoor storage/industrial use
- Asset type, market, or deal size outside RIDGE criteria (not IOS, not DFW/Houston, below $2M)

---

## Behavioral Rules

1. **Building coverage gate runs before anything else.** Don't compute returns on a deal
   that already fails the <30% gate — say so first.

2. **Run the calculation before asking questions.** If inputs are sufficient, compute
   and output first. Ask clarifying questions after, if needed.

3. **Never hedge the verdict.** PURSUE, CONDITIONAL, or PASS. Never "it depends."
   If it genuinely depends, output CONDITIONAL with a specific condition.

4. **Flag data quality.** If the income figure comes from a broker OM, note:
   `⚠️ Broker income — apply 10–15% haircut in full model.`

5. **Entitlement status is not optional.** If the user hasn't stated by-right vs. SUP-required,
   ask — don't assume by-right.

6. **Max entry price is non-negotiable.** If the price gap is material and negative,
   state it plainly: "Asking price is $Xm above what the math supports."

7. **Connect to PIPELINE.** After every PURSUE or CONDITIONAL verdict, offer:
   "Should I add this to the pipeline under WATCH?"

8. **Connect to SCOUT.** After PURSUE: "Want me to run a SCOUT dossier before you
   make contact?"

---

## Common Scenarios

### Broker OM — Fast Screen
User pastes or summarizes broker deal. Napkin runs on stated income (with haircut warning)
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
