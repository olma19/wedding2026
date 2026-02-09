# E2E tests (Playwright)

End-to-end tests for the wedding site: homepage, full RSVP flow, and admin.

## Run

- **With dev server started by Playwright (default):**
  ```bash
  npm run test:e2e
  ```
  If you see "localhost:3000 is already used", either stop what’s using port 3000 or run with an existing server (below).

- **With dev server already running** (e.g. `npm run dev` in another terminal):
  ```bash
  PLAYWRIGHT_SKIP_WEBSERVER=1 npm run test:e2e
  ```

- **Interactive UI:**
  ```bash
  npm run test:e2e:ui
  ```

## What’s covered

- **Homepage:** Page loads, RSVP section and form visible GET `/api/rsvp/access` is stubbed so the form is always shown.
- **RSVP flow:** Submit “attending” and “not attending” RSVPs; POST `/api/rsvp` is stubbed so tests don’t need a real DB.
- **Admin:** Login form, wrong password error, correct password shows dashboard (stats, refresh, logout). Uses `ADMIN_PASSWORD` from env, or default `wedding2026` for local dev.

## Env

Playwright loads `.env` and `.env.local` (see `playwright.config.ts`). Admin tests use the same `ADMIN_PASSWORD` as the app so login works.

- **`ADMIN_PASSWORD`** – Admin login test uses this; default `wedding2026` if unset. Set in `.env` so the test and the app match.
- **RSVP tests** – GET `/api/rsvp/access` is stubbed to return "gate off", so the RSVP form is always shown in E2E regardless of `RSVP_INVITE_CODE` in the app.

## First-time setup

Install browsers (only once):

```bash
npx playwright install chromium
```

Or all browsers: `npx playwright install`.
