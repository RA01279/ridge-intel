// ═══════════════════════════════════════════════════════════
//  RIDGE CONFIG — Single source of truth for all constants,
//  design tokens, and investment thresholds.
//  Usage: import { IRR_FLOOR, COLOR_NAVY, ... } from './config.js'
// ═══════════════════════════════════════════════════════════

// ── Investment thresholds ───────────────────────────────────
export const IRR_FLOOR            = 14.75;
export const IRR_TARGET           = 15.0;
export const EQUITY_MULT_MIN      = 1.50;
export const EQUITY_MULT_TARGET   = [1.70, 2.20];
export const YOC_TARGET           = [7.5, 8.0];
export const MAX_LTV              = 65;
export const DSCR_FLOOR           = 1.25;
export const DEAL_MIN             = 10;
export const DEAL_MAX             = 70;
export const HOLD_PERIOD          = 5;

// ── Geography ───────────────────────────────────────────────
export const REGION               = 'Eastern Sunbelt';
export const TARGET_MARKETS       = ['Atlanta', 'Savannah', 'DFW', 'Houston', 'Austin'];
export const TARGET_STATES        = ['GA', 'FL', 'TN', 'NC', 'SC', 'TX'];

// ── Model IDs ───────────────────────────────────────────────
export const MODEL_PRIMARY        = 'claude-sonnet-4-6';
export const MODEL_FAST           = 'claude-haiku-4-5-20251001';
export const VOYAGE_MODEL         = 'voyage-large-2';
export const MAX_TOKENS           = 8000;
export const EMBED_DIM            = 1536;

// ── Supabase (anon key — public by design, RLS enforces access) ─
export const SB_URL               = 'https://ookdsectdhllnhbwrwil.supabase.co';
export const SB_ANON              = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9va2RzZWN0ZGhsbG5oYndyd2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMDgwNzIsImV4cCI6MjA4OTY4NDA3Mn0.NcvazMHBHocJrSdjMJViERttA3lijCXiA3x6x9p6vTM';

// ── Typography ──────────────────────────────────────────────
export const FONT_HEADER          = 'Cambria';
export const FONT_BODY            = 'Calibri';
export const FONT_BODY_LIGHT      = 'Calibri Light';

// ── Font sizes pt (PPTX) ────────────────────────────────────
export const FS_TITLE             = 36;
export const FS_H2                = 24;
export const FS_H3                = 18;
export const FS_BODY              = 13;
export const FS_KPI               = 48;
export const FS_LABEL             = 11;
export const FS_FOOTER            = 9;

// ── Font sizes px (web) ─────────────────────────────────────
export const FS_WEB_H1            = 28;
export const FS_WEB_H2            = 22;
export const FS_WEB_H3            = 17;
export const FS_WEB_BODY          = 14;
export const FS_WEB_KPI           = 42;
export const FS_WEB_LABEL         = 12;

// ── Color palette — Midnight Executive ──────────────────────
export const COLOR_NAVY           = '1E2761';
export const COLOR_ICE_BLUE       = 'CADCFC';
export const COLOR_WHITE          = 'FFFFFF';
export const COLOR_GRAY           = '555555';
export const COLOR_GREEN          = '1B7A34';
export const COLOR_AMBER          = 'E67E22';
export const COLOR_RED            = 'C0392B';
export const COLOR_ROW_ALT        = 'F0F4FF';
export const COLOR_ROW_WHITE      = 'FFFFFF';
export const COLOR_HEADER_BG      = '1E2761';
export const COLOR_HEADER_TXT     = 'FFFFFF';
