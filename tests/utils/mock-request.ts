/**
 * Utilities for creating mock Next.js Request objects for API route testing
 */

import { NextRequest } from 'next/server'

/**
 * Create a mock NextRequest with JSON body
 */
export function createMockRequest(body: unknown, options?: {
  method?: string
  url?: string
  headers?: Record<string, string>
}): NextRequest {
  const url = options?.url || 'http://localhost:3000/api/rsvp'
  const method = options?.method || 'POST'
  
  const request = new NextRequest(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify(body),
  })
  
  return request
}

/**
 * Create a mock NextRequest with invalid JSON
 */
export function createMockRequestWithInvalidJSON(): NextRequest {
  const request = new NextRequest('http://localhost:3000/api/rsvp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: 'invalid json{',
  })
  
  return request
}

/**
 * Create a mock NextRequest without body
 */
export function createMockGetRequest(url?: string): NextRequest {
  return new NextRequest(url || 'http://localhost:3000/api/rsvp', {
    method: 'GET',
  })
}
