import { cookies } from 'next/headers'

/**
 * Check if user is authenticated as admin
 * Returns true if valid session exists
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  
  // In a real app, you'd verify the session token here
  // For now, we just check if it exists
  return !!session?.value
}

/**
 * Get admin session token (for client-side checks)
 */
export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session?.value || null
}
