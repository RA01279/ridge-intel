-- SALVAGE v1 — dedup / surfacing ledger for distressed & bankruptcy leads
-- Applied: 2026-07-20 via Supabase MCP apply_migration
-- Tracks debtors SALVAGE has surfaced so repeat runs can dedupe and record
-- how many times a lead has appeared and whether it was pushed to the pipeline.

create table if not exists salvage_leads_seen (
  id uuid primary key default gen_random_uuid(),
  debtor_name text not null,
  court_docket text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  times_surfaced int not null default 1,
  pushed_to_pipeline boolean not null default false
);

create unique index if not exists salvage_leads_seen_debtor_idx
  on salvage_leads_seen (lower(debtor_name));
