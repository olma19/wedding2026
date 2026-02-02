import { describe, it, expect } from 'vitest'
import { rsvpSchema } from './rsvp'

describe('rsvpSchema validation', () => {
  describe('valid RSVP data', () => {
    it('should validate a single attendee RSVP', () => {
      const validData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: 'John',
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate multiple attendees RSVP', () => {
      const validData = {
        attending: true,
        number_of_attendees: 2,
        attendees: [
          {
            firstname: 'John',
            lastname: 'Doe',
            allergies: 'Peanuts',
            wants_bus: true,
            song_request: 'Song 1',
          },
          {
            firstname: 'Jane',
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate non-attending RSVP', () => {
      const validData = {
        attending: false,
        number_of_attendees: 0,
        attendees: [],
      }
      
      const result = rsvpSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should allow optional fields to be empty strings', () => {
      const validData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: 'John',
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid RSVP data', () => {
    it('should reject missing firstname', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: '',
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors.some(e => e.path.includes('attendees') && e.path.includes('firstname'))).toBe(true)
      }
    })

    it('should reject missing lastname', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: 'John',
            lastname: '',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors.some(e => e.path.includes('attendees') && e.path.includes('lastname'))).toBe(true)
      }
    })

    it('should reject when number_of_attendees does not match attendees length', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 2,
        attendees: [
          {
            firstname: 'John',
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors.some(e => e.path.includes('attendees'))).toBe(true)
      }
    })

    it('should reject when attending but number_of_attendees is 0', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 0,
        attendees: [],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject number_of_attendees greater than 20', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 21,
        attendees: [],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors.some(e => e.path.includes('number_of_attendees'))).toBe(true)
      }
    })

    it('should reject negative number_of_attendees', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: -1,
        attendees: [],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject non-integer number_of_attendees', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 1.5,
        attendees: [],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject firstname longer than 100 characters', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: 'A'.repeat(101),
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject allergies longer than 500 characters', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: 'John',
            lastname: 'Doe',
            allergies: 'A'.repeat(501),
            wants_bus: false,
            song_request: '',
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject song_request longer than 200 characters', () => {
      const invalidData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: 'John',
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: 'A'.repeat(201),
          },
        ],
      }
      
      const result = rsvpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
