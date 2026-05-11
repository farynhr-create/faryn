import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './IntroAnimation.module.css'

// ── Brand grid (matches the nav/footer Logo) ──────────────────────────────────
// viewBox 0 0 396 170 — five dots above FARYN above STUDIO.

const COLS = [98, 158, 218, 278, 338]
const LETTERS = ['F', 'A', 'R', 'Y', 'N']

// ── Choreography (in seconds) ─────────────────────────────────────────────────
// Total ceremony shaved to ~2.5s so repeat visits don't feel precious.
const BACKDROP_DUR     = 0.55
const DOT_BASE_DELAY   = 0.35
const DOT_STAGGER      = 0.08
const RED_DOT_DELAY    = 0.85
const LETTER_BASE_DELAY = 1.15
const LETTER_STAGGER   = 0.07
const STUDIO_DELAY     = 1.65
const PULSE_DELAY      = 1.95
const DISMISS_AT       = 2900   // overlay starts exit
const DISMISS_RM       = 900    // reduced-motion hold

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_CALLIGRAPHIC = [0.32, 0.72, 0.32, 1]

// Session flag so the intro plays once per session — senior UX call.
// Repeat refreshes in the same tab skip straight to the page.
const SESSION_KEY = 'faryn-intro-seen'

function hasSeenIntro() {
  if (typeof sessionStorage === 'undefined') return false
  try { return sessionStorage.getItem(SESSION_KEY) === '1' } catch { return false }
}

