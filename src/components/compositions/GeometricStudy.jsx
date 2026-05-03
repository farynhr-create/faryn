import ShadowedRect from './primitives/ShadowedRect'
import Dot from './primitives/Dot'
import CrossMark from './primitives/CrossMark'
import MeasurementTick from './primitives/MeasurementTick'

export default function GeometricStudy({ width = 600, height = 800 }) {
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
        <line x1="0"   y1="130" x2={width} y2="130" opacity="0.09" />
        <line x1="0"   y1="310" x2={width} y2="310" opacity="0.08" />
        <line x1="0"   y1="540" x2={width} y2="540" opacity="0.10" />
        <line x1="0"   y1="700" x2={width} y2="700" opacity="0.08" />
        <line x1="100" y1="0"   x2="100"   y2={height} opacity="0.09" />
        <line x1="300" y1="0"   x2="300"   y2={height} opacity="0.08" />
        <line x1="500" y1="0"   x2="500"   y2={height} opacity="0.09" />
        <line x1="0"   y1="80"  x2={width}  y2={height - 80} opacity="0.06" />
      </g>

      {/* Main geometric study */}
      <ShadowedRect x={80} y={150} width={300} height={400} />

      {/* Inner rect */}
      <rect x={130} y={210} width={200} height={280} fill="none" stroke="var(--color-ink)" strokeWidth="0.5" />

      {/* Diagonal cross inside inner rect */}
      <g stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.12" fill="none">
        <line x1="130" y1="210" x2="330" y2="490" />
        <line x1="330" y1="210" x2="130" y2="490" />
      </g>

      {/* Ticks at main rect corners */}
      <MeasurementTick x={80}  y={150} corner="tl" />
      <MeasurementTick x={380} y={150} corner="tr" />
      <MeasurementTick x={80}  y={550} corner="bl" />
      <MeasurementTick x={380} y={550} corner="br" />

      {/* Cross marks */}
      <CrossMark cx={520} cy={120} />
      <CrossMark cx={60}  cy={660} />

      {/* Scattered dots */}
      <Dot cx={440} cy={200} r={2.5} opacity={0.28} />
      <Dot cx={500} cy={380} r={2}   opacity={0.22} />
      <Dot cx={440} cy={600} r={2.5} opacity={0.25} />
      <Dot cx={60}  cy={310} r={2}   opacity={0.20} />
      <Dot cx={510} cy={540} r={1.5} opacity={0.18} />

      {/* Label notes */}
      <text x="390" y="145"  fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.25">210 × 270</text>
      <text x="390" y="560"  fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.20">r = 0</text>
      <text x="60"  y={height - 20} fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.30">STUDY 01</text>
    </svg>
  )
}
