# RIDGE Intelligence — Modular Architecture Plan
**Reconnaissance Report | April 9, 2026**
**Status: Read-only analysis. No code has been moved or modified.**

---

## 1. CURRENT STATE

### Total Line Count: 9,767

### Section Breakdown

| Section | Lines | Estimated Count | Notes |
|---|---|---|---|
| `<head>` + CDN imports | 1–14 | ~14 | 7 external libraries via CDN |
| **CSS styles** | 15–411 | ~397 | All inline in `<style>` tag |
| **HTML structure** | 413–1143 | ~730 | Auth gate, modals, all skill panels |
| **TOOLS array** (skill definitions + system prompts) | 1244–1508 | ~265 | All skill configs, fields, upload specs, per-skill system prompts |
| **Global state declarations** | 1510–1614 | ~105 | `STATE`, `_sb`, `_apiKey`, session vars |
| **Panel render functions** | 1519–1893 | ~375 | `renderTools()`, `buildPanelHTML()`, `togglePanel()` |
| **File upload handlers** | 1895–2081 | ~187 | `handleXLSX()`, `handleMultiXLSX()` |
| **Daily Signal state + tracker** | 2083–2267 | ~185 | DS localStorage state, tracker render |
| **Daily Signal XLSX export** | 2269–2750 | ~482 | `exportDailySignalXLSX()` — scoring, outreach scripts |
| **Skill execution core** | 2980–3580 | ~601 | `runTool()`, `buildTrigger()` (all 14 skill prompt builders) |
| **Supabase client + CRUD** | 3596–3701 | ~106 | Init, deals table, session_state |
| **Lease parsing & normalization** | 3703–3900 | ~198 | `_parseLeaseTable()`, `_writeLeaseRows()`, normalizers |
| **Pipeline management** | 3904–4200 | ~297 | CRUD, Kanban render, activity log |
| **Shared utilities / UI helpers** | 4205–4545 | ~341 | `showToast()`, `renderMD()`, copy, export helpers |
| **ISR PPTX pre-processing** | 4547–5154 | ~608 | `isrExportPPTX()` setup, section extractors, tool-specific exports |
| **Auth / API key / session init** | 5440–5576 | ~137 | API key load, `_apiKey`, Voyage key, embedding setup |
| **History + Lease Library panels** | 5577–5635 | ~59 | Panel open/close, semantic search wrappers |
| **`runRidgeAPI()` — Anthropic orchestrator** | 6083–6257 | ~175 | Single entry point for all AI calls, streaming, save to DB |
| **PPTX slide generation (ISR)** | 6260–9260 | ~3,000 | 14 IC-deck slides; charts, tables, waterfall, maps |
| **Lease Library module** | 9266–9767 | ~501 | Import, dedup, pagination, filtering, semantic search |

---

## 2. PROPOSED FILE STRUCTURE

```
ridge-intel/
├── index.html                        # Shell only: nav, auth gate, modals, lazy loader
│
├── config.js                         # API keys (runtime), constants, hurdle thresholds
│
├── styles/
│   ├── main.css                      # Global layout, header, hero, tool grid, forms
│   └── midnight.css                  # Midnight Executive palette, typography, modals
│
├── shared/
│   ├── api.js                        # runRidgeAPI(), fetch wrapper, streaming handler
│   ├── supabase.js                   # Supabase client init, all table CRUD, RPC calls
│   ├── ui.js                         # showToast(), modals, renderMD(), history/library panels
│   └── utils.js                      # Formatters, date helpers, number parsers, MD strip
│
├── skills/
│   ├── registry.js                   # TOOLS array (skill definitions, prompts, fields)
│   ├── lens.js                       # OM teardown — buildTrigger('lens')
│   ├── napkin.js                     # Quick screen — buildTrigger('napkin'), updateNapkinLive()
│   ├── waterfall.js                  # GP/LP waterfall — buildTrigger('waterfall')
│   ├── market-pulse.js               # Submarket intel — buildTrigger('market-pulse')
│   ├── lease-comp.js                 # Comp analysis — buildTrigger('lease-comp')
│   ├── debt-tool.js                  # Capital stack — buildTrigger('debt')
│   ├── isr.js                        # IC deck — buildTrigger('isr'), isrExportPPTX() [~3,000 lines]
│   ├── loi.js                        # LOI draft — buildTrigger('loi')
│   ├── gavel.js                      # Lease abstract — buildTrigger('gavel'), _parseGavelLeases()
│   ├── legal.js                      # Doc review — buildTrigger('legal')
│   ├── daily-signal.js               # Lead scoring — DS state, tracker, exportDailySignalXLSX()
│   ├── canvas.js                     # Tenant sourcing — buildTrigger('canvas')
│   ├── lease-compare.js              # Lease negotiation — buildTrigger('lease-compare')
│   ├── lease-stack.js                # Amendment tracking — buildTrigger('lease-stack')
│   └── lease-library.js              # Comp database — _ll* functions, import, pagination
│
└── pipeline/
    └── pipeline.js                   # Deal CRM — CRUD, kanban render, activity log
```

