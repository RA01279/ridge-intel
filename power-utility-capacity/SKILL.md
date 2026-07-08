---
name: power-utility-capacity
description: >
  POWER & UTILITY CAPACITY is RIDGE's site infrastructure diligence module for Dalfen
  Industrial's Industrial Outdoor Storage acquisitions. Use this skill ANY TIME a site's
  electrical service, utility capacity, or interconnection timeline needs to be assessed —
  particularly for equipment maintenance/rental yards, reefer trailer parking, or any user
  requiring 3-phase power or future EV charging infrastructure. Trigger on: "check power
  capacity for this site", "what's the electrical service here", "run the power capacity
  module", "is there 3-phase power", "reefer plug capacity", "utility interconnection
  timeline", "EV charging feasibility", or any request to assess a site's power or utility
  infrastructure ahead of acquisition or LOI. Always load this skill before confirming a
  site's power capacity is adequate for its intended IOS use.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Power & Utility Capacity applies: PDF standard (Section 4) and structured-output formatting — service specs presented as a clean KV table, never prose paragraphs.

# POWER & UTILITY CAPACITY — Site Infrastructure Diligence Module

## Identity

Power & Utility Capacity confirms what electrical and utility infrastructure exists on a
site today, what it would take to add capacity, and how long that takes — before RIDGE
underwrites a use case that depends on it.

This matters disproportionately for IOS relative to a typical building acquisition: many
target users (equipment maintenance/rental yards, reefer trailer parking, truck terminals
adding EV fleet charging) have real power requirements on a site that historically had
minimal or no service. Getting this wrong turns a clean acquisition into a stalled lease-up.

---

## Required Inputs

| Input | Required | Notes |
|---|---|---|
| Site address | Yes | |
| Existing structures on site (if any) | Preferred | Shop building, office trailer, none |
| Intended target-user category | Yes | Drives which power requirements matter — see Load Profile by User Category |
| Utility provider serving the area | Preferred | Identify from address if not known |
| Existing service info (if known) | Preferred | Meter data, panel size, transformer nameplate |

---

## Assessment Sequence

### Step 1 — Confirm Existing Service Type and Capacity
- **Service type:** None (raw land) / Single-phase / 3-phase
- **Transformer capacity:** Nameplate kVA rating if a transformer is already on site or
  serving an adjacent parcel from the same utility infrastructure
- **Panel / service size:** Amperage if a panel exists (from a prior structure or partial
  build-out)
- **Voltage:** 120/240V single-phase vs. 208V/480V 3-phase — confirm which, do not assume

If no service exists on site, note the nearest point of utility infrastructure (pole,
pad-mount transformer, or line) and the approximate distance — this drives extension cost
and timeline in Step 3.

### Step 2 — Match Capacity to Load Profile by Target-User Category

| Target-User Category | Typical Power Need | Notes |
|---|---|---|
| Trailer parking (dry van) | Minimal — lighting, gate, security only | Single-phase adequate |
| Trailer parking (reefer) | **Material** — reefer plug-in stations draw continuous load per spot | Estimate: confirm plug count needed × per-unit draw with user; do not guess a default |
| Container storage | Minimal — lighting, gate, security | Single-phase adequate |
| Contractor & material yards | Light — shop/office power, occasional equipment charging | Single-phase typically adequate; confirm if welding/compressor equipment present |
| Equipment maintenance & rental yards | **Material** — shop equipment, lifts, compressors, EV equipment charging | 3-phase typically required |
| Truck terminals | Moderate to material — lighting, gate, fueling infrastructure; **material if adding EV fleet charging** | 3-phase required if EV charging is part of the use case |
| Auto/bus storage fleets | Light to moderate — lighting, security; **material if EV fleet** | Confirm fleet electrification plans with the user before assuming light load |

**Never assume "IOS = no power needed."** The gate is building coverage and permitted use,
not power — several of Dalfen's target-user categories carry real electrical requirements
that must be confirmed use-case by use-case.

### Step 3 — Utility Interconnection Queue Timeline
If additional capacity, a new transformer, or a service upgrade is required:
- Identify the serving utility (contact the specific utility for the jurisdiction — do not
  assume a single statewide provider; DFW and Houston are served by different utilities
  and territories vary by specific city)
- Request or estimate the interconnection queue timeline for the required upgrade —
  timelines vary significantly by utility and current grid capacity in the area; if not
  confirmed with the utility directly, flag as `[VERIFY — utility interconnection timeline
  not confirmed, estimate only]`
- Note any known transmission or substation capacity constraints in the submarket —
  cross-reference `market-pulse/SKILL.md` for submarket-level infrastructure signals if
  available

### Step 4 — Cost and Timeline Summary
- Estimated cost range for required upgrade (service extension, transformer upgrade,
  panel upgrade) — flag as `[VERIFY — contractor quote not yet obtained]` if not sourced
  from an actual quote
- Estimated total timeline from request to energization
- Who bears the cost — under the LOI Generator's Power Capacity contingency
  (`loi-generator/SKILL.md`), this diligence item is buyer-side and closing-contingent;
  note whether cost responsibility has been negotiated differently for this specific deal

---

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POWER & UTILITY CAPACITY — [Site Address]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXISTING SERVICE
  Service type:        [None / Single-phase / 3-phase]
  Voltage:              [120/240V / 208V / 480V]
  Transformer capacity:  [X kVA, or "none on site"]
  Panel size:            [X amps, or "none on site"]
  Serving utility:       [Provider name]

TARGET-USER LOAD PROFILE
  Intended use:          [Category]
  Load classification:   [Minimal / Light / Moderate / Material]
  Specific requirements: [Reefer plug count, EV charger count, shop equipment, etc.]

CAPACITY ASSESSMENT
  Adequate as-is:        [Yes / No / Partial]
  Upgrade required:      [Description — new transformer, panel upgrade, service extension]

INTERCONNECTION TIMELINE
  Estimated timeline:    [X–Y weeks/months, or VERIFY flag]
  Known constraints:     [Substation/transmission capacity notes, if any]

COST ESTIMATE
  Estimated range:       [$X–$Y, or VERIFY flag — quote not obtained]
  Cost responsibility:   [Per LOI Power Capacity contingency — buyer confirms pre-closing]

RISK FLAGS
  [Numbered list — severity + mitigant]

RECOMMENDATION
  [Proceed / condition LOI on power capacity contingency / obtain utility quote before
  underwriting the target-user category assumed]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## RIDGE Integration Notes

- Directly supports the Power Capacity contingency in `loi-generator/SKILL.md` — this
  module is the diligence work product behind that LOI clause.
- A "Material" load classification with no confirmed adequate service should surface as a
  HIGH risk flag in `cre-legal-reviewer/SKILL.md`'s IOS-Specific Watch Items and in the
  Risk Matrix slide of `acq-investment-report/SKILL.md`.
- Feeds `dd-tracker/SKILL.md`'s physical & site diligence category as a required checklist
  item for any deal where the target-user profile carries a material power requirement.

---

## Behavioral Rules

1. **Never assume "no power needed" for IOS.** Confirm the specific target-user category's
   load profile before making that assumption.
2. **Distinguish confirmed data from estimates.** A transformer nameplate rating read off
   equipment on site is confirmed; a load estimate for a reefer count the user hasn't
   specified yet is not — flag it.
3. **Utility timelines are jurisdiction- and utility-specific.** Never state a generic
   national average interconnection timeline as if it applies here.
4. **Cost estimates without a quote are estimates.** Say so explicitly.
5. **Reefer and EV loads are the two most commonly underestimated requirements in IOS
   power planning.** Ask specifically about both if the target-user category could involve
   either.
