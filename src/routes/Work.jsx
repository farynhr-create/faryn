import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { projects } from '@/data/projects'
import FilterBar from '@/components/work/FilterBar'
import ProjectIndex from '@/components/work/ProjectIndex'
import Hairline from '@/components/ui/Hairline'
import PageHeader from '@/components/ui/PageHeader'
import styles from './Work.module.css'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  const years = projects.map((p) => Number(p.year)).filter(Boolean)
  const yearRange =
    years.length > 0 ? `${Math.min(...years)}—${Math.max(...years)}` : '—'

  return (
    <>
      <Helmet>
        <title>Work — Faryn Studio</title>
        <meta
          name="description"
          content="Selected projects across visual art, content creation, content strategy, and teaching."
        />
      </Helmet>

      <div className={styles.page}>
        <Hairline />

        <PageHeader
          index="01 / 04"
          label="Work"
          meta={[
            { label: 'Volume',  value: 'I' },
            { label: 'Years',   value: yearRange },
            { label: 'Entries', value: String(projects.length).padStart(2, '0') },
          ]}
          title={<>Selected <em>work</em></>}
          intro="A working index of projects spanning visual art, editorial content, strategy, and teaching. The list is curated, not comprehensive — only work I would still defend today."
        />

        <Hairline />

        {/* Filter row */}
        <div className={styles.filters}>
          <div className={styles.filtersInner}>
            <span className={styles.filterLabel} aria-hidden="true">
              Filter —
            </span>
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
            <span className={styles.count} aria-live="polite">
              {String(filtered.length).padStart(2, '0')} /{' '}
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className={styles.gridWrap}>
          <ProjectIndex projects={filtered} />
        </div>
      </div>
    </>
  )
}
