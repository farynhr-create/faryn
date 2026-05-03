export default function RedCircle({ cx, cy, r, halo = false, opacity = 0.87 }) {
  return (
    <g>
      {halo && (
        <circle
          cx={cx} cy={cy}
          r={r * 1.45}
          fill="var(--color-mark)"
          opacity={0.12}
        />
      )}
      <circle
        cx={cx} cy={cy}
        r={r}
        fill="var(--color-mark)"
        opacity={opacity}
        stroke="var(--color-ink)"
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />
    </g>
  )
}
