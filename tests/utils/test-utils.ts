/**
 * Common test utilities and helpers
 */

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/**
 * Wait for an element to appear in the DOM
 */
export async function waitForElement(selector: string) {
  return waitFor(() => {
    const element = document.querySelector(selector)
    if (!element) {
      throw new Error(`Element with selector "${selector}" not found`)
    }
    return element
  })
}

/**
 * Get user event instance (for user interactions)
 */
export function getUserEvent() {
  return userEvent.setup()
}

/**
 * Helper to find element by text content
 */
export function findByText(text: string | RegExp) {
  return screen.findByText(text)
}

/**
 * Helper to get element by text content
 */
export function getByText(text: string | RegExp) {
  return screen.getByText(text)
}

/**
 * Helper to query element by text content
 */
export function queryByText(text: string | RegExp) {
  return screen.queryByText(text)
}

/**
 * Helper to get element by role
 */
export function getByRole(role: string, options?: any) {
  return screen.getByRole(role, options)
}

/**
 * Helper to find element by role
 */
export function findByRole(role: string, options?: any) {
  return screen.findByRole(role, options)
}

/**
 * Helper to query element by role
 */
export function queryByRole(role: string, options?: any) {
  return screen.queryByRole(role, options)
}

/**
 * Helper to get element by label text
 */
export function getByLabelText(text: string | RegExp) {
  return screen.getByLabelText(text)
}

/**
 * Helper to find element by label text
 */
export function findByLabelText(text: string | RegExp) {
  return screen.findByLabelText(text)
}

/**
 * Helper to query element by label text
 */
export function queryByLabelText(text: string | RegExp) {
  return screen.queryByLabelText(text)
}

/**
 * Helper to get element by placeholder text
 */
export function getByPlaceholderText(text: string | RegExp) {
  return screen.getByPlaceholderText(text)
}

/**
 * Helper to find element by placeholder text
 */
export function findByPlaceholderText(text: string | RegExp) {
  return screen.findByPlaceholderText(text)
}

/**
 * Helper to query element by placeholder text
 */
export function queryByPlaceholderText(text: string | RegExp) {
  return screen.queryByPlaceholderText(text)
}

/**
 * Helper to get all elements by role
 */
export function getAllByRole(role: string, options?: any) {
  return screen.getAllByRole(role, options)
}

/**
 * Helper to query all elements by role
 */
export function queryAllByRole(role: string, options?: any) {
  return screen.queryAllByRole(role, options)
}

/**
 * Wait for async operation to complete
 */
export async function waitForAsync() {
  return waitFor(() => Promise.resolve())
}

/**
 * Mock window.scrollTo
 */
export function mockScrollTo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.scrollTo = (() => {}) as any
}

/**
 * Create a mock function
 */
export function createMockFn() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (() => {}) as any
}

// Re-export userEvent for convenience
export { userEvent }
