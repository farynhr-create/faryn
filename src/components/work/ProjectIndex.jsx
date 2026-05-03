import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GeometricStudy from '@/components/compositions/GeometricStudy'
import TopographicCurves from '@/components/compositions/TopographicCurves'
import TypographicBlock from '@/components/compositions/TypographicBlock'
import styles from './ProjectIndex.module.css'

const THUMBNAILS = {
  geometric: GeometricStudy,
  topographic: TopographicCurves,
  typographic: TypographicBlock,
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function ProjectIndex({ projects }) {
  return (
    <div className={styles.index}>
      <div className={styles.head} aria-hidden="true">
        <span className={styles.headIdx}>№</span>
        <span className={styles.headTitle}>Project</span>
        <span className={styles.headCat}>Discipline</span>
        <span className={styles.headYear}>Year</span>
      </div>

      <ul className={styles.list} role="list">
        <AnimatePresence mode="popLayout">
          {projects.length === 0 ? (
            <motion.li
              key="empty"
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No projects in this category — yet.
            </motion.li>
          ) : (
            projects.map((p, i) => {
              const Comp = THUMBNAILS[p.thumbnail]
              const isImg = !Comp && typeof p.thumbnail === 'string'
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, delay: i * 0.04 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  className={styles.item}
                >
                  <Link to={`/work/${p.slug}`} className={styles.row}>
                    <span className={styles.idx}>
                      <span className={styles.dot} aria-hidden="true" />
                      {pad(i + 1)}
                    </span>

                    <span className={styles.titleBlock}>
                      <span className={styles.title}>{p.title}</span>
                      {p.subtitle && (
                        <span className={styles.sub}>{p.subtitle}</span>
                      )}
                    </span>

                    <span className={styles.cat}>{p.filterLabel}</span>
                    <span className={styles.year}>{p.year || '—'}</span>

                    {/* Floating preview — hidden by default, fades on row hover */}
                    <span className={styles.preview} aria-hidden="true">
                      {Comp ? (
                        <Comp />
                      ) : isImg ? (
                        <img
                          src={p.thumbnail}
                          alt=""
                          loading="lazy"
                          className={styles.previewImg}
                        />
                      ) : null}
                    </span>
                  </Link>
                </motion.li>
              )
            })
          )}
        </AnimatePresence>
      </ul>
    </div>
  )
}
