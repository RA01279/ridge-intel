-- SCOUT v1 — properties table additions for verified enrichment writes
-- Applied: 2026-05-18 via Supabase MCP apply_migration
-- Existing properties.embedding is vector(1024) and matches voyage-3-large default; no dimension change needed.

-- 1. New columns for SCOUT-specific signal tracking
alter table public.properties
  add column if not exists private_owner_flag        boolean,
  add column if not exists long_hold_flag            boolean,
  add column if not exists vacancy_signal            boolean,
  add column if not exists below_market_rent_flag    boolean,
  add column if not exists permit_inactivity_flag    boolean,
  add column if not exists debt_maturity_within_18_mo boolean,
  add column if not exists cmbs_watchlist_flag       boolean,
  add column if not exists owner_age_estate_flag     boolean,
  add column if not exists tax_delinquent_flag       boolean,
  add column if not exists last_scout_run_at         timestamptz,
  add column if not exists last_scout_run_id         uuid references public.skill_outputs(id) on delete set null,
  add column if not exists enriched_owner_intel      jsonb,
  add column if not exists outreach_angle            text,
  add column if not exists outreach_priority         text
    check (outreach_priority in ('CRITICAL','URGENT','HIGH','MONITOR') or outreach_priority is null),
  add column if not exists cited_sources             jsonb;

-- 2. Address uniqueness for upsert (partial unique index — tolerates NULL addresses)
create unique index if not exists properties_address_unique
  on public.properties (lower(address))
  where address is not null;

-- 3. Index for SCOUT result queries (panel rendering)
create index if not exists properties_scout_run_idx
  on public.properties (last_scout_run_at desc, signal_score desc)
  where last_scout_run_at is not null;

-- 4. Index for outreach prioritization
create index if not exists properties_outreach_idx
  on public.properties (outreach_priority, signal_score desc)
  where outreach_priority is not null;

-- 5. Mark signal_reports as deprecated (kept for audit; no new writes after SCOUT ships)
comment on table public.signal_reports is
  'DEPRECATED 2026-05-18 — replaced by SCOUT writes to properties table. Retained for audit trail of pre-SCOUT runs.';
