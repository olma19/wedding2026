# Architecture Overview

This document describes the architecture and structure of the wedding website project.

## Project Structure

```
wedding2026/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── decorations/       # Decoration showcase page
│   └── page.tsx           # Main landing page
├── components/            # React components
│   ├── forms/            # Form components
│   ├── sections/         # Section components
│   └── ...               # Other components
├── config/               # Configuration files
├── hooks/                # Custom React hooks
├── lib/                  # Library utilities
│   ├── api/              # API utilities
│   ├── colors/           # Color scheme utilities
│   ├── decorations/      # Decoration utilities
│   └── utils/            # General utilities
├── types/                # TypeScript type definitions
└── public/              # Static assets
```

## Key Architectural Patterns

### 1. Component Composition

- **SectionWrapper**: Provides consistent structure for all sections
- **FlowerDecoration**: Factory component that dispatches to specific decoration types
- **Form Components**: Composed of smaller, reusable components (FormField, PersonFormSection, etc.)

### 2. Configuration-Driven Development

- **wedding.ts**: Central configuration for all wedding-related data
- **Color Schemes**: Centralized color management with theme support
- **Section Configuration**: Sections can be enabled/disabled via config

### 3. Separation of Concerns

- **Hooks**: Business logic extracted to custom hooks (useRSVPSubmission, useFormGradients)
- **Utilities**: Reusable functions in `lib/utils/`
- **API Layer**: Standardized error handling and response formatting

### 4. Type Safety

- Comprehensive TypeScript types in `types/` directory
- Type-safe API responses
- Strongly typed form data

## Component Hierarchy

```
Page (app/page.tsx)
├── HeroSection
├── CountdownSection
├── SectionWrapper
│   ├── SectionTitle
│   └── Section Content
│       └── ScrollAnimation
└── RSVPForm
    ├── GuestCountSelector
    └── PersonFormSection[]
        └── FormField[]
```

## Data Flows

### RSVP flow (guest submission)
1. **Access gate (optional)**: If `RSVP_INVITE_CODE` is set, `RSVPSection` first calls GET `/api/rsvp/access`. If `gateEnabled: true` and the user has no valid cookie, it shows an invite-code form; POST `/api/rsvp/access` with correct code sets a signed cookie (`lib/auth/guest.ts`). If `gateEnabled: false` (env not set), the form is shown directly.
2. **Form**: `RSVPForm` uses `getDefaultRsvpFormValues()` and `rsvpSchema` from `lib/validations/rsvp.ts`.
3. **Submit**: `useRSVPSubmission` sends POST to `/api/rsvp` with camelCase payload (`RSVPFormData`). The API requires valid guest access (when the gate is enabled) or returns 403.
4. **API**: `app/api/rsvp/route.ts` checks `isGuestAllowed()`, validates with Zod, builds `guest_name` via `buildGuestName()` from `lib/rsvp`, maps to DB (snake_case), inserts into Supabase.
5. **Naming**: Form/validation use camelCase; API/DB use snake_case; mapping happens in the API route.

### Admin flow (viewing RSVPs)
1. **Auth**: Admin page checks session via GET `/api/rsvp`; login via POST `/api/admin/login`.
2. **Fetch**: `useAdminRSVPs` GETs `/api/rsvp`, parses with `parseRsvpListResponse()` from `lib/rsvp`.
3. **View models**: `rsvpsToPersonRows(rsvps)` and `getUniqueSongs(personRows)` from `lib/rsvp` produce admin table data.
4. **UI**: `AdminRSVPTable` shows either `AdminSongTable` (when filter = songRequests) or `AdminPersonTable`; both are presentational.

### Config flow
1. **Wedding data**: `config/wedding.ts` is validated at load by `lib/config/validate.ts` (required keys).
2. **Section texts**: `config/section-texts.ts` provides all copy; components import `sectionTexts`.
3. **Sections**: `config/sections.ts` defines enabled sections and order; `SectionRegistry` renders them. **Contract:** section `id` in `sections.ts` must match the key used in `sectionTexts` (e.g. `ceremony`, `dinner-party`, `good-to-know`, `rsvp`).
4. **Color scheme**: `ColorSchemeProvider` + `useColors()`; wedding config sets `colorScheme`.

### Other flows
- **Color Scheme**: `ColorSchemeProvider` → All components via `useColors()`
- **Decoration Variations**: `FlowerDecoration` → `getVariedLeafDecoration()` → `LeafDecoration`

## Key Design Decisions

### Why SectionWrapper?

