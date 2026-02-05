# Unused Code Audit (cleaned up)

This document recorded an audit of unused components, files, and variables. The following were **removed** in cleanup:

## Removed

### Component files
- `components/FloralBackground.tsx`
- `components/ui/SectionDivider.tsx`
- `components/ui/LinkButton.tsx`
- `components/ui/ContactLink.tsx`
- `components/ui/SkeletonWrapper.tsx`

### Hooks
- `hooks/useSectionColors.ts`

### Lib
- `lib/utils/validation.ts` (`isValidEmail`, `isValidSwedishPhone`, `isRequired`)
- `lib/utils/stringHelpers.ts` and `lib/utils/stringHelpers.test.ts`
- `lib/utils/dateHelpers.ts`
- `lib/api/responseHelpers.ts` → removed unused `handleRoute` export

### Barrel updates
- `components/ui/index.ts` – removed exports for the deleted UI components
- `lib/utils/index.ts` – removed re-exports for validation, stringHelpers, dateHelpers

---

## Left in place (intentionally)

- **CardFooter** – Only used in `Card.test.tsx`; kept as part of the Card component API.
- **config/sections.ts** – `getSectionById`, `setSectionEnabled`, `setSectionOrder` – kept for potential future tooling or admin.
