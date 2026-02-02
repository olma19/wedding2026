import { describe, it, expect } from 'vitest'
import { capitalize, toTitleCase, truncate, normalize } from './stringHelpers'

describe('capitalize', () => {
  it('should capitalize the first letter and lowercase the rest', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('WORLD')).toBe('World')
    expect(capitalize('hELLo')).toBe('Hello')
  })

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('should handle single character', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
  })

  it('should handle strings with numbers', () => {
    expect(capitalize('hello123')).toBe('Hello123')
  })

  it('should handle strings with special characters', () => {
    expect(capitalize('hello-world')).toBe('Hello-world')
  })
})

describe('toTitleCase', () => {
  it('should capitalize first letter of each word', () => {
    expect(toTitleCase('hello world')).toBe('Hello World')
    expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox')
  })

  it('should handle all uppercase', () => {
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
  })

  it('should handle mixed case', () => {
    expect(toTitleCase('hELLo WoRLd')).toBe('Hello World')
  })

  it('should handle single word', () => {
    expect(toTitleCase('hello')).toBe('Hello')
  })

  it('should handle empty string', () => {
    expect(toTitleCase('')).toBe('')
  })

  it('should handle multiple spaces', () => {
    expect(toTitleCase('hello   world')).toBe('Hello   World')
  })
})

describe('truncate', () => {
  it('should truncate string longer than maxLength', () => {
    expect(truncate('hello world', 5)).toBe('he...')
  })

  it('should not truncate string shorter than maxLength', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('should use custom suffix', () => {
    expect(truncate('hello world', 5, '…')).toBe('hell…')
  })

  it('should handle exact length match', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  it('should handle empty string', () => {
    expect(truncate('', 5)).toBe('')
  })

  it('should handle suffix longer than maxLength', () => {
    expect(truncate('hello', 3, '...')).toBe('...')
  })

  it('should handle very long suffix', () => {
    expect(truncate('hello world', 5, 'very long suffix')).toBe('very long suffix')
  })
})

describe('normalize', () => {
  it('should trim whitespace', () => {
    expect(normalize('  hello  ')).toBe('hello')
  })

  it('should normalize multiple spaces to single space', () => {
    expect(normalize('hello    world')).toBe('hello world')
  })

  it('should handle tabs and newlines', () => {
    expect(normalize('hello\t\tworld\n\nfoo')).toBe('hello world foo')
  })

  it('should handle leading and trailing whitespace', () => {
    expect(normalize('  hello   world  ')).toBe('hello world')
  })

  it('should handle empty string', () => {
    expect(normalize('')).toBe('')
  })

  it('should handle string with only whitespace', () => {
    expect(normalize('   \t\n  ')).toBe('')
  })

  it('should preserve single spaces', () => {
    expect(normalize('hello world')).toBe('hello world')
  })
})
