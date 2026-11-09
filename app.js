(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Data-driven links may only be https: or mailto: (defence in depth; the data is first-party).
  const safeUrl = u => (/^(https:|mailto:)/i.test(String(u || '')) ? u : '#');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const IMG = 'assets/evidence/';
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const demoVideo = (p, cls = '') => `<video class="${cls}" ${calm ? 'controls' : 'autoplay loop'} muted playsinline preload="metadata" width="960" height="540" poster="${esc(p.poster)}" aria-label="${esc(p.videoAlt || p.imageAlt)}"><source src="${esc(p.video)}" type="video/mp4"><img src="${IMG}${esc(p.image)}" alt="${esc(p.imageAlt)}"></video>`;
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
  // Projects ordered by impact: shipped/live, real users or institutions, published or hackathon-backed
  // work first; coursework and learning notebooks last. The top five become the full chapters.
  const IMPACT = [
    'AcademicForge', 'AI Healthcare Intel Engine', 'FallGuard AI', 'Claim Detection on Russia-Ukraine Conflict',
    'Bhopal Safety Intelligence', 'Gas Cylinder Detection System', 'agent-ops', 'Agentic Honeypot System',
    'Pupil Anomaly Detection', 'ATS Resume Checker', 'Academic Search Engine for Papers', 'Local Lore Generator',
    'Polygon Arbitrage Bot', 'Tube Network Route Finder', 'Sentiment Analysis on Tweets', 'Car Detection System',
    'CIFAR-10 Image Classification', 'COVID-19 Tracker', 'Diabetes Regression Analysis', 'Friends Character Similarity',
    'Llama2 Prompt Exploration', 'Neural Network Introduction', 'Logistic Regression Iris Classification'
  ];
  const rank = t => { const i = IMPACT.indexOf(t); return i < 0 ? 999 : i; };
  projects.sort((a, b) => rank(a.title) - rank(b.title));
  const featured = projects.slice(0, 5);
  const rest = projects.slice(5);

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
        <p class="proj__result"><span class="mono">Result</span>${esc((p.result.match(/^[^.]*\./) || [p.result])[0])}</p>
        <figure class="proj__media">
          <div class="clip">${p.video ? demoVideo(p, 'clip__video') : `<img src="${IMG}${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="${i ? 'lazy' : 'eager'}" decoding="async">`}</div>
          <figcaption class="mono"><span>${esc(p.video ? 'Demo video / Repository' : p.imageCaption)}</span><span class="fig__links">${p.demo ? `<a class="fig__live" href="${esc(safeUrl(p.demo))}" target="_blank" rel="noopener noreferrer">● Try it live ↗</a>` : ''}${source ? `<a href="${esc(safeUrl(source))}" target="_blank" rel="noopener noreferrer">${icon(p.github ? 'github' : 'book')}Source</a>` : ''}</span></figcaption>
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
  // Jump bar: go straight to any featured project (like the product tabs on YC landing pages)
  const jumpBar = $('.jump');
  if (jumpBar) jumpBar.innerHTML = featured.map((p, i) => `<a href="#p-${i}"><span class="mono">${String(i + 1).padStart(2, '0')}</span>${esc(p.title)}</a>`).join('');

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
          <figcaption class="mono"><span>${esc(p.video ? 'Demo video / Repository' : p.imageCaption)}</span><span class="fig__links">${p.demo ? `<a class="fig__live" href="${esc(safeUrl(p.demo))}" target="_blank" rel="noopener noreferrer">● Try it live ↗</a>` : ''}${source ? `<a href="${esc(safeUrl(source))}" target="_blank" rel="noopener noreferrer">${icon(p.github ? 'github' : 'book')}Source</a>` : ''}</span></figcaption>
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
    // The terminal doubles as a product shot, showing only projects that are live right now,
    // led by AcademicForge. Each screenshot opens its live demo.
    const HERO = ['AcademicForge', 'Bhopal Safety Intelligence', 'FallGuard AI', 'AI Healthcare Intel Engine', 'Pupil Anomaly Detection'];
    const VERIFIED_LIVE = ['AcademicForge', 'AI Healthcare Intel Engine', 'Bhopal Safety Intelligence', 'Claim Detection on Russia-Ukraine Conflict', 'Local Lore Generator', 'Pupil Anomaly Detection'];
    const live = HERO.map(t => projects.find(p => p.title === t)).filter(Boolean);
    const isLive = p => VERIFIED_LIVE.includes(p.title) && p.demo;
    const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const host = u => { try { return new URL(u).host; } catch (e) { return ''; } };
    const shot = p => {
      const on = isLive(p), href = on ? p.demo : (p.github || p.demo);
      return {
        cmd: (on ? 'open --live ' : 'open ') + slug(p.title),
        html: true, shot: true, video: !!p.video,
        out: `<a class="term__shot" href="${esc(safeUrl(href))}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(p.title)}${on ? ' live demo' : ''}">${p.video ? demoVideo(p, 'shot__video') : `<img src="${IMG}${esc(p.image)}" alt="${esc(p.imageAlt)}" decoding="async">`}<span>${on ? '<b>● live</b> ' : ''}${esc(p.title)}${on ? `<i class="host"> · ${esc(host(p.demo))}</i><em class="try">Try it live ↗</em>` : (p.hackathon ? `<i class="host"> · ${esc(p.hackathon)}</i>` : '')}</span></a>`
      };
    };
    const scripts = [
      { cmd: 'shrey open portfolio', out: list, html: true },
      ...live.flatMap((p, i) => i === 1 ? [{ cmd: 'whoami', out: 'Shrey Shrivastava · AI / ML Engineer' }, shot(p)]
                                : i === 3 ? [{ cmd: 'cat focus.txt', out: 'Making models useful to real people: paper search, medical data pipelines, scam detection, on-device sensing and a local coding agent.' }, shot(p)]
                                : [shot(p)]),
      { cmd: 'ls --live', out: projects.filter(isLive).map(p => '● ' + p.title).join('\n') },
      { cmd: 'open mailto:shrey.shrivastava@yahoo.com', out: 'For roles, interviews or collaboration, email me directly.' }
    ];
    box.innerHTML = '<div class="term__screen" aria-live="off"></div><p class="visually-hidden">Animated terminal; the section links are also in the menu above.</p>';
    const screen = box.firstChild;
    // The window grows and shrinks to whatever is on screen (a tall phone screenshot, a wide dashboard, a one-line answer).
    const fitBox = () => {
      if (!box.classList.contains('readout--show')) return;
      const cs = getComputedStyle(box);
      const chrome = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
      const need = [...screen.children].reduce((h, el) => h + el.getBoundingClientRect().height + parseFloat(getComputedStyle(el).marginTop) + parseFloat(getComputedStyle(el).marginBottom), 0) + chrome;
      box.style.height = Math.max(200, Math.ceil(need)) + 'px';
    };
    addEventListener('resize', () => fitBox());
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let visible = true;
    new IntersectionObserver(e => (visible = e[0].isIntersecting)).observe(box);
    const waitVisible = async () => { while (!visible || document.hidden) await sleep(300); };
    // Start already showing the first exchange (the section list), so the box is never empty.
    const first = document.createElement('p'); first.className = 'readout__cmd';
    first.innerHTML = '<span>&gt;</span> <em class="t"></em>';
    first.querySelector('.t').textContent = scripts[0].cmd;
    const firstOut = document.createElement('div'); firstOut.className = 'term__out'; firstOut.innerHTML = scripts[0].out;
    screen.append(first, firstOut);
    requestAnimationFrame(fitBox);
    (async function loop() {
      await sleep(2600);
      for (let k = 1; ; k = (k + 1) % scripts.length) {
        const s = scripts[k];
        // keep the previous exchange visible while the next one types; the screen is bottom-anchored,
        // so the newest lines always show and older ones scroll off the top
        while (screen.children.length > (scripts[k].shot ? 2 : 4)) screen.firstElementChild.remove();
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
        const vid = out.querySelector('video');
        if (vid) { await new Promise(r => { if (vid.readyState >= 1) r(); else { vid.addEventListener('loadedmetadata', r, { once: true }); setTimeout(r, 1500); } }); vid.play && vid.play().catch(() => {}); }
        const img = vid ? null : out.querySelector('img');
        if (img) {
          await (img.decode ? img.decode().catch(() => {}) : Promise.resolve());
          out.classList.toggle('is-portrait', img.naturalHeight > img.naturalWidth);
        }
        if (s.html) { [...out.querySelectorAll('li')].forEach((li, j) => { li.style.animationDelay = `${j * 90}ms`; }); }
        if (s.shot) while (screen.children.length > 2) screen.firstElementChild.remove();
        fitBox();
        await sleep(s.video ? 11000 : s.shot ? 3400 : 2200);
      }
    })();
  })();

  /* ---------- Hero photo matches the full height of the name, however many lines it wraps to ---------- */
  (() => {
    const id = $('.hero__id'), name = $('.hero__name'); if (!id || !name) return;
    // the photo spans the identity block: from the cap of the name to the bottom of the role line
    const fit = () => {
      id.style.setProperty('--name-h', name.getBoundingClientRect().height + 'px');
      const block = name.parentElement.getBoundingClientRect(), nameTop = name.getBoundingClientRect().top;
      id.style.setProperty('--id-h', (block.bottom - nameTop) + 'px');
    };
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
      // once settled, drop the leftover transform/filter so text renders on crisp whole pixels
      onComplete() { batch.forEach(el => { el.removeAttribute('data-reveal'); gsap.set(el, { clearProps: 'transform,filter,opacity,willChange' }); }); } })
  });
  // A gentle parallax on project screenshots so the chapters breathe as you scroll past.
  $$('.proj__media .clip img').forEach(img => gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.08, ease: 'none',
    scrollTrigger: { trigger: img.closest('.proj'), start: 'top bottom', end: 'bottom top', scrub: .8 } }));
  addEventListener('load', () => ScrollTrigger.refresh());
})();
