---
name: daily-signal
description: >
  DAILY SIGNAL is RIDGE's daily acquisition lead generator. Use this skill whenever the user
  uploads CoStar export files and asks for daily prospects, sourcing leads, or a morning report.
  Reads CoStar XLSX exports, scores every property against RIDGE acquisition signals, and outputs
  a ranked table of the top 15 prospects with owner contact info. Always produces the same
  structured output format. Trigger on any request for daily leads, morning sourcing, CoStar
  analysis, or prospect scoring.
---

# DAILY SIGNAL — Daily Acquisition Prospect Scorer

## What This Skill Produces

A ranked table of the **top 15 acquisition prospects** from uploaded CoStar export data, scored
by distress and opportunity signals aligned to RIDGE criteria.

---

## Input Format

CoStar XLSX exports with the following columns (use whatever is present):
- Property Address, City, Submarket Name
- RBA (rentable building area SF)
- Total Available Space (SF), Vacancy %, Percent Leased
- Rent/SF/Yr
- For Sale Price, For Sale Status
- Last Sale Date, Last Sale Price
- Year Built, Ceiling Ht, Number Of Loading Docks, Drive Ins
- Recorded Owner Name, Recorded Owner Phone, Recorded Owner Address

---

## Scoring System

Score every property from 0–15 points. Higher = stronger signal.

| Signal | Points |
|---|---|
| Vacancy % ≥ 30% | 4 |
| Vacancy % 15–29% | 2 |
| For Sale Status = Yes | 4 |
| Last Sale Date > 10 years ago | 3 |
| Last Sale Date 5–10 years ago | 2 |
| RBA between 15,000–200,000 SF | 1 |
| Owner phone number present | 1 |
| Rent/SF below $10.00 NNN | 1 |
| Year Built before 1995 | 1 |

Disqualify (score = 0, exclude from output):
- RBA < 10,000 SF or > 300,000 SF
- Percent Leased = 100% AND For Sale = No AND Vacancy = 0
- Property Type not Industrial or Flex

---

## Output Format

Always produce this exact structure:

### DAILY SIGNAL REPORT — [Date] · [File Count] Files · [Total Properties] Properties Screened

---

**TOP 15 PROSPECTS**

| Rank | Score | Address | City | Submarket | RBA (SF) | Vacancy % | Avail SF | Last Sale | Owner | Phone | Why |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 12 | 123 Industrial Blvd | Savannah | Savannah Port | 85,000 | 34% | 29,000 | 2011 | Smith Holdings LLC | 912-555-0100 | High vacancy + 13yr hold + phone |
...

---

**SIGNAL SUMMARY**
- Properties screened: X
- Properties disqualified: X
- Scoreable prospects: X
- Top signal: [address] at [score] points

**MARKET PATTERNS**
2–3 bullet observations about what the data shows across all files (vacancy trends, submarket concentration, owner type patterns).

**OUTREACH PRIORITY**
Top 3 prospects to call today. For each: one sentence on the specific angle to lead with based on their signal.

---

## Re-Signal Rule

If a property appears in the "Previously Sourced" list, exclude it from the top 15 UNLESS:
- Vacancy % has increased by 5+ points since likely last run
- For Sale status is now Yes (was No before)
- A new owner appears (ownership transfer signal)

If a previously sourced property re-qualifies, flag it clearly: **⚡ RE-SIGNAL** with a note on what changed.

---

## Workflow

After each daily run, copy the 15 surfaced addresses into the "Previously Sourced" field for the next run. This keeps the list fresh — you will never see the same property twice unless it earns its way back with a new signal.

---

## Notes

- If owner phone is missing, note "No direct contact — research via county records"
- If multiple files cover the same submarket, deduplicate by address
- Flag any property that appears in multiple files (signals active monitoring)
- Use today's date in the report header
- Round all SF to nearest 100, percentages to one decimal
