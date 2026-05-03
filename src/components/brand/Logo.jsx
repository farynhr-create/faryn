import styles from './Logo.module.css';

/**
 * Faryn Studio wordmark
 *
 * Each letter is a small constellation of dots and lines. One red mark
 * per letter sits at the structural decision point — where a stroke
 * branches, converges, or changes direction.
 *
 * Hover behaviour (driven by .lockup:hover in LogoLockup.module.css):
 *   - junction dots brighten + scale slightly
 *   - red marks pulse with a red glow
 *   - line strokes thicken
 *   - the bloom waves across the five letters in sequence (data-letter)
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
      <g data-letter="0">
        <line x1="40" y1="20" x2="40" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="40" y1="20" x2="135" y2="20" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="40" y1="110" x2="100" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle data-junction="ink" cx="40" cy="20" r="10" fill={ink} />
        <circle data-junction="ink" cx="135" cy="20" r="9" fill={ink} />
        <circle data-junction="ink" cx="100" cy="110" r="9" fill={ink} />
        <circle data-junction="ink" cx="40" cy="200" r="10" fill={ink} />
        <circle data-junction="red" cx="40" cy="110" r="11" fill={red} />
      </g>

      {/* ───── A ───── */}
      <g data-letter="1">
        <line x1="240" y1="200" x2="295" y2="20" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="295" y1="20" x2="350" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="267.5" y1="110" x2="322.5" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle data-junction="ink" cx="240" cy="200" r="10" fill={ink} />
        <circle data-junction="ink" cx="350" cy="200" r="10" fill={ink} />
        <circle data-junction="ink" cx="267.5" cy="110" r="9" fill={ink} />
        <circle data-junction="ink" cx="322.5" cy="110" r="9" fill={ink} />
        <circle data-junction="red" cx="295" cy="20" r="11" fill={red} />
      </g>

      {/* ───── R ───── */}
      <g data-letter="2">
        <line x1="460" y1="20" x2="460" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="460" y1="20" x2="555" y2="20" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="555" y1="20" x2="555" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="460" y1="110" x2="555" y2="110" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="507" y1="110" x2="555" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle data-junction="ink" cx="460" cy="20" r="10" fill={ink} />
        <circle data-junction="ink" cx="555" cy="20" r="9" fill={ink} />
        <circle data-junction="ink" cx="555" cy="110" r="9" fill={ink} />
        <circle data-junction="ink" cx="460" cy="110" r="9" fill={ink} />
        <circle data-junction="ink" cx="460" cy="200" r="10" fill={ink} />
        <circle data-junction="ink" cx="555" cy="200" r="9" fill={ink} />
        <circle data-junction="red" cx="507" cy="110" r="11" fill={red} />
      </g>

      {/* ───── Y ───── */}
      <g data-letter="3">
        <line x1="675" y1="20" x2="730" y2="115" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="785" y1="20" x2="730" y2="115" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="730" y1="115" x2="730" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle data-junction="ink" cx="675" cy="20" r="10" fill={ink} />
        <circle data-junction="ink" cx="785" cy="20" r="10" fill={ink} />
        <circle data-junction="ink" cx="730" cy="200" r="10" fill={ink} />
        <circle data-junction="red" cx="730" cy="115" r="11" fill={red} />
      </g>

      {/* ───── N ───── */}
      <g data-letter="4">
        <line x1="890" y1="20" x2="890" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="890" y1="20" x2="1000" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="1000" y1="20" x2="1000" y2="200" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        <circle data-junction="ink" cx="890" cy="200" r="10" fill={ink} />
        <circle data-junction="ink" cx="1000" cy="20" r="10" fill={ink} />
        <circle data-junction="ink" cx="1000" cy="200" r="10" fill={ink} />
        <circle data-junction="red" cx="890" cy="20" r="11" fill={red} />
      </g>
    </svg>
  );
}
