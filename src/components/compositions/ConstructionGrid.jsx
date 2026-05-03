/* Reusable faint construction grid — used as a background layer in compositions */
export default function ConstructionGrid({
  width = 600, height = 700,
  hLines = [],
  vLines = [],
  diagonals = [],
  stroke = 'var(--color-ink)',
}) {
  const defaultH = [
    { y: 70,  opacity: 0.09 },
    { y: 200, opacity: 0.08 },
    { y: 330, opacity: 0.11 },
    { y: 490, opacity: 0.09 },
    { y: 620, opacity: 0.08 },
  ]
  const defaultV = [
    { x: 90,  opacity: 0.10 },
    { x: 250, opacity: 0.08 },
    { x: 390, opacity: 0.09 },
    { x: 530, opacity: 0.08 },
  ]
  const defaultD = [
    { x1: 0,   y1: 100, x2: 600, y2: 600, opacity: 0.07 },
    { x1: 600, y1: 80,  x2: 0,   y2: 500, opacity: 0.06 },
  ]

  const hs = hLines.length ? hLines : defaultH
  const vs = vLines.length ? vLines : defaultV
  const ds = diagonals.length ? diagonals : defaultD

  return (
    <g data-construction-grid="true" stroke={stroke} strokeWidth="0.5" fill="none">
      {hs.map((l, i) => (
        <line key={`h${i}`} x1={0} y1={l.y} x2={width} y2={l.y} opacity={l.opacity} data-line-type="h" />
      ))}
      {vs.map((l, i) => (
        <line key={`v${i}`} x1={l.x} y1={0} x2={l.x} y2={height} opacity={l.opacity} data-line-type="v" />
      ))}
      {ds.map((l, i) => (
        <line key={`d${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity={l.opacity} data-line-type="d" />
      ))}
    </g>
  )
}
