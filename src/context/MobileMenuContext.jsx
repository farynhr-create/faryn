import { createContext, useContext, useState } from 'react'

const MobileMenuContext = createContext(null)

export function MobileMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(o => !o)
  const close  = () => setIsOpen(false)

  return (
    <MobileMenuContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  return useContext(MobileMenuContext)
}
