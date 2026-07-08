---
name: dd-tracker
description: >
  DD TRACKER is RIDGE's due diligence management and checklist engine for Industrial Outdoor
  Storage (IOS) acquisitions. Use this skill ANY TIME a deal has entered the due diligence phase and
  needs a structured checklist, tracking system, or status report — including generating a
  full DD checklist from scratch, updating item completion status, identifying outstanding
  or at-risk items, managing DD period deadlines, producing a DD status report for IC or
  lender, or managing the transition from LOI execution to closing. Trigger on: "generate
  DD checklist", "DD tracker", "what's outstanding in due diligence", "DD status", "what do
  we still need", "track due diligence", "run the DD checklist", "LOI just executed need
  checklist", "DD items", "due diligence", "what's left before closing", "DD period",
  "outstanding items", or any time a deal is in the DD, IC, or Closing stage and needs
  structured tracking. Always load this skill before generating any DD checklist or
  managing due diligence workflow.
---

> **Output Standard:** Before generating any output, read and apply `output-standard/STANDARD.md` (repo root). All formatting, color, typography, and QA requirements defined there supersede any defaults in this skill. DD Tracker applies: PDF standard (Section 4) and Excel standard (Section 5).

# DD TRACKER — Due Diligence Management Engine

## Identity

DD TRACKER manages the 30–90 days between LOI execution and closing. It generates
the checklist, tracks completion, escalates at-risk items, and tells you exactly
what's standing between you and a funded deal.

DD TRACKER is calibrated for Industrial Outdoor Storage acquisitions. The checklist is not
generic — it knows what matters for land and yard assets, not buildings.

---

## Required Inputs

| Input | Required | Notes |
|-------|----------|-------|
| Property address | Yes | Full address |
| Transaction type | Yes | Single asset / Portfolio / Sale-leaseback / Land entitlement / Forward sale / Development for IOS use / Covered land play |
| DD period length | Yes | Days from LOI execution |
| LOI execution date | Yes | Calendar start date |
| Vacant or leased | Preferred | Drives lease review scope |
| Entitled (by-right) or SUP-required | Preferred | Drives Category 1 legal scope |
| Lender in deal | Preferred | Adds lender-specific requirements |
| Known issues from LOI / Napkin | Optional | Pre-populate flags |

---

## DD Checklist — Full Format

### Category Structure

