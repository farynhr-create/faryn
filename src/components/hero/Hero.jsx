import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { fadeUp, staggerContainer } from '@/utils/motion'
import HeroComposition from './HeroComposition'
import ZenLeaves from './ZenLeaves'
import LetterDot from './LetterDot'
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
          {/* Sumi-e bamboo leaves drift in behind the haiku as an ink backdrop */}
          <ZenLeaves />

          <motion.div variants={reduced ? {} : fadeUp} custom={0}>
            <SectionLabel variant="before">Visual Studio · Amsterdam</SectionLabel>
          </motion.div>

          {/* Haiku-style 3-line headline with cascading indent.
              Brushstroke tick opens the verse; the "o" in stories
              becomes a red dot — the only red mark in the line. */}
          <motion.h1
            className={styles.headline}
            aria-label="Art that tells stories"
            variants={reduced ? {} : fadeUp}
            custom={1}
          >
            <span className={styles.lineA}>
              <span className={styles.tick} aria-hidden="true" />
              <span aria-hidden="true">Art</span>
            </span>
            <span className={styles.lineB} aria-hidden="true">
              that <em>tells</em>
            </span>
            <span className={styles.lineC} aria-hidden="true">
              ST<LetterDot />RIES
            </span>
          </motion.h1>

          <motion.p
            className={styles.sub}
            variants={reduced ? {} : fadeUp}
            custom={2}
          >
            I'm Farnoosh — a content designer building visual<br />
            systems for brands that need both craft and strategy.
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
