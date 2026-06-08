import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import ProductDesignCase from './ProductDesignCase'
import styles from './PortfolioStream.module.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

function ProjectGallery({ project }) {
  // Video — autoplay loop players in a 2-col grid
  if (project.videos && project.videos.length > 0) {
    return (
      <div className={styles.videoGrid}>
        {project.videos.map((v, i) => (
          <figure key={v.src} className={styles.videoItem}>
            <div className={styles.videoFrame} onClick={(e) => e.stopPropagation()}>
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
            {v.caption && (
              <figcaption className={styles.videoCaption}>
                <span className={styles.captionIdx}>{pad(i + 1)}</span>
                <span>{v.caption}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    )
  }

  // Carousel series — multiple named posts, each with its own slide row
  if (project.carousels && project.carousels.length > 0) {
    return (
      <div className={styles.carouselSeries}>
        {project.carousels.map((post) => (
          <div key={post.id} className={styles.carouselPost}>
            <div className={styles.carouselPostHead}>
              <span className={styles.carouselPostLabel}>{post.label}</span>
              <span className={styles.carouselPostTitle}>{post.title}</span>
            </div>
            <div className={styles.carouselRow}>
              {post.slides.map((slide, i) => (
                <figure key={slide.src} className={styles.carouselSlide}>
                  <div className={styles.carouselFrame}>
                    <img src={slide.src} alt={slide.caption || `${post.title} — slide ${i + 1}`} loading="lazy" />
                  </div>
                  <figcaption className={styles.carouselCaption}>
                    <span className={styles.captionIdx}>{pad(i + 1)}</span>
                    <span>{slide.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const images = project.gallery || []
  if (images.length === 0) return null

  // Content design — carousel slides shown as a 2-col narrative grid
  if (project.category === 'content-design') {
    return (
      <div className={styles.slideGrid}>
        {images.map((img, i) => (
          <figure key={img.src} className={styles.slide}>
            <div className={styles.slideFrame}>
              <img
                src={img.src}
                alt={img.caption || `${project.title} — slide ${i + 1}`}
                loading="lazy"
              />
            </div>
            {img.caption && (
              <figcaption className={styles.slideCaption}>
                <span className={styles.captionIdx}>{pad(i + 1)}</span>
                <span>{img.caption}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    )
  }

  // Artwork — uniform 3-column grid, all pieces at equal weight
  return (
    <div className={styles.artworkGrid}>
      {images.map((img, i) => (
        <figure key={img.src} className={styles.plate}>
          <div className={styles.plateFrame}>
            <img
              src={img.src}
              alt={img.caption || `${project.title} — ${pad(i + 1)}`}
              loading="lazy"
            />
          </div>
          {img.caption && (
            <figcaption className={styles.plateCaption}>
              <span className={styles.captionIdx}>{pad(i + 1)}</span>
              <span>{img.caption}</span>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

function ProjectSection({ project, n }) {
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

          {/* Context — editorial prose shown above the gallery */}
          {project.context && project.context.length > 0 && (
            <div className={styles.contextGrid}>
              {project.context.map((para, i) => (
                <p key={i} className={styles.contextPara}>{para}</p>
              ))}
            </div>
          )}

          {/* Gallery */}
          <div className={styles.gallery}>
            <ProjectGallery project={project} />
          </div>

          {/* Design / process thinking — shown below the gallery */}
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
      {projects.map((project, i) =>
        project.category === 'product-design' ? (
          <ProductDesignCase key={project.slug} project={project} n={i + 1} />
        ) : (
          <ProjectSection key={project.slug} project={project} n={i + 1} />
        )
      )}
    </div>
  )
}
