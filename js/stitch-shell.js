(() => {
  const sections = [
    { id: 'about', label: 'About', short: 'ABT', href: 'index.html#about', accent: '#17d7c8', title: 'Shrey Shrivastava', description: 'AI / ML Engineer working across retrieval, healthcare ML, NLP, computer vision, and deployable systems.', action: 'Explore About', detail: 'AI / ML engineering' },
    { id: 'projects', label: 'Projects', short: 'PRJ', href: 'projects.html', accent: '#38bdf8', title: 'Code, systems, and research.', description: 'Explore FallGuard AI, AcademicForge, and more projects through application screenshots, notebook results, code, and published research.', action: 'Open Projects', detail: '21 project entries' },
    { id: 'experience', label: 'Experience', short: 'EXP', href: 'experience.html', accent: '#ffb657', title: 'From data to deployed workflows.', description: 'Healthcare ML engineering at CRO Prime, followed by applied machine learning and data analysis internships.', action: 'Open Experience', detail: '3 experience entries' },
    { id: 'education', label: 'Education', short: 'EDU', href: 'education.html', accent: '#34d399', title: 'Computer science to artificial intelligence.', description: 'MSc Artificial Intelligence, BTech Computer Science, and Diploma Computer Science. A continuous technical foundation.', action: 'Open Education', detail: '3 academic qualifications' },
    { id: 'contact', label: 'Contact', short: 'CNT', href: 'contact.html', accent: '#f472b6', title: 'Let’s build something useful.', description: 'Direct routes for hiring, collaboration, and research conversations through email, LinkedIn, GitHub, and ORCID.', action: 'Open Contact', detail: '4 direct contact channels' }
  ];
  const home = Boolean(document.getElementById('world'));
  const filename = location.pathname.split('/').pop() || 'index.html';
  const initial = Math.max(0, sections.findIndex(section => filename === section.id + '.html'));
  let selected = home ? 0 : initial;
  document.body.classList.add('stitch-theme', home ? 'stitch-home' : 'stitch-gallery');
  document.querySelectorAll('.site-nav a, .sw-nav__item').forEach((link, index) => {
    const section = sections[index];
    if (section) link.style.setProperty('--section-accent', section.accent);
  });

  const consolePanel = document.createElement('aside');
  consolePanel.className = 'stitch-console';
  consolePanel.setAttribute('aria-label', 'Portfolio navigator');
  consolePanel.innerHTML = `
    <div class="console-chassis"><span>SHREY / PORTFOLIO</span><span class="console-leds" aria-hidden="true"><i></i><i></i><i></i></span></div>
    <div class="console-readout">
      <div class="console-meta"><span data-console-channel></span><span data-console-code></span></div>
      <p class="console-kicker">Selected section</p>
      <h2 data-console-title></h2>
      <p class="console-description" data-console-description></p>
      <span class="console-detail" data-console-detail></span>
    </div>
    <p class="console-label">Explore the portfolio</p>
    <nav class="console-sections" aria-label="Portfolio pages">${sections.map((section, index) => `<a href="${section.href}" data-console-select="${index}" style="--section-accent:${section.accent}" title="Open ${section.label}" aria-label="Open ${section.label}"><span>${section.short}</span><small>0${index + 1}</small></a>`).join('')}</nav>
    <p class="console-mobile-note">Use these tabs to navigate between pages.</p>
    <div class="console-actions"><a data-console-prev aria-label="Previous page" title="Previous page">&larr;</a><a data-console-next aria-label="Next page" title="Next page">&rarr;</a><a data-console-open></a></div>
    <div class="console-socials"><a href="https://github.com/shreyshrivastava" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/shrey-shrivastava1" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://orcid.org/0000-0001-5273-2842" target="_blank" rel="noopener noreferrer">ORCID</a><a href="mailto:shrey.shrivastava@yahoo.com">Email</a></div>
    <div class="console-scroll"><div><span>Page scroll</span><output data-console-progress>0%</output></div><canvas width="600" height="70" aria-hidden="true"></canvas></div>
    <div class="console-footer"><span data-console-footer></span><span>AI / ML</span></div>`;

  if (home) {
    document.body.append(consolePanel);
  } else {
    const shell = document.querySelector('.project-shell');
    const content = document.createElement('div');
    content.className = 'stitch-content';
    while (shell.firstChild) content.append(shell.firstChild);
    const stripe = document.createElement('div');
    stripe.className = 'stitch-status';
    stripe.innerHTML = `<span>0${initial + 1} / 05 <b>${sections[initial].label.toUpperCase()}</b></span><span>SHREY SHRIVASTAVA / AI & ML</span>`;
    content.prepend(stripe);
    const scrollHint = document.querySelector('.page-scroll-hint');
    if (scrollHint) content.querySelector('.project-hero').after(scrollHint);
    shell.classList.add('stitch-layout');
    shell.append(content, consolePanel);
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = matchMedia('(max-width: 960px)');
  const terminalFields = ['title', 'description'].map(name => {
    const element = consolePanel.querySelector(`[data-console-${name}]`);
    const source = document.createElement('span');
    source.className = 'console-terminal-source';
    const output = document.createElement('span');
    output.className = 'console-terminal-output';
    output.setAttribute('aria-hidden', 'true');
    element.classList.add('console-terminal');
    element.append(source, output);
    return { name, element, source, output };
  });
  let typingFrame = 0;
  let renderedSection = -1;
  let activeChapter = 0;

  function typeReadout(section) {
    cancelAnimationFrame(typingFrame);
    terminalFields.forEach(field => {
      // The full text reserves its final dimensions and remains available to screen readers.
      field.source.textContent = section[field.name];
      field.output.textContent = reducedMotion.matches ? section[field.name] : '';
      field.element.classList.remove('is-typing');
    });
    if (reducedMotion.matches) return;
    let quickArrival = performance.getEntriesByType('navigation')[0]?.activationStart > 0;
    try {
      const arrival = JSON.parse(sessionStorage.getItem('portfolio-scroll-arrival') || 'null');
      quickArrival ||= arrival?.pathname === location.pathname && Date.now() - arrival.time < 15000;
    } catch { /* Use the standard typing speed when storage is unavailable. */ }
    const titleStep = quickArrival ? 10 : 28;
    const descriptionStep = quickArrival ? 5 : 14;
    const pause = quickArrival ? 40 : 120;
    const started = performance.now();
    const titleDuration = section.title.length * titleStep;
    function tick(now) {
      const elapsed = now - started;
      terminalFields.forEach((field, index) => {
        const text = section[field.name];
        const localTime = elapsed - (index === 0 ? 0 : titleDuration + pause);
        const count = Math.max(0, Math.min(text.length, Math.floor(localTime / (index === 0 ? titleStep : descriptionStep))));
        field.output.textContent = text.slice(0, count);
        field.element.classList.toggle('is-typing', localTime >= 0 && count < text.length);
      });
      if (elapsed < titleDuration + pause + section.description.length * descriptionStep) {
        typingFrame = requestAnimationFrame(tick);
      }
    }
    typingFrame = requestAnimationFrame(tick);
  }
  reducedMotion.addEventListener('change', () => typeReadout(sections[selected]));
  document.addEventListener('prerenderingchange', () => typeReadout(sections[selected]), { once: true });

  function positionMobileConsole() {
    if (!home) {
      const shell = consolePanel.closest('.stitch-layout');
      if (mobileLayout.matches) shell.prepend(consolePanel);
      else shell.append(consolePanel);
      return;
    }
    const chapter = document.querySelectorAll('.sw-copy')[activeChapter];
    if (mobileLayout.matches && chapter) {
      if (consolePanel.parentElement !== chapter) {
        chapter.prepend(consolePanel);
        chapter.scrollTop = 0;
      }
    } else if (consolePanel.parentElement !== document.body) {
      document.body.append(consolePanel);
    }
  }
  mobileLayout.addEventListener('change', positionMobileConsole);

  function select(index) {
    selected = Math.max(0, Math.min(sections.length - 1, index));
    const section = sections[selected];
    consolePanel.style.setProperty('--console-accent', section.accent);
    consolePanel.querySelector('[data-console-channel]').textContent = `CH:0${selected + 1}/05`;
    consolePanel.querySelector('[data-console-code]').textContent = section.id.toUpperCase();
    if (renderedSection !== selected) {
      renderedSection = selected;
      typeReadout(section);
    }
    consolePanel.querySelector('[data-console-detail]').textContent = section.detail;
    consolePanel.querySelector('[data-console-footer]').textContent = `0${selected + 1} / ${section.label.toUpperCase()}`;
    const open = consolePanel.querySelector('[data-console-open]');
    open.href = section.href;
    open.textContent = section.action + ' \u2197';
    open.hidden = selected === initial;
    open.parentElement.classList.toggle('console-actions--navigation-only', open.hidden);
    [['prev', selected - 1], ['next', selected + 1]].forEach(([direction, index]) => {
      const link = consolePanel.querySelector(`[data-console-${direction}]`);
      const destination = sections[index];
      link.setAttribute('aria-disabled', String(!destination));
      if (destination) {
        link.href = destination.href;
        link.removeAttribute('tabindex');
        link.setAttribute('aria-label', `Open ${destination.label} (${direction === 'prev' ? 'previous' : 'next'} page)`);
        link.title = `Open ${destination.label}`;
      } else {
        link.removeAttribute('href');
        link.setAttribute('tabindex', '-1');
        link.setAttribute('aria-label', `No ${direction === 'prev' ? 'previous' : 'next'} page`);
        link.title = `No ${direction === 'prev' ? 'previous' : 'next'} page`;
      }
    });
    consolePanel.querySelectorAll('[data-console-select]').forEach((link, i) => {
      link.classList.toggle('is-active', i === selected);
      if (i === initial) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    drawProgress();
  }

  function drawProgress() {
    const distance = document.documentElement.scrollHeight - innerHeight;
    const progress = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
    consolePanel.querySelector('[data-console-progress]').textContent = Math.round(progress * 100) + '%';
    const canvas = consolePanel.querySelector('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#20343a';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, 35);
    context.lineTo(600, 35);
    context.stroke();
    context.strokeStyle = sections[selected].accent;
    context.lineWidth = 2;
    context.beginPath();
    for (let x = 0; x <= 600; x += 4) {
      const y = 35 + Math.sin(x / 24) * Math.sin(x / 73) * 18 * (0.25 + progress * 0.75);
      if (x === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
    context.fillStyle = sections[selected].accent;
    context.fillRect(0, 65, 600 * progress, 3);
  }
  let scheduled = false;
  addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { drawProgress(); scheduled = false; });
  }, { passive: true });
  addEventListener('resize', drawProgress);
  document.getElementById('world')?.addEventListener('world:sectionchange', event => {
    activeChapter = event.detail.index;
    positionMobileConsole();
    select(activeChapter);
  });
  select(selected);
  if (home) {
    const active = document.querySelector('.sw-nav__item.is-active');
    const index = [...document.querySelectorAll('.sw-nav__item')].indexOf(active);
    if (index >= 0) {
      activeChapter = index;
      select(index);
    }
  }
  positionMobileConsole();
})();
