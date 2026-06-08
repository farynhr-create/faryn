import styles from './PhoneFrame.module.css'

// SVG viewBox: 0 0 90 196  (ratio ≈ iPhone 15 Pro body)
// Screen rect: x=1.5 y=6 w=87 h=186  → tight modern bezels
// Dynamic island: centred, 28 wide × 8 tall  (≈ 31% of screen width)

export default function PhoneFrame({ src, alt, label, raised = false }) {
  const id = label?.replace(/\s+/g, '-').toLowerCase() ?? 'phone'

  return (
    <figure className={`${styles.figure} ${raised ? styles.raised : ''}`}>
      <div className={styles.device}>

        {/* Screenshot — sits behind SVG, visible through the mask cut-out */}
        <div className={styles.screen}>
          <img src={src} alt={alt} loading="lazy" className={styles.screenshot} />
        </div>

        {/* SVG device frame */}
        <svg
          viewBox="0 0 90 196"
          className={styles.frame}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Cut the screen area out of the phone body so the img shows through */}
            <mask id={`mask-${id}`}>
              <rect x="0"   y="0" width="90"  height="196" rx="14" fill="white" />
              <rect x="1.5" y="6" width="87"  height="186" rx="11" fill="black" />
            </mask>
          </defs>

          {/* Phone body — only the frame border (screen area is cut out) */}
          <rect x="0" y="0" width="90" height="196" rx="14"
            fill="hsl(0,0%,12%)"
            mask={`url(#mask-${id})`}
          />

          {/* Dynamic island — small pill at top-centre of screen */}
          <rect x="31" y="9" width="28" height="7.5" rx="3.75"
            fill="hsl(0,0%,5%)" />

          {/* Home indicator */}
          <rect x="32" y="188.5" width="26" height="2" rx="1"
            fill="rgba(255,255,255,0.22)" />

          {/* Left buttons: action, vol+, vol- */}
          <rect x="-1.8" y="38" width="2"  height="8"  rx="1" fill="hsl(0,0%,20%)" />
          <rect x="-1.8" y="54" width="2"  height="15" rx="1" fill="hsl(0,0%,20%)" />
          <rect x="-1.8" y="74" width="2"  height="15" rx="1" fill="hsl(0,0%,20%)" />

          {/* Right button: power */}
          <rect x="89.8" y="60" width="2" height="20" rx="1" fill="hsl(0,0%,20%)" />

          {/* Specular top-edge highlight */}
          <rect x="22" y="0.3" width="46" height="0.5" rx="0.25"
            fill="rgba(255,255,255,0.10)" />
        </svg>
      </div>

      {label && <figcaption className={styles.label}>{label}</figcaption>}
    </figure>
  )
}
