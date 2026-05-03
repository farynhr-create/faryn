import Dot from './primitives/Dot'
import CrossMark from './primitives/CrossMark'
import MeasurementTick from './primitives/MeasurementTick'

export default function TypographicBlock({ width = 600, height = 800 }) {
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
        <line x1="0"   y1="160" x2={width} y2="160" opacity="0.09" />
        <line x1="0"   y1="280" x2={width} y2="280" opacity="0.08" />
        <line x1="0"   y1="460" x2={width} y2="460" opacity="0.10" />
        <line x1="0"   y1="640" x2={width} y2="640" opacity="0.08" />
        <line x1="80"  y1="0"   x2="80"    y2={height} opacity="0.09" />
        <line x1="520" y1="0"   x2="520"   y2={height} opacity="0.08" />
        <line x1="0"   y1="0"   x2={width}  y2={height} opacity="0.05" />
      </g>

      {/* Baseline grid — evoking typesetting */}
      <g stroke="var(--color-ink)" strokeWidth="0.4" opacity="0.06">
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1="80" y1={160 + i * 36} x2="520" y2={160 + i * 36} />
        ))}
      </g>

      {/* Typographic column frame */}
      <rect x={80} y={160} width={440} height={480} fill="none" stroke="var(--color-ink)" strokeWidth="0.5" />
      <rect x={80} y={160} width={440} height={40}  fill="var(--color-ink)" opacity="0.04" />

      {/* Headline placeholder bars */}
      <g fill="var(--color-ink)">
        <rect x={100} y={180} width={300} height={8} opacity="0.15" />
        <rect x={100} y={215} width={200} height={5} opacity="0.10" />
        <rect x={100} y={228} width={250} height={5} opacity="0.10" />
      </g>

      {/* Body text placeholder lines */}
      <g stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="square" opacity="0.07">
        {[270, 284, 298, 312, 326, 354, 368, 382, 396, 410, 438, 452, 466, 480].map(y => (
          <line key={y} x1="100" y1={y} x2={y % 56 === 0 ? 420 : 500} y2={y} />
        ))}
      </g>

      {/* Measurement ticks */}
      <MeasurementTick x={80}  y={160} corner="tl" />
      <MeasurementTick x={520} y={160} corner="tr" />
      <MeasurementTick x={80}  y={640} corner="bl" />
      <MeasurementTick x={520} y={640} corner="br" />

      {/* Cross marks */}
      <CrossMark cx={560} cy={100} opacity={0.35} />
      <CrossMark cx={40}  cy={700} opacity={0.35} />

      {/* Dots */}
      <Dot cx={80}  cy={160} r={2}   opacity={0.30} />
      <Dot cx={520} cy={160} r={2}   opacity={0.30} />
      <Dot cx={80}  cy={640} r={2}   opacity={0.30} />
      <Dot cx={520} cy={640} r={2}   opacity={0.30} />
      <Dot cx={300} cy={750} r={1.5} opacity={0.20} />

      {/* Label */}
      <text x="80"  y="145"          fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.28">TYPE — 10/14pt</text>
      <text x="520" y={height - 20}  fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.22" textAnchor="end">VOICE 02</text>
    </svg>
  )
}
