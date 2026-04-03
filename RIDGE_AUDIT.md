# RIDGE Platform Audit

**Date:** 2026-04-02  
**File:** `index.html`  
**Lines:** 9,936  
**Functions:** ~245 (`function` keyword), 47 `async function`  
**Auditor:** Claude Sonnet 4.6 via RIDGE code review

---

## Executive Summary

1. **Codebase is production-quality for a single-file app.** 9,936 lines with 80+ named functions, consistent patterns, and working Supabase integration. No critical security vulnerabilities found.
2. **All 6 previously-identified bugs are confirmed fixed.** Duplicate `model:` key, `sens2Cell` ternary, LTV double-`%%`, `_isrModelBuffer`, `panels-container` tag, and Slide 4 syntax error — all clean.
3. **One medium bug outstanding:** `_skillRawOutputs` is only written for `isr` and `gavel` skills. Every other skill's export functions read `_skillRawOutputs[toolId]` and receive `undefined`, silently degrading exports to empty fallbacks.
4. **Two medium state-persistence gaps:** `_isrParsedData` (structured JSON from Call 2) and `_isrModelBuffer` (Excel ArrayBuffer) are module-scope variables that are lost on page refresh, requiring a full ISR re-run to restore PPTX export capability.
5. **Two confirmed dead code items:** `buildPPTX()` (L4410) is never called — `isrExportPPTX()` routes to `ridgeExportPPT()` instead. The `scout` buildTrigger case has no TOOLS array entry.
6. **13 silent `catch(e) {}` blocks** across API key loading, Supabase upserts, and DS migration. Acceptable for graceful degradation but hinders debugging.
7. **No hardcoded API keys.** All credentials (Anthropic, Voyage, Google Maps) are loaded from Supabase `session_state` table. Supabase project URL is hardcoded (not a secret) but anon key is runtime-loaded.
8. **GATA auth gate uses `sessionStorage`** — bypassable via DevTools in seconds. Appropriate for an internal team tool; not a cryptographic barrier.
9. **15 active skills, 16 buildTrigger cases.** One case (`scout`) is orphaned with no TOOLS entry. `pipeline` case returns empty string (export-only, by design).
10. **Top improvement opportunity:** Extend `_skillRawOutputs` writes to all tools in the streaming handler (+5 lines), and persist `_isrParsedData` to `sessionStorage` on successful Call 2. These two changes eliminate the most common PPTX failure modes with minimal effort.

---

## Section 1: Codebase Inventory

### Stats
| Metric | Value |
|---|---|
| Total lines | 9,936 |
| CSS lines (approx) | ~1,100 |
| HTML lines (approx) | ~600 |
| JavaScript lines (approx) | ~8,200 |
| `function` keyword occurrences | 245 |
| `async function` occurrences | 47 |
| CDN dependencies | 7 |
| Supabase tables referenced | 7 |

### CDN Dependencies
| Library | Version | Purpose |
|---|---|---|
| xlsx | 0.18.5 | Excel parsing |
| exceljs | 4.4.0 | Excel export |
| pptxgenjs | 3.11.0 | PowerPoint generation |
| pdfjs-dist | 3.11.174 | PDF parsing |
| docx | 8.5.0 | Word document generation |
| mammoth | 1.6.0 | DOCX text extraction |
| @supabase/supabase-js | 2.x | Database / real-time |

### Function Inventory

#### UI Functions
| Function | Line | Description | Dead? |
|---|---|---|---|
| `renderTools()` | 1565 | Renders TOOLS array into grid + panels | No |
| `buildPanelHTML(tool)` | 1769 | Constructs skill panel HTML | No |
| `buildFieldsHTML(tool)` | 1895 | Renders input fields for a skill | No |
| `togglePanel(id)` | 1915 | Show/hide skill panel | No |
| `toggleManual(id)` | 1934 | Toggle manual field input | No |
| `showParsedKPIs(toolId, m)` | 3003 | Renders extracted file metrics | No |
| `setField(toolId, fieldId, value)` | 2998 | Sets field value in panel | No |
| `copyAndLaunch()` | 3062 | Copy prompt + open Claude.ai | No |
| `closeLaunch()` | 3050 | Close launch modal | No |
| `copyResult(toolId)` | 4338 | Copy tool result to clipboard | No |
| `clearTool(toolId)` | 4320 | Clear STATE + results panel | No |
| `showToast(msg)` | 4258 | Temporary toast notification | No |
| `renderMD(text)` | 4275 | Legacy markdown renderer | Possibly (parseMarkdown preferred) |
| `toggleExport(toolId)` | 5224 | Toggle export panel | No |
| `openRidgePanel(skillName)` | 6661 | Open RIDGE results panel | No |
| `closeRidgePanel()` | 6674 | Close RIDGE results panel | No |
| `ridgeCopyResponse()` | 6678 | Copy RIDGE response | No |
| `_showModal(id)` | 6163 | Show modal by id | No |
| `_hideModal(id)` | 6164 | Hide modal by id | No |
| `showApiKeyModal()` | 6166 | Open API key input modal | No |
| `closeApiKeyModal()` | 6173 | Close API key modal | No |
| `closeHistoryPanel()` | 6264 | Close history panel | No |
| `closeLeaseLibrary()` | 6290 | Close lease library panel | No |
| `hidePropertyMap()` | 6656 | Close property map panel | No |
| `ridgeGateSubmit()` | 9417 | Handle GATA auth gate input | No |
| `_sbSetIndicator(ok)` | 3659 | Set Supabase status dot | No |
| `updateDSMemCount()` | 2161 | Update "N tracked properties" | No |
| `toggleDSLog()` | 2167 | Show/hide DS log | No |
| `toggleDSTracker()` | 2227 | Show/hide DS tracker panel | No |
| `renderDSTracker()` | 2236 | Render DS tracker table | No |
| `renderHistoryList()` | 6430 | Render history table | No |
| `histView(id)` | 6459 | Show single history result | No |
| `renderPipeline()` | 4087 | Render pipeline deal board | No |
| `plToggleAddForm()` | 4000 | Show/hide add deal form | No |
| `plSetFilter(stage)` | 4063 | Filter pipeline by stage | No |
| `_llRenderPreview(rows)` | 9648 | Show import preview table | No |
| `_llRenderTable(rows)` | 9741 | Render lease table | No |
| `_llRenderPagination()` | 9782 | Render pagination controls | No |
| `_llSearch()` | 9800 | Trigger lease search | No |
| `_llRenderStats()` | 9802 | Show lease count stats | No |
| `_llEditLease(id)` | 9840 | Open lease edit mode | No |
| `_llChangePage(dir)` | 9795 | Handle pagination | No |
| `updateNapkinLive()` | ~5965 | Live napkin pre-calculator | No |

