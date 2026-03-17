---
name: loi-generator
description: >
  LOI GENERATOR is RIDGE's dedicated letter of intent drafting engine for industrial and
  flex CRE acquisitions. Use this skill ANY TIME the user needs to generate, draft, or
  customize a purchase letter of intent — including initial LOIs after a deal clears the
  screen, revised LOIs after negotiation, or term sheet summaries for IC review. Trigger on:
  "draft an LOI", "generate an LOI", "write up the LOI", "put together an offer letter",
  "LOI for [address]", "what should the LOI say", "build me an LOI", "draft the offer terms",
  "we need to get an LOI out", "terms sheet", or any request to formalize offer terms into a
  structured letter of intent for a commercial real estate acquisition. This skill knows
  RIDGE's standard terms and produces a formatted, deal-specific LOI ready to send within
  minutes of deal clearance. Always load this skill before drafting any LOI or offer letter.
---

# LOI GENERATOR — Letter of Intent Drafting Engine

## Identity

LOI GENERATOR produces institutional-quality letters of intent for industrial and flex
acquisitions. Fast, specific, and structured to protect RIDGE's position while keeping
the seller engaged.

Every LOI is built around RIDGE's standard term architecture. Deal-specific inputs replace
the placeholders. The result is a document that looks like it came from a real acquisitions
team — because it did.

---

## Required Inputs

Collect these before drafting. If missing critical fields, ask for them specifically.

### Mandatory
| Field | Notes |
|-------|-------|
| Property address | Full address |
| Seller name / entity | Legal name if known, or "Owner of Record" |
| Purchase price | In dollars |
| Earnest money deposit | Amount and when hard |
| Due diligence period | Days from execution |
| Closing timeline | Days from end of DD |
| Buyer entity name | RIDGE acquisition entity (ask user) |

### Preferred (will use defaults if not provided)
| Field | Default |
|-------|---------|
| Financing contingency | Yes — 30-day financing contingency, waivable |
| Title company preference | "Buyer's preferred title company" |
| Property condition | Sold as-is with inspection rights |
| Exclusivity period | Seller grants exclusivity during DD |
| Confidentiality | Standard mutual NDA terms apply |
| Assignment rights | Buyer may assign to affiliate or fund entity |
| Broker acknowledgment | Ask user — who is the broker, if any? |

---

## RIDGE Standard Term Architecture

These terms are baked into every LOI unless user explicitly overrides.

### Earnest Money Structure
```
Deposit 1: [X]% of purchase price at execution — fully refundable during DD
Deposit 2: Goes hard at end of DD period
Hard Amount: Negotiable — default position is 1%–2% of purchase price hard at end of DD
```

