---
name: site-metrics-calculator
description: >
  SITE METRICS CALCULATOR is RIDGE's site-area and building-coverage math engine for Dalfen
  Industrial's Industrial Outdoor Storage acquisitions. Use this skill ANY TIME a site's
  usable acreage, building coverage percentage, or implied capacity (trailer/container spot
  count) needs to be calculated. Trigger on: "calculate usable acreage", "what's the building
  coverage here", "run the site metrics calculator", "how many trailer spots fit on this
  site", "net usable acres", "does this clear the 30% coverage gate", "site capacity calc",
  or any request to compute site-area math for an IOS site. Always load this skill before
  stating a site's building coverage % or usable acreage as a confirmed number.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Site Metrics Calculator applies: Excel standard (Section 5) for the calculation worksheet, and the Data Integrity Doctrine — never state a coverage percentage without showing the underlying arithmetic.

# SITE METRICS CALCULATOR — Site Area & Coverage Engine

## Identity

Site Metrics Calculator does one job precisely: turn a raw parcel size into the numbers
that actually determine whether a site clears RIDGE's Site & Use Gate Criteria and how much
usable IOS capacity it holds. It enforces the **building coverage below 30%** gate from
`RIDGE_SKILL.md` and computes usable acreage net of the site-area deductions that inflate a
gross parcel size beyond what's actually usable for outdoor storage.

This is arithmetic, not judgment — every output must show its formula, not just a result.

---

## Required Inputs

| Input | Required | Notes |
|---|---|---|
| Gross parcel acreage | Yes | From survey, county appraisal district, or plat |
| Existing building footprint (SF) | Yes (or "0" if vacant) | Confirms the 30% coverage gate |
| Easements (acreage or SF) | Preferred | Utility, access, drainage — reduces usable area |
| Floodway / floodplain area (acreage or SF) | Preferred | FEMA flood zone designation; floodway is typically unusable, floodplain may be usable with conditions — treat separately |
| Detention pond area (acreage or SF), existing or required | Preferred | Existing detention reduces usable area now; required-but-not-built detention reduces future usable area — flag which case applies |
| Setback requirements (front/side/rear, in feet) | Preferred | From `municipal-ordinance-reference/SKILL.md` or zoning screener output |
| Target-user site configuration (paving type, spot size assumption) | Preferred | Drives implied spot-count capacity calc |

---

## Calculation Sequence

### Step 1 — Building Coverage % (Gate Check)
```
Building Coverage % = Existing Building Footprint (SF) / Gross Parcel Area (SF)
Gross Parcel Area (SF) = Gross Parcel Acreage × 43,560
```
Compare to the 30% gate from `RIDGE_SKILL.md`. State the result as PASS (below 30%) or
FAIL (30% or above) — never round in the direction that turns a FAIL into a PASS.

### Step 2 — Net Usable Acreage
Start from gross acreage and subtract, in order, every confirmed deduction:

```
Net Usable Acreage = Gross Acreage
                      − Existing Building Footprint (converted to acres)
                      − Easements (acreage)
                      − Floodway Acreage (unusable — full deduction)
                      − Existing Detention Pond Acreage (if already built)
                      − Setback Acreage (perimeter area lost to required setbacks —
                        estimate using parcel dimensions × setback depth, do not assume
                        a flat percentage without doing the geometry)
```

Floodplain (as distinct from floodway) is not automatically deducted — note it as a
separate line item with a flag: usable acreage in a mapped floodplain may require
additional site work (fill, drainage design) and should be flagged rather than silently
included at full value.

If required-but-not-yet-built detention is anticipated (common on a raw or partially
developed site), show it as a separate forward-looking deduction — **"Net Usable Acreage
(Current)"** vs. **"Net Usable Acreage (Post-Development, net of anticipated detention)"** —
never conflate the two numbers.

### Step 3 — Implied Site Capacity (Spot Count)
For paved/parking-configured target-user categories (trailer parking, container storage,
truck terminal parking), estimate implied spot count:

```
Implied Spot Count = (Net Usable Acreage × 43,560 × Site Efficiency Factor) / Spot Size (SF)
```

- **Spot Size (SF):** varies by category — a standard 53' trailer spot with drive aisle
  is materially larger than a container ground-storage slot. Ask the user for the specific
  assumption or use a stated industry-standard figure with the source noted; never present
  an unstated default as if it were confirmed.
- **Site Efficiency Factor:** accounts for internal circulation, gate/guard areas, and
  non-storage site infrastructure — typically 0.70–0.85 of net usable area is actually
  storage-productive, but this varies by site geometry and should be stated as an
  assumption, not a fact, unless confirmed against an actual site plan.

### Step 4 — Show the Work
Every output must include a visible arithmetic trail — this is the single most important
behavioral rule for this skill. A user reviewing the output should be able to re-derive
every number from the inputs shown.

---

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SITE METRICS CALCULATOR — [Site Address]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUILDING COVERAGE GATE CHECK
  Gross parcel:          [X.XX] acres ([X,XXX] SF)
  Building footprint:    [X,XXX] SF
  Coverage %:            [XX.X]%  →  [PASS <30% / FAIL ≥30%]

NET USABLE ACREAGE
  Gross acreage:                    [X.XX] ac
  − Building footprint:             [X.XX] ac
  − Easements:                      [X.XX] ac
  − Floodway (unusable):            [X.XX] ac
  − Existing detention:             [X.XX] ac
  − Setback area (estimated):       [X.XX] ac
  = Net Usable Acreage (Current):   [X.XX] ac
  [If applicable] − Anticipated future detention: [X.XX] ac
  = Net Usable Acreage (Post-Dev):  [X.XX] ac

  Floodplain note (not deducted, flagged): [X.XX] ac in mapped floodplain — [assumption/flag]

IMPLIED SITE CAPACITY (if paved/parking use)
  Target-user category:   [Category]
  Spot size assumption:   [X] SF [source/basis]
  Site efficiency factor: [X.XX] [source/basis]
  Implied spot count:     [N] spots

RISK FLAGS
  [Any input marked estimated rather than confirmed — list explicitly]

RECOMMENDATION
  [Gate status and what remains unconfirmed before this can be treated as final]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## RIDGE Integration Notes

- This is the calculation engine behind the Site & Use Gate Criteria's building coverage
  check in `RIDGE_SKILL.md` — no deal should be treated as passing that gate without this
  calculator's output.
- Feeds `lens/SKILL.md` and `napkin/SKILL.md`'s land-basis underwriting — price per acre
  should be computed against net usable acreage, not gross acreage, when the two differ
  materially.
- Feeds the Land-Basis / Acre Economics slide in `acq-investment-report/SKILL.md`.
- Cross-references `municipal-ordinance-reference/SKILL.md` for jurisdiction-specific
  setback and paving requirements that affect the deduction math.

---

## Behavioral Rules

1. **Always show the arithmetic.** Never state a coverage % or usable acreage figure
   without the underlying formula and inputs visible in the output.
2. **Distinguish confirmed inputs from assumptions.** A survey-sourced gross acreage is
   confirmed; an estimated setback deduction based on typical dimensions is an assumption —
   label it as such.
3. **Never round a FAIL into a PASS.** 30.0% coverage is a FAIL against a "below 30%" gate;
   state it plainly.
4. **Separate current vs. post-development usable acreage** whenever anticipated future
   detention or site work would change the number — never blend the two into one figure.
5. **Floodway and floodplain are not the same thing.** Deduct floodway in full; flag
   floodplain separately rather than either deducting it automatically or ignoring it.
