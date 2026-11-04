// First visit of a session: a copy of the console window boots in the middle of the screen
// ("loading Shrey's portfolio website...", then "open portfolio"), glides to where the real console
// sits, and the page opens around it. A click or key skips it.
(() => {
  const root = document.documentElement;
  const splash = document.querySelector('.splash');
  const win = splash && splash.querySelector('.splash__window');
  if (!win || !root.classList.contains('has-splash')) return;
  let finished = false;
  let flyTimer = setTimeout(fly, 1550);

  function remember() {
    try {
      sessionStorage.setItem('splash-seen', '1');
    } catch {
      // Without storage the splash may show again on the next visit; nothing breaks.
    }
  }

  function done() {
    root.classList.add('splash-done');
    splash.classList.add('splash--out');
    setTimeout(() => splash.remove(), 350);
  }

  function fly() {
    if (finished) return;
    finished = true;
    remember();
    const target = document.querySelector('.stitch-console');
    const rect = target && target.getBoundingClientRect();
    const onScreen = rect && rect.width > 40 && rect.height > 40 && rect.top < innerHeight && rect.bottom > 0;
    if (!onScreen) {
      splash.classList.add('splash--fly');
      done();
      return;
    }
    // Freeze the window at its current size and position, then let it travel to the console.
    const from = win.getBoundingClientRect();
    Object.assign(win.style, { transform: 'none', left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px' });
    void win.offsetWidth;
    splash.classList.add('splash--fly');
    Object.assign(win.style, { left: rect.left + 'px', top: rect.top + 'px', width: rect.width + 'px', height: rect.height + 'px' });
    setTimeout(done, 660);
  }

  function skip() {
    if (finished) return;
    finished = true;
    clearTimeout(flyTimer);
    remember();
    root.style.setProperty('--hero-delay', '0.3s');
    splash.classList.add('splash--fly');
    done();
  }
  ['pointerdown', 'keydown'].forEach(type => addEventListener(type, skip, { once: true }));
})();
