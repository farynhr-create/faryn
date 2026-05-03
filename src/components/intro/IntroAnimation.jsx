import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './IntroAnimation.module.css'

// ── Coordinate data ───────────────────────────────────────────────────────────
// viewBox 0 0 1180 220 — do not change any value

const STROKES = [
  // F
  { x1: 40,    y1: 20,  x2: 40,    y2: 200, delay: 0.7 },
  { x1: 40,    y1: 20,  x2: 135,   y2: 20,  delay: 0.8 },
  { x1: 40,    y1: 110, x2: 100,   y2: 110, delay: 0.9 },
  // A
  { x1: 240,   y1: 200, x2: 295,   y2: 20,  delay: 0.9 },
  { x1: 295,   y1: 20,  x2: 350,   y2: 200, delay: 1.0 },
  { x1: 267.5, y1: 110, x2: 322.5, y2: 110, delay: 1.1 },
  // R
  { x1: 460,   y1: 20,  x2: 460,   y2: 200, delay: 1.1 },
  { x1: 460,   y1: 20,  x2: 555,   y2: 20,  delay: 1.2 },
  { x1: 555,   y1: 20,  x2: 555,   y2: 110, delay: 1.3 },
  { x1: 460,   y1: 110, x2: 555,   y2: 110, delay: 1.4 },
  { x1: 507,   y1: 110, x2: 555,   y2: 200, delay: 1.5 },
  // Y
  { x1: 675,   y1: 20,  x2: 730,   y2: 115, delay: 1.5 },
  { x1: 785,   y1: 20,  x2: 730,   y2: 115, delay: 1.6 },
  { x1: 730,   y1: 115, x2: 730,   y2: 200, delay: 1.7 },
  // N
  { x1: 890,   y1: 20,  x2: 890,   y2: 200, delay: 1.7 },
  { x1: 890,   y1: 20,  x2: 1000,  y2: 200, delay: 1.8 },
  { x1: 1000,  y1: 20,  x2: 1000,  y2: 200, delay: 1.9 },
]

const BLACK_DOTS = [
  // F
  { cx: 40,    cy: 20,  r: 10, fromX: -180, fromY: -150, delay: 0    },
  { cx: 135,   cy: 20,  r: 9,  fromX:  200, fromY: -180, delay: 0.05 },
  { cx: 100,   cy: 110, r: 9,  fromX:  220, fromY:    0, delay: 0.1  },
  { cx: 40,    cy: 200, r: 10, fromX: -150, fromY:  200, delay: 0.15 },
  // A
  { cx: 240,   cy: 200, r: 10, fromX: -180, fromY:  200, delay: 0.2  },
  { cx: 350,   cy: 200, r: 10, fromX:  180, fromY:  220, delay: 0.25 },
  { cx: 267.5, cy: 110, r: 9,  fromX: -220, fromY:    0, delay: 0.3  },
  { cx: 322.5, cy: 110, r: 9,  fromX:  220, fromY:    0, delay: 0.35 },
  // R
  { cx: 460,   cy: 20,  r: 10, fromX: -200, fromY: -180, delay: 0.4  },
  { cx: 555,   cy: 20,  r: 9,  fromX:  200, fromY: -180, delay: 0.45 },
  { cx: 555,   cy: 110, r: 9,  fromX:  250, fromY:    0, delay: 0.5  },
  { cx: 460,   cy: 110, r: 9,  fromX: -250, fromY:    0, delay: 0.55 },
  { cx: 460,   cy: 200, r: 10, fromX: -180, fromY:  200, delay: 0.6  },
  { cx: 555,   cy: 200, r: 9,  fromX:  200, fromY:  200, delay: 0.65 },
  // Y
  { cx: 675,   cy: 20,  r: 10, fromX: -200, fromY: -180, delay: 0.7  },
  { cx: 785,   cy: 20,  r: 10, fromX:  200, fromY: -180, delay: 0.75 },
  { cx: 730,   cy: 200, r: 10, fromX:    0, fromY:  250, delay: 0.8  },
  // N
  { cx: 890,   cy: 20,  r: 10, fromX: -200, fromY: -180, delay: 0.85 },
  { cx: 890,   cy: 200, r: 10, fromX: -200, fromY:  200, delay: 0.9  },
  { cx: 1000,  cy: 20,  r: 10, fromX:  200, fromY: -180, delay: 0.95 },
]

