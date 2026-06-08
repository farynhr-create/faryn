# Faryn Studio

Independent creative practice — React + Vite portfolio site.

A minimal editorial portfolio built around three motifs: **dots, lines, and a single red mark** (the hanko / studio seal). The composition language is intentionally Japanese-minded — fukinsei (asymmetric balance), ma (negative space), and kanso (restrained simplicity).

---

## Quick start

```bash
./deploy.sh
```

Opens at **http://localhost:5173**. The script installs dependencies automatically on first run.

---

## All commands

### Local development
```bash
./deploy.sh          # install deps + hot-reload dev server
npm run dev          # same, if you prefer npm directly
```

### Production build
```bash
./deploy.sh build    # outputs optimised files to ./dist
npm run build
```

### Preview the production build
```bash
./deploy.sh preview  # builds then serves at http://localhost:4173
npm run preview      # same (requires a prior build)
```

### Clean
```bash
./deploy.sh clean    # removes node_modules and dist
npm run clean
```

---

## Requirements

- Node.js v18 or later — https://nodejs.org
- npm (bundled with Node)

---

## Project structure

```
src/
  components/
    brand/        ← Logo (FARYN wordmark) + LogoLockup
    intro/        ← IntroAnimation — plays on every fresh page load
    hero/         ← Hero + HeroComposition (vertical-rail haiku nav)
    sections/     ← Home page sections (SelectedWork, Services, AboutPreview, ContactCTA)
    work/         ← Portfolio components (ProjectIndex, ProjectCard, FilterBar, Lightbox)
    nav/          ← Top nav + mobile menu
    footer/       ← Footer
    ui/           ← Shared primitives (PageHeader, SectionLabel, Button, Hairline, GhostLink)
    compositions/ ← Reusable SVG compositions
  routes/         ← Page-level route components
    Home.jsx
    Portfolio.jsx
    ProjectDetail.jsx
    Services.jsx
    About.jsx
    Contact.jsx
    Layout.jsx, NotFound.jsx
  styles/         ← Global CSS, design tokens, typography
  hooks/          ← useReducedMotion, useMediaQuery, useReveal
  context/        ← LightboxContext, MobileMenuContext
  data/           ← projects.js (the portfolio content)
  utils/          ← motion variants
```

## Routes

| Path                    | Page                                                       |
|-------------------------|------------------------------------------------------------|
| `/`                     | Landing — hero, selected projects, services, about, contact|
| `/portfolio`            | Editorial index of selected projects                       |
| `/portfolio/:slug`      | Individual project detail                                  |
| `/services`             | Services + process timeline                                |
| `/about`                | Studio statement + bio + facts + disciplines               |
| `/contact`              | Contact form + studio details                              |

## Stack

- React 18 + Vite 5
- React Router v6
- Framer Motion — intro animation, page transitions, the moving hanko
- CSS Modules — no framework, design tokens in `src/styles/tokens.css`
- react-helmet-async — SEO meta + JSON-LD

---

## Design language

### Type
- Display / body: **EB Garamond** (serif) — italics carry emphasis
- Mono caps: **DM Mono** — section labels, meta data, eyebrow text
- Type scale tokens: `--text-display`, `--text-h1` … `--text-micro`

### Colour
- `--color-paper` (`#f8f6f2`) — primary surface
- `--color-ink` (`#0a0a0a`) — text and hairlines
- `--color-mark` (`#d42b2b`) — the single accent, used sparingly as a hanko seal

### Marks
- **Hairlines** — 0.5px ink, used as dividers and architectural rules
- **Hanko seal** — a single small red dot signs each major moment (hero centre, page-header corner mark, headline period, section-label accent)
- **Dots & lines** — junction dots in the FARYN logo mark structural decisions; the hero rail stacks them rhythmically as wayfinders

### Motion
- IntroAnimation — strokes draw, dots fly in, plays on every hard refresh
- Hero hanko — springs to whichever rail anchor you hover (`framer-motion` spring)
- FARYN logo — on hover, lines pulse from dim → bold (overshoot → settle), dots pop with back-out, red marks glow; the bloom waves left-to-right across the five letters
- PageHeader title — on hover, a hairline draws under the title, a small red seal lands at the end with a back-out pop, italic word shifts to red, intro brightens, corner mark pulses
- Reduced motion — all of the above degrades to brighten-only, no transforms

### Composition primitives
- **PageHeader** (`src/components/ui/PageHeader.jsx`) — shared editorial header used by Portfolio / Services / About / Contact. Identical 240px meta column + title column + corner mark across all sub-pages so the visual rhythm reads as one cohesive book.
- **HeroComposition** (`src/components/hero/HeroComposition.jsx`) — vertical-rail nav with four section anchors. The hanko slides on a spring to the hovered anchor.

---

## Adapting this for your own portfolio

See **[prompt.md](./prompt.md)** for a step-by-step set of prompts you can use to scaffold a similar editorial portfolio with an LLM coding agent.

---

## License

This codebase is the work of Faryn Studio. The structural ideas in `prompt.md` are shared freely.
