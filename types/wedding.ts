export interface WeddingDate {
  day: string
  date: string
  month: string
  year: string
  fullDate: string
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
  mapUrl?: string
}

export interface Couple {
  name1: string
  name2: string
}

export interface Story {
  paragraphs: string[]
}

export interface WeddingConfig {
  date: WeddingDate
  ceremony: Ceremony
  location: Location
  couple: Couple
  story: Story
  rsvpDeadline: string
}
