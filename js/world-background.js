import * as THREE from '../assets/vendor/three/three.module.min.js';

// One continuous path runs through the whole site. The camera travels along it as you scroll,
// and across pages: each page owns a fifth of the journey, and the position is carried over
// between pages through sessionStorage so the flight carries on instead of restarting.
const pageIds = ['about', 'projects', 'experience', 'education', 'contact'];
const palette = ['#17d7c8', '#38bdf8', '#ffb657', '#34d399', '#f472b6'];
const STATE_KEY = 'thread-state';
const filename = location.pathname.split('/').pop()?.replace('.html', '');
const page = Math.max(0, pageIds.indexOf(filename));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = new THREE.Vector2();
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2('#070e10', 0.026);
const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 140);
let renderer;
let started = false;

function readState() {
  try {
    const state = JSON.parse(sessionStorage.getItem(STATE_KEY) || 'null');
    if (state && Date.now() - state.t < 600000) return state;
  } catch {
    // Storage can be unavailable; the scene simply starts fresh.
  }
  return null;
}

function initialize() {
  if (started) return;
  started = true;
  try {
    const mobile = innerWidth <= 960;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  } catch {
    // The existing page remains usable when WebGL is unavailable.
  }
  if (renderer) start();
}
if (document.prerendering) document.addEventListener('prerenderingchange', initialize, { once: true });
else initialize();

