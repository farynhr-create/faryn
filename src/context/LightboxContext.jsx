import { createContext, useContext, useState, useCallback } from 'react'

const LightboxContext = createContext(null)

export function LightboxProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, images: [], index: 0 })

  const open = useCallback((images, index = 0) => {
    setState({ isOpen: true, images, index })
  }, [])

  const close = useCallback(() => {
    setState(s => ({ ...s, isOpen: false }))
  }, [])

  const navigate = useCallback((dir) => {
    setState(s => ({
      ...s,
      index: (s.index + dir + s.images.length) % s.images.length,
    }))
  }, [])

  return (
    <LightboxContext.Provider value={{ ...state, open, close, navigate }}>
      {children}
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  return useContext(LightboxContext)
}
