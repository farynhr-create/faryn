import SectionLabel from './SectionLabel'
import styles from './PageHeader.module.css'

/* Shared header used by Work / Services / About / Contact.
 * Guarantees identical spacing, alignment, and the corner mark that
 * echoes the landing page's central red circle. */
export default function PageHeader({
  index,        // e.g. '02 / 04'
  label,        // e.g. 'Practice'
  meta,         // [{ label, value }]
  title,        // ReactNode (use <em> for italic emphasis)
  titleId,      // optional id for aria-labelledby
  intro,        // string
}) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.metaCol}>
          <SectionLabel variant="before">
            {index ? `${index} — ${label}` : label}
          </SectionLabel>
          {meta && meta.length > 0 && (
            <dl className={styles.meta}>
              {meta.map((row) => (
                <div key={row.label} className={styles.metaRow}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className={styles.titleCol}>
          <h1 id={titleId} className={styles.title}>
            {title}
          </h1>
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>

        {/* Corner mark — leader hairline + red dot, echoes landing composition */}
        <span className={styles.mark} aria-hidden="true">
          <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="0"
              y1="20"
              x2="58"
              y2="20"
              stroke="var(--color-ink)"
              strokeWidth="0.5"
              opacity="0.4"
            />
            <circle cx="64" cy="20" r="4.5" fill="var(--color-mark)" />
          </svg>
        </span>
      </div>
    </header>
  )
}
