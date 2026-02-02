# Decoration System Guide

The wedding site uses a configurable decoration system that allows you to easily switch between flowers and leaf decorations.

## How It Works

All decorations are controlled by a single setting in `config/wedding.ts`:

```typescript
decorationType: 'leaf', // or 'flower'
```

## Configuration

### Setting Decoration Type

Open `config/wedding.ts` and change the `decorationType`:

```typescript
// For leaf decorations (with variants: single, pair)
decorationType: 'leaf',

// For flower decorations  
decorationType: 'flower',
```

## Components

### FlowerDecoration Component

The `FlowerDecoration` component automatically reads from the config:

- **If no `variant` prop is provided**: Uses `weddingConfig.decorationType`
- **If `variant` prop is provided**: Uses that specific variant (allows override)

**Usage:**
```tsx
// Uses config (leaf or flower based on decorationType)
<FlowerDecoration size="medium" />

// Override to use a specific variant
<FlowerDecoration size="medium" variant="leaf" />
<FlowerDecoration size="medium" variant="branch" />
```

### SectionTitle Component

The `SectionTitle` component passes decorations to `FlowerDecoration`:

- **If no `flowerVariant` prop**: Uses config default
- **If `flowerVariant` prop provided**: Uses that specific variant

**Usage:**
```tsx
// Uses config default
<SectionTitle title="OSA" />

// Override to use a specific variant
<SectionTitle title="OSA" flowerVariant="branch" />
```

## Available Variants

### Flower Variants
- `'flower'` - Four-petaled flower with center
- `'leaf'` - Simple leaf shape
- `'branch'` - Branch with small circles

### Leaf Variants (when decorationType is 'leaf')
- `'single'` - Single elongated leaf (default)
- `'pair'` - Two leaves in V shape

## How Components Read Config

1. **FlowerDecoration** reads `weddingConfig.decorationType` directly
2. **SectionTitle** passes `flowerVariant` to FlowerDecoration (or undefined to use config)
3. All other components use `<FlowerDecoration />` without explicit variants, so they use config

## Switching Between Flowers and Leaves

To switch the entire site's decorations:

1. Open `config/wedding.ts`
2. Change `decorationType: 'leaf'` to `decorationType: 'flower'` (or vice versa)
3. Save the file
4. The site will automatically update - no code changes needed!

**Note:** When `decorationType` is `'leaf'`, the `LeafDecoration` component is used with variants (single, pair). When `variant="leaf"` is explicitly passed to `FlowerDecoration`, it shows a simple leaf shape (kept for backward compatibility).

## Current Status

- ✅ All decorations read from config
- ✅ No hardcoded flower variants (except for intentional variety like 'leaf'/'branch')
- ✅ Easy to switch with one config change
- ✅ Components can override with explicit variant prop when needed