---

## 3. DEPENDENCIES

### `shared/api.js`
**Owns:** `runRidgeAPI()`, streaming fetch, `_isrExtractJSON()`, result persistence hook
**Calls into:**
- `shared/supabase.js` → `saveSkillOutput()`, `saveSkillDocument()`
- `shared/ui.js` → opens `ridge-response-panel`, `showToast()`
- `config.js` → `_apiKey`, model name, max_tokens

**Anthropic endpoints used:**
- `https://api.anthropic.com/v1/messages` (Sonnet 4.6 for all skill runs; Haiku 4.5 for ISR JSON extraction)

---

### `shared/supabase.js`
**Owns:** Client init, all table queries, RPC calls
**Tables:**
| Table | Operations |
|---|---|
| `deals` | select, insert, upsert, delete |
| `leases` | select, insert, upsert, semantic RPC |
| `skill_outputs` | insert (auto-save after every run) |
| `skill_output_documents` | insert (extracted text from uploads) |
| `activity_log` | insert (pipeline actions, deal events) |
| `contacts` | select, insert |
| `signal_reports` | insert (Daily Signal runs) |
| `session_state` | select, upsert (API key, officer name, config) |

**No skill-level dependencies** — all skills call supabase only through this module.

---

### `shared/ui.js`
**Owns:** `showToast()`, modal open/close helpers (`_showModal`, `_hideModal`), `renderMD()`, `showHistoryPanel()`, `showLeaseLibrary()`, `copyResult()`, `clearTool()`, `showParsedKPIs()`
**Calls into:**
- `shared/supabase.js` → history rows, lease library rows
- `shared/utils.js` → `_hEsc()`, `stripMd()`

---

### `shared/utils.js`
**Owns:** Pure formatters with no side effects
- `_parseLeaseDate(str)` — date string normalization
- `_normalizeTenant(name)` — tenant name cleanup
- `_parseLeaseTable(text)` — pipe-delimited table parser
- `_extractKeySection(text, header)` — markdown section extractor
- `extractSec(text, section, max)` — generic section extractor
- `plDaysAgo(iso)` — relative date formatter
- `getFieldValue(id, numericOnly)` — form field reader
- `setField(toolId, fieldId, value)` — form field writer
- `stripMd(text)` — markdown stripper
- `_hEsc(str)` — HTML escape
- Number/currency/percentage formatters

**No external dependencies** — pure functions only.

---

### `config.js`
**Owns:** All hardcoded thresholds and runtime config placeholders
```js
// Investment thresholds (do not change without business decision)
export const IRR_FLOOR     = 14.75;       // %
export const IRR_TARGET    = 15.0;        // %
export const EQUITY_MULT   = [1.8, 2.2];  // range
export const YOC_TARGET    = [7.5, 8.0];  // Yr3/4 %
export const MAX_LTV       = 65;          // %
export const DSCR_FLOOR    = 1.25;
export const DEAL_RANGE    = [10, 70];    // $M
export const HOLD_PERIOD   = 5;           // years
export const TARGET_MARKETS = ['Atlanta','Savannah','DFW','Houston','Austin'];

// Runtime (loaded from Supabase session_state, NOT hardcoded)
export let ANTHROPIC_KEY   = '';
export let VOYAGE_KEY      = '';
export let MAPS_KEY        = '';
export let OFFICER_NAME    = '';

// Model IDs
export const MODEL_PRIMARY  = 'claude-sonnet-4-6';
export const MODEL_FAST     = 'claude-haiku-4-5-20251001';
export const VOYAGE_MODEL   = 'voyage-large-2';
export const MAX_TOKENS     = 8000;
export const EMBED_DIM      = 1536;

// Supabase (these are public/anon — safe to ship)
export const SB_URL  = 'https://ookdsectdhllnhbwrwil.supabase.co';
export const SB_ANON = 'eyJhbGci...';   // anon JWT
```

