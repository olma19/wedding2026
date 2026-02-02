/**
 * API Error Handling Utilities
 * Provides standardized error handling and response formatting
 */

export interface ApiError {
  error: string
  details?: string
  code?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
}

/**
 * Standard error codes
 */
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  error: string,
  details?: string,
  code?: ErrorCode
): ApiResponse {
  return {
    success: false,
    error: {
      error,
      details,
      code: code || ErrorCode.INTERNAL_ERROR,
    },
  }
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  }
}

/**
 * Handle and format validation errors
 */
export function handleValidationError(err: unknown): ApiResponse {
  if (err instanceof Error) {
    return createErrorResponse(
      'Valideringsfel',
      err.message,
      ErrorCode.VALIDATION_ERROR
    )
  }
  return createErrorResponse(
    'Valideringsfel',
    'Okänt valideringsfel',
    ErrorCode.VALIDATION_ERROR
  )
}

/**
 * Handle database errors
 */
export function handleDatabaseError(err: unknown): ApiResponse {
  console.error('Database error:', err)
  const message = err instanceof Error ? err.message : 'Databasfel'
  return createErrorResponse(
    'Databasfel',
    message,
    ErrorCode.DATABASE_ERROR
  )
}

/**
 * Handle unknown errors
 */
export function handleUnknownError(err: unknown): ApiResponse {
  console.error('Unknown error:', err)
  const message = err instanceof Error ? err.message : 'Ett oväntat fel uppstod'
  return createErrorResponse(
    'Serverfel',
    message,
    ErrorCode.INTERNAL_ERROR
  )
}
