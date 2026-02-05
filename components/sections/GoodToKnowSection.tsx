'use client'

import SectionWrapper from './SectionWrapper'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import Card from '../ui/Card'
import CardHeader from '../ui/CardHeader'
import CardContent from '../ui/CardContent'
import { sectionTexts } from '@/config/section-texts'
import {
  formatContentWithNewlines,
  getHighlightsForKey,
  type GoodToKnowItemKey,
} from '@/lib/formatGoodToKnow'

export default function GoodToKnowSection() {
  const { goodToKnow } = weddingConfig

  const hotelsContent = goodToKnow.hotelDiscountCode
    ? `${goodToKnow.hotels} Rabattkod: ${goodToKnow.hotelDiscountCode}`
    : goodToKnow.hotels

  const items: Array<{
    key: GoodToKnowItemKey
    title: string
    content: string
    icon: string
  }> = [
    {
      key: 'dressCode',
      title: sectionTexts['good-to-know'].items.dressCode.title,
      content: goodToKnow.dressCode,
      icon: sectionTexts['good-to-know'].items.dressCode.icon,
    },
    {
      key: 'children',
      title: sectionTexts['good-to-know'].items.children.title,
      content: goodToKnow.children,
      icon: sectionTexts['good-to-know'].items.children.icon,
    },
    {
      key: 'hotels',
      title: sectionTexts['good-to-know'].items.hotels.title,
      content: hotelsContent,
      icon: sectionTexts['good-to-know'].items.hotels.icon,
    },
    ...(goodToKnow.transport
      ? [
          {
            key: 'transport' as const,
            title: sectionTexts['good-to-know'].items.transport.title,
            content: goodToKnow.transport,
            icon: sectionTexts['good-to-know'].items.transport.icon,
          },
        ]
      : []),
    ...(goodToKnow.parking
      ? [
          {
            key: 'parking' as const,
            title: sectionTexts['good-to-know'].items.parking.title,
            content: goodToKnow.parking,
            icon: sectionTexts['good-to-know'].items.parking.icon,
          },
        ]
      : []),
    {
      key: 'gifts',
      title: sectionTexts['good-to-know'].items.gifts.title,
      content: goodToKnow.gifts,
      icon: sectionTexts['good-to-know'].items.gifts.icon,
    },
  ]

  return (
    <SectionWrapper
      title={sectionTexts['good-to-know'].title}
      titleVariant="branch"
      decorations={[
        { position: 'top-right', size: 'medium', opacity: 0.2 },
        { position: 'bottom-left', size: 'small', opacity: 0.2 },
      ]}
      showScrollAnimation={false}
    >
      <div className="flex flex-col gap-8 max-w-2xl mx-auto">
        {items.map((item, index) => {
          const highlights = getHighlightsForKey(item.key, {
            hotelDiscountCode: goodToKnow.hotelDiscountCode,
          })
          const formatted = formatContentWithNewlines(item.content, highlights)

          return (
            <ScrollAnimation key={item.title} delay={index * 100}>
              <Card variant="default" hover className="rounded-xl">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span>{item.icon}</span>
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed">{formatted}</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
