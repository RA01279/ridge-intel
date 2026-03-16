---
name: pipeline
description: >
  PIPELINE is RIDGE's central deal CRM and kanban tracker. Use this skill whenever the user
  wants to view, manage, or update their active acquisition pipeline — including adding new
  deals, advancing stage, logging notes, generating pipeline reports, or reviewing deal status.
  Trigger on: "pipeline", "show my pipeline", "add deal", "log deal", "new deal", "move to LOI",
  "pipeline report", "deal status", "what's in the pipeline", "where are we on [deal]", or any
  request to track, organize, or review CRE acquisition deals in progress. PIPELINE is the
  central hub — all other RIDGE skills log back into it. SCOUT adds deals to Watch stage,
  NAPKIN logs screen results to Notes, LOI GENERATOR advances deals to LOI stage, DD TRACKER
  activates at DD stage, DEBT TOOL logs capital stack to Notes, and CANVAS PANEL attaches
  tenant lists to deals. Always load this skill when managing deal flow.
---

# PIPELINE — Deal CRM & Kanban Tracker

## Identity

PIPELINE is RIDGE's central deal management hub. Every acquisition opportunity that enters
the RIDGE system lives here — from the first signal to close or pass. PIPELINE does not
underwrite; it tracks, organizes, and keeps the full deal flow visible at all times.

**Behavioral standards:**
- On activation with no specific command: display current pipeline as a table sorted by conviction level (High Conviction first), then by days in current stage (longest first)
- Opinionated about stale deals — flag anything sitting in a stage for more than 30 days without a note update
- One source of truth — every other RIDGE module logs back here
- Never lose a deal — every pass gets a reason, every hold gets a trigger condition
- DD TRACKER and DEAL MEMORY are embedded modules — they operate within PIPELINE, not as separate tabs

---

## Pipeline Stages

| Stage | Description | Typical Duration |
|---|---|---|
| **Watch** | Signal identified, not yet actioned | Ongoing — revisit each session |
| **Active** | Under active pursuit — outreach initiated or in progress | 2–8 weeks |
| **LOI** | Letter of Intent drafted or submitted | 1–3 weeks |
| **DD** | Due diligence period active — DD TRACKER module engaged | 15–45 days |
| **Under Contract** | PSA executed, closing scheduled | Per contract timeline |
| **Closed** | Transaction completed — archived to session memory | Final |
| **Pass** | Removed from active pursuit — reason and date logged | Final |

Stage progression is logged with a timestamp every time a deal advances. Days in current
stage is always calculated and displayed in pipeline reports.

---

## Deal Record Schema

Every deal in PIPELINE carries the following fields:

| Field | Description |
|---|---|
| **Property Name** | Colloquial name or working title for the deal |
| **Address** | Full street address |
| **Market** | Primary market (Atlanta / Savannah / DFW / Houston / Austin) |
| **Submarket** | Specific submarket within the market |
| **Asset Type** | Industrial / Flex Industrial / Single-Story Office Conversion |
| **SF** | Estimated or confirmed square footage |
| **Asking Price** | Seller's ask (if known) or RIDGE price ceiling |
| **Owner Entity** | Confirmed or estimated ownership entity name |
| **Deal Source** | How the deal entered the pipeline (SCOUT / NAPKIN / broker / direct outreach / other) |
| **Conviction Level** | High Conviction / Needs More Data / Watch List |
| **Current Stage** | Current kanban stage (Watch → Active → LOI → DD → Under Contract → Closed / Pass) |
| **Stage Date** | Date entered current stage |
| **Days in Stage** | Calculated: today minus stage date |
| **Notes** | Freeform notes log — appended, never overwritten. Timestamped entries. |
| **Attachments** | Links to related outputs: NAPKIN screen, LOI draft, DD checklist, CANVAS tenant list, capital stack |

---

## On Activation — Default Display

When PIPELINE activates with no specific command, immediately output the full pipeline table:

```
PIPELINE — RIDGE Deal CRM
[Date] · [N] deals active · [N] High Conviction · [N] Needs More Data · [N] Watch

| # | Property | Market | Asset Type | SF | Ask | Stage | Days | Conviction |
|---|----------|--------|------------|-----|-----|-------|------|------------|
[sorted: High Conviction first, then longest days in stage]
```

After the table, flag any stale deals (>30 days in stage with no note update) and any
deals with missing critical fields (address, SF, conviction level).

If pipeline is empty, present the intake form and offer to add the first deal.

---

## Commands

### `add deal` / `new deal` / `log deal`

Launch the deal intake form — collect in sequence, one field per prompt:

1. Property name or working title
2. Address
3. Market (offer list: Atlanta / Savannah / DFW / Houston / Austin / Other)
4. Submarket (freeform)
5. Asset type (Industrial / Flex Industrial / Office Conversion)
6. Estimated SF
7. Asking price or "unknown"
8. Owner entity (if known, or "unknown")
9. Deal source (SCOUT / NAPKIN / Broker / Direct / Other)
10. Conviction level (High Conviction / Needs More Data / Watch List)
11. Initial stage (default: Watch — confirm or change)
12. Opening notes (freeform — paste any context)

After intake, display the new deal record and ask: "Anything else to log before we continue?"

---

### `update [deal]`

Update any field on an existing deal. Identify the deal by name or address (partial match
is fine — confirm before updating). Present the current field value and ask for the new value.
Log the change as a timestamped note entry: `[DATE] Field updated: [field] → [new value]`

---

### `move [deal] to [stage]`

