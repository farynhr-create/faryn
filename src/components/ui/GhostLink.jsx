import { Link } from 'react-router-dom'
import styles from './GhostLink.module.css'

export default function GhostLink({ to, href, children, hairline = false }) {
  const cls = `${styles.ghost}${hairline ? ' ' + styles.hairline : ''}`

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children} <span className={styles.arrow} aria-hidden="true">→</span>
      </Link>
    )
  }
  return (
    <a href={href} className={cls}>
      {children} <span className={styles.arrow} aria-hidden="true">→</span>
    </a>
  )
}
