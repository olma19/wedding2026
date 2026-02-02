import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST, GET } from './route'
import { createMockRequest, createMockRequestWithInvalidJSON, createMockGetRequest } from '@/tests/utils/mock-request'
import type { RSVPFormData } from '@/lib/validations/rsvp'

// Mock Supabase - create mocks inside factory
vi.mock('@/lib/supabase/server', () => {
  const mockInsert = vi.fn()
  const mockSelect = vi.fn()
  const mockFrom = vi.fn(() => ({
    insert: mockInsert,
    select: mockSelect,
  }))
  
  return {
    supabaseAdmin: {
      from: mockFrom,
      // Store mocks for test access via a getter
      _mocks: { mockInsert, mockSelect, mockFrom },
    },
  }
})

// Mock admin authentication
vi.mock('@/lib/auth/admin', () => ({
  isAdminAuthenticated: vi.fn(),
}))

// Import after mocks
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAdminAuthenticated } from '@/lib/auth/admin'

// Get mock functions
const getMocks = () => (supabaseAdmin as any)._mocks || {}

describe('POST /api/rsvp', () => {
  const validRSVPData: RSVPFormData = {
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

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Success cases', () => {
    it('should successfully create an RSVP', async () => {
      const mocks = getMocks()
      const mockData = { id: '123', guest_name: 'John Doe', ...validRSVPData }
      const mockSingle = vi.fn().mockResolvedValue({ data: mockData, error: null })
      
      mocks.mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      })

      const request = createMockRequest(validRSVPData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(201)
      expect(json.success).toBe(true)
      expect(json.data.message).toBe('OSA skickad framgångsrikt')
      expect(mocks.mockFrom).toHaveBeenCalledWith('rsvps')
      expect(mocks.mockInsert).toHaveBeenCalled()
    })

    it('should handle multiple attendees', async () => {
      const mocks = getMocks()
      const multiAttendeeData: RSVPFormData = {
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

      const mockData = { id: '123', guest_name: 'John Doe, Jane Doe', ...multiAttendeeData }
      const mockSingle = vi.fn().mockResolvedValue({ data: mockData, error: null })
      
      mocks.mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      })

      const request = createMockRequest(multiAttendeeData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(201)
      expect(json.success).toBe(true)
      expect(mocks.mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          guest_name: 'John Doe, Jane Doe',
          number_of_attendees: 2,
        })
      )
    })

    it('should handle non-attending RSVP', async () => {
      const mocks = getMocks()
      const nonAttendingData: RSVPFormData = {
        attending: false,
        number_of_attendees: 0,
        attendees: [],
      }

      const mockData = { id: '123', guest_name: 'Ej deltagande', ...nonAttendingData }
      const mockSingle = vi.fn().mockResolvedValue({ data: mockData, error: null })
      
      mocks.mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      })

      const request = createMockRequest(nonAttendingData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(201)
      expect(json.success).toBe(true)
      expect(mocks.mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          guest_name: 'Ej deltagande',
          attending: false,
        })
      )
    })
  })

  describe('Validation errors', () => {
    it('should reject invalid JSON', async () => {
      const request = createMockRequestWithInvalidJSON()
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(400)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Ogiltig JSON i request body')
    })

    it('should reject missing required fields', async () => {
      const invalidData = {
        attending: true,
        // Missing number_of_attendees and attendees
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(400)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Valideringsfel')
    })

    it('should reject invalid attendee data', async () => {
      const invalidData: RSVPFormData = {
        attending: true,
        number_of_attendees: 1,
        attendees: [
          {
            firstname: '', // Missing required field
            lastname: 'Doe',
            allergies: '',
            wants_bus: false,
            song_request: '',
          },
        ],
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(400)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Valideringsfel')
    })

    it('should reject when number_of_attendees does not match attendees length', async () => {
      const invalidData: RSVPFormData = {
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

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(400)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Valideringsfel')
    })
  })

  describe('Environment variable errors', () => {
    it('should return error when Supabase URL is missing', async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key'

      const request = createMockRequest(validRSVPData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Serverkonfigurationsfel')
      expect(json.error?.details).toContain('Databasen är inte konfigurerad')
    })

    it('should return error when service key is missing', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      delete process.env.SUPABASE_SERVICE_ROLE_KEY

      const request = createMockRequest(validRSVPData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Serverkonfigurationsfel')
    })
  })

  describe('Database errors', () => {
    it('should handle database connection errors', async () => {
      const mocks = getMocks()
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'ENOTFOUND supabase.co' },
      })
      
      mocks.mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      })

      const request = createMockRequest(validRSVPData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(503)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Databasanslutningsfel')
    })

    it('should handle generic database errors', async () => {
      const mocks = getMocks()
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database constraint violation' },
      })
      
      mocks.mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      })

      const request = createMockRequest(validRSVPData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBeDefined()
    })

    it('should handle fetch failed errors', async () => {
      const mocks = getMocks()
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'fetch failed' },
      })
      
      mocks.mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      })

      const request = createMockRequest(validRSVPData)
      const response = await POST(request)
      const json = await response.json()

      expect(response.status).toBe(503)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Databasanslutningsfel')
    })
  })
})