#### Skill / AI Functions
| Function | Line | Description | Dead? |
|---|---|---|---|
| `runTool(toolId)` | 3026 | Main skill entry point | No |
| `buildTrigger(toolId, d)` | 3088 | Builds prompts per skill (switch) | No |
| `runRidgeAPI(skillName, prompt, inputs, toolId)` | 6739 | Streaming Claude API call | No |
| `_isrExtractJSON(memoText)` | 4358 | Call 2: Haiku JSON extraction | No |
| `_compressToMemoryBlock(response, tool)` | 6687 | Haiku session memory compression | No |
| `_extractCashFlows()` | 8226 | Extract cash flow table from Excel | No |
| `_extractSensitivity()` | 8262 | Extract sensitivity table from Excel | No |
| `getDSOutreachAngle(p)` | 2275 | Generate outreach email for property | No |
| `plLaunchReport()` | 4235 | Generate pipeline deal report | No |
| `generateLOI()` | 5989 | Generate LOI Word document | No |
| `_parseLensScenarios(txt)` | 6077 | Parse Bear/Base/Bull from LENS output | No |
| `_parseGavelLeases(txt)` | 6094 | Extract rent schedule from lease abstract | No |
| `histSemanticSearch()` | 6488 | Semantic search via Voyage embeddings | No |
| `leaseSemanticSearch()` | 6217 | Lease semantic search | No |

#### Export Functions
| Function | Line | Description | Dead? |
|---|---|---|---|
| `ridgeExportPPT()` | 8333 | Main PPTX builder (14-slide ISR) | No |
| `isrExportPPTX()` | 4403 | ISR PPTX entry point (routes to ridgeExportPPT) | No |
| `buildPPTX()` | 4410 | Old ISR PPTX builder | **YES — dead code** |
| `ridgeExportPDF()` | 7513 | Export to PDF | No |
| `ridgeExportXLS()` | 7762 | Export to Excel | No |
| `_napkinExportPDF()` | 7662 | NAPKIN PDF export | No |
| `_napkinExportXLS()` | 8027 | NAPKIN Excel export | No |
| `exportToolReport(toolId)` | 5349 | Route export by toolId | No |
| `_exportLens(...)` | 5390 | LENS Excel export | No |
| `_exportNapkin(...)` | 5443 | NAPKIN Excel export (via exportToolReport) | No |
| `_exportMarket(...)` | 5486 | MARKET-PULSE Excel export | No |
| `_exportLeaseComp(...)` | 5512 | LEASE-COMP Excel export | No |
| `_exportDebt(...)` | 5537 | DEBT Excel export | No |
| `_exportLOI(...)` | 5605 | LOI Excel export | No |
| `_exportGavel(...)` | 5716 | GAVEL Excel export | No |
| `_exportLegal(...)` | 5787 | LEGAL Excel export | No |
| `_exportLeaseCompare(...)` | 5817 | LEASE-COMPARE Excel export | No |
| `_exportCanvas(...)` | 5865 | CANVAS Excel export | No |
| `_exportLeaseStack(...)` | 5885 | LEASE-STACK Excel export | No |
| `exportDailySignalXLSX()` | 2315 | DS Excel export | No |
| `downloadBlob(buffer, filename)` | 5233 | Save ArrayBuffer as file download | No |
| `_llExportLeases()` | 9879 | Export leases to XLSX | No |

