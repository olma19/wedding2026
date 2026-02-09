import { test, expect } from '@playwright/test'

/**
 * Stub GET /api/rsvp/access so the RSVP section shows the form (no invite gate).
 * Call before goto so the section's fetch gets the stubbed response.
 */
async function stubRsvpAccessGate(page: import('@playwright/test').Page) {
  await page.route('**/api/rsvp/access', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ gateEnabled: false, allowed: true }),
      })
    } else {
      await route.continue()
    }
  })
}

/**
 * Wait for RSVP section to load (lazy-loaded), then wait for the form.
 * Uses stubRsvpAccessGate so the form is always shown regardless of app env.
 */
async function ensureRsvpFormVisible(page: import('@playwright/test').Page) {
  await stubRsvpAccessGate(page)
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /OSA/ }).first()).toBeVisible({ timeout: 15_000 })
  await page.locator('#rsvp').scrollIntoViewIfNeeded()
  const form = page.getByTestId('rsvp-form')
  await expect(form).toBeVisible({ timeout: 15_000 })
}

/**
 * Full RSVP flow: fill form and submit.
 * Stubs POST /api/rsvp so the test does not require a real database.
 * If RSVP_INVITE_CODE is set in the app, set RSVP_INVITE_CODE in env for tests to pass the gate.
 */
test.describe('RSVP flow', () => {
  test('submit attending RSVP with one guest shows success', async ({ page }) => {
    await page.route('**/api/rsvp', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: { message: 'RSVP skickad framgångsrikt', data: { id: 'test-1' } },
          }),
        })
      } else {
        await route.continue()
      }
    })

    await ensureRsvpFormVisible(page)

    const form = page.getByTestId('rsvp-form')
    await form.scrollIntoViewIfNeeded()
    await form.getByText(/ja, jag kommer/i).click()

    // One guest: fill first and last name
    await page.getByPlaceholder(/förnamn/i).first().fill('E2E')
    await page.getByPlaceholder(/efternamn/i).first().fill('Testsson')

    // Email (optional but good to have)
    await page.getByPlaceholder(/din@epost/i).fill('e2e@example.com')

    // Submit
    await page.getByRole('button', { name: /skicka OSA/i }).click()

    await expect(page.getByTestId('rsvp-success')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /tack för ditt svar/i })).toBeVisible()
  })

  test('submit non-attending RSVP shows success', async ({ page }) => {
    await page.route('**/api/rsvp', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: { message: 'RSVP skickad framgångsrikt', data: { id: 'test-2' } },
          }),
        })
      } else {
        await route.continue()
      }
    })

    await ensureRsvpFormVisible(page)

    const form = page.getByTestId('rsvp-form')
    await form.scrollIntoViewIfNeeded()
    await form.getByText(/nej, jag kan tyvärr inte/i).click()

    await page.getByPlaceholder(/förnamn/i).first().fill('Nej')
    await page.getByPlaceholder(/efternamn/i).first().fill('Kommer')

    await page.getByRole('button', { name: /skicka OSA/i }).click()

    await expect(page.getByTestId('rsvp-success')).toBeVisible({ timeout: 15_000 })
  })
})
