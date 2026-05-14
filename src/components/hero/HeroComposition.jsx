import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styles from './HeroComposition.module.css'

/* Right-column vertical-rail composition — refined edition.
 *
 * Conceived as a Japanese haiku in spatial form:
 *  - A vertical hairline (the tatami edge), capped top + bottom with tick marks
 *  - Four anchors stacked on the line — number + serif name, generous in scale
 *  - A red hanko (seal) glides to the hovered anchor, slim leader tick connects it
 *  - Top "INDEX" and bottom signature frame the rail like a scroll
 */

const VB_W = 400
const VB_H = 760
const RAIL_X = 96
const RAIL_TOP = 110
const RAIL_BOTTOM = 660

const NAV = [
  { id: 'work',     y: 195, num: '01', label: 'Portfolio' },
  { id: 'services', y: 325, num: '02', label: 'Services' },
  { id: 'about',    y: 455, num: '03', label: 'About' },
  { id: 'contact',  y: 585, num: '04', label: 'Contact' },
]

const HANKO_REST_Y = (RAIL_TOP + RAIL_BOTTOM) / 2
const HANKO_X = 282
const HANKO_R = 18
const TICK_FROM_X = RAIL_X
const TICK_TO_X = HANKO_X - HANKO_R - 8

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
      {/* Top tick cap — kake-jiku scroll mark */}
      <line
        x1={RAIL_X - 14}
        y1={RAIL_TOP}
        x2={RAIL_X + 14}
        y2={RAIL_TOP}
        stroke="var(--color-ink)"
        strokeWidth="0.5"
        opacity="0.55"
      />

      {/* "INDEX" — mono caps framing the top of the rail */}
      <text
        x={RAIL_X + 26}
        y={RAIL_TOP}
        dy="0.34em"
        className={styles.frameLabel}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-ink)"
      >
        INDEX
      </text>

      {/* Vertical rail */}
      <line
        x1={RAIL_X}
        y1={RAIL_TOP}
        x2={RAIL_X}
        y2={RAIL_BOTTOM}
        stroke="var(--color-ink)"
        strokeWidth="0.6"
        opacity="0.5"
      />

      {/* Bottom tick cap */}
      <line
        x1={RAIL_X - 14}
        y1={RAIL_BOTTOM}
        x2={RAIL_X + 14}
        y2={RAIL_BOTTOM}
        stroke="var(--color-ink)"
        strokeWidth="0.5"
        opacity="0.55"
      />

      {/* Signature at the foot of the rail */}
      <text
        x={RAIL_X + 26}
        y={RAIL_BOTTOM}
        dy="0.34em"
        className={styles.frameLabel}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-ink)"
      >
        FARYN — MMXXVI
      </text>

      {/* Four nav anchors */}
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
              x={RAIL_X - 36}
              y={d.y - 30}
              width={340}
              height={60}
              fill="transparent"
              className={styles.hitTarget}
            />

            {/* Outer ring — fades in on hover */}
            <circle
              className={styles.dotRing}
              cx={RAIL_X}
              cy={d.y}
              r={11}
              fill="none"
              stroke="var(--color-mark)"
              strokeWidth="0.6"
            />

            {/* The dot, pinned to the rail */}
            <circle
              className={styles.dot}
              cx={RAIL_X}
              cy={d.y}
              r={4.8}
              fill="var(--color-ink)"
            />

            {/* Number — mono caps */}
            <text
              className={styles.numLabel}
              x={RAIL_X + 30}
              y={d.y}
              dy="0.34em"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--color-ink)"
            >
              {d.num}
            </text>

            {/* Section name — serif italic */}
            <text
              className={styles.nameLabel}
              x={RAIL_X + 72}
              y={d.y}
              dy="0.32em"
              fontFamily="var(--font-serif)"
              fontStyle="italic"
              fontSize="26"
              fill="var(--color-ink)"
            >
              {d.label}
            </text>
          </g>
        )
      })}

      {/* Moving hanko + tick */}
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

        {/* Soft glow halo */}
        <motion.circle
          cx={HANKO_X}
          cy={HANKO_REST_Y}
          fill="var(--color-mark)"
          initial={false}
          animate={{
            r: hovered ? HANKO_R * 2.4 : HANKO_R * 1.6,
            opacity: hovered ? 0.16 : 0.04,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />

        {/* Hanko itself */}
        <motion.circle
          cx={HANKO_X}
          cy={HANKO_REST_Y}
          fill="var(--color-mark)"
          initial={false}
          animate={{ r: hovered ? HANKO_R + 3 : HANKO_R }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        />

        {/* Inner specular — gives the seal a hand-pressed quality */}
        <circle
          cx={HANKO_X - 5}
          cy={HANKO_REST_Y - 5}
          r={2}
          fill="rgba(255,255,255,0.18)"
        />
      </motion.g>
    </svg>
  )
}
