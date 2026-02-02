import { describe, it, expect } from 'vitest'
import { getVariedLeafDecoration, type DecorationSize } from './variations'

describe('getVariedLeafDecoration', () => {
  it('should return valid decoration for small base size', () => {
    const result = getVariedLeafDecoration('small', 0)
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })

  it('should return valid decoration for medium base size', () => {
    const result = getVariedLeafDecoration('medium', 1)
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })

  it('should return valid decoration for large base size', () => {
    const result = getVariedLeafDecoration('large', 2)
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })

  it('should be deterministic with same seed', () => {
    const seed = 42
    const result1 = getVariedLeafDecoration('medium', seed)
    const result2 = getVariedLeafDecoration('medium', seed)
    expect(result1).toEqual(result2)
  })

  it('should produce different results with different seeds', () => {
    const result1 = getVariedLeafDecoration('medium', 1)
    const result2 = getVariedLeafDecoration('medium', 2)
    // At least one property should differ (though not guaranteed)
    expect(
      result1.size !== result2.size || result1.variant !== result2.variant
    ).toBe(true)
  })

  it('should handle string seed', () => {
    const result = getVariedLeafDecoration('small', 'test-seed')
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })

  it('should be deterministic with same string seed', () => {
    const seed = 'test-seed'
    const result1 = getVariedLeafDecoration('medium', seed)
    const result2 = getVariedLeafDecoration('medium', seed)
    expect(result1).toEqual(result2)
  })

  it('should handle empty string seed', () => {
    const result = getVariedLeafDecoration('small', '')
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })

  it('should not exceed size bounds', () => {
    // Test with various seeds to ensure size stays within bounds
    const sizes: DecorationSize[] = ['small', 'medium', 'large']
    for (let i = 0; i < 100; i++) {
      const result = getVariedLeafDecoration('medium', i)
      expect(sizes).toContain(result.size)
    }
  })

  it('should always return valid variant', () => {
    // Test with various seeds to ensure variant is always valid
    const variants = ['single', 'pair']
    for (let i = 0; i < 100; i++) {
      const result = getVariedLeafDecoration('medium', i)
      expect(variants).toContain(result.variant)
    }
  })

  it('should handle negative seed numbers', () => {
    const result = getVariedLeafDecoration('small', -1)
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })

  it('should handle very large seed numbers', () => {
    const result = getVariedLeafDecoration('large', Number.MAX_SAFE_INTEGER)
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })

  it('should use random seed when no seed provided', () => {
    const result = getVariedLeafDecoration('medium')
    expect(['small', 'medium', 'large']).toContain(result.size)
    expect(['single', 'pair']).toContain(result.variant)
  })
})
