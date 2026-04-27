# index.html cleanup — remove dead "Launch RIDGE" button styles
#
# The .rl-btn class has CSS rules but no corresponding HTML element or JS handler.
# Confirmed via grep: only the CSS definitions exist; no <button class="rl-btn">,
# no onclick, no event listener references it.
#
# Apply by hand — three CSS lines to delete from index.html:

# DELETE line 57:
.rl-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:var(--navy);padding:11px 24px;border-radius:var(--r);font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap;letter-spacing:.5px;transition:opacity .15s;flex-shrink:0;}

# DELETE line 58:
.rl-btn:hover{opacity:.9;}

# DELETE line 345 (inside @media (max-width:600px)):
  .rl-btn{width:100%;justify-content:center;}

# After deletion, no markup references .rl-btn — safe to remove.
# Suggested commit message:
#   chore: remove dead .rl-btn CSS — no markup or handler references it [approved]