describe('GET /api/rsvp', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Authentication', () => {
    it('should return 401 when not authenticated', async () => {
      vi.mocked(isAdminAuthenticated).mockResolvedValue(false)

      const request = createMockGetRequest()
      const response = await GET(request)
      const json = await response.json()

      expect(response.status).toBe(401)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Obehörig - Adminåtkomst krävs')
      const mocks = getMocks()
      expect(mocks.mockFrom).not.toHaveBeenCalled()
    })

    it('should allow access when authenticated', async () => {
      vi.mocked(isAdminAuthenticated).mockResolvedValue(true)
      const mocks = getMocks()
      
      const mockData = [
        { id: '1', guest_name: 'John Doe', attending: true },
        { id: '2', guest_name: 'Jane Doe', attending: false },
      ]
      
      mocks.mockSelect.mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: mockData,
          error: null,
        }),
      })

      const request = createMockGetRequest()
      const response = await GET(request)
      const json = await response.json()

      expect(response.status).toBe(200)
      expect(json.success).toBe(true)
      expect(json.data.data).toEqual(mockData)
      expect(mocks.mockFrom).toHaveBeenCalledWith('rsvps')
    })
  })

  describe('Success cases', () => {
    it('should return RSVPs ordered by created_at descending', async () => {
      vi.mocked(isAdminAuthenticated).mockResolvedValue(true)
      const mocks = getMocks()
      
      const mockData = [
        { id: '1', guest_name: 'John Doe', created_at: '2026-01-15T10:00:00Z' },
        { id: '2', guest_name: 'Jane Doe', created_at: '2026-01-14T10:00:00Z' },
      ]
      
      const mockOrder = vi.fn().mockResolvedValue({
        data: mockData,
        error: null,
      })
      
      mocks.mockSelect.mockReturnValue({
        order: mockOrder,
      })

      const request = createMockGetRequest()
      const response = await GET(request)
      const json = await response.json()

      expect(response.status).toBe(200)
      expect(json.success).toBe(true)
      expect(json.data.data).toEqual(mockData)
      expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false })
    })
  })

  describe('Database errors', () => {
    it('should handle database connection errors', async () => {
      vi.mocked(isAdminAuthenticated).mockResolvedValue(true)
      const mocks = getMocks()
      
      mocks.mockSelect.mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'ENOTFOUND supabase.co' },
        }),
      })

      const request = createMockGetRequest()
      const response = await GET(request)
      const json = await response.json()

      expect(response.status).toBe(503)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBe('Databasanslutningsfel')
    })

    it('should handle generic database errors', async () => {
      vi.mocked(isAdminAuthenticated).mockResolvedValue(true)
      const mocks = getMocks()
      
      mocks.mockSelect.mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      })

      const request = createMockGetRequest()
      const response = await GET(request)
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.success).toBe(false)
      expect(json.error?.error).toBeDefined()
    })
  })
})
