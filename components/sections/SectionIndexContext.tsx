'use client'

import { createContext, useContext, type ReactNode } from 'react'

const SectionIndexContext = createContext<number | null>(null)

export function SectionIndexProvider({
  index,
  children,
}: {
  index: number
  children: ReactNode
}) {
  return (
    <SectionIndexContext.Provider value={index}>
      {children}
    </SectionIndexContext.Provider>
  )
}

export function useSectionIndex(): number | null {
  return useContext(SectionIndexContext)
}
