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

## Future Improvements

- Section configuration system for dynamic section management ✅ (Completed)
- Component registry for easier section discovery ✅ (Completed)
- Enhanced error boundaries ✅ (Completed)
- Performance optimizations (code splitting, lazy loading) ✅ (Completed)
- Card component library (optional)
- Configuration validator with Zod (optional)
- Performance monitoring (optional)
