// Builds the home page: top bar with the menu, the About intro, and the photo viewer.
// (This replaces the old scroll-through-scenes engine. Nothing from that design is built here.)
(() => {
  const root = document.getElementById('world');
  if (!root) return;

  const sections = [
    { id: 'about', label: 'About', href: '#about', accent: '#17D7C8' },
    { id: 'projects', label: 'Projects', href: 'projects.html' },
    { id: 'experience', label: 'Experience', href: 'experience.html' },
    { id: 'education', label: 'Education', href: 'education.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  const about = {
    profile: { image: 'assets/profile/shrey-city-profile.jpg', alt: 'Shrey Shrivastava', caption: 'AI / ML Engineer' },
    title: 'Shrey Shrivastava.',
    body: 'I’m an AI/ML engineer. I build systems that take a model out of a notebook and into something people can use, covering search, classification, forecasting and detection, plus the testing and deployment around them.',
    items: [
      {
        title: 'Current Focus',
        icon: 'project',
        body: 'Making models useful to real people: paper search, medical data pipelines, scam detection, on-device sensing and a local coding agent.',
        href: 'projects.html',
        linkLabel: 'See my projects',
      },
      {
        title: 'shrey.shrivastava@yahoo.com',
        titleHref: 'mailto:shrey.shrivastava@yahoo.com',
        icon: 'mail',
        body: 'For roles, interviews or collaboration, email me directly.',
        href: 'mailto:shrey.shrivastava@yahoo.com',
        linkLabel: 'Send email',
        secondaryHref: 'contact.html',
        secondaryLabel: 'Contact page',
      },
    ],
    tags: ['Machine learning', 'NLP', 'Computer vision', 'AI systems'],
  };

  // Old links such as index.html#projects still land on the right page.
  const wanted = sections.findIndex(section => section.id === location.hash.slice(1));
  if (wanted > 0) {
    location.replace(sections[wanted].href);
    return;
  }

  injectCSS();
  root.classList.add('sw-root', 'sw-about-only');
  root.style.setProperty('--sw-accent', sections[0].accent);
  root.style.setProperty('--sw-nav-accent', sections[0].accent);

  const el = (tag, cls) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    return node;
  };
  const esc = value => String(value).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const attrs = href => (/^(#|\/|\.\/|\.\.\/)/.test(href) || /^[\w-]+\.html(?:[#?].*)?$/.test(href) ? '' : ' target="_blank" rel="noopener noreferrer"');
  const icons = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8.1L5.4 7H4v.6l8 7.35 8-7.35V7h-1.4L12 13.1Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6h-2V7.41l-8.3 8.3-1.4-1.42 8.29-8.29H14V4ZM5 6h6v2H7v9h9v-4h2v6H5V6Z"/></svg>',
    project: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/></svg>',
  };
  const icon = name => (icons[name] ? `<span class="sw-icon">${icons[name]}</span>` : '');
  const linkIcon = href => (/mailto/.test(href) ? 'mail' : 'external');

  // Background. Reading progress is shown by the thread down the left edge.
  const sky = el('div', 'sw-sky');
  sky.append(el('div', 'sw-sky__grad'), el('div', 'sw-sky__glow'));

  // Top bar: brand and the one menu.
  const topbar = el('div', 'sw-topbar');
  const brand = el('a', 'sw-brand');
  brand.href = '#top';
  brand.append(el('span', 'sw-brand__mark'));
  const name = el('span', 'sw-brand__name');
  name.textContent = 'Shrey Shrivastava';
  brand.appendChild(name);
  const nav = el('nav', 'sw-nav');
  sections.forEach((section, index) => {
    const item = el('a', 'sw-nav__item' + (index === 0 ? ' is-active' : ''));
    item.href = section.href;
    item.textContent = section.label;
    nav.appendChild(item);
  });
  topbar.append(brand, nav);

  // The About intro.
  const copylayer = el('div', 'sw-copylayer');
  const copy = el('article', 'sw-copy');
  copy.dataset.section = 'about';
  copy.classList.add('is-interactive');
  copy.style.cssText = 'opacity:1;pointer-events:auto;transform:none';
  const items = about.items.map(item => {
    const link = item.href ? `<a href="${esc(item.href)}"${attrs(item.href)}>${icon(linkIcon(item.href))}${esc(item.linkLabel)}</a>` : '';
    const second = item.secondaryHref ? `<a href="${esc(item.secondaryHref)}"${attrs(item.secondaryHref)}>${icon('external')}${esc(item.secondaryLabel)}</a>` : '';
    const title = item.titleHref
      ? `<a href="${esc(item.titleHref)}"${attrs(item.titleHref)}>${icon(item.icon)}${esc(item.title)}</a>`
      : `${icon(item.icon)}${esc(item.title)}`;
    return `<article class="sw-copy__item"><h3>${title}</h3><p>${esc(item.body)}</p><div class="sw-copy__itemmeta">${link}${second}</div></article>`;
  }).join('');
  copy.innerHTML =
    '<div class="sw-profile-title">' +
    `<button class="sw-profile-card" type="button" data-full="${esc(about.profile.image)}" aria-label="Open profile photo">` +
    `<img src="${esc(about.profile.image)}" alt="${esc(about.profile.alt)}" loading="eager" decoding="async"></button>` +
    `<div><h2 class="sw-copy__title">${esc(about.title)}</h2>` +
    `<p class="sw-profile-title__caption"><span>${esc(about.profile.caption)}</span></p></div></div>` +
    `<p class="sw-copy__body">${esc(about.body)}</p>` +
    `<div class="sw-copy__items">${items}</div>` +
    `<ul class="sw-copy__tags">${about.tags.map(tag => `<li>${esc(tag)}</li>`).join('')}</ul>`;
  copylayer.appendChild(copy);

  // More about me: latest work, how I build, what went wrong, and how to reach me.
  const more = el('div', 'home-more');
  more.innerHTML = `
    <section class="home-block">
      <p class="home-block__label">&gt; latest</p>
      <div class="home-latest">
        <img class="home-latest__shot" src="assets/evidence/agent-ops.png" width="1002" height="930" loading="lazy" decoding="async" alt="agent-ops in a terminal, fixing a webhook signature check with a local model">
        <div class="home-latest__text">
          <h2>agent-ops: a coding agent you can supervise</h2>
          <p>It edits your code and runs your tests on a local model, but it shows every file change and every command first, and waits for you to type <code>y</code>. Every run is saved so you can replay it afterwards.</p>
          <div class="home-bars" role="img" aria-label="Benchmark: bug fixes passed 9 of 10 with my system prompt against 7 of 10 with a plain prompt; average time 108 seconds against 200 seconds">
            <div class="home-bars__row"><span>Bug fixes passed</span>
              <div class="home-bars__track"><i class="is-mine" style="--w:90%"></i><b>9 / 10</b></div>
              <div class="home-bars__track"><i style="--w:70%"></i><b>7 / 10</b></div></div>
            <div class="home-bars__row"><span>Time per bug fix</span>
              <div class="home-bars__track"><i class="is-mine" style="--w:54%"></i><b>108 s</b></div>
              <div class="home-bars__track"><i style="--w:100%"></i><b>200 s</b></div></div>
            <p class="home-bars__key"><i class="is-mine"></i> my system prompt <i></i> plain prompt</p>
          </div>
          <p class="home-note">8 small payments tasks, each run twice, on a 9B local model. A small sample, so treat it as a rough guide.</p>
          <p class="home-links"><a href="https://github.com/shreyshrivastava/agent-ops" target="_blank" rel="noopener noreferrer">Read the code</a><a href="projects.html">All projects</a></p>
        </div>
      </div>
    </section>

    <section class="home-block">
      <p class="home-block__label">&gt; how i build</p>
      <ul class="home-points">
        <li><h3>Rules first, model second</h3><p>In the resume checker, the healthcare demo and the honeypot, the score or decision comes from plain rules. A model only explains or assists, so the answer is the same every run.</p></li>
        <li><h3>Limits next to results</h3><p>Each project says what it does not do. The Bhopal map shows no risk scores, the arbitrage bot places no trades, and the claim checker is not a fact-checker.</p></li>
        <li><h3>Small samples called small</h3><p>agent-ops ran 8 tasks twice each and says so. The numbers are a rough guide, not a claim.</p></li>
      </ul>
    </section>

    <section class="home-block">
      <p class="home-block__label">&gt; learned the hard way</p>
      <ul class="home-points">
        <li><h3>A review caught what I missed</h3><p>Before I shared agent-ops, a review found two bugs: truncated files could be written back with content missing, and command arguments could reach outside the workspace. I fixed both, with tests.</p></li>
        <li><h3>A model can fail the same way every time</h3><p>On my benchmark, no run got Indian digit grouping (₹1,23,456.78) right. Every failure was the model looping until it hit the step limit.</p></li>
        <li><h3>The big model does not fit everywhere</h3><p>My dissertation model is about 500 MB, too big for a serverless demo. The app falls back through four modes, down to plain rules, so it never crashes.</p></li>
      </ul>
    </section>

    <section class="home-block home-hello">
      <p class="home-block__label">&gt; say hello</p>
      <h2>If any of this is close to what you work on, write to me.</h2>
      <p>I’m happy to talk through how any of these projects was built, what went wrong, and what I would change. That includes hiring for AI/ML engineering, healthcare ML, search, or agents you can supervise.</p>
      <p class="home-links"><a class="is-primary" href="mailto:shrey.shrivastava@yahoo.com">Send email</a><a href="https://www.linkedin.com/in/shrey-shrivastava1" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/shreyshrivastava" target="_blank" rel="noopener noreferrer">GitHub</a></p>
    </section>`;
  copylayer.appendChild(more);

  // Photo viewer.
  const lightbox = el('div', 'sw-lightbox');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = '<button class="sw-lightbox__close" type="button" aria-label="Close photo preview">×</button><img alt="">';
  const closeLightbox = () => {
    if (!lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };
  copylayer.addEventListener('click', event => {
    const button = event.target.closest('.sw-profile-card');
    if (!button || !button.dataset.full) return;
    const image = lightbox.querySelector('img');
    image.src = button.dataset.full;
    image.alt = button.querySelector('img')?.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target.closest('.sw-lightbox__close')) closeLightbox();
  });
  addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });

  // "About" scrolls back to the top; every other menu item is an ordinary link.
  root.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    event.preventDefault();
    if (link.getAttribute('href') !== '#top' && location.hash !== link.getAttribute('href')) history.pushState(null, '', link.getAttribute('href'));
    scrollTo({ top: 0, behavior: 'auto' });
  });

  root.append(sky, topbar, copylayer, lightbox);

  const homeBlocks = [...more.querySelectorAll('.home-block')];
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('home-reveal');
    const seen = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      seen.unobserve(entry.target);
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    homeBlocks.forEach(block => seen.observe(block));
  }


  function injectCSS() {
    if (document.getElementById('sw-css')) return;
    const css = `
    .sw-root{--sw-bg:#071013;--sw-ink:#f4fbff;--sw-ink-soft:#aec1c7;--sw-accent:#17d7c8;
      --sw-font-display:"Space Grotesk",Inter,system-ui,sans-serif;
      --sw-font-body:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
      color:var(--sw-ink);font-family:var(--sw-font-body);}
    html,body{margin:0;background:var(--sw-bg,#071013);overflow-x:hidden;}
    .sw-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:var(--sw-bg);}
    .sw-sky__grad{position:absolute;inset:-10%;background:linear-gradient(178deg,color-mix(in srgb,var(--sw-accent) 12%,var(--sw-bg)) 0%,var(--sw-bg) 55%,color-mix(in srgb,var(--sw-accent) 6%,var(--sw-bg)) 100%);}
    .sw-sky__glow{position:absolute;inset:0;background:radial-gradient(60% 42% at 74% 16%,color-mix(in srgb,var(--sw-accent) 22%,transparent),transparent 70%);}
    .sw-topbar{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:clamp(14px,2.4vw,26px) clamp(18px,5vw,64px);}
    .sw-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--sw-ink);}
    .sw-brand__mark{display:grid;place-items:center;width:24px;height:28px;border-radius:7px;color:var(--sw-accent);background:rgba(7,16,19,.82);border:1px solid color-mix(in srgb,var(--sw-accent) 42%,rgba(244,251,255,.14));box-shadow:inset 0 0 0 1px rgba(244,251,255,.06),0 10px 26px rgba(0,0,0,.28);}
    .sw-brand__mark::before{content:">_";font:800 .68rem/1 var(--sw-font-display);letter-spacing:0;}
    .sw-brand__name{font-family:var(--sw-font-display);font-weight:700;font-size:1.1rem;}
    .sw-nav{display:flex;gap:4px;padding:5px;background:color-mix(in srgb,#fff 55%,transparent);backdrop-filter:blur(10px);border:1px solid color-mix(in srgb,var(--sw-accent) 16%,transparent);border-radius:999px;}
    .sw-nav__item{font:inherit;font-size:.82rem;color:var(--sw-ink-soft);border:0;background:transparent;cursor:pointer;padding:7px 14px;border-radius:999px;text-decoration:none;transition:color .25s,background .25s;}
    .sw-nav__item:hover{color:var(--sw-ink);} .sw-nav__item.is-active{color:#fff;background:var(--sw-accent);}
    .sw-copylayer{position:fixed;inset:0;z-index:20;pointer-events:none;}
    .sw-copy{position:absolute;left:clamp(18px,5vw,64px);top:50%;transform:translateY(-50%);width:min(42vw,460px);}
    .sw-copy__eyebrow{display:block;margin-top:18px;font-family:var(--sw-font-display);font-weight:700;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:var(--sw-accent);}
    .sw-copy__title{font-family:var(--sw-font-display);font-weight:700;color:var(--sw-ink);font-size:clamp(2rem,4.4vw,3.5rem);line-height:1.03;margin:12px 0 0;letter-spacing:0;}
    .sw-copy__body{margin-top:18px;font-size:clamp(1rem,1.25vw,1.14rem);line-height:1.55;color:color-mix(in srgb,var(--sw-ink) 78%,var(--sw-ink-soft));max-width:40ch;}
    .sw-copy__items{display:grid;gap:10px;margin-top:18px;max-width:min(54vw,640px);padding-right:8px;}
    .sw-copy__item{padding:12px 14px;border-radius:8px;background:color-mix(in srgb,var(--sw-bg) 72%,transparent);border:1px solid color-mix(in srgb,var(--sw-accent) 20%,transparent);}
    .sw-copy__item h3{margin:0;font-size:.98rem;line-height:1.2;font-family:var(--sw-font-display);letter-spacing:0;color:var(--sw-ink);}
    .sw-copy__item h3 a{display:inline-flex;align-items:center;gap:6px;color:inherit;text-decoration:none;}
    .sw-copy__item h3 a:hover{color:var(--sw-accent);}
    .sw-icon{display:inline-grid;place-items:center;width:1.08em;height:1.08em;margin-right:.46em;vertical-align:-.16em;color:currentColor;fill:currentColor;flex:0 0 auto;}
    .sw-icon svg{width:100%;height:100%;display:block;fill:currentColor;}
    .sw-copy__item p{margin:6px 0 0;font-size:.86rem;line-height:1.42;color:color-mix(in srgb,var(--sw-ink) 74%,var(--sw-ink-soft));}
    .sw-copy__itemmeta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:8px;font-size:.76rem;font-weight:700;color:var(--sw-ink-soft);}
    .sw-copy__itemmeta a{display:inline-flex;align-items:center;gap:4px;color:var(--sw-accent);text-decoration:none;}
    .sw-copy__tags{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 0;padding:0;}
    .sw-copy__tags li{font-size:.82rem;font-weight:600;color:color-mix(in srgb,var(--sw-accent) 70%,#000);padding:7px 14px;border-radius:999px;background:color-mix(in srgb,var(--sw-accent) 14%,#fff);border:1px solid color-mix(in srgb,var(--sw-accent) 30%,transparent);}
    @media (max-width:860px){
      .sw-topbar{align-items:flex-start;flex-direction:column;gap:8px;padding:12px 14px;background:linear-gradient(180deg,rgba(7,16,19,.94),rgba(7,16,19,.66),rgba(7,16,19,0));backdrop-filter:blur(14px);pointer-events:none;}
      .sw-brand{max-width:calc(100vw - 28px);padding:8px 10px;border:1px solid rgba(244,251,255,.12);border-radius:999px;background:rgba(7,16,19,.68);backdrop-filter:blur(12px);pointer-events:auto;}
      .sw-brand__name{max-width:calc(100vw - 92px);overflow:hidden;font-size:.94rem;text-overflow:ellipsis;white-space:nowrap;}
      .sw-nav{display:flex;flex-wrap:nowrap;justify-content:flex-start;width:100%;max-width:none;overflow-x:auto;padding:6px;border-radius:14px;background:rgba(7,16,19,.78);border-color:rgba(244,251,255,.14);box-shadow:0 12px 34px rgba(0,0,0,.22);pointer-events:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
      .sw-nav::-webkit-scrollbar{display:none;}
      .sw-nav__item{flex:0 0 auto;min-height:36px;padding:8px 12px;font-size:.8rem;white-space:nowrap;}
      .sw-copy{left:clamp(18px,5vw,64px);right:clamp(18px,5vw,64px);top:auto;bottom:clamp(64px,14vh,120px);transform:none;width:auto;max-width:560px;}
      .sw-copy__title{font-size:clamp(1.9rem,7.5vw,2.7rem);}
      .sw-copy__body{max-width:none;font-size:clamp(.98rem,3.6vw,1.1rem);}
      .sw-copy__items{max-width:none;}
    }
    @media (max-width:640px){
      .sw-nav{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:3px;width:100%;padding:5px;overflow:visible;border-radius:14px;}
      .sw-nav__item{justify-content:center;min-width:0;min-height:34px;padding:7px 3px;overflow:hidden;font-size:clamp(.62rem,2.55vw,.74rem);text-align:center;text-overflow:ellipsis;}
    }
    `;
    // A cascade layer keeps the page's own theme (style.css and stitch.css) winning over these defaults.
    const style = document.createElement('style');
    style.id = 'sw-css';
    style.textContent = '@layer sw {\n' + css + '\n}';
    document.head.appendChild(style);
  }
})();
