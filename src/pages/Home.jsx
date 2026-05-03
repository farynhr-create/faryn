import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DotsCanvas from '../components/DotsCanvas'
import ProjectCard from '../components/ProjectCard'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/projects'
import './Home.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const pageIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
}

const services = [
  {
    num: '01',
    title: 'Web Design & Development',
    desc: 'From one-page sites to full platforms — pixel-perfect interfaces built on modern stacks, designed for speed and enduring aesthetics.',
    tags: ['React', 'Next.js', 'Framer', 'Webflow'],
  },
  {
    num: '02',
    title: 'Brand Identity',
    desc: 'Logos, type systems, colour palettes, and the full set of rules that make a brand unmistakable across every surface.',
    tags: ['Logo', 'Guidelines', 'Typography', 'Colour'],
  },
  {
    num: '03',
    title: 'Print & Brochure',
    desc: 'Annual reports, lookbooks, mailers, and campaign collateral — print craft that holds its own on any desk.',
    tags: ['Editorial', 'Packaging', 'Offset', 'Digital'],
  },
  {
    num: '04',
    title: 'Motion & Interactive',
    desc: 'Animations, micro-interactions, and interactive experiences that bring digital products to life without sacrificing performance.',
    tags: ['After Effects', 'Lottie', 'GSAP', 'Three.js'],
  },
]

const stats = [
  { num: '60+', label: 'Projects delivered' },
  { num: '3×',  label: 'Avg engagement lift' },
  { num: '12',  label: 'Countries reached' },
  { num: '100%', label: 'Client retention' },
]

