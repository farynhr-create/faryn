import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import './ProjectDetail.css'

const pageIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.35 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project  = projects.find(p => p.slug === slug)
  if (!project) return <Navigate to="/portfolio" replace />

  const { title, subtitle, description, challenge, outcome, services, year, category, tags, color, accent } = project

  const currentIndex = projects.findIndex(p => p.slug === slug)
  const next = projects[(currentIndex + 1) % projects.length]
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length]

  return (
    <motion.div className="page project-detail" variants={pageIn} initial="hidden" animate="visible" exit="exit">
      {/* Back */}
      <div className="project-detail__back container">
        <Link to="/portfolio" className="btn btn-ghost project-back-btn">
          ← Back to work
        </Link>
      </div>

      {/* Hero visual */}
      <div className="project-detail__visual" style={{ '--project-bg': color, '--project-accent': accent }}>
        <ProjectDetailPattern project={project} />
        <div className="project-detail__visual-content container">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="label project-detail__cat">
            <span className="accent-dot" style={{ background: accent }} /> {category} · {year}
          </motion.div>
          <motion.h1
            className="display-xl project-detail__title"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{ '--project-accent': accent }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="project-detail__subtitle"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Info grid */}
      <div className="project-detail__body container">
        <div className="project-detail__meta">
          <div className="project-meta-block">
            <p className="label">Services</p>
            <ul>
              {services.map(s => (
                <li key={s} className="project-meta-block__item">
                  <span className="accent-dot" style={{ background: accent }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="project-meta-block">
            <p className="label">Tags</p>
            <div className="project-detail__tags">
              {tags.map(t => (
                <span key={t} className="project-detail__tag" style={{ '--tag-accent': accent }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="project-meta-block">
            <p className="label">Year</p>
            <p className="project-meta-block__val">{year}</p>
          </div>
        </div>

        <div className="project-detail__content">
          <motion.section
            className="project-section"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          >
            <p className="label"><span className="accent-dot" style={{ background: accent }} /> Overview</p>
            <p className="project-section__body">{description}</p>
          </motion.section>

          <div className="project-detail__divider dot-rule">
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>

          <div className="project-detail__two-col">
            <motion.section
              className="project-section"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            >
              <p className="label"><span className="accent-dot" style={{ background: accent }} /> The Challenge</p>
              <p className="project-section__body">{challenge}</p>
            </motion.section>
            <motion.section
              className="project-section"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
            >
              <p className="label"><span className="accent-dot" style={{ background: accent }} /> The Outcome</p>
              <p className="project-section__body">{outcome}</p>
            </motion.section>
          </div>

          {/* Placeholder visual blocks */}
          <div className="project-placeholders">
            <PlaceholderBlock color={color} accent={accent} label="Design System" large />
            <div className="project-placeholders__row">
              <PlaceholderBlock color={color} accent={accent} label="Typography" />
              <PlaceholderBlock color={color} accent={accent} label="Colour Palette" />
            </div>
          </div>
        </div>
      </div>

      {/* Next / Prev navigation */}
      <nav className="project-nav container" aria-label="Project navigation">
        <div className="dot-rule project-nav__rule">
          <div className="dot" /><div className="dot" /><div className="dot" />
        </div>
        <div className="project-nav__grid">
          <Link to={`/portfolio/${prev.slug}`} className="project-nav__item project-nav__item--prev">
            <span className="label">Previous</span>
            <span className="project-nav__title">{prev.title}</span>
            <span className="project-nav__sub">{prev.subtitle}</span>
          </Link>
          <Link to="/portfolio" className="project-nav__all">
            <span className="label">All work</span>
            <ProjectNavGrid />
          </Link>
          <Link to={`/portfolio/${next.slug}`} className="project-nav__item project-nav__item--next">
            <span className="label">Next</span>
            <span className="project-nav__title">{next.title}</span>
            <span className="project-nav__sub">{next.subtitle}</span>
          </Link>
        </div>
      </nav>
    </motion.div>
  )
}

function ProjectDetailPattern({ project }) {
  const { accent, id } = project
  return (
    <svg
      className="project-detail__pattern"
      viewBox="0 0 1200 500"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`dpg-${id}`} cx="30%" cy="60%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill={`url(#dpg-${id})`} />
      {Array.from({ length: 10 }, (_, r) =>
        Array.from({ length: 24 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * 50 + 25}
            cy={r * 50 + 25}
            r="1.5"
            fill={accent}
            opacity="0.12"
          />
        ))
      )}
      <g stroke={accent} strokeWidth="0.8" opacity="0.25" fill={accent}>
        <line x1="50" y1="50" x2="200" y2="50" />
        <line x1="50" y1="50" x2="50"  y2="200" />
        <line x1="50" y1="200" x2="150" y2="200" />
        <circle cx="50"  cy="50"  r="3" />
        <circle cx="200" cy="50"  r="3" />
        <circle cx="50"  cy="200" r="3" />
        <circle cx="150" cy="200" r="3" />
        <line x1="1100" y1="300" x2="1150" y2="300" />
        <line x1="1150" y1="300" x2="1150" y2="450" />
        <line x1="1100" y1="300" x2="1100" y2="450" />
        <circle cx="1100" cy="300" r="3" />
        <circle cx="1150" cy="300" r="3" />
        <circle cx="1100" cy="450" r="3" />
        <circle cx="1150" cy="450" r="3" />
      </g>
    </svg>
  )
}

function PlaceholderBlock({ color, accent, label, large }) {
  return (
    <div
      className={`placeholder-block${large ? ' placeholder-block--large' : ''}`}
      style={{ '--pb-bg': color, '--pb-accent': accent }}
    >
      <svg viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid slice" className="placeholder-block__svg">
        <rect width="800" height="400" fill={color} />
        {Array.from({ length: 7 }, (_, r) =>
          Array.from({ length: 15 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 55 + 27} cy={r * 55 + 27} r="1.5" fill={accent} opacity="0.15" />
          ))
        )}
        <g stroke={accent} strokeWidth="0.8" opacity="0.3" fill="none">
          <rect x="300" y="150" width="200" height="100" />
          <circle cx="300" cy="150" r="4" fill={accent} />
          <circle cx="500" cy="150" r="4" fill={accent} />
          <circle cx="300" cy="250" r="4" fill={accent} />
          <circle cx="500" cy="250" r="4" fill={accent} />
          <line x1="300" y1="200" x2="200" y2="200" />
          <circle cx="200" cy="200" r="4" fill={accent} />
          <line x1="500" y1="200" x2="600" y2="200" />
          <circle cx="600" cy="200" r="4" fill={accent} />
        </g>
        <text x="400" y="210" fill={accent} opacity="0.12" fontSize="80" fontFamily="serif" fontWeight="300" textAnchor="middle">
          {label}
        </text>
      </svg>
      <span className="placeholder-block__label label">{label}</span>
    </div>
  )
}

function ProjectNavGrid() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="project-nav__grid-icon">
      {[0,1,2,3,4,5].map(i => {
        const c = i % 3
        const r = Math.floor(i / 3)
        return (
          <g key={i}>
            <rect x={c*16+2} y={r*22+2} width="12" height="16" stroke="var(--border-accent)" strokeWidth="1" />
          </g>
        )
      })}
    </svg>
  )
}
