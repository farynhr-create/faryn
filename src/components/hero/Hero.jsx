import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { fadeUp, staggerContainer } from '@/utils/motion'
import HeroComposition from './HeroComposition'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import Hairline from '@/components/ui/Hairline'
import styles from './Hero.module.css'

export default function Hero() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()

  const motionProps = reduced
    ? {}
    : { variants: staggerContainer, initial: 'hidden', animate: 'visible' }

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.grid}>
        {/* ── Left: text content ── */}
        <motion.div className={styles.left} {...motionProps}>
          <motion.div variants={reduced ? {} : fadeUp} custom={0}>
            <SectionLabel variant="before">Visual Studio · Amsterdam</SectionLabel>
          </motion.div>

          {/* Haiku-style 3-line headline with cascading indent.
              Brushstroke tick opens the verse, hanko seal closes it. */}
          <motion.h1
            className={styles.headline}
            variants={reduced ? {} : fadeUp}
            custom={1}
          >
            <span className={styles.lineA}>
              <span className={styles.tick} aria-hidden="true" />
              Art
            </span>
            <span className={styles.lineB}>that <em>tells</em></span>
            <span className={styles.lineC}>
              stories
              <span className={styles.seal} aria-hidden="true" />
            </span>
          </motion.h1>

          <motion.p
            className={styles.sub}
            variants={reduced ? {} : fadeUp}
            custom={2}
          >
            Visual art, content, and strategy<br />
            for considered communication.
          </motion.p>

          <motion.div
            className={styles.cta}
            variants={reduced ? {} : fadeUp}
            custom={3}
          >
            <Link to="/portfolio">
              <Button>View portfolio</Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Vertical hairline divider ── */}
        {isDesktop && <div className={styles.divider} aria-hidden="true" />}

        {/* ── Right: vertical-rail composition ── */}
        <div className={styles.right}>
          <HeroComposition />
        </div>
      </div>
      <Hairline />
    </section>
  )
}
