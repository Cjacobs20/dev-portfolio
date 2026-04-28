// ── CJ AUTH GUARD ──
// Include this script at the top of any protected page.
// Set window.CJ_SECTION to the section key before including,
// or pass it as a data attribute on the script tag.
//
// Usage in HTML:
//   <script>window.CJ_SECTION = 'art';</script>
//   <script src="../js/auth-guard.js"></script>
//
// Sessions persist for the browser session (tab close = re-auth required).

(function() {
  const section = window.CJ_SECTION;
  if (!section) return;
  if (sessionStorage.getItem('cj-auth-' + section) !== 'true') {
    window.location.replace('gate.html?section=' + section);
  }
})();
