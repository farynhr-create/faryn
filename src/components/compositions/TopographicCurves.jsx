import Dot from './primitives/Dot'
import CrossMark from './primitives/CrossMark'

export default function TopographicCurves({ width = 600, height = 800 }) {
  /* Concentric oval paths suggesting topographic contour lines */
  const curves = [
    { d: 'M 300,700 C 500,680 560,560 540,400 C 520,240 460,140 300,120 C 140,140 80,240 60,400 C 40,560 100,680 300,700 Z', op: 0.12 },
    { d: 'M 300,650 C 470,632 520,530 502,390 C 484,250 432,162 300,148 C 168,162 116,250 98,390 C 80,530 130,632 300,650 Z', op: 0.13 },
    { d: 'M 300,600 C 440,584 484,498 468,378 C 452,258 406,184 300,174 C 194,184 148,258 132,378 C 116,498 160,584 300,600 Z', op: 0.14 },
    { d: 'M 300,548 C 410,534 448,466 434,366 C 420,266 380,206 300,200 C 220,206 180,266 166,366 C 152,466 190,534 300,548 Z', op: 0.15 },
    { d: 'M 300,496 C 378,484 410,432 398,354 C 386,276 354,228 300,226 C 246,228 214,276 202,354 C 190,432 222,484 300,496 Z', op: 0.16 },
    { d: 'M 300,440 C 346,430 366,394 358,338 C 350,282 326,250 300,250 C 274,250 250,282 242,338 C 234,394 254,430 300,440 Z', op: 0.17 },
  ]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Faint construction grid */}
      <g stroke="var(--color-ink)" strokeWidth="0.5" fill="none">
        <line x1="0"   y1="200" x2={width} y2="200" opacity="0.08" />
        <line x1="0"   y1="400" x2={width} y2="400" opacity="0.09" />
        <line x1="0"   y1="600" x2={width} y2="600" opacity="0.07" />
        <line x1="150" y1="0"   x2="150"   y2={height} opacity="0.08" />
        <line x1="450" y1="0"   x2="450"   y2={height} opacity="0.08" />
        <line x1="0"   y1="50"  x2={width}  y2={height - 50} opacity="0.06" />
      </g>

      {/* Topographic curves */}
      {curves.map((c, i) => (
        <path
          key={i}
          d={c.d}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="0.6"
          opacity={c.op}
        />
      ))}

      {/* Intersection dots along curves */}
      <Dot cx={300} cy={120} r={2}   opacity={0.22} />
      <Dot cx={540} cy={400} r={2}   opacity={0.20} />
      <Dot cx={300} cy={700} r={2}   opacity={0.22} />
      <Dot cx={60}  cy={400} r={2}   opacity={0.20} />
      <Dot cx={466} cy={200} r={1.5} opacity={0.18} />
      <Dot cx={134} cy={200} r={1.5} opacity={0.18} />
      <Dot cx={466} cy={600} r={1.5} opacity={0.18} />

      {/* Cross marks */}
      <CrossMark cx={550} cy={100} opacity={0.3} />
      <CrossMark cx={50}  cy={700} opacity={0.3} />

      {/* Label notes */}
      <text x="20"  y="30"         fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.22">CONTOUR — 1:1000</text>
      <text x="20"  y={height - 20} fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.25">FIELD 03 / NL</text>
    </svg>
  )
}
