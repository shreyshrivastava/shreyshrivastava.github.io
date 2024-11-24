
class InteractiveEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrolling();
        this.setupIntersectionObserver();
        this.setupColorPulse();
    }

    setupScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });

        document.querySelectorAll('.glass-effect').forEach((el) => {
            observer.observe(el);
        });
    }

    setupColorPulse() {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            if (window.pJSDom && window.pJSDom[0]) {
                const particles = window.pJSDom[0].pJS.particles;
                particles.color.value = `hsl(${hue}, 50%, 50%)`;
                particles.line_linked.color = `hsl(${hue}, 50%, 50%)`;
            }
        }, 50);
    }
}

// Initialize interactive effects
new InteractiveEffects();