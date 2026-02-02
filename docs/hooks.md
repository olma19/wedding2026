# Custom Hooks Documentation

This document describes all custom hooks available in the wedding website project.

## Table of Contents

- [useSectionColors](#usesectioncolors)
- [useFormGradients](#useformgradients)
- [useRSVPSubmission](#usersvpsubmission)
- [useDecorationCounter](#usedecorationcounter)
- [useDecorationSeed](#usedecorationseed)

---

## useSectionColors

**Location:** `hooks/useSectionColors.ts`

**Purpose:** Wrapper around `useColors()` hook for consistency and section-specific defaults.

**Returns:** Color scheme object from `ColorSchemeProvider`

**Usage:**
```typescript
import { useSectionColors } from '@/hooks/useSectionColors'

function MySection() {
  const colors = useSectionColors()
  // Use colors.bgLight, colors.text, etc.
}
```

**Note:** Currently a simple wrapper, but can be extended with section-specific color overrides in the future.

---

## useFormGradients

**Location:** `hooks/useFormGradients.ts`

**Purpose:** Provides form gradient classes based on the current color scheme.

**Returns:** Object with `outer` and `inner` gradient class strings

**Usage:**
```typescript
import { useFormGradients } from '@/hooks/useFormGradients'

function RSVPForm() {
  const gradients = useFormGradients()
  
  return (
    <form className={classNames('bg-gradient-to-br', gradients.outer)}>
      {/* Form content */}
    </form>
  )
}
```

**Returns:**
```typescript
{
  outer: string, // Outer wrapper gradient classes
  inner: string  // Inner wrapper gradient classes
}
```

---

## useRSVPSubmission

**Location:** `hooks/useRSVPSubmission.ts`

**Purpose:** Handles RSVP form submission logic, including state management, API calls, error handling, and success feedback (confetti).

**Parameters:**
- `onSuccess?: () => void` - Optional callback executed after successful submission

**Returns:**
```typescript
{
  isSubmitting: boolean      // Whether form is currently submitting
  submitError: string | null // Error message if submission failed
  submitSuccess: boolean      // Whether submission was successful
  submitRSVP: (data: RSVPFormData) => Promise<void> // Submit function
  reset: () => void          // Reset submission state
}
```

**Usage:**
```typescript
import { useRSVPSubmission } from '@/hooks/useRSVPSubmission'
import type { RSVPFormData } from '@/lib/validations/rsvp'

function RSVPForm() {
  const { submitRSVP, isSubmitting, submitError, submitSuccess, reset } = useRSVPSubmission()
  
  const onSubmit = async (data: RSVPFormData) => {
    await submitRSVP(data)
  }
  
  if (submitSuccess) {
    return <SuccessMessage />
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      {submitError && <ErrorDisplay error={submitError} />}
      <button disabled={isSubmitting}>Submit</button>
    </form>
  )
}
```

**Features:**
- Automatic confetti animation on success
- Error state management
- Loading state management
- Automatic error handling

---

## useDecorationCounter

**Location:** `hooks/useDecorationCounter.ts`

**Purpose:** Generates SSR-safe unique IDs for decorations using React's `useId()` hook.

**Returns:** `string` - Unique identifier

**Usage:**
```typescript
import { useDecorationCounter } from '@/hooks/useDecorationCounter'

function MyComponent() {
  const decorationId = useDecorationCounter()
  // Use decorationId for unique decoration instances
}
```

**Note:** Uses React's `useId()` for SSR compatibility instead of module-level counters.

---

## useDecorationSeed

**Location:** `hooks/useDecorationCounter.ts`

**Purpose:** Generates a numeric seed from a string identifier for consistent decoration variations based on component position.

**Parameters:**
- `identifier: string` - String identifier (e.g., component position, index)

**Returns:** `number` - Numeric seed value

**Usage:**
```typescript
import { useDecorationSeed } from '@/hooks/useDecorationCounter'

function SectionTitle({ title, index }) {
  const seed = useDecorationSeed(`section-${index}`)
  
  return (
    <FlowerDecoration seed={seed} />
  )
}
```

**Use Case:** Ensures decorations render consistently based on their position (e.g., same decoration always appears in the same place).

---

## Hook Best Practices

### When to Create a Custom Hook

1. **Reusable Logic:** Extract logic that's used in multiple components
2. **State Management:** Complex state logic that benefits from encapsulation
3. **Side Effects:** useEffect logic that can be reused
4. **API Calls:** Data fetching logic that's used in multiple places

### Hook Naming Convention

- Always start with `use` prefix
- Use descriptive names: `useFormGradients` not `useGradients`
- Group related hooks in the same file when appropriate

### Hook Dependencies

- Keep hooks focused on a single responsibility
- Use TypeScript for type safety
- Document complex hooks with JSDoc comments
- Export hooks from `hooks/` directory

---

## Future Hook Ideas

- `useScrollAnimation` - Extract scroll animation logic from `ScrollAnimation` component
- `useFormValidation` - Common form validation patterns (if needed beyond react-hook-form + zod)
- `useDebounce` - Debounce user input for search/filter functionality
- `useLocalStorage` - Sync state with localStorage
- `useMediaQuery` - Responsive design hook for breakpoints
