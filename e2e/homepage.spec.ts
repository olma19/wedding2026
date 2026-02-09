import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads and shows main content', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/wedding|bröllop|2026/i)
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('RSVP section is present and has heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /OSA/i }).first()).toBeVisible()
  })

  test('RSVP form becomes visible', async ({ page }) => {
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
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /OSA/ }).first()).toBeVisible({ timeout: 15_000 })
    await page.locator('#rsvp').scrollIntoViewIfNeeded()
    const form = page.getByTestId('rsvp-form')
    await expect(form).toBeVisible({ timeout: 15_000 })
  })
})
