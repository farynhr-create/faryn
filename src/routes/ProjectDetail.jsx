import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLightbox } from '@/context/LightboxContext'
import { projects } from '@/data/projects'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import GhostLink from '@/components/ui/GhostLink'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { open }  = useLightbox()
  const idx       = projects.findIndex(p => p.slug === slug)
  const project   = projects[idx]

  if (!project) return <Navigate to="/work" replace />

  const next = projects[(idx + 1) % projects.length]
  const { title, subtitle, year, role, client, medium, filterLabel, context, thinking, outcome, gallery } = project

  const lightboxImages = (gallery || []).map(img => ({
    src:     img.src,
    alt:     title,
    caption: img.caption || null,
  }))

  return (
    <>
      <Helmet>
        <title>{title} — Faryn Studio</title>
        <meta name="description" content={subtitle || title} />
        <meta property="og:title" content={`${title} — Faryn Studio`} />
        <meta property="og:description" content={subtitle || title} />
      </Helmet>

      <article className={styles.page} aria-label={title}>
        <Hairline />

        {/* Header band */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.breadcrumb}>
              <Link to="/work" className={styles.breadcrumbLink}>WORK</Link>
              <span className={styles.sep}>/</span>
              <span>{filterLabel.toUpperCase()}</span>
              {year && (
                <>
                  <span className={styles.sep}>/</span>
                  <span>{year}</span>
                </>
              )}
            </div>

            <div className={styles.headerGrid}>
              <div>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}><em>{subtitle}</em></p>}
              </div>

              <dl className={styles.metaTable}>
                <div className={styles.metaRow}>
                  <dt>Role</dt>
                  <dd>{role || '—'}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt>Year</dt>
                  <dd>{year || '—'}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt>Client</dt>
                  <dd>{client || '—'}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt>Medium</dt>
                  <dd>{medium}</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <Hairline />

        {/* Gallery — only rendered when project has images */}
        {gallery && gallery.length > 0 && (
          <>
            <section className={styles.gallery} aria-label="Project gallery">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  className={styles.galleryThumb}
                  onClick={() => open(lightboxImages, i)}
                  aria-label={`Open image ${i + 1} of ${gallery.length}`}
                >
                  <img
                    src={img.src}
                    alt=""
                    loading="lazy"
                    className={styles.galleryImg}
                  />
                </button>
              ))}
            </section>
            <Hairline />
          </>
        )}

        {/* Context */}
        {(context || []).length > 0 && (
          <>
            <section className={styles.twoCol} aria-label="Context">
              <div className={styles.colLeft}>
                <SectionLabel variant="before">Context</SectionLabel>
              </div>
              <div className={styles.colRight}>
                {context.map((p, i) => <p key={i} className={styles.body}>{p}</p>)}
              </div>
            </section>
            <Hairline />
          </>
        )}

        {/* The Thinking */}
        {(thinking || []).length > 0 && (
          <>
            <section className={styles.twoCol} aria-label="The thinking">
              <div className={styles.colLeft}>
                <SectionLabel variant="before">The thinking</SectionLabel>
              </div>
              <div className={styles.colRight}>
                {thinking.map((p, i) => <p key={i} className={styles.body}>{p}</p>)}
              </div>
            </section>
            <Hairline />
          </>
        )}

        {/* Outcome */}
        {outcome?.description && (
          <>
            <section className={styles.twoCol} aria-label="Outcome">
              <div className={styles.colLeft}>
                <SectionLabel variant="before">Outcome</SectionLabel>
              </div>
              <div className={styles.colRight}>
                <p className={styles.body}>{outcome.description}</p>
                {outcome.metrics && (
                  <div className={styles.metrics}>
                    {outcome.metrics.map((m) => (
                      <div key={m.label} className={styles.metric}>
                        <span className={styles.metricVal}>{m.value}</span>
                        <span className={styles.metricLabel}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
            <Hairline />
          </>
        )}

        {/* Next project strip */}
        <div className={styles.nextProject}>
          <div className={styles.nextInner}>
            <SectionLabel>Next project</SectionLabel>
            <Link to={`/work/${next.slug}`} className={styles.nextLink}>
              <span className={styles.nextTitle}>{next.title}</span>
              <span className={styles.nextArrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <Hairline />
      </article>
    </>
  )
}
