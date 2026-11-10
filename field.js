// One 3D form that travels the page, rendered entirely as terminal characters.
const canvas = document.getElementById('field');
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const F = window.FIELD = window.FIELD || { dive: 0, t: 'ink' };
const ctx = calm ? null : canvas.getContext('2d');

if (ctx) {
  const small = innerWidth < 760;
  const N = small ? 3000 : 7000, TAU = Math.PI * 2;
  const rnd = () => Math.random(), g = () => (rnd() + rnd() + rnd()) / 1.5 - 1;
  const forms = {
    knot: i => { const u = i / N * TAU, p = 2, q = 3, r = 1.55 + .62 * Math.cos(q * u), a = rnd() * TAU, t = .3 * Math.sqrt(rnd());
      const x = r * Math.cos(p * u), y = r * Math.sin(p * u), z = .62 * Math.sin(q * u) * 1.5;
      return [x + t * Math.cos(a) * Math.cos(p * u), y + t * Math.cos(a) * Math.sin(p * u), z + t * Math.sin(a)]; },
    cloud: () => [g() * 7, g() * 4, g() * 4],
    wave: i => { const c = Math.ceil(Math.sqrt(N)), x = (i % c) / c * 11 - 5.5, z = Math.floor(i / c) / c * 8 - 4; return [x, Math.sin(x * 1.1) * Math.cos(z * 1.3) * .55 - 1.2, z]; },
    layers: i => { const l = i % 3, a = rnd() * TAU, r = 3.1 * Math.sqrt(rnd()); return [r * Math.cos(a), (l - 1) * 1.15, r * Math.sin(a)]; },
    helix: i => { const u = i / N, a = u * TAU * 4 + (i % 2) * Math.PI; return [1.15 * Math.cos(a) + g() * .1, u * 8 - 4, 1.15 * Math.sin(a) + g() * .1]; },
    rings: i => { const k = i % 4, a = rnd() * TAU, t = g() * .08; return [(k - 1.5) * 2.1 + t, (1.15 + t) * Math.cos(a), (1.15 + t) * Math.sin(a)]; },
    spiral: i => { const u = i / N, a = u * TAU * 3; const r = 2.3 + g() * .22; return [r * Math.cos(a), u * 6 - 3 + g() * .14, r * Math.sin(a)]; },
    globe: i => { const y = 1 - 2 * (i + .5) / N, r = Math.sqrt(1 - y * y), a = i * 2.39996; return [2.5 * r * Math.cos(a), 2.5 * y, 2.5 * r * Math.sin(a)]; }
  };
  const bake = f => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) a.set(forms[f](i), i * 3); return a; };
  const baked = {}; Object.keys(forms).forEach(k => baked[k] = bake(k));
  const seeds = new Float32Array(N); for (let i = 0; i < N; i++) seeds[i] = rnd();

  // [opacity, x offset, scale]
  const SET = { knot: [.55, 0, 1], cloud: [.14, 0, 1], wave: [.3, 0, 1], layers: [.1, 2.6, .9], helix: [.3, 3, .9], rings: [.09, 0, 1.1], spiral: [.16, 2.8, .9], globe: [.7, 2.4, 1] };
  if (small) { Object.values(SET).forEach(s => { s[1] = 0; s[2] *= .62; }); ['cloud', 'wave', 'layers', 'helix', 'rings', 'spiral'].forEach(k => SET[k][0] = 0); }
  const LIFT = small ? { knot: 1.6, globe: 1.6 } : { knot: .55 };
  const COLOR = { ink: '#d6b36a', bone: '#a98a45', flame: '#a98a45' };
  const RAMP = ' .:-=+*#%@';

  let W, H, cols, rows, cw, ch, grid, anchors = [];
  const size = () => {
    const dpr = Math.min(devicePixelRatio, 1.5);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const fs = small ? 11 : 13;
    ch = fs * 1.25; ctx.font = fs + 'px "Geist Mono", ui-monospace, Menlo, monospace'; ctx.textBaseline = 'top';
    cw = ctx.measureText('M').width;
    cols = Math.ceil(W / cw); rows = Math.ceil(H / ch);
    grid = new Float32Array(cols * rows);
    measure();
  };
  const measure = () => { anchors = [...document.querySelectorAll('[data-form]')].map(e => ({ y: e.getBoundingClientRect().top + scrollY, f: e.dataset.form })); };
  addEventListener('resize', size); size();
  addEventListener('load', measure);
  document.fonts && document.fonts.ready.then(size);
  if (window.ScrollTrigger) ScrollTrigger.addEventListener('refresh', measure);
  setTimeout(measure, 3000);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });

  const lp = (a, b, k) => a + (b - a) * k, now = { al: .8, x: 0, s: 1, m: 0 };
  let last = 0;
  const tick = ms => {
    requestAnimationFrame(tick);
    if (document.hidden || ms - last < 33) return;
    last = ms;
    const y = scrollY + H * .6;
    let i = 0; while (i < anchors.length - 2 && y >= anchors[i + 1].y) i++;
    const A = anchors[i], B = anchors[i + 1] || A, pa = baked[A.f], pb = baked[B.f];
    const win = Math.min(H * 1.2, (B.y - A.y) || 1), mx = Math.max(0, Math.min(1, 1 - (B.y - y) / win)), e = mx * mx * (3 - 2 * mx);
    now.m = lp(now.m, mx, .18);
    const S0 = SET[A.f], S1 = SET[B.f];
    now.al = lp(now.al, lp(S0[0], S1[0], e), .12); now.x = lp(now.x, lp(S0[1], S1[1], e), .12); now.s = lp(now.s, lp(S0[2], S1[2], e), .12);
    mouse.x = lp(mouse.x, mouse.tx, .08); mouse.y = lp(mouse.y, mouse.ty, .08);

    const ry = ms * .00016 + scrollY * .0007 + mouse.x * .7, rx = .25 + scrollY * .00018 + mouse.y * .5;
    const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
    const cam = 8 - (F.dive || 0) * 6.6, f = 1.3 * H, ox = now.x, oy = lp(LIFT[A.f] || 0, LIFT[B.f] || 0, e), t = ms / 1000;
    grid.fill(0);
    for (let n = 0; n < N; n++) {
      const r = seeds[n];
      let k = Math.max(0, Math.min(1, now.m * 1.5 - r * .5)); k = k * k * (3 - 2 * k);
      const sw = Math.sin(k * Math.PI) * r * 1.5, j = n * 3;
      const px = lp(pa[j], pb[j], k) + sw * Math.sin(r * 40 + t), py = lp(pa[j + 1], pb[j + 1], k) + sw * Math.cos(r * 70 + t), pz = lp(pa[j + 2], pb[j + 2], k);
      const x1 = (px * cy + pz * sy) * now.s, z1 = (pz * cy - px * sy) * now.s, y1 = py * now.s;
      const y2 = y1 * cx - z1 * sx, z2 = y1 * sx + z1 * cx, d = cam - z2;
      if (d < .4) continue;
      const c = ((W / 2 + (x1 + ox) * f / d) / cw) | 0, w = ((H / 2 - (y2 + oy) * f / d) / ch) | 0;
      if (c < 0 || c >= cols || w < 0 || w >= rows) continue;
      grid[w * cols + c] += 9 / d;
    }
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = COLOR[F.t] || COLOR.ink; ctx.globalAlpha = now.al;
    for (let w = 0; w < rows; w++) {
      let s = '', any = false;
      for (let c = 0; c < cols; c++) {
        const v = grid[w * cols + c];
        if (v > 0) { s += RAMP[Math.min(9, 1 + (v * 2.2 | 0))]; any = true; } else s += ' ';
      }
      if (any) ctx.fillText(s, 0, w * ch);
    }
  };
  requestAnimationFrame(tick);
}
