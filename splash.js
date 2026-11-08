// First visit of a session: a terminal window boots in the middle of the screen, types
// "loading Shrey's portfolio website..." and "open portfolio", then glides onto the hero terminal
// and the page opens around it. A click or key skips it. Reduced motion never sees it.
(() => {
  const root = document.documentElement;
  const splash = document.querySelector('.splash');
  if (!splash) return;
  if (!root.classList.contains('has-splash')) { splash.remove(); return; }
  const win = splash.querySelector('.splash__window');
  const lines = [...splash.querySelectorAll('[data-type]')];
  const bar = splash.querySelector('.splash__bar i');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let finished = false;

  const remember = () => { try { sessionStorage.setItem('v4-splash-seen', '1'); } catch (e) { /* storage blocked: it may show again, nothing breaks */ } };
  const done = () => {
    root.classList.add('splash-done');
    splash.classList.add('splash--out');
    setTimeout(() => { splash.remove(); root.classList.remove('has-splash'); }, 420);
  };

  async function run() {
    for (const [i, line] of lines.entries()) {
      const text = line.dataset.type;
      for (const ch of text) { if (finished) return; line.textContent += ch; await sleep(i ? 55 : 28); }
      if (i === 0) { bar.style.transform = 'scaleX(1)'; await sleep(420); }
      await sleep(180);
    }
    await sleep(320);
    fly();
  }

  function fly() {
    if (finished) return;
    finished = true;
    remember();
    const target = document.querySelector('.readout');
    const rect = target && target.getBoundingClientRect();
    if (!rect || rect.width < 40 || rect.top > innerHeight) return done();
    const from = win.getBoundingClientRect();
    Object.assign(win.style, { transform: 'none', left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px' });
    void win.offsetWidth;
    splash.classList.add('splash--fly');
    Object.assign(win.style, { left: rect.left + 'px', top: rect.top + 'px', width: rect.width + 'px', height: rect.height + 'px' });
    setTimeout(done, 640);
  }

  function skip() {
    if (finished) return;
    finished = true;
    remember();
    done();
  }
  ['pointerdown', 'keydown'].forEach(t => addEventListener(t, skip, { once: true }));
  // Never let the splash hold the page: skip it in a background tab, and cap it at 4.5 s.
  if (document.hidden) { skip(); return; }
  document.addEventListener('visibilitychange', () => { if (document.hidden) skip(); });
  setTimeout(skip, 4500);
  run();
})();
