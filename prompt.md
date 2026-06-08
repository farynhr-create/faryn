# Prompts for building an editorial art-portfolio site

A sequenced playbook of prompts you can hand to an LLM coding agent (Claude Code, Cursor, etc.) to scaffold a portfolio site in the same spirit as Faryn Studio — minimal, editorial, and built around dots, lines, and a single red mark (the hanko).

Run them in order. Each prompt assumes the previous ones have been completed. Tweak the tone (Japanese haiku, Bauhaus, Swiss, brutalist) by editing the **Design language** block at the top.

---

## 0. Foundation prompt (paste this first)

```
You are a senior UI/UX designer and front-end engineer. We're building an
editorial portfolio site for a single creative practitioner. The visual
language is intentionally minimal — three motifs only:

  • dots (junctions, marks, hanko seals)
  • thin hairlines (0.5px ink, used as architecture)
  • one red accent used SPARINGLY as a single seal, never decoration

Type system:
  • Display + body: a refined transitional serif (EB Garamond)
  • Mono caps: a geometric monospace (DM Mono) for eyebrow labels and meta

Colour:
  • Paper background (#f8f6f2)
  • Ink for text and hairlines (#0a0a0a)
  • A single red mark (#d42b2b) used only as a hanko / seal accent

Composition principles (Japanese-minded):
  • Fukinsei — asymmetric balance, never perfect symmetry
  • Ma — generous negative space treated as a compositional element
  • Kanso — one clear focal point per view, eliminate the unnecessary

Stack:
  • React 18 + Vite 5
  • React Router v6
  • Framer Motion for spring-based interactions (no scroll libraries)
  • CSS Modules (no Tailwind, no UI framework)
  • react-helmet-async for SEO

Set up the project with these dependencies, design tokens in
src/styles/tokens.css (paper / ink / mark / type scale / spacing),
a reset in src/styles/global.css, and a 2-line README.
```

---

## 1. Brand mark — FARYN-style wordmark

```
Build a wordmark for the brand "<NAME>". Each letter is a small
constellation of dots and short straight lines — no curves, no fills.
For each letter, exactly one dot is rendered red — placed at the
structural decision point (where a stroke branches, converges, or
changes direction). The other dots are ink.

Render as inline SVG in src/components/brand/Logo.jsx so we can target
individual elements with CSS. Add `data-letter="0..N-1"` on each <g>
and `data-junction="ink"` or `data-junction="red"` on each <circle>
so the parent can drive hover effects per-letter.

Wrap the SVG with a LogoLockup component that adds a small studio
label below (mono caps) or beside it (italic serif), with a `variant`
prop ("stacked" for nav, "inline" for footer/hero).
```

---

## 2. Logo hover bloom

```
Add a hover bloom to LogoLockup. When the cursor enters the lockup:
  • Lines pulse with a keyframe animation: dim/thin → overshoot bold
    → settle slightly thicker than base
  • Junction dots pop with a back-out cubic to ~1.5× scale and gain a
    soft ink drop-shadow
  • Red marks pop to ~1.85× and emit a layered red glow
    (multiple drop-shadow stacks)
  • The bloom waves left-to-right across the letters: each letter's
    animation-delay is 90ms greater than the previous (use the
    data-letter attribute as the selector)
  • prefers-reduced-motion: drop the wave + scale, keep a calm brighten
```

---

## 3. Layout, Nav, Footer

```
Create src/routes/Layout.jsx with a fixed Nav at the top and a Footer
below the routed content. Routes:
  /            → Home
  /portfolio   → Portfolio index
  /portfolio/:slug → Project detail
  /services
  /about
  /contact

Nav: max-width container, paper background, hairline bottom border.
Logo on the left (clickable, navigates to / and smooth-scrolls to top).
Right side: 4 mono-caps text links. Active link uses a small red dot
indicator beside the label.

Footer: 3-column grid (brand / nav / meta). Meta column shows location
and a hello@ email. Bottom strip with copy line in mono micro caps.

Mobile: collapse Nav into a two-line hamburger that toggles a full
viewport MobileMenu (oversized italic serif links, staggered fade-in).
```

---

## 4. Hero — the landing composition

