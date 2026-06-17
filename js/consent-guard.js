// ── CJ CONSENT GUARD ──
// Shows a legal consent overlay before granting access to photography and art pages.
// Bypasses the password gate — clicking "Continue" is the only requirement.
// Consent is stored in sessionStorage per section (tab close = re-prompt).
//
// Usage: set window.CJ_SECTION before including this script.

(function () {
  const section = window.CJ_SECTION;
  if (!section) return;

  const storageKey = 'cj-consent-' + section;
  if (sessionStorage.getItem(storageKey) === 'true') return;

  const SECTION_LABELS = {
    art:   { eyebrow: 'Fine Art & Illustration', title: 'Before you <em>continue.</em>' },
    photo: { eyebrow: 'Photography',             title: 'Before you <em>continue.</em>' },
  };
  const label = SECTION_LABELS[section] || { eyebrow: 'Gallery', title: 'Before you <em>continue.</em>' };

  const overlay = document.createElement('div');
  overlay.id = 'cj-consent-overlay';
  overlay.innerHTML = `
    <div class="cco-box">
      <div class="cco-glow"></div>
      <div class="cco-eyebrow">${label.eyebrow}</div>
      <h1 class="cco-title">${label.title}</h1>
      <p class="cco-body">
        All images, artwork, and creative content displayed in this gallery are the exclusive
        intellectual property of <strong>Chris Jacobs</strong> and are protected by copyright law.
        By continuing, you acknowledge and agree that:
      </p>
      <ul class="cco-list">
        <li>Content may not be scraped, harvested, or collected by automated means.</li>
        <li>Content may not be reproduced, replicated, or distributed without explicit written consent.</li>
        <li>Content may not be used for training AI/ML models or any commercial purpose.</li>
      </ul>
      <p class="cco-body cco-fine">
        Viewing is permitted for personal, non-commercial use only.
        All rights reserved &copy; Chris Jacobs.
      </p>
      <button class="cco-btn" id="ccoAccept">I understand &mdash; Continue</button>
      <a href="../index.html" class="cco-back">&larr; Go back</a>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #cj-consent-overlay {
      position: fixed;
      inset: 0;
      background: var(--bg, #111);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      font-family: 'DM Sans', sans-serif;
    }
    .cco-box {
      width: 100%;
      max-width: 480px;
      border: 1px solid var(--border-mid, #333);
      border-radius: 8px;
      padding: 48px 40px;
      background: var(--bg-2, #181818);
      position: relative;
    }
    .cco-glow {
      position: absolute;
      top: -60px; left: 50%;
      transform: translateX(-50%);
      width: 220px; height: 220px;
      background: radial-gradient(circle, var(--glow, rgba(180,255,120,0.08)) 0%, transparent 70%);
      pointer-events: none;
    }
    .cco-eyebrow {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      color: var(--accent, #b4ff78);
      letter-spacing: 0.16em;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cco-eyebrow::before {
      content: '';
      display: block;
      width: 16px; height: 1px;
      background: var(--accent, #b4ff78);
    }
    .cco-title {
      font-family: 'DM Serif Display', serif;
      font-size: 30px;
      color: var(--text-1, #f0f0f0);
      letter-spacing: -0.02em;
      margin-bottom: 20px;
      line-height: 1.1;
    }
    .cco-title em { color: var(--accent, #b4ff78); font-style: italic; }
    .cco-body {
      font-size: 13px;
      color: var(--text-2, #aaa);
      line-height: 1.65;
      margin-bottom: 14px;
    }
    .cco-body strong { color: var(--text-1, #f0f0f0); }
    .cco-list {
      margin: 0 0 16px 0;
      padding-left: 18px;
      font-size: 13px;
      color: var(--text-2, #aaa);
      line-height: 1.8;
    }
    .cco-fine {
      font-size: 11px;
      color: var(--text-3, #666);
      margin-bottom: 28px;
    }
    .cco-btn {
      width: 100%;
      padding: 13px;
      background: var(--accent, #b4ff78);
      color: #000;
      border: none;
      border-radius: 4px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: opacity 0.2s;
      display: block;
    }
    .cco-btn:hover { opacity: 0.82; }
    .cco-back {
      display: block;
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: var(--text-3, #666);
      text-decoration: none;
      letter-spacing: 0.04em;
      transition: color 0.2s;
    }
    .cco-back:hover { color: var(--text-2, #aaa); }
  `;

  document.head.appendChild(style);
  document.body.insertBefore(overlay, document.body.firstChild);

  document.getElementById('ccoAccept').addEventListener('click', function () {
    sessionStorage.setItem(storageKey, 'true');
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';
    setTimeout(function () { overlay.remove(); }, 300);
  });
})();
