// RIDGE Intelligence — Supabase Client & Database Layer
// Handles client initialization and all named CRUD functions.
// No DOM manipulation. No Anthropic API calls. No STATE writes.
// Imported by skills during modular refactor Phase 2.

// ── Client state ────────────────────────────────────────────
// These are re-exported so callers can read connection status
// without importing the raw globals from index.html.
export let _sb = null;
export let _sbOk = false;

// ── Client initialization ────────────────────────────────────
// Creates the Supabase client and probes the deals table to
// confirm connectivity. Sets _sb and _sbOk in module scope.
// DOM indicator update and post-init callbacks (_sbLoadDeals,
// _sbSubscribe) remain in _sbInit() in index.html — those are
// mixed concerns handled at the app-shell level.
export async function initSupabase(url, anonKey) {
  try {
    if (!window.supabase) { _sbOk = false; return; }
    _sb = window.supabase.createClient(url, anonKey);
    var { error } = await _sb.from('deals').select('id').limit(1);
    _sbOk = !error;
  } catch(e) { _sbOk = false; }
}

// ── deals table ──────────────────────────────────────────────

// Upsert a pipeline deal record and append an activity_log entry.
// Pure CRUD — no DOM, no STATE reads, no localStorage.
export async function _sbUpsertDeal(deal) {
  if (!_sbOk || !_sb) return;
  var payload = {
    id: deal.id,
    address: deal.addr || null,
    asset_type: deal.type || null,
    asking_price: deal.price ? parseFloat(String(deal.price).replace(/[$,]/g, '')) : null,
    sf: deal.sf ? parseFloat(deal.sf.toString().replace(/,/g, '')) : null,
    market: deal.mkt || null,
    stage: deal.stage || 'Initial Screen',
    conviction: deal.conv || null,
    broker: deal.broker || null,
    notes: deal.notes || null,
    data: { nextDate: deal.nextDate || null },
    created_at: deal.createdAt,
    updated_at: deal.updatedAt
  };
  console.log('[RIDGE] DEALS PAYLOAD:', JSON.stringify(payload));
  var result = await _sb.from('deals').upsert(payload, { onConflict: 'id' });
  console.log('[RIDGE] DEALS RESULT:', JSON.stringify(result));
  if (result.error) {
    console.error('[RIDGE] DEALS ERROR:', JSON.stringify(result.error));
    return;
  }
  // Only log activity AFTER successful deal upsert
  var logResult = await _sb.from('activity_log').insert({
    deal_id: deal.id,
    action: 'Deal added',
    notes: deal.addr
  });
  if (logResult.error) {
    console.warn('[RIDGE] activity_log failed:', JSON.stringify(logResult.error));
  }
}

// Delete a pipeline deal record by id.
// Pure CRUD — no DOM, no STATE reads.
export async function _sbDeleteDeal(id) {
  if (!_sbOk || !_sb) return;
  var result = await _sb.from('deals').delete().eq('id', id);
  if (result.error) console.warn('[RIDGE] deal delete failed:', JSON.stringify(result.error));
}
