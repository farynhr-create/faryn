import { Link } from 'react-router-dom'
import Hairline from '@/components/ui/Hairline'
import LogoLockup from '@/components/brand/LogoLockup'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Hairline />
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link
            to="/"
            className={styles.wordmark}
            aria-label="Faryn Studio — home"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <LogoLockup variant="inline" width={200} ariaLabel="" />
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <ul className={styles.navList}>
            <li><Link to="/portfolio" className={styles.navLink}>Portfolio</Link></li>
            <li><Link to="/services" className={styles.navLink}>Services</Link></li>
            <li><Link to="/about"    className={styles.navLink}>About</Link></li>
            <li><Link to="/contact"  className={styles.navLink}>Contact</Link></li>
          </ul>
        </nav>

        <div className={styles.meta}>
          <p className={styles.location}>Amsterdam, NL</p>
          <a href="mailto:hello@farynstudio.nl" className={styles.email}>hello@farynstudio.nl</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <Hairline />
        <div className={styles.bottomInner}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Faryn Studio
          </p>
          <nav className={styles.bottomLinks} aria-label="Social links">
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
            <span className={styles.dot} aria-hidden="true">·</span>
            <a
              href="mailto:hello@farynstudio.nl"
              className={styles.socialLink}
            >
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
