import { Link } from 'react-router-dom'
import './ProjectCard.css'

export default function ProjectCard({ project, index }) {
  const { slug, title, subtitle, category, tags, year, color, accent } = project

  return (
    <Link
      to={`/portfolio/${slug}`}
      className="project-card"
      style={{ '--card-bg': color, '--card-accent': accent }}
    >
      {/* Visual area */}
      <div className="project-card__visual">
        {/* Dot-grid pattern unique to each card */}
        <ProjectPattern accent={accent} index={index} />
        <div className="project-card__overlay" />
        <div className="project-card__hover-label">
          <span>View Project</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="project-card__info">
        <div className="project-card__meta">
          <span className="label">{category}</span>
          <span className="mono project-card__year">{year}</span>
        </div>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__sub">{subtitle}</p>
        <div className="project-card__tags">
          {tags.map(t => <span key={t} className="project-card__tag">{t}</span>)}
        </div>
      </div>
    </Link>
  )
}

function ProjectPattern({ accent, index }) {
  const cx = 50 + (index % 3) * 10
  const cy = 40 + (index % 2) * 20
  return (
    <svg
      className="project-card__pattern"
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`pg-${index}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#pg-${index})`} />

      {/* Dot grid */}
      {Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 11 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 40 + 20}
            cy={row * 40 + 20}
            r="1.2"
            fill={accent}
            opacity="0.2"
          />
        ))
      )}

      {/* Unique geometric lines per card */}
      <g stroke={accent} strokeWidth="0.8" opacity="0.35" fill="none">
        <line x1={cx} y1={cy} x2={cx + 80} y2={cy} />
        <line x1={cx} y1={cy} x2={cx + 40} y2={cy + 60} />
        <line x1={cx + 80} y1={cy} x2={cx + 40} y2={cy + 60} />
        <circle cx={cx} cy={cy} r="3" fill={accent} />
        <circle cx={cx + 80} cy={cy} r="3" fill={accent} />
        <circle cx={cx + 40} cy={cy + 60} r="3" fill={accent} />
        {index % 2 === 0 && (
          <>
            <line x1={cx + 40} y1={cy + 60} x2={cx + 120} y2={cy + 80} />
            <circle cx={cx + 120} cy={cy + 80} r="2" fill={accent} />
          </>
        )}
        {index % 3 === 0 && (
          <>
            <line x1={cx - 30} y1={cy + 30} x2={cx} y2={cy} />
            <circle cx={cx - 30} cy={cy + 30} r="2" fill={accent} />
          </>
        )}
      </g>

      {/* Large index number watermark */}
      <text
        x="340"
        y="220"
        fill={accent}
        opacity="0.07"
        fontSize="120"
        fontFamily="serif"
        fontWeight="300"
        textAnchor="end"
      >
        {String(index + 1).padStart(2, '0')}
      </text>
    </svg>
  )
}
