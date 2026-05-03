import styles from './Logo.module.css';

/**
 * Faryn Studio wordmark
 *
 * Design rationale: each red dot marks a structural decision point —
 * the moment a stroke branches, converges, or changes direction.
 * One red mark per letter, never decorative.
 *
 *   F → red at spine-to-middle-bar junction (the spine branches)
 *   A → red at apex (where two become one)
 *   R → red where leg departs the bowl (a new direction)
 *   Y → red at three-stroke junction (the convergence)
 *   N → red at top-left where vertical meets diagonal (the split)
 *
 * Props:
 *   width        — rendered width in px (height auto)
 *   color        — overrides ink color (default: var(--color-ink))
 *   redAccent    — when false, all dots render in ink (default: true)
 *   className    — extra class name pass-through
 *   ariaLabel    — accessibility label (default: "Faryn Studio")
 */
export default function Logo({
  width = 240,
  color,
  redAccent = true,
  className,
  ariaLabel = 'Faryn Studio',
}) {
  const ink = color || 'var(--color-ink, #1c1c1c)';
  const red = redAccent ? 'var(--color-mark, #c4392c)' : ink;

  return (
    <svg
      width={width}
      viewBox="0 0 1180 220"
      xmlns="http://www.w3.org/2000/svg"
      className={[styles.logo, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ───── F ───── */}
      <g>
        <line x1="40" y1="20" x2="40" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="40" y1="20" x2="135" y2="20" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="40" y1="110" x2="100" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="40" cy="20" r="10" fill={ink} />
        <circle cx="135" cy="20" r="9" fill={ink} />
        <circle cx="100" cy="110" r="9" fill={ink} />
        <circle cx="40" cy="200" r="10" fill={ink} />
        <circle cx="40" cy="110" r="11" fill={red} />
      </g>

      {/* ───── A ───── */}
      <g>
        <line x1="240" y1="200" x2="295" y2="20" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="295" y1="20" x2="350" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="267.5" y1="110" x2="322.5" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="240" cy="200" r="10" fill={ink} />
        <circle cx="350" cy="200" r="10" fill={ink} />
        <circle cx="267.5" cy="110" r="9" fill={ink} />
        <circle cx="322.5" cy="110" r="9" fill={ink} />
        <circle cx="295" cy="20" r="11" fill={red} />
      </g>

      {/* ───── R ───── */}
      <g>
        <line x1="460" y1="20" x2="460" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="460" y1="20" x2="555" y2="20" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="555" y1="20" x2="555" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="460" y1="110" x2="555" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="507" y1="110" x2="555" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="460" cy="20" r="10" fill={ink} />
        <circle cx="555" cy="20" r="9" fill={ink} />
        <circle cx="555" cy="110" r="9" fill={ink} />
        <circle cx="460" cy="110" r="9" fill={ink} />
        <circle cx="460" cy="200" r="10" fill={ink} />
        <circle cx="555" cy="200" r="9" fill={ink} />
        <circle cx="507" cy="110" r="11" fill={red} />
      </g>

      {/* ───── Y ───── */}
      <g>
        <line x1="675" y1="20" x2="730" y2="115" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="785" y1="20" x2="730" y2="115" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="730" y1="115" x2="730" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="675" cy="20" r="10" fill={ink} />
        <circle cx="785" cy="20" r="10" fill={ink} />
        <circle cx="730" cy="200" r="10" fill={ink} />
        <circle cx="730" cy="115" r="11" fill={red} />
      </g>

      {/* ───── N ───── */}
      <g>
        <line x1="890" y1="20" x2="890" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="890" y1="20" x2="1000" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="1000" y1="20" x2="1000" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="890" cy="200" r="10" fill={ink} />
        <circle cx="1000" cy="20" r="10" fill={ink} />
        <circle cx="1000" cy="200" r="10" fill={ink} />
        <circle cx="890" cy="20" r="11" fill={red} />
      </g>
    </svg>
  );
}
