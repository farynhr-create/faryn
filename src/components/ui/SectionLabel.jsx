import styles from './SectionLabel.module.css'
import clsx from 'clsx'

/* variant: 'before' | 'after' | 'both' | 'none'
 * accent:  boolean — adds a small red dot before the children */
export default function SectionLabel({ children, variant = 'none', accent = false, id }) {
  return (
    <p
      id={id}
      className={clsx(styles.label, {
        [styles.before]: variant === 'before' || variant === 'both',
        [styles.after]:  variant === 'after'  || variant === 'both',
      })}
    >
      {accent && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </p>
  )
}
