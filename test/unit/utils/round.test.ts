import { describe, it, expect } from 'vitest'
import { round } from '@/utils/round'

describe('round.ts', () => {
  it('should round a number to the specified number of decimal places', () => {
    expect(round(123.456789, 2)).toBe(123.46)
    expect(round(123.456789, 3)).toBe(123.457)
    expect(round(123.456789, 0)).toBe(123)
  })

  it('should round negative numbers correctly', () => {
    expect(round(-123.456789, 2)).toBe(-123.46)
    expect(round(-123.456789, 3)).toBe(-123.457)
    expect(round(-123.456789, 0)).toBe(-123)
  })

  it('should round 0 correctly', () => {
    expect(round(0, 2)).toBe(0)
    expect(round(0, 0)).toBe(0)
  })

  it('should round numbers with trailing zeros', () => {
    expect(round(123.4, 2)).toBe(123.4)
    expect(round(123.45, 3)).toBe(123.45)
  })

  it('should handle rounding large numbers', () => {
    expect(round(123456789.987654, 2)).toBe(123456789.99)
    expect(round(123456789.987654, 5)).toBe(123456789.98765)
  })

  it('should handle very small numbers (close to 0)', () => {
    expect(round(0.000123456, 6)).toBe(0.000123)
    expect(round(0.000123456, 8)).toBe(0.00012346)
  })
})
