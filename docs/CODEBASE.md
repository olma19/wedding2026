# Codebase overview – how to work on this repo

Short guide for contributors and future you: where things live and how to change them.

## Start here

- **Architecture and patterns:** [ARCHITECTURE.md](./ARCHITECTURE.md) – project structure, data flows, config, “Where to change” table.
- **Testing:** [TESTING.md](./TESTING.md) – unit (Vitest) and E2E (Playwright) tests, how to run, what’s covered, how to add tests.
- **UI components:** [COMPONENT_MIGRATION_PLAN.md](./COMPONENT_MIGRATION_PLAN.md) – shadcn migration, `cn` usage, theming.
- **Security:** [SECURITY_CHECKLIST.md](../SECURITY_CHECKLIST.md) (repo root) – env vars, auth, rate limiting, error messages.
- **CI/CD:** [CI_CD.md](./CI_CD.md) – GitHub Actions (lint, unit, E2E) and Vercel (build, optional “run tests before deploy”).

## Conventions

- **Class names:** Use `cn()` from `@/lib/utils` for all class composition (see ARCHITECTURE).
- **Section titles:** Single source in `config/section-texts.ts`; use `getSectionTitle(sectionId)`. Do not put titles in `config/sections.ts`.
- **Types:** Wedding *form config* (deadline, bus info) is `RsvpConfig` in `types/wedding.ts`. API/DB RSVP model is `RSVP` in `types/rsvp.ts` – don’t mix them.
- **Admin:** UI lives under `app/admin/`: `page.tsx`, `useAdminRSVPs.ts`, `types.ts` at top level; components in `app/admin/components/`; shared helpers in `app/admin/lib/`.

## Quick “where to change” reference

| You want to… | See / edit |
|--------------|------------|
| Section title or copy | `config/section-texts.ts` |
| Wedding content (date, location, dinner, good-to-know) | `config/wedding.ts` |
| Add/remove/reorder sections | `config/sections.ts` + section id in `sectionTexts` |
| RSVP form fields / validation | `types/rsvp.ts`, `lib/validations/rsvp.ts`, API route, `lib/rsvp/` |
| Admin table columns (person/song) | `app/admin/components/AdminPersonTable.tsx`, `AdminSongTable.tsx`; `app/admin/types.ts`, `lib/rsvp/mapRsvpToAdmin.ts` |
| RSVP invite gate (on/off, copy) | Env `RSVP_INVITE_CODE`; copy in `section-texts.ts` → `rsvp.inviteGate`; logic in `lib/auth/guest.ts`, `app/api/rsvp/access/route.ts`, `RSVPSection.tsx` |

Full table and feature index: [ARCHITECTURE.md – Where to change / Key files](./ARCHITECTURE.md).

## Running and testing

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Unit tests: `npm test` or `npm run test:run` — see [TESTING.md](./TESTING.md).
- E2E tests: `npm run test:e2e` — see [TESTING.md](./TESTING.md) and [e2e/README.md](../e2e/README.md).
- Lint: `npm run lint`
