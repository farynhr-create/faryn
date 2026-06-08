export default function MotionStudy({ width = 600, height = 800 }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Scan lines — subtle horizontal rhythm */}
      <g stroke="var(--color-ink)" strokeWidth="0.5" fill="none">
        {[120, 200, 280, 360, 440, 520, 600, 680].map(y => (
          <line key={y} x1="0" y1={y} x2={width} y2={y} opacity="0.06" />
        ))}
      </g>

      {/* Film frame strip — left edge */}
      <g fill="none" stroke="var(--color-ink)" strokeWidth="0.5">
        <rect x={48} y={80}  width={60} height={80} opacity="0.18" />
        <rect x={48} y={180} width={60} height={80} opacity="0.14" />
        <rect x={48} y={280} width={60} height={80} opacity="0.10" />
        <rect x={48} y={380} width={60} height={80} opacity="0.07" />
        {/* Sprocket holes */}
        {[100, 140, 200, 240, 300, 340, 400, 440].map(y => (
          <rect key={y} x={56} y={y} width={8} height={6} rx={1} opacity="0.22" />
        ))}
      </g>

      {/* Main frame — centred, portrait */}
      <rect x={140} y={100} width={320} height={560} fill="none" stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.45" />

      {/* Inner frame */}
      <rect x={160} y={120} width={280} height={520} fill="none" stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.14" />

      {/* Motion blur streaks — horizontal, inside frame */}
      <g stroke="var(--color-ink)" fill="none">
        <line x1="160" y1="240" x2="380" y2="240" strokeWidth="8"  opacity="0.055" />
        <line x1="160" y1="260" x2="440" y2="260" strokeWidth="14" opacity="0.045" />
        <line x1="160" y1="290" x2="400" y2="290" strokeWidth="6"  opacity="0.06"  />
        <line x1="160" y1="400" x2="370" y2="400" strokeWidth="10" opacity="0.04"  />
        <line x1="160" y1="420" x2="440" y2="420" strokeWidth="16" opacity="0.038" />
        <line x1="160" y1="445" x2="390" y2="445" strokeWidth="5"  opacity="0.05"  />
      </g>

      {/* Play marker — subtle triangle at centre */}
      <polygon
        points="270,360 310,385 270,410"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="0.5"
        opacity="0.22"
      />

      {/* Corner registration marks */}
      {[
        [140, 100], [460, 100], [140, 660], [460, 660],
      ].map(([cx, cy], i) => (
        <g key={i} stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.3">
          <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} />
          <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} />
        </g>
      ))}

      {/* Red mark dot — signal */}
      <circle cx={300} cy={385} r={3} fill="var(--color-mark)" opacity="0.7" />

      {/* Labels */}
      <text x="140" y="84"      fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.28">FRAME 01</text>
      <text x="390" y="84"      fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.20">24fps</text>
      <text x="60"  y={height - 20} fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-ink)" opacity="0.30">MOTION STUDY</text>
    </svg>
  )
}