- Eliminates ~200 lines of duplicated code
- Ensures consistent section structure
- Makes adding new sections trivial (< 10 lines)

### Why Extract Form Logic?

- RSVPForm was 360+ lines, now ~160 lines
- Better testability
- Reusable submission logic

### Why Centralize Gradients?

- Single source of truth for form styling
- Easy to update across all forms
- Consistent with color scheme system

## Current Architecture Status

**Last Updated:** February 2, 2026

### Completed Refactoring

- ✅ SectionWrapper component reduces duplication (~200 lines saved)
- ✅ RSVPForm broken down into smaller components (~200 lines saved)
- ✅ Decoration variation logic extracted and SSR-safe
- ✅ Gradient logic centralized
- ✅ Configuration-driven section management
- ✅ Comprehensive testing infrastructure (147 tests)
- ✅ TypeScript strict mode enabled
- ✅ ESLint and Prettier configured
- ✅ Error boundaries implemented and tested

### Code Quality Metrics

- **Test Coverage**: 147 tests across 12 test files
- **TypeScript**: Strict mode enabled with all strict options
- **Code Duplication**: ~400+ lines removed
- **Component Size**: Largest component ~160 lines (down from 360+)
- **Type Safety**: 100% TypeScript coverage

### Key Design Patterns

1. **Component Composition**: SectionWrapper, FormField, etc.
2. **Configuration-Driven**: Wedding config, section config, color schemes
3. **Separation of Concerns**: Hooks for business logic, utilities for helpers
4. **Type Safety**: Comprehensive TypeScript types throughout
5. **Error Handling**: Standardized API error handling, ErrorBoundary for UI

## Where to change…

| Change | Files to touch |
|--------|----------------|
| Section title or copy | `config/section-texts.ts` |
| Wedding date, location, dinner, good-to-know text | `config/wedding.ts` |
| Add/remove/reorder sections | `config/sections.ts` (and ensure section id exists in `sectionTexts`) |
| Add an RSVP field | `types/rsvp.ts`, `lib/validations/rsvp.ts`, `app/api/rsvp/route.ts`, `lib/rsvp/mapRsvpToAdmin.ts` (and optionally `lib/rsvp/guestName.ts`), `components/RSVPForm.tsx`, admin table columns if shown |
| RSVP form default values | `lib/validations/rsvp.ts` → `getDefaultRsvpFormValues()` |
| RSVP invite code (gate on/off, copy) | Env: `RSVP_INVITE_CODE` (set = gate on, unset = anyone can RSVP). Copy: `config/section-texts.ts` → `rsvp.inviteGate`. Logic: `lib/auth/guest.ts`, `app/api/rsvp/access/route.ts`, `components/sections/RSVPSection.tsx` |
| Admin person/song table columns | `app/admin/AdminPersonTable.tsx`, `app/admin/AdminSongTable.tsx`; types in `app/admin/types.ts` and `lib/rsvp/mapRsvpToAdmin.ts` |
| API response shape (GET RSVPs) | `types/rsvp.ts` → `RsvpListApiResponse`, `app/api/rsvp/route.ts`, `lib/rsvp/parseRsvpListResponse.ts` |

## Key files by feature

- **RSVP domain**: `types/rsvp.ts`, `lib/validations/rsvp.ts`, `lib/rsvp/` (guestName, mapRsvpToAdmin, parseRsvpListResponse)
- **RSVP invite gate**: `lib/auth/guest.ts`, `app/api/rsvp/access/route.ts`, `components/sections/RSVPSection.tsx` (gate UI); env `RSVP_INVITE_CODE` optional
- **Admin**: `app/admin/useAdminRSVPs.ts`, `app/admin/types.ts`, `app/admin/AdminRSVPTable.tsx`, `AdminPersonTable.tsx`, `AdminSongTable.tsx`, `app/admin/lib/songUtils.ts`; auth: `lib/auth/admin.ts`, `app/api/admin/login/route.ts`
- **Sections**: `config/sections.ts`, `components/sections/SectionRegistry.tsx`, section components in `components/sections/`
- **Content**: `config/wedding.ts`, `config/section-texts.ts`, `lib/config/validate.ts`

## Future Improvements

- Section configuration system for dynamic section management ✅ (Completed)
- Component registry for easier section discovery ✅ (Completed)
- Enhanced error boundaries ✅ (Completed)
- Performance optimizations (code splitting, lazy loading) ✅ (Completed)
- Card component library (optional)
- Configuration validator with Zod (optional)
- Performance monitoring (optional)
