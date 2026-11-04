# Shrey Shrivastava Portfolio — Style Reference

Static site (HTML, CSS, vanilla JS, Three.js). Dark, terminal-flavoured, one accent colour per page. **The visual design is fixed. Upgrades add motion, depth and polish; they must not change layout, palette, copy or structure.**

Sources read: `css/style.css`, `css/stitch.css`, `js/world-background.js`, `js/scroll-world-engine.js`, `index.html`.

## Tokens — Colors

| Role | Value | Token / where used |
|---|---|---|
| Background | `#071013` | `--sw-bg`, html/body, Three.js fog and clear colour |
| Background (deep) | `#041113` | panels and overlays |
| Surface | `#101c20` | cards, console panel |
| Border | `#223438` | `--stitch-border` |
| Text primary | `#f4fbff` | `--sw-ink` |
| Text secondary | `#aec1c7` | `--sw-ink-soft` |
| Text muted | `#a7bec4` | section labels |
| Accent — About / home | `#17d7c8` (teal) | `--sw-accent`, `.stitch-home` |
| Accent — Projects | `#38bdf8` (sky) | `--page-accent` default |
| Accent — Experience | `#ffb657` (amber) | `.experience-page` |
| Accent — Education | `#34d399` (green) | `.education-page` |
| Accent — Contact | `#f472b6` (pink) | `.contact-page` |
| Info highlight | `#6fa8ff` | sky gradient |

Accents also exist as `--page-accent-rgb` for alpha use, and mirror `palette` in `js/world-background.js`. Keep the two in sync.

## Tokens — Typography

- Display: **Space Grotesk** 600/700 (`--sw-font-display`), headings.
- Body: **Inter** 400–800 (`--sw-font-body`), everything else.
- Labels and console text use a monospace feel at 9–12px, uppercase, wide tracking.
- Scale in use (px/rem): 9, 10, 12, 14, 0.72, 0.78, 0.82, 0.94.

## Tokens — Spacing & Shapes

- Radii: 8px (most common), 999px (pills, nav), 4px, 14px, 3px, 6px.
- Borders: 1px solid `--stitch-border`; accent border on active items.
- Focus: `2px solid var(--page-accent)`, offset 4px.
- Shadows: soft accent glow (`rgba(var(--page-accent-rgb), …)`), no hard drop shadows.

## Motion (current)

- Transitions 0.22–0.7s, `ease`; no shared curve or duration scale yet.
- Three.js scene rotates slowly (`phase += delta * 0.045`), camera follows pointer (x) and scroll (focus y).
- Scroll-world engine cross-dissolves scene stills/clips on scroll.
- `prefers-reduced-motion` is honoured in JS and in both CSS files.

## Components

- **Top nav pills** (About / Projects / Experience / Education / Contact): rounded, accent-coloured when active.
- **Console panel** (`stitch-shell.js`): window chrome dots, typed line, section chips, prev/next, page-scroll sparkline canvas.
- **Project cards** (`projects.html`, `js/projects.js`): cover image, tags, links.
- **Tag chips**: small bordered pills.
- **3D background** (`world-background.js`): one wireframe model per section, accent-tinted, fog, grid floor.

## Layout

- Full-viewport scroll world; content left, console panel right on desktop.
- Breakpoints: 1600, 1190, 960, 860, 820, 640, 560 (px). 960 is the mobile/desktop switch for 3D quality.

## Do's and Don'ts

- Do use `--page-accent` for the one highlight per page.
- Do reuse the radii, border and focus rules above.
- Do make every new animation respect `prefers-reduced-motion`.
- Do keep 3D cheap on mobile (≤960px: 30fps cap, DPR 1, batched draw calls).
- Don't add colours, fonts or layout changes.
- Don't add React or a build step; the site stays static.
- Don't copy code from paid or unlicensed libraries into this public repo.
- Don't use bounce, elastic or overshoot easings; keep motion calm and precise.

## Upgrade Plan (approved items only get built)

Principle: refine, don't redesign.

1. **Motion system** — define CSS tokens `--ease-out`, `--ease-in-out`, `--dur-fast/med/slow` and apply to existing transitions. Stagger reveals; cross-fade accent colour changes.
2. **3D depth** — in `world-background.js`: edge glow, sparse particle field, eased model in/out on section change, gentle camera drift, subtle pointer inertia.
3. **Interaction polish** (original vanilla JS, inspired by the reference libraries' ideas): cursor spotlight on cards, text reveal on headings, smoother hover/nav feel.
4. **Performance** — drop `preserveDrawingBuffer`, pause rendering when offscreen, convert `assets/generated` PNGs (26 MB) to WebP/AVIF with PNG fallback.
5. **Accessibility** — focus rings everywhere, contrast check on small muted text, keyboard nav for the scroll world.
6. **Hygiene** — consolidate overlapping CSS, replace hand-edited `?v=` strings with one version constant.

Each step is verified in the browser (desktop and 375px mobile) before the next.

## Content Rules (project cards, About, Experience)

Every project answers three questions, in plain words: **What was the problem? What did I build and why that way? What came out of it?**

- Lead with the problem and who had it, not the tech.
- Name the technique only where it explains a decision. Never write "uses AI" on its own.
- Pair any number with its baseline. If there is no measured result, say what was learned or what the limit is. Never invent metrics; mark gaps "needs input".
- Name one real limitation per project.
- Use "I" for my own part. About 60-120 words per card on the page, longer detail on expand.
- Use real screenshots from the repo (README or running app), high-res, only if they show something text can't.
- Avoid: cutting-edge, leveraged AI, revolutionize, seamless, robust, game-changing, passionate about, "end-to-end" without specifics, enterprise-grade, "solution" as a catch-all noun.
- Public repos only. Private repos stay off the site.

## Agent Prompt Guide

Read this file before changing any UI. Keep the dark teal terminal look and the per-page accent system. Add motion and depth only through the tokens and rules above. Never introduce new colours, fonts or frameworks. Test with reduced motion on and at 375px width.

## Open questions

- Near-duplicate darks: `#071013`, `#041013`, `#041113`, `#051115` — suggest keeping `#071013` (page) and `#041113` (deep panels).
- Near-duplicate light greys: `#aec1c7`, `#a7bec4`, `#9bb9c0` — suggest consolidating to `#aec1c7`.
- Type sizes mix px and rem — suggest rem only.
- Mobile breakpoints (860/820/640/560) overlap — confirm which can merge.
- Reference libraries (Animmaster, Skiper UI, VengeanceUI): only VengeanceUI is MIT and all are React. Use as inspiration only unless told otherwise.
