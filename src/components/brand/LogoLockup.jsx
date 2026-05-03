import Logo from './Logo';
import styles from './LogoLockup.module.css';

/**
 * Faryn Studio brand lockup
 *
 * Two variants:
 *   variant="stacked"  → "Studio" in mono, below FARYN, left-aligned
 *                        Use in: Nav, anywhere compact
 *   variant="inline"   → "studio" in italic serif, beside FARYN
 *                        Use in: Footer, Intro, anywhere with breathing room
 *
 * Props:
 *   variant    — "stacked" (default) | "inline"
 *   width      — width of the FARYN wordmark in px (default 140)
 *   color      — overrides ink color
 *   redAccent  — true (default) | false
 *   className  — pass-through for outer wrapper
 *   ariaLabel  — accessibility label (default "Faryn Studio")
 */
export default function LogoLockup({
  variant = 'stacked',
  width = 140,
  color,
  redAccent = true,
  className,
  ariaLabel = 'Faryn Studio',
}) {
  const wrapperClass = [
    styles.lockup,
    variant === 'stacked' ? styles.stacked : styles.inline,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={wrapperClass} aria-label={ariaLabel} role="img">
      <Logo width={width} color={color} redAccent={redAccent} ariaLabel="" />
      <span className={styles.studioLabel} aria-hidden="true">
        {variant === 'stacked' ? 'Studio' : 'studio'}
      </span>
    </span>
  );
}
