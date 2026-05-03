import { NavLink } from 'react-router-dom'
import { useMobileMenu } from '@/context/MobileMenuContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import LogoLockup from '@/components/brand/LogoLockup'
import MobileMenu from './MobileMenu'
import styles from './Nav.module.css'

const links = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
]

export default function Nav() {
  const { isOpen, toggle } = useMobileMenu()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <header className={styles.nav} role="banner">
        <div className={styles.inner}>
          <NavLink
            to="/"
            className={styles.wordmark}
            aria-label="Faryn Studio — home"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <LogoLockup variant="stacked" width={140} ariaLabel="" />
          </NavLink>

          {!isMobile && (
            <nav className={styles.links} aria-label="Primary navigation">
              <ul>
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {isMobile && (
            <button
              className={styles.burger}
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Two hairlines — not three */}
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden="true">
                <line
                  x1="0" y1="4"  x2="24" y2="4"
                  stroke="var(--color-ink)"
                  strokeWidth="0.5"
                  className={isOpen ? styles.lineTop : ''}
                  style={{ transformOrigin: '12px 4px', transition: 'transform 0.25s ease' }}
                />
                <line
                  x1="0" y1="12" x2="24" y2="12"
                  stroke="var(--color-ink)"
                  strokeWidth="0.5"
                  className={isOpen ? styles.lineBottom : ''}
                  style={{ transformOrigin: '12px 12px', transition: 'transform 0.25s ease' }}
                />
              </svg>
            </button>
          )}
        </div>
      </header>

      {isMobile && <MobileMenu links={links} />}
    </>
  )
}
