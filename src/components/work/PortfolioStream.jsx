import { motion, useReducedMotion } from 'framer-motion'
import styles from './PortfolioStream.module.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

/* Decide gallery shape from the project itself. Drawings/paintings read as
 * artwork plates — asymmetric, lead image + grid. Brochure/editorial pieces
 * read as a vertical narrative — slide after slide. */
function galleryMode(project) {
  if (project.category === 'brochure' || project.category === 'website') return 'editorial'
  return 'artwork'
}

function ProjectGallery({ project }) {
  const mode = galleryMode(project)
  const images = project.gallery || []
  if (images.length === 0) return null

  if (mode === 'editorial') {
    return (
      <div className={styles.editorialStack}>
        {images.map((img, i) => (
          <figure key={img.src} className={styles.editorialSlide}>
            <div className={styles.editorialFrame}>
              <img
                src={img.src}
                alt={img.caption || `${project.title} — slide ${i + 1}`}
                loading="lazy"
              />
            </div>
            {img.caption && (
              <figcaption className={styles.editorialCaption}>
                <span className={styles.captionIdx}>{pad(i + 1)}</span>
                <span>{img.caption}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    )
  }

  // Artwork mode — lead plate + asymmetric grid for the rest
  const [lead, ...rest] = images
  return (
    <div className={styles.artworkStack}>
      <figure className={`${styles.plate} ${styles.plateLead}`}>
        <div className={styles.plateFrame}>
          <img
            src={lead.src}
            alt={lead.caption || project.title}
            loading="lazy"
          />
        </div>
        {lead.caption && (
          <figcaption className={styles.plateCaption}>
            <span className={styles.captionIdx}>01</span>
            <span>{lead.caption}</span>
          </figcaption>
        )}
      </figure>

      {rest.length > 0 && (
        <div className={styles.plateGrid}>
          {rest.map((img, i) => (
            <figure key={img.src} className={styles.plate}>
              <div className={styles.plateFrame}>
                <img
                  src={img.src}
                  alt={img.caption || `${project.title} — plate ${i + 2}`}
                  loading="lazy"
                />
              </div>
              {img.caption && (
                <figcaption className={styles.plateCaption}>
                  <span className={styles.captionIdx}>{pad(i + 2)}</span>
                  <span>{img.caption}</span>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectSection({ project, n }) {
  const reduced = useReducedMotion()
  const fade = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }

  return (
    <motion.section
      id={`project-${project.slug}`}
      data-category={project.category}
      className={styles.section}
      {...fade}
    >
      <div className={styles.sectionInner}>
        {/* Meta rail */}
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

        {/* Body */}
        <div className={styles.body}>
          <header className={styles.bodyHead}>
            <h2 className={styles.title}>{project.title}</h2>
            {project.subtitle && (
              <p className={styles.subtitle}>{project.subtitle}</p>
            )}
          </header>

          <div className={styles.gallery}>
            <ProjectGallery project={project} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default function PortfolioStream({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No projects to show — yet.</p>
      </div>
    )
  }

  return (
    <div className={styles.stream}>
      {projects.map((project, i) => (
        <ProjectSection key={project.slug} project={project} n={i + 1} />
      ))}
    </div>
  )
}
