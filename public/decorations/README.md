# Decoration SVG Files

This directory contains standalone SVG decoration files that can be used throughout the wedding website.

## Available Decorations

- **leaf-single.svg** - A single natural leaf with detailed veins
- **leaf-pair.svg** - A pair of leaves arranged in a V-shape
- **flower.svg** - A simple flower decoration

## Usage

### In HTML/JSX

```jsx
// As an image
<img src="/decorations/leaf-single.svg" alt="Leaf decoration" className="w-20 h-20" />

// As an inline SVG (allows color customization)
<Image src="/decorations/leaf-single.svg" alt="Leaf" width={80} height={80} />
```

### Customizing Colors

The SVG files use hardcoded colors (green for leaves, pink for flowers). To customize colors:

1. Edit the SVG file directly and change the `fill` and `stroke` attributes
2. Use CSS filters to adjust colors
3. Use the React components in `components/LeafDecoration.tsx` and `components/FlowerDecoration.tsx` which support color schemes

### Color Schemes

For dynamic color schemes, use the React components:
- `LeafDecoration` - Supports all color schemes via `ColorSchemeProvider`
- `FlowerDecoration` - Supports all color schemes via `ColorSchemeProvider`

Available color schemes: pink, rose, purple, blue, teal, green, sage, red
