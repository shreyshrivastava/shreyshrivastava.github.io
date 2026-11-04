// The thread: one progress bar for the whole site. A rail down the left edge is split into five
// segments, one per page, each in that page's colour. It fills as you read, carries on from where
// the last page ended, and after Contact it loops back to About. Decoration only (aria-hidden).
(() => {
  const pageIds = ['about', 'projects', 'experience', 'education', 'contact'];
  const palette = ['#17d7c8', '#38bdf8', '#ffb657', '#34d399', '#f472b6'];
  const filename = location.pathname.split('/').pop().replace('.html', '');
  const page = Math.max(0, pageIds.indexOf(filename));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const accent = palette[page];
  const count = palette.length;

  const root = document.createElement('div');
  root.className = 'thread';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = '<div class="thread__rail"></div>' +
    '<div class="thread__lit"><i class="thread__fill"></i><i class="thread__pulse"></i></div>' +
    '<i class="thread__head"></i>' +
    palette.map((color, i) => `<i class="thread__mark" style="--mark:${color};top:${(i / count) * 100}%"></i>`).join('');
  document.body.appendChild(root);
  const lit = root.querySelector('.thread__lit');
  const head = root.querySelector('.thread__head');
  const marks = [...root.querySelectorAll('.thread__mark')];

  // Arriving from another page: pick the bar up where the last page left it, and keep the old
  // colour until the bar has travelled to this page's position, then change to this page's colour.
  let arrival = null;
  try {
    const stored = JSON.parse(sessionStorage.getItem('thread-nav') || 'null');
    sessionStorage.removeItem('thread-nav');
    if (stored && Date.now() - stored.t < 6000) arrival = stored;
  } catch {
    // Without storage the thread simply starts at this page's position.
  }
  const arriving = Boolean(arrival) && !reduceMotion;
  const ARRIVE_MS = 750;
  if (arriving) {
    document.documentElement.dataset.threadArriving = '1';
    root.style.setProperty('--thread-accent', arrival.accent || accent);
    setTimeout(() => root.style.setProperty('--thread-accent', accent), ARRIVE_MS);
  } else {
    root.style.setProperty('--thread-accent', accent);
  }

  let railHeight = 0;
  let queued = false;
  let latest = 0;
  let arrivedPainted = !arriving;

  // Position in the whole journey, from 0 (top of About) to 1 (bottom of Contact).
  function progress() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    return (page + Math.min(1, Math.max(0, scrollY / max))) / count;
  }

  function paint(value) {
    latest = value;
    lit.style.height = value * 100 + '%';
    head.style.top = value * 100 + '%';
    root.style.setProperty('--lit-h', value * railHeight + 'px');
    marks.forEach((mark, i) => {
      mark.classList.toggle('is-lit', value >= i / count - 0.0001);
      mark.classList.toggle('is-current', i === page);
    });
  }

  function layout() {
    // The rail starts under the top bar so it never runs behind the menu.
    const header = document.querySelector('.site-header, .sw-topbar');
    const top = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    root.style.top = top + 'px';
    railHeight = Math.max(1, innerHeight - top);
    root.style.setProperty('--rail-h', railHeight + 'px');
    paint(arriving && !arrivedPainted ? latest : progress());
  }

  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      if (arrivedPainted) paint(progress());
    });
  }

  layout();
  if (arriving) {
    // Start exactly where the last page ended (no transition yet), then travel to this page's position.
    paint(Math.min(1, Math.max(0, Number(arrival.progress) || 0)));
    void lit.offsetHeight;
    root.classList.add('is-arriving');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      arrivedPainted = true;
      paint(progress());
      setTimeout(() => root.classList.remove('is-arriving'), ARRIVE_MS + 50);
    }));
  }

  // Remember where the bar is whenever the page is left (menu, scrolling on, back and forward).
  addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem('thread-nav', JSON.stringify({
        t: Date.now(),
        accent: getComputedStyle(root).getPropertyValue('--thread-accent').trim() || accent,
        progress: progress(),
      }));
    } catch {
      // Without storage the next page just starts fresh.
    }
  });
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', () => { layout(); });
  addEventListener('load', layout);
  if ('ResizeObserver' in window) new ResizeObserver(() => queue()).observe(document.body);
})();
