import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Hairline from '@/components/ui/Hairline'
import styles from './ContactCTA.module.css'

export default function ContactCTA() {
  return (
    <section className={styles.section} aria-label="Contact call to action">
      <Hairline />
      <div className={styles.inner}>
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
