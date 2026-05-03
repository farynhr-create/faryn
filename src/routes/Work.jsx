import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { projects } from '@/data/projects'
import FilterBar from '@/components/work/FilterBar'
import ProjectGrid from '@/components/work/ProjectGrid'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import styles from './Work.module.css'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(p => p.category === activeFilter)
  }, [activeFilter])

  return (
    <>
      <Helmet>
        <title>Work — Faryn Studio</title>
        <meta name="description" content="Selected projects across visual art, content creation, content strategy, and teaching." />
      </Helmet>

      <div className={styles.page}>
        {/* Header strip */}
        <div className={styles.header}>
          <Hairline />
          <div className={styles.headerInner}>
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className={styles.title}>Work</h1>
            <p className={styles.sub}>
              A selection of projects across visual art, content, strategy, and teaching.
            </p>
          </div>
          <Hairline />
        </div>

        {/* Filter row */}
        <div className={styles.filters}>
          <div className={styles.filtersInner}>
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </div>
          <Hairline />
        </div>

        {/* Grid */}
        <div className={styles.gridWrap}>
          <ProjectGrid projects={filtered} />
        </div>
      </div>
    </>
  )
}