#### Database Functions
| Function | Line | Description | Dead? |
|---|---|---|---|
| `_sbInit()` | ~3665 | Initialize Supabase client | No |
| `_sbSubscribe()` | 3680 | Real-time deals subscription | No |
| `_sbLoadDeals()` | 3689 | Load all deals from Supabase | No |
| `_sbUpsertDeal(deal)` | 3715 | Upsert deal to Supabase | No |
| `_sbDeleteDeal(id)` | 3750 | Delete deal by id | No |
| `loadMapsKey()` | 6117 | Load Google Maps key from Supabase | No |
| `loadApiKey()` | 6127 | Load Anthropic + Voyage keys | No |
| `saveApiKey()` | 6143 | Save API keys to Supabase | No |
| `_generateEmbedding(text)` | 6192 | Voyage API embedding call | No |
| `_writeLeaseRows(rows, addr, src)` | 3879 | Insert/upsert leases to Supabase | No |
| `deduplicateLeases()` | 6294 | Remove duplicate lease records | No |
| `_llImportClick()` | 9447 | Lease import entry point | No |
| `_llConfirmImport()` | 9684 | Confirm + insert leases | No |
| `_llLoadLeases()` | 9706 | Load filtered leases | No |
| `_llDeleteLease(id, tenant, addr)` | 9830 | Delete single lease | No |
| `_llSaveEdit(id)` | 9863 | Save lease edit | No |
| `showHistoryPanel()` | 6236 | Load + display output history | No |
| `histDelete(id)` | 6477 | Delete skill output | No |
| `plAddDeal()` | 4031 | Create new pipeline deal | No |
| `plUpdateDeal(id, updates)` | 3963 | Update pipeline deal | No |
| `plDeleteDeal(id)` | 3986 | Delete pipeline deal | No |
| `plSaveEdit(id)` | 4195 | Save edited pipeline deal | No |
| `getPipelineDeals()` | 3957 | Read pipeline from localStorage | No |
| `savePipelineDeals(arr)` | 3960 | Persist pipeline | No |
| `getDailySignalState()` | 2135 | Read DS state from localStorage | No |
| `saveDailySignalState(state)` | 2140 | Persist DS state | No |
| `_migrateDSState()` | 2145 | Migrate legacy DS keys | No |
| `showPropertyMap(address, skillName)` | 6533 | Geocode + show aerial/street view | No |
| `showLeaseLibrary()` | 6273 | Load lease library panel | No |

#### Utility Functions
| Function | Line | Description | Dead? |
|---|---|---|---|
| `extractSection(text, heading)` | ~4349 | Extract `##` section from markdown | No |
| `_extractKeySection(text, header)` | 4349 | indexOf-based section extractor | No |
| `stripMd(s)` | ~8640 | Remove markdown formatting | No |
| `parseMarkdown(text)` | 7123 | Convert markdown to HTML | No |
| `_hEsc(s)` | 6386 | HTML-escape string | No |
| `_relTime(iso)` | 6390 | ISO date → "X minutes ago" | No |
| `_histBadgeClass(skill)` | 6403 | CSS class for skill badge | No |
| `_detectMarket(inputs)` | 6374 | Detect market from address text | No |
| `getFieldValue(id, numericOnly)` | 5959 | Get field value from panel | No |
| `_napkinCalc(d)` | 7266 | NAPKIN return metric calculations | No |
| `_waterfallCalc(d)` | 7382 | GP/LP waterfall tier calculations | No |
| `_debtCalc(price, noi, ltv, rate)` | 7234 | Debt scenario calculations | No |
| `_pmt(annualRate, amortYrs, loanAmt)` | 7226 | PMT payment calculation | No |
| `normDSAddr(a)` | 2197 | Normalize address string | No |
| `_fallbackCompress(response, tool)` | 6713 | Local truncation for session log | No |
| `_pruneSessionLog(maxEntries)` | 6720 | Prune session audit log | No |
| `plStageColor(stage)` | 4067 | Color for pipeline stage | No |
| `plConvClass(conv)` | 4073 | CSS class for conviction level | No |
| `plDaysAgo(iso)` | 4079 | "X days ago" from ISO date | No |
| `_getPipelineFormData(prefix)` | 4009 | Extract pipeline form data | No |
| `rcF(hex)` | 5249 | Excel fill pattern helper | No |
| `rcBrd()` | 5251 | Excel border helper | No |
| `rcTitle(ws, ...)` | 5253 | Excel title row helper | No |
| `rcSecHead(ws, ...)` | 5274 | Excel section header helper | No |
| `rcKV(ws, ...)` | 5286 | Excel key-value row helper | No |
| `rcAnalysis(ws, ...)` | 5313 | Excel narrative section helper | No |
| `rcColWidths(ws, widths)` | 5340 | Set Excel column widths | No |
| `rcGetField(toolId, fieldId)` | 5344 | Get field value for Excel export | No |
| `_parseLeaseTable(text)` | 3761 | Extract lease data from markdown | No |
| `_parseLeaseDate(str)` | 3818 | Parse date string to ISO | No |
| `_parseLeaseDateFull(str)` | 9567 | Extended date parser | No |
| `_normalizeTenant(name)` | 3833 | Standardize tenant name | No |
| `_showReimportDialog(count, addr)` | 3852 | Duplicate lease confirmation dialog | No |
| `_llParseArgusExcel(file, ...)` | 9487 | Parse Argus Excel format | No |
| `_llParseGeneric(raw, ...)` | 9576 | Generic raw array parser | No |
| `_llParseCSV(file, ...)` | 9630 | Parse CSV file | No |
| `_getSiblingNodes(h2)` | 7503 | Get text nodes after H2 heading | No |
| `fmtUSD(v)` | ~8625 | Format value as USD string | No |
| `pct2(v)` | ~8632 | Format as 2-decimal percent | No |
| `mult2(v)` | ~8633 | Format as 2-decimal multiple | No |