function RevealBlock({ children, className, delay = 0 }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal-block${visible ? ' reveal-block--in' : ''} ${className || ''}`}
      style={{ '--delay': `${delay}s` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <motion.div className="page" variants={pageIn} initial="hidden" animate="visible" exit="exit">
      {/* ── Hero ───────────────────────────────────── */}
      <section className="hero">
        <DotsCanvas />
        <div className="hero__content container">
          <motion.p
            className="label hero__pre"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="accent-dot" />
            Faryn Studio — Est. 2022
          </motion.p>
          <motion.h1
            className="display-xl hero__headline"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Design<br />
            <em>that</em><br />
            endures.
          </motion.h1>
          <motion.p
            className="hero__sub"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            We build exceptional websites, visual identities,<br className="hero__br" />
            and print using modern tools and extraordinary craft.
          </motion.p>
          <motion.div
            className="hero__ctas"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link to="/portfolio" className="btn btn-outline">
              View our work <span className="arrow">→</span>
            </Link>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Start a project
            </a>
          </motion.div>
        </div>
        <motion.div
          className="hero__scroll"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <div className="hero__scroll-line" />
          <span className="mono">Scroll</span>
        </motion.div>
      </section>

      {/* ── Marquee strip ──────────────────────────── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="marquee-items">
              <span>Web Design</span>
              <span className="accent-dot" />
              <span>Brand Identity</span>
              <span className="accent-dot" />
              <span>Print & Editorial</span>
              <span className="accent-dot" />
              <span>Motion & Interactive</span>
              <span className="accent-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Services ───────────────────────────────── */}
      <section id="services" className="section services">
        <div className="container">
          <RevealBlock>
            <div className="section-header">
              <p className="label"><span className="accent-dot" /> What we do</p>
              <h2 className="display-md section-title">
                Capabilities built<br /><em>for the long game</em>
              </h2>
            </div>
          </RevealBlock>

          <div className="services__grid">
            {services.map((s, i) => (
              <RevealBlock key={s.num} delay={i * 0.08}>
                <div className="service-item">
                  <div className="service-item__top">
                    <span className="mono service-item__num">{s.num}</span>
                    <svg className="service-item__icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="4"  cy="14" r="2" fill="var(--accent)" opacity="0.5" />
                      <circle cx="14" cy="4"  r="2" fill="var(--accent)" opacity="0.8" />
                      <circle cx="24" cy="14" r="2" fill="var(--accent)" opacity="0.5" />
                      <circle cx="14" cy="24" r="2" fill="var(--accent)" opacity="0.3" />
                      <line x1="4" y1="14" x2="14" y2="4"  stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
                      <line x1="14" y1="4" x2="24" y2="14" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
                      <line x1="4" y1="14" x2="14" y2="24" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
                    </svg>
                  </div>
                  <h3 className="service-item__title">{s.title}</h3>
                  <p className="service-item__desc">{s.desc}</p>
                  <div className="service-item__tags">
                    {s.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured work ──────────────────────────── */}
      <section id="work" className="section work">
        <div className="container">
          <RevealBlock>
            <div className="section-header section-header--split">
              <div>
                <p className="label"><span className="accent-dot" /> Selected work</p>
                <h2 className="display-md section-title">Recent projects</h2>
              </div>
              <Link to="/portfolio" className="btn btn-outline work__all-btn">
                All projects <span className="arrow">→</span>
              </Link>
            </div>
          </RevealBlock>
          <div className="work__grid">
            {projects.slice(0, 3).map((p, i) => (
              <RevealBlock key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} index={i} />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Stats ──────────────────────────── */}
      <section id="about" className="section about dot-bg">
        <div className="container">
          <div className="about__grid">
            <RevealBlock className="about__text-col">
              <p className="label"><span className="accent-dot" /> About</p>
              <h2 className="display-md about__headline">
                A small studio.<br /><em>Enormous craft.</em>
              </h2>
              <p className="about__body">
                Faryn Studio is an independent design practice focused on building visual systems that outlast trends. We work across screen and print — from the first brand mark to the full digital presence.
              </p>
              <p className="about__body">
                We use the best modern tools available: AI-assisted generation, parametric design systems, and hand-crafted code — always in service of ideas that are worth having.
              </p>
              <Link to="/portfolio" className="btn btn-outline about__cta">
                See our work <span className="arrow">→</span>
              </Link>
            </RevealBlock>

            <div className="about__stats-col">
              {stats.map((s, i) => (
                <RevealBlock key={s.label} delay={i * 0.08} className="stat-item">
                  <span className="stat-item__num">{s.num}</span>
                  <span className="stat-item__label">{s.label}</span>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────── */}
      <section className="section process">
        <div className="container">
          <RevealBlock>
            <div className="section-header">
              <p className="label"><span className="accent-dot" /> How we work</p>
              <h2 className="display-md section-title">
                The process behind<br /><em>the work</em>
              </h2>
            </div>
          </RevealBlock>
          <div className="process__steps">
            {[
              { n: '01', t: 'Discover', d: 'We begin with questions — about your audience, your goals, and what "success" means to you. Research informs everything.' },
              { n: '02', t: 'Define',   d: 'Strategy and direction. We align on what we\'re making, for whom, and why. No surprises later.' },
              { n: '03', t: 'Design',   d: 'Iterative, responsive. We work openly — sharing early and often — refining until it\'s exactly right.' },
              { n: '04', t: 'Deliver',  d: 'Pixel-perfect handoff, thorough documentation, and post-launch support. The relationship continues.' },
            ].map((s, i) => (
              <RevealBlock key={s.n} delay={i * 0.1} className="process__step">
                <div className="process__connector" aria-hidden="true">
                  <div className="process__dot" />
                  {i < 3 && <div className="process__line" />}
                </div>
                <div className="process__content">
                  <span className="mono process__num">{s.n}</span>
                  <h3 className="process__title">{s.t}</h3>
                  <p className="process__desc">{s.d}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────── */}
      <section id="contact" className="section contact">
        <div className="container">
          <RevealBlock className="contact__inner">
            {/* Dots pattern decoration */}
            <ContactPattern />
            <p className="label contact__pre"><span className="accent-dot" /> Start a project</p>
            <h2 className="display-lg contact__headline">
              Let's build something<br /><em>worth remembering.</em>
            </h2>
            <p className="contact__sub">
              Tell us about your project and we'll be in touch within one business day.
            </p>
            <a href="mailto:hello@farynstudio.com" className="btn btn-outline contact__btn">
              hello@farynstudio.com <span className="arrow">→</span>
            </a>
          </RevealBlock>
        </div>
      </section>
    </motion.div>
  )
}

function ContactPattern() {
  return (
    <svg className="contact__pattern" viewBox="0 0 600 400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="cpg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#cpg)" />
      {/* Large dot grid */}
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 13 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={c * 50 + 25} cy={r * 50 + 25} r="1.5" fill="#c9a96e" opacity="0.12" />
        ))
      )}
      {/* Connecting lines — corner geometry */}
      <g stroke="#c9a96e" strokeWidth="0.6" opacity="0.2" fill="none">
        <line x1="25" y1="25" x2="125" y2="125" />
        <line x1="125" y1="25" x2="25"  y2="125" />
        <line x1="475" y1="275" x2="575" y2="375" />
        <line x1="575" y1="275" x2="475" y2="375" />
        <line x1="275" y1="25"  x2="325" y2="75" />
        <line x1="325" y1="25"  x2="275" y2="75" />
      </g>
      <circle cx="25"  cy="25"  r="3" fill="#c9a96e" opacity="0.35" />
      <circle cx="125" cy="25"  r="3" fill="#c9a96e" opacity="0.35" />
      <circle cx="25"  cy="125" r="3" fill="#c9a96e" opacity="0.35" />
      <circle cx="125" cy="125" r="3" fill="#c9a96e" opacity="0.35" />
      <circle cx="575" cy="375" r="3" fill="#c9a96e" opacity="0.35" />
      <circle cx="475" cy="375" r="3" fill="#c9a96e" opacity="0.35" />
      <circle cx="575" cy="275" r="3" fill="#c9a96e" opacity="0.35" />
    </svg>
  )
}
