import SectionLabel from '@/components/ui/SectionLabel'
import GhostLink from '@/components/ui/GhostLink'
import Hairline from '@/components/ui/Hairline'
import styles from './AboutPreview.module.css'

export default function AboutPreview() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-preview-label">
      <Hairline />
      <div className={styles.grid}>
        {/* Left — text */}
        <div className={styles.left}>
          <SectionLabel id="about-preview-label" variant="before">03 — About</SectionLabel>
          <h2 className={styles.heading}>
            Where art<br />
            <em>meets</em> strategy
          </h2>
          <p className={styles.body}>
            Faryn Studio is a one-person practice operating at the intersection
            of fine art and strategic communication. The work moves between
            studio and desk — between making things and thinking about why they
            are made.
          </p>
          <p className={styles.body}>
            Based in Amsterdam, working with cultural organisations, independent
            publishers, and brands that take their communication seriously.
          </p>
          <div className={styles.cta}>
            <GhostLink to="/about" hairline>Read more</GhostLink>
          </div>
        </div>

        {/* Right — calm haiku composition: rail + hanko + small marks */}
        <div className={styles.right} aria-hidden="true">
          <svg
            className={styles.composition}
            viewBox="0 0 320 520"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Vertical rail */}
            <line
              x1="80"
              y1="70"
              x2="80"
              y2="450"
              stroke="var(--color-ink)"
              strokeWidth="0.5"
              opacity="0.45"
            />

            {/* Tick to hanko */}
            <line
              x1="80"
              y1="260"
              x2="170"
              y2="260"
              stroke="var(--color-ink)"
              strokeWidth="0.5"
              opacity="0.3"
            />

            {/* Hanko — single red seal */}
            <circle cx="186" cy="260" r="13" fill="var(--color-mark)" />

            {/* Three quiet notes on the rail */}
            <g>
              <circle cx="80" cy="120" r="2.6" fill="var(--color-ink)" opacity="0.6" />
              <text
                x="100"
                y="120"
                dy="0.32em"
                fontFamily="var(--font-mono)"
                fontSize="9"
                letterSpacing="1.6"
                fill="var(--color-ink)"
                opacity="0.5"
              >
                STUDIO
              </text>
            </g>

            <g>
              <circle cx="80" cy="260" r="3.2" fill="var(--color-ink)" opacity="0.85" />
            </g>

            <g>
              <circle cx="80" cy="400" r="2.6" fill="var(--color-ink)" opacity="0.6" />
              <text
                x="100"
                y="400"
                dy="0.32em"
                fontFamily="var(--font-mono)"
                fontSize="9"
                letterSpacing="1.6"
                fill="var(--color-ink)"
                opacity="0.5"
              >
                EST. 2018
              </text>
            </g>

            {/* Small italic name beside hanko */}
            <text
              x="186"
              y="295"
              textAnchor="middle"
              fontFamily="var(--font-serif)"
              fontStyle="italic"
              fontSize="13"
              fill="var(--color-ink)"
              opacity="0.65"
            >
              Faryn
            </text>
          </svg>
        </div>
      </div>
      <Hairline />
    </section>
  )
}
