import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import { fadeIn } from '@/utils/motion'
import styles from './Layout.module.css'

export default function Layout() {
  const location = useLocation()

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styles.main}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
