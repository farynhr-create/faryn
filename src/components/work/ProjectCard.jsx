import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GeometricStudy from '@/components/compositions/GeometricStudy'
import TopographicCurves from '@/components/compositions/TopographicCurves'
import TypographicBlock from '@/components/compositions/TypographicBlock'
import styles from './ProjectCard.module.css'

const THUMBNAILS = {
  geometric:   GeometricStudy,
  topographic: TopographicCurves,
  typographic: TypographicBlock,
}

const ProjectCard = memo(function ProjectCard({ project }) {
  const { slug, title, subtitle, filterLabel, year, thumbnail } = project
  const Comp = THUMBNAILS[thumbnail]

  return (
    <Link to={`/work/${slug}`} className={styles.card}>
      <div className={styles.thumbnail}>
        {Comp
          ? <Comp />
          : <img src={thumbnail} alt="" className={styles.thumbnailImg} loading="lazy" />
        }
        {/* Red dot — appears on hover, upper-left of thumbnail */}
        <motion.span
          className={styles.hoverDot}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className={styles.meta}>
        <div className={styles.row}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.tag}>{filterLabel}</span>
        </div>
        <p className={styles.caption}>
          {[subtitle, year].filter(Boolean).join(' — ')}
        </p>
      </div>
    </Link>
  )
})

export default ProjectCard
