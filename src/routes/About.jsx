import { Helmet } from 'react-helmet-async'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import GhostLink from '@/components/ui/GhostLink'
import ConcentricCircles from '@/components/compositions/ConcentricCircles'
import styles from './About.module.css'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Faryn Studio</title>
        <meta name="description" content="Faryn Studio is a one-person creative practice based in Amsterdam working across visual art, content creation, and content strategy." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          'name': 'Faryn Studio',
          'jobTitle': 'Visual Artist & Content Strategist',
          'address': { '@type': 'PostalAddress', 'addressLocality': 'Amsterdam', 'addressCountry': 'NL' },
          'url': 'https://farynstudio.nl',
        })}</script>
      </Helmet>

      <div className={styles.page}>
        <Hairline />

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <SectionLabel>About the studio</SectionLabel>
            <h1 className={styles.title}>
              Where art<br /><em>meets</em> strategy
            </h1>
          </div>
        </header>

        <Hairline />

        {/* Main split */}
        <div className={styles.split}>
          <div className={styles.text}>
            <p className={styles.lead}>
              Faryn Studio is a one-person creative practice operating at the intersection of fine art and strategic communication.
            </p>
            <p className={styles.body}>
              The studio was founded on the premise that making things and thinking about why they are made are not separate disciplines — they are the same practice, viewed from different angles.
            </p>
            <p className={styles.body}>
              Work moves between the studio and the desk: between a series of drawings on paper and a content strategy for an institution. The through-line is the same in both — attention to material, to audience, and to the space between what is said and what is meant.
            </p>
            <p className={styles.body}>
              Based in Amsterdam, the studio works with cultural organisations, independent publishers, and brands that communicate with intention. Projects are taken selectively and pursued thoroughly.
            </p>
            <p className={styles.body}>
              Faryn holds a background in fine art and has been working professionally at the intersection of art and communication since 2018.
            </p>
            <div className={styles.contact}>
              <GhostLink href="mailto:hello@farynstudio.nl" hairline>Get in touch</GhostLink>
            </div>
          </div>

          <div className={styles.composition} aria-hidden="true">
            <ConcentricCircles width={460} height={460} />
          </div>
        </div>

        <Hairline />

        {/* Disciplines */}
        <section className={styles.disciplines} aria-labelledby="disciplines-label">
          <div className={styles.disciplinesInner}>
            <SectionLabel id="disciplines-label" variant="before">Disciplines</SectionLabel>
            <div className={styles.disciplineGrid}>
              {[
                { title: 'Visual Art', desc: 'Original works on paper and mixed-media, exhibited independently and in group contexts.' },
                { title: 'Content Strategy', desc: 'Editorial frameworks, voice systems, and content architecture for organisations and brands.' },
                { title: 'Content Creation', desc: 'Photography, writing, and editorial design for ongoing content partnerships.' },
                { title: 'Teaching', desc: 'Drawing fundamentals and creative practice workshops for professionals.' },
              ].map(d => (
                <div key={d.title} className={styles.discipline}>
                  <h3 className={styles.disciplineTitle}>{d.title}</h3>
                  <p className={styles.disciplineDesc}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Hairline />
      </div>
    </>
  )
}
