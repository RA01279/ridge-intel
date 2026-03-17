---
name: dd-tracker
description: >
  DD TRACKER is RIDGE's due diligence management and checklist engine for industrial and flex
  CRE acquisitions. Use this skill ANY TIME a deal has entered the due diligence phase and
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

# DD TRACKER — Due Diligence Management Engine

## Identity

DD TRACKER manages the 30–90 days between LOI execution and closing. It generates
the checklist, tracks completion, escalates at-risk items, and tells you exactly
what's standing between you and a funded deal.

DD TRACKER is calibrated for industrial and flex acquisitions. The checklist is not
generic — it knows what matters for this asset type.

---

## Required Inputs

| Input | Required | Notes |
|-------|----------|-------|
| Property address | Yes | Full address |
| Asset type | Yes | Industrial / Flex / Conversion |
| DD period length | Yes | Days from LOI execution |
| LOI execution date | Yes | Calendar start date |
| Single-tenant or multi-tenant | Preferred | Drives lease review scope |
| Value-add or stabilized | Preferred | Drives physical inspection scope |
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
🔴 [ ] Survey (ALTA/NSPS) ordered
       Owner: Buyer | Due: DD Day 7
🔴 [ ] Survey review — exceptions noted and cleared
       Owner: Buyer's Counsel | Due: DD Day 14
🔴 [ ] Title exceptions reviewed — approved or objected
       Owner: Buyer's Counsel | Due: DD Day 14
🟡 [ ] Zoning confirmation letter obtained
       Owner: Buyer | Due: DD Day 10
🟡 [ ] Certificate of occupancy(ies) confirmed on file
       Owner: Buyer | Due: DD Day 10
🟡 [ ] Confirm no pending special assessments or liens
       Owner: Buyer's Counsel | Due: DD Day 14
🟢 [ ] UCC search — confirm no fixtures/equipment liens
       Owner: Buyer's Counsel | Due: DD Day 14
🟢 [ ] Confirm no easement conflicts with intended use
       Owner: Buyer's Counsel | Due: DD Day 14

[IF VALUE-ADD / CONVERSION:]
🔴 [ ] Entitlement/rezoning feasibility confirmed
       Owner: Buyer | Due: DD Day 7
🟡 [ ] Building permit history reviewed (5-year lookback)
       Owner: Buyer | Due: DD Day 10

════════════════════════════════════════════════════════
CATEGORY 2 — PHYSICAL INSPECTION                        
════════════════════════════════════════════════════════
🔴 [ ] Property condition assessment (PCA) ordered
       Owner: Buyer | Due: DD Day 3 (order)
🔴 [ ] PCA completed and report received
       Owner: Inspector | Due: DD Day 14
🔴 [ ] PCA findings reviewed — major items flagged
       Owner: Buyer | Due: DD Day 17
🔴 [ ] Roof inspection report received
       Owner: Inspector | Due: DD Day 14
🟡 [ ] HVAC inspection (each unit / RTU documented)
       Owner: Inspector | Due: DD Day 14
🟡 [ ] Electrical capacity confirmed for tenant uses
       Owner: Inspector | Due: DD Day 14
🟡 [ ] Dock doors / levelers / drive-in doors inspected
       Owner: Inspector | Due: DD Day 14
       [Flag for industrial/flex — critical for tenant retention]
🟡 [ ] Clear height confirmed (actual vs. marketed)
       Owner: Buyer | Due: DD Day 7
       [Physical tape or survey — broker figures are often incorrect]
🟡 [ ] Truck court / parking confirmed (dimensions, striping)
       Owner: Buyer | Due: DD Day 7
🟡 [ ] Sprinkler system type and coverage confirmed
       Owner: Inspector | Due: DD Day 14
🟢 [ ] Plumbing inspection
       Owner: Inspector | Due: DD Day 14
🟢 [ ] Slab/foundation assessment
       Owner: Inspector | Due: DD Day 14
🟢 [ ] Lighting (type, age, condition) — LED conversion cost
       Owner: Inspector | Due: DD Day 14
🟢 [ ] Deferred maintenance estimate compiled
       Owner: Buyer | Due: DD Day 17

[IF VALUE-ADD / CONVERSION:]
🔴 [ ] Structural assessment for conversion feasibility
       Owner: Structural engineer | Due: DD Day 14
🟡 [ ] MEP feasibility assessment for conversion
       Owner: MEP engineer | Due: DD Day 14

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
🟡 [ ] Confirm no current USEPA/TCEQ/EPD enforcement actions
       Owner: Buyer's Counsel | Due: DD Day 14
🟢 [ ] Historical use review (Sanborn maps / records)
       Owner: Environmental consultant | Due: Included in Phase I
🟢 [ ] Underground storage tank (UST) status confirmed
       Owner: Environmental consultant | Due: DD Day 21

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

3. **Clear height and dock door inspection are non-negotiable.** Always include for
   industrial/flex. Broker-stated specs are unreliable — physical confirmation required.

4. **Phase II triggers automatically.** If any RECs are found in Phase I, immediately
   flag Phase II as Critical and required before DD expiration.

5. **Estoppels are a closing requirement, not a nice-to-have.** If estoppels are not
   in hand 5 days before closing, escalate immediately.

6. **Connect to The Gavel.** When leases are received in DD, trigger: "Ready to run
   The Gavel on these leases?"

7. **Connect to PIPELINE.** Update deal stage in PIPELINE as DD progresses.
   DD complete → move to IC stage automatically after checklist is 100%.