Advance a deal to a new stage. Steps:
1. Confirm the deal (by name or address)
2. Confirm the new stage
3. Log the stage change with today's date
4. Reset the days-in-stage counter
5. Add a timestamped note: `[DATE] Stage advanced: [old stage] → [new stage]`
6. If advancing to **DD**: activate DD TRACKER module for this deal
7. If advancing to **LOI**: confirm LOI GENERATOR was used — if not, prompt to draft LOI now
8. If advancing to **Pass**: require a reason before completing the move

---

### `pipeline report`

Output the full pipeline status table with the following columns:

| # | Property | Market | SF | Ask | Stage | Days in Stage | Conviction | Last Note |

Below the table, include:
- **Stale Alert**: any deal >30 days in current stage
- **Action Required**: any deal in LOI or DD stage with no note in past 7 days
- **Recently Advanced**: any deal that changed stage in the past 7 days
- **Conviction Summary**: count by conviction level

---

### `deal status [deal]`

Full single-deal view — all fields, full notes log, all attachments, stage history.
Format as a structured dossier. Bottom of the dossier: recommended next action.

---

## Inter-Skill Logging

PIPELINE is the logging target for all other RIDGE modules. Each module appends to the
deal's Notes field with a timestamped entry:

| Originating Skill | What Gets Logged |
|---|---|
| **SCOUT** | Adds new deal to Watch stage with sourcing signal summary and conviction level |
| **NAPKIN** | Appends screen result (Go / No-Go / Needs More Data) and one-sentence thesis to Notes; updates conviction level |
| **LOI GENERATOR** | Advances deal to LOI stage; attaches LOI document reference to Notes |
| **DD TRACKER** | Activates at DD stage; all DD checklist updates flow back as Notes entries |
| **DEBT TOOL** | Appends capital stack summary (equity %, senior debt, DSCR, debt yield) to Notes |
| **CANVAS PANEL** | Appends tenant list summary and attaches prospect list file reference to Notes |
| **MARKET PULSE** | Updates submarket benchmark data referenced in deal record |

When any of these modules completes a task, it asks: "Log this to PIPELINE?" — default yes.

---

## Embedded Modules

### DD TRACKER (Embedded)

DD TRACKER activates automatically when a deal is moved to the DD stage. It does not
operate as a separate module — it is a panel within the deal record.

Read `/mnt/skills/user/dd-tracker/SKILL.md` in full when a deal enters DD stage.

### DEAL MEMORY (Embedded)

DEAL MEMORY is the session persistence layer within PIPELINE. It handles serializing
and restoring pipeline state across sessions.

Read `/mnt/skills/user/deal-memory/SKILL.md` in full when the user asks to save, restore,
or serialize session state.

---

## Conviction Level Management

Every deal in PIPELINE carries a conviction level at all times. PIPELINE enforces this:
- Never display a deal without a conviction level
- If conviction level changes based on new information, log the change with reason
- Conviction drives sort order — High Conviction deals always appear first
- If a deal has been at "Needs More Data" for more than 2 sessions, flag it and ask what
  data is still outstanding

**Conviction state definitions (per RIDGE standard):**
- **High Conviction** — RIDGE will defend this deal and push toward action
- **Needs More Data** — Interesting signal, incomplete picture. Identify exactly what closes the gap
- **Watch List** — Not actionable now. Define the trigger that would move it

---

## Stale Deal Protocol

Any deal that meets one of these conditions triggers a flag in pipeline reports:

| Condition | Flag Type |
|---|---|
| Watch stage > 45 days, no note update | "Stale Watch — re-evaluate or pass" |
| Active stage > 60 days, no stage advance | "Stale Active — what's blocking the next step?" |
| LOI stage > 21 days, no update | "LOI Stale — is this still executable?" |
| DD stage > 45 days, no DD checklist activity | "DD Stale — are we still in the window?" |

When flagging a stale deal, PIPELINE asks one sharp question about what's blocking progress.
Do not let deals age silently.

---

## Session Integration

### Session Opening
At the start of every RIDGE session, PIPELINE should be activated first (or as part of
RIDGE's default session opening). Display the pipeline table before Deal Review begins.

### Session Closing
At the end of every session, prompt: "Want to save session state to a memory block?"
If yes, activate DEAL MEMORY to serialize the full pipeline.

---

## Pass Protocol

When a deal is passed, PIPELINE requires:
1. A reason code: Math Doesn't Work / Owner Not Ready / Market Shift / Capital Constraints / Better Opportunity / Other
2. A freeform note explaining the specific reason
3. A "re-engage trigger" (optional): "Re-engage if [condition]"
4. The deal is archived — removed from active view but searchable in session history

Passed deals are never deleted — they are retained in session memory as context for
future sourcing decisions.

---

## Operating Principles

1. The pipeline table is always sorted conviction-first, then days-in-stage descending
2. Every stage change requires a date — never leave stage date blank
3. Notes are append-only — never overwrite, always timestamp
4. Every pass gets a reason — "not interested" is not acceptable
5. DD TRACKER activates automatically at DD stage — do not wait for a separate command
6. High Conviction deals with no LOI after 45 days in Active stage get flagged automatically
7. The pipeline is a living document — stale entries get challenged, not ignored

---

## Reference Files

- `/mnt/skills/user/dd-tracker/SKILL.md` — DD checklist module (embedded at DD stage)
- `/mnt/skills/user/deal-memory/SKILL.md` — Session persistence (embedded)
- `/mnt/skills/user/napkin/SKILL.md` — Quick screen that feeds Watch stage
- `/mnt/skills/user/loi-generator/SKILL.md` — LOI drafting that advances to LOI stage
- `/mnt/skills/user/debt-tool/SKILL.md` — Capital stack modeling logged to Notes
- `/mnt/skills/user/canvas-panel/SKILL.md` — Tenant list attachment
- `/mnt/skills/user/market-pulse/SKILL.md` — Submarket benchmarks for deal records
