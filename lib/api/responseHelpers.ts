import { NextResponse } from 'next/server'

import { createErrorResponse, createSuccessResponse } from './errorHandler'
import type { ApiResponse } from './errorHandler'

/**
 * Create a Next.js JSON response from an ApiResponse
 */
export function jsonResponse<T>(response: ApiResponse<T>, status: number = 200): NextResponse {
  return NextResponse.json(response, { status })
}

/**
 * Create a success JSON response
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return jsonResponse(createSuccessResponse(data), status)
}

/**
 * Create an error JSON response
 */
export function errorResponse(
  error: string,
  details?: string,
  status: number = 400
): NextResponse {
  return jsonResponse(createErrorResponse(error, details), status)
}