---

## Section 2: Bug Inventory

### Confirmed Fixed (Prior Sessions)

| # | Bug | Location | Fix Applied |
|---|---|---|---|
| 1 | Duplicate `model:` key in `_isrExtractJSON` | L4370 | Removed second key — single `model:` confirmed |
| 2 | `sens2Cell` ternary: second `?` should be `:` | L9081 | Corrected to `:` |
| 3 | LTV double-percent (`65.00%%`) on Slide 6 | L8856 | `_ltv6Raw` strips `%` before appending |
| 4 | `_isrModelBuffer` not persisting across export | L2003 | ArrayBuffer stored in global + STATE['isr'].files['model-buf'] |
| 5 | `panels-container` missing closing `</div>` | L1188 | Tag present: `</div><!-- /panels-container -->` |
| 6 | Slide 4 double-closing paren syntax error | L8787 | Balanced — syntax check passes |

### Outstanding Bugs

| # | Severity | Location | Description | Root Cause | Fix |
|---|---|---|---|---|---|
| 1 | **Medium** | L6820–6825 | `_skillRawOutputs` only written for `isr` and `gavel`. All other 13 skills leave `_skillRawOutputs[toolId] = undefined`. Export functions fall back to empty strings silently. | Streaming handler has hardcoded skill-name checks; no generic write. | After `STATE[_lastRunToolId].result = accumulated`, add `if (_lastRunToolId) _skillRawOutputs[_lastRunToolId] = accumulated;` |
| 2 | **Medium** | L3655 | `_isrParsedData` and `_isrModelBuffer` are lost on page refresh. Forces full re-run to re-enable PPTX export. | Module-scope variables not persisted to localStorage/sessionStorage. | On successful `_isrExtractJSON`, `sessionStorage.setItem('ridge_isr_jd', JSON.stringify(_isrParsedData))`. Restore in `ridgeExportPPT` fallback. |
| 3 | **Low** | L4410 | `buildPPTX()` is dead code — never called. `isrExportPPTX()` calls `ridgeExportPPT()` directly. | Refactor left old function in place. | Remove `buildPPTX()` (~30 lines). |
| 4 | **Low** | L3097 | `case 'scout':` in `buildTrigger` with no matching TOOLS array entry. Card HTML exists in markup (unreachable via `renderTools()`). | Legacy feature stub never completed or removed. | Remove `case 'scout':` block and orphaned card HTML, or add proper TOOLS entry to activate it. |
| 5 | **Low** | L3665 | Supabase project URL `https://ookdsectdhllnhbwrwil.supabase.co` is hardcoded in source. | Single-tenant app; URL is not a secret. | Acceptable as-is. Consider moving to a config constant at top of script for clarity. |
| 6 | **Low** | Multiple | 13 `catch(e) {}` silent blocks make debugging hard. Locations: `loadApiKey` (×2), `loadMapsKey`, `saveApiKey` (×2), `_compressToMemoryBlock`, DS migration (×2), Supabase upsert paths. | Graceful degradation pattern, but zero visibility. | Change to `catch(e) { console.warn('[RIDGE]', e.message); }` throughout. |
| 7 | **Low** | L9421 | GATA auth gate uses `sessionStorage.setItem('ridge_auth', 'true')`. Bypassable via DevTools. | Intentional lightweight gate for internal tool. | Acceptable for internal use. Note: not a security boundary, just a friction layer. |

### Silent Error Handling Inventory
```
loadMapsKey()      — catch(e) {}  — fails silently if Maps config not in Supabase
loadApiKey()       — catch(e) {} ×2 — silent on Anthropic + Voyage key load failure
saveApiKey()       — catch(e) {} ×2 — silent on key upsert failure
_migrateDSState()  — catch(e) {} ×2 — silent on malformed localStorage parse
_compressToMemoryBlock() — catch(e) — falls back to _fallbackCompress (OK)
Supabase upserts   — various catch(e) {} — silent on activity_log, contacts insert
Embedding update   — fire-and-forget, no catch on the Promise chain at L6936
```

---

## Section 3: Data Flow Map

### STATE[toolId] Structure
```javascript
STATE[toolId] = {
  files: {
    [uploadId]: string,      // Parsed text content of uploaded file
    'model-buf': ArrayBuffer // ISR only: raw Excel ArrayBuffer for PPTX cell-ref extraction
  },
  metrics: {                 // Key-value metrics extracted from uploads
    sf, price, psf, irr, em, cap, ltv, yoc, noi, hold, type, address, ...
  },
  result: string             // Full Claude response text (set by runRidgeAPI)
}
```

