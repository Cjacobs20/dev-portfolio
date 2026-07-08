(function () {
  'use strict';

  const canvas = document.getElementById('buddy-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const TOTAL_FRAMES   = 17;
  const SPRITE_SIZE    = 300;
  const CANVAS_HEIGHT  = 480;
  const PARTICLE_COUNT = 90;

  // ── Renderer ─────────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();

  let W = canvas.parentElement.clientWidth || window.innerWidth;
  const H = CANVAS_HEIGHT;

  const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100);
  camera.position.z = 10;
  renderer.setSize(W, H);

  // ── Sprite ───────────────────────────────────────────────────────────────────
  const loader  = new THREE.TextureLoader();
  const textures = new Array(TOTAL_FRAMES).fill(null);

  const spriteMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
  const spriteMesh = new THREE.Mesh(new THREE.PlaneGeometry(SPRITE_SIZE, SPRITE_SIZE), spriteMat);
  scene.add(spriteMesh);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    loader.load(`../ANI${i + 1}.svg`, (tex) => {
      textures[i] = tex;
      if (i === 0) { spriteMat.map = tex; spriteMat.needsUpdate = true; }
    });
  }
MMMMMMMMMMMm
  // ── Particles ────────────────────────────────────────────────────────────────
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
  const pMat = new THREE.PointsMaterial({ size: 2.5, color: 0x0af5e7, transparent: true, opacity: 0.35 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // ── State config ─────────────────────────────────────────────────────────────
  const states = {
    idle:    { fps: 8,  bobSpeed: 0.8,  bobAmt: 10, pSpeed: 1.0, pColor: 0x0af5e7, pOpacity: 0.35 },
    running: { fps: 22, bobSpeed: 0.0,  bobAmt: 0,  pSpeed: 4.5, pColor: 0x0af5e7, pOpacity: 0.65 },
    success: { fps: 6,  bobSpeed: 0.4,  bobAmt: 14, pSpeed: 1.5, pColor: 0x00ff88, pOpacity: 0.55 },
    failure: { fps: 3,  bobSpeed: 0.15, bobAmt: 3,  pSpeed: 0.3, pColor: 0xff4433, pOpacity: 0.40 },
  };

  let currentState = 'idle';
  let currentFrame = 0;
  let lastFrameTime = 0;

  document.addEventListener('cantoStateChange', (e) => {
    currentState = e.detail.state;
    currentFrame = 0;
    const cfg = states[currentState] || states.idle;
    pMat.color.setHex(cfg.pColor);
    pMat.opacity = cfg.pOpacity;
  });

  // ── Render loop ──────────────────────────────────────────────────────────────
  function animate(t) {
    requestAnimationFrame(animate);

    const cfg = states[currentState] || states.idle;

    // Advance frame
    if (t - lastFrameTime > 1000 / cfg.fps) {
      currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
      lastFrameTime = t;
      if (textures[currentFrame]) {
        spriteMat.map = textures[currentFrame];
        spriteMat.needsUpdate = true;
      }
    }

    // Bob / shake
    if (currentState === 'running') {
      spriteMesh.position.x = (Math.random() - 0.5) * 6;
      spriteMesh.position.y = 0;
    } else {
      spriteMesh.position.x = 0;
      spriteMesh.position.y = Math.sin(t * 0.001 * cfg.bobSpeed) * cfg.bobAmt;
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
