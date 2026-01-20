import type { WeddingConfig } from '@/types/wedding'

export const weddingConfig: WeddingConfig = {
  // Wedding Date & Time
  date: {
    day: 'Lördag',
    date: '20',
    month: 'Juni',
    year: '2026',
    fullDate: '20 Juni 2026',
  },
  
  // Ceremony Time
  ceremony: {
    time: '15:00',
    description: 'Ceremoni börjar',
  },
  
  // Location
  location: {
    name: 'Testchurch',
    address: 'Sävsjö',
    // You can add more details later:
    // fullAddress: 'Bröllopsplats, Stad',
    // city: 'Sävsjö',
    // mapUrl: 'https://maps.google.com/...',
  },
  
  // Couple Names (optional - for future use)
  couple: {
    name1: 'Kristian Frisk',
    name2: 'Mimmi Carlsson',
  },
  
  // Our Story
  story: {
    paragraphs: [
      'Efter många år tillsammans är det äntligen dags att fira vår kärlek och ta nästa steg i vår resa. Vi ser fram emot att dela denna speciella dag med våra nära och kära.',
      'Ditt närvaro skulle göra vår dag ännu mer oförglömlig.',
    ],
  },
  
  // Additional Info
  rsvpDeadline: 'Senast 16/05/2026',
}
