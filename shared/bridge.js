// RIDGE Intelligence — Module Bridge
// Imports from shared ES modules and re-exports to window
// so classic-script onclick= handlers continue to work.
// This file is the ONLY type="module" script in index.html.

import { normDSAddr, _parseLeaseDate, _normalizeTenant, plDaysAgo,
         _extractKeySection, fmtUSD, fmtPSF, pct2, mult2, stripMd
       } from './utils.js';
import { _sbUpsertDeal, _sbDeleteDeal } from './supabase.js';
import { showToast, _showModal, _hideModal, closeApiKeyModal
       } from './ui.js';

// Re-export to window so onclick= attributes resolve correctly
Object.assign(window, {
  normDSAddr, _parseLeaseDate, _normalizeTenant, plDaysAgo,
  _extractKeySection, fmtUSD, fmtPSF, pct2, mult2, stripMd,
  _sbUpsertDeal, _sbDeleteDeal,
  showToast, _showModal, _hideModal, closeApiKeyModal
});
