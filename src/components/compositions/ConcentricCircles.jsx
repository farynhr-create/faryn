import RedCircle from './primitives/RedCircle'
import Dot from './primitives/Dot'
import CrossMark from './primitives/CrossMark'
import MeasurementTick from './primitives/MeasurementTick'

export default function ConcentricCircles({ width = 500, height = 500 }) {
  const cx = width / 2
  const cy = height / 2

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Construction lines */}
      <g stroke="var(--color-ink)" strokeWidth="0.5" fill="none">
        <line x1="0" y1={cy} x2={width} y2={cy} opacity="0.08" />
        <line x1={cx} y1="0" x2={cx} y2={height} opacity="0.08" />
        <line x1="0"    y1="0"      x2={width}  y2={height}    opacity="0.05" />
        <line x1={width} y1="0"     x2="0"      y2={height}    opacity="0.05" />
      </g>

      {/* Outer circle r=175 */}
      <circle cx={cx} cy={cy} r="175" fill="none" stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.14" />

      {/* Mid circle r=125 */}
      <circle cx={cx} cy={cy} r="125" fill="none" stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.18" />

      {/* Inner circle r=75 */}
      <circle cx={cx} cy={cy} r="75" fill="none" stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.20" />

      {/* Inner square frame */}
      <rect
        x={cx - 40} y={cy - 40}
        width={80} height={80}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="0.5"
        opacity="0.22"
      />

      {/* Center dot */}
      <Dot cx={cx} cy={cy} r={2} opacity={0.35} />

      {/* "FARYN" inside inner circle — drafted working notes */}
      <text
        x={cx} y={cy + 18}
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="var(--color-ink)"
        opacity="0.18"
        textAnchor="middle"
        letterSpacing="0.3em"
      >
        FARYN
      </text>

      {/* Red circle — upper right of concentric center */}
      <RedCircle cx={cx + 88} cy={cy - 88} r={18} halo />

      {/* Intersection dots along circles */}
      <Dot cx={cx}       cy={cy - 175} r={2}   opacity={0.22} />
      <Dot cx={cx + 175} cy={cy}       r={2}   opacity={0.22} />
      <Dot cx={cx}       cy={cy + 175} r={2}   opacity={0.22} />
      <Dot cx={cx - 175} cy={cy}       r={2}   opacity={0.22} />

      {/* Ticks at inner square corners */}
      <MeasurementTick x={cx - 40} y={cy - 40} corner="tl" size={6} opacity={0.28} />
      <MeasurementTick x={cx + 40} y={cy - 40} corner="tr" size={6} opacity={0.28} />
      <MeasurementTick x={cx - 40} y={cy + 40} corner="bl" size={6} opacity={0.28} />
      <MeasurementTick x={cx + 40} y={cy + 40} corner="br" size={6} opacity={0.28} />

      {/* Cross marks */}
      <CrossMark cx={30}        cy={30}        size={5} opacity={0.30} />
      <CrossMark cx={width - 30} cy={height - 30} size={5} opacity={0.30} />

      {/* Label notes */}
      <text x="12"  y="12"             fontFamily="var(--font-mono)" fontSize="6" fill="var(--color-ink)" opacity="0.22">r=175</text>
      <text x={cx + 128} y={cy - 6}   fontFamily="var(--font-mono)" fontSize="6" fill="var(--color-ink)" opacity="0.22">r=125</text>
      <text x="12"  y={height - 12}    fontFamily="var(--font-mono)" fontSize="6" fill="var(--color-ink)" opacity="0.22">STUDY — AMS</text>
    </svg>
  )
}
