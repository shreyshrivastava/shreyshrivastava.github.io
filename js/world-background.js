import * as THREE from '../assets/vendor/three/three.module.min.js';

const pageIds = ['about', 'projects', 'experience', 'education', 'contact'];
const palette = ['#17d7c8', '#38bdf8', '#ffb657', '#34d399', '#f472b6'];
const isHome = Boolean(document.getElementById('world'));
const filename = location.pathname.split('/').pop()?.replace('.html', '');
let active = Math.max(0, pageIds.indexOf(filename));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = new THREE.Vector2();
const focus = new THREE.Vector3(0, 0, 0);
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2('#070e10', 0.023);
const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 100);
const root = new THREE.Group();
scene.add(root);
let renderer;
let started = false;

function initialize() {
  if (started) return;
  started = true;
  try {
    const mobile = innerWidth <= 960;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'low-power', preserveDrawingBuffer: true });
  } catch {
    // The existing page remains usable when WebGL is unavailable.
  }
  if (renderer) start();
}
if (document.prerendering) document.addEventListener('prerenderingchange', initialize, { once: true });
else initialize();

function start() {
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth <= 960 ? 1 : 1.5));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor('#070e10', 0);
  const canvas = renderer.domElement;
  canvas.className = 'portfolio-world-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const edgeMaterial = new THREE.LineBasicMaterial({ color: palette[active], transparent: true, opacity: 0.48 });
  const connectionMaterial = new THREE.LineBasicMaterial({ color: palette[active], transparent: true, opacity: 0.26 });
  const surfaceMaterial = new THREE.MeshBasicMaterial({ color: '#12353d', transparent: true, opacity: 0.45, depthWrite: false });
  const markerMaterial = new THREE.MeshBasicMaterial({ color: palette[active], transparent: true, opacity: 0.8 });
  const markerGeometry = new THREE.BoxGeometry(0.13, 0.13, 0.13);
  const models = new Array(pageIds.length);
  const grid = new THREE.GridHelper(64, 48, palette[active], '#1c343d');
  grid.position.y = -4.5;
  grid.position.z = -8;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  scene.add(grid);

  let scroll = 0;
  let frame = 0;
  let animation = 0;
  let lastTime = 0;
  let phase = 0;
  let lastPaint = -Infinity;

  function box(parent, position, size, filled = true) {
    const geometry = new THREE.BoxGeometry(...size);
    const group = new THREE.Group();
    group.position.set(...position);
    if (filled) group.add(new THREE.Mesh(geometry, surfaceMaterial));
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
    parent.add(group);
    return group;
  }
  function path(parent, positions, curved = false) {
    let points = positions.map(p => new THREE.Vector3(...p));
    if (curved) points = new THREE.CatmullRomCurve3(points).getPoints(60);
    parent.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), connectionMaterial));
  }
  function marker(parent, position) {
    const mesh = new THREE.Mesh(markerGeometry, markerMaterial);
    mesh.position.set(...position);
    parent.add(mesh);
  }
  function makeModel(index) {
    const group = new THREE.Group();
    if (index === 0) {
      for (let layer = 0; layer < 3; layer++) {
        for (let col = 0; col < 6; col++) {
          const position = [-10 + col * 4, -2 + Math.sin(col * 1.4 + layer) * 3, -5 + layer * 5];
          marker(group, position);
          box(group, position, [0.65, 0.65, 0.65], false);
          if (col < 5) path(group, [position, [-6 + col * 4, -2 + Math.sin((col + 1) * 1.4 + layer) * 3, -5 + layer * 5]]);
          if (layer < 2) path(group, [position, [-10 + col * 4, -2 + Math.sin(col * 1.4 + layer + 1) * 3, layer * 5]]);
        }
      }
    } else if (index === 1) {
      [3, 5, 4, 6, 3].forEach((height, i) => {
        const x = -10 + i * 5;
        const z = Math.sin(i * 2) * 3;
        box(group, [x, -3 + height / 2, z], [3, height, 3]);
        for (let floor = 0; floor < height; floor++) box(group, [x, -3 + floor, z], [3.1, 0.05, 3.1], false);
        marker(group, [x, height - 2.6, z]);
      });
    } else if (index === 2) {
      for (let i = 0; i < 4; i++) {
        const position = [-10 + i * 6.5, -2 + i, Math.sin(i) * 3];
        const module = box(group, position, [3.7, 3.7, 3.7]);
        module.rotation.y = Math.PI / 8;
        box(group, [position[0], position[1], position[2]], [1.8, 1.8, 1.8], false);
        if (i < 3) path(group, [position, [position[0] + 3, position[1], position[2]], [position[0] + 3, position[1] + 1, Math.sin(i + 1) * 3], [-10 + (i + 1) * 6.5, -1 + i, Math.sin(i + 1) * 3]]);
      }
    } else if (index === 3) {
      for (let i = 0; i < 3; i++) {
        const position = [-8 + i * 8, -3 + i * 2.6, -1 - i * 2];
        for (let level = 0; level < 3; level++) box(group, [position[0], position[1] + level * 0.28, position[2]], [6, 0.15, 4.5]);
        const geometry = new THREE.OctahedronGeometry(1.2);
        const core = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial);
        core.position.set(position[0], position[1] + 2, position[2]);
        group.add(core);
        if (i < 2) path(group, [[position[0], position[1] + 1, position[2]], [position[0] + 4, position[1] + 1, position[2] - 1], [position[0] + 4, position[1] + 3.6, position[2] - 1], [position[0] + 8, position[1] + 3.6, position[2] - 2]]);
      }
    } else {
      const terminals = [[-9, -1, -3], [-3, 3, -1], [4, -2, 2], [10, 2, -3]];
      terminals.forEach(position => {
        box(group, position, [3, 2, 0.5]);
        marker(group, [position[0], position[1], position[2] + 0.5]);
        path(group, [position, [position[0] / 2, position[1] + 3, -5], [0, 0, -6]], true);
      });
      box(group, [0, 0, -6], [2, 2, 2], false);
    }
    return innerWidth <= 960 ? batchModel(group) : group;
  }

  function batchModel(group) {
    const batches = new Map();
    const geometries = new Set();
    const point = new THREE.Vector3();
    group.updateMatrixWorld(true);
    // These diagrams are rigid: bake child transforms once and share one draw call per material.
    group.traverse(object => {
      if (!object.geometry) return;
      const positions = object.geometry.getAttribute('position');
      const indices = object.geometry.getIndex();
      const count = indices ? indices.count : positions.count;
      if (!batches.has(object.material)) batches.set(object.material, { positions: [], lines: object.isLine });
      const batch = batches.get(object.material);
      const append = index => {
        point.fromBufferAttribute(positions, indices ? indices.getX(index) : index).applyMatrix4(object.matrixWorld);
        batch.positions.push(point.x, point.y, point.z);
      };
      if (object.isLine && !object.isLineSegments) {
        for (let i = 0; i < count - 1; i++) { append(i); append(i + 1); }
      } else {
        for (let i = 0; i < count; i++) append(i);
      }
      if (object.geometry !== markerGeometry) geometries.add(object.geometry);
    });
    group.clear();
    geometries.forEach(geometry => geometry.dispose());
    batches.forEach((batch, material) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(batch.positions, 3));
      geometry.computeBoundingSphere();
      group.add(batch.lines ? new THREE.LineSegments(geometry, material) : new THREE.Mesh(geometry, material));
    });
    return group;
  }

  function setSection(index) {
    active = Math.max(0, Math.min(4, index));
    if (!models[active]) {
      models[active] = makeModel(active);
      root.add(models[active]);
    }
    models.forEach((model, i) => { if (model) model.visible = i === active; });
    edgeMaterial.color.set(palette[active]);
    connectionMaterial.color.set(palette[active]);
    markerMaterial.color.set(palette[active]);
    grid.material.color?.set(palette[active]);
    canvas.dataset.section = pageIds[active];
    if (reducedMotion.matches) render(performance.now());
  }
  function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.position.set(0, innerWidth < 640 ? 6 : 7, innerWidth < 640 ? 31 : 23);
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
    if (!reducedMotion.matches) phase += delta * 0.045;
    root.rotation.y = -0.26 + phase + scroll * 0.35;
    root.position.y = Math.sin(phase * 3) * 0.2;
    const targetX = reducedMotion.matches ? 0 : pointer.x * 0.65;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    focus.y = -0.5 + scroll * 1.2;
    camera.lookAt(focus);
    renderer.render(scene, camera);
    if (frame++ % 15 === 0) {
      canvas.dataset.frames = String(frame);
      canvas.dataset.drawCalls = String(renderer.info.render.calls);
    }
    if (!document.hidden && !reducedMotion.matches) animation = requestAnimationFrame(render);
  }
  addEventListener('pointermove', event => {
    pointer.set((event.clientX / innerWidth - 0.5) * 2, (event.clientY / innerHeight - 0.5) * 2);
  }, { passive: true });
  addEventListener('scroll', () => {
    scroll = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    if (reducedMotion.matches) render(performance.now());
  }, { passive: true });
  addEventListener('resize', resize);
  document.getElementById('world')?.addEventListener('world:sectionchange', event => setSection(event.detail.index));
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
  if (isHome) {
    const selected = document.querySelector('.sw-nav__item.is-active');
    const index = [...document.querySelectorAll('.sw-nav__item')].indexOf(selected);
    if (index >= 0) active = index;
  }
  setSection(active);
  resize();
  render(performance.now());
  document.body.classList.add('has-3d-world');
}
