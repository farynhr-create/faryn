import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Hairline from '@/components/ui/Hairline'
import SectionLabel from '@/components/ui/SectionLabel'
import styles from './ContactCTA.module.css'

export default function ContactCTA() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-cta-label">
      <Hairline />
      <div className={styles.inner}>
        <SectionLabel id="contact-cta-label">04 — Contact</SectionLabel>
        <h2 className={styles.headline}>
          Have a project<br />in <em>mind?</em>
        </h2>
        <div className={styles.cta}>
          <Link to="/contact">
            <Button>Start a project</Button>
          </Link>
        </div>
      </div>
      <Hairline />
    </section>
  )
}
