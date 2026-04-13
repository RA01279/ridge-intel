// RIDGE Intelligence — Shared UI Primitives
// Toast notifications, modals, spinners, DOM helpers.
// No Supabase calls. No Anthropic API calls. No STATE reads/writes.
// Imported by skills during modular refactor Phase 2.

// ── Toast notification ──────────────────────────────────────
// Shows a fixed-position toast at bottom-right. Auto-dismisses
// after 4 seconds. Creates the element on first call if absent.
export function showToast(msg) {
  var t = document.getElementById('ridge-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'ridge-toast';
    t.style.cssText = 'position:fixed;bottom:28px;right:28px;background:var(--navy);border:1px solid var(--blue);color:var(--text);padding:13px 20px;border-radius:var(--r);font-size:13px;z-index:9999;opacity:0;transition:opacity .3s;max-width:380px;line-height:1.5;box-shadow:0 4px 20px rgba(0,0,0,.4)';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 4000);
}

// ── Generic modal open / close ──────────────────────────────
// Adds or removes the 'show' CSS class on any modal element by id.
// All RIDGE modals (apikey-modal, hist-panel, lease-panel,
// ridge-response-panel) use this single pair of primitives.
export function _showModal(id) { var el = document.getElementById(id); if (el) el.classList.add('show'); }
export function _hideModal(id) { var el = document.getElementById(id); if (el) el.classList.remove('show'); }

// ── API key modal ───────────────────────────────────────────
// Thin wrapper — closes the API key / settings modal.
export function closeApiKeyModal() {
  _hideModal('apikey-modal');
}
