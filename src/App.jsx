import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { LightboxProvider } from '@/context/LightboxContext'
import { MobileMenuProvider } from '@/context/MobileMenuContext'
import Layout from '@/routes/Layout'
import Home from '@/routes/Home'
import Work from '@/routes/Work'
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
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem('faryn-intro-seen')
  )

  return (
    <HelmetProvider>
      <MobileMenuProvider>
        <LightboxProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="work" element={<Work />} />
                <Route
                  path="work/:slug"
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
    </HelmetProvider>
  )
}
