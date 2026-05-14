import { Helmet } from 'react-helmet-async'
import { projects, filterCategories } from '@/data/projects'
import DisciplineNav from '@/components/work/DisciplineNav'
import PortfolioStream from '@/components/work/PortfolioStream'
import Hairline from '@/components/ui/Hairline'
import PageHeader from '@/components/ui/PageHeader'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const years = projects.map((p) => Number(p.year)).filter(Boolean)
  const yearRange =
    years.length > 0 ? `${Math.min(...years)}—${Math.max(...years)}` : '—'

  return (
    <>
      <Helmet>
        <title>Portfolio — Faryn Studio</title>
        <meta
          name="description"
          content="Selected projects across visual art, content creation, content strategy, and teaching — presented as a single editorial index."
        />
      </Helmet>

      <div className={styles.page}>
        <Hairline />

        <PageHeader
          index="01 / 04"
          label="Portfolio"
          meta={[
            { label: 'Volume',  value: 'I' },
            { label: 'Years',   value: yearRange },
            { label: 'Entries', value: String(projects.length).padStart(2, '0') },
          ]}
          title={<>Selected <em>projects</em></>}
          hideMark
        />

        <DisciplineNav
          projects={projects}
          categories={filterCategories}
          total={projects.length}
        />

        <PortfolioStream projects={projects} />
      </div>
    </>
  )
}