DD TRACKER organizes items into 6 categories. Each item has:
- Status: `[ ] Open` / `[→] In Progress` / `[✓] Complete` / `[⚠️] At Risk` / `[✗] Waived`
- Owner: Buyer / Buyer's Counsel / Lender / Inspector / Title Company / Seller
- Due Date: Calculated from LOI execution date
- Risk Level: 🔴 Critical / 🟡 Important / 🟢 Standard

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DD TRACKER — [Property Address]
LOI Executed: [Date] | DD Expires: [Date] | Days Remaining: [N]
Closing Target: [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROGRESS: [N] of [Total] complete | [N] at risk | [N] open

════════════════════════════════════════════════════════
CATEGORY 1 — LEGAL & TITLE                              
════════════════════════════════════════════════════════
🔴 [ ] Title commitment received and reviewed
       Owner: Buyer's Counsel | Due: DD Day 5
🔴 [ ] Deed restriction search — confirm no restriction prohibits outdoor storage/industrial use
       Owner: Buyer's Counsel | Due: DD Day 7
       [Critical in Houston — no zoning; deed restrictions are the primary use control. Not
       an edge case: run this search on every deal, every market.]
🔴 [ ] Survey (ALTA/NSPS) ordered
       Owner: Buyer | Due: DD Day 7
🔴 [ ] Survey review — exceptions noted and cleared
       Owner: Buyer's Counsel | Due: DD Day 14
🔴 [ ] Title exceptions reviewed — approved or objected
       Owner: Buyer's Counsel | Due: DD Day 14
🔴 [ ] Zoning/permitted-use confirmation — IOS confirmed by-right, or SUP/CUP already approved
       Owner: Buyer | Due: DD Day 10
       [Houston: confirm via deed restrictions, not a zoning map — there is no zoning.]
🟡 [ ] Screening, paving, and setback ordinance confirmed for the specific municipality
       Owner: Buyer | Due: DD Day 10
🟡 [ ] Confirm no pending special assessments or liens
       Owner: Buyer's Counsel | Due: DD Day 14
🟡 [ ] Severed mineral estate and surface use restrictions checked
       Owner: Buyer's Counsel | Due: DD Day 14
🟢 [ ] UCC search — confirm no fixtures/equipment liens
       Owner: Buyer's Counsel | Due: DD Day 14
🟢 [ ] Confirm no easement conflicts with intended use (pipeline easements — check TxRRC GIS)
       Owner: Buyer's Counsel | Due: DD Day 14

[IF NOT BY-RIGHT / SUP OR ENTITLEMENT REQUIRED:]
🔴 [ ] SUP/CUP application path, timeline, and denial risk confirmed
       Owner: Buyer | Due: DD Day 7
🟡 [ ] Local land use counsel engaged
       Owner: Buyer's Counsel | Due: DD Day 10

════════════════════════════════════════════════════════
CATEGORY 2 — PHYSICAL & SITE DILIGENCE                   
════════════════════════════════════════════════════════
🔴 [ ] Geotechnical/soils report ordered
       Owner: Buyer | Due: DD Day 3 (order)
       [Expansive clay/subsidence risk elevated in Houston — do not skip.]
🔴 [ ] Pavement load-bearing capacity assessed
       Owner: Inspector | Due: DD Day 14
       [Confirm surface (asphalt/gravel/concrete) can bear trailer/container/truck loads —
       this is the core physical diligence item for IOS, equivalent to a PCA for a building.]
🔴 [ ] Usable acreage confirmed net of easements, detention, setbacks, floodway
       Owner: Buyer / Surveyor | Due: DD Day 14
🔴 [ ] FEMA flood zone check completed
       Owner: Buyer | Due: DD Day 7
       [Critical in Houston.]
🟡 [ ] Fencing and gate condition inspected — replacement cost estimated if needed
       Owner: Inspector | Due: DD Day 14
🟡 [ ] Truck turning radius / circulation adequacy confirmed
       Owner: Buyer | Due: DD Day 7
       [Physical walk or survey — broker-stated circulation is often optimistic.]
🟡 [ ] Drainage / detention adequacy confirmed for site use
       Owner: Inspector | Due: DD Day 14
🟡 [ ] Electrical service type and capacity confirmed (single vs. 3-phase), upgrade cost/timeline if needed
       Owner: Inspector | Due: DD Day 14
🟡 [ ] Water/sewer, stormwater, and telecom availability confirmed
       Owner: Buyer | Due: DD Day 10
🟢 [ ] Site lighting (type, age, condition, security coverage)
       Owner: Inspector | Due: DD Day 14
🟢 [ ] Deferred maintenance estimate compiled (pavement, fencing, drainage)
       Owner: Buyer | Due: DD Day 17

[IF ANY BUILDING/STRUCTURE ON SITE:]
🟡 [ ] Structure condition assessment (office/shop/maintenance building, if present)
       Owner: Inspector | Due: DD Day 14
🟢 [ ] Roof/HVAC/electrical spot-check on existing structure
       Owner: Inspector | Due: DD Day 14

[IF DEVELOPMENT FOR IOS USE:]
🔴 [ ] GC bids received for paving, fencing, lighting, drainage buildout
       Owner: Buyer | Due: DD Day 21
🟡 [ ] Permitting path and timeline confirmed
       Owner: Buyer | Due: DD Day 14

════════════════════════════════════════════════════════
CATEGORY 3 — ENVIRONMENTAL                              
════════════════════════════════════════════════════════
🔴 [ ] Phase I ESA ordered
       Owner: Buyer | Due: DD Day 3 (order)
🔴 [ ] Phase I ESA received and reviewed
       Owner: Environmental consultant | Due: DD Day 21
🔴 [ ] Phase I — RECs identified and assessed
       Owner: Buyer | Due: DD Day 24
[IF RECS FOUND:]
🔴 [ ] Phase II ordered (if RECs present)
       Owner: Buyer | Due: Immediately upon Phase I delivery
🔴 [ ] Phase II results received
       Owner: Environmental consultant | Due: Varies
🟡 [ ] Confirm no current USEPA/TCEQ enforcement actions
       Owner: Buyer's Counsel | Due: DD Day 14
🟡 [ ] TCEQ database checked for site-specific violations/history
       Owner: Environmental consultant | Due: DD Day 21
🟡 [ ] Underground storage tank (UST) history confirmed
       Owner: Environmental consultant | Due: DD Day 21
🟡 [ ] PCB check on any existing transformers on site
       Owner: Environmental consultant | Due: DD Day 21
       [Older pole-mount or pad-mount transformers can contain PCB-contaminated oil —
       confirm testing/manifest before assuming a clean site.]
🟢 [ ] Historical use review (Sanborn maps / historical aerials) — check for prior fuel,
       industrial, or landfill use
       Owner: Environmental consultant | Due: Included in Phase I

════════════════════════════════════════════════════════
CATEGORY 4 — FINANCIAL & LEASES                         
════════════════════════════════════════════════════════
🔴 [ ] All leases and amendments received from Seller
       Owner: Seller / Buyer's Counsel | Due: DD Day 3
🔴 [ ] Leases reviewed (The Gavel) — key terms abstracted
       Owner: Buyer / The Gavel | Due: DD Day 7
🔴 [ ] Rent roll verified against actual leases
       Owner: Buyer | Due: DD Day 7
🔴 [ ] 3-year operating statements received and reviewed
       Owner: Buyer | Due: DD Day 5
🔴 [ ] Year-to-date operating statement reviewed
       Owner: Buyer | Due: DD Day 5
🔴 [ ] Current and prior-year property tax bills confirmed
       Owner: Buyer | Due: DD Day 7
🟡 [ ] All service contracts / vendor agreements received
       Owner: Seller / Buyer | Due: DD Day 5
🟡 [ ] Service contracts reviewed — assignable? cancellable?
       Owner: Buyer's Counsel | Due: DD Day 10
🟡 [ ] CAM reconciliation reviewed (prior 2 years)
       Owner: Buyer | Due: DD Day 10
🟡 [ ] Security deposits held confirmed and documented
       Owner: Buyer | Due: DD Day 7
🟡 [ ] Outstanding TI or landlord obligations confirmed
       Owner: Buyer | Due: DD Day 7
🟡 [ ] Any rent abatements or concessions documented
       Owner: Buyer | Due: DD Day 7
🟡 [ ] Confirm no tenant default or pending litigation
       Owner: Buyer's Counsel | Due: DD Day 14
🟢 [ ] Utility history reviewed (landlord-paid items)
       Owner: Buyer | Due: DD Day 10
🟢 [ ] Insurance certificates from tenants on file
       Owner: Buyer | Due: DD Day 10

════════════════════════════════════════════════════════
CATEGORY 5 — LENDER REQUIREMENTS                        
════════════════════════════════════════════════════════
[INCLUDE ONLY IF LENDER IN DEAL]
🔴 [ ] Lender application submitted
       Owner: Buyer | Due: DD Day 5
🔴 [ ] Lender term sheet / commitment received
       Owner: Lender | Due: DD Day 20
🔴 [ ] Appraisal ordered by lender
       Owner: Lender | Due: DD Day 5
🔴 [ ] Appraisal received and value confirmed
       Owner: Lender | Due: DD Day 25
🔴 [ ] Loan docs received and reviewed by Buyer's Counsel
       Owner: Buyer's Counsel | Due: 5 days before closing
🟡 [ ] SNDA / estoppel from tenants (lender form)
       Owner: Buyer / Seller | Due: 7 days before closing
🟡 [ ] Property insurance binder delivered to lender
       Owner: Buyer | Due: 3 days before closing
🟢 [ ] Lender site inspection completed
       Owner: Lender | Due: DD Day 15

════════════════════════════════════════════════════════
CATEGORY 6 — CLOSING REQUIREMENTS                       
════════════════════════════════════════════════════════
🔴 [ ] PSA fully executed
       Owner: Both parties | Due: Concurrent with LOI countersign
🔴 [ ] Tenant estoppel certificates received (all tenants)
       Owner: Seller / Buyer | Due: 5 days before closing
🔴 [ ] Estoppels reviewed — consistent with leases
       Owner: Buyer's Counsel | Due: 3 days before closing
🔴 [ ] Prorations and closing cost estimates confirmed
       Owner: Title Company | Due: 3 days before closing
🔴 [ ] Funds wired to escrow
       Owner: Buyer | Due: 1 day before closing
🟡 [ ] Final walk-through completed
       Owner: Buyer | Due: 1 day before closing
🟡 [ ] Seller representations confirmed current
       Owner: Buyer's Counsel | Due: 3 days before closing
🟡 [ ] Keys / access codes / building files transferred
       Owner: Seller | Due: At closing
🟢 [ ] Tenant notification letters drafted
       Owner: Buyer | Due: At closing
🟢 [ ] Property management transition planned
       Owner: Buyer | Due: At closing
```

---

## Status Update Commands

### Mark Item Complete
**Trigger:** "mark [item] as done", "[item] is complete", "check off [item]"

Action: Update status to `[✓] Complete`. Note date completed.

### Flag At-Risk Item
**Trigger:** "flag [item]", "[item] is delayed", "[item] might be an issue"

Action: Update status to `[⚠️] At Risk`. Ask: "What's the issue and when do you
expect resolution?" Log the note.

### Generate Status Report
**Trigger:** "DD status report", "where are we in DD", "what's outstanding"

Output:
```
DD STATUS — [Address] | [N] days remaining
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Complete:    [N] items
→ In progress: [N] items
⚠️ At risk:    [N] items — [List]
[ ] Open:      [N] items

CRITICAL PATH (must complete before DD expires):
  1. [Item] — [Days remaining]
  2. [Item] — [Days remaining]
  3. [Item] — [Days remaining]

RECOMMENDED ACTIONS TODAY:
  • [Action 1]
  • [Action 2]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Behavioral Rules

1. **Generate the full checklist immediately** upon LOI execution — don't wait for user
   to ask what needs to happen.

2. **Flag the critical path.** On every status update, identify the 2–3 items that
   are on the critical path to closing. These get highlighted regardless of status.

3. **Pavement load-bearing capacity and truck circulation are non-negotiable.** Always
   include for IOS. Broker-stated acreage, coverage, and circulation figures are unreliable —
   physical/survey confirmation required.

4. **Phase II triggers automatically.** If any RECs are found in Phase I, immediately
   flag Phase II as Critical and required before DD expiration.

5. **Estoppels are a closing requirement, not a nice-to-have.** If estoppels are not
   in hand 5 days before closing, escalate immediately.

6. **Connect to The Gavel.** When leases are received in DD, trigger: "Ready to run
   The Gavel on these leases?"

7. **Connect to PIPELINE.** Update deal stage in PIPELINE as DD progresses.
   DD complete → move to IC stage automatically after checklist is 100%.