---

### Skill-level dependencies

| Skill File | `shared/api.js` | `shared/supabase.js` | `shared/ui.js` | `shared/utils.js` | `config.js` | Supabase Tables |
|---|:---:|:---:|:---:|:---:|:---:|---|
| `skills/registry.js` | — | — | — | — | ✓ | — |
| `skills/lens.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/napkin.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/waterfall.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/market-pulse.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/lease-comp.js` | ✓ | ✓ | ✓ | ✓ | ✓ | `skill_outputs`, `leases` |
| `skills/debt-tool.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/isr.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs`, `skill_output_documents` |
| `skills/loi.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/gavel.js` | ✓ | ✓ | ✓ | ✓ | ✓ | `skill_outputs`, `leases` |
| `skills/legal.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/daily-signal.js` | ✓ | ✓ | ✓ | ✓ | ✓ | `signal_reports`, `skill_outputs` |
| `skills/canvas.js` | ✓ | — | ✓ | ✓ | ✓ | `skill_outputs` |
| `skills/lease-compare.js` | ✓ | ✓ | ✓ | ✓ | ✓ | `skill_outputs`, `leases` |
| `skills/lease-stack.js` | ✓ | ✓ | ✓ | ✓ | ✓ | `skill_outputs`, `leases` |
| `skills/lease-library.js` | — | ✓ | ✓ | ✓ | ✓ | `leases` |
| `pipeline/pipeline.js` | — | ✓ | ✓ | ✓ | — | `deals`, `activity_log`, `contacts` |

---

## 4. ROUTER DESIGN

### Current State
There is no SPA router. All skill panels are pre-rendered as hidden HTML `<div>`s on page load. `togglePanel(id)` shows/hides them by toggling a CSS `open` class. The URL never changes.

### Proposed Lightweight Router

The router lives entirely in `index.html`. It maps URL hashes to skill modules and loads them on demand.

**URL scheme:**
```
/#/                  → home (tool grid)
/#/skill/napkin      → Napkin panel
/#/skill/isr         → ISR panel
/#/pipeline          → Pipeline CRM
/#/lease-library     → Lease Library
```

**Router logic (conceptual — no code written yet):**

```
1. On DOMContentLoaded:
   a. Render the static shell (header, hero, tool-grid tiles — no panel content yet)
   b. Read window.location.hash
   c. Call router.navigate(hash)

2. router.navigate(path):
   a. Parse skill ID from path
   b. Dynamically import the skill module:
        const mod = await import(`./skills/${skillId}.js`)
   c. Call mod.mount(panelContainer) — skill renders its own panel HTML
   d. Update browser history: history.pushState(null, '', `#/skill/${skillId}`)

3. Tile click handler (on tool-grid):
   a. Fires router.navigate(`#/skill/${skillId}`)
   b. Optionally pre-fetches adjacent skills with <link rel="modulepreload">

4. Back/forward navigation:
   a. window.addEventListener('popstate') → re-run router.navigate(location.hash)

5. On skill panel close:
   a. mod.unmount() — skill tears down its panel, frees event listeners
   b. router.navigate('#/') → return to home grid
