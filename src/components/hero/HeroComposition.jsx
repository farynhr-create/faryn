import { forwardRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styles from './HeroComposition.module.css'

/* Square viewBox — composition reads as a single centred mark */
const VB = 600
const C = VB / 2 // 300, the center

/* Two construction lines — horizontal & vertical axes through center */
export const CONSTRUCTION_LINES = [
  { x1: 0, y1: C, x2: VB, y2: C, baseOpacity: 0.18, id: 'h0' },
  { x1: C, y1: 0, x2: C, y2: VB, baseOpacity: 0.18, id: 'v0' },
]

/* Four dots — wayfinders to home-page sections.
 * Brought inward from the corners so they orbit the central red mark.
 * Order: clockwise from top-left = Work / Services / About / Contact. */
const DOT_OFFSET = 170 // distance from center to each dot

export const SCATTERED_DOTS = [
  {
    id: 'dot0',
    cx: C - DOT_OFFSET, cy: C - DOT_OFFSET, baseR: 3.4,
    target: 'work', num: '01', label: 'Work',
    leader: { x: C - DOT_OFFSET, y: C - DOT_OFFSET - 38 },
    text:   { x: C - DOT_OFFSET, y: C - DOT_OFFSET - 50, anchor: 'middle' },
    align:  'top',
  },
  {
    id: 'dot1',
    cx: C + DOT_OFFSET, cy: C - DOT_OFFSET, baseR: 3.4,
    target: 'services', num: '02', label: 'Services',
    leader: { x: C + DOT_OFFSET, y: C - DOT_OFFSET - 38 },
    text:   { x: C + DOT_OFFSET, y: C - DOT_OFFSET - 50, anchor: 'middle' },
    align:  'top',
  },
  {
    id: 'dot2',
    cx: C + DOT_OFFSET, cy: C + DOT_OFFSET, baseR: 3.4,
    target: 'about', num: '03', label: 'About',
    leader: { x: C + DOT_OFFSET, y: C + DOT_OFFSET + 38 },
    text:   { x: C + DOT_OFFSET, y: C + DOT_OFFSET + 50, anchor: 'middle' },
    align:  'bottom',
  },
  {
    id: 'dot3',
    cx: C - DOT_OFFSET, cy: C + DOT_OFFSET, baseR: 3.4,
    target: 'contact', num: '04', label: 'Contact',
    leader: { x: C - DOT_OFFSET, y: C + DOT_OFFSET + 38 },
    text:   { x: C - DOT_OFFSET, y: C + DOT_OFFSET + 50, anchor: 'middle' },
    align:  'bottom',
  },
]

/* The central red mark — non-interactive, the studio's hanko */
export const RED_CIRCLE_BASE = { cx: C, cy: C, r: 44 }

function smoothScrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const HeroComposition = forwardRef(function HeroComposition(
  { circleSpringX, circleSpringY },
  svgRef,
) {
  const [hovered, setHovered] = useState(null)

  const onActivate = useCallback((target) => {
    smoothScrollTo(target)
    if (history.pushState) {
      history.pushState(null, '', `#${target}`)
    }
  }, [])

  const onKeyDown = useCallback(
    (e, target) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onActivate(target)
      }
    },
    [onActivate],
  )

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB} ${VB}`}
      xmlns="http://www.w3.org/2000/svg"
      role="navigation"
      aria-label="Page sections"
      style={{ width: '100%', height: '100%', display: 'block' }}
      preserveAspectRatio="xMidYMid meet"
      className={styles.svg}
    >
      {/* Axis lines */}
      <g fill="none" stroke="var(--color-ink)" strokeWidth="0.5">
        {CONSTRUCTION_LINES.map((l) => (
          <line
            key={l.id}
            data-line-id={l.id}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            opacity={l.baseOpacity}
          />
        ))}
      </g>

      {/* Four nav anchors */}
      {SCATTERED_DOTS.map((d) => {
        const isHover = hovered === d.id
        const isDimmed = hovered !== null && !isHover
        return (
          <g
            key={d.id}
            className={`${styles.anchor} ${isHover ? styles.anchorHover : ''} ${isDimmed ? styles.anchorDimmed : ''}`}
            role="link"
            tabIndex={0}
            aria-label={`${d.num} — Go to ${d.label} section`}
            onClick={() => onActivate(d.target)}
            onKeyDown={(e) => onKeyDown(e, d.target)}
            onMouseEnter={() => setHovered(d.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(d.id)}
            onBlur={() => setHovered(null)}
          >
            {/* Generous invisible hit target */}
            <circle
              cx={d.cx}
              cy={d.cy}
              r={32}
              fill="transparent"
              className={styles.hitTarget}
            />

            {/* Leader hairline from dot to label */}
            <line
              className={styles.leader}
              x1={d.cx}
              y1={d.cy}
              x2={d.leader.x}
              y2={d.leader.y}
              stroke="var(--color-ink)"
              strokeWidth="0.5"
            />

            {/* Number — small mono */}
            <text
              className={styles.numLabel}
              x={d.text.x}
              y={d.text.y}
              textAnchor={d.text.anchor}
              dy={d.align === 'bottom' ? '0.7em' : '-0.4em'}
              fontFamily="var(--font-mono)"
              fontSize="7"
              fill="var(--color-ink)"
            >
              {d.num}
            </text>

            {/* Section name — serif italic */}
            <text
              className={styles.nameLabel}
              x={d.text.x}
              y={d.text.y}
              textAnchor={d.text.anchor}
              dy={d.align === 'bottom' ? '2em' : '-1.7em'}
              fontFamily="var(--font-serif)"
              fontStyle="italic"
              fontSize="15"
              fill="var(--color-ink)"
            >
              {d.label}
            </text>

            {/* The dot */}
            <circle
              data-dot-id={d.id}
              className={styles.dot}
              cx={d.cx}
              cy={d.cy}
              r={d.baseR}
              fill="var(--color-ink)"
            />
          </g>
        )
      })}

      {/* Central red mark — drifts on cursor, non-interactive */}
      <motion.circle
        cx={RED_CIRCLE_BASE.cx}
        cy={RED_CIRCLE_BASE.cy}
        r={RED_CIRCLE_BASE.r}
        fill="var(--color-mark)"
        style={{ x: circleSpringX, y: circleSpringY }}
        aria-hidden="true"
      />
    </svg>
  )
})

export default HeroComposition
