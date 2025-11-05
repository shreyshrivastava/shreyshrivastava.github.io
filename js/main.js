// Smooth Scroll
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

// Card Reveal on Scroll
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

// Sidebar Hover Effect
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('mouseenter', () => link.style.transform = 'scale(1.15)');
  link.addEventListener('mouseleave', () => link.style.transform = 'scale(1)');
});

// Global Hue Sync Animation
const root = document.documentElement;
let hue = 180;
function animateHue() {
  hue = (hue + 0.15) % 360;
  root.style.setProperty('--accent', `hsl(${h