```

**Key behaviors preserved from current design:**
- Only one panel open at a time (router enforces this via unmount)
- Daily Signal tracker is rendered only when its panel opens (handled by `daily-signal.js` `mount()`)
- Pipeline is rendered on mount (`pipeline.js` `mount()`)
- Lease Library loads its data on mount (`lease-library.js` `mount()`)

**What the new `index.html` shell contains:**
- `<head>` with CDN imports (XLSX, ExcelJS, PptxGenJS, PDF.js, Supabase, Mammoth)
- Auth gate HTML (one-time modal)
- API key modal HTML
- Response/streaming panel HTML (`#ridge-response-panel`)
- Tool grid container (`#tool-grid`) — tiles rendered from `skills/registry.js`
- `<script type="module">` bootstrapper: imports `config.js`, `shared/supabase.js`, `shared/ui.js`, the router

---

## 5. RISKS & TIGHT COUPLING FLAGS

### CRITICAL — Hard to separate

#### `isr.js` is ~3,000 lines
The ISR PPTX generation (`isrExportPPTX`) runs from roughly line 4351 to line 9260. It contains 14 fully-specified slide layouts with inline pixel measurements, color values, chart data transformations, and table generators. It references `_isrParsedData` (global), `_isrModelBuffer` (global ArrayBuffer loaded from CDN), and numerous inline helper functions (`extractSec`, `pct2`, `rcF`, `rcT`, `rcBrd`) that are defined outside the ISR block and would need to move to `shared/utils.js`. This is the single largest extraction risk.

**Recommendation:** Extract ISR as its own subdirectory: `skills/isr/index.js` + `skills/isr/slides.js` + `skills/isr/charts.js`.

---

#### `buildTrigger()` is a monolithic 600-line switch
Lines 3042–3580 contain a single `buildTrigger(toolId, ...)` function with 14 case branches — one per skill. Each branch constructs the full prompt from form fields, file content, and parsed metrics. These branches are currently tightly coupled to:
- The `STATE` global (reads `STATE[toolId].metrics`, `STATE[toolId].files`)
- DOM field reading via `getFieldValue(id)`
- Per-skill constants duplicated inline (IRR thresholds repeated in each prompt)

**Recommendation:** Each `skills/*.js` file exports its own `buildPrompt(state)` function. `buildTrigger()` becomes a thin dispatcher: `import { buildPrompt } from './skills/${toolId}.js'; return buildPrompt(STATE[toolId])`.

---

#### `STATE` global is read/written by every skill
The `STATE` object (line 1513) stores per-tool `metrics`, `files`, and `result` under `STATE[toolId]`. All 14 skills read and write this object directly. It is also read by:
- `showParsedKPIs()` (UI helper)
- `buildTrigger()` (prompt builder)
- `exportToolReport()` (export system)
- `runRidgeAPI()` (post-run result save)

**Recommendation:** Formalize as a `StateStore` module with `get(toolId)`, `set(toolId, key, value)`, `reset(toolId)` methods. All modules import the store, never the raw object.

---

#### Supabase anon key is hardcoded in the JS source
Lines 3617–3618 embed the Supabase project URL and anon JWT directly in the script. The anon key is public by design (Row Level Security enforces access), but it should move to `config.js` so it is in one location and clearly labeled.

---

### MEDIUM — Manageable coupling

#### `daily-signal.js` mixes concerns
Daily Signal has three distinct concerns bundled together:
1. CoStar XLSX parsing and scoring (lines 1898–2081)
2. Tracker state management with localStorage (lines 2083–2227)
3. Excel export with outreach scripts (lines 2269–2750)

The tracker state (`DS_STATE_KEY`, `getDailySignalState()`, `saveDailySignalState()`) is only used by Daily Signal but is currently declared at global scope, polluting the global namespace.

**Recommendation:** All three concerns live in `skills/daily-signal.js`. Move the two state functions to module scope.

---

#### Lease-related state is scattered
Lease data flows through four separate locations:
- `_parseLeaseTable()` in shared utilities (line 3708)
- `_writeLeaseRows()` Supabase upsert (line 3826)
- `_parseGavelLeases()` Gavel-specific parser (line 5423)
- `_llParsedRows`, `_llPage`, `_llPageSize` lease library state (line 9269)
- Semantic search (`_generateEmbedding`, `leaseSemanticSearch`) (lines 5536–5574)

