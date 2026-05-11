import styles from './Logo.module.css';

/**
 * Faryn Studio wordmark — minimal serif with quiet ceremony
 *
 * Five small dots above a classical serif "FARYN". The centre dot
 * carries the single red mark, preserving the brand's one-red-mark
 * thread without crowding the wordmark.
 *
 * On mount, a constellation-style entrance plays:
 *   1. Dots pop in left-to-right (soft back-out)
 *   2. A hairline connector draws across the five dots
 *   3. Vertical hairlines drop from each dot toward its letter
 *   4. Letters fade up beneath their dots, in sequence
 *   5. The connector and drop-lines fade out, leaving dots + serif FARYN
 *   6. The red dot gives one quiet glow pulse to settle
 *
 * Hover (driven by .lockup:hover in LogoLockup.module.css):
 *   dots lift and brighten from centre outward; letters rise in
 *   sympathy; the red mark emits a soft red glow.
 */
export default function Logo({
  width = 200,
  color,
  redAccent = true,
  className,
  ariaLabel = 'Faryn Studio',
  showStudio = false,
}) {
  const ink = color || 'var(--color-ink, #0a0a0a)';
  const red = redAccent ? 'var(--color-mark, #d42b2b)' : ink;

  // Dot column centres (x-axis). Each letter sits beneath its dot.
  const cols = [98, 158, 218, 278, 338];
  const letters = ['F', 'A', 'R', 'Y', 'N'];

  // Hairline drop lines: from just below each dot down toward the letter cap-height
  const dropTopY = 38;
  const dropBottomY = 70;
  const dropLen = dropBottomY - dropTopY; // 32

  // Hairline connector across all five dots
  const connectorLen = cols[4] - cols[0]; // 240

  // ViewBox grows when STUDIO is integrated below FARYN
  const vbHeight = showStudio ? 170 : 130;

  return (
    <svg
      width={width}
      viewBox={`0 0 396 ${vbHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className={[styles.logo, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── Horizontal hairline connector across the dot row (entrance only) ── */}
      <line
        x1={cols[0]}
        y1="32"
        x2={cols[4]}
        y2="32"
        stroke={ink}
        strokeWidth="0.6"
        strokeLinecap="round"
        className={styles.connector}
        style={{
          strokeDasharray: connectorLen,
          strokeDashoffset: connectorLen,
        }}
      />

      {/* ── Vertical drop hairlines from each dot toward its letter (entrance only) ── */}
      {cols.map((cx, i) => (
        <line
          key={`drop-${i}`}
          data-drop={i}
          x1={cx}
          y1={dropTopY}
          x2={cx}
          y2={dropBottomY}
          stroke={ink}
          strokeWidth="0.6"
          strokeLinecap="round"
          className={styles.drop}
          style={{
            strokeDasharray: dropLen,
            strokeDashoffset: dropLen,
          }}
        />
      ))}

      {/* ── Five dots above ── */}
      <g>
        {cols.map((cx, i) => (
          <circle
            key={`dot-${i}`}
            data-dot={i === 2 ? 'red' : 'ink'}
            data-i={i}
            cx={cx}
            cy="32"
            r="3"
            fill={i === 2 ? red : ink}
            className={styles.dot}
          />
        ))}
      </g>

      {/* ── FARYN — each letter on its own beneath its dot ── */}
      <g>
        {letters.map((ch, i) => (
          <text
            key={`ltr-${i}`}
            data-letter={i}
            x={cols[i]}
            y="108"
            textAnchor="middle"
            fontFamily="var(--font-serif), 'EB Garamond', Garamond, 'Times New Roman', serif"
            fontSize="56"
            fontWeight="400"
            fill={ink}
            className={styles.letter}
          >
            {ch}
          </text>
        ))}
      </g>

      {/* ── STUDIO caption beneath FARYN (only when showStudio=true) ── */}
      {showStudio && (
        <text
          data-studio
          x={cols[0] - 2}
          y="150"
          textAnchor="start"
          fontFamily="var(--font-mono), 'DM Mono', ui-monospace, monospace"
          fontSize="11"
          fontWeight="400"
          fill={ink}
          opacity="0.6"
          letterSpacing="4.2"
          className={styles.studio}
        >
          STUDIO
        </text>
      )}
    </svg>
  );
}
