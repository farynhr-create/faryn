import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import styles from './ContactCTA.module.css'

export default function ContactCTA() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-cta-label">
      <Hairline />
      <div className={styles.inner}>
        <SectionLabel id="contact-cta-label">04 — Contact</SectionLabel>
        <h2 className={styles.headline}>Let's talk.</h2>
        <div className={styles.links}>
          <a
            href="mailto:hello@farynstudio.nl"
            className={styles.emailLink}
          >
            hello@farynstudio.nl
          </a>
          <div className={styles.social}>
            <a
              href="https://www.linkedin.com/in/farnoosh-rouhi-58424180/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span className={styles.dot} aria-hidden="true">·</span>
            <a
              href="#instagram-placeholder"
              className={styles.socialLink}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <Hairline />
    </section>
  )
}
