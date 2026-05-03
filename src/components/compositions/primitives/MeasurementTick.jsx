/* Draws measurement ticks at a corner: corner = 'tl' | 'tr' | 'bl' | 'br' */
export default function MeasurementTick({ x, y, corner = 'tl', size = 8, opacity = 0.35, stroke = 'var(--color-ink)' }) {
  const hDir = corner.includes('l') ? 1 : -1
  const vDir = corner.includes('t') ? 1 : -1

  return (
    <g stroke={stroke} strokeWidth="0.5" strokeLinecap="round" opacity={opacity}>
      <line x1={x} y1={y} x2={x + hDir * size} y2={y} />
      <line x1={x} y1={y} x2={x} y2={y + vDir * size} />
    </g>
  )
}