The Gavel skill, Lease Comp Map skill, Lease Stack skill, and Lease Library all touch the `leases` table but use different code paths to get there.

**Recommendation:** Consolidate all lease I/O in `shared/supabase.js` (query functions) and lease parsing in `shared/utils.js`. Individual skills call shared functions, not their own table logic.

---

#### `_skillRawOutputs` and `_ridgeSessionLog` are implicit contracts
`_skillRawOutputs[toolId]` stores the raw API response for each skill. It is read by ISR export, LENS export, and history panel. `_ridgeSessionLog` is appended by every skill run. Both are global arrays/objects with no access control.

**Recommendation:** Move both into the `StateStore` module described above.

---

#### `getFieldValue()` and `setField()` depend on DOM IDs
These functions (lines 5288, 2952) use `document.getElementById()` with IDs that are generated by `buildFieldsHTML()` using a `${toolId}-${fieldId}` pattern. This means skill modules implicitly depend on the DOM having been rendered with the exact expected IDs before execution.

**Recommendation:** Pass form element references (or a form data object) into skill functions explicitly rather than relying on global DOM queries. Skills' `mount()` function can capture field references at panel mount time.

---

### LOW — Minor friction

| Issue | Location | Mitigation |
|---|---|---|
| Investment thresholds duplicated in each skill's system prompt | TOOLS array, lines 1257–1498 | Centralize in `config.js`; compose prompts with template strings |
| `renderMD()` uses `marked` library assumed global | Line 4222 | Explicit import after CDN is confirmed loaded |
| PPTX model template loaded from external URL at runtime | Line 3602 | Cache the ArrayBuffer in `isr.js` module scope on first load |
| `_folderHandles` (File System Access API) | Line 2750 | Browser-only API; document this constraint explicitly |
| `closeLaunch()` and `copyAndLaunch()` reference DOM IDs from auth modal | Lines 3016–3030 | These belong in `shared/ui.js` auth flow, not global scope |

---

## 6. EXTRACTION SEQUENCE (RECOMMENDED ORDER)

If this refactor is undertaken, the lowest-risk sequence is:

1. **`config.js`** — zero runtime behavior, pure constants. Extract first to unblock all other modules.
2. **`shared/utils.js`** — pure functions, no DOM, no API. Extract and test in isolation.
3. **`shared/supabase.js`** — isolated client; can be extracted without touching skill logic.
4. **`shared/ui.js`** — modals/toasts; extract and wire up `index.html` to call imports.
5. **`shared/api.js`** — `runRidgeAPI()` is the most-called shared function; centralize after utils/supabase are stable.
6. **`pipeline/pipeline.js`** — self-contained CRM; minimal shared state dependencies.
7. **`skills/lease-library.js`** — self-contained; only touches `leases` table.
8. **`skills/daily-signal.js`** — complex but self-contained; large XLSX export stays in this module.
9. **Small skills first** (`loi.js`, `legal.js`, `canvas.js`, `market-pulse.js`, `waterfall.js`) — each is a thin prompt builder + export.
10. **`skills/gavel.js`** — has lease write-back; depends on supabase module being stable.
11. **`skills/napkin.js`** — has live-update logic (`updateNapkinLive()`); test interactivity carefully.
12. **`skills/isr.js`** — last, as it is the largest and highest-risk extraction.

---

## 7. SUMMARY METRICS

| Metric | Value |
|---|---|
| Total lines | 9,767 |
| CSS | ~397 lines (~4%) |
| HTML structure | ~730 lines (~7.5%) |
| TOOLS array / system prompts | ~265 lines (~2.7%) |
| Skill execution logic (all skills combined) | ~4,500 lines (~46%) |
| Shared utilities + UI | ~400 lines (~4%) |
| Supabase + persistence | ~400 lines (~4%) |
| PPTX generation (ISR only) | ~3,000 lines (~31%) |
| Config / init / bootstrap | ~75 lines (~1%) |

**Largest single extraction:** ISR PPTX (~31% of total file)
**Most cross-cutting dependency:** `STATE` global (touched by every skill)
**Highest-value quick win:** `config.js` extraction (deduplicates thresholds repeated 14× in prompts)
