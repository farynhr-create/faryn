import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { LightboxProvider } from '@/context/LightboxContext'
import { MobileMenuProvider } from '@/context/MobileMenuContext'
import { IntroProvider } from '@/context/IntroContext'
import Layout from '@/routes/Layout'
import Home from '@/routes/Home'
import Portfolio from '@/routes/Portfolio'
import Lightbox from '@/components/work/Lightbox'
import IntroAnimation from '@/components/intro/IntroAnimation'

/* Code-split the heavier detail/secondary pages */
const ProjectDetail = lazy(() => import('@/routes/ProjectDetail'))
const About         = lazy(() => import('@/routes/About'))
const Services      = lazy(() => import('@/routes/Services'))
const Contact       = lazy(() => import('@/routes/Contact'))
const NotFound      = lazy(() => import('@/routes/NotFound'))

function PageFallback() {
  return <div style={{ minHeight: '60vh' }} aria-busy="true" />
}

export default function App() {
  /* Intro plays on every fresh page load (hard refresh) — App mounts once
   * per page lifetime, so this is true exactly when the document loads. */
  const [showIntro, setShowIntro] = useState(true)

  return (
    <HelmetProvider>
      <IntroProvider>
      <MobileMenuProvider>
        <LightboxProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route
                  path="portfolio/:slug"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <ProjectDetail />
                    </Suspense>
                  }
                />
                <Route
                  path="about"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <About />
                    </Suspense>
                  }
                />
                <Route
                  path="services"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <Services />
                    </Suspense>
                  }
                />
                <Route
                  path="contact"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <Contact />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
            <Lightbox />
          </BrowserRouter>
          {showIntro && (
            <IntroAnimation onComplete={() => setShowIntro(false)} />
          )}
        </LightboxProvider>
      </MobileMenuProvider>
      </IntroProvider>
    </HelmetProvider>
  )
}
