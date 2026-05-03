import SectionLabel from '@/components/ui/SectionLabel'
import GhostLink from '@/components/ui/GhostLink'
import Hairline from '@/components/ui/Hairline'
import ConcentricCircles from '@/components/compositions/ConcentricCircles'
import styles from './AboutPreview.module.css'

export default function AboutPreview() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-preview-label">
      <Hairline />
      <div className={styles.grid}>
        {/* Left */}
        <div className={styles.left}>
          <SectionLabel id="about-preview-label">03 — About</SectionLabel>
          <h2 className={styles.heading}>
            Where art<br />
            <em>meets</em> strategy
          </h2>
          <p className={styles.body}>
            Faryn Studio is a one-person practice operating at the intersection of fine art and strategic communication. The work moves between studio and desk — between making things and thinking about why they are made.
          </p>
          <p className={styles.body}>
            Based in Amsterdam, the studio works with cultural organisations, independent publishers, and brands that take their communication seriously. Projects range from an original series of works on paper to multi-year content partnerships.
          </p>
          <p className={styles.body}>
            The through-line is attention: to material, to audience, to the space between what is said and what is meant.
          </p>
          <div className={styles.cta}>
            <GhostLink to="/about" hairline>Read more</GhostLink>
          </div>
        </div>

        {/* Right — composition */}
        <div className={styles.right} aria-hidden="true">
          <ConcentricCircles width={500} height={500} />
        </div>
      </div>
      <Hairline />
    </section>
  )
}
