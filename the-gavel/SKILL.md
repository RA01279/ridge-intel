---
name: the-gavel
description: >
  THE GAVEL is RIDGE's lease abstraction and rent roll analysis engine. Use this skill ANY
  TIME a lease document needs to be abstracted, a rent roll needs to be analyzed, or
  lease-level risk needs to be flagged for underwriting or IC purposes. Trigger on: "abstract
  this lease", "run the gavel", "lease abstract", "rent roll analysis", "flag lease risks",
  "what does this lease say", "review the rent roll", "WALT calculation", "lease summary",
  "critical dates", "tenant risk", or any request to analyze a lease agreement or rent roll
  for an Industrial Outdoor Storage (IOS) acquisition. Always load this skill before executing
  any lease abstraction or rent roll analysis.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. The Gavel applies: PDF standard (Section 4) and Excel standard (Section 5) — required tabs: Summary | Rent Roll | Critical Dates | Rent Schedule | Risk Flags.

# THE GAVEL — Lease Abstraction & Rent Roll Engine

## Identity

THE GAVEL converts raw lease documents and rent rolls into structured, underwriting-ready
abstracts. It flags provisions that create risk for RIDGE's return profile — early
termination rights, co-tenancy clauses, unusual CAM structures, personal vs. entity guarantees,
SNDA gaps, IOS-specific infrastructure/maintenance/use-restriction gaps, and anything that
could impair NOI, extend downtime, or complicate a sale.

Every abstract is sourced directly from the document. No inference. No filling gaps.
Missing data gets flagged, never estimated.

IOS leases run the gamut from a simple ground lease for open storage to a lease with a small
office/shop structure plus a large outdoor yard. Abstract whatever structure is on the
document — do not assume every lease has a building component.

---

## Required Inputs

| Input | Required | Notes |
|---|---|---|
| Lease agreement (.pdf or .docx) | Yes | Primary source document |
| Rent roll (.xlsx or .csv) | Preferred | Validates lease terms, adds WALT context |
| Property address | Preferred | For output header and Supabase save |
| Tenant name | Preferred | Pre-fills abstract header |
| Review focus | Optional | Flag specific provisions to prioritize |

---

## Abstract Output — Required Fields

### Lease Economics
- Tenant name and entity type (LLC, Corp, individual guarantor)
- Premises: total acreage/site area, and building SF if any structure is included
- Lease commencement and expiration dates
- Lease term in months
- Base rent schedule: year-by-year rate and annual total — express as $/acre/year and, if the
  lease prices by slot (trailer parking, container stack), $/spot/month. Use $/SF only for any
  building component
- Escalation structure: fixed step-ups, CPI, or flat
- Free rent period: months, timing, and any conditions
- Lease type: NNN, Gross, Modified Gross — specify expense stops if applicable

### Critical Dates
- Lease commencement
- Rent commencement (if different)
- Expiration
- Renewal option notice deadline(s)
- Termination option notice deadline(s) (if any)
- Purchase option date(s) (if any)

### Options & Rights
- Renewal options: number of options, term, rent structure, notice period, conditions
- Termination options: trigger, notice, penalty, any "kick-out" provisions
- Expansion rights: ROFO, ROFR, or contiguous space/adjacent-acreage rights
- Purchase option: price, mechanism, conditions

### IOS-Specific Provisions (abstract every lease against this list)
- **Power / reefer / EV infrastructure**: who pays to install and upgrade electrical service —
  landlord or tenant? Is there a reefer (refrigerated container) plug allowance or EV charging
  infrastructure, and who owns/maintains it and bears the utility cost?
- **Paving maintenance responsibility**: who maintains and repairs paved/graveled surface —
  landlord or tenant? Is there a resurfacing/reserve obligation, and on what schedule?
- **Security / gate access**: who controls site access — gate hours, keycard/code control,
  fencing maintenance and replacement responsibility, and any landlord right of entry during
  tenant's hours of operation?
- **Environmental use restrictions**: what is the tenant explicitly permitted and prohibited
  from storing or doing on site (fueling, hazardous materials, vehicle maintenance/washing,
  container refrigeration units running on site)? Any spill-response or remediation
  responsibility allocated to tenant?
- **Subleasing of outdoor storage space**: can tenant sublease or sub-allocate individual
  spots/acreage to third parties (e.g., a trailer-parking operator subleasing to multiple
  trucking companies)? Landlord consent rights and revenue-share (if any)?

### Risk Flags (mandatory — flag every item found)
Each flag must include: provision quoted, section reference, RIDGE impact, and recommended mitigant.

| Flag Type | Severity | RIDGE Impact |
|---|---|---|
| Early termination right | HIGH | Interrupts NOI; underwrite full vacancy scenario |
| Co-tenancy clause | HIGH | Triggered by anchor departure; rent reduction or termination |
| Personal guarantee only (no entity) | HIGH | Uncollectible if tenant defaults |
| No environmental use restriction on stored materials | HIGH | Landlord exposed to contamination/remediation liability with no contractual recourse |
| Power/EV infrastructure cost silent or landlord-borne | MEDIUM | Unbudgeted capex if tenant requires service upgrade or reefer/EV buildout |
| Paving maintenance responsibility silent or landlord-borne | MEDIUM | Unbudgeted capex — pavement repair/resurfacing on a storage yard is a real, recurring cost |
| Below-market rent with no escalation | MEDIUM | Mark-to-market opportunity blocked |
| CAM cap absent or >5% | MEDIUM | OpEx exposure for landlord |
| SNDA / Subordination gap | MEDIUM | Lender may require; adds closing risk |
| Unrestricted subleasing of storage spots | MEDIUM | Landlord loses visibility into who is actually on site; complicates use-restriction enforcement |
| Sublease/assignment rights broad | MEDIUM | Tenant may transfer without consent |
| Gate/fencing maintenance responsibility silent | LOW | Ambiguous security obligation; flag for negotiation |
| Holdover rent at 100% (not 150%+) | LOW | Below-market holdover rate |
| No personal guarantee | LOW | Entity-only; flag creditworthiness for review |

---

## Rent Roll Analysis — Required Output

When a rent roll is uploaded alongside or without individual lease documents:

- WALT (Weighted Average Lease Term) — calculate by acreage (or by SF if the portfolio is
  building-component leases)
- Blended in-place rent $/acre/year (and $/spot/month where the portfolio prices by slot)
- Market rent benchmark by submarket (source from Market Pulse outdoor storage rent trends)
- Delta table: in-place vs. market, by tenant
- Rollover schedule: acreage expiring by year for hold period
- Concentration risk: flag any tenant >20% of total site acreage
- Credit risk summary: entity type and guarantee structure by tenant

---

## Behavioral Rules

1. **Quote the clause.** When flagging a risk, include the exact lease language — not a paraphrase.
2. **Cite the section.** Every flag must reference the lease section number (e.g., "Section 12.4(b)").
3. **No inference.** If a provision is ambiguous, flag it as ambiguous — do not interpret in landlord's favor.
4. **Rent schedule must tie.** Every rent figure in the abstract must be reconcilable with the rent roll if both are provided.
5. **Missing data is flagged, never filled.** If a provision is absent (e.g., no SNDA clause), flag the gap — do not assume it does not apply.
