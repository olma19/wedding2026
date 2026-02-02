'use client'

import SectionWrapper from './SectionWrapper'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'

export default function GoodToKnowSection() {
  const { goodToKnow } = weddingConfig
  const colors = useColors()

  const items = [
    { title: 'Mat och dryck', content: goodToKnow.foodAndDrinks, icon: '🍽️' },
    {
      title: 'Hotell',
      content: goodToKnow.hotelDiscountCode
        ? `${goodToKnow.hotels} Rabattkod: ${goodToKnow.hotelDiscountCode}`
        : goodToKnow.hotels,
      icon: '🏨',
    },
    { title: 'Klädkod', content: goodToKnow.dressCode, icon: '👔' },
    { title: 'Barn', content: goodToKnow.children, icon: '👶' },
    { title: 'Gåvor', content: goodToKnow.gifts, icon: '🎁' },
  ]

  return (
    <SectionWrapper
      title={goodToKnow.title}
      titleVariant="branch"
      decorations={[
        { position: 'top-right', size: 'medium', opacity: 0.2 },
        { position: 'bottom-left', size: 'small', opacity: 0.2 },
      ]}
      showScrollAnimation={false}
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {items.map((item, index) => (
          <ScrollAnimation key={item.title} delay={index * 100}>
            <div className={`bg-white rounded-xl shadow-md p-6 border ${colors.borderLight} hover:shadow-lg transition-shadow`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>{item.icon}</span>
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </SectionWrapper>
  )
}
