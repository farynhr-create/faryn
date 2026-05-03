import { Helmet } from 'react-helmet-async'
import Hero from '@/components/hero/Hero'
import SelectedWork from '@/components/sections/SelectedWork'
import Services from '@/components/sections/Services'
import AboutPreview from '@/components/sections/AboutPreview'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Faryn Studio — Visual Art, Content &amp; Strategy</title>
        <meta
          name="description"
          content="Faryn Studio is an independent creative practice based in Amsterdam working across visual art, content creation, and content strategy."
        />
        <meta property="og:title" content="Faryn Studio — Visual Art, Content & Strategy" />
        <meta property="og:description" content="Independent creative practice based in Amsterdam." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero />
      <SelectedWork limit={3} />
      <Services />
      <AboutPreview />
      <ContactCTA />
    </>
  )
}
