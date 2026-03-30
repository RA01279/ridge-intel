# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

RIDGE Intelligence is a **single-file, browser-based** acquisition intelligence platform for commercial real estate. The entire application lives in `index.html` — no build step, no backend, no package manager. Open the file directly in a browser.

All dependencies are loaded via CDN:
- XLSX / ExcelJS — Excel parsing and export
- PPTXGEN — PowerPoint generation
- PDF.js — PDF handling
- Docx — Word document generation

## Development Workflow

- **Run:** Open `index.html` directly in a browser (no server needed)
- **Edit:** Modify `index.html` directly; reload the browser to see changes
- **No build, lint, or test commands exist**

## Architecture

### Single-File Application
`index.html` (240KB) is monolithic — all CSS, JavaScript, and HTML are embedded. It contains the full UI, skill panel logic, file parsers, export functions, and the deal pipeline CRM.

### Skill System
Each analytical module is a "skill." All active skills live as `SKILL.md` files inside subdirectories of `ridge-intel/`, or as flat `.md` files in the repo root for legacy skills.

> **Note:** `Desktop/Claude/RIDGE/` is a stale directory and should not be used. All active skills live in `ridge-intel/`.

Active skills and their paths:
| Skill | File | Purpose |
|---|---|---|
| RIDGE | `RIDGE_SKILL.md` | Core deal analysis engine, conviction framework |
| Canvas | `Canvas_SKILL.md` | Tenant intelligence, displacement scoring |
| Pipeline | `pipeline/SKILL.md` | Deal CRM, kanban stages, outreach logging |
| Daily Signal | `daily-signal/SKILL.md` | CoStar XLSX parsing, prospect scoring (0–15 pts) |
| Waterfall | `waterfall/SKILL.md` | GP/LP distribution waterfall, IRR tiers, LP assessment |
| LOI Generator | `loi-generator/SKILL.md` | Letter of intent automation |
| Napkin | `napkin/SKILL.md` | 60-second deal screen, back-of-envelope underwriting |
| Debt Tool | `debt-tool/SKILL.md` | Capital stack modeling, debt scenarios |
| Market Pulse | `market-pulse/SKILL.md` | Submarket intelligence, vacancy/rent benchmarks |
| DD Tracker | `dd-tracker/SKILL.md` | Due diligence checklist and tracking |
| Deal Memory | `deal-memory/SKILL.md` | Session memory, pipeline context |
| Acq Investment Report | `acq-investment-report/SKILL.md` | IC deck generation (PPTX) |
| The Gavel | `the-gavel/SKILL.md` | Lease abstraction, rent roll analysis |
| CRE Legal Reviewer | `cre-legal-reviewer/SKILL.md` | PSA/JV/loan document review |
| LENS | `lens/SKILL.md` | Broker OM teardown, re-underwrite at RIDGE criteria |
| SCOUT | `scout/SKILL.md` | Off-market sourcing, owner enrichment, submarket sweep |
| Lease Comp Map | `lease-comp-map/SKILL.md` | Comp analysis, rent benchmarking (HTML + PDF) |

### Data Persistence
localStorage is the current persistence layer (migration to Supabase Postgres underway). Target state: all deal pipeline, session state, and user data persisted to Supabase with real-time sync across devices.

### Data Flow
```
CoStar XLSX upload
  → Daily Signal / Canvas (scoring)
  → RIDGE (conviction assessment)
  → Pipeline (stage tracking)
  → Export (Excel / PDF / PPTX / DOCX)
```

## Investment Criteria (Hardcoded Into System Logic)

These thresholds are referenced throughout the skills and should not be changed without intentional business decision:
- **Target markets:** Atlanta (primary), Savannah (primary), DFW, Houston, Austin (watch)
- **Deal size sweet spot:** $25M–$35M (full range $10M–$70M)
- **IRR floor:** 14.75% (stretch; requires explicit justification)
- **Target IRR:** 15%+ over 60 months
- **Equity multiple:** 1.8×–2.2×
- **Year 3/4 YOC target:** 7.5%–8.0%
- **Sourcing:** 95% non-marketed / off-market

## Output Quality Standard

All output-producing skills reference `output-standard/STANDARD.md`.

This file defines formatting, color palette (Midnight Executive), typography, data integrity rules, and QA protocol for all PPTX, PDF, and Excel deliverables. It supersedes any defaults in individual skill files.

Skills covered: acq-investment-report, the-gavel, cre-legal-reviewer, lens, scout, lease-comp-map, canvas, napkin, market-pulse, dd-tracker, debt-tool.

## Key Files

- `index.html` — entire application
- `napkin.html` — standalone quick math/modeling tool
- `RIDGE_SKILL.md` — core RIDGE identity, session structure, sourcing framework, conviction states
- `Canvas_SKILL.md` — tenant intelligence system (Fill mode vs. Hunt mode, scoring tiers)
- `pipeline/SKILL.md` — pipeline stage definitions, deal record schema, command parsing
- `daily-signal/SKILL.md` — CoStar scoring rules, re-signal logic
- `waterfall/SKILL.md` — GP/LP waterfall structure, tier calculations, LP/GP assessment framework
- `output-standard/STANDARD.md` — universal output quality standard (PPTX, PDF, Excel)
- `.claude/settings.json` — project-level Claude Code permissions

## Pipeline Stage Sequence

`WATCH → OUTREACH → MEETING → LOI → DD → IC → CLOSING → CLOSED / DEAD`

Conviction badges: High Conviction (gold) / Needs More Data (blue) / Watch List (green)
