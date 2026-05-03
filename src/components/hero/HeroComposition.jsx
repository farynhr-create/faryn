import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import ConstructionGrid from '@/components/compositions/ConstructionGrid'
import ShadowedRect from '@/components/compositions/primitives/ShadowedRect'
import MeasurementTick from '@/components/compositions/primitives/MeasurementTick'
import CrossMark from '@/components/compositions/primitives/CrossMark'
import Dot from '@/components/compositions/primitives/Dot'

/* Construction line coordinates (SVG space) — must match the data used in HeroCanvas */
export const CONSTRUCTION_LINES = [
  { x1: 0,   y1: 70,  x2: 600, y2: 70,  baseOpacity: 0.09, id: 'h0' },
  { x1: 0,   y1: 200, x2: 600, y2: 200, baseOpacity: 0.08, id: 'h1' },
  { x1: 0,   y1: 330, x2: 600, y2: 330, baseOpacity: 0.11, id: 'h2' },
  { x1: 0,   y1: 490, x2: 600, y2: 490, baseOpacity: 0.09, id: 'h3' },
  { x1: 0,   y1: 620, x2: 600, y2: 620, baseOpacity: 0.08, id: 'h4' },
  { x1: 90,  y1: 0,   x2: 90,  y2: 700, baseOpacity: 0.10, id: 'v0' },
  { x1: 250, y1: 0,   x2: 250, y2: 700, baseOpacity: 0.08, id: 'v1' },
  { x1: 390, y1: 0,   x2: 390, y2: 700, baseOpacity: 0.09, id: 'v2' },
  { x1: 530, y1: 0,   x2: 530, y2: 700, baseOpacity: 0.08, id: 'v3' },
  { x1: 0,   y1: 100, x2: 600, y2: 600, baseOpacity: 0.07, id: 'd0' },
  { x1: 600, y1: 80,  x2: 0,   y2: 500, baseOpacity: 0.06, id: 'd1' },
]

export const SCATTERED_DOTS = [
  { cx: 150, cy: 290, baseR: 2.5, id: 'dot0' },
  { cx: 230, cy: 395, baseR: 2.0, id: 'dot1' },
  { cx: 300, cy: 150, baseR: 2.5, id: 'dot2' },
  { cx: 420, cy: 340, baseR: 2.0, id: 'dot3' },
  { cx: 460, cy: 440, baseR: 2.5, id: 'dot4' },
  { cx: 170, cy: 490, baseR: 2.0, id: 'dot5' },
  { cx: 530, cy: 290, baseR: 2.0, id: 'dot6' },
  { cx: 340, cy: 560, baseR: 2.5, id: 'dot7' },
]

/* Base position of the red circle (SVG space) */
export const RED_CIRCLE_BASE = { cx: 468, cy: 162, r: 44 }

const HeroComposition = forwardRef(function HeroComposition({ circleSpringX, circleSpringY }, svgRef) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 700"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      style={{ width: '100%', height: '100%', display: 'block' }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Construction grid — data-ids used by HeroCanvas for direct DOM updates */}
      <g fill="none" stroke="var(--color-ink)" strokeWidth="0.5">
        {CONSTRUCTION_LINES.map(l => (
          <line
            key={l.id}
            data-line-id={l.id}
            x1={l.x1} y1={l.y1}
            x2={l.x2} y2={l.y2}
            opacity={l.baseOpacity}
          />
        ))}
      </g>

      {/* Main composition */}
      <ShadowedRect x={110} y={165} width={280} height={360} />

      {/* Inner rect */}
      <rect x={155} y={215} width={190} height={260} fill="none" stroke="var(--color-ink)" strokeWidth="0.5" />

      {/* Arc — from top-right of main rect curving to bottom */}
      <path
        d="M 390,165 Q 490,345 390,525"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="0.6"
        opacity="0.18"
      />

      {/* Measurement ticks at main rect corners */}
      <MeasurementTick x={110} y={165} corner="tl" />
      <MeasurementTick x={390} y={165} corner="tr" />
      <MeasurementTick x={110} y={525} corner="bl" />
      <MeasurementTick x={390} y={525} corner="br" />

      {/* Cross marks */}
      <CrossMark cx={540} cy={90} />
      <CrossMark cx={60}  cy={610} />

      {/* Scattered dots — data-ids used by HeroCanvas */}
      {SCATTERED_DOTS.map(d => (
        <circle
          key={d.id}
          data-dot-id={d.id}
          cx={d.cx} cy={d.cy}
          r={d.baseR}
          fill="var(--color-ink)"
          opacity="0.28"
        />
      ))}

      {/* Red circle — Framer Motion spring drift */}
      <motion.circle
        cx={RED_CIRCLE_BASE.cx}
        cy={RED_CIRCLE_BASE.cy}
        r={RED_CIRCLE_BASE.r}
        fill="var(--color-mark)"
        opacity="0.87"
        stroke="var(--color-ink)"
        strokeWidth="0.5"
        strokeOpacity="0.2"
        style={{ x: circleSpringX, y: circleSpringY }}
      />

      {/* Red circle halo */}
      <motion.circle
        cx={RED_CIRCLE_BASE.cx}
        cy={RED_CIRCLE_BASE.cy}
        r={RED_CIRCLE_BASE.r * 1.45}
        fill="var(--color-mark)"
        opacity="0.1"
        style={{ x: circleSpringX, y: circleSpringY }}
      />

      {/* Corner metadata */}
      <text
        x="578" y="682"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        fill="var(--color-ink)"
        opacity="0.35"
        textAnchor="end"
      >
        &#169;2025 — NL — 001
      </text>
    </svg>
  )
})

export default HeroComposition
