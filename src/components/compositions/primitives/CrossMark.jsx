export default function CrossMark({ cx, cy, size = 6, opacity = 0.4, stroke = 'var(--color-ink)' }) {
  return (
    <g stroke={stroke} strokeWidth="0.5" strokeLinecap="round" opacity={opacity}>
      <line x1={cx - size} y1={cy - size} x2={cx + size} y2={cy + size} />
      <line x1={cx + size} y1={cy - size} x2={cx - size} y2={cy + size} />
    </g>
  )
}
