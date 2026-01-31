export interface WeddingDate {
  day: string
  date: string
  month: string
  year: string
  fullDate: string
  shortDate: string
}

export interface Ceremony {
  time: string
  description: string
}

export interface Location {
  name: string
  address: string
  fullAddress?: string
  city?: string
  /** Prefer link to Google Maps for the ceremony/reception address */
  mapUrl?: string
}

export interface Couple {
  name1: string
  name2: string
}

export interface Story {
  paragraphs: string[]
}

export interface DressCode {
  title: string
  description: string
}

export interface Hero {
  introText: string
  imageUrl?: string
}

/** Dinner and party (middag och fest) */
export interface DinnerParty {
  title: string
  time?: string
  place?: string
  description: string
}

/** Good to know: food/drinks, hotels, dress code, children, gifts */
export interface GoodToKnow {
  title: string
  foodAndDrinks: string
  hotels: string
  /** Discount code for hotels */
  hotelDiscountCode?: string
  dressCode: string
  /** e.g. "Festen är utan barn" */
  children: string
  gifts: string
}

/** Toastmaster / Toast madame – speeches must be announced to them */
export interface Toastmaster {
  title: string
  /** Short note that speeches must be announced to them */
  speechNote: string
  /** Shared image for both toastmaster and toast madame */
  imageUrl?: string
  /** Toastmaster and toast madame information */
  people?: Array<{
    firstName: string
    lastName: string
    phone?: string
    email?: string
  }>
}

/** OSA (RSVP): bus info shown when guest selects bus transport */
export interface OSA {
  deadline: string
  /** Shown when guest selects "transport with bus" = yes */
  busInfo: string
}

export interface WeddingConfig {
  date: WeddingDate
  ceremony: Ceremony
  location: Location
  couple: Couple
  hero: Hero
  story: Story
  rsvpDeadline: string
  dressCode?: DressCode
  /** Dinner and party section */
  dinnerParty: DinnerParty
  /** Good to know (food, hotels, dress code, children) */
  goodToKnow: GoodToKnow
  /** Toastmaster / Toast madame with images and speech note */
  toastmaster: Toastmaster
  /** OSA form: deadline and bus info */
  osa: OSA
}
