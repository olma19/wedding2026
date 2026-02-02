import { NextResponse } from 'next/server'
import type { ApiResponse } from './errorHandler'
import { createErrorResponse, createSuccessResponse } from './errorHandler'

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

/**
 * Handle async route handlers with error catching
 */
export async function handleRoute<T>(
  handler: () => Promise<T>,
  errorHandler?: (err: unknown) => NextResponse
): Promise<NextResponse> {
  try {
    const data = await handler()
    return successResponse(data)
  } catch (err) {
    if (errorHandler) {
      return errorHandler(err)
    }
    return errorResponse(
      'Ett fel uppstod',
      err instanceof Error ? err.message : 'Okänt fel',
      500
    )
  }
}
