import type { WeddingConfig } from '@/types/wedding'

export const weddingConfig: WeddingConfig = {
  date: {
    day: 'Lördag',
    date: '27',
    month: 'Juni',
    year: '2026',
    fullDate: '27 Juni 2026',
    shortDate: '20/6 -26',
  },

  ceremony: {
    time: '15:00',
    description: 'Ceremoni börjar',
  },

  location: {
    name: 'Vallsjö Kyrka',
    address: 'Eksjöhovgårdsvägen, 576 91 Sävsjö',
    fullAddress: 'Eksjöhovgårdsvägen, 576 91 Sävsjö',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vallsjö+Kyrka+Sävsjö',
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
    description: 'Cocktail',
  },

  dinnerParty: {
    title: 'Middag och fest',
    time: '17:00',
    place: 'Samma plats',
    description: 'Efter vigseln bjuder vi på middag och fest. Välkommen!',
  },

  goodToKnow: {
    title: 'Bra att veta',
    foodAndDrinks: 'Förrätt, huvudrätt och traditionsenlig bröllopstårta. Vi bjuder på dryck såväl under middagen som i baren efteråt.',
    hotels: 'Vi har blockerat rum på närliggande hotell. Ange rabattkod vid bokning.',
    hotelDiscountCode: 'BROLLOP2026',
    dressCode: 'Cocktail – Semi-formal klädsel. Damer: cocktailklänning (knälång eller något längre). Herrar: kostym eller kavaj med byxor.',
    children: 'Barn är underbara men den här dagen väljer vi att fira i vuxet sällskap. Spädbarn är självklart välkomna.',
    gifts: 'Er närvaro är den största gåvan. Om ni ändå vill ge något, välkomnar vi bidrag till vår bröllopsresa.',
  },

  toastmaster: {
    title: 'Toastmaster & Toastmadame',
    speechNote: 'Tal och spex ska anmälas till toastmastern i förväg.',
    imageUrl: '/images/toastmaster-madame.jpg',
    people: [
      { firstName: 'Benny', lastName: '', phone: '070-123 45 67', email: 'benny@example.com' },
      { firstName: 'Rebecka', lastName: '', phone: '070-123 45 68', email: 'rebecka@example.com' },
    ],
  },

  osa: {
    deadline: 'Senast 16 maj 2026',
    busInfo: 'Buss avgår från [plats] kl [tid] och tillbaka efter festen. Anmäl intresse i formuläret nedan.',
  },

  rsvpDeadline: 'Senast 16/05/2026',
}
