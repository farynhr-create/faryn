import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects, categories } from '../data/projects'
import './Portfolio.css'

const pageIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.35 } },
}

const gridItem = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
}

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCat = searchParams.get('cat') || 'all'

  const filtered = useMemo(
    () => activeCat === 'all' ? projects : projects.filter(p => p.category === activeCat),
    [activeCat]
  )

  const setFilter = (cat) => {
    setSearchParams(cat === 'all' ? {} : { cat })
  }

  return (
    <motion.div className="page portfolio-page" variants={pageIn} initial="hidden" animate="visible" exit="exit">
      {/* Header */}
      <div className="portfolio-header container">
        <div className="portfolio-header__bg" aria-hidden="true">
          <PortfolioHeaderPattern />
        </div>
        <motion.p
          className="label portfolio-pre"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="accent-dot" /> Portfolio
        </motion.p>
        <motion.h1
          className="display-lg portfolio-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Work that<br /><em>speaks for itself</em>
        </motion.h1>
        <motion.p
          className="portfolio-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          A selection of projects across web, identity, and print.
        </motion.p>
      </div>

      {/* Filter bar */}
      <div className="portfolio-filters container">
        <motion.div
          className="filter-bar"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn${activeCat === cat.id ? ' filter-btn--active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
              <span className="filter-btn__count">
                {cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </motion.div>
        <div className="dot-rule portfolio-rule">
          <div className="dot" /><div className="dot" /><div className="dot" />
        </div>
      </div>

      {/* Grid */}
      <div className="portfolio-grid container">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              variants={gridItem}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={i}
              layout
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <motion.p
            className="portfolio-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="portfolio-cta container">
        <div className="dot-rule">
          <div className="dot" /><div className="dot" /><div className="dot" />
        </div>
        <div className="portfolio-cta__content">
          <p className="display-md portfolio-cta__text">
            Have a project in mind?
          </p>
          <a href="mailto:hello@farynstudio.com" className="btn btn-outline">
            Let's talk <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function PortfolioHeaderPattern() {
  return (
    <svg viewBox="0 0 1200 400" fill="none" preserveAspectRatio="xMidYMid slice" className="portfolio-header__svg">
      {Array.from({ length: 8 }, (_, r) =>
        Array.from({ length: 25 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * 50 + 25}
            cy={r * 50 + 25}
            r="1.5"
            fill="#c9a96e"
            opacity="0.1"
          />
        ))
      )}
      <g stroke="#c9a96e" strokeWidth="0.6" opacity="0.15" fill="none">
        <line x1="1100" y1="50"  x2="1175" y2="125" />
        <line x1="1175" y1="50"  x2="1100" y2="125" />
        <line x1="25"   y1="250" x2="75"   y2="300" />
        <line x1="75"   y1="250" x2="25"   y2="300" />
        <line x1="600"  y1="25"  x2="650"  y2="75" />
        <line x1="650"  y1="25"  x2="600"  y2="75" />
      </g>
    </svg>
  )
}
