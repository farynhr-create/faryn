import styles from './Button.module.css'

export default function Button({ children, onClick, type = 'button', ...props }) {
  return (
    <button className={styles.btn} type={type} onClick={onClick} {...props}>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </button>
  )
}
