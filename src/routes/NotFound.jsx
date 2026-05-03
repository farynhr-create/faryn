import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SectionLabel from '@/components/ui/SectionLabel'
import Hairline from '@/components/ui/Hairline'
import GhostLink from '@/components/ui/GhostLink'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found — Faryn Studio</title>
      </Helmet>
      <Hairline />
      <div className={styles.page}>
        <SectionLabel variant="before">404</SectionLabel>
        <h1 className={styles.title}>
          Page not<br /><em>found</em>
        </h1>
        <p className={styles.body}>
          The page you are looking for does not exist, or has moved.
        </p>
        <GhostLink to="/" hairline>Return home</GhostLink>
      </div>
      <Hairline />
    </>
  )
}
