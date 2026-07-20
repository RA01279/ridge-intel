---
name: salvage
description: >-
  RIDGE's distressed and bankruptcy acquisition sourcing engine. Activates on any request to find IOS (Industrial Outdoor Storage) or industrial/flex acquisition targets coming out of bankruptcy — either the distressed assets/properties themselves being sold via Section 363, or a company that recently acquired another business and has since filed for bankruptcy (the acquired unit often gets carved out and resold). Trigger phrases -- run SALVAGE, distressed acquisitions, bankruptcy sourcing, 363 sale targets, companies for sale in bankruptcy, find distressed IOS, buy-then-bankrupt, stalking horse, bid procedures. Do NOT use for general bankruptcy law research or single-case summaries — this is a sourcing engine, not a legal research tool.
---

# SALVAGE — Distressed & Bankruptcy Acquisition Sourcing

RIDGE's dedicated engine for surfacing acquisition targets created by bankruptcy proceedings. SALVAGE hunts inside Chapter 11 (and occasionally Chapter 7 / receivership) dockets — RIDGE evaluates against Dalfen's IOS and industrial/flex investment criteria.

## The two target patterns

**Pattern A — Direct 363 sale.** The debtor itself is selling assets, a business line, real estate, or the whole company through the bankruptcy sale process. Signals: "363 sale," "bid procedures order," "stalking horse bidder," "asset purchase agreement," "sale hearing," "auction date."

**Pattern B — Buy-then-bankrupt.** A company (often a PE-backed roll-up or leveraged acquirer) bought another business within roughly the last 1–4 years, and the combined/parent entity has since filed for bankruptcy. The originally-acquired unit — or the whole platform — frequently gets carved out and resold during the case. Signals: a recent M&A announcement followed later by a Chapter 11 filing from the same entity, parent, or PE sponsor.

Screen for both patterns unless the user specifies otherwise.

## Fit against RIDGE criteria

Apply Dalfen's actual thresholds, not generic distressed-deal criteria:

- **Asset types**: Industrial, Flex Industrial, Industrial Outdoor Storage (IOS), single-story office (conversion candidates only)
- **IOS deal size**: $2M+, no ceiling (per SCOUT's IOS mandate)
- **General industrial/flex deal size**: $10M–$70M, sweet spot $25M–$35M
- **Markets**: Dallas–Fort Worth, Houston, Austin, San Antonio, and Atlanta (Dalfen's target footprint)
- A bankruptcy case outside these markets or asset types is still worth flagging as **Watch List** if the signal is strong, but should not be scored as High Conviction

## Workflow

1. **Clarify scope if not given**: sector/asset type, market, deal size floor, and lookback window (default: filings or sale motions in the last 90 days). Don't block on this — use sensible defaults and state the assumption.
2. **Search broadly, then narrow.** Use short queries (1–6 words), iterating rather than repeating:
   - `"363 sale" industrial [market] 2026`
   - `stalking horse bid IOS`
   - `bid procedures order [month/year]`
   - `Chapter 11 filing industrial outdoor storage`
   - `[company name] bankruptcy` (for any flagged recent acquirer)
   - `PE roll-up bankruptcy industrial 2026`
3. **Prioritize these source types** — pull full content with fetch tools once a candidate surfaces, since snippets are usually too thin:
   - CourtListener, Law360, Reorg, Debtwire, Bloomberg Law for docket-level detail
   - MarketScreener's "Bidding Procedure Approved for [Company]" writeups — consistently structured, includes purchase price, stalking horse, qualified-bid deadline, auction/sale hearing dates
   - SEC EDGAR full-text search (efts.sec.gov) for 8-Ks mentioning "Chapter 11" or "363"
   - Trade press for the buy-then-bankrupt pattern: PitchBook, Axios Pro Rata for the original acquisition, then general news for the later filing
   - Do NOT use PACER directly (paywalled) — rely on free mirrors and news coverage of docket events
4. **For each candidate, extract**: debtor name(s) and parent/sponsor, court and docket number, filing date and chapter, which pattern (A/B/both), what's for sale or what was acquired and when, key dates (bid deadline, auction, sale hearing), stalking horse bidder and price, source links.
5. **Rank by actionability, not recency.** A case with a sale hearing next week outranks one still in first-day motions with no timeline.

## Output format

A ranked table matching RIDGE's Daily Prospect Report conventions:

| # | Debtor | Pattern | Court / Docket | Asset Type | Market Fit | Sale Timeline | Key Facts | Conviction | Source |
|---|--------|---------|-----------------|------------|------------|----------------|-----------|------------|--------|

- **Conviction**: High / Needs More Data / Watch List — state explicitly for every row, per RIDGE's conviction framework
- Below the table: 2–3 sentences on the most actionable lead(s) and why (imminent hearing, competitive auction, strong asset/market fit)
- If a search comes back thin, say so plainly rather than padding the table — false positives are costly in sourcing

## RIDGE integration

- High Conviction rows are candidates for direct push into the Deal Pipeline (see webapp integration — `salvagePushToPipeline()`) with Stage = "Initial Screen" and Conviction carried over
- Basis reconstruction and price ceiling logic from the core RIDGE underwriting engine apply once a SALVAGE lead moves to full underwriting
- SALVAGE leads should be cross-referenced against existing Pipeline entries before insert to avoid duplicates (match on debtor name / address)

## Caveats to state to the user

- Investment research, not legal or investment advice — verify docket details directly against the court record before acting
- Free/news sources can lag actual docket activity by days; for time-sensitive items (bid deadlines) flag that the user should confirm directly on the docket
- Bankruptcy sales fall through, get re-bid, or convert to liquidation — a SALVAGE lead is a lead, not a closed deal
