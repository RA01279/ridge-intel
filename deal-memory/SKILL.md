---
name: deal-memory
description: >
  DEAL MEMORY is RIDGE's session persistence and state serialization engine. Use this skill
  ANY TIME the user wants to save, restore, export, or manage deal state across sessions —
  including generating a session state block to save at end of a working session, restoring
  a prior session's pipeline and deal context, exporting deal data to a structured format,
  importing data from a prior state block, or performing a session handoff. Trigger on:
  "save the session", "save my pipeline", "restore my data", "here's my state block",
  "export deal data", "start from last session", "pick up where we left off", "session
  export", "save state", "load state", "serialize pipeline", or any time the user pastes
  a block of structured deal data for restoration. DEAL MEMORY is the bridge between Claude's
  stateless architecture and RIDGE's need for persistent deal tracking. Always load this skill
  when handling session save/restore operations or cross-session continuity.
---

# DEAL MEMORY — Session Persistence Engine

## Identity

DEAL MEMORY solves Claude's statelessness problem for RIDGE workflows.

Claude has no memory between sessions. DEAL MEMORY compensates by producing compact,
structured state blocks that carry the full RIDGE session context in a copy-pasteable
format. The user saves the block. The user pastes it at the start of the next session.
RIDGE picks up exactly where it left off.

This is not a workaround. This is the architecture until persistent storage is available
in the deployed app.

---

## State Block Architecture

A DEAL MEMORY state block contains everything needed to reconstruct a RIDGE session.

### State Block Structure

```
╔══════════════════════════════════════════════════════════════════════╗
║  RIDGE SESSION STATE — v2.0                                          ║
║  Saved: [YYYY-MM-DD HH:MM]                                           ║
╠══════════════════════════════════════════════════════════════════════╣
║  [SECTION: META]                                                     ║
║  Active markets: [comma-separated]                                   ║
║  Session count: [N]                                                  ║
║  Last SCOUT run: [date | submarket]                                  ║
║  SCOUT exclude list: [count] properties                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  [SECTION: PIPELINE]                                                 ║
║  [One line per deal — see compact format below]                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  [SECTION: SCOUT_HISTORY]                                            ║
║  [Previously surfaced prospects — compact list for deduplication]   ║
╠══════════════════════════════════════════════════════════════════════╣
║  [SECTION: CRITERIA_UPDATES]                                         ║
║  [Any session-specific criteria adjustments from RIDGE]             ║
╠══════════════════════════════════════════════════════════════════════╣
║  [SECTION: OPEN_THREADS]                                             ║
║  [Unresolved questions, follow-ups, or items flagged for next session]║
╚══════════════════════════════════════════════════════════════════════╝
```

### Pipeline Compact Format (one line per deal)
```
[STAGE]|[Address]|[Market]|[SF]|[Est Price]|[Conviction]|[Follow-Up Date]|[Last Action]|[Notes 40 chars max]
```
Example:
```
LOI|1850 Crown Dr Dallas TX|DFW|48500|$9.2M|HIGH|2025-02-14|LOI submitted 2/10|Owner motivated, debt maturing Q2
WATCH|1234 Industrial Blvd Atlanta|ATL|32000|$6.5M|WATCH|2025-02-20|SCOUT flagged 2/8|CMBS watchlist signal
```

### SCOUT History Compact Format
```
[Address]|[Date surfaced]|[Passed/Pursued/Dead]
```

---

## Commands

### SAVE — Generate State Block

**Trigger:** "save the session", "save state", "end of session save"

Action: Collect all active RIDGE context from the current conversation:
1. Scan conversation for all deals mentioned, screened, or added to pipeline
2. Scan for SCOUT runs and the properties surfaced
3. Capture any criteria updates or market observations
4. Capture open threads and follow-ups

Output the complete state block. Include this instruction at the top:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RIDGE SESSION STATE — COPY AND SAVE THIS BLOCK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Paste this block at the start of your next session to restore all deal context.
Store in: Notion / Notes / email to yourself / text file.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### RESTORE — Load State Block

**Trigger:** User pastes a state block, or says "restore", "here's my last session", "load this"

Action:
1. Parse the state block silently
2. Reconstruct pipeline — all deals with their stages, conviction, follow-ups
3. Reconstruct SCOUT exclusion list
4. Load criteria updates
5. Surface open threads

