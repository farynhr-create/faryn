import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLightbox } from '@/context/LightboxContext'
import styles from './Lightbox.module.css'

export default function Lightbox() {
  const { isOpen, images, index, close, navigate } = useLightbox()

  const onKeyDown = useCallback((e) => {
    if (!isOpen) return
    if (e.key === 'Escape')     close()
    if (e.key === 'ArrowLeft')  navigate(-1)
    if (e.key === 'ArrowRight') navigate(1)
  }, [isOpen, close, navigate])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const current = images[index]

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            className={styles.content}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {current && (
              <>
                <img
                  src={current.src}
                  alt={current.alt || ''}
                  className={styles.image}
                />
                {current.caption && (
                  <p className={styles.caption}>{current.caption}</p>
                )}
              </>
            )}

            {images.length > 1 && (
              <>
                <button
                  className={`${styles.nav} ${styles.prev}`}
                  onClick={() => navigate(-1)}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  className={`${styles.nav} ${styles.next}`}
                  onClick={() => navigate(1)}
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}

            <button
              className={styles.close}
              onClick={close}
              aria-label="Close image viewer"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
