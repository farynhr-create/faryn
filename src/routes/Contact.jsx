import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Hairline from '@/components/ui/Hairline'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import styles from './Contact.module.css'

const projectTypes = [
  { id: 'visual-art', label: 'Visual art' },
  { id: 'content',    label: 'Content' },
  { id: 'strategy',   label: 'Strategy' },
  { id: 'workshop',   label: 'Workshop' },
  { id: 'other',      label: 'Something else' },
]

const channels = [
  { label: 'Email',     value: 'hello@farynstudio.nl', href: 'mailto:hello@farynstudio.nl' },
  { label: 'Instagram', value: '@faryn.studio',       href: 'https://instagram.com/faryn.studio' },
  { label: 'Are.na',    value: 'faryn-studio',         href: 'https://are.na/faryn-studio' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [type, setType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Helmet>
        <title>Contact — Faryn Studio</title>
        <meta name="description" content="Start a project with Faryn Studio. Based in Amsterdam." />
      </Helmet>

      <div className={styles.page}>
        <Hairline />

        <PageHeader
          index="04 / 04"
          label="Contact"
          meta={[
            { label: 'Reply',     value: '< 2 business days' },
            { label: 'Hours',     value: 'Mon–Thu, 09–17 CET' },
            { label: 'Booking',   value: 'Q3 2026' },
          ]}
          title={<>Let's <em>begin.</em></>}
          intro="Tell me about the project you have in mind. Every engagement starts with a short conversation — no pitch decks, no NDAs upfront."
        />

        <Hairline />

        <div className={styles.grid}>
          {/* ── Left: details column ─────────────────── */}
          <aside className={styles.aside}>
            <div className={styles.detailBlock}>
              <h2 className={styles.detailHead}>
                <span className={styles.detailDot} aria-hidden="true" />
                Channels
              </h2>
              <dl className={styles.channels}>
                {channels.map((c) => (
                  <div key={c.label} className={styles.channelRow}>
                    <dt>{c.label}</dt>
                    <dd>
                      <a href={c.href} className={styles.channelLink}>{c.value}</a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.detailBlock}>
              <h2 className={styles.detailHead}>
                <span className={styles.detailDot} aria-hidden="true" />
                Studio
              </h2>
              <dl className={styles.channels}>
                <div className={styles.channelRow}>
                  <dt>Location</dt>
                  <dd>Amsterdam, NL</dd>
                </div>
                <div className={styles.channelRow}>
                  <dt>Hours</dt>
                  <dd>Mon — Thu, 09:00 — 17:00 CET</dd>
                </div>
                <div className={styles.channelRow}>
                  <dt>Availability</dt>
                  <dd>
                    <span className={styles.statusDot} aria-hidden="true" />
                    Booking Q3 2026
                  </dd>
                </div>
              </dl>
            </div>

            <p className={styles.note}>
              For press, exhibition enquiries, or speaking invitations,
              please mention so in the message and I'll route accordingly.
            </p>
          </aside>

          {/* ── Right: form ───────────────────────────── */}
          <section className={styles.formCol} aria-label="Project enquiry">
            {sent ? (
              <div className={styles.thanks}>
                <span className={styles.thanksDot} aria-hidden="true" />
                <p className={styles.thanksText}>
                  Thank you. I will be in touch within two business days.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Project type — chip selector */}
                <div className={styles.field}>
                  <span className={styles.label}>What kind of project?</span>
                  <div className={styles.chips} role="radiogroup">
                    {projectTypes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={type === t.id}
                        className={`${styles.chip}${type === t.id ? ' ' + styles.chipActive : ''}`}
                        onClick={() => setType(t.id)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.input}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.input}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="organisation" className={styles.label}>
                    Organisation <span className={styles.optional}>— optional</span>
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    className={styles.input}
                    autoComplete="organization"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="project" className={styles.label}>
                    Tell me about the project
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    className={`${styles.input} ${styles.textarea}`}
                    rows={6}
                    required
                  />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="budget" className={styles.label}>
                      Budget <span className={styles.optional}>— optional</span>
                    </label>
                    <input
                      id="budget"
                      name="budget"
                      type="text"
                      className={styles.input}
                      placeholder="EUR"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="timeline" className={styles.label}>
                      Timeline <span className={styles.optional}>— optional</span>
                    </label>
                    <input
                      id="timeline"
                      name="timeline"
                      type="text"
                      className={styles.input}
                      placeholder="e.g. Q4 2026"
                    />
                  </div>
                </div>

                <div className={styles.submit}>
                  <Button type="submit">Send message</Button>
                  <span className={styles.submitNote}>Replies within two business days.</span>
                </div>
              </form>
            )}
          </section>
        </div>

        <Hairline />
      </div>
    </>
  )
}
