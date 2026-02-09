import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

// Load .env so tests use the same ADMIN_PASSWORD etc. as the app (when running locally)
dotenv.config()
dotenv.config({ path: '.env.local' })

/**
 * Playwright E2E config. Runs against the Next.js dev server.
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 90_000,
        stdout: 'ignore',
        stderr: 'pipe',
      },
})