```
Build src/components/hero/Hero.jsx as an asymmetric 1.4:1 split.

Left column (text):
  • Eyebrow SectionLabel with a leading hairline tick: "VISUAL STUDIO · <CITY>"
  • A 3-line haiku-style headline:
      Line 1:  <single word>
      Line 2:  <2-3 words, with one italic for emphasis>
      Line 3:  <closing word + a small red dot replacing the period>
    Cascading indent on a golden-ratio step (0, 1.35em, 2.7em).
    Open the verse with a small horizontal hairline tick before line 1.
    Replace one curved lowercase letter on line 3 with a red disc the
    size of the x-height. Add a final tiny hanko seal where the period
    would be — give it a slow 4–5s breathing animation.
    Include aria-label on the h1 for screen readers since glyphs are
    visually substituted.
  • Sub paragraph in mono, max ~36ch, two short lines
  • Primary CTA button → /portfolio

Right column (the calm):
  • A vertical hairline (the tatami edge) running the column height
  • Four small ink dots stacked rhythmically along the rail — each is
    a wayfinder labelled with mono number ("01") + serif italic name
    ("Portfolio"). Clicking smooth-scrolls to the corresponding
    home-page section.
  • A small red hanko sits beside the rail and SLIDES on a Framer
    Motion spring to whichever anchor is hovered (you-are-aiming-at
    indicator). On hover the hanko also gets a soft halo + slight
    radius bump.
  • Anchors are keyboard-accessible (tabIndex, Enter/Space).

Vertical hairline divider between the two columns.
Min-height calc(100svh - nav). On mobile, stack: text first, then
the rail composition with reduced height (~420px).
```

---

## 5. Shared PageHeader — used by Portfolio / Services / About / Contact

```
Create src/components/ui/PageHeader.jsx as the shared editorial header
for every sub-page so they read as chapters of the same monograph.

Props: index ("01 / 04"), label, meta (array of {label, value}),
title (ReactNode with <em> for italic emphasis), titleId, intro.

Layout: 240px meta column + flexible title column, top-aligned, with
a small corner mark in the absolute top-right of the inner container.
The corner mark is an inline SVG: a 60-px hairline leader ending in
a small red dot — visually rhyming with the hero's central hanko.

Meta column:
  • SectionLabel with leading hairline tick: "<index> — <label>"
  • A hairline-topped <dl> below it with up to 3 mono-caps rows

Title column:
  • h1 in serif clamp(2.6rem, 5.4vw, 4.8rem), line-height 1.0,
    letter-spacing -0.025em, max-width 14ch
  • Italic <em> in --color-ink-soft for the emphasis word
  • Intro paragraph in serif, ~54ch max, opacity 0.75

Title hover ignite (delight detail):
  • A hairline draws under the title left-to-right (transform scaleX
    0→1 with an 0.75s ease-out)
  • A small red seal lands at the right end with a back-out spring
  • Italic emphasis word transitions to the mark red
  • Intro opacity goes 0.75 → 1
  • The corner mark dot pulses with a red drop-shadow halo

Mobile collapse: meta column hides, title fills width, corner mark
hides under 640px.
```

---

## 6. Portfolio index (replacement for the typical card grid)

```
Build src/components/work/ProjectIndex.jsx as a typographic table of
contents — not a card grid. Header row in mono caps: № / Project /
Discipline / Year. Each row is a generous-height grid:

  [01]  Project Title (large serif)              Discipline    Year
        subtitle in mono, light

On row hover:
  • The row background shifts to a slightly deeper paper tone
  • A small red dot fades in beside the index number
  • The title block translates 8px to the right
  • A small composition or thumbnail preview slides in from the right
    edge of the row (140×100, hairline border)

The Portfolio page (src/routes/Portfolio.jsx) uses PageHeader at the
top, then a filter row with mono category buttons (active = red
underline) and an "07 / 07" count, then the ProjectIndex below.
```

---

## 7. Project detail page

```
Build src/routes/ProjectDetail.jsx around the same hairline + meta
discipline as the rest of the site:

  • Header: breadcrumb (PORTFOLIO / DISCIPLINE / YEAR), large title,
    italic subtitle, and a meta <dl> (Role / Year / Client / Medium)
  • Optional gallery: lazy-loaded thumbnails in a responsive grid that
    open a Lightbox on click (arrow-key + esc keyboard nav)
  • Three editorial sections: Context / The Thinking / Outcome
    each as a 1fr/2fr two-column with SectionLabel on the left and
    body paragraphs on the right
  • Optional outcome metrics row (large serif numbers + mono caps label)
  • A quiet "Next project →" strip at the bottom that links forward
    through the projects array

Pull data from src/data/projects.js. Use react-helmet-async for the
title + OG meta.
```

---

## 8. Services page

