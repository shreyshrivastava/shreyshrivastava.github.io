// ===== Smooth Scroll for Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===== Card Hover Glow & Reveal =====
const cards = document.querySelectorAll('.card');
const revealElements = document.querySelectorAll('.card, .hero-text, .hero-avatar');

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===== Sidebar Hover Effect =====
const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
  link.addEventListener('mouseenter', () => link.style.transform = 'scale(1.15)');
  link.addEventListener('mouseleave', () => link.style.transform = 'scale(1)');
});

// ===== Rotating Sphere with Global Hue Sync =====
const root = document.documentElement;
const sphere = document.querySelector('.tech-avatar');

let hue = 180; // starting teal hue
let angle = 0;

function animateSphere() {
  // Update hue slowly
  hue = (hue + 0.15) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;
  root.style.setProperty('--accent', color);

  // Rotate sphere
  angle = (angle + 0.2) % 360;
  if (sphere) {
    sphere.style.background = `conic-gradient(from ${angle}deg, ${color}, hsl(${(hue+60)%360}, 80%, 60%), hsl(${(hue+120)%360}, 80%, 60%), ${color})`;
    sphere.style.borderRadius = '50%';
  }

  requestAnimationFrame(animateSphere);
}

animateSphere();
