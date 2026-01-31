import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'

export default function GoodToKnowSection() {
  const { goodToKnow } = weddingConfig

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
  ]

  return (
    <section className="relative py-20 px-4 bg-pink-50 overflow-hidden scroll-mt-20">
      <div className="absolute top-10 right-5 opacity-20 transform -rotate-12">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 transform rotate-45">
        <FlowerDecoration size="small" variant="leaf" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle title={goodToKnow.title} flowerVariant="branch" />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <ScrollAnimation key={item.title} delay={index * 100}>
              <div className="bg-white rounded-xl shadow-md p-6 border border-pink-100 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>{item.icon}</span>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
