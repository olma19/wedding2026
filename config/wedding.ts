import type { WeddingConfig } from '@/types/wedding'

export const weddingConfig: WeddingConfig = {
  date: {
    day: 'Lördag',
    date: '20',
    month: 'Juni',
    year: '2026',
    fullDate: '20 Juni 2026',
  },

  ceremony: {
    time: '15:00',
    description: 'Ceremoni börjar',
  },

  location: {
    name: 'Testchurch',
    address: 'Sävsjö',
    fullAddress: 'Bröllopsplats, Sävsjö',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sävsjö',
  },

  couple: {
    name1: 'Kristian',
    name2: 'Mimmi',
  },

  hero: {
    introText: 'Vi ser fram emot att dela denna speciella dag med dig',
    imageUrl: '/images/couple.jpg',
  },

  story: {
    paragraphs: [
      'Efter många år tillsammans är det äntligen dags att fira vår kärlek och ta nästa steg i vår resa. Vi ser fram emot att dela denna speciella dag med våra nära och kära.',
      'Ditt närvaro skulle göra vår dag ännu mer oförglömlig.',
    ],
  },

  dressCode: {
    title: 'Klädkod',
    description: 'Kavaj',
  },

  dinnerParty: {
    title: 'Middag och fest',
    time: '17:00',
    place: 'Samma plats',
    description: 'Efter vigseln bjuder vi på middag och fest. Välkommen!',
  },

  goodToKnow: {
    title: 'Bra att veta',
    foodAndDrinks: 'Middag och dryck serveras. Ange eventuella allergier i OSA-formuläret.',
    hotels: 'Vi har blockerat rum på närliggande hotell. Ange rabattkod vid bokning.',
    hotelDiscountCode: 'BROLLOP2026',
    dressCode: 'Kavaj',
    children: 'Festen är utan barn – vi firar vuxet.',
  },

  toastmaster: {
    title: 'Toastmaster',
    speechNote: 'Tal och spex ska anmälas till toastmastern i förväg.',
    people: [
      { name: 'Toastmaster', imageUrl: undefined },
      { name: 'Toast madame', imageUrl: '/images/toastmaster-madame.jpg' },
    ],
  },

  osa: {
    deadline: 'Senast 16 maj 2026',
    busInfo: 'Buss avgår från [plats] kl [tid] och tillbaka efter festen. Anmäl intresse i formuläret nedan.',
  },

  rsvpDeadline: 'Senast 16/05/2026',
}
