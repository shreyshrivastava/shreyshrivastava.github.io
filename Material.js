// Optional: Reveal cards on scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .hero-text, .hero-avatar");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
});
