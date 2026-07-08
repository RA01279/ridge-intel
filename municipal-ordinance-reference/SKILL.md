---
name: municipal-ordinance-reference
description: >
  MUNICIPAL ORDINANCE REFERENCE is RIDGE's jurisdiction-specific outdoor storage regulation
  guide for Dalfen Industrial's Industrial Outdoor Storage acquisitions in Dallas-Fort Worth
  and Houston. Use this skill ANY TIME a deal needs jurisdiction-specific screening, paving,
  setback, or fencing requirements for outdoor storage use, or Houston deed-restriction
  search guidance. Trigger on: "what does [suburb] require for outdoor storage", "check the
  ordinance for this city", "does this require paving", "screening requirements for IOS",
  "how do I search deed restrictions in Houston", "municipal ordinance reference", "what are
  the setback rules here", or any request for jurisdiction-specific IOS regulatory
  requirements. Always load this skill when a specific DFW suburb or Houston-area
  jurisdiction needs to be researched for outdoor storage requirements.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. Municipal Ordinance Reference applies: every jurisdiction-specific claim must cite the specific ordinance section, and every entry must be dated with a "confirmed as of" note since municipal ordinances change.

# MUNICIPAL ORDINANCE REFERENCE — Jurisdiction-Specific IOS Regulatory Guide

## Identity

Municipal Ordinance Reference is RIDGE's lookup and research guide for the single fact
pattern that varies the most across Dalfen's target markets: **every DFW suburb regulates
outdoor storage differently, and Houston doesn't zone at all.** This skill exists so that
"is this a permitted use, and what conditions attach to it" has a jurisdiction-specific
answer, not a generic one.

This is a **reference and research-guidance skill**, not a static database. RIDGE does not
have a comprehensive pre-loaded ordinance library for every DFW suburb — this skill's job
is to structure how to research a given jurisdiction quickly and consistently, and to hold
verified findings once they've actually been researched for a specific deal.

---

## Why This Exists

Dallas-Fort Worth is not one zoning jurisdiction — it's dozens of incorporated
municipalities, each with its own zoning ordinance, its own outdoor storage / outdoor
display use table entry (if any), and its own screening/paving/setback conditions. A rule
that applies in Arlington may not apply in Grand Prairie three miles away. Houston, by
contrast, has no zoning at all — the City relies on deed restrictions, and unincorporated
Harris County has its own separate regulatory regime. Treating "DFW" or "Houston" as a
single regulatory environment is a guaranteed diligence miss.

---

## Research Framework — DFW Suburbs

For any specific DFW municipality, research and record:

| Field | What to Find |
|---|---|
| Zoning district(s) allowing outdoor storage | Which industrial/commercial districts list outdoor storage as a permitted or conditional use |
| By-right vs. SUP/CUP | Whether the specific district permits it outright or requires discretionary approval |
| Paving requirement | Many municipalities require full paving (concrete or asphalt) for any outdoor storage use — some allow all-weather surface (compacted gravel/caliche) for certain use types; confirm which applies |
| Screening / fencing requirement | Height and material requirements for perimeter fencing; landscaping/screening buffer requirements, especially adjacent to residential zoning |
| Setback requirements | Front, side, and rear yard setbacks specific to outdoor storage use — often larger than the base district's general setback |
| Height / stacking restrictions | Container stacking height limits, if any |
| Lighting requirements | Photometric/dark-sky requirements that affect security lighting design |
| Recent SUP approval or denial history | Search city council/planning commission agendas and minutes for outdoor storage SUP cases — establishes real-world approval likelihood beyond the ordinance text |

**Source hierarchy (in order of authority):**
1. The municipality's current zoning ordinance (municode.com or the city's own code library
   is the standard source — always confirm against the city's official published code, not
   a secondary summary)
2. Planning & zoning department direct contact — for interpretation questions the ordinance
   text doesn't resolve cleanly
3. Recent planning commission / council meeting minutes — for approval track record

**Always date-stamp findings:** "Confirmed as of [date] against [City] Zoning Ordinance
§[section]." Ordinances change; a finding from 18 months ago should be re-verified, not
assumed current.

---

## Research Framework — Houston / Harris County

Houston has no zoning. The research framework is fundamentally different:

