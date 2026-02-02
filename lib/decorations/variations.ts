/**
 * Decoration variation utilities
 * Provides functions to generate varied decoration properties based on seeds
 */

export type DecorationSize = 'small' | 'medium' | 'large'
export type LeafVariant = 'single' | 'pair'

export interface VariedLeafDecoration {
  size: DecorationSize
  variant: LeafVariant
}

/**
 * Generate varied leaf decoration properties based on seed
 * @param baseSize - The base size to vary from
 * @param seed - Seed value for deterministic variation (number or string)
 * @returns Object with varied size and variant
 */
export function getVariedLeafDecoration(
  baseSize: DecorationSize,
  seed: number | string = Math.random()
): VariedLeafDecoration {
  // Convert seed to number if it's a string
  const seedNum = typeof seed === 'string' 
    ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : seed
  
  // Create variations based on seed
  const sizeVariation = seedNum % 3
  const variantVariation = Math.floor(seedNum / 3) % 2
  
  // Map base size to index: small=0, medium=1, large=2
  const sizeIndex = baseSize === 'small' ? 0 : baseSize === 'medium' ? 1 : 2
  
  // Vary size: sometimes go up/down one step
  const sizeOptions: DecorationSize[] = ['small', 'medium', 'large']
  let variedSizeIndex = sizeIndex + (sizeVariation === 0 ? -1 : sizeVariation === 1 ? 0 : 1)
  // Clamp to valid range
  variedSizeIndex = Math.max(0, Math.min(2, variedSizeIndex))
  
  const size = sizeOptions[variedSizeIndex]
  const variant: LeafVariant = variantVariation === 0 ? 'single' : 'pair'
  
  return { size, variant }
}
