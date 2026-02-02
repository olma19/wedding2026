import { describe, it, expect } from 'vitest'
import { classNames, cn } from './classNames'

describe('classNames', () => {
  it('should join multiple class names', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('should filter out falsy values', () => {
    expect(classNames('foo', null, 'bar', undefined, false, 'baz')).toBe('foo bar baz')
  })

  it('should handle empty strings', () => {
    expect(classNames('foo', '', 'bar')).toBe('foo bar')
  })

  it('should handle single class name', () => {
    expect(classNames('foo')).toBe('foo')
  })

  it('should return empty string for no arguments', () => {
    expect(classNames()).toBe('')
  })

  it('should return empty string for all falsy values', () => {
    expect(classNames(null, undefined, false, '')).toBe('')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const isDisabled = false
    expect(classNames('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active')
  })

  it('should handle mixed truthy and falsy values', () => {
    const nullValue: string | null = null
    const falseValue = false
    expect(classNames('foo', nullValue && 'bar', 'baz', falseValue && 'qux')).toBe('foo baz')
  })
})

describe('cn (alias)', () => {
  it('should work as an alias for classNames', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should have the same behavior as classNames', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar')
    expect(cn()).toBe('')
  })
})
