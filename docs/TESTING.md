# Testing guide

This project uses **unit tests** (Vitest + React Testing Library) and **E2E tests** (Playwright). This doc describes how to run them, what they cover, and how to add or change tests.

## Quick reference

| Goal | Command |
|------|--------|
| Unit tests (watch) | `npm test` |
| Unit tests (once) | `npm run test:run` |
| Unit test coverage | `npm run test:coverage` |
| Unit test UI | `npm run test:ui` |
| E2E tests | `npm run test:e2e` |
| E2E with existing server | `PLAYWRIGHT_SKIP_WEBSERVER=1 npm run test:e2e` |
| E2E UI mode | `npm run test:e2e:ui` |

More detail: [Unit tests](#unit-tests-vitest) and [E2E tests](#e2e-tests-playwright) below.

---

## Unit tests (Vitest)

Unit tests run in Node with jsdom. They don’t start the Next.js server.

### Setup

- **Runner:** [Vitest](https://vitest.dev/)
- **React:** [React Testing Library](https://testing-library.com/react) + `@testing-library/jest-dom`
- **Config:** `vitest.config.ts`
- **Global setup:** `tests/setup.ts` (cleanup, Next.js router/image mocks, `matchMedia`, `IntersectionObserver`, `ResizeObserver`)

### Where tests live

Tests sit next to the code they test, with names `*.test.ts` or `*.test.tsx` (or `*.spec.*`). Vitest includes everything under the project except `node_modules`, `.next`, and `dist`.

| Area | Test file | What it covers |
|------|-----------|----------------|
| Utils | `lib/utils/classNames.test.ts` | `cn()` / classNames helper |
| Validation | `lib/validations/rsvp.test.ts` | RSVP Zod schema, defaults, refinements |
| Decorations | `lib/decorations/variations.test.ts` | Decoration variation logic |
| API | `app/api/rsvp/route.test.ts` | POST/GET `/api/rsvp` (validation, auth, DB error handling) |
| Hooks | `hooks/useRSVPSubmission.test.ts` | Submit flow, success/error state, reset |
| Forms | `components/forms/FormField.test.tsx` | FormField rendering and props |
| Forms | `components/forms/GuestCountSelector.test.tsx` | Guest count selector behavior |
| RSVP form | `components/RSVPForm.test.tsx` | Form render, validation, submit button |
| Sections | `components/sections/SectionWrapper.test.tsx` | SectionWrapper with title and content |
| UI | `components/ui/Card.test.tsx` | Card and subcomponents |
| UI | `components/ui/Skeleton.test.tsx` | Skeleton component |
| UI | `components/DetailCard.test.tsx` | DetailCard with icon and content |
| Error | `components/ErrorBoundary.test.tsx` | Error boundary catch and fallback UI |

### Test helpers

- **`tests/setup.ts`** – Global mocks and `afterEach(cleanup)`.
- **`tests/utils/render.tsx`** – `customRender(ui, { colorScheme })` that wraps with `ColorSchemeProvider` (use this instead of RTL `render` when the component needs theme).
- **`tests/utils/mock-request.ts`** – Helpers for building `NextRequest` in API route tests.
- **`tests/utils/test-utils.ts`** – Re-exports from Testing Library and custom render.

Use `customRender` from `tests/utils/render.tsx` (or re-exported from `test-utils`) for any component that uses `useColors()` or other theme-dependent behavior.

### Running unit tests

```bash
npm test              # Watch mode (re-runs on file changes)
npm run test:run      # Single run (e.g. for CI)
npm run test:coverage # Coverage report (text + html in coverage/)
npm run test:ui       # Vitest UI in the browser
```

### Conventions

- Prefer **user-centric queries**: `getByRole`, `getByLabelText`, `getByPlaceholderText` over `getByTestId` when the behavior is visible to the user.
- Use **`data-testid`** only when role/label isn’t stable or is hard to express (e.g. in E2E we use `rsvp-form`, `rsvp-success`, `admin-login-form`, `admin-dashboard`).
- **Mock external deps**: Next.js (`next/navigation`, `next/image`), fetch in hooks, Supabase in API tests. See `tests/setup.ts` and existing `*.test.ts(x)` for patterns.
- **API route tests**: Use `tests/utils/mock-request.ts` and the same `errorResponse` / `successResponse` shape as the real routes.

---

## E2E tests (Playwright)

E2E tests run in a real browser against the running app (usually `npm run dev` on port 3000).

### Setup

- **Runner:** [Playwright](https://playwright.dev/)
- **Config:** `playwright.config.ts` (baseURL, webServer, Chromium)
- **Tests:** `e2e/*.spec.ts`

Full runbook: **[e2e/README.md](../e2e/README.md)** (how to run, env, first-time browser install).

### What’s covered

| Spec | Tests |
|------|--------|
| **e2e/homepage.spec.ts** | Page loads; RSVP section and heading; RSVP form visible when invite gate is off. |
| **e2e/rsvp-flow.spec.ts** | Attending RSVP (one guest, name + email, submit → success); non-attending RSVP (name, submit → success). POST `/api/rsvp` is stubbed so no real DB is needed. |
| **e2e/admin.spec.ts** | Login form when unauthenticated; wrong password shows error; correct password shows dashboard; dashboard has “Uppdatera” and “Logga ut”. |

### Running E2E

```bash
npm run test:e2e       # Start dev server if needed (or reuse if port 3000 is free)
npm run test:e2e:ui    # Interactive Playwright UI
```

If you see “localhost:3000 is already used”, either stop the process on that port or run with an existing server:

```bash
PLAYWRIGHT_SKIP_WEBSERVER=1 npm run test:e2e
```

### E2E conventions

- **Selectors:** Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`; use `getByTestId` for stable hooks (e.g. `rsvp-form`, `admin-dashboard`).
- **API stubbing:** RSVP flow specs stub `**/api/rsvp` (POST → 201) so tests don’t depend on Supabase.
- **Admin:** Tests use `ADMIN_PASSWORD` from env, or the app default (e.g. `wedding2026`) when unset.

---

## Adding or changing tests

### New unit test

1. Add a file next to the module: `MyModule.test.ts` or `MyModule.test.tsx`.
2. Import from `vitest` (`test`, `expect`, `describe`, `vi`) and from `@testing-library/react` (and `tests/utils/render.tsx` or `test-utils` if you need theme).
3. For components using `useColors()`, wrap with `customRender(<Component />, { colorScheme: 'sage' })` (or omit for default).
4. Run `npm test` and add or adjust assertions.

### New E2E test

1. Add or extend a spec in `e2e/`, e.g. `e2e/my-feature.spec.ts`.
2. Use `page.goto('/path')`, then `page.getByRole(...)` / `getByTestId(...)` and `expect(...).toBeVisible()` etc.
3. To avoid a real backend, use `page.route('**/api/...', ...)` to stub responses.
4. Run `npm run test:e2e` (or with `PLAYWRIGHT_SKIP_WEBSERVER=1` if the server is already running).

### New data-testid

Use sparingly. Add `data-testid="my-key"` when:

- The element has no clear role/label (e.g. a wrapper used only for E2E or layout), or
- The copy is likely to change and the test should stay stable.

Document the id in this file or in `e2e/README.md` if it’s part of the “public” E2E surface.

---

## CI

- **Unit:** Run `npm run test:run` (single run, no watch).
- **E2E:** Run `npm run test:e2e`; in CI, `process.env.CI` is set so Playwright starts the dev server and does not reuse an existing one. Ensure port 3000 is free in the CI environment (or set `PLAYWRIGHT_SKIP_WEBSERVER=1` and start the app in a prior step).

---

## Related docs

- [CODEBASE.md](./CODEBASE.md) – Run commands and “where to change” (includes testing).
- [e2e/README.md](../e2e/README.md) – E2E run instructions and env.
- [ARCHITECTURE.md](./ARCHITECTURE.md) – Data flows and structure (helps decide what to unit-test vs E2E).