function start() {
  const mobile = innerWidth <= 960;
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1 : 1.5));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor('#070e10', 0);
  const canvas = renderer.domElement;
  canvas.className = 'portfolio-world-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const previous = readState();
  const accent = new THREE.Color(previous?.accent || palette[page]);
  const accentTarget = new THREE.Color(palette[page]);
  const dot = document.createElement('canvas');
  dot.width = dot.height = 64;
  const dotContext = dot.getContext('2d');
  const glow = dotContext.createRadialGradient(32, 32, 0, 32, 32, 32);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  dotContext.fillStyle = glow;
  dotContext.fillRect(0, 0, 64, 64);
  const dotTexture = new THREE.CanvasTexture(dot);
  const additive = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false };
  const lineMaterial = new THREE.LineBasicMaterial({ color: accent, opacity: 0.95, ...additive });
  const faintMaterial = new THREE.LineBasicMaterial({ color: accent, opacity: 0.38, ...additive });
  const nodeMaterial = new THREE.LineBasicMaterial({ color: accent, opacity: 0.7, ...additive });
  const pulseMaterial = new THREE.PointsMaterial({ color: accent, size: 0.55, opacity: 0.95, map: dotTexture, sizeAttenuation: true, ...additive });
  const headMaterial = new THREE.PointsMaterial({ color: '#f4fbff', size: 1.1, opacity: 0.95, map: dotTexture, sizeAttenuation: true, ...additive });
  const dustMaterial = new THREE.PointsMaterial({ color: accent, size: 0.16, opacity: 0.55, map: dotTexture, ...additive });

  // The path: a long gentle curve running away from the camera.
  const points = [];
  for (let i = 0; i < 30; i++) {
    points.push(new THREE.Vector3(
      Math.sin(i * 0.55) * 5.5 + Math.sin(i * 1.3) * 1.2,
      Math.cos(i * 0.42) * 2.6 - 0.5 + Math.sin(i * 0.9) * 0.8,
      12 - i * 3.6,
    ));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const samples = curve.getPoints(520);
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(samples), lineMaterial));
  [-1, 1].forEach(side => {
    const offset = samples.map(p => new THREE.Vector3(p.x + 0.18 * side, p.y + 0.1 * side, p.z));
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(offset), faintMaterial));
  });

  // One small landmark per page, placed along the path.
  const cube = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
  pageIds.forEach((id, i) => {
    const at = curve.getPoint((i + 0.5) / pageIds.length);
    const outer = new THREE.LineSegments(cube, nodeMaterial);
    const inner = new THREE.LineSegments(cube, nodeMaterial);
    outer.scale.setScalar(1.7);
    inner.scale.setScalar(0.8);
    outer.position.copy(at);
    inner.position.copy(at);
    outer.rotation.set(0.4, i * 0.7, 0.1);
    inner.rotation.set(0.4, i * 0.7 + 0.8, 0.1);
    scene.add(outer, inner);
  });

  // Packets of light travelling along the path.
  const pulseCount = mobile ? 6 : 10;
  const pulsePositions = new Float32Array(pulseCount * 3);
  const pulseGeometry = new THREE.BufferGeometry();
  pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
  scene.add(new THREE.Points(pulseGeometry, pulseMaterial));
  const headGeometry = new THREE.BufferGeometry();
  headGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
  scene.add(new THREE.Points(headGeometry, headMaterial));

  // Dust scattered around the path gives depth.
  const dustCount = mobile ? 140 : 360;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const at = curve.getPoint(Math.random());
    dustPositions[i * 3] = at.x + (Math.random() - 0.5) * 18;
    dustPositions[i * 3 + 1] = at.y + (Math.random() - 0.5) * 12;
    dustPositions[i * 3 + 2] = at.z + (Math.random() - 0.5) * 8;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  scene.add(new THREE.Points(dustGeometry, dustMaterial));

  const grid = new THREE.GridHelper(80, 60, palette[page], '#1c343d');
  grid.position.y = -4.5;
  grid.material.transparent = true;
  grid.material.opacity = 0.24;
  scene.add(grid);
  const gridStep = 80 / 60;

  const span = 1 / pageIds.length;
  let preview = null;
  let frame = 0;
  let animation = 0;
  let lastTime = 0;
  let clock = 0;
  let lastPaint = -Infinity;
  let scrollFraction = 0;
  let journey = previous ? previous.journey : page * span;
  // When arriving from another page, keep the old colour until the thread reaches the prompt.
  const holdColour = document.documentElement.dataset.threadArriving ? 0.75 : 0;

  function targetJourney() {
    if (preview !== null) return (preview + 0.3) * span;
    return (page + scrollFraction) * span;
  }
  function readScroll() {
    scrollFraction = Math.min(1, Math.max(0, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
  }

  function applyColor() {
    lineMaterial.color.copy(accent);
    faintMaterial.color.copy(accent);
    nodeMaterial.color.copy(accent);
    pulseMaterial.color.copy(accent);
    dustMaterial.color.copy(accent);
    grid.material.color?.copy(accent);
  }

  function resize() {
    camera.aspect = innerWidth / innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth <= 960 ? 1 : 1.5));
    renderer.setSize(innerWidth, innerHeight);
    camera.updateProjectionMatrix();
    if (reducedMotion.matches) render(performance.now());
  }

  function render(time) {
    if (!reducedMotion.matches && innerWidth <= 960 && time - lastPaint < 1000 / 30 - 1) {
      if (!document.hidden) animation = requestAnimationFrame(render);
      return;
    }
    lastPaint = time;
    const delta = Math.min((time - lastTime) / 1000 || 0, 0.05);
    lastTime = time;
    const still = reducedMotion.matches;
    if (!still) clock += delta;

    const target = targetJourney();
    journey = still ? target : journey + (target - journey) * (1 - Math.exp(-delta * 2.6));
    if (still) accent.copy(accentTarget);
    else if (clock >= holdColour) accent.lerp(accentTarget, 1 - Math.exp(-delta * 3.5));
    applyColor();

    const u = Math.min(Math.max(journey, 0.002), 0.955);
    const here = curve.getPoint(u);
    const ahead = curve.getPoint(Math.min(u + 0.05, 1));
    const sway = still ? 0 : Math.sin(clock * 0.5) * 0.35;
    camera.position.set(here.x + pointer.x * 0.8 + sway, here.y + 2.4 - pointer.y * 0.5, here.z + (innerWidth < 640 ? 9 : 7));
    camera.lookAt(ahead.x, ahead.y - 0.3, ahead.z);

    // The bright head sits just ahead of the camera; pulses stream along the path.
    const head = curve.getPoint(Math.min(u + 0.03, 1));
    headGeometry.attributes.position.setXYZ(0, head.x, head.y, head.z);
    headGeometry.attributes.position.needsUpdate = true;
    for (let i = 0; i < pulseCount; i++) {
      const along = (clock * 0.03 + i / pulseCount) % 1;
      const at = curve.getPoint(along);
      pulsePositions[i * 3] = at.x;
      pulsePositions[i * 3 + 1] = at.y;
      pulsePositions[i * 3 + 2] = at.z;
    }
    pulseGeometry.attributes.position.needsUpdate = true;
    grid.position.z = Math.round((here.z - 8) / gridStep) * gridStep;

    renderer.render(scene, camera);
    if (frame++ % 15 === 0) {
      canvas.dataset.frames = String(frame);
      canvas.dataset.drawCalls = String(renderer.info.render.calls);
      canvas.dataset.journey = journey.toFixed(3);
    }
    if (!document.hidden && !still) animation = requestAnimationFrame(render);
  }

  addEventListener('pointermove', event => {
    pointer.set((event.clientX / innerWidth - 0.5) * 2, (event.clientY / innerHeight - 0.5) * 2);
  }, { passive: true });
  addEventListener('scroll', () => {
    readScroll();
    if (reducedMotion.matches) render(performance.now());
  }, { passive: true });
  addEventListener('resize', resize);
  // Hovering a top-menu item on the home page previews that part of the journey.
  document.getElementById('world')?.addEventListener('world:sectionchange', event => {
    const index = event.detail.index;
    preview = index === page ? null : index;
    accentTarget.set(palette[index]);
    canvas.dataset.section = pageIds[index];
    if (reducedMotion.matches) render(performance.now());
  });
  addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify({ journey, accent: '#' + accent.getHexString(), t: Date.now() }));
    } catch {
      // Not being able to remember the position only costs the continuity effect.
    }
  });
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(animation);
    if (!document.hidden) { lastTime = performance.now(); render(lastTime); }
  });
  reducedMotion.addEventListener('change', () => {
    cancelAnimationFrame(animation);
    render(performance.now());
  });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    cancelAnimationFrame(animation);
    document.body.classList.remove('has-3d-world');
    canvas.hidden = true;
  });

  canvas.dataset.section = pageIds[page];
  readScroll();
  resize();
  render(performance.now());
  document.body.classList.add('has-3d-world');
}
