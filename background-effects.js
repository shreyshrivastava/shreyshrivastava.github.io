class BackgroundEffects {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'background-effects';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            z-index: -2;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
        document.body.prepend(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        this.orbs = [];
        this.orbCount = 3;
        this.orbColors = [
            'rgba(0, 122, 255, 0.1)',
            'rgba(88, 86, 214, 0.1)',
            'rgba(52, 199, 89, 0.1)'
        ];

        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseRadius = 200;

        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        for (let i = 0; i < this.orbCount; i++) {
            this.orbs.push(new Orb(this.width, this.height, this.orbColors));
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
        });

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.handleParallax(e);
        });
    }

    handleParallax(e) {
        const moveX = (e.clientX - this.width / 2) * 0.01;
        const moveY = (e.clientY - this.height / 2) * 0.01;

        this.orbs.forEach(orb => {
            orb.x += moveX * 0.1;
            orb.y += moveY * 0.1;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.orbs.forEach(orb => {
            orb.move();
            orb.draw(this.ctx);
        });

        requestAnimationFrame(() => this.animate());
    }
}

class Orb {
    constructor(width, height, colors) {
        this.width = width;
        this.height = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 300 + 200;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.xSpeed = Math.random() * 0.2 - 0.1;
        this.ySpeed = Math.random() * 0.2 - 0.1;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x < -this.radius) this.x = this.width + this.radius;
        if (this.x > this.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = this.height + this.radius;
        if (this.y > this.height + this.radius) this.y = -this.radius;
    }

    draw(ctx) {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize background effects
new BackgroundEffects();