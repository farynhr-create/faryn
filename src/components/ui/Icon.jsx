const paths = {
  instagram: (
    <>
      <rect x="3" y="3" width="26" height="26" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="9" r="1" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="26" height="26" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="11" r="1" fill="currentColor" />
      <line x1="9" y1="14" x2="9" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="14" y1="14" x2="14" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <path d="M14 18 Q14 14 18 14 Q22 14 22 18 L22 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" fill="none" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="7" width="26" height="18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8 L16 18 L29 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  external: (
    <>
      <path d="M11 6 L26 6 L26 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="26" y1="6" x2="6" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </>
  ),
}

export default function Icon({ name, size = 18, className, 'aria-label': ariaLabel }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={className}
    >
      {paths[name]}
    </svg>
  )
}
