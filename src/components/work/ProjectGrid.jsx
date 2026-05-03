import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import styles from './ProjectGrid.module.css'

export default function ProjectGrid({ projects }) {
  return (
    <div className={styles.grid}>
      <AnimatePresence mode="popLayout">
        {projects.length === 0 ? (
          <motion.p
            key="empty"
            className={styles.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No projects in this category — yet.
          </motion.p>
        ) : (
          projects.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4, delay: i * 0.06 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  )
}
