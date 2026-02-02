'use client'

import { weddingConfig } from '@/config/wedding'
import { useColors } from './ColorSchemeProvider'

export default function Footer() {
  const { couple, date } = weddingConfig
  const colors = useColors()

  return (
    <footer className={`${colors.bgDark} text-white py-12 px-4`}>
      <div className="container mx-auto max-w-4xl text-center">
        {couple.name1 && couple.name2 && (
          <p className="text-white/90 mb-2 text-lg font-light">
            {couple.name1} & {couple.name2}
          </p>
        )}
        <p className="text-white/80 mb-4">
          Med kärlek och glädje
        </p>
        <p className="text-sm text-white/60">
          © {date.year} Bröllop. Alla rättigheter förbehållna.
        </p>
      </div>
    </footer>
  )
}
