export default function Dot({ cx, cy, r = 2.5, opacity = 0.3, fill = 'var(--color-ink)', id }) {
  return (
    <circle
      id={id}
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      opacity={opacity}
    />
  )
}
