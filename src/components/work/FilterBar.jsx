import { filterCategories } from '@/data/projects'
import styles from './FilterBar.module.css'

export default function FilterBar({ active, onChange }) {
  return (
    <div className={styles.bar} role="group" aria-label="Filter projects by category">
      {filterCategories.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.btn}${active === id ? ' ' + styles.active : ''}`}
          onClick={() => onChange(id)}
          aria-pressed={active === id}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
