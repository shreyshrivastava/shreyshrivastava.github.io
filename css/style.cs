/* ===== Global Variables ===== */
:root {
  --primary: #03dac6;
  --background: #121212;
  --surface: #1e1e1e;
  --on-surface: #ffffff;
  --text-muted: #b0b0b0;
  --accent: #03dac6;
  --shadow: rgba(0, 0, 0, 0.3);
}

/* ===== Base Styles ===== */
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: var(--background);
  color: var(--on-surface);
  scroll-behavior: smooth;
}

/* ===== Sections & Hero ===== */
.section { max-width: 1100px; margin: 3rem auto; padding: 0 1rem; }
.hero { padding: 120px 1rem 60px; display: flex; justify-content: center; align-items: center; text-align: center; flex-direction: column; }
.hero-text h2 { font-size: 2rem; font-weight: 600; color: var(--accent); }
.hero-text p.subtitle { color: var(--text-muted); margin: 0.5rem 0 1.5rem; font-size: 1.1rem; }
.hero-avatar { width: 180px; height: 180px; }
.tech-avatar { width: 100%; height: 100%; border-radius: 50%; animation: rotate 20s linear infinite; }

@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ===== Cards ===== */
.cards-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.card { background: var(--surface); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 10px var(--shadow); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.card:hover { transform: translateY(-6px); box-shadow: 0 8px 20px var(--shadow); }
.card h3 { margin: 0.5rem 0; }
.card p { color: var(--text-muted); font-size: 0.95rem; margin: 0.3rem 0; }
.card a { display: inline-block; margin-top: 0.5rem; color: var(--accent); }
.card a:hover { color: #80ffe7; }

/* ===== Sidebar ===== */
.sidebar { position: fixed; top: 50%; right: 1rem; transform: translateY(-50%); display: flex; flex-direction: column; gap: 0.8rem; }
.sidebar a { background: var(--surface); color: var(--accent); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px var(--shadow); transition: all 0.3s; }
.sidebar a:hover { background: var(--accent); color: #000; transform: scale(1.15); }

/* ===== App Bar ===== */
.app-bar { background-color: var(--surface); box-shadow: 0 2px 6px var(--shadow); position: fixed; width: 100%; z-index: 1000; padding: 0.8rem 1rem; }
.app-bar-content { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; }
.logo { vertical-align: middle; margin-right: 0.5rem; color: var(--accent); }
.nav-links a { margin: 0 0.8rem; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; transition: opacity 0.3s; }
.nav-links a:hover { opacity: 0.8; }

/* ===== Footer ===== */
.footer { text-align: center; padding: 2rem 1rem; background: var(--surface); color: var(--text-muted); font-size: 0.9rem; margin-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }

/* ===== Fade-in Animation ===== */
.card, .hero-text, .hero-avatar { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; }
.card.visible, .hero-text.visible, .hero-avatar.visible { opacity: 1; transform: translateY(0); }

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hero-content { flex-direction: column; }
  .sidebar { right: 0.5rem; }
}