**Special STATE entries:**
- `STATE['isr'].files['model-buf']` — ArrayBuffer set at L2003 when ISR model uploaded
- `STATE['gavel']._leaseId` — Last inserted lease ID after Gavel extraction
- `STATE['daily-signal']._rows` — DS report rows (L2862)

### `_skillRawOutputs` Lifecycle
| Event | Code Location | Notes |
|---|---|---|
| Declared | Module scope | `var _skillRawOutputs = {}` — empty at page load |
| Written (gavel) | L6822 | `_skillRawOutputs['gavel'] = accumulated` during streaming |
| Written (isr) | L6825 | `_skillRawOutputs['isr'] = accumulated` during streaming |
| **NOT written** | — | All other 13 skills never write to `_skillRawOutputs` — **BUG #1** |
| Read | L8620, 8639, 8823, 8851, 8951, 8995, 9284, 9319 | PPTX builder reads `_skillRawOutputs['isr']` as primary text source |
| Cleared | Never | Persists entire page session |

### `_isrParsedData` Lifecycle
| Event | Code Location | Notes |
|---|---|---|
| Declared | L3654 | `var _isrParsedData = null` |
| Written | L4391 | `_isrParsedData = JSON.parse(clean)` — after successful Call 2 Haiku extraction |
| Read | L4426, L8637, L8779, L9267 | PPTX builder (`jd = _isrParsedData`) |
| Cleared | Never | But lost on page refresh — **BUG #2** |
| Fallback | L8641 | ridgeExportPPT tries to re-parse JSON block from `_skillRawOutputs['isr']` if `jd` null |

### `_isrModelBuffer` Lifecycle
| Event | Code Location | Notes |
|---|---|---|
| Declared | L3655 | `var _isrModelBuffer = null` |
| Written | L2003 | `_isrModelBuffer = e.target.result` (FileReader result — ArrayBuffer) |
| Also written | L2004 | `STATE['isr'].files['model-buf'] = e.target.result` (redundant copy) |
| Read | L8227 | `_extractCashFlows()` — reads model for Slide 8 cash flow table |
| Read | L8263 | `_extractSensitivity()` — reads model for Slide 12 sensitivity |
| Cleared | Never | But lost on page refresh — **BUG #2** |

### localStorage Keys
| Key | Writer | Reader | Purpose |
|---|---|---|---|
| `ridge_pipeline` | `savePipelineDeals()` | `getPipelineDeals()` | Pipeline deal records array |
| `ridge_ds_state` | `saveDailySignalState()` | `getDailySignalState()` | Daily Signal scoring state |
| `ridge_daily_sourced` | `saveDailySourced()` | `getDSTracker()` | Sourced addresses list |
| `ridge_ds_tracker` | `_saveDSTracker()` | `getDSTracker()` | DS tracker entries |
| Legacy keys | — | `_migrateDSState()` | Migrated to new structure on startup |

### sessionStorage Keys
| Key | Value | Purpose |
|---|---|---|
| `ridge_auth` | `'true'` | GATA auth gate dismissed flag |

### Supabase Table Write/Read Map
| Table | Writes | Reads |
|---|---|---|
| `deals` | `_sbUpsertDeal`, `plAddDeal`, `plUpdateDeal`, `plDeleteDeal`, `plSaveEdit` | `_sbLoadDeals`, `_sbSubscribe` (realtime) |
| `leases` | `_writeLeaseRows`, `_llDeleteLease`, `_llSaveEdit`, `deduplicateLeases` (delete) | `_llLoadLeases`, `showLeaseLibrary`, `leaseSemanticSearch` |
| `activity_log` | `_sbUpsertDeal`, `plAddDeal`, `plSaveEdit` | Never read by app |
| `skill_outputs` | `runRidgeAPI` (insert), `histDelete` (delete) | `showHistoryPanel`, `histSemanticSearch` |
| `skill_output_documents` | `runRidgeAPI` (chunk insert) | Never read by app directly |
| `session_state` | `saveApiKey` (Anthropic + Voyage), maps config | `loadApiKey`, `loadMapsKey` |
| `contacts` | `runRidgeAPI` (ISR contact extraction) | Never read by app |

### Data Written But Never Read
- `activity_log` — INSERT only, no UI displays it
- `skill_output_documents` — chunk storage never queried back
- `contacts` table — extracted from ISR, never surfaced in UI

---

## Section 4: API Usage Audit

### Anthropic Claude API — 3 Call Patterns

#### Pattern 1: `runRidgeAPI` (Streaming)
- **Location**: L6739
- **URL**: `https://api.anthropic.com/v1/messages`
- **Model**: `claude-sonnet-4-6` (set in TOOLS array system prompts; ISR uses Opus via template)
- **Streaming**: YES — SSE event stream, `stream: true`
- **Max tokens**: Not explicitly set (uses model default)
- **Headers**: Content-Type, x-api-key, anthropic-version, anthropic-dangerous-direct-browser-access ✓
- **Error handling**: YES — try-catch, `showToast` on failure, progress bar reset
- **Used by**: All 15 skills

#### Pattern 2: `_isrExtractJSON` (Non-streaming, Haiku)
- **Location**: L4358
- **URL**: `https://api.anthropic.com/v1/messages`
- **Model**: `claude-haiku-4-5-20251001`
- **Max tokens**: `8000`
- **Streaming**: NO
- **Headers**: Full set including `anthropic-dangerous-direct-browser-access` ✓
- **Error handling**: try-catch, `console.warn` on failure, `_isrParsedData` stays null
- **Used by**: ISR PPTX export flow (Call 2)

#### Pattern 3: `_compressToMemoryBlock` (Non-streaming, Haiku)
- **Location**: L6687
- **URL**: `https://api.anthropic.com/v1/messages`
- **Model**: `claude-haiku-4-5-20251001`
- **Max tokens**: `120`
- **Streaming**: NO
- **Headers**: Full set ✓
- **Error handling**: try-catch, falls back to `_fallbackCompress()` ✓
- **Used by**: Session log compression after each skill run

### Voyage AI — Embedding API
- **Location**: `_generateEmbedding()` (L6192)
- **URL**: `https://api.voyageai.com/v1/embeddings`
- **Model**: `voyage-large-2`
- **Dimensions**: Not verified in code (relies on API default)
- **Used by**: `histSemanticSearch()`, `leaseSemanticSearch()`, embedding update after skill run (L6936)
- **Issue**: L6936 embedding update is fire-and-forget — `_generateEmbedding(...).then(...update...)` with no `.catch()` on outer promise

### Google Maps — 3 Endpoints
| Endpoint | Location | Purpose |
|---|---|---|
| Geocoding JSON API | L6592 | Convert address → lat/lng |
| Maps Static API (aerial) | L6620 | Satellite tile for property overview |
| Maps Embed API (street view) | L6630 | Street-level view embed |
- **Key loading**: `_mapsKey` loaded from Supabase `session_state` at startup
- **Retry logic**: 3 fallback geocoding attempts (address → address+", USA" → city+state)
- **Error handling**: Each geocode attempt checks `results[0]` before proceeding

### Supabase — Real-time + REST
- **Client init**: `window.supabase.createClient(URL, ANON_KEY)` — URL hardcoded, key from `session_state`
- **RLS**: Not auditable from client code alone — verify in Supabase dashboard
- **Real-time**: `_sbSubscribe()` subscribes to `deals` table channel
- **Upsert conflict keys**: `deals` — `id`; `leases` — `address, tenant`; `session_state` — `id`

---

## Section 5: Dead Code

### Confirmed Dead Functions

#### `buildPPTX()` — Line 4410
```javascript
function buildPPTX() {
  var toolId = 'isr';
  var m = STATE[toolId].metrics;
  // ... 12-slide ISR builder (old implementation)
}
```
**Evidence**: `isrExportPPTX()` (L4403) sets the skill name and calls `ridgeExportPPT()` directly. `buildPPTX()` has zero callers in the codebase. The active 14-slide ISR builder lives inside `ridgeExportPPT()`. `buildPPTX()` should be removed.

#### `case 'scout':` in `buildTrigger` — Line ~3097
The `scout` case generates a sourcing sweep prompt but has no entry in the TOOLS array, meaning no card or panel is rendered. Static card HTML exists in the markup but is outside `panels-container` and not managed by `renderTools()`. This is an incomplete feature.

### Possibly Redundant
- `renderMD(text)` (L4275) — Legacy markdown renderer; `parseMarkdown(text)` (L7123) is the current implementation used in the streaming handler. Verify no callers remain for `renderMD` before removing.
- `extractSec(text, section, max)` vs `_extractKeySection(text, header)` vs `extractSection(text, heading)` — Three functions doing similar section extraction. Used in different contexts; consolidation would reduce surface area.

### Orphaned HTML
- Scout card/panel HTML — present in markup, unreachable via `renderTools()`, outside `panels-container`.

---

## Section 6: Performance Issues

### No Critical Issues Found

| Area | Finding | Severity |
|---|---|---|
| `renderTools()` (L1565) | `document.querySelector` inside TOOLS.forEach loop — acceptable, runs once at init | Low |
| `clearTool()` (L4320) | Queries multiple DOM elements per upload slot — acceptable, user-triggered | Low |
| `buildTrigger` ISR case | Large template literal (~5,000 chars) built on each invocation — acceptable, one-shot | None |
| Streaming handler | `contentEl.innerHTML = parseMarkdown(accumulated)` on every SSE event — re-parses entire response each chunk | Medium |
| `_sfRaw5` in ridgeExportPPT | `document.getElementById('f-isr-sf')` called inside PPTX builder — minor DOM query in build path | Low |
| `showPropertyMap()` | 3 sequential geocode attempts with await — acceptable, user-initiated | None |
| No uncleaned `setInterval` | Confirmed — no `setInterval` without corresponding cleanup | ✓ |
| Supabase queries | `_sbLoadDeals()` loads all deals with no limit — acceptable for small pipeline | Low |
| History query | `skill_outputs` loaded with `.limit(200)` — good | ✓ |
| PDF parsing | `Promise.all` for parallel page parsing — good | ✓ |

### Recommendation
The `innerHTML = parseMarkdown(accumulated)` pattern in the streaming handler re-parses the entire accumulated response string on every SSE event. For long ISR memos (10,000+ chars), this creates O(n²) work. Consider appending only the delta text to the DOM, or throttling re-renders to every N chunks.

---

## Section 7: Security Issues

### Summary: No Critical Vulnerabilities

| Issue | Severity | Finding |
|---|---|---|
| Hardcoded API keys | None | All keys loaded from Supabase `session_state` at runtime ✓ |
| `eval()` or `Function()` usage | None | Neither found in codebase ✓ |
| `innerHTML` with user input | Low | `_hEsc()` used consistently; calculated values (not user strings) in remaining cases ✓ |
| API key exposure in network | Low | Keys sent as HTTP headers in browser; visible in DevTools Network tab — acceptable for internal tool |
| GATA auth gate | Low | `sessionStorage.setItem('ridge_auth', 'true')` — bypassable in DevTools. Not a security boundary; appropriate for internal friction gate |
| Supabase URL hardcoded | Info | `https://ookdsectdhllnhbwrwil.supabase.co` — public project URL, not a secret. Acceptable. |
| Supabase anon key | Info | Loaded at runtime from `session_state`. If `session_state` RLS is improperly configured, the anon key could be exposed to unauthenticated requests. Verify RLS on Supabase dashboard. |
| Voyage/Maps keys | Info | Loaded from Supabase `session_state`. Same RLS consideration applies. |
| CORS | None | Anthropic API requires `anthropic-dangerous-direct-browser-access` header — acknowledged and intentional for browser-direct access ✓ |
| `copyResult()` selector | Info | `document.querySelector("[onclick=\"copyResult('${toolId}')\"]")` — `toolId` comes from TOOLS array (not user input), so no injection risk |

### `_hEsc()` Usage
The function properly escapes `&`, `<`, `>`, and `"`. It is called in history rendering, lease library table rendering, and error message display. The main results panel uses `innerHTML = parseMarkdown(accumulated)` with Claude API output — this is untrusted text rendered as HTML, but the context (internal tool, no multi-user) makes XSS a low practical risk.

---

## Section 8: Skill Completeness Matrix

| Skill ID | Name | buildTrigger | Supabase Write | Excel Export | PDF Export | PPTX Export | History |
|---|---|---|---|---|---|---|---|
| lens | LENS | ✓ | ✗ | ✓ `_exportLens` | ✓ `ridgeExportPDF` | ✗ | ✓ |
| napkin | THE NAPKIN | ✓ | ✗ | ✓ `_exportNapkin` | ✓ `_napkinExportPDF` | ✗ | ✓ |
| waterfall | WATERFALL | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |
| market-pulse | MARKET PULSE | ✓ | ✗ | ✓ `_exportMarket` | ✗ | ✗ | ✓ |
| lease-comp | LEASE COMP MAP | ✓ | ✗ | ✓ `_exportLeaseComp` | ✗ | ✗ | ✓ |
| debt | DEBT TOOL | ✓ | ✗ | ✓ `_exportDebt` | ✗ | ✗ | ✓ |
| isr | ACQ INVESTMENT REPORT | ✓ | ✓ contacts | ✓ `ridgeExportXLS` | ✓ `ridgeExportPDF` | ✓ 14-slide | ✓ |
| loi | LOI GENERATOR | ✓ | ✗ | ✓ `_exportLOI` | ✗ | ✗ | ✓ |
| gavel | THE GAVEL | ✓ | ✓ leases | ✓ `_exportGavel` | ✗ | ✗ | ✓ |
| legal | CRE LEGAL REVIEWER | ✓ | ✗ | ✓ `_exportLegal` | ✗ | ✗ | ✓ |
| daily-signal | DAILY SIGNAL | ✓ | ✗ | ✓ `exportDailySignalXLSX` | ✗ | ✗ | ✓ |
| canvas | CANVAS | ✓ | ✗ | ✓ `_exportCanvas` | ✗ | ✗ | ✓ |
| lease-compare | LEASE NEGOTIATION ANALYZER | ✓ | ✗ | ✓ `_exportLeaseCompare` | ✗ | ✗ | ✓ |
| lease-stack | LEASE STACK ANALYZER | ✓ | ✗ | ✓ `_exportLeaseStack` | ✗ | ✗ | ✓ |
| lease-library | LEASE LIBRARY | ✗ (standalone) | ✓ leases | ✓ `_llExportLeases` | ✗ | ✗ | ✗ |
| scout | (ORPHANED) | ✓ (orphaned) | ✗ | ✗ | ✗ | ✗ | ✗ |

