import styles from './SectionLabel.module.css'
import clsx from 'clsx'

/* variant: 'before' | 'after' | 'both' | 'none' */
export default function SectionLabel({ children, variant = 'none', id }) {
  return (
    <p
      id={id}
      className={clsx(styles.label, {
        [styles.before]: variant === 'before' || variant === 'both',
        [styles.after]:  variant === 'after'  || variant === 'both',
      })}
    >
      {children}
    </p>
  )
}
