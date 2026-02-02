# Component Documentation

This document describes the key components in the wedding website project.

## Section Components

### SectionWrapper

Wrapper component that provides consistent structure for all sections.

**Props:**
- `title?: string` - Section title
- `titleVariant?: 'flower' | 'leaf' | 'branch' | 'sage'` - Decoration variant for title
- `decorations?: DecorationConfig[]` - Array of decorative elements
- `background?: 'light' | 'white' | 'custom'` - Background type
- `customBackground?: string` - Custom background class
- `showScrollAnimation?: boolean` - Enable scroll animation wrapper
- `scrollAnimationDelay?: number` - Delay for scroll animation
- `scrollMargin?: boolean` - Add scroll margin for navigation
- `id?: string` - Section ID for anchor links

**Usage:**
```tsx
<SectionWrapper
  title="My Section"
  background="white"
  decorations={[
    { position: 'top-right', size: 'small', opacity: 0.2 }
  ]}
>
  <p>Section content</p>
</SectionWrapper>
```

## Form Components

### RSVPForm

Main RSVP form component that handles guest submissions.

**Props:**
- `onSuccess?: () => void` - Callback when submission succeeds

**Sub-components:**
- `GuestCountSelector` - Select number of guests
- `PersonFormSection` - Form for each person
- `SuccessMessage` - Success state display

### FormField

Reusable form input field with label and error display.

**Props:**
- `label: string` - Field label
- `error?: string` - Error message
- `required?: boolean` - Show required indicator
- `disabled?: boolean` - Disable input
- `placeholder?: string` - Input placeholder
- All standard HTML input props

### PersonFormSection

Form section for a single person's information.

**Props:**
- `index: number` - Person index
- `register: UseFormRegister<RSVPFormData>` - React Hook Form register
- `errors: FieldErrors<RSVPFormData>` - Form errors
- `disabled?: boolean` - Disable form
- `wantsBus: boolean` - Whether person wants bus

## Decoration Components

### FlowerDecoration

Factory component that renders different decoration types based on config.

**Props:**
- `size?: 'small' | 'medium' | 'large'` - Decoration size
- `variant?: 'flower' | 'leaf' | 'branch'` - Decoration type
- `seed?: number | string` - Seed for consistent variation
- `forceLeafVariant?: 'single' | 'pair'` - Force specific leaf variant

**Behavior:**
- Auto-detects decoration type from `weddingConfig.decorationType`
- Dispatches to `LeafDecoration` when type is 'leaf'
- Handles variation logic for leaf decorations

### LeafDecoration

Component for rendering leaf decorations with variants.

**Props:**
- `size?: 'small' | 'medium' | 'large'` - Leaf size
- `variant?: 'single' | 'pair'` - Leaf arrangement

## Hooks

### useRSVPSubmission

Handles RSVP form submission logic.

**Returns:**
- `isSubmitting: boolean` - Submission in progress
- `submitError: string | null` - Error message if any
- `submitSuccess: boolean` - Success state
- `submitRSVP: (data: RSVPFormData) => Promise<void>` - Submit function
- `reset: () => void` - Reset submission state

### useFormGradients

Gets gradient classes for forms based on current color scheme.

**Returns:**
- `{ outer: string, inner: string }` - Gradient class strings

### useColors

Gets color scheme classes from ColorSchemeProvider.

**Returns:**
- Object with color class strings (bgDark, bgLight, text, etc.)

## Utilities

### getVariedLeafDecoration

Generates varied leaf decoration properties based on seed.

**Parameters:**
- `baseSize: DecorationSize` - Base size to vary from
- `seed?: number | string` - Seed for deterministic variation

**Returns:**
- `{ size: DecorationSize, variant: LeafVariant }`

### getFormGradients

Gets gradient classes for forms based on color scheme.

**Parameters:**
- `scheme: ColorSchemeName` - Color scheme name

**Returns:**
- `{ outer: string, inner: string }` - Gradient class strings