### Notable Gaps
- **Waterfall**: No Excel export, no PDF export, no Supabase persistence
- **Daily Signal**: No PPTX, no PDF
- **LENS**: No PPTX (high-value addition — tear-down results would make a strong 1-pager)
- **All skills except isr/gavel**: `_skillRawOutputs[toolId]` never written (Bug #1) — export functions read undefined
- **Scout**: Defined in buildTrigger, card HTML exists, but no TOOLS entry — effectively invisible

---

## Section 9: Improvement Opportunities

Ranked by impact-to-effort ratio.

### Quick Wins (< 1 hour each)

| # | Improvement | Why It Matters | Complexity |
|---|---|---|---|
| 1 | **Extend `_skillRawOutputs` writes to all skills** | Fixes export fallback text for 13 skills simultaneously. One line: `if (_lastRunToolId) _skillRawOutputs[_lastRunToolId] = accumulated;` after result is persisted. | Trivial |
| 2 | **Replace 13 `catch(e) {}` with `catch(e) { console.warn(...) }`** | Surfaces silent failures during debugging without changing behavior. | Trivial |
| 3 | **Remove `buildPPTX()` dead code** | Eliminates ~30 lines of confusing dead code. | Trivial |
| 4 | **Fix `sens2Cell` null IRR label: `'—'` → `'N/A'`** | Consistent empty state messaging in sensitivity tables. Already partially done. | Trivial |
| 5 | **Add `YOC Yr 3` consistency** | Slide 2 says "YOC Yr 3" now but Slide 14 KPI still says "YOC YR 3" — make labels uniform. | Trivial |

### Medium Effort (1–4 hours each)

| # | Improvement | Why It Matters | Complexity | Dependencies |
|---|---|---|---|---|
| 6 | **Persist `_isrParsedData` to `sessionStorage`** | Page refresh no longer breaks PPTX. Save on successful Call 2; restore in `ridgeExportPPT`. | Low | None |
| 7 | **Persist `_isrModelBuffer` reference** (indirectly via re-upload prompt) | Can't persist ArrayBuffer to storage; instead detect null and show "Re-upload model" prompt instead of silent failure. | Low | None |
| 8 | **Remove `scout` orphan + either activate or delete** | Reduces code confusion. If activating: add TOOLS entry with proper fields. If removing: delete case + card HTML. | Low | Decision: activate or delete |
| 9 | **Consolidate section extractors** | Three functions (`extractSection`, `_extractKeySection`, `extractSec`) do similar things with different signatures. A single `getSectionText(text, heading, maxChars)` reduces maintenance surface. | Medium | Requires updating ~40 call sites |
| 10 | **Add LENS → PPTX single-page export** | Institutional CRE professionals want a formatted tear-down summary they can share. One-slide: verdict, re-underwrite table, max entry price. | Medium | Requires PPTX template design |
| 11 | **Add `activity_log` viewer to Pipeline** | `activity_log` is written on every deal mutation but never displayed. A deal timeline/audit trail is high-value for tracking outreach history. | Medium | None |
| 12 | **Add Waterfall → Excel export** | Waterfall is currently missing all export options. An LBO-style waterfall summary in Excel is standard deliverable. | Medium | None |
| 13 | **Throttle streaming `innerHTML` re-render** | Currently re-parses entire response on every SSE chunk. Throttling to every 5 chunks or 200ms reduces CPU load on long ISR memos. | Low | None |
| 14 | **Add `console.log('[RIDGE] PPTX slide N building...')` trace** | Makes it easy to identify which slide a PPTX build error occurs on without reading a 9,936-line file. | Low | None |

### Strategic (Significant Effort, Transformational Impact)

| # | Improvement | Why It Matters | Complexity | Dependencies |
|---|---|---|---|---|
| 15 | **Migrate all `STATE[toolId]` to Supabase** | Currently all skill results are lost on page refresh. Persisting to `skill_outputs` (already exists) enables cross-device access, history replay, and session continuity. | High | Supabase schema change + RLS review |
| 16 | **Add error telemetry layer** | Silent failures in production are invisible. A lightweight `_logError(context, err)` function that writes to a Supabase `error_log` table gives operational visibility. | Medium | New Supabase table |
| 17 | **Split index.html into modules** | At 9,936 lines, the file is approaching the limit of comfortable single-file development. A `<script src="...">` loader pattern (no build step required) would enable per-skill maintenance without a full bundler. | High | Design decision |
| 18 | **Add PPTX theme configurability** | Currently the Midnight Executive palette is hardcoded. A JSON config object at top of `ridgeExportPPT` would allow palette/font/logo swaps for different fund entities. | Medium | None |
| 19 | **Supabase auth (replace GATA gate)** | Server-side auth via Supabase Auth (magic link or password) would make the platform genuinely multi-user — multiple team members, audit trails per user, RLS by user ID. | High | Supabase Auth setup + RLS rewrite |
| 20 | **Semantic deal search** | Voyage embeddings exist for `skill_outputs`. A deal-search interface ("find deals with >15% IRR in Atlanta under $30M") using vector search on Supabase `pgvector` would unlock institutional memory. | High | Depends on #15 + pgvector extension |

---

*RIDGE Platform Audit — Generated 2026-04-02. Index.html unchanged.*
