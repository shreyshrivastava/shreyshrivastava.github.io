// One fixed WebGL canvas behind the page. Each chapter ([data-form]) owns a different 3D form;
// crossing a chapter boundary cross-fades and scales the old form out and the new one in.
// Forms loosely echo their section: a neural core, embedding clusters, sensor rings, a helix, layers…
import * as THREE from './assets/vendor/three/three.module.min.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.createElement('canvas');
canvas.className = 'bg3d';
canvas.setAttribute('aria-hidden', 'true');
document.body.prepend(canvas);

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
} catch (e) { canvas.remove(); throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
camera.position.set(0, 0, 14);

const ink = new THREE.Color('#efe9de');
const inkTarget = new THREE.Color('#efe9de');
const gold = new THREE.Color('#c2a26a'); // the 10% accent: points are gold, lines are ivory/onyx
const lineMat = () => new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
const dotTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'); const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.4, 'rgba(255,255,255,.9)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
})();
const pointMat = (size = .09) => new THREE.PointsMaterial({ color: ink, size, map: dotTex, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true });
const wire = (geo) => new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat());
const edges = (geo) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat());
const points = (arr, size) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3)); return new THREE.Points(g, pointMat(size)); };
const rnd = (a, b) => a + Math.random() * (b - a);

/* ---------- Forms ---------- */
const forms = {
  // Hero: a neural core, icosphere cage around a cloud of nodes
  core() {
    const g = new THREE.Group();
    g.add(wire(new THREE.IcosahedronGeometry(3.4, 1)));
    const p = []; for (let i = 0; i < 420; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(rnd(.4, 3)); p.push(v.x, v.y, v.z); }
    g.add(points(p, .08));
    g.userData.spin = [.0016, .0026];
    return g;
  },
  // agent-ops: a grid of blocks, like files and steps waiting for approval
  blocks() {
    const g = new THREE.Group(); const box = new THREE.BoxGeometry(.9, .9, .9);
    for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) {
      if (Math.random() < .35) continue;
      const e = edges(box); e.position.set(x * 1.25, y * 1.25, rnd(-1.2, 1.2)); g.add(e);
    }
    g.userData.spin = [.0012, .002]; g.userData.bob = true;
    return g;
  },
  // FallGuard: concentric sensor rings at angles
  rings() {
    const g = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const r = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, 1 + i * .5, 1 + i * .5).getPoints(96)), lineMat());
      r.rotation.set(rnd(-.5, .5) + Math.PI / 2.6, rnd(-.4, .4), 0); g.add(r);
    }
    g.userData.spin = [.0008, .003];
    return g;
  },
  // AcademicForge: embedding clusters, three gaussian blobs of points
  clusters() {
    const g = new THREE.Group(); const p = [];
    [[-2, 1, 0], [2, .6, -1], [0, -1.8, 1]].forEach(c => { for (let i = 0; i < 260; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(Math.abs(rnd(-1, 1) * rnd(0, 1.4))); p.push(c[0] + v.x, c[1] + v.y, c[2] + v.z); } });
    g.add(points(p, .085));
    g.add(edges(new THREE.BoxGeometry(7, 6, 5)));
    g.userData.spin = [.0006, .0022];
    return g;
  },
  // Healthcare: a double helix
  helix() {
    const g = new THREE.Group(); const p = []; const rungs = [];
    for (let i = 0; i < 160; i++) {
      const t = i / 160 * Math.PI * 6, y = (i / 160 - .5) * 9;
      const a = [Math.cos(t) * 1.6, y, Math.sin(t) * 1.6], b = [Math.cos(t + Math.PI) * 1.6, y, Math.sin(t + Math.PI) * 1.6];
      p.push(...a, ...b); if (i % 6 === 0) rungs.push(new THREE.Vector3(...a), new THREE.Vector3(...b));
    }
    g.add(points(p, .1));
    g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(rungs), lineMat()));
    g.rotation.z = .5; g.userData.spin = [0, .006];
    return g;
  },
  // Honeypot: a faceted trap, nested octahedra
  trap() {
    const g = new THREE.Group();
    [3.6, 2.4, 1.2].forEach((s, i) => { const o = wire(new THREE.OctahedronGeometry(s, i ? 0 : 1)); o.rotation.y = i * .4; g.add(o); });
    g.userData.spin = [.002, .0035];
    return g;
  },
  // Archive: a torus knot, many threads in one object
  knot() {
    const g = new THREE.Group(); g.add(wire(new THREE.TorusKnotGeometry(2.4, .55, 140, 10, 2, 3)));
    g.userData.spin = [.0015, .0025];
    return g;
  },
  // Capabilities: a forecast surface, a rolling wave of points
  wave() {
    const g = new THREE.Group(); const p = []; const n = 46;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) p.push((i / n - .5) * 12, 0, (j / n - .5) * 12);
    const pts = points(p, .07); pts.userData.wave = true; g.add(pts);
    g.rotation.x = .55; g.userData.spin = [0, .0012];
    return g;
  },
  // Method: stacked layers, like a network's layers
  layers() {
    const g = new THREE.Group();
    for (let i = 0; i < 6; i++) { const pl = edges(new THREE.PlaneGeometry(5 - i * .35, 3.4 - i * .2)); pl.position.z = (i - 2.5) * .9; pl.rotation.x = -.15; g.add(pl); }
    g.rotation.y = -.7; g.userData.spin = [0, .0025]; g.userData.bob = true;
    return g;
  },
  // Experience: a small neural network graph, 4 layers of nodes
  graph() {
    const g = new THREE.Group(); const layers = [4, 6, 6, 3]; const nodes = []; const segs = [];
    layers.forEach((n, li) => { const col = []; for (let k = 0; k < n; k++) col.push(new THREE.Vector3((li - 1.5) * 2.4, (k - (n - 1) / 2) * 1.1, rnd(-.4, .4))); nodes.push(col); });
    for (let li = 0; li < nodes.length - 1; li++) nodes[li].forEach(a => nodes[li + 1].forEach(b => segs.push(a, b)));
    g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(segs), lineMat()));
    g.add(points(nodes.flat().flatMap(v => [v.x, v.y, v.z]), .28));
    g.userData.spin = [0, .003];
    return g;
  },
  // Education: steps, three degrees climbing
  steps() {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) { const b = edges(new THREE.BoxGeometry(2, 1 + i * 1.3, 2)); b.position.set((i - 1) * 2.3, (1 + i * 1.3) / 2 - 2, 0); g.add(b); }
    g.rotation.set(.3, -.6, 0); g.userData.spin = [0, .0028];
    return g;
  },
  // Contact: one open sphere of meridians
  globe() {
    const g = new THREE.Group(); g.add(wire(new THREE.SphereGeometry(3.6, 22, 14)));
    g.userData.spin = [.001, .0035];
    return g;
  }
};

