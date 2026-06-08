import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './ProductDesignCase.module.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function ProductDesignCase({ project, n }) {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const fade = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      }

  const screens = project.screens || []
  const identityImage = project.identityImage

  return (
    <motion.section
      id={`project-${project.slug}`}
      data-category={project.category}
      className={styles.section}
      onClick={() => navigate(`/portfolio/${project.slug}`)}
      {...fade}
    >
      <div className={styles.sectionInner}>
        {/* ── Meta rail ── */}
        <aside className={styles.rail}>
          <div className={styles.railHead}>
            <span className={styles.bigN}>{pad(n)}</span>
            <span className={styles.discipline}>{project.filterLabel}</span>
          </div>

          <dl className={styles.meta}>
            {project.year && (
              <div className={styles.metaRow}>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            {project.role && (
              <div className={styles.metaRow}>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.client && (
              <div className={styles.metaRow}>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
            )}
            {project.medium && (
              <div className={styles.metaRow}>
                <dt>Medium</dt>
                <dd>{project.medium}</dd>
              </div>
            )}
          </dl>
        </aside>

        {/* ── Body ── */}
        <div className={styles.body}>
          <header className={styles.bodyHead}>
            <Link to={`/portfolio/${project.slug}`} className={styles.titleLink}>
              <h2 className={styles.title}>{project.title}</h2>
            </Link>
            {project.subtitle && (
              <p className={styles.subtitle}>{project.subtitle}</p>
            )}
          </header>

          {/* Identity hero — splash screen cropped to show wordmark */}
          {identityImage && (
            <div className={styles.identityHero}>
              <img
                src={identityImage}
                alt={`${project.title} — app identity`}
                className={styles.identityImg}
              />
              <div className={styles.identityOverlay} aria-hidden="true" />
            </div>
          )}

          {/* Context text */}
          {project.context && project.context.length > 0 && (
            <div className={styles.contextGrid}>
              {project.context.map((para, i) => (
                <p key={i} className={styles.contextPara}>{para}</p>
              ))}
            </div>
          )}

          {/* Screen showcase */}
          {screens.length > 0 && (
            <div className={styles.screenStrip}>
              {screens.map(({ src, label }, i) => (
                <figure
                  key={src}
                  className={`${styles.phone} ${i % 2 === 1 ? styles.phoneUp : ''}`}
                >
                  <div className={styles.phoneFrame}>
                    <img
                      src={src}
                      alt={`${project.title} — ${label}`}
                      loading="lazy"
                    />
                  </div>
                  <figcaption className={styles.phoneLabel}>{label}</figcaption>
                </figure>
              ))}
            </div>
          )}

          {/* Design thinking */}
          {project.thinking && project.thinking.length > 0 && (
            <div className={styles.thinkingGrid}>
              {project.thinking.map((note, i) => (
                <blockquote key={i} className={styles.pullQuote}>
                  <span className={styles.quoteIdx}>{pad(i + 1)}</span>
                  <p>{note}</p>
                </blockquote>
              ))}
            </div>
          )}

          <Link to={`/portfolio/${project.slug}`} className={styles.viewLink}>
            View project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
