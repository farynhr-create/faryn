import { createContext, useContext, useState } from 'react'

const IntroCtx = createContext({ introComplete: true, setIntroComplete: () => {} })

export function IntroProvider({ children }) {
  const skip =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [introComplete, setIntroComplete] = useState(skip)
  return (
    <IntroCtx.Provider value={{ introComplete, setIntroComplete }}>
      {children}
    </IntroCtx.Provider>
  )
}

export const useIntro = () => useContext(IntroCtx)
