import { useEffect, useRef, useState } from 'react'
import styles from './DisciplineNav.module.css'

/* Sticky strip beneath the page header. Each pill scroll-anchors to the first
 * project in that discipline. Active state tracks which discipline is visible. */
export default function DisciplineNav({ projects, categories, total }) {
  const [active, setActive] = useState('all')
  const railRef = useRef(null)

  // Derive which categories are actually present in the data
  const presentCats = new Set(projects.map((p) => p.category))
  const items = categories.filter(
    (c) => c.id === 'all' || presentCats.has(c.id)
  )

  // Counts per category
  const counts = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  // Track active section by observing project sections
  useEffect(() => {
    const sections = document.querySelectorAll('[id^="project-"]')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length === 0) return
        const el = visible[0].target
        const cat = el.getAttribute('data-category')
        if (cat) setActive(cat)
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((s) => observer.observe(s))

    // Top-of-stream sentinel — when we're above any section, mark "all"
    const onScroll = () => {
      const first = sections[0]
      if (!first) return
      const rect = first.getBoundingClientRect()
      if (rect.top > window.innerHeight * 0.5) setActive('all')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [projects])

  const handleClick = (id) => {
    if (id === 'all') {
      const first = document.querySelector('[id^="project-"]')
      first?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    const target = projects.find((p) => p.category === id)
    if (!target) return
    const el = document.getElementById(`project-${target.slug}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner} ref={railRef}>
        <span className={styles.label} aria-hidden="true">
          Index —
        </span>
        <nav className={styles.tabs} aria-label="Filter projects by discipline">
          {items.map((cat) => {
            const isActive = active === cat.id
            const count = cat.id === 'all' ? total : counts[cat.id] || 0
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleClick(cat.id)}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className={styles.tabLabel}>{cat.label}</span>
                <span className={styles.tabCount}>
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