Output confirmation:
```
✓ SESSION RESTORED — [Timestamp of saved state]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pipeline: [N] active deals
  WATCH: [N] | OUTREACH: [N] | MEETING: [N] | LOI: [N] | DD: [N] | IC: [N]
SCOUT exclusion list: [N] properties
Overdue follow-ups: [N] — [List addresses]
Open threads from last session:
  • [Thread 1]
  • [Thread 2]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ready. What are we working on today?
```

### EXPORT — Structured Data Export

**Trigger:** "export pipeline", "export to CSV", "export deal data"

Action: Output pipeline in CSV format suitable for pasting into Excel or Notion.

```csv
Stage,Address,Market,Submarket,AssetType,SF,EstPrice,Conviction,OwnerEntity,KeyContact,FollowUpDate,LastAction,Notes
OUTREACH,"1850 Crown Dr, Dallas TX",DFW,Northwest Dallas,Flex,48500,$9.2M,HIGH,"Crown Industrial LLC","Bob Smith 214-555-1234",2025-02-14,"LOI submitted 2/10","Owner motivated debt maturing Q2"
...
```

### MERGE — Combine Two State Blocks

**Trigger:** "merge these two sessions", "I have two state blocks"

Action: If user provides two state blocks (from different devices or sessions), merge them:
- Deduplicate deals by address (exact match)
- For conflicts (same address, different stage), take the more advanced stage
- Combine SCOUT history exclusion lists
- Flag any conflicts for user review

---

## Session Start Protocol

At the start of every RIDGE session, DEAL MEMORY should prompt:

```
RIDGE session starting.

Do you have a state block from a prior session? If so, paste it now and I'll restore
your pipeline. If not, we'll start fresh and I'll save state at the end of this session.
```

If user says no / doesn't have one:
- Start fresh
- Initialize empty pipeline
- Note: "I'll generate a state block at the end of this session for you to save."

If user pastes a state block:
- Execute RESTORE immediately

---

## Session End Protocol

At the end of every RIDGE session (when user signals they're done, or after 60+ minutes
of inactivity), DEAL MEMORY auto-generates the state block:

```
Session ending. Generating your state block now — copy and save this before closing.

[STATE BLOCK OUTPUT]
```

---

## Deployed App Architecture (Future State)

When PIPELINE is running in the RIDGE Deal Tools web app (Cloudflare Workers), state
persistence moves from manual copy-paste to automatic localStorage:

```javascript
// Key schema for localStorage
const STORAGE_KEYS = {
  pipeline: 'ridge_pipeline_v1',         // Array of deal records
  scoutHistory: 'ridge_scout_history_v1', // Array of surfaced properties
  criteriaUpdates: 'ridge_criteria_v1',   // Object with any overrides
  sessionMeta: 'ridge_session_meta_v1',   // Session count, last run dates
  openThreads: 'ridge_threads_v1'         // Array of open items
};

// Auto-save on every state change
function saveState(key, data) {
  localStorage.setItem(key, JSON.stringify({
    data: data,
    savedAt: new Date().toISOString(),
    version: '1.0'
  }));
}
```

In the deployed app, DEAL MEMORY's role shifts from state serialization to state
validation — checking for schema version mismatches, corrupted records, or
sync conflicts between devices.

---

## Data Formats for Cross-Tool Integration

DEAL MEMORY is the central state hub. Other RIDGE tools read from and write to it.

| Tool | Reads | Writes |
|------|-------|--------|
| PIPELINE | Deal records, stages | Stage updates, outreach logs |
| SCOUT | Exclusion list | New prospects added to WATCH |
| CANVAS | Deal address (for tenant search) | Tenant prospects to deal Notes |
| Napkin | Deal list | Napkin output to deal Notes |
| LOI Generator | Deal terms | Stage advance to LOI |
| DD Tracker | Deal in DD stage | DD checklist status |
| Debt Tool | Deal economics | Debt structure to deal Notes |

---

## Behavioral Rules

1. **Save state at session end, always.** If user doesn't ask, generate the block
   anyway at the end of a substantive RIDGE session.

2. **Never lose a SCOUT run.** Every prospect surfaced by SCOUT goes into the
   exclusion list permanently, even if not added to the pipeline.

3. **Version the state block.** Include schema version in every block. If restoring
   an older format, flag: "This state block is v1.0 — some fields may be missing.
   Restored what I could. Verify pipeline completeness."

4. **Compact over verbose.** State blocks must be small enough to copy-paste comfortably.
   Keep deal notes under 40 characters. Full notes live in PIPELINE — this is the index.

5. **Flag stale state.** If a restored state block is more than 7 days old:
   "⚠️ State block is [N] days old — some deal data may be outdated. Verify follow-up dates."
