import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import Button from '@/components/ui/Button'
import styles from './Contact.module.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    /* In production, wire to a form service (Formspree, Netlify Forms, etc.) */
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

        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.left}>
            <SectionLabel variant="before">Get in touch</SectionLabel>
            <h1 className={styles.title}>
              Start a<br /><em>project</em>
            </h1>
            <p className={styles.body}>
              All engagements begin with a conversation. Tell me about your project and I will respond within two business days.
            </p>
            <dl className={styles.details}>
              <dt>Email</dt>
              <dd><a href="mailto:hello@farynstudio.nl" className={styles.detailLink}>hello@farynstudio.nl</a></dd>
              <dt>Location</dt>
              <dd>Amsterdam, NL</dd>
              <dt>Availability</dt>
              <dd>Currently accepting projects for Q3 2025</dd>
            </dl>
          </div>

          {/* Right — form */}
          <div className={styles.right}>
            {sent ? (
              <div className={styles.thanks}>
                <p className={styles.thanksText}>
                  Thank you. I will be in touch shortly.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
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

                <div className={styles.field}>
                  <label htmlFor="project" className={styles.label}>Project description</label>
                  <textarea
                    id="project"
                    name="project"
                    className={`${styles.input} ${styles.textarea}`}
                    rows={6}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="budget" className={styles.label}>Approximate budget</label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    className={styles.input}
                    placeholder="Optional"
                  />
                </div>

                <div className={styles.submit}>
                  <Button type="submit">Send message</Button>
                </div>
              </form>
            )}
          </div>
        </div>

        <Hairline />
      </div>
    </>
  )
}
