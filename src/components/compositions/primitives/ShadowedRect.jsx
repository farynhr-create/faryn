/* Academic drawing device: a rect with a solid offset duplicate as the shadow */
export default function ShadowedRect({
  x, y, width, height,
  offset = 7,
  strokeWidth = 0.8,
  stroke = 'var(--color-ink)',
  shadowOpacity = 0.06,
}) {
  return (
    <g>
      {/* Shadow — filled duplicate offset down-right */}
      <rect
        x={x + offset}
        y={y + offset}
        width={width}
        height={height}
        fill={stroke}
        opacity={shadowOpacity}
      />
      {/* Main rect */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  )
}