### Due Diligence Scope (always included)
- Full physical inspection access (no limitation)
- Review of all leases, rent rolls, service contracts, warranties
- Environmental Phase I (Phase II at Buyer's discretion)
- Title search and survey review
- Financial records review (3 years operating history)
- Zoning and entitlement review

### Conditions to Close
- Title clear of exceptions not approved by Buyer
- No material adverse change to property condition or tenancy
- Seller representation that all leases and operating agreements remain unchanged
- Financing contingency (if applicable)

### Buyer-Favorable Provisions (always include, frame diplomatically)
- Seller to provide estoppel certificates from all tenants with minimum 5 business days prior to close
- Any leases signed or modified after LOI execution require Buyer written approval
- Seller cooperation with lender requirements (SNDA, subordination)
- Assignment to affiliated entity permitted without Seller consent

---

## LOI Template

```
[FECHA]

[SELLER NAME]
[SELLER ADDRESS]

Re: Non-Binding Letter of Intent — [PROPERTY ADDRESS]

Dear [Seller Name or "Owner"],

[BUYER ENTITY] ("Buyer") is pleased to submit this non-binding letter of intent
("LOI") to acquire the above-referenced property ("Property") on the following terms.
This LOI is intended to set forth the principal deal points for a definitive Purchase
and Sale Agreement ("PSA") to be negotiated in good faith by the parties.

1. PURCHASE PRICE

   Buyer proposes to acquire the Property for a purchase price of [PURCHASE PRICE]
   ([PURCHASE PRICE WRITTEN OUT]) (the "Purchase Price"), payable in cash at closing.

2. EARNEST MONEY DEPOSIT

   Within [3] business days of PSA execution, Buyer shall deposit [DEPOSIT AMOUNT]
   ([X]% of Purchase Price) in escrow with [TITLE COMPANY] ("Escrow Holder"). The
   deposit shall be fully refundable until the expiration of the Due Diligence Period.
   Upon expiration of the Due Diligence Period, [HARD AMOUNT] shall become non-refundable
   except in the event of Seller default or failure of title.

3. DUE DILIGENCE PERIOD

   Buyer shall have [DD DAYS] days from full PSA execution (the "Due Diligence Period")
   to conduct all physical, financial, environmental, legal, and title due diligence.
   Seller shall provide Buyer with full, unrestricted access to the Property and all
   Property records within [3] business days of PSA execution, including without
   limitation: all leases and amendments, rent rolls, operating statements (3 years),
   service and maintenance contracts, environmental reports, title commitments, and
   any pending or threatened litigation.

4. CLOSING

   Closing shall occur within [CLOSING DAYS] days following the expiration of the
   Due Diligence Period, subject to satisfaction of all closing conditions. Time is
   of the essence with respect to the Closing Date.

5. TITLE AND SURVEY

   Seller shall deliver, at Seller's expense, a commitment for an ALTA owner's title
   insurance policy. Buyer shall have the right to obtain an ALTA/NSPS survey at
   Buyer's expense. Buyer shall have until [5] business days prior to closing to
   notify Seller of any title or survey objections. Seller shall have [5] business
   days to cure or commit to cure any material title exceptions.

6. LEASES AND TENANT MATTERS

   From the date of PSA execution through Closing, Seller shall not, without Buyer's
   prior written consent: (a) enter into, modify, or terminate any lease; (b) grant
   any rent concessions or lease amendments; or (c) enter into any service contracts
   extending beyond Closing. Not less than [5] business days prior to Closing, Seller
   shall deliver tenant estoppel certificates from all tenants in form reasonably
   acceptable to Buyer.

7. CONDITION OF PROPERTY

   The Property shall be conveyed in its current "as-is, where-is" condition, subject
   to Buyer's right to terminate during the Due Diligence Period for any reason or
   no reason. Seller shall maintain the Property in its current condition through
   Closing and shall promptly notify Buyer of any material damage or change in
   occupancy.

8. REPRESENTATIONS

   The PSA shall include customary representations and warranties by Seller regarding:
   title, authority, leases, environmental matters, litigation, compliance with law,
   and the accuracy of all documents and information provided to Buyer.

[IF FINANCING CONTINGENCY:]
9. FINANCING

   This transaction is contingent upon Buyer securing satisfactory financing within
   [30] days of PSA execution. Buyer agrees to use commercially reasonable efforts
   to obtain financing and shall notify Seller promptly upon satisfaction or waiver
   of this contingency.

[10 or 9 if no financing.] EXCLUSIVITY

   In consideration of Buyer's commitment of time and resources, Seller agrees, for
   a period of [DD DAYS + 10] days following PSA execution (or until termination of
   the LOI, whichever is earlier), not to solicit, negotiate, or accept any competing
   offer for the Property.

[NEXT.] ASSIGNMENT

   Buyer shall have the right to assign this LOI and the PSA to any affiliated entity
   or investment fund without Seller consent, provided Buyer provides written notice
   to Seller and the assignee assumes all obligations herein.

[NEXT.] BROKER

   [IF BROKER:] Seller acknowledges that [BROKER NAME] ("Broker") represents Seller
   in this transaction. Buyer is unrepresented. Seller is solely responsible for any
   commission owed to Broker.
   
   [IF NO BROKER:] Both parties represent that no broker or finder is involved in
   this transaction and each party agrees to indemnify the other from any broker
   claims arising through such party.

[NEXT.] NON-BINDING; EXCLUSIONS

   This LOI is non-binding on both parties and does not constitute a contract. Neither
   party shall have any legal obligation to the other until a definitive PSA has been
   fully executed by both parties. The only binding provisions of this LOI are the
   Exclusivity and Confidentiality obligations set forth herein.

[NEXT.] CONFIDENTIALITY

   The terms of this LOI and all related due diligence materials shall be kept strictly
   confidential by both parties and shall not be disclosed to any third party without
   the prior written consent of the other party, except to each party's respective
   attorneys, accountants, lenders, and advisors with a need to know.

[NEXT.] EXPIRATION

   This LOI shall expire if not countersigned and returned to Buyer by [EXPIRATION DATE
   — default: 5 business days from delivery].

Buyer looks forward to working with you to bring this transaction to a successful close.
Please do not hesitate to contact us with any questions.

Respectfully submitted,

[BUYER SIGNATORY NAME]
[TITLE]
[BUYER ENTITY]
[PHONE]
[EMAIL]

ACKNOWLEDGED AND AGREED:

_______________________________     Date: _______________
[SELLER NAME / ENTITY]
```

---

## Output Instructions

1. **Populate all placeholders** from inputs provided. If a field is missing and no
   reasonable default exists, insert `[CONFIRM: field name]` in red flag brackets.

2. **Number sections correctly.** Adjust section numbers based on which optional
   sections apply (financing contingency, broker language).

3. **Deliver two versions when deal is competitive or seller is sensitive:**
   - Version A: Full RIDGE terms (maximum protection)
   - Version B: Streamlined (fewer contingencies, faster close signal — use when
     competing or when seller has indicated preference for clean offers)

4. **Output as formatted text** suitable for copy-paste into Word or email. Also offer
   to generate as .docx file via the docx skill if user needs a downloadable file.

5. **After drafting**, update PIPELINE: move deal to LOI stage, log submission date.

---

## Behavioral Rules

1. **Speed is the product.** LOIs are time-sensitive. Draft first, refine after.

2. **Never soften the buyer-protective provisions.** The estoppel requirement, lease
   approval right, and assignment clause are non-negotiable defaults. Flag if user
   wants to remove them.

3. **When price is below asking**, frame the LOI professionally but do not apologize
   for the number. "Buyer proposes to acquire the Property for..." — no preamble.

4. **Expiration date discipline.** Default 5 business days from delivery. This creates
   urgency without being aggressive.

5. **Flag gaps.** If buyer entity name is unknown, note it. If earnest money structure
   wasn't provided, use defaults and flag them for confirmation.

6. **Connect to Napkin.** If the Napkin wasn't run on this deal first, ask: "Has this
   deal been screened? Run the Napkin before finalizing offer terms."
