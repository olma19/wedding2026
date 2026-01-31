import Image from 'next/image'
import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'

const PLACEHOLDER_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80'

export default function ToastmasterSection() {
  const { toastmaster } = weddingConfig
  const people = toastmaster.people?.length ? toastmaster.people : [{ name: toastmaster.title, imageUrl: undefined }]

  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden scroll-mt-20">
      <div className="absolute top-10 left-5 opacity-20 transform rotate-12">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      <div className="absolute bottom-5 right-10 opacity-20 transform -rotate-45">
        <FlowerDecoration size="small" variant="branch" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle title={toastmaster.title} flowerVariant="flower" />

        <ScrollAnimation delay={0}>
          <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            {toastmaster.speechNote}
          </p>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {people.map((person, index) => (
            <ScrollAnimation key={person.name} delay={200 + index * 100}>
              <div className="text-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-pink-200 shadow-lg mb-4">
                  <Image
                    src={person.imageUrl ?? PLACEHOLDER_AVATAR}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </div>
                <p className="font-semibold text-gray-800">{person.name}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
