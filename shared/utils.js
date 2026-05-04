// RIDGE Intelligence — Shared Utilities
// Pure functions only. No DOM, no API, no Supabase, no STATE.
// Imported by skills during modular refactor Phase 2.

// ── String normalization ────────────────────────────────────

// Normalize a Daily Signal address for deduplication:
// lowercase, trim, collapse internal whitespace.
export function normDSAddr(a) {
  return (a||'').toLowerCase().trim().replace(/\s+/g,' ');
}

// Normalize tenant name: trim, remove trailing punctuation/asterisks,
// standardize common legal suffix variations so dedup works correctly.
export function _normalizeTenant(name) {
  if (!name) return name;
  return name
    .trim()
    .replace(/\*+$/, '')                          // strip trailing asterisks (Argus vacant marker)
    .trim()
    .replace(/\bCorporation\b/gi, 'Corp')          // Corporation → Corp
    .replace(/\bIncorporated\b/gi, 'Inc')          // Incorporated → Inc
    .replace(/\bL\.L\.C\.\b/gi, 'LLC')            // L.L.C. → LLC
    .replace(/\bL\.L\.C\b/gi, 'LLC')
    .replace(/\bLimited\b/gi, 'Ltd')
    .replace(/[.,]+$/, '')                         // strip trailing . or ,
    .trim();
}

// Strip markdown emphasis, headers, and backticks from a string.
export function stripMd(s) {
  return String(s||'').replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1').replace(/#{1,6}\s/g,'').replace(/`/g,'').trim();
}

// ── Date parsing / formatting ───────────────────────────────

// Parse a human-readable lease date string to ISO format.
// "Jan 2025" → "2025-01-01", already-ISO pass-through, null if unparseable.
export function _parseLeaseDate(str) {
  if (!str) return null;
  str = String(str).trim();
  // ISO: 2024-03-01
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  // M/D/YYYY or MM/DD/YYYY
  var mdy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mdy) return mdy[3]+'-'+String(mdy[1]).padStart(2,'0')+'-'+String(mdy[2]).padStart(2,'0');
  // Quarter: Q1 2024, Q2-2025, Q2 2025, 1Q24, 2Q 2025
  var qtr = str.match(/[Qq]([1-4])[\s\-\/]*(20\d{2}|\d{2})/);
  if (!qtr) qtr = str.match(/([1-4])[Qq][\s\-\/]*(20\d{2}|\d{2})/);
  if (qtr) {
    var q = parseInt(qtr[1]);
    var yr = qtr[2].length===2 ? '20'+qtr[2] : qtr[2];
    var mo = [null,'01','04','07','10'][q];
    return yr+'-'+mo+'-01';
  }
  // Mon-YYYY or Mon YYYY: Jan-2024, March 2025
  var MONTHS = {jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'};
  var myr = str.match(/^([A-Za-z]{3,9})[\s\-\/]+(20\d{2}|\d{2})$/);
  if (myr) {
    var mk = myr[1].slice(0,3).toLowerCase();
    var yr2 = myr[2].length===2 ? '20'+myr[2] : myr[2];
    if (MONTHS[mk]) return yr2+'-'+MONTHS[mk]+'-01';
  }
  // YYYY only: 2024
  if (/^20\d{2}$/.test(str)) return str+'-01-01';
  // Excel serial number
  var serial = parseFloat(str);
  if (!isNaN(serial) && serial > 40000 && serial < 60000) {
    var d = new Date(Math.round((serial - 25569) * 86400 * 1000));
    return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0');
  }
  return null;
}

// Return a human-readable relative date: "today", "1 day ago", "N days ago".
export function plDaysAgo(iso) {
  if (!iso) return '';
  var diff = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (diff === 0) return 'today';
  if (diff === 1) return '1 day ago';
  return diff + ' days ago';
}

// ── Number / currency / percentage formatting ───────────────

// Format a value as USD: strips $, commas, spaces; rounds to integer.
// "$1,250,000" or 1250000 → "$1,250,000". Returns "—" for empty/dash input.
export function fmtUSD(v) {
  if (!v || v === '—') return '—';
  var raw = String(v).replace(/[$,\s]/g,'');
  var n = parseFloat(raw);
  return isNaN(n) ? '$' + raw : '$' + Math.round(n).toLocaleString('en-US');
}

// Format a value as price-per-square-foot.
// 85 or "$85" → "$85 PSF". Returns "—" for empty/dash input.
export function fmtPSF(v) {
  if (!v || v === '—') return '—';
  var raw = String(v).replace(/[$,\s]/g,'');
  var n = parseFloat(raw);
  return isNaN(n) ? '$' + raw + ' PSF' : '$' + Math.round(n).toLocaleString('en-US') + ' PSF';
}

// Format a value as a percentage to two decimal places.
// 14.75 or "14.75%" → "14.75%". Returns "—" for non-numeric input.
export function pct2(v) {
  var n = parseFloat(String(v||'').replace(/[%\s]/g,''));
  return isNaN(n) ? (String(v||'')||'—') : n.toFixed(2)+'%';
}

// Format a value as an equity multiple to two decimal places.
// 1.85 or "1.85x" → "1.85×". Returns "—" for non-numeric input.
export function mult2(v) {
  var n = parseFloat(String(v||'').replace(/[x×\s]/g,''));
  return isNaN(n) ? (String(v||'')||'—') : n.toFixed(2)+'×';
}

// ── Section extraction ──────────────────────────────────────

// Extract a named markdown section (## HEADER ... next ##) from text.
// Returns up to 3000 chars of the section, or '' if not found.
export function _extractKeySection(text, header) {
  var idx = text.indexOf('## ' + header);
  if (idx === -1) idx = text.indexOf('# ' + header);
  if (idx === -1) return '';
  var next = text.indexOf('\n## ', idx + 4);
  if (next === -1) next = text.indexOf('\n# ', idx + 4);
  return next > -1 ? text.slice(idx, next) : text.slice(idx, idx + 3000);
}
