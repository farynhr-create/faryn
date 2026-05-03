import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import styles from './Services.module.css'

const services = [
  {
    num: '01',
    title: 'Visual Art & Illustration',
    desc: 'Original works on paper, editorial illustration, and commissioned pieces for print and exhibition.',
  },
  {
    num: '02',
    title: 'Content Creation',
    desc: 'Photography, writing, and editorial design for publications, campaigns, and ongoing content partnerships.',
  },
  {
    num: '03',
    title: 'Content Strategy',
    desc: 'Editorial frameworks, voice guidelines, and content systems for cultural institutions and independent brands.',
  },
  {
    num: '04',
    title: 'Creative Workshops',
    desc: 'Drawing fundamentals and creative practice workshops for professionals and small organisations.',
  },
]

export default function Services() {
  return (
    <section className={styles.section} aria-labelledby="services-label">
      <Hairline />
      <div className={styles.inner}>
        <div className={styles.meta}>
          <SectionLabel id="services-label">Services</SectionLabel>
          <h2 className={styles.heading}>
            What<br />
            I <em>offer</em>
          </h2>
        </div>

        <div className={styles.grid} role="list">
          {services.map((s) => (
            <article key={s.num} className={styles.cell} role="listitem">
              <span className={styles.num}>{s.num}</span>
              {/* One red dot per cell — the visual anchor */}
              <span className={styles.dot} aria-hidden="true" />
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
      <Hairline />
    </section>
  )
}
