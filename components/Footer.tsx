import { weddingConfig } from '@/config/wedding'

export default function Footer() {
  const { couple, date } = weddingConfig

  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {couple.name1 && couple.name2 && (
          <p className="text-gray-300 mb-2 text-lg font-light">
            {couple.name1} & {couple.name2}
          </p>
        )}
        <p className="text-gray-400 mb-4">
          Med kärlek och glädje
        </p>
        <p className="text-sm text-gray-500">
          © {date.year} Bröllop. Alla rättigheter förbehållna.
        </p>
      </div>
    </footer>
  )
}
