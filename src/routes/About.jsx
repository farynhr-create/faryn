import { Helmet } from 'react-helmet-async'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import GhostLink from '@/components/ui/GhostLink'
import PageHeader from '@/components/ui/PageHeader'
import styles from './About.module.css'

const disciplines = [
  {
    num: '01',
    title: 'Visual Art',
    desc: 'Original works on paper and mixed-media, exhibited independently and in group contexts.',
  },
  {
    num: '02',
    title: 'Content Strategy',
    desc: 'Editorial frameworks, voice systems, and content architecture for organisations and brands.',
  },
  {
    num: '03',
    title: 'Content Creation',
    desc: 'Photography, writing, and editorial design for ongoing content partnerships.',
  },
  {
    num: '04',
    title: 'Teaching',
    desc: 'Drawing fundamentals and creative practice workshops for professionals.',
  },
]

const facts = [
  {
    label: 'Selected clients',
    items: ['EYE Film Institute', 'Galerie Bart', 'Ant.Element', 'Confidential — agriculture'],
  },
  {
    label: 'Exhibitions',
    items: ['Galerie Bart, Amsterdam — 2024', 'Open Studios NDSM — 2023', 'Group show, Het Hem — 2022'],
  },
  {
    label: 'Recognition',
    items: ['Stimuleringsfonds grantee — 2023', 'Mondriaan Fonds — shortlist, 2022'],
  },
  {
    label: 'Background',
    items: ['BA Fine Art, Gerrit Rietveld Academie', 'Working independently since 2018'],
  },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Faryn Studio</title>
        <meta
          name="description"
          content="Faryn Studio is a one-person creative practice based in Amsterdam working across visual art, content creation, and content strategy."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Faryn Studio',
            jobTitle: 'Visual Artist & Content Strategist',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Amsterdam',
              addressCountry: 'NL',
            },
            url: 'https://farynstudio.nl',
          })}
        </script>
      </Helmet>

      <div className={styles.page}>
        <Hairline />

        <PageHeader
          index="03 / 04"
          label="About"
          meta={[
            { label: 'Founded',  value: '2018' },
            { label: 'Location', value: 'Amsterdam, NL' },
            { label: 'Practice', value: 'Independent' },
          ]}
          titleId="about-statement"
          title={<>Where art<br /><em>meets</em> strategy</>}
          intro="A one-person creative practice operating at the intersection of fine art and strategic communication. Working with cultural organisations, independent publishers, and brands that communicate with intention."
        />

        <Hairline />

        {/* ── Bio ────────────────────────────────────── */}
        <section className={styles.bio} aria-labelledby="bio-label">
          <div className={styles.bioInner}>
            <div className={styles.bioMeta}>
              <SectionLabel id="bio-label" variant="before">Practice</SectionLabel>
            </div>
            <div className={styles.bioBody}>
              <p className={styles.lead}>
                Faryn Studio is a one-person creative practice operating at the
                intersection of fine art and strategic communication.
              </p>
              <p className={styles.body}>
                The studio was founded on the premise that making things and
                thinking about why they are made are not separate disciplines —
                they are the same practice, viewed from different angles.
              </p>
              <p className={styles.body}>
                Work moves between the studio and the desk: between a series of
                drawings on paper and a content strategy for an institution. The
                through-line is the same in both — attention to material, to
                audience, and to the space between what is said and what is
                meant.
              </p>
              <p className={styles.body}>
                Based in Amsterdam, the studio works with cultural organisations,
                independent publishers, and brands that communicate with
                intention. Projects are taken selectively and pursued thoroughly.
              </p>
              <div className={styles.contact}>
                <GhostLink href="mailto:hello@farynstudio.nl" hairline>
                  Get in touch
                </GhostLink>
              </div>
            </div>
          </div>
        </section>

        <Hairline />

        {/* ── Selected facts ─────────────────────────── */}
        <section className={styles.facts} aria-labelledby="facts-label">
          <div className={styles.factsInner}>
            <div className={styles.factsMeta}>
              <SectionLabel id="facts-label" variant="before">Index</SectionLabel>
            </div>
            <dl className={styles.factsList}>
              {facts.map((f) => (
                <div key={f.label} className={styles.factRow}>
                  <dt className={styles.factLabel}>
                    <span className={styles.factDot} aria-hidden="true" />
                    {f.label}
                  </dt>
                  <dd className={styles.factItems}>
                    {f.items.map((item) => (
                      <span key={item} className={styles.factItem}>
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Hairline />

        {/* ── Disciplines ────────────────────────────── */}
        <section className={styles.disciplines} aria-labelledby="disciplines-label">
          <div className={styles.disciplinesInner}>
            <div className={styles.disciplinesMeta}>
              <SectionLabel id="disciplines-label" variant="before">Disciplines</SectionLabel>
            </div>
            <div className={styles.disciplineGrid}>
              {disciplines.map((d) => (
                <article key={d.title} className={styles.discipline}>
                  <span className={styles.disciplineNum}>{d.num}</span>
                  <span className={styles.disciplineDot} aria-hidden="true" />
                  <h3 className={styles.disciplineTitle}>{d.title}</h3>
                  <p className={styles.disciplineDesc}>{d.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Hairline />
      </div>
    </>
  )
}
