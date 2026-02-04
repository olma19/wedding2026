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
      'Er närvaro skulle göra vår dag ännu mer oförglömlig.',
    ],
  },

  dressCode: {
    title: 'Klädkod',
    description: 'Cocktail',
  },

  dinnerParty: {
    title: 'Middag och fest',
    time: '17:00',
    place: 'Wallsjö gårds loge',
    address: 'Wallsjö, 576 92 Sävsjö',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wallsjö+Gård+Sävsjö',
    description: 'Efter vigseln bjuder vi på mingel bröllopsmiddag och fest. Välkomna',
  },

  goodToKnow: {
    title: 'Bra att veta',
    dressCode: 'Cocktail – Semi-formal klädsel. Damer: cocktailklänning (knälång eller något längre). Herrar: kostym eller kavaj med byxor.',
    children: 'Barn är underbara men den här dagen väljer vi att fira i vuxet sällskap. Spädbarn är självklart välkomna.',
    hotels: 'Önskas boende rekommenderar vi Best Western hotell i Vrigstad. Boka genom att ringa till hotellet och uppge "Friskbröllop" för att ta del utav rabatterat pris.',
    transport: 'För boende på hotellet i Vrigstad finns möjligheten att bli upphämtade utav buss som går till vigseln, från vigseln till Wallsjö Gård och vid 02.00 tillbaka till hotellet. Anmälan till bussen gör ni genom att swisha 150:- per person till 0722132377. Ange BUSS som meddelande. Bocka även i att ni önskar åka buss i OSA.',
    parking: 'Parkering för bil finns antingen precis i anslutning till logen alternativt Vallsjö gamla kyrka som ligger på gångavstånd. Parkeringen kommer vara skyltad denna dag.',
    gifts: 'Er närvaro är den största gåvan. Om ni ändå vill ge något, välkomnar vi bidrag till vår bröllopsresa.',
  },

  toastmaster: {
    title: 'Toastmaster & Toastmadame',
    speechNote: 'Önskar du att hålla tal eller liknande under kvällen anmäl det i förväg till våran härliga toastmaster/toastmadame som vägleder dig.',
    imageUrl: '/images/toastmaster-madame.jpg',
    people: [
      { firstName: 'Rebecka', lastName: 'Larsson', phone: '0735-310921', email: 'Rebecka.larsson@optimera.se' },
      { firstName: 'Benny', lastName: 'Larsson', phone: '0730-573434' },
    ],
  },

  rsvp: {
    deadline: 'Senast 16 maj 2026',
    deadlineShort: 'Senast 16/05/2026',
    busInfo: 'Buss avgår från [plats] kl [tid] och tillbaka efter festen. Anmäl intresse i formuläret nedan.',
  },

  // Color scheme: Change this to 'pink', 'rose', 'purple', 'blue', 'teal', 'green', 'sage', or 'red' to update the entire site's color theme
  colorScheme: 'sage',
  
  // Decoration type: 'flower' for flower decorations, 'leaf' for leaf decorations with variants
  decorationType: 'flower',
}
