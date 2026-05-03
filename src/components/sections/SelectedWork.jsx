import { Link } from 'react-router-dom'
import SectionLabel from '@/components/ui/SectionLabel'
import GhostLink from '@/components/ui/GhostLink'
import Hairline from '@/components/ui/Hairline'
import ProjectCard from '@/components/work/ProjectCard'
import { projects } from '@/data/projects'
import styles from './SelectedWork.module.css'

export default function SelectedWork({ limit = 3 }) {
  const shown = projects.slice(0, limit)

  return (
    <section className={styles.section} aria-labelledby="selected-work-label">
      <Hairline />
      <div className={styles.inner}>
        <header className={styles.header}>
          <SectionLabel id="selected-work-label">Selected work</SectionLabel>
          <GhostLink to="/work">View all</GhostLink>
        </header>
        <div className={styles.grid}>
          {shown.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
      <Hairline />
    </section>
  )
}
