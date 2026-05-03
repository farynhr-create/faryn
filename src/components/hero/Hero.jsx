import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { fadeUp, staggerContainer } from '@/utils/motion'
import HeroCanvas from './HeroCanvas'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import Hairline from '@/components/ui/Hairline'
import styles from './Hero.module.css'

export default function Hero() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced   = useReducedMotion()

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

          <motion.h1
            className={styles.headline}
            variants={reduced ? {} : fadeUp}
            custom={1}
          >
            Art that<br />
            <em>tells</em><br />
            stories.
          </motion.h1>

          <motion.p
            className={styles.sub}
            variants={reduced ? {} : fadeUp}
            custom={2}
          >
            Visual art, content creation, and content strategy
            for organisations that believe in the power of
            considered communication.
          </motion.p>

          <motion.div
            className={styles.cta}
            variants={reduced ? {} : fadeUp}
            custom={3}
          >
            <Link to="/work">
              <Button>View work</Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Vertical hairline ── */}
        {isDesktop && <div className={styles.divider} aria-hidden="true" />}

        {/* ── Right: interactive composition ── */}
        <div className={styles.right}>
          {!isDesktop && <div className={styles.mobileComposition}><HeroCanvas /></div>}
          {isDesktop  && <HeroCanvas />}
        </div>
      </div>
      <Hairline />
    </section>
  )
}
