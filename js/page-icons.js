document.querySelectorAll('[data-icon]').forEach(node => {
  node.insertAdjacentHTML('afterbegin', icon(node.dataset.icon));
});

mountPageScrollbar();
mountRevealMotion();

function mountPageScrollbar() {
  const fill = document.querySelector('.page-scrollbar span');
  const hint = document.querySelector('.page-scroll-hint');
  if (!fill) return;
  const minVisibleProgress = 0.045;
  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    fill.style.transform = `scaleX(${Math.max(minVisibleProgress, progress)})`;
    if (hint) hint.classList.toggle('is-hidden', window.scrollY > 32);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function mountRevealMotion() {
  const cards = [...document.querySelectorAll('.project-card')];
  if (!cards.length) return;
  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.18 });
  cards.forEach(card => observer.observe(card));
}

function icon(name) {
  const icons = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.99c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.75h4v10.8H3V9.75Zm6.25 0h3.84v1.47h.05c.54-.96 1.85-1.98 3.8-1.98 4.06 0 4.81 2.67 4.81 6.14v5.17h-4v-4.58c0-1.09-.02-2.5-1.52-2.5-1.53 0-1.76 1.2-1.76 2.42v4.66h-4V9.75Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8.1L5.4 7H4v.6l8 7.35 8-7.35V7h-1.4L12 13.1Z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8.2 7.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Zm1 10.1H7.2v-6.6h2v6.6Zm4.1 0h-2.8V7.2h2.8c3.08 0 5.15 2.06 5.15 5.15 0 3.1-2.07 5.15-5.15 5.15Zm-.8-8.5v6.7h.66c2.06 0 3.14-1.14 3.14-3.35S15.22 9 13.16 9h-.66Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6h-2V7.41l-8.3 8.3-1.4-1.42 8.29-8.29H14V4ZM5 6h6v2H7v9h9v-4h2v6H5V6Z"/></svg>',
    education: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 10 5-10 5L2 8l10-5Zm-6 8.2 6 3 6-3V16c0 1.7-2.7 3.5-6 3.5S6 17.7 6 16v-4.8Z"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm6 4V6H9v2h6Zm5 5h-6v2h-4v-2H4v5h16v-5Z"/></svg>',
    project: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/></svg>',
  };
  return `<span class="ui-icon">${icons[name] || icons.external}</span>`;
}