const built = {};
const get = name => {
  if (!built[name]) { built[name] = forms[name](); built[name].visible = false; built[name].userData.fade = 0; scene.add(built[name]); }
  return built[name];
};

/* ---------- Chapter wiring ---------- */
let current = null;
const MAX_OPACITY = { line: .34, point: .55 };
function show(name, light) {
  inkTarget.set(light ? '#0e0e0d' : '#efe9de');
  const next = get(name);
  if (next === current) return;
  current = next; next.visible = true;
}
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) show(e.target.dataset.form, e.target.dataset.ink === 'light' || !!e.target.closest('[data-ink="light"]'));
}), { rootMargin: '-45% 0px -45% 0px' });
const observeAll = () => document.querySelectorAll('[data-form]').forEach(el => io.observe(el));
observeAll();
document.addEventListener('forms:refresh', () => { io.disconnect(); observeAll(); });
show(document.querySelector('[data-form]')?.dataset.form || 'core', false);

/* ---------- Layout: sit to the right on wide screens, centred and smaller on phones ---------- */
let offsetX = 0, scale = 1;
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  const wide = w > 900;
  offsetX = wide ? 3.6 * camera.aspect / 1.6 : 0;
  scale = wide ? 1 : .72;
}
resize(); addEventListener('resize', resize);

const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener('pointermove', e => { pointer.tx = e.clientX / innerWidth - .5; pointer.ty = e.clientY / innerHeight - .5; }, { passive: true });
let scrollV = 0, lastY = scrollY;

/* ---------- Loop ---------- */
const setOpacity = (group, k) => group.traverse(o => { if (o.material) o.material.opacity = k * (o.isPoints ? MAX_OPACITY.point : MAX_OPACITY.line); });
let running = true, t0 = performance.now();
function frame(now) {
  const dt = Math.min(50, now - t0); t0 = now; const time = now * .001;
  ink.lerp(inkTarget, .06);
  pointer.x += (pointer.tx - pointer.x) * .05; pointer.y += (pointer.ty - pointer.y) * .05;
  scrollV += ((scrollY - lastY) - scrollV) * .1; lastY = scrollY;
  camera.position.x = pointer.x * 1.2; camera.position.y = -pointer.y * .8; camera.lookAt(0, 0, 0);

  for (const g of Object.values(built)) {
    if (!g.visible) continue;
    const target = g === current ? 1 : 0;
    g.userData.fade += (target - g.userData.fade) * (dt / 450);
    const f = g.userData.fade;
    if (f < .004 && target === 0) { g.visible = false; continue; }
    setOpacity(g, f);
    const s = scale * (.86 + .14 * f);
    g.scale.setScalar(s);
    g.position.x = offsetX;
    const [sx, sy] = g.userData.spin || [0, .002];
    const k = reduced ? 0 : dt / 16.7;
    g.rotation.x += sx * k; g.rotation.y += (sy + scrollV * .0006) * k;
    if (g.userData.bob && !reduced) g.position.y = Math.sin(time * .8) * .25;
    g.traverse(o => {
      if (o.userData.wave && !reduced) {
        const a = o.geometry.attributes.position;
        for (let i = 0; i < a.count; i++) { const x = a.getX(i), z = a.getZ(i); a.setY(i, Math.sin(x * .7 + time) * .5 + Math.cos(z * .6 + time * .8) * .4); }
        a.needsUpdate = true;
      }
      if (o.material) o.material.color.copy(o.isPoints ? gold : ink);
    });
  }
  renderer.render(scene, camera);
  if (running && !reduced) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
if (reduced) {
  // Static frame per chapter: snap fades and redraw only when the chapter changes.
  const draw = () => { for (const g of Object.values(built)) { g.userData.fade = g === current ? 1 : 0; g.visible = g === current; } frame(performance.now()); };
  document.querySelectorAll('[data-form]').forEach(el => new IntersectionObserver(e => e[0].isIntersecting && requestAnimationFrame(draw), { rootMargin: '-45% 0px -45% 0px' }).observe(el));
}
document.addEventListener('visibilitychange', () => {
  running = !document.hidden;
  if (running && !reduced) { t0 = performance.now(); requestAnimationFrame(frame); }
});
canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); running = false; canvas.style.display = 'none'; });
