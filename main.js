// ===== Smooth Scroll for Internal Links ======
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

// ===== Card Hover Glow & Reveal ======
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

// ===== Sidebar Hover Effect ======
const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
  link.addEventListener('mouseenter', () => link.style.transform = 'scale(1.15)');
  link.addEventListener('mouseleave', () => link.style.transform = 'scale(1)');
});

// ===== Global Hue Sync Animation ======
const root = document.documentElement;
let hue = 180; // starting teal hue
function animateHue() {
  hue = (hue + 0.15) % 360; // slow, elegant rotation
  const color = `hsl(${hue}, 80%, 60%)`;
  root.style.setProperty('--accent', color);
  requestAnimationFrame(animateHue);
}
animateHue();
