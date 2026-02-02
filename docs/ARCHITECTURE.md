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

## Data Flow

1. **Configuration**: `wedding.ts` → Components
2. **Color Scheme**: `ColorSchemeProvider` → All components via `useColors()`
3. **Form Submission**: `RSVPForm` → `useRSVPSubmission` → API Route → Supabase
4. **Decoration Variations**: `FlowerDecoration` → `getVariedLeafDecoration()` → `LeafDecoration`

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

## Future Improvements

- Section configuration system for dynamic section management
- Component registry for easier section discovery
- Enhanced error boundaries
- Performance optimizations (code splitting, lazy loading)
