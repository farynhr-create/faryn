import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './ZenLeaves.module.css'

/* Zen bamboo — minimal sumi-e composition behind the hero headline.
 *
 * Three small clusters of bamboo blades attached to thin curved stems.
 * Each blade is a proper bamboo shape: wider near the stem, tapering
 * to a sharp brush-tip. An ink gradient runs along each blade so the
 * stroke reads as "wet at the base, drying toward the tip" — the
 * signature of a real sumi-e brushstroke.
 *
 * Opacity stays low so the headline always reads first; the bamboo
 * is atmosphere, not focal.
 */

const VB_W = 1000
const VB_H = 600

// A proper bamboo blade — rounded base, sharp tip. Drawn in a single
// brushstroke direction from base (left) to tip (right).
//   - x=0:    base, ~3 units wide on each side of the spine
//   - x=40:   peak width (the bulge near the base)
//   - x=170:  sharp tip
const BLADE = `
  M 0 -2.5
  C 6 -7, 30 -11, 60 -9
  C 100 -6, 140 -3, 168 -0.8
  L 174 0
  L 168 0.8
  C 140 3, 100 6, 60 9
  C 30 11, 6 7, 0 2.5
  Z
`.replace(/\s+/g, ' ').trim()

/**
 * A cluster: a curved stem from `stemFrom` to `stemTo`, plus blades
 * attached at specified positions along the stem with given angles.
 */
function Cluster({ id, stemD, blades, delay, rm }) {
  return (
    <g>
      {/* Stem — thin beige sumi-e brushstroke, draws itself in */}
      <motion.path
        d={stemD}
        fill="none"
        stroke="#a89a7c"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.55"
        initial={rm ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={rm
          ? { duration: 0 }
          : { duration: 1.0, delay, ease: [0.4, 0, 0.2, 1] }
        }
      />
      {blades.map((b, i) => (
        <motion.path
          key={`${id}-b${i}`}
          d={BLADE}
          fill={`url(#bladeInk-${b.tone || 'mid'})`}
          style={{
            transformBox: 'fill-box',
            transformOrigin: '0 0',
          }}
          initial={rm ? { opacity: b.opacity } : { opacity: 0 }}
          animate={{ opacity: b.opacity, scale: b.scale }}
          transform={`translate(${b.x} ${b.y}) rotate(${b.angle})`}
          transition={rm
            ? { duration: 0 }
            : {
                duration: 0.85,
                delay: delay + 0.35 + i * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }
          }
        />
      ))}
    </g>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Composition — three clusters with their own stems and blade fans.
// ─────────────────────────────────────────────────────────────────────

// Upper-right cluster — drapes down from above the headline.
// One autumn blade scattered in for the season-turning feel.
const UPPER = {
  id: 'upper',
  stemD: 'M 980 60 C 920 110, 880 160, 850 230',
  delay: 0.30,
  blades: [
    { x: 855, y: 138, angle: 155, scale: 1.00, opacity: 0.20, tone: 'mid' },
    { x: 880, y: 110, angle: 195, scale: 0.85, opacity: 0.22, tone: 'autumn' },
    { x: 870, y: 175, angle: 130, scale: 0.95, opacity: 0.22, tone: 'mid' },
    { x: 845, y: 215, angle: 170, scale: 0.78, opacity: 0.17, tone: 'soft' },
  ],
}

// Mid-right cluster — smaller fan further down
const MID = {
  id: 'mid',
  stemD: 'M 970 340 C 940 360, 920 390, 910 430',
  delay: 0.95,
  blades: [
    { x: 920, y: 380, angle: 210, scale: 0.75, opacity: 0.17, tone: 'mid' },
    { x: 935, y: 350, angle: 175, scale: 0.65, opacity: 0.14, tone: 'soft' },
    { x: 915, y: 420, angle: 155, scale: 0.70, opacity: 0.15, tone: 'soft' },
  ],
}

// Lower-left cluster — small sprig under the CTA area
// Middle blade turning autumn — anchors the warmth toward the page bottom.
const LOWER = {
  id: 'lower',
  stemD: 'M 30 540 C 80 520, 130 510, 180 510',
  delay: 1.35,
  blades: [
    { x: 70,  y: 528, angle:  -8, scale: 0.78, opacity: 0.18, tone: 'mid' },
    { x: 110, y: 515, angle:  18, scale: 0.85, opacity: 0.22, tone: 'autumn' },
    { x: 150, y: 508, angle:  -4, scale: 0.65, opacity: 0.14, tone: 'soft' },
  ],
}

// A pair of drifting blades for ma — one fallen autumn leaf at rest.
const FLOATERS = [
  { x: 520, y: 565, angle:  175, scale: 0.55, opacity: 0.16, delay: 1.85, tone: 'autumn' },
  { x: 580, y: 50,  angle:  -10, scale: 0.42, opacity: 0.09, delay: 2.00, tone: 'soft' },
]

export default function ZenLeaves() {
  const rm = useReducedMotion()

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={styles.svg}
    >
      {/* Sumi-e brush gradients — warm beige ink wash on cream paper,
        * with a few autumn rust blades scattered through for the season-
        * turning feel. Each gradient runs wet-at-base, drying-at-tip. */}
      <defs>
        <linearGradient id="bladeInk-mid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#9a8a6c" stopOpacity="0.85" />
          <stop offset="55%"  stopColor="#a89a7c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#bdb094" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="bladeInk-soft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#b3a482" stopOpacity="0.65" />
          <stop offset="60%"  stopColor="#c1b394" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d2c6aa" stopOpacity="0.25" />
        </linearGradient>
        {/* Autumn — burnt rust, deeper saturation at the base where the
          * leaf still holds colour, fading to amber at the dry tip. */}
        <linearGradient id="bladeInk-autumn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#a85a2e" stopOpacity="0.82" />
          <stop offset="55%"  stopColor="#bf7440" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#d39860" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <Cluster {...UPPER} rm={rm} />
      <Cluster {...MID}   rm={rm} />
      <Cluster {...LOWER} rm={rm} />

      {FLOATERS.map((f, i) => (
        <motion.path
          key={`f-${i}`}
          d={BLADE}
          fill={`url(#bladeInk-${f.tone || 'soft'})`}
          style={{
            transformBox: 'fill-box',
            transformOrigin: '0 0',
          }}
          initial={rm ? { opacity: f.opacity } : { opacity: 0 }}
          animate={{ opacity: f.opacity, scale: f.scale }}
          transform={`translate(${f.x} ${f.y}) rotate(${f.angle})`}
          transition={rm
            ? { duration: 0 }
            : {
                duration: 1.0,
                delay: f.delay,
                ease: [0.2, 0.8, 0.2, 1],
              }
          }
        />
      ))}
    </svg>
  )
}