| Field | What to Find |
|---|---|
| Deed restrictions / restrictive covenants | Search the subdivision plat and recorded deed history at the Harris County Clerk's Real Property Records — look specifically for language restricting "outdoor storage," "industrial use," "unsightly conditions," or requiring "residential/commercial use only" |
| Deed restriction enforcement status | Some older restrictions have lapsed, been formally released, or are unenforced in practice — note whether the restriction is active and who holds enforcement rights (often a property/civic association) |
| Unincorporated Harris County regulations | Harris County has its own limited land-use regulations (not full zoning) that may apply outside city limits — check County Engineering / Permits Office requirements for outdoor storage, drainage, and detention |
| City of Houston Chapter 42 / infrastructure ordinances | Houston's development ordinance (Chapter 42) governs infrastructure, drainage, and platting requirements even without use-based zoning — relevant for detention and site development requirements |
| Floodplain regulations | Houston-area floodplain regulation (post-Harvey updates) is unusually strict — confirm current detention and finished-floor-elevation requirements with Harris County Flood Control District for any site in a mapped floodplain |

**Deed restriction search is the Houston equivalent of a zoning check and must be treated
with equal weight** — see `zoning-entitlement-screener/SKILL.md` Step 1, which flags this
as mandatory for every Houston site.

---

## How to Use This Skill on a Live Deal

1. Identify the specific jurisdiction (incorporated city, or unincorporated county) — never
   research at the "DFW" or "Houston metro" level.
2. Apply the appropriate research framework above.
3. Record findings with source citations and a confirmed-as-of date.
4. Feed findings directly into `zoning-entitlement-screener/SKILL.md`'s classification step
   and `site-metrics-calculator/SKILL.md`'s setback/paving deduction inputs.
5. If this is the first time a given jurisdiction has been researched, flag the output
   clearly as new research (not drawn from a pre-existing verified library) so the user
   knows to sanity-check it before relying on it for a time-sensitive LOI decision.

---

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MUNICIPAL ORDINANCE REFERENCE — [Jurisdiction]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JURISDICTION TYPE: [Incorporated DFW suburb / Houston — no zoning / Unincorporated Harris County]
CONFIRMED AS OF: [Date]

OUTDOOR STORAGE USE STATUS
  [By-right / SUP-CUP required / Prohibited / Deed-restriction-governed]
  Source: [Ordinance section or deed document citation]

SITE DEVELOPMENT CONDITIONS
  Paving requirement:     [Full paving / all-weather surface allowed / not specified]
  Screening/fencing:      [Height, material, buffer requirements]
  Setbacks:                [Front / side / rear, in feet]
  Stacking/height limits:  [If applicable]
  Lighting:                [If applicable]

APPROVAL TRACK RECORD (if SUP/CUP jurisdiction)
  [Recent approvals/denials found, with dates and case summary]

[HOUSTON ONLY] DEED RESTRICTION FINDINGS
  [Restriction found / not found / search not yet performed]
  Enforcement holder:      [Name, if applicable]
  Status:                  [Active / lapsed / released]

RISK FLAGS
  [Anything unconfirmed or requiring counsel/title company follow-up]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## RIDGE Integration Notes

- Primary supporting reference for `zoning-entitlement-screener/SKILL.md` — that skill
  renders the pass/fail verdict; this skill supplies the jurisdiction-specific facts behind it.
- Supplies setback and paving inputs to `site-metrics-calculator/SKILL.md`'s usable-acreage
  deduction math.
- Feeds `scout/SKILL.md`'s zoning/deed-restriction compatibility signal in the sourcing
  scoring model — a jurisdiction with a known-favorable ordinance and approval history is a
  stronger sourcing signal than one with an unresearched or hostile track record.
- This skill's findings should be retained and reused across deals in the same
  jurisdiction — do not re-research a municipality's base ordinance from scratch every time
  if a recent (confirmed-as-of) finding already exists, but do re-verify before relying on
  a stale finding for a time-sensitive decision.

---

## Behavioral Rules

1. **Never generalize across jurisdictions.** "DFW allows outdoor storage" is not a valid
   finding — every claim is jurisdiction-specific.
2. **Always cite the ordinance section or deed document.** No claim survives without a
   source.
3. **Date-stamp every finding.** Ordinances and deed restriction enforcement status change;
   an undated finding is not usable for a live decision.
4. **Houston gets the deed restriction framework, not the zoning framework.** Do not apply
   DFW-style zoning research logic to a Houston site.
5. **Flag first-time research as first-time research.** If this jurisdiction hasn't been
   verified before, say so — don't present new research with the same confidence as a
   previously-verified, re-confirmed finding.
