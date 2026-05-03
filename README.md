# Faryn Studio

Independent creative practice — React + Vite.

---

## Quick start (recommended)

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
npm run build        # same
```

### Preview the production build locally
```bash
./deploy.sh preview  # builds then serves at http://localhost:4173
npm run preview      # same (requires a prior build)
```

### Clean up
```bash
./deploy.sh clean    # removes node_modules and dist
npm run clean        # same
```

---

## Requirements

- Node.js v18 or later — https://nodejs.org
- npm (included with Node)

---

## Project structure

```
src/
  components/
    intro/        ← IntroAnimation (SVG wordmark + grid)
    hero/         ← Hero canvas section
    sections/     ← Home page sections
    work/         ← Portfolio grid + lightbox
    nav/          ← Navigation + mobile menu
    footer/       ← Footer
  routes/         ← Page-level route components
  styles/         ← Global CSS, tokens, typography
  hooks/          ← useReducedMotion, useReveal, etc.
  data/           ← Project content (projects.js)
```

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, selected work, services, about preview |
| `/work` | Portfolio grid with category filter |
| `/work/:slug` | Individual project detail |
| `/about` | About |
| `/services` | Services |
| `/contact` | Contact |

## Stack

- React 18 + Vite 5
- React Router v6
- Framer Motion (intro animation, page transitions, scroll reveals)
- CSS Modules (no CSS framework)
- react-helmet-async (SEO meta)

---

## Design notes

### Intro animation
The intro plays on every refresh while `TESTING` mode is active (`App.jsx` line 26).
To restore the once-per-session gate, replace:
```js
const [showIntro, setShowIntro] = useState(true)
```
with:
```js
const [showIntro, setShowIntro] = useState(
  () => !sessionStorage.getItem('faryn-intro-seen')
)
```
and restore the `sessionStorage.setItem` call in the `onComplete` handler.
