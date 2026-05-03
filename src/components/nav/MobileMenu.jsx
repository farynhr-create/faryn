import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useMobileMenu } from '@/context/MobileMenuContext'
import styles from './MobileMenu.module.css'

export default function MobileMenu({ links }) {
  const { isOpen, close } = useMobileMenu()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          className={styles.menu}
          role="dialog"
          aria-label="Navigation menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <nav>
            <ul className={styles.list}>
              {links.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={to}
                    onClick={close}
                    className={({ isActive }) =>
                      isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
