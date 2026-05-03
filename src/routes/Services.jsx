import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import Button from '@/components/ui/Button'
import styles from './Services.module.css'

const services = [
  {
    num: '01',
    title: 'Visual Art & Illustration',
    desc: [
      'Original works on paper, mixed-media pieces, and commissioned illustrations for print, publication, and exhibition.',
      'The work is rooted in drawing fundamentals — construction, measurement, form — and ranges from intimate studies to large-format pieces.',
    ],
    scope: ['Original works', 'Editorial illustration', 'Commissioned pieces', 'Exhibition contexts'],
  },
  {
    num: '02',
    title: 'Content Creation',
    desc: [
      'Photography, writing, and editorial design for organisations that need content to work harder than it usually does.',
      'Engagements range from single campaigns to year-long partnerships with clearly defined editorial structures.',
    ],
    scope: ['Photography', 'Long-form writing', 'Editorial design', 'Ongoing partnerships'],
  },
  {
    num: '03',
    title: 'Content Strategy',
    desc: [
      'Editorial frameworks, voice systems, and content architecture for cultural institutions and independent brands.',
      'The output is not a document — it is a working system: decision trees, tone guides, template libraries, and the sessions needed to embed them.',
    ],
    scope: ['Editorial frameworks', 'Voice systems', 'Content audits', 'Workshop delivery'],
  },
  {
    num: '04',
    title: 'Creative Workshops',
    desc: [
      'Drawing fundamentals and creative practice workshops for professionals — designers, architects, strategists, and anyone who has stopped drawing.',
      'The curriculum is built around three pairs: mark and surface, line and form, figure and ground. Delivered in cohorts of six to twelve.',
    ],
    scope: ['Drawing fundamentals', 'Cohort-based', 'Custom curricula', 'Professional contexts'],
  },
]

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Faryn Studio</title>
        <meta name="description" content="Visual art, content creation, content strategy, and creative workshops from an independent creative practice in Amsterdam." />
      </Helmet>

      <div className={styles.page}>
        <Hairline />
        <div className={styles.header}>
          <SectionLabel>What I offer</SectionLabel>
          <h1 className={styles.title}>Services</h1>
        </div>
        <Hairline />

        {services.map(s => (
          <div key={s.num}>
            <div className={styles.service}>
              <div className={styles.serviceMeta}>
                <span className={styles.num}>{s.num}</span>
                <h2 className={styles.serviceTitle}>{s.title}</h2>
              </div>
              <div className={styles.serviceBody}>
                {s.desc.map((p, i) => <p key={i} className={styles.body}>{p}</p>)}
                <ul className={styles.scope}>
                  {s.scope.map(item => (
                    <li key={item} className={styles.scopeItem}>
                      <span className={styles.scopeDot} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Hairline />
          </div>
        ))}

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            All engagements begin with a conversation.
          </p>
          <Link to="/contact">
            <Button>Start a project</Button>
          </Link>
        </div>
        <Hairline />
      </div>
    </>
  )
}
