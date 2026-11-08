(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Data-driven links may only be https: or mailto: (defence in depth; the data is first-party).
  const safeUrl = u => (/^(https:|mailto:)/i.test(String(u || '')) ? u : '#');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const IMG = 'assets/evidence/';
  const ICONS = window.ICONS || {};
  const icon = name => `<span class="ui-icon">${ICONS[name] || ICONS.project || ''}</span>`;
  const projects = window.PROJECTS || [];

  /* ---------- Projects: featured ones as full-width chapters, the rest as a list (original wording throughout) ---------- */
  const fields = ['#12241d', '#2a1416', '#121a2a', '#221626', '#241c12'];   // emerald, oxblood, midnight, aubergine, bronze
  const forms = ['blocks', 'rings', 'clusters', 'helix', 'trap'];
  const links = p => [
    p.github && `<a class="btn" href="${esc(safeUrl(p.github))}" target="_blank" rel="noopener noreferrer">${icon('github')}GitHub</a>`,
    p.demo && `<a class="btn" href="${esc(safeUrl(p.demo))}" target="_blank" rel="noopener noreferrer">${icon('external')}Live Demo</a>`,
    p.publication && `<a class="btn" href="${esc(safeUrl(p.publication))}" target="_blank" rel="noopener noreferrer">${icon('book')}Publication</a>`
  ].filter(Boolean).join('');
  const featured = projects.filter(p => p.category === 'Featured');
  const rest = projects.filter(p => p.category !== 'Featured');

  $('.chapters').innerHTML = featured.map((p, i) => {
    const source = p.github || p.publication;
    const stats = p.title === 'agent-ops' ? `
      <div class="stats">
        <div><p class="mono">Bug fixes passed</p><b>9<small>/ 10</small></b><p>my system prompt · plain prompt 7 / 10</p></div>
        <div><p class="mono">Time per bug fix</p><b>108<small>s</small></b><p>my system prompt · plain prompt 200 s</p></div>
        <div class="stats__note"><p>8 small payments tasks, each run twice, on a 9B local model. A small sample, so treat it as a rough guide.</p></div>
      </div>` : '';
    return `
    <article class="proj" data-bg="${fields[i % fields.length]}" data-form="${forms[i % forms.length]}" data-sec="projects" data-glow="${(i % 3) + 6}" aria-labelledby="p-${i}">
      <div class="proj__inner">
        <p class="proj__top mono"><span>${String(i + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}</span><span class="proj__cat">${icon(p.icon || 'project')}${esc(p.category)}</span></p>
        <h3 class="proj__title" id="p-${i}">${esc(p.title)}${p.hackathon ? `<small>${icon('code')}${esc(p.hackathon)}</small>` : ''}</h3>
        <figure class="proj__media">
          <div class="clip"><img src="${IMG}${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="${i ? 'lazy' : 'eager'}" decoding="async"></div>
          <figcaption class="mono"><span>${esc(p.imageCaption)}</span>${source ? `<a href="${esc(safeUrl(source))}" target="_blank" rel="noopener noreferrer">${icon(p.github ? 'github' : 'book')}Source</a>` : ''}</figcaption>
        </figure>
        <div class="proj__side">
          <dl class="story">
            <div><dt>The problem</dt><dd>${esc(p.problem)}</dd></div>
            <div><dt>What I built</dt><dd>${esc(p.built)}</dd></div>
            <div><dt>What came out</dt><dd>${esc(p.result)}</dd></div>
          </dl>
          ${stats}
          <ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="proj__links">${links(p)}</p>
        </div>
      </div>
    </article>`;
  }).join('');

  // Every other project: a compact row that expands into the full card (screenshot, story, tags, buttons).
  $('.archive__list').innerHTML = rest.map((p, i) => {
    const n = featured.length + i + 1, id = `row-${n}`, source = p.github || p.publication;
    return `
    <article class="arow" role="listitem">
      <button class="arow__head" type="button" aria-expanded="false" aria-controls="${id}">
        <span class="arow__n mono">${String(n).padStart(2, '0')}</span>
        <span class="arow__t">${esc(p.title)}<span>${esc(p.problem)}</span></span>
        <span class="arow__c mono">${esc(p.category)}</span>
        <span class="arow__s">${esc((p.tags || []).join(', '))}</span>
        <span class="arow__mark" aria-hidden="true">+</span>
      </button>
      <div class="arow__more" id="${id}"><div class="arow__inner">
        <figure class="arow__media">
          <img src="${IMG}${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy" decoding="async">
          <figcaption class="mono"><span>${esc(p.imageCaption)}</span>${source ? `<a href="${esc(safeUrl(source))}" target="_blank" rel="noopener noreferrer">${icon(p.github ? 'github' : 'book')}Source</a>` : ''}</figcaption>
        </figure>
        <div class="arow__body">
          <p class="proj__cat mono">${icon(p.icon || 'project')}${esc(p.category)}</p>
          ${p.hackathon ? `<p class="mono arow__ctx">${icon('code')}${esc(p.hackathon)}</p>` : ''}
          <dl class="story">
            <div><dt>The problem</dt><dd>${esc(p.problem)}</dd></div>
            <div><dt>What I built</dt><dd>${esc(p.built)}</dd></div>
            <div><dt>What came out</dt><dd>${esc(p.result)}</dd></div>
          </dl>
          <ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="proj__links">${links(p)}</p>
        </div>
      </div></div>
    </article>`;
  }).join('');
  $('.archive__list').addEventListener('click', e => {
    const head = e.target.closest('.arow__head'); if (!head) return;
    const row = head.parentElement, open = !row.classList.contains('is-open');
    row.classList.toggle('is-open', open);
    head.setAttribute('aria-expanded', open);
    $('.arow__more > div', row).inert = !open;
    if (window.ScrollTrigger) setTimeout(() => window.ScrollTrigger.refresh(), 500);
  });
  $$('.arow__more > div').forEach(d => (d.inert = true));

  /* ---------- Terminal: types commands and prints real lines, then loops ---------- */
  (() => {
    const box = $('[data-typing]'); if (!box) return;
    const reducedT = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedT) return; // the static list in the HTML stays as is
    const list = box.querySelector('ul').outerHTML;
    const scripts = [
      { cmd: 'shrey open portfolio', out: list, html: true },
      { cmd: 'whoami', out: 'Shrey Shrivastava · AI / ML Engineer' },
      { cmd: 'cat focus.txt', out: 'Making models useful to real people: paper search, medical data pipelines, scam detection, on-device sensing and a local coding agent.' },
      { cmd: 'ls projects | wc -l', out: String(projects.length) },
      { cmd: 'agent-ops --bench', out: 'bug fixes passed   9 / 10  (plain prompt 7 / 10)\ntime per bug fix   108 s   (plain prompt 200 s)' },
      { cmd: 'open mailto:shrey.shrivastava@yahoo.com', out: 'For roles, interviews or collaboration, email me directly.' }
    ];
    box.innerHTML = '<div class="term__screen" aria-live="off"></div><p class="visually-hidden">Animated terminal; the section links are also in the menu above.</p>';
    const screen = box.firstChild;
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let visible = true;
    new IntersectionObserver(e => (visible = e[0].isIntersecting)).observe(box);
    const waitVisible = async () => { while (!visible || document.hidden) await sleep(300); };
    (async function loop() {
      for (let k = 0; ; k = (k + 1) % scripts.length) {
        const s = scripts[k];
        // keep only the previous exchange on screen, so it reads like a live session without growing
        if (k === 0) screen.innerHTML = '';
        while (screen.children.length > 2) screen.firstElementChild.remove();
        const line = document.createElement('p'); line.className = 'readout__cmd';
        line.innerHTML = '<span>&gt;</span> <em class="t"></em><i class="caret"></i>';
        screen.append(line);
        const t = line.querySelector('.t');
        await waitVisible();
        for (const ch of s.cmd) { t.textContent += ch; await sleep(45 + Math.random() * 55); }
        await sleep(260);
        line.querySelector('.caret').remove();
        const out = document.createElement('div'); out.className = 'term__out';
        if (s.html) out.innerHTML = s.out; else out.textContent = s.out;
        screen.append(out);
        if (s.html) { [...out.querySelectorAll('li')].forEach((li, j) => { li.style.animationDelay = `${j * 90}ms`; }); }
        await sleep(k === 0 ? 3200 : 2200);
      }
    })();
  })();

  /* ---------- Hero photo matches the full height of the name, however many lines it wraps to ---------- */
  (() => {
    const id = $('.hero__id'), name = $('.hero__name'); if (!id || !name) return;
    const fit = () => id.style.setProperty('--name-h', name.getBoundingClientRect().height + 'px');
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(name);
    if (document.fonts) document.fonts.ready.then(fit);
  })();

  /* ---------- Static icons (data-icon), as on the original pages ---------- */
  $$('[data-icon]').forEach(n => n.insertAdjacentHTML('afterbegin', icon(n.dataset.icon)));

  /* ---------- Background colour + active menu item follow the section ---------- */
  const body = document.body;
  const navLinks = $$('.nav__menu a');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(en => en.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      body.style.setProperty('--bg', el.dataset.bg);
      body.classList.toggle('is-light', el.dataset.ink === 'light');
      body.dataset.glow = el.dataset.glow || body.dataset.glow || '0';
      navLinks.forEach(a => {
        const on = a.dataset.sec === el.dataset.sec;
        a.classList.toggle('is-active', on);
        on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
      });
    }), { rootMargin: '-50% 0px -50% 0px' });
    $$('[data-bg]').forEach(c => io.observe(c));
  }

  /* ---------- Motion (only if libraries loaded and motion allowed) ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap, ScrollTrigger, Lenis } = window;
  if (reduced || !gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion');

  if (Lenis) {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const target = $(a.getAttribute('href')); if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64) });
    });
  }

  $$('.split').forEach(h => {
    const words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map(w => `<span class="w" aria-hidden="true"><span>${esc(w)}</span></span>`).join(' ');
  });
  const ease = 'power3.out';
  gsap.timeline({ defaults: { ease } })
    .from('.hero .split .w > span', { yPercent: 105, duration: .9, stagger: .07 })
    .from('.hero__meta, .hero__photo, .hero__cap, .hero__grid > *', { opacity: 0, y: 16, duration: .7, stagger: .06 }, '-=.5');
  $$('.split').filter(h => !h.closest('.hero')).forEach(h => {
    gsap.from($$('.w > span', h), { yPercent: 105, duration: .76, stagger: .055, ease, scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  // Organic scroll-in: things drift up out of a soft blur as they enter, in small staggered groups,
  // with a long expo ease so the motion settles rather than stops. Each element animates once.
  const revealSel = [
    '.page__status', '.cmd', '.eyebrow', '.page__lede', '.page__actions', '.block__label',
    '.points li', '.hello > p', '.proj__top', '.proj__media', '.proj__side > *', '.arow',
    '.grid > .card', '.contact-hub > .ccard', '.hero__lede', '.readout', '.hero__cap'
  ].join(',');
  $$(revealSel).forEach(el => el.setAttribute('data-reveal', ''));
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.15, ease: 'expo.out', stagger: .09, overwrite: true,
      onComplete() { batch.forEach(el => { el.style.willChange = 'auto'; }); } })
  });
  // A gentle parallax on project screenshots so the chapters breathe as you scroll past.
  $$('.proj__media .clip img').forEach(img => gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.08, ease: 'none',
    scrollTrigger: { trigger: img.closest('.proj'), start: 'top bottom', end: 'bottom top', scrub: .8 } }));
  addEventListener('load', () => ScrollTrigger.refresh());
})();
