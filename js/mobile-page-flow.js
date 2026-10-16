(() => {
  const pages = ['index.html', 'projects.html', 'experience.html', 'education.html', 'contact.html'];
  const filename = location.pathname.split('/').pop() || 'index.html';
  const index = pages.indexOf(filename);
  if (index < 0) return;

  const mobile = matchMedia('(max-width: 960px)');
  const next = new URL(pages[(index + 1) % pages.length], location.href);
  if (index === pages.length - 1) next.hash = 'about';
  const arrivalKey = 'portfolio-scroll-arrival';
  let navigating = false;
  let readyAt = performance.now() + 150;
  let touch = null;
  let wheel = null;
  let prefetch;
  let speculation;

  function atBottom() {
    return scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
  }

  function blocked(target) {
    if (document.querySelector('dialog[open], .sw-lightbox[aria-hidden="false"]')) return true;
    if (!(target instanceof Element)) return false;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return true;
    for (let node = target; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
      if (node.scrollHeight > node.clientHeight + 2 && /^(auto|scroll)$/.test(getComputedStyle(node).overflowY)) return true;
    }
    return false;
  }

  function enabled(target) {
    return mobile.matches && !navigating && performance.now() >= readyAt && !blocked(target);
  }

  function openNextPage() {
    if (!mobile.matches || navigating || !atBottom()) return;
    navigating = true;
    try {
      sessionStorage.setItem(arrivalKey, JSON.stringify({ pathname: next.pathname, time: Date.now() }));
    } catch { /* Navigation still works when browser storage is unavailable. */ }
    location.assign(next.href);
  }

  // Require a fresh gesture at the bottom; reaching it mid-swipe must not skip content.
  addEventListener('touchstart', event => {
    touch = null;
    if (event.touches.length !== 1 || !enabled(event.target)) return;
    const point = event.touches[0];
    touch = { x: point.clientX, y: point.clientY, dx: 0, dy: 0, startedAtBottom: atBottom() };
  }, { passive: true });
  addEventListener('touchmove', event => {
    if (!touch || event.touches.length !== 1) { touch = null; return; }
    touch.dx = touch.x - event.touches[0].clientX;
    touch.dy = touch.y - event.touches[0].clientY;
  }, { passive: true });
  addEventListener('touchend', event => {
    const gesture = touch;
    touch = null;
    if (!gesture || !enabled(event.target)) return;
    if (gesture.startedAtBottom && gesture.dy >= 40 && gesture.dy > Math.abs(gesture.dx) * 1.5) openNextPage();
  }, { passive: true });
  addEventListener('touchcancel', () => { touch = null; }, { passive: true });

  addEventListener('wheel', event => {
    if (event.ctrlKey || event.deltaY <= 0 || Math.abs(event.deltaX) > event.deltaY || !enabled(event.target)) {
      wheel = null;
      return;
    }
    const now = performance.now();
    if (!wheel || now - wheel.time > 150) wheel = { startedAtBottom: atBottom(), distance: 0, time: now };
    wheel.time = now;
    wheel.distance += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (wheel.startedAtBottom && wheel.distance >= 40) openNextPage();
  }, { passive: true });

  function updateMode() {
    touch = null;
    wheel = null;
    document.documentElement.classList.toggle('mobile-page-flow', mobile.matches);
    if (mobile.matches && !navigator.connection?.saveData && !document.prerendering && !prefetch) {
      prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = next.href;
      document.head.append(prefetch);
    } else if ((!mobile.matches || navigator.connection?.saveData) && prefetch) {
      prefetch.remove();
      prefetch = null;
    }
    const canPrerender = mobile.matches && !navigator.connection?.saveData && !document.prerendering && HTMLScriptElement.supports?.('speculationrules');
    if (canPrerender && !speculation) {
      speculation = document.createElement('script');
      speculation.type = 'speculationrules';
      speculation.textContent = JSON.stringify({ prerender: [{ urls: [next.href], eagerness: 'immediate' }] });
      document.head.append(speculation);
    } else if (!mobile.matches && speculation) {
      speculation.remove();
      speculation = null;
    }
  }
  mobile.addEventListener('change', updateMode);
  updateMode();

  function activate() {
    navigating = false;
    readyAt = performance.now() + 150;
    wheel = null;
    touch = null;
    try {
      const marker = JSON.parse(sessionStorage.getItem(arrivalKey) || 'null');
      if (marker?.pathname === location.pathname && Date.now() - marker.time < 15000) {
        sessionStorage.removeItem(arrivalKey);
        requestAnimationFrame(() => scrollTo({ top: 0, behavior: 'instant' }));
      }
    } catch { /* Storage is optional. */ }
    updateMode();
  }
  addEventListener('pageshow', activate);
  document.addEventListener('prerenderingchange', activate);
})();
