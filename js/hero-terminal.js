// Terminal-style hero text. Home gets a typed prompt plus a plain description of each section;
// inner pages get the same typed prompt above the headline. This is decoration, not navigation:
// the top menu is the only way to move between pages.
(() => {
  const modules = [
    { tag: 'ABT', id: 'about', label: 'About', note: 'who I am and what I build', accent: '#17d7c8' },
    { tag: 'PRJ', id: 'projects', label: 'Projects', note: 'the problem, the build, the result', accent: '#38bdf8' },
    { tag: 'EXP', id: 'experience', label: 'Experience', note: 'CRO Prime and two internships', accent: '#ffb657' },
    { tag: 'EDU', id: 'education', label: 'Education', note: 'MSc AI, BTech, Diploma', accent: '#34d399' },
    { tag: 'CNT', id: 'contact', label: 'Contact', note: 'email, GitHub, LinkedIn', accent: '#f472b6' },
  ];

  const world = document.getElementById('world');
  const page = location.pathname.split('/').pop().replace('.html', '');

  function prompt(text) {
    const p = document.createElement('p');
    p.className = 'hero-term__cmd';
    p.innerHTML = '<span class="hero-term__prompt" aria-hidden="true">&gt;</span>' +
      `<span class="hero-term__text" style="--chars:${text.length}">${text}</span>`;
    return p;
  }

  if (world) {
    const copy = world.querySelector('.sw-copy[data-section="about"]');
    const body = copy && copy.querySelector('.sw-copy__body');
    if (!body || copy.querySelector('.hero-term')) return;
    const term = document.createElement('div');
    term.className = 'hero-term';
    term.setAttribute('role', 'group');
    term.setAttribute('aria-label', 'What is on this site');
    term.innerHTML = '<ul class="hero-term__list">' + modules.map((m, i) =>
      `<li style="--i:${i};--mod:${m.accent}"><span class="hero-term__row">` +
      `<span class="hero-term__tag">[${m.tag}]</span><strong>${m.label}</strong>` +
      `<span class="hero-term__note">${m.note}</span></span></li>`).join('') + '</ul>';
    term.insertBefore(prompt('shrey open portfolio'), term.firstChild);
    body.insertAdjacentElement('afterend', term);

    // Hovering or focusing a top-menu item previews that section in the 3D scene and console panel.
    const preview = index => world.dispatchEvent(new CustomEvent('world:sectionchange', { detail: { index, id: modules[index].id } }));
    document.querySelectorAll('.sw-nav__item').forEach((item, index) => {
      if (!modules[index]) return;
      item.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') preview(index); });
      item.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') preview(0); });
      item.addEventListener('focus', () => preview(index));
      item.addEventListener('blur', () => preview(0));
    });
    return;
  }

  try {
    sessionStorage.setItem('splash-seen', '1');
  } catch {
    // Storage unavailable: the splash may show once on the home page, which is harmless.
  }
  const heroCopy = document.querySelector('.project-hero__copy');
  if (!heroCopy || heroCopy.querySelector('.hero-term__cmd')) return;
  heroCopy.insertBefore(prompt('shrey open ' + page), heroCopy.firstChild);
})();
