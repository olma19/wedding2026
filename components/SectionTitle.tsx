import FlowerDecoration from './FlowerDecoration'

interface SectionTitleProps {
  title: string
  flowerVariant?: 'flower' | 'leaf' | 'branch'
  showDivider?: boolean
}

export default function SectionTitle({ 
  title, 
  flowerVariant = 'flower',
  showDivider = true 
}: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <FlowerDecoration size="small" variant={flowerVariant} className="opacity-50" />
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">
          {title}
        </h2>
        <FlowerDecoration size="small" variant={flowerVariant} className="opacity-50" />
      </div>
      {showDivider && <div className="h-1 w-24 bg-pink-400 mx-auto mb-8"></div>}
    </div>
  )
}
