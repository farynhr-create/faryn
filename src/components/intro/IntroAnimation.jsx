import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIntro } from '@/context/IntroContext'
import styles from './IntroAnimation.module.css'


// ── Phases ────────────────────────────────────────────────────────────────────
// 0: idle (overlay up, dot invisible)
// 1: dot fading in (0 → 0.6s)
// 2: dot holds    (0.6 → 1.25s)
// 3: dot travels + overlay fades (1.25 → 2.35s)
// 4: done

export default function IntroAnimation({ onComplete }) {
  const rm  = useReducedMotion()
  const { setIntroComplete } = useIntro()
  const [phase, setPhase] = useState(rm ? 4 : 0)

  // Logo red dot centre (viewport px)
  const [target, setTarget] = useState(null)
  // Viewport centre — read immediately so the dot renders centred on frame 1
  const [centre, setCentre] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth  / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  }))

  // ── Skip path ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!rm) return
    setIntroComplete(true)
    onComplete?.()
  }, []) // eslint-disable-line

  // ── Main orchestration ─────────────────────────────────────────────────────
  useEffect(() => {
    if (rm || phase !== 0) return

    requestAnimationFrame(() => {
      setCentre({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
      const el = document.getElementById('logo-dot-red')
      if (el) {
        const r = el.getBoundingClientRect()
        setTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
      }
    })

    const t1 = setTimeout(() => setPhase(1), 50)
    const t2 = setTimeout(() => setPhase(2), 660)
    const t3 = setTimeout(() => setPhase(3), 1260)
    const t4 = setTimeout(() => {
      setPhase(4)
      setIntroComplete(true)
      onComplete?.()
    }, 2360)

    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, []) // eslint-disable-line

  // Escape / Space / Enter to skip
  useEffect(() => {
    if (phase >= 4) return
    const handler = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        setPhase(4)
        setIntroComplete(true)
        onComplete?.()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase]) // eslint-disable-line

  if (rm) return null

  // ── Dot geometry ───────────────────────────────────────────────────────────
  const DOT_START = 80
  const DOT_END   = 4
  const halfS = DOT_START / 2
  const halfE = DOT_END   / 2

  const startX = centre.x - halfS
  const startY = centre.y - halfS
  const endX   = target ? target.x - halfE : startX
  const endY   = target ? target.y - halfE : startY

  const traveling = phase === 3
  const dotVisible = phase >= 1 && phase < 4

  return (
    <AnimatePresence>
      {phase < 4 && (
        <>
          {/* ── Paper overlay — covers page while dot holds, fades as dot travels ── */}
          <motion.div
            key="intro-overlay"
            className={styles.overlay}
            initial={{ opacity: 1 }}
            animate={{ opacity: traveling ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: traveling ? 0.95 : 0.01 }}
            onClick={() => { setPhase(4); setIntroComplete(true); onComplete?.() }}
            aria-hidden="true"
          />

          {/* ── The red dot ── */}
          <motion.div
            key="intro-dot"
            className={styles.dot}
            initial={{
              width: DOT_START, height: DOT_START,
              x: startX, y: startY,
              opacity: 0, scale: 0.3,
            }}
            animate={
              traveling && target
                ? {
                    width:   DOT_END,
                    height:  DOT_END,
                    x:       endX,
                    y:       endY,
                    opacity: [1, 1, 0],
                    scale:   1,
                  }
                : dotVisible
                ? {
                    opacity: 1, scale: 1,
                    width: DOT_START, height: DOT_START,
                    x: startX, y: startY,
                  }
                : { opacity: 0, scale: 0.3 }
            }
            transition={
              traveling && target
                ? {
                    duration: 1.0,
                    ease: [0.65, 0, 0.35, 1],
                    opacity: { times: [0, 0.65, 1], duration: 1.0 },
                  }
                : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }
          />

          {/* ── Skip hint ── */}
          <motion.span
            key="intro-skip"
            className={styles.skipHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.38 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            <span className={styles.skipTick} /> esc to skip
          </motion.span>
        </>
      )}
    </AnimatePresence>
  )
}
