import { Fragment, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import GhostLink from '@/components/ui/GhostLink'
import styles from './About.module.css'

const HEADLINE_WORDS = [
  { text: "I'm",      italic: false },
  { text: 'a',        italic: false },
  { text: 'designer', italic: false },
  { lineBreak: true },
  { text: 'who',      italic: false },
  { text: 'learned',  italic: false },
  { text: 'to',       italic: true  },
  { text: 'see',      italic: true  },
  { lineBreak: true },
  { text: 'before',   italic: false },
  { text: 'learning', italic: false },
  { text: 'to',       italic: true  },
  { text: 'code.',    italic: true  },
]

const disciplines = [
  {
    num: '01',
    title: 'Visual Art',
    desc: 'Original works on paper and mixed-media, exhibited independently and in group contexts.',
  },
  {
    num: '02',
    title: 'Content Strategy',
    desc: 'Editorial frameworks, voice systems, and content architecture for organisations and brands.',
  },
  {
    num: '03',
    title: 'Content Creation',
    desc: 'Photography, writing, and editorial design for ongoing content partnerships.',
  },
  {
    num: '04',
    title: 'Teaching',
    desc: 'Drawing fundamentals and creative practice workshops for professionals.',
  },
]

const facts = [
  {
    label: 'Selected clients',
    items: ['EYE Film Institute', 'Galerie Bart', 'Ant.Element', 'Confidential — agriculture'],
  },
  {
    label: 'Exhibitions',
    items: ['Galerie Bart, Amsterdam — 2024', 'Open Studios NDSM — 2023', 'Group show, Het Hem — 2022'],
  },
  {
    label: 'Recognition',
    items: ['Stimuleringsfonds grantee — 2023', 'Mondriaan Fonds — shortlist, 2022'],
  },
  {
    label: 'Background',
    items: ['BA Fine Art, Gerrit Rietveld Academie', 'Working independently since 2018'],
  },
]

const whatIDo = [
  {
    label: 'Design',
    content: 'visual identity, content design, carousel and editorial layout, campaign visuals, print and digital',
  },
  {
    label: 'Strategy',
    content: 'audience research, brand positioning, content strategy, editorial planning',
  },
  {
    label: 'Craft',
    content: 'fifteen years of oil painting, illustration, and drawing — the eye underneath the work',
  },
]

export default function About() {
  const reduceMotion = useReducedMotion()
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  // Subtle parallax — image creeps up against its frame as we scroll past it
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-4%', '4%'])
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [1.04, 1, 1.04])

  const [shouldAnimate] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      if (sessionStorage.getItem('faryn-about-seen')) return false
      sessionStorage.setItem('faryn-about-seen', '1')
      return true
    } catch { return false }
  })

  return (
    <>
      <Helmet>
        <title>About — Faryn Studio</title>
        <meta
          name="description"
          content="Farnoosh is a content designer working at the intersection of visual craft and marketing strategy, based in Amsterdam."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Faryn Studio',
            jobTitle: 'Content Designer',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Amsterdam',
              addressCountry: 'NL',
            },
            url: 'https://farynstudio.nl',
          })}
        </script>
      </Helmet>

      <div className={styles.page}>

        {/* ── Hero ───────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.textSide}>
            <p className={styles.sectionMark}>Practice</p>

            <div className={styles.openingLineWrap}>
              <span className={styles.redDot} aria-hidden="true" />
              <h1 className={styles.openingLine}>
                {HEADLINE_WORDS.map((word, i) => {
                  if (word.lineBreak) return <br key={`br-${i}`} />

                  const wordIndex = HEADLINE_WORDS.slice(0, i).filter(w => !w.lineBreak).length
                  const appearDelay = shouldAnimate ? 0.8 + (wordIndex * 0.15) : 0
                  const settleDelay = appearDelay + 0.4

                  return (
                    <Fragment key={`word-${i}`}>
                      <motion.span
                        className={`${styles.word}${word.italic ? ` ${styles.italic}` : ''}`}
                        initial={shouldAnimate ? { opacity: 0, y: 8, color: '#d42b2b' } : false}
                        animate={
                          shouldAnimate
                            ? {
                                opacity: 1,
                                y: 0,
                                color: ['#d42b2b', '#d42b2b', '#0a0a0a'],
                              }
                            : undefined
                        }
                        transition={
                          shouldAnimate
                            ? {
                                opacity: { duration: 0.5, delay: appearDelay, ease: [0.22, 1, 0.36, 1] },
                                y:       { duration: 0.5, delay: appearDelay, ease: [0.22, 1, 0.36, 1] },
                                color:   {
                                  duration: 0.6,
                                  delay: settleDelay,
                                  times: [0, 0.5, 1],
                                  ease: 'easeOut',
                                },
                              }
                            : undefined
                        }
                      >
                        {word.text}
                      </motion.span>
                      {' '}
                    </Fragment>
                  )
                })}
              </h1>
            </div>

            <p className={styles.caption}>
              Farnoosh Rouhi<br />
              Content Designer · Amsterdam · 2026
            </p>
          </div>

          <motion.figure
            ref={imageRef}
            className={styles.imageSide}
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={shouldAnimate ? { opacity: 1 } : undefined}
            transition={shouldAnimate ? { duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] } : undefined}
          >
            {/* Scroll-linked parallax wrapper */}
            <motion.div
              className={styles.portraitInner}
              style={{ y: parallaxY, scale: parallaxScale }}
            >
              <motion.img
                src="/images/about/farnoosh-portrait.png"
                alt="Farnoosh in her studio"
                className={styles.portrait}
                width="1024"
                height="1024"
                loading="eager"
                initial={shouldAnimate ? { scale: 1.06 } : false}
                animate={shouldAnimate ? { scale: 1 } : undefined}
                transition={shouldAnimate ? { duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] } : undefined}
              />
            </motion.div>

            {/* Subtle vignette + film grain */}
            <span className={styles.grain} aria-hidden="true" />
            <span className={styles.vignette} aria-hidden="true" />

            {/* Diagonal light sweep — single pass once the curtain has lifted */}
            {shouldAnimate && (
              <motion.span
                aria-hidden="true"
                className={styles.sweep}
                initial={{ x: '-110%', opacity: 0 }}
                animate={{ x: '110%', opacity: [0, 0.55, 0] }}
                transition={{ duration: 1.4, delay: 2.65, ease: [0.22, 1, 0.36, 1] }}
              />
            )}

            {/* Paper curtain — wipes up to reveal the portrait */}
            {shouldAnimate && (
              <motion.span
                aria-hidden="true"
                className={styles.curtain}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.1, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
              />
            )}

            {/* Print-proof registration crosshairs at the four corners */}
            <span className={`${styles.regMark} ${styles.regTL}`} aria-hidden="true" />
            <span className={`${styles.regMark} ${styles.regTR}`} aria-hidden="true" />
            <span className={`${styles.regMark} ${styles.regBL}`} aria-hidden="true" />
            <span className={`${styles.regMark} ${styles.regBR}`} aria-hidden="true" />

            {/* Hairline + caption badge — settles in once the portrait is uncovered */}
            <motion.figcaption
              className={styles.imageBadge}
              initial={shouldAnimate ? { opacity: 0, y: 6 } : false}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={shouldAnimate ? { duration: 0.5, delay: 2.5, ease: [0.22, 1, 0.36, 1] } : undefined}
            >
              <span className={styles.imageBadgeRule} aria-hidden="true" />
              <span className={styles.imageBadgeText}>
                <span>Farnoosh Rouhi</span>
                <span className={styles.imageBadgeMeta}>Plate 01 — Studio, Amsterdam</span>
              </span>
              <span className={styles.imageBadgeSeal} aria-hidden="true" />
            </motion.figcaption>
          </motion.figure>
        </section>

        <Hairline />

        {/* ── Background ─────────────────────────────── */}
        <section className={styles.bio} aria-labelledby="bio-label">
          <div className={styles.bioInner}>
            <div className={styles.bioMeta}>
              <SectionLabel id="bio-label" variant="before">Background</SectionLabel>
              <p className={styles.bioMetaNote}>
                Five short notes on how the practice was built — and how it
                works today.
              </p>
            </div>

            <article className={styles.bioBody}>
              <div className={styles.stanza}>
                <span className={styles.stanzaTag}>
                  <span className={styles.stanzaIdx}>01</span>
                  <span>Origin</span>
                </span>
                <p className={styles.body}>
                  <span className={styles.dropcap}>B</span>efore I designed for
                  screens, I painted on canvas. Fifteen years of fine art in
                  Tehran taught me how visual decisions actually work — why one
                  composition feels balanced and another feels off, why a colour
                  can carry an emotion the words can't. That training is the
                  foundation of every system, every carousel I make now.
                </p>
              </div>

              <div className={styles.stanza}>
                <span className={styles.stanzaTag}>
                  <span className={styles.stanzaIdx}>02</span>
                  <span>Training</span>
                </span>
                <p className={styles.body}>
                  The second layer came later, through a master's in Content
                  &amp; Media Strategy at NHL Stenden. It taught me to read the
                  other half of the design conversation — the side marketing
                  teams speak. Audience research, brand positioning, content
                  funnels, behavioural frameworks. Things designers often inherit
                  as briefs without understanding the thinking behind them.
                </p>
              </div>

              <div className={styles.stanza}>
                <span className={styles.stanzaTag}>
                  <span className={styles.stanzaIdx}>03</span>
                  <span>Approach</span>
                </span>

                <blockquote className={styles.pullquote}>
                  <span className={styles.pullquoteMark} aria-hidden="true">“</span>
                  A designer who speaks marketing,<br />
                  and a strategist who designs.
                </blockquote>

                <p className={styles.body}>
                  When a marketing lead says <em>"we need this to convert,"</em>{' '}
                  I know what that means in pixels. When a brand says{' '}
                  <em>"we want this to feel premium,"</em> I know which
                  typographic and compositional choices get us there — not by
                  guess, but by craft. I translate between the two languages
                  most teams need translated.
                </p>
              </div>

              <div className={styles.stanza}>
                <span className={styles.stanzaTag}>
                  <span className={styles.stanzaIdx}>04</span>
                  <span>Today</span>
                </span>
                <p className={styles.body}>
                  I work with cultural institutions, social innovation labs, and
                  independent brands across the Netherlands. The work moves
                  between disciplines: brand systems, content design for social
                  and editorial, visual identity, campaign creative. The studio
                  is small by intention — each project gets attention from
                  concept to execution.
                </p>
              </div>

              <div className={styles.stanza}>
                <span className={styles.stanzaTag}>
                  <span className={styles.stanzaIdx}>05</span>
                  <span>Working with me</span>
                </span>
                <p className={styles.body}>
                  I take on a small number of projects at a time, and I'm
                  selective about fit. If your team needs design that can hold
                  its own with the strategy behind it — and the strategy that
                  knows what design can carry — I'd like to hear from you.
                </p>
                <div className={styles.contact}>
                  <GhostLink href="mailto:hello@farynstudio.nl" hairline>
                    Get in touch
                  </GhostLink>
                </div>
              </div>
            </article>
          </div>
        </section>

        <Hairline />

        {/* ── What I Do ──────────────────────────────── */}
        <section className={styles.whatIDo} aria-labelledby="whatido-label">
          <div className={styles.whatIDoInner}>
            <div className={styles.whatIDoMeta}>
              <SectionLabel id="whatido-label" variant="before">What I Do</SectionLabel>
            </div>
            <dl className={styles.whatIDoGrid}>
              {whatIDo.map((row) => (
                <div key={row.label} className={styles.whatIDoRow}>
                  <dt className={styles.whatIDoLabel}>{row.label}</dt>
                  <dd className={styles.whatIDoContent}>{row.content}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Hairline />

        {/* ── Selected facts ─────────────────────────── */}
        <section className={styles.facts} aria-labelledby="facts-label">
          <div className={styles.factsInner}>
            <div className={styles.factsMeta}>
              <SectionLabel id="facts-label" variant="before">Index</SectionLabel>
            </div>
            <dl className={styles.factsList}>
              {facts.map((f) => (
                <div key={f.label} className={styles.factRow}>
                  <dt className={styles.factLabel}>
                    <span className={styles.factDot} aria-hidden="true" />
                    {f.label}
                  </dt>
                  <dd className={styles.factItems}>
                    {f.items.map((item) => (
                      <span key={item} className={styles.factItem}>
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Hairline />

        {/* ── Disciplines ────────────────────────────── */}
        <section className={styles.disciplines} aria-labelledby="disciplines-label">
          <div className={styles.disciplinesInner}>
            <div className={styles.disciplinesMeta}>
              <SectionLabel id="disciplines-label" variant="before">Disciplines</SectionLabel>
            </div>
            <div className={styles.disciplineGrid}>
              {disciplines.map((d) => (
                <article key={d.title} className={styles.discipline}>
                  <span className={styles.disciplineNum}>{d.num}</span>
                  <span className={styles.disciplineDot} aria-hidden="true" />
                  <h3 className={styles.disciplineTitle}>{d.title}</h3>
                  <p className={styles.disciplineDesc}>{d.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Hairline />
      </div>
    </>
  )
}