const RED_DOTS = [
  { cx: 40,   cy: 110, r: 11, fromX: -300, fromY: -250, delay: 2.2 },
  { cx: 295,  cy: 20,  r: 11, fromX:  100, fromY: -300, delay: 2.3 },
  { cx: 507,  cy: 110, r: 11, fromX:  300, fromY:  100, delay: 2.4 },
  { cx: 730,  cy: 115, r: 11, fromX: -150, fromY:  300, delay: 2.5 },
  { cx: 1000, cy: 200, r: 11, fromX:  300, fromY:  200, delay: 2.6 },
]

const STROKE_EASE = [0.4, 0, 0.2, 1]
const DOT_EASE    = [0.22, 1, 0.36, 1]

// ── Component ─────────────────────────────────────────────────────────────────
export default function IntroAnimation({ onComplete }) {
  const rm = useReducedMotion()
  const [visible, setVisible] = useState(true)

  // Skip on Escape or Space
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ') setVisible(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Auto-dismiss: 1s hold for reduced motion, 3.4s for full animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), rm ? 1000 : 3400)
    return () => clearTimeout(t)
  }, [rm])

  const handleExitComplete = () => {
    onComplete?.()
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="intro-overlay"
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onClick={() => setVisible(false)}
          role="presentation"
          aria-hidden="true"
        >
          {/* ── Graph-paper grid ─────────────────────────────────────────── */}
          <motion.svg
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: rm ? 0 : 0.4 }}
            aria-hidden="true"
          >
            <defs>
              <pattern id="intro-minor" width="14" height="14" patternUnits="userSpaceOnUse">
                <path
                  d="M 14 0 L 0 0 0 14"
                  fill="none"
                  stroke="#1c1c1c"
                  strokeWidth="0.4"
                  strokeOpacity="0.18"
                />
              </pattern>
              <pattern id="intro-major" width="70" height="70" patternUnits="userSpaceOnUse">
                <path
                  d="M 70 0 L 0 0 0 70"
                  fill="none"
                  stroke="#1c1c1c"
                  strokeWidth="0.5"
                  strokeOpacity="0.32"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#intro-minor)" />
            <rect width="100%" height="100%" fill="url(#intro-major)" />
          </motion.svg>

          {/* ── Wordmark ─────────────────────────────────────────────────── */}
          <div className={styles.wordmarkWrap}>
            <svg viewBox="0 0 1180 220" className={styles.wordmark} aria-hidden="true" fill="none">

              {/* Strokes — drawn first so dots layer on top */}
              {STROKES.map((s, i) => (
                <motion.line
                  key={`s${i}`}
                  x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
                  stroke="var(--color-ink)"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={rm
                    ? { duration: 0 }
                    : { duration: 0.5, delay: s.delay, ease: STROKE_EASE }
                  }
                />
              ))}

              {/* Black dots — fly in from edges */}
              {BLACK_DOTS.map((d, i) => (
                <motion.circle
                  key={`b${i}`}
                  cx={d.cx} cy={d.cy} r={d.r}
                  fill="var(--color-ink)"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ x: d.fromX, y: d.fromY, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={rm
                    ? { duration: 0 }
                    : { duration: 0.7, delay: d.delay, ease: DOT_EASE }
                  }
                />
              ))}

              {/* Red dots — arrive last with scale overshoot */}
              {RED_DOTS.map((d, i) => (
                <motion.circle
                  key={`r${i}`}
                  cx={d.cx} cy={d.cy} r={d.r}
                  fill="var(--color-mark)"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ x: d.fromX, y: d.fromY, scale: 0.4, opacity: 0 }}
                  animate={{ x: 0, y: 0, scale: [0.4, 1.2, 1], opacity: [0, 1, 1] }}
                  transition={rm
                    ? { duration: 0 }
                    : { duration: 0.6, delay: d.delay, ease: DOT_EASE }
                  }
                />
              ))}

            </svg>
          </div>

          <span className={styles.skipHint}>tap to skip</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
