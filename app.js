(() => {
  const ROOT = '', IMG = ROOT + 'assets/evidence/';
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safe = u => { try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : '#'; } catch (e) { return '#'; } };
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const IMPACT = ['AcademicForge', 'Bhopal Safety Intelligence', 'AI Healthcare Intel Engine', 'FallGuard AI', 'Claim Detection on Russia-Ukraine Conflict', 'Gas Cylinder Detection System', 'agent-ops', 'Agentic Honeypot System', 'Pupil Anomaly Detection', 'ATS Resume Checker', 'Academic Search Engine for Papers', 'Local Lore Generator', 'Polygon Arbitrage Bot', 'Tube Network Route Finder', 'Sentiment Analysis on Tweets', 'Car Detection System', 'CIFAR-10 Image Classification', 'COVID-19 Tracker', 'Diabetes Regression Analysis', 'Friends Character Similarity', 'Llama2 Prompt Exploration', 'Neural Network Introduction', 'Logistic Regression Iris Classification'];
  const LIVE = ['AcademicForge', 'AI Healthcare Intel Engine', 'Bhopal Safety Intelligence', 'Claim Detection on Russia-Ukraine Conflict', 'Pupil Anomaly Detection', 'Local Lore Generator'];
  const rank = t => { const i = IMPACT.indexOf(t); return i < 0 ? 999 : i; };
  const projects = [...(window.PROJECTS || [])].sort((a, b) => rank(a.title) - rank(b.title));
  const pad = n => String(n).padStart(2, '0');

  const links = p => {
    const src = p.github || p.publication;
    return `<p class="links">${LIVE.includes(p.title) && p.demo ? `<a class="live" href="${esc(safe(p.demo))}" target="_blank" rel="noopener noreferrer">Try it live ↗</a>` : ''}${src ? `<a href="${esc(safe(src))}" target="_blank" rel="noopener noreferrer">Source ↗</a>` : ''}</p>`;
  };
  const story = p => `<dl class="story"><div><dt>The problem</dt><dd>${esc(p.problem)}</dd></div><div><dt>What I built</dt><dd>${esc(p.built)}</dd></div><div><dt>What came out</dt><dd>${esc(p.result)}</dd></div></dl>`;
  const media = (p, lazy) => p.video
    ? `<video ${calm ? 'controls' : 'autoplay loop'} muted playsinline preload="metadata" poster="${esc(ROOT + p.poster)}" aria-label="${esc(p.videoAlt)}"><source src="${esc(ROOT + p.video)}" type="video/mp4"></video>`
    : `<img src="${IMG + esc(p.image)}" alt="${esc(p.imageAlt)}" ${lazy ? 'loading="lazy"' : ''} decoding="async">`;

  if ($('.track')) $('.track').innerHTML = projects.slice(0, 5).map((p, i) => `<article class="panel">
    <div class="panel__top"><span>~/projects/${esc(p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''))}</span><span>${pad(i + 1)}/05 ${esc(p.hackathon || p.tags?.[0] || '')}</span></div>
    <h3>${esc(p.title)}</h3>
    <div class="panel__body"><div class="media">${media(p, i > 0)}</div><div class="panel__txt">${story(p)}${links(p)}</div></div>
  </article>`).join('');

  if ($('.rows')) $('.rows').innerHTML = projects.slice(5).map((p, i) => `<div class="row" data-img="${p.image ? IMG + esc(p.image) : ''}">
    <button class="row__b" aria-expanded="false" aria-controls="r${i}"><span class="row__n">${pad(i + 6)}</span><span class="row__t">${esc(p.title)}</span><span class="row__p" aria-hidden="true">+</span></button>
    <div class="row__x" id="r${i}"><div class="row__c"><div class="row__g"><div class="media">${media(p, true)}</div><div>${story(p)}${links(p)}</div></div></div></div>
  </div>`).join('');

  $$('.row__b').forEach(b => b.addEventListener('click', () => {
    const row = b.parentElement, open = row.classList.toggle('open');
    b.setAttribute('aria-expanded', open);
    peek.style.opacity = 0;
    setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 600);
  }));

  // Section labels become commands typed when they scroll into view
  const CMD = { 'About': 'whoami', 'Projects': 'ls ~/projects --sort=impact', 'How I build': 'cat how-i-build.md', 'Learned the hard way': 'cat learned-the-hard-way.md', 'All projects': 'ls ~/projects/all', 'Experience': 'git log --author=shrey', 'Education': 'cat education.txt', 'Contact': 'mail shrey' };
  $$('.label').forEach(l => {
    const name = l.textContent.trim(), cmd = CMD[name] || name;
    l.setAttribute('aria-label', name);
    l.innerHTML = '<span class="ps" aria-hidden="true">$</span> <span class="ty" aria-hidden="true"></span><b class="caret" aria-hidden="true"></b>';
    const ty = $('.ty', l);
    if (calm) { ty.textContent = cmd; $('.caret', l).remove(); return; }
    const delay = l.closest('.hero') ? 2300 : 120;
    const seen = new IntersectionObserver(es => { if (!es[0].isIntersecting) return; seen.disconnect();
      setTimeout(() => { let i = 0; const t = setInterval(() => { ty.textContent = cmd.slice(0, ++i); if (i >= cmd.length) { clearInterval(t); $('.caret', l).remove(); } }, 32); }, delay); });
    seen.observe(l);
  });

  // Words wrapped in masks for line-rise reveals
  $$('.split').forEach(el => {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(' ').map(w => `<span class="w" aria-hidden="true"><span class="wi">${esc(w)}</span></span>`).join(' ');
  });
  const scrub = $('.scrub');
  if (scrub) {
    const scrubText = scrub.textContent;
    scrub.setAttribute('aria-label', scrubText);
    scrub.innerHTML = scrubText.split(' ').map(w => `<span aria-hidden="true">${esc(w)}</span>`).join(' ');
  }

  const FIELD = window.FIELD = window.FIELD || { dive: 0, t: 'ink' };

  // Colour follows whichever section holds the middle of the screen
  const sections = $$('main [data-theme]');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    document.documentElement.dataset.theme = FIELD.t = e.target.dataset.theme;
  }), { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(s => io.observe(s));

  // Pager prompt: if the reader stops, tell them there is more and which way it is
  const more = $('.more'), wide = matchMedia('(min-width:900px)');
  let idle;
  const armMore = () => {
    more.classList.remove('on'); clearTimeout(idle);
    idle = setTimeout(() => {
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 40) return;
      if (!wide.matches || calm) return;
      const hs = $('.hscroll'), he = $('.hero');
      const r = hs && hs.getBoundingClientRect();
      const sideways = !!r && r.top <= 1 && r.bottom >= innerHeight - 1;
      const inHero = !!he && Math.abs(he.getBoundingClientRect().top) <= 1;
      if (!sideways && !inHero) return;
      $('.more__d').textContent = sideways ? 'scroll for next project →' : 'scroll ↓';
      more.classList.add('on');
    }, 1300);
  };
  ['scroll', 'wheel', 'touchmove', 'keydown'].forEach(e => addEventListener(e, armMore, { passive: true }));
  setTimeout(armMore, calm ? 0 : 2600);

  // Pointer details
  const cursor = $('.cursor'), peek = $('.peek');
  if (fine && !calm && window.gsap) {
    const cx = gsap.quickTo(cursor, 'x', { duration: .25, ease: 'power3' }), cy = gsap.quickTo(cursor, 'y', { duration: .25, ease: 'power3' });
    const px = gsap.quickTo(peek, 'x', { duration: .6, ease: 'power3' }), py = gsap.quickTo(peek, 'y', { duration: .6, ease: 'power3' });
    addEventListener('pointermove', e => { cx(e.clientX); cy(e.clientY); px(e.clientX + 28); py(e.clientY - 130); }, { passive: true });
    document.addEventListener('pointerover', e => cursor.classList.toggle('on', !!e.target.closest('a,button')));
    $$('.row').forEach(r => {
      r.firstElementChild.addEventListener('pointerenter', () => { if (r.dataset.img && !r.classList.contains('open')) { peek.src = r.dataset.img; peek.style.opacity = 1; } });
      r.firstElementChild.addEventListener('pointerleave', () => peek.style.opacity = 0);
    });
  }

  const loader = $('.loader');
  if (!window.gsap || calm || document.hidden) { if (loader) loader.remove(); return; }
  gsap.registerPlugin(ScrollTrigger);
  if ($('.hero')) { history.scrollRestoration = 'manual'; scrollTo(0, 0); }
  const lenis = new Lenis({ lerp: .11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t); } }));

  // Opening: counter, flame curtain lifts, name rises
  if ($('.hero')) {
    const n = { v: 0 }, count = $('.loader__n');
    const fresh = !!loader && !document.documentElement.classList.contains('seen');
    if (loader && !fresh) loader.remove();
    gsap.set('.name__t', { yPercent: 105 }); gsap.set('.tagline .wi', { yPercent: 115 }); gsap.set('.name__side', { opacity: 0, y: 30 }); gsap.set('.hero [data-r]', { opacity: 0, y: 24 });
    const intro = gsap.timeline({ onComplete: () => { if (fresh) loader.remove(); try { sessionStorage.setItem('intro-seen', '1'); } catch (e) {} } });
    if (fresh) intro.to(n, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => count.textContent = n.v | 0 }).to(loader, { yPercent: -100, duration: .85, ease: 'expo.inOut' });
    intro.to('.name__t', { yPercent: 0, duration: 1.1, stagger: .09, ease: 'expo.out' }, fresh ? '-=.4' : 0)
      .to('.tagline .wi', { yPercent: 0, duration: .9, stagger: .03, ease: 'power3.out' }, '-=.8')
      .to('.name__side,.hero [data-r]', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.8');
  }

  // Hero as a scene: the name parts, the camera flies into the form, the promise appears inside it
  gsap.matchMedia().add('(min-width:900px)', () => {
    if (!$('.hero')) return;
    const rows = $$('.name__row');
    document.documentElement.classList.add('has-scene');
    gsap.set('.dive .wi', { yPercent: 115 });
    gsap.timeline({ scrollTrigger: { trigger: '.hero', pin: true, start: 'top top', end: '+=105%', scrub: .5, anticipatePin: 1 } })
      .to('.hero__foot', { opacity: 0, y: 50, duration: .25 }, 0)
      .to(rows[0], { xPercent: -70, opacity: 0, duration: .4, ease: 'power2.in' }, 0)
      .to(rows[1], { xPercent: 70, opacity: 0, duration: .4, ease: 'power2.in' }, 0)
      .to(FIELD, { dive: 1, duration: .6, ease: 'power2.inOut' }, 0)
      .to('.dive .wi', { yPercent: 0, duration: .3, stagger: .02, ease: 'power3.out' }, .3)
      .to(FIELD, { dive: 0, duration: .3, ease: 'power2.inOut' }, .85);
  });

  // Pinned sideways walk through the top five
  gsap.matchMedia().add('(min-width:900px)', () => {
    const track = $('.track');
    if (!track) return;
    gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: 'none', scrollTrigger: { trigger: '.hscroll', pin: true, scrub: .6, end: () => '+=' + (track.scrollWidth - innerWidth), invalidateOnRefresh: true } });
  });

  $$('.split').filter(e => !e.closest('.hero')).forEach(el => gsap.from($$('.wi', el), { yPercent: 115, duration: 1.1, stagger: .035, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } }));
  $$('[data-r]').filter(e => !e.closest('.hero')).forEach(el => gsap.from(el, { y: 44, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: el.closest('.contact') ? { trigger: '.contact', start: 'top 45%', toggleActions: 'play none none reverse' } : { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' } }));
  if (scrub) gsap.from($$('span', scrub), { opacity: .16, stagger: .1, ease: 'none', scrollTrigger: { trigger: scrub, start: 'top 78%', end: 'bottom 55%', scrub: true } });
  if ($('.hero')) gsap.to('.portrait img', { yPercent: 8, scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
