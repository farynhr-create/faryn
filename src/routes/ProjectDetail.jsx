import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLightbox } from '@/context/LightboxContext'
import { projects } from '@/data/projects'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import GhostLink from '@/components/ui/GhostLink'
import styles from './ProjectDetail.module.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { open }  = useLightbox()
  const idx       = projects.findIndex(p => p.slug === slug)
  const project   = projects[idx]

  if (!project) return <Navigate to="/portfolio" replace />

  const next = projects[(idx + 1) % projects.length]
  const {
    title, subtitle, year, role, client, medium, filterLabel,
    context, thinking, outcome,
    gallery, screens, identityImage, carousels, videos,
  } = project

  const lightboxImages = (gallery || []).map(img => ({
    src:     img.src,
    alt:     title,
    caption: img.caption || null,
  }))

  const carouselLightboxImages = (carousels || []).flatMap(post =>
    post.slides.map(s => ({ src: s.src, alt: title, caption: s.caption || null }))
  )

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
              <Link to="/portfolio" className={styles.breadcrumbLink}>PORTFOLIO</Link>
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

        {/* ── Identity hero (product design splash) ── */}
        {identityImage && (
          <>
            <div className={styles.identityHero}>
              <img
                src={identityImage}
                alt={`${title} — identity`}
                className={styles.identityImg}
              />
              <div className={styles.identityOverlay} aria-hidden="true" />
            </div>
            <Hairline />
          </>
        )}

        {/* ── Standard image gallery (artwork / content design) ── */}
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

        {/* ── Phone screen strip (product design) ── */}
        {screens && screens.length > 0 && (
          <>
            <div className={styles.screenStrip} aria-label="App screens">
              {screens.map(({ src, label }, i) => (
                <figure
                  key={src}
                  className={`${styles.phone} ${i % 2 === 1 ? styles.phoneUp : ''}`}
                >
                  <div className={styles.phoneFrame}>
                    <img src={src} alt={`${title} — ${label}`} loading="lazy" />
                  </div>
                  <figcaption className={styles.phoneLabel}>{label}</figcaption>
                </figure>
              ))}
            </div>
            <Hairline />
          </>
        )}

        {/* ── Carousel series (e.g. Ant.Element) ── */}
        {carousels && carousels.length > 0 && (() => {
          let globalIdx = 0
          return (
            <>
              <div className={styles.carouselSeries} aria-label="Carousel series">
                {carousels.map((post) => (
                  <div key={post.id} className={styles.carouselPost}>
                    <div className={styles.carouselPostHead}>
                      <span className={styles.carouselPostLabel}>{post.label}</span>
                      <span className={styles.carouselPostTitle}>{post.title}</span>
                    </div>
                    <div className={styles.carouselRow}>
                      {post.slides.map((slide, i) => {
                        const idx = globalIdx++
                        return (
                          <figure key={slide.src} className={styles.carouselSlide}>
                            <button
                              className={styles.carouselThumb}
                              onClick={() => open(carouselLightboxImages, idx)}
                              aria-label={`Open image ${idx + 1} of ${carouselLightboxImages.length}`}
                            >
                              <div className={styles.carouselFrame}>
                                <img src={slide.src} alt={slide.caption || `${post.title} — slide ${i + 1}`} loading="lazy" />
                              </div>
                            </button>
                            <figcaption className={styles.carouselCaption}>
                              <span>{pad(i + 1)}</span>
                              <span>{slide.caption}</span>
                            </figcaption>
                          </figure>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <Hairline />
            </>
          )
        })()}

        {/* ── Videos ── */}
        {videos && videos.length > 0 && (
          <>
            <div className={styles.videoGrid} aria-label="Videos">
              {videos.map((v, i) => (
                <figure key={v.src} className={styles.videoItem}>
                  <div className={styles.videoFrame}>
                    <video src={v.src} autoPlay muted loop playsInline controls />
                  </div>
                  {v.caption && (
                    <figcaption className={styles.videoCaption}>
                      <span>{pad(i + 1)}</span>
                      <span>{v.caption}</span>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
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
            <Link to={`/portfolio/${next.slug}`} className={styles.nextLink}>
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
