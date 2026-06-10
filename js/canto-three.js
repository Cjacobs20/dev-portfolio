(function () {
  'use strict';

  const canvas    = document.getElementById('buddy-canvas');
  const spriteEl  = document.getElementById('buddy-sprite');
  const miniEl    = document.getElementById('buddy-sprite-mini');

  if (!canvas || typeof THREE === 'undefined') return;

  const TOTAL_FRAMES   = 17;
  const CANVAS_HEIGHT  = 480;
  const PARTICLE_COUNT = 90;

  // ── Renderer ──────────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  let W        = canvas.parentElement.clientWidth || window.innerWidth;
  const H      = CANVAS_HEIGHT;

  const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100);
  camera.position.z = 10;
  renderer.setSize(W, H);

  // ── Particles ─────────────────────────────────────────────────────────────────
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(PARTICLE_COUNT * 3);
  const pVel = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * W;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * H;
    pPos[i * 3 + 2] = -1;
    pVel.push({ x: (Math.random() - 0.5) * 0.3, y: Math.random() * 0.4 + 0.15 });
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat   = new THREE.PointsMaterial({ size: 2.5, color: 0x0af5e7, transparent: true, opacity: 0.45 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // ── State config ──────────────────────────────────────────────────────────────
  const stateMap = {
    idle:    { fps: 8,  bobSpeed: 0.8,  bobAmt: 10, miniAmt: 4,  shake: false, pSpeed: 1.0, pColor: 0x0af5e7, pOpacity: 0.45, filter: 'none' },
    running: { fps: 22, bobSpeed: 0.0,  bobAmt: 0,  miniAmt: 0,  shake: true,  pSpeed: 4.5, pColor: 0x0af5e7, pOpacity: 0.65, filter: 'brightness(1.15)' },
    success: { fps: 6,  bobSpeed: 0.4,  bobAmt: 14, miniAmt: 5,  shake: false, pSpeed: 1.5, pColor: 0x00ff88, pOpacity: 0.55, filter: 'hue-rotate(120deg) brightness(1.1)' },
    failure: { fps: 3,  bobSpeed: 0.15, bobAmt: 3,  miniAmt: 1,  shake: false, pSpeed: 0.3, pColor: 0xff4433, pOpacity: 0.40, filter: 'hue-rotate(320deg) saturate(1.8)' },
  };

  let currentState = 'idle';
  let frameTimer   = null;
  let currentFrame = 0;

  // ── Frame cycling (img swap — reliable across all browsers) ──────────────────
  function startFrameLoop(fps) {
    clearInterval(frameTimer);
    frameTimer = setInterval(() => {
      currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
      const src = `../ANI${currentFrame + 1}.svg`;
      if (spriteEl) spriteEl.src = src;
      if (miniEl)   miniEl.src   = src;
    }, 1000 / fps);
  }

  function applyState(key) {
    currentState = key;
    const cfg = stateMap[key] || stateMap.idle;
    pMat.color.setHex(cfg.pColor);
    pMat.opacity = cfg.pOpacity;
    if (spriteEl) spriteEl.style.filter = cfg.filter;
    if (miniEl)   miniEl.style.filter   = cfg.filter;
    startFrameLoop(cfg.fps);
  }

  document.addEventListener('cantoStateChange', (e) => applyState(e.detail.state));
  applyState('idle');

  // ── Render loop ───────────────────────────────────────────────────────────────
  function animate(t) {
    requestAnimationFrame(animate);

    const cfg = stateMap[currentState] || stateMap.idle;

    // Bob / shake the sprite overlay via CSS transform
    if (spriteEl) {
      const bobY   = cfg.shake ? 0 : Math.sin(t * 0.001 * cfg.bobSpeed) * cfg.bobAmt;
      const shakeX = cfg.shake ? (Math.random() - 0.5) * 6 : 0;
      spriteEl.style.transform = `translate(calc(-50% + ${shakeX}px), calc(-50% + ${bobY}px))`;
    }
    if (miniEl) {
      const bobY   = cfg.shake ? 0 : Math.sin(t * 0.001 * cfg.bobSpeed) * cfg.miniAmt;
      const shakeX = cfg.shake ? (Math.random() - 0.5) * 3 : 0;
      miniEl.style.transform = `translate(${shakeX}px, ${bobY}px)`;
    }

    // Drift particles upward, wrap at top
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPos[i * 3]     += pVel[i].x * cfg.pSpeed;
      pPos[i * 3 + 1] += pVel[i].y * cfg.pSpeed;
      if (pPos[i * 3 + 1] > H / 2) pPos[i * 3 + 1] = -H / 2;
    }
    pGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);

  // ── Resize ────────────────────────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    W = canvas.parentElement.clientWidth || window.innerWidth;
    renderer.setSize(W, H);
    camera.left  = -W / 2;
    camera.right =  W / 2;
    camera.updateProjectionMatrix();
  });
})();
