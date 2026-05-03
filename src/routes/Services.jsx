import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
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

const process = [
  { step: '01', name: 'Conversation', detail: 'A first call to understand intent, audience, and constraints.' },
  { step: '02', name: 'Definition',   detail: 'Scope, deliverables, and rhythm — written down before anything begins.' },
  { step: '03', name: 'Making',       detail: 'Iterative work with two structured reviews and quiet weeks between.' },
  { step: '04', name: 'Delivery',     detail: 'Final pieces, working files, and a handover that outlives the engagement.' },
]

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Faryn Studio</title>
        <meta
          name="description"
          content="Visual art, content creation, content strategy, and creative workshops from an independent creative practice in Amsterdam."
        />
      </Helmet>

      <div className={styles.page}>
        <Hairline />

        <PageHeader
          index="02 / 04"
          label="Practice"
          meta={[
            { label: 'Disciplines', value: '04' },
            { label: 'Engagement', value: 'Selective' },
            { label: 'Based',      value: 'Amsterdam, NL' },
          ]}
          title={<>What I <em>offer</em></>}
          intro="Independent practice across art, content, and strategy. Four ways of working, taken selectively and pursued thoroughly — with the same attention applied to a single drawing as to a year-long partnership."
        />

        <Hairline />

        {/* ── Services list ─────────────────────────────── */}
        <ol className={styles.services} role="list">
          {services.map((s) => (
            <li key={s.num} className={styles.service}>
              <div className={styles.serviceInner}>
                <div className={styles.numCol} aria-hidden="true">
                  <span className={styles.num}>{s.num}</span>
                  <span className={styles.numTick} />
                </div>

                <div className={styles.body}>
                  <h2 className={styles.serviceTitle}>{s.title}</h2>
                  <div className={styles.bodyText}>
                    {s.desc.map((p, i) => (
                      <p key={i} className={styles.bodyPara}>{p}</p>
                    ))}
                  </div>

                  <ul className={styles.scope} role="list">
                    {s.scope.map((item) => (
                      <li key={item} className={styles.scopeItem}>
                        <span className={styles.scopeDot} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Hairline />
            </li>
          ))}
        </ol>

        {/* ── Process ───────────────────────────────────── */}
        <section className={styles.process} aria-labelledby="process-label">
          <div className={styles.processInner}>
            <header className={styles.processHead}>
              <SectionLabel id="process-label" variant="before">Process</SectionLabel>
              <h2 className={styles.processTitle}>
                How a project<br /><em>unfolds</em>
              </h2>
            </header>

            <div className={styles.timeline} aria-hidden="true">
              <span className={styles.timelineLine} />
              {process.map((p, i) => (
                <span
                  key={p.step}
                  className={styles.timelineDot}
                  style={{ left: `${(i / (process.length - 1)) * 100}%` }}
                />
              ))}
            </div>

            <ol className={styles.steps} role="list">
              {process.map((p) => (
                <li key={p.step} className={styles.step}>
                  <span className={styles.stepNum}>{p.step}</span>
                  <h3 className={styles.stepName}>{p.name}</h3>
                  <p className={styles.stepDetail}>{p.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Hairline />

        {/* ── CTA ───────────────────────────────────────── */}
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
