import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import RSVPForm from '../RSVPForm'
import { weddingConfig } from '@/config/wedding'

export default function RSVPSection() {
  const { rsvpDeadline } = weddingConfig

  return (
    <section id="rsvp" className="relative py-20 px-4 bg-white overflow-hidden">
      {/* Decorative flowers */}
      <div className="absolute top-10 left-5 opacity-20 transform rotate-12">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      <div className="absolute top-5 right-10 opacity-20 transform -rotate-12">
        <FlowerDecoration size="small" variant="leaf" />
      </div>
      <div className="absolute bottom-10 right-5 opacity-20 transform rotate-45">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <SectionTitle title="RSVP" flowerVariant="flower" showDivider={false} />
          <div className="h-1 w-24 bg-pink-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vänligen bekräfta din närvaro {rsvpDeadline.toLowerCase()}. 
            Vi ser fram emot att höra från dig!
          </p>
        </div>
        
        <div className="mt-12">
          <RSVPForm />
        </div>
      </div>
    </section>
  )
}
