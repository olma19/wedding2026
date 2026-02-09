import { test, expect } from '@playwright/test'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wedding2026'

test.describe('Admin', () => {
  test('shows login form when not authenticated', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByTestId('admin-login-form')).toBeVisible()
    await expect(page.getByRole('heading', { name: /admin login/i })).toBeVisible()
    await expect(page.getByPlaceholder(/ange lösenord/i)).toBeVisible()
  })

  test('wrong password shows error', async ({ page }) => {
    await page.goto('/admin')
    await page.getByPlaceholder(/ange lösenord/i).fill('wrong-password')
    await page.getByRole('button', { name: /logga in/i }).click()
    await expect(page.getByText(/fel lösenord/i)).toBeVisible({ timeout: 5000 })
    await expect(page.getByTestId('admin-login-form')).toBeVisible()
  })

  test('correct password shows dashboard', async ({ page }) => {
    await page.goto('/admin')
    await page.getByPlaceholder(/ange lösenord/i).fill(ADMIN_PASSWORD)
    await page.getByRole('button', { name: /logga in/i }).click()

    await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText(/RSVP-lista/i)).toBeVisible()
  })

  test('dashboard has stats and refresh', async ({ page }) => {
    await page.goto('/admin')
    await page.getByPlaceholder(/ange lösenord/i).fill(ADMIN_PASSWORD)
    await page.getByRole('button', { name: /logga in/i }).click()

    await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByRole('button', { name: /uppdatera/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /logga ut/i })).toBeVisible()
  })
})
