import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './LetterDot.module.css'

/* LetterDot — the red "o" in "stories" that cycles through portfolio work.
 *
 * The brand's one-red-mark becomes a small circular viewport into the
 * studio's output: drawings, paintings, brochure work. A thin red ring
 * keeps the mark identity, the image cycles inside the ring every few
 * seconds with a soft crossfade.
 *
 * The outer span keeps id="hero-letter-dot" so the intro animation's
 * iris-reveal can still close precisely onto this circle.
 */

const IMAGES = [
  '/images/projects/drawings/drawing-01.jpg',
  '/images/projects/paintings/painting-01.jpg',
  '/images/projects/drawings/drawing-03.jpg',
  '/images/projects/paintings/painting-04.jpg',
  '/images/projects/drawings/drawing-05.jpg',
  '/images/projects/paintings/painting-02.jpg',
]

const CYCLE_MS = 2800

export default function LetterDot() {
  const rm = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  // Preload all images on mount so crossfades never reveal a blank circle
  useEffect(() => {
    IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Auto-cycle — pauses on hover, stops entirely under reduced motion
  useEffect(() => {
    if (rm || paused) return
    const t = setInterval(() => {
      setI((n) => (n + 1) % IMAGES.length)
    }, CYCLE_MS)
    return () => clearInterval(t)
  }, [rm, paused])

  return (
    <span
      id="hero-letter-dot"
      className={styles.dot}
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className={styles.fill} aria-hidden="true" />

      <AnimatePresence initial={false}>
        <motion.img
          key={IMAGES[i]}
          src={IMAGES[i]}
          alt=""
          className={styles.image}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          draggable={false}
        />
      </AnimatePresence>

      <span className={styles.ring} aria-hidden="true" />
    </span>
  )
}
