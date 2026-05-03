import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styles from './HeroComposition.module.css'

/* Right-column vertical-rail composition.
 *
 * Conceived as a Japanese haiku in spatial form:
 *  - One vertical hairline (the tatami edge)
 *  - Four small dots evenly stacked on the line — each is a wayfinder
 *  - A single small red mark (hanko / seal) sits beside the rail and
 *    glides to the hovered anchor with a spring — the "you-are-aiming-at"
 *    indicator
 */

const VB_W = 320
const VB_H = 720
const RAIL_X = 84
const RAIL_TOP = 90
const RAIL_BOTTOM = 630

const NAV = [
  { id: 'work',     y: 165, num: '01', label: 'Portfolio' },
  { id: 'services', y: 295, num: '02', label: 'Services' },
  { id: 'about',    y: 425, num: '03', label: 'About' },
  { id: 'contact',  y: 555, num: '04', label: 'Contact' },
]

/* Hanko — small red seal, off the rail to the right.
 * Resting position is the visual centre of the rail. */
const HANKO_REST_Y = (RAIL_TOP + RAIL_BOTTOM) / 2 // 360
const HANKO_X = 218
const HANKO_R = 13
const TICK_FROM_X = RAIL_X
const TICK_TO_X = HANKO_X - HANKO_R - 6

function smoothScrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HeroComposition() {
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

  /* Where the hanko should sit right now */
  const targetY =
    hovered != null
      ? NAV.find((n) => n.id === hovered)?.y ?? HANKO_REST_Y
      : HANKO_REST_Y

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="navigation"
      aria-label="Page sections"
      preserveAspectRatio="xMidYMid meet"
      className={styles.svg}
    >
      {/* Vertical rail — the tatami edge */}
      <line
        x1={RAIL_X}
        y1={RAIL_TOP}
        x2={RAIL_X}
        y2={RAIL_BOTTOM}
        stroke="var(--color-ink)"
        strokeWidth="0.5"
        opacity="0.5"
      />

      {/* Four nav anchors, stacked on the rail (rendered first so the
          moving hanko sits visually on top) */}
      {NAV.map((d) => {
        const isHover = hovered === d.id
        const isDimmed = hovered !== null && !isHover
        return (
          <g
            key={d.id}
            className={`${styles.anchor} ${isHover ? styles.anchorHover : ''} ${isDimmed ? styles.anchorDimmed : ''}`}
            role="link"
            tabIndex={0}
            aria-label={`${d.num} — Go to ${d.label} section`}
            onClick={() => onActivate(d.id)}
            onKeyDown={(e) => onKeyDown(e, d.id)}
            onMouseEnter={() => setHovered(d.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(d.id)}
            onBlur={() => setHovered(null)}
          >
            {/* Generous invisible hit target */}
            <rect
              x={RAIL_X - 30}
              y={d.y - 22}
              width={260}
              height={44}
              fill="transparent"
              className={styles.hitTarget}
            />

            {/* The dot, pinned to the rail */}
            <circle
              className={styles.dot}
              cx={RAIL_X}
              cy={d.y}
              r={3.2}
              fill="var(--color-ink)"
            />

            {/* Number — small mono caps */}
            <text
              className={styles.numLabel}
              x={RAIL_X + 22}
              y={d.y}
              dy="0.36em"
              fontFamily="var(--font-mono)"
              fontSize="8"
              fill="var(--color-ink)"
            >
              {d.num}
            </text>

            {/* Section name — serif italic */}
            <text
              className={styles.nameLabel}
              x={RAIL_X + 56}
              y={d.y}
              dy="0.32em"
              fontFamily="var(--font-serif)"
              fontStyle="italic"
              fontSize="17"
              fill="var(--color-ink)"
            >
              {d.label}
            </text>
          </g>
        )
      })}

      {/* Moving hanko + tick — slides to the hovered anchor */}
      <motion.g
        initial={false}
        animate={{ y: targetY - HANKO_REST_Y }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.6 }}
        style={{ pointerEvents: 'none' }}
      >
        {/* Tick from rail to hanko */}
        <line
          x1={TICK_FROM_X}
          y1={HANKO_REST_Y}
          x2={TICK_TO_X}
          y2={HANKO_REST_Y}
          stroke="var(--color-ink)"
          strokeWidth="0.5"
          opacity={hovered ? 0.7 : 0.35}
          style={{ transition: 'opacity 0.3s ease' }}
        />

        {/* Hanko itself — gets a brief bloom when it lands */}
        <motion.circle
          cx={HANKO_X}
          cy={HANKO_REST_Y}
          fill="var(--color-mark)"
          initial={false}
          animate={{ r: hovered ? HANKO_R + 2 : HANKO_R }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        />

        {/* Soft glow halo on hover */}
        <motion.circle
          cx={HANKO_X}
          cy={HANKO_REST_Y}
          fill="var(--color-mark)"
          initial={false}
          animate={{ r: hovered ? HANKO_R * 2 : HANKO_R, opacity: hovered ? 0.18 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </motion.g>
    </svg>
  )
}