```
Build src/routes/Services.jsx with the shared PageHeader and then four
numbered service spreads. Each spread:

  • Big italic number in a 220px column (clamp(4rem, 7vw, 6.5rem),
    color-ink at 0.18 opacity, with a short red hairline tick under it)
  • Body column: title (clamp ~2rem), 2 paragraphs of body, a scope
    list rendered as small-cap mono items each prefixed with a 5px
    red dot

Below the four spreads, add a Process section: a horizontal hairline
timeline with 4 dots evenly spaced (first + last in red) and labeled
beneath with step number + name + short description.

Close with a CTA strip: italic line ("All engagements begin with a
conversation.") and a primary button → /contact.
```

---

## 9. About page

```
Build src/routes/About.jsx with three stacked sections, each using
the same 240px meta column + body grid as PageHeader:

  1. PageHeader with a short title and an intro paragraph
  2. Bio: lead paragraph in larger serif, then 3-4 supporting paragraphs
  3. Selected history: a hairline-divided <dl> table (clients,
     exhibitions, recognition, background) with each row label
     prefixed by a small red dot
  4. Disciplines: a 2×2 (or 1×4) grid of cells, each with mono number,
     red dot, italic title, and a mono caption
```

---

## 10. Contact page

```
Build src/routes/Contact.jsx with PageHeader, then a 320px aside
column on the left and a form column on the right.

Aside:
  • "Channels" block: email / Instagram / Are.na in a small mono <dl>
    with hairline-tick labels
  • "Studio" block: location, hours, availability — availability gets
    a small pulsing red dot
  • A small mono note at the bottom

Form: underline-only inputs (no boxes — single hairline that turns
red on focus). Project type is a chip selector (mono caps, active
chip inverts to ink-on-paper). After name/email, an organisation
field, then a textarea with a thin border, then optional budget +
timeline. Submit button + a small mono "Replies within two business
days" note. Thank-you state is a single italic line with a leading
red dot.
```

---

## 11. Intro animation

```
Create src/components/intro/IntroAnimation.jsx. On every fresh page
load (mount), play a 2-3 second sequence:

  • Faded hairline grid fades in
  • Junction dots fly in from the four edges to their letterform
    positions, staggered ~50ms each
  • Strokes draw between dots in order (use SVG stroke-dasharray
    animation), 100ms apart
  • Red marks land last with a small bloom
  • Whole overlay fades out after a short hold

Honour prefers-reduced-motion: hold for 1s, no fly-in, no stroke draw.

Mount it once in src/App.jsx with useState(true) — App mounts once
per page lifetime, so this fires exactly on each hard refresh.
```

---

## 12. Cursor / hover signature (optional flair)

```
Add a global CursorSignature component that renders a small red dot
following the cursor with a lerped trailing ring behind it. On hover
over interactive elements (a, button, [data-cursor]), the ring expands
and turns red. Hidden on coarse pointers and on prefers-reduced-motion.
Mount in App.jsx beneath the routes.
```

---

## 13. Accessibility, responsiveness, and polish pass

```
Run a polish pass:
  • Skip link to #main-content
  • :focus-visible outlines using --color-mark
  • aria-label on every nav, role="navigation" on the hero rail
  • aria-live="polite" on dynamic counts (e.g. portfolio filter count)
  • Replace text-substitution glyphs (the red letter-dot) with
    aria-label on the parent so screen readers read the full word
  • prefers-reduced-motion overrides on every animated component
  • Test all sub-pages at 1440 / 1024 / 768 / 640 / 375 widths
  • Confirm scroll-margin-top on anchor sections accounts for the
    fixed nav height
```

---

## 14. Deployment

```
Add a deploy.sh that wraps npm install / dev / build / preview / clean
into a single CLI. Wire vite.config.js with a path alias '@' →
'./src'. Add a .gitignore for node_modules + dist + .DS_Store.
Add SEO meta and JSON-LD Person schema in About.jsx using
react-helmet-async. Document the routes table and the design tokens
in README.md.
```

---

## Notes on adapting the language

The prompts above default to Japanese-minded restraint. To shift the
register, edit the **Foundation prompt** and re-run downstream prompts:

| Direction        | Swap in                                                      |
|------------------|--------------------------------------------------------------|
| Bauhaus / Swiss  | grotesk sans (Inter, Söhne), tighter grid, no italic emphasis |
| Brutalist        | mono everywhere, harder hairlines, flat black accent          |
| Editorial / Vogue| display serif at extreme weight contrast, no mono             |
| Gallery / museum | wider columns, larger plates, captions in caption-italic      |

The structural choices (PageHeader pattern, vertical-rail nav, single
red seal as the only accent, hover ignite on titles) translate across
all of these — only the type and colour tokens change.
