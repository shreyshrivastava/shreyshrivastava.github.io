// One continuous scroll across the five pages. Keep scrolling past the bottom of a page and you flow
// into the next one; keep scrolling up past the top and you go back a page. After Contact it loops
// back to About. A fresh gesture is required at the edge, so reaching the end mid-scroll never skips
// anything, and a small cue shows what is coming.
(() => {
  const pages = ['index.html', 'projects.html', 'experience.html', 'education.html', 'contact.html'];
  const labels = ['About', 'Projects', 'Experience', 'Education', 'Contact'];
  const filename = location.pathname.split('/').pop() || 'index.html';
  const index = pages.indexOf(filename);
  if (index < 0) return;

  const nextIndex = (index + 1) % pages.length;
  const prevIndex = (index + pages.length - 1) % pages.length;
  const target = i => new URL(pages[i], location.href);
  const arrivalKey = 'portfolio-scroll-arrival';
  const WHEEL_NEEDED = 150;
  const TOUCH_NEEDED = 60;
  const mobile = matchMedia('(max-width: 960px)');

  let navigating = false;
  let armed = false;
  let readyAt = performance.now() + 700;
  let touch = null;
  let wheel = null;
  let taps = { dir: '', count: 0, timer: 0 };

  const cue = document.createElement('div');
  cue.className = 'flow-cue';
  cue.setAttribute('aria-hidden', 'true');
  cue.innerHTML = '<span class="flow-cue__text"></span><span class="flow-cue__bar"><i></i></span>';
  document.body.appendChild(cue);
  const cueText = cue.querySelector('.flow-cue__text');
  const cueFill = cue.querySelector('.flow-cue__bar i');

  const atTop = () => scrollY <= 2;
  const atBottom = () => scrollY + innerHeight >= document.documentElement.scrollHeight - 4;

  function blocked(node) {
    const root = document.documentElement;
    if (root.classList.contains('has-splash') && !root.classList.contains('splash-done')) return true;
    if (document.querySelector('dialog[open], .sw-lightbox[aria-hidden="false"]')) return true;
    if (!(node instanceof Element)) return false;
    if (node.closest('input, textarea, select, [contenteditable="true"]')) return true;
    for (let el = node; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
      if (el.scrollHeight > el.clientHeight + 2 && /^(auto|scroll)$/.test(getComputedStyle(el).overflowY)) return true;
    }
    return false;
  }
  const enabled = node => !navigating && performance.now() >= readyAt && !blocked(node);

  function showCue(direction, amount) {
    cue.dataset.dir = direction;
    cueText.textContent = direction === 'intro' ? 'scroll to explore ↓'
      : direction === 'next' ? `keep scrolling · ${labels[nextIndex]} ↓` : `↑ ${labels[prevIndex]}`;
    cueFill.style.transform = `scaleX(${Math.min(1, amount)})`;
    cue.classList.add('is-on');
  }
  const hideCue = () => cue.classList.remove('is-on');

  function go(direction) {
    if (navigating) return;
    navigating = true;
    hideCue();
    const to = direction === 'next' ? nextIndex : prevIndex;
    try {
      sessionStorage.setItem(arrivalKey, JSON.stringify({ pathname: target(to).pathname, time: Date.now(), where: direction === 'next' ? 'top' : 'bottom' }));
    } catch {
      // Navigation still works when browser storage is unavailable.
    }
    location.assign(target(to).href);
  }

  // One notice for scrolling: "scroll to explore" at first, then "keep scrolling" at the end of a page.
  let cueQueued = false;
  const scrollable = () => document.documentElement.scrollHeight > innerHeight + 24;
  function refreshCue() {
    cueQueued = false;
    if (navigating || blocked(document.body)) return hideCue();
    // Before the reader has scrolled: invite them to. After: show what comes next at the end of the page.
    if (!armed) {
      if (!scrollable()) return showCue('next', 0);
      return atTop() ? showCue('intro', 0) : hideCue();
    }
    if (atBottom()) showCue('next', 0);
    else hideCue();
  }
  const queueCue = () => {
    if (cueQueued) return;
    cueQueued = true;
    requestAnimationFrame(refreshCue);
  };
  addEventListener('scroll', () => { armed = armed || scrollY > 8; queueCue(); }, { passive: true });
  // First look at the page, once it has settled.
  setTimeout(queueCue, 1000);
  addEventListener('pageshow', () => setTimeout(queueCue, 1000));

  // Mouse wheel and trackpad
  addEventListener('wheel', event => {
    armed = true;
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !enabled(event.target)) { wheel = null; return; }
    const now = performance.now();
    if (!wheel || now - wheel.time > 150) wheel = { atTop: atTop(), atBottom: atBottom(), distance: 0, time: now };
    wheel.time = now;
    const step = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (step > 0 && wheel.atBottom) {
      wheel.distance = Math.max(0, wheel.distance) + step;
      showCue('next', wheel.distance / WHEEL_NEEDED);
      if (wheel.distance >= WHEEL_NEEDED) go('next');
    } else if (step < 0 && wheel.atTop) {
      wheel.distance = Math.min(0, wheel.distance) + step;
      showCue('prev', -wheel.distance / WHEEL_NEEDED);
      if (-wheel.distance >= WHEEL_NEEDED) go('prev');
    }
  }, { passive: true });

  // Touch
  addEventListener('touchstart', event => {
    touch = null;
    armed = true;
    if (event.touches.length !== 1 || !enabled(event.target)) return;
    const point = event.touches[0];
    touch = { x: point.clientX, y: point.clientY, dx: 0, dy: 0, atTop: atTop(), atBottom: atBottom() };
  }, { passive: true });
  addEventListener('touchmove', event => {
    if (!touch || event.touches.length !== 1) { touch = null; return; }
    touch.dx = touch.x - event.touches[0].clientX;
    touch.dy = touch.y - event.touches[0].clientY;
    if (touch.atBottom && touch.dy > 0) showCue('next', touch.dy / TOUCH_NEEDED);
    else if (touch.atTop && touch.dy < 0) showCue('prev', -touch.dy / TOUCH_NEEDED);
  }, { passive: true });
  addEventListener('touchend', event => {
    const gesture = touch;
    touch = null;
    queueCue();
    if (!gesture || !enabled(event.target) || Math.abs(gesture.dy) <= Math.abs(gesture.dx) * 1.5) return;
    if (gesture.atBottom && gesture.dy >= TOUCH_NEEDED) go('next');
    else if (gesture.atTop && gesture.dy <= -TOUCH_NEEDED) go('prev');
  }, { passive: true });
  addEventListener('touchcancel', () => { touch = null; queueCue(); }, { passive: true });

  // Keyboard: press the same scroll key twice at the very end (or start) of a page.
  addEventListener('keydown', event => {
    armed = true;
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || !enabled(event.target)) return;
    const down = ['ArrowDown', 'PageDown', 'End', ' '].includes(event.key);
    const up = ['ArrowUp', 'PageUp', 'Home'].includes(event.key);
    const direction = down && atBottom() ? 'next' : up && atTop() ? 'prev' : '';
    if (!direction) return;
    clearTimeout(taps.timer);
    taps = { dir: direction, count: taps.dir === direction ? taps.count + 1 : 1, timer: setTimeout(() => { taps.count = 0; queueCue(); }, 1400) };
    showCue(direction, taps.count / 2);
    if (taps.count >= 2) go(direction);
  });

  function updateMode() {
    document.documentElement.classList.toggle('mobile-page-flow', mobile.matches);
  }
  mobile.addEventListener('change', updateMode);
  updateMode();

  // Warm up the neighbouring pages so the hand-over is quick.
  if (!navigator.connection?.saveData && !document.prerendering) {
    [nextIndex, prevIndex].forEach(i => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = target(i).href;
      document.head.append(link);
    });
  }

  function activate() {
    navigating = false;
    readyAt = performance.now() + 700;
    wheel = null;
    touch = null;
    try {
      const marker = JSON.parse(sessionStorage.getItem(arrivalKey) || 'null');
      if (marker?.pathname === location.pathname && Date.now() - marker.time < 15000) {
        sessionStorage.removeItem(arrivalKey);
        const place = () => scrollTo({ top: marker.where === 'bottom' ? document.documentElement.scrollHeight : 0, behavior: 'instant' });
        requestAnimationFrame(place);
        if (marker.where === 'bottom') {
          // Pages that fill in late (project cards, images) are measured again after they settle.
          addEventListener('load', place, { once: true });
          setTimeout(place, 350);
          setTimeout(place, 900);
        }
      }
    } catch {
      // Storage is optional.
    }
  }
  addEventListener('pageshow', activate);
  document.addEventListener('prerenderingchange', activate);
})();