function markSeen() {
  if (typeof sessionStorage === 'undefined') return
  try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function IntroAnimation({ onComplete }) {
  const rm = useReducedMotion()
  // First visit in this session → show. Subsequent refreshes → skip.
  const [visible, setVisible] = useState(() => !hasSeenIntro())

  // Iris-reveal target — the red "o" in the hero headline. Measured at
  // mount so the closing circle lands precisely on the red letter-dot,
  // letting the seal travel from intro into the landing page.
  const [target, setTarget] = useState({ x: '50%', y: '38%' })

  useEffect(() => {
    if (!visible) {
      onComplete?.()
      return
    }
    markSeen()
  }, [visible, onComplete])

  useEffect(() => {
    if (!visible) return
    const measure = () => {
      const el = document.getElementById('hero-letter-dot')
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100
      const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100
      setTarget({ x: `${x.toFixed(2)}%`, y: `${y.toFixed(2)}%` })
    }
    const t = setTimeout(measure, 60)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [visible])

  // Skip on Escape / Space / Enter
  useEffect(() => {
    if (!visible) return
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        setVisible(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible])

  // Auto-dismiss
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), rm ? DISMISS_RM : DISMISS_AT)
    return () => clearTimeout(t)
  }, [rm, visible])

  const handleExitComplete = () => {
    onComplete?.()
  }

  const irisOpen  = `circle(150% at ${target.x} ${target.y})`
  const irisClose = `circle(0% at ${target.x} ${target.y})`

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="intro-overlay"
          className={styles.overlay}
          initial={rm ? { opacity: 1 } : { clipPath: irisOpen, opacity: 1 }}
          animate={rm ? { opacity: 1 } : { clipPath: irisOpen, opacity: 1 }}
          exit={rm ? { opacity: 0 } : { clipPath: irisClose, opacity: 1 }}
          transition={
            rm
              ? { duration: 0.4, ease: 'easeOut' }
              : { duration: 1.1, ease: EASE_CALLIGRAPHIC }
          }
          style={{ WebkitClipPath: irisOpen }}
          onClick={() => setVisible(false)}
          role="presentation"
          aria-hidden="true"
        >
          {/* ── Backdrop: kake-jiku scroll vocabulary ─────────────────────
           * Four thin hairlines define the scroll: top + bottom rods,
           * and two soft vertical edges. Far more on-brand than a graph
           * grid — echoes the SectionLabel and hairline divider language
           * used throughout the site.
           */}
          <motion.svg
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={rm ? { opacity: 0 } : { opacity: 0.25 }}
            transition={rm
              ? { duration: 0.2 }
              : { duration: BACKDROP_DUR, ease: 'easeOut' }
            }
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            {/* Top + bottom horizontal hairlines (scroll rods) */}
            <line x1="14%"  y1="14%" x2="86%" y2="14%"
                  stroke="#f8f6f2" strokeOpacity="0.18" strokeWidth="0.5" />
            <line x1="14%"  y1="86%" x2="86%" y2="86%"
                  stroke="#f8f6f2" strokeOpacity="0.18" strokeWidth="0.5" />
            {/* Side verticals (scroll edges) */}
            <line x1="14%"  y1="14%" x2="14%" y2="86%"
                  stroke="#f8f6f2" strokeOpacity="0.10" strokeWidth="0.5" />
            <line x1="86%"  y1="14%" x2="86%" y2="86%"
                  stroke="#f8f6f2" strokeOpacity="0.10" strokeWidth="0.5" />
          </motion.svg>

          {/* ── Wordmark ──────────────────────────────────────────────── */}
          <motion.div
            className={styles.wordmarkWrap}
            initial={{ opacity: 1, scale: 1 }}
            exit={rm
              ? { opacity: 0 }
              // Ink dissolving into paper — no upward lift. The site
              // exits things by easing them down to nothing, not by
              // making them perform.
              : { opacity: 0, scale: 0.97 }
            }
            transition={rm
              ? { duration: 0.35 }
              : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
            }
          >
            <svg
              viewBox="0 0 396 170"
              className={styles.wordmark}
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: 'visible' }}
            >
              {/* Five dots — settle into place, no flying from edges.
                * Simple scale + fade — the same vocabulary used by the
                * site's own Logo component on every page load. */}
              {COLS.map((cx, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={cx}
                  cy={32}
                  r={3.2}
                  fill={i === 2 ? 'var(--color-mark)' : 'var(--color-paper)'}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={rm
                    ? { duration: 0 }
                    : {
                        duration: 0.55,
                        delay: i === 2 ? RED_DOT_DELAY : DOT_BASE_DELAY + i * DOT_STAGGER,
                        ease: [0.34, 1.4, 0.64, 1],
                      }
                  }
                />
              ))}

              {/* Red dot — single restrained pulse. Half the scale of
                * the old version; the brand's red mark is whispered, not
                * shouted. */}
              <motion.circle
                cx={COLS[2]}
                cy={32}
                r={3.2}
                fill="var(--color-mark)"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  pointerEvents: 'none',
                }}
                initial={{ opacity: 0, scale: 1 }}
                animate={rm
                  ? { opacity: 0 }
                  : {
                      opacity: [0, 0, 0.9, 0],
                      scale:   [1, 1, 2.0, 2.4],
                      filter:  [
                        'drop-shadow(0 0 0 transparent)',
                        'drop-shadow(0 0 0 transparent)',
                        'drop-shadow(0 0 5px var(--color-mark)) drop-shadow(0 0 14px rgba(212,43,43,0.4))',
                        'drop-shadow(0 0 8px var(--color-mark)) drop-shadow(0 0 22px rgba(212,43,43,0.2))',
                      ],
                    }
                }
                transition={rm
                  ? { duration: 0 }
                  : {
                      duration: 1.2,
                      delay: PULSE_DELAY,
                      times: [0, 0.15, 0.5, 1],
                      ease: 'easeOut',
                    }
                }
              />

              {/* FARYN — letters rise gently, matching the site's
                * fadeUp motion utility used everywhere else. */}
              {LETTERS.map((ch, i) => (
                <motion.text
                  key={`ltr-${i}`}
                  x={COLS[i]}
                  y={108}
                  textAnchor="middle"
                  fontFamily="var(--font-serif), 'EB Garamond', Garamond, 'Times New Roman', serif"
                  fontSize="56"
                  fontWeight="400"
                  fill="var(--color-paper)"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={rm
                    ? { duration: 0 }
                    : {
                        duration: 0.7,
                        delay: LETTER_BASE_DELAY + i * LETTER_STAGGER,
                        ease: EASE_OUT,
                      }
                  }
                >
                  {ch}
                </motion.text>
              ))}

              {/* Leading hairline before STUDIO — mirrors the site's
                * SectionLabel "before" variant (─── VISUAL STUDIO). */}
              <motion.line
                x1={COLS[0] - 2}
                y1={146}
                x2={COLS[0] + 14}
                y2={146}
                stroke="var(--color-paper)"
                strokeOpacity="0.45"
                strokeWidth="0.6"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.7, pathLength: 1 }}
                transition={rm
                  ? { duration: 0 }
                  : { duration: 0.5, delay: STUDIO_DELAY - 0.1, ease: 'easeOut' }
                }
              />

              {/* STUDIO — mono caps, faded, beneath the leading mark.
                * Indented to clear the hairline. */}
              <motion.text
                x={COLS[0] + 22}
                y={150}
                textAnchor="start"
                fontFamily="var(--font-mono), 'DM Mono', ui-monospace, monospace"
                fontSize="10.5"
                fontWeight="400"
                fill="var(--color-paper)"
                opacity={0.55}
                letterSpacing="3.6"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={rm
                  ? { duration: 0 }
                  : {
                      duration: 0.7,
                      delay: STUDIO_DELAY,
                      ease: EASE_OUT,
                    }
                }
              >
                STUDIO
              </motion.text>
            </svg>
          </motion.div>

          {/* Skip hint — matches the site's SectionLabel vocabulary */}
          <motion.span
            className={styles.skipHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: rm ? 0 : 0.45 }}
            transition={{ duration: 0.4, delay: rm ? 0 : 1.6 }}
            aria-hidden="true"
          >
            <span className={styles.skipTick} /> esc to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
