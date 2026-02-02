# Color Scheme Guide

The wedding site now supports an easy-to-change color scheme system. You can change the entire site's color theme by updating a single variable in the config.

## How to Change Colors

1. Open `config/wedding.ts`
2. Find the `colorScheme` property (at the bottom)
3. Change it to one of these options:
   - `'pink'` (default)
   - `'rose'`
   - `'purple'`
   - `'blue'`
   - `'teal'`
   - `'green'` (salvia green)

Example:
```typescript
colorScheme: 'green', // Changes entire site to salvia green theme
```

## Available Color Schemes

- **pink** - Soft pink theme (default)
- **rose** - Warmer rose tones
- **purple** - Elegant purple theme
- **blue** - Classic blue theme
- **teal** - Fresh teal theme
- **green** - Salvia green theme (natural, earthy greens)

## How It Works

The color scheme system uses a utility function (`lib/colors.ts`) that maps color scheme names to Tailwind CSS classes. Components use the `useColors()` hook to get the appropriate color classes based on the config.

## Using Colors in Components

If you're creating new components or updating existing ones, use the color scheme like this:

```tsx
'use client'

import { useColors } from '@/components/ColorSchemeProvider'

export default function MyComponent() {
  const colors = useColors()
  
  return (
    <div className={colors.bgLight}>
      <button className={`${colors.bgDark} ${colors.textHover}`}>
        Click me
      </button>
    </div>
  )
}
```

## Available Color Classes

- `colors.bgLight` - Light background
- `colors.bgLightHover` - Light background hover state
- `colors.bgMedium` - Medium background
- `colors.bgDark` - Dark background (primary buttons, etc.)
- `colors.bgDarkHover` - Dark background hover state
- `colors.text` - Primary text color
- `colors.textDark` - Dark text color
- `colors.textHover` - Text hover color
- `colors.borderLight` - Light border
- `colors.borderMedium` - Medium border
- `colors.borderDark` - Dark border
- `colors.borderHover` - Border hover color
- `colors.ring` - Focus ring color
- `colors.icon` - Icon color

## Components Already Updated

The following components have been updated to use the color scheme:
- `DetailCard` - Icon backgrounds and text colors
- `VigselSection` - Icon colors

## Future Updates

To update more components, replace hardcoded color classes (like `bg-pink-600`, `text-pink-600`) with the dynamic color classes from `useColors()`.
