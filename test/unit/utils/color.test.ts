import { describe, it, expect } from 'vitest'
import { rgbaArrayToHex } from '@/utils/color'

describe('rgbaArrayToHex', () => {
  it('should convert rgba array to hex format (without alpha)', () => {
    const rgba = [255, 0, 0]
    const result = rgbaArrayToHex(rgba)

    expect(result).toBe('#ff0000')
  })

  it('should convert rgba array to hex format (with alpha)', () => {
    const rgba = [255, 0, 0, 50]
    const result = rgbaArrayToHex(rgba)

    expect(result).toBe('#ff0000')
  })

  it('should handle values less than 16 (single digit)', () => {
    const rgba = [15, 15, 15]
    const result = rgbaArrayToHex(rgba)

    expect(result).toBe('#0f0f0f')
  })

  it('should handle values greater than 255 (should still be capped to 255)', () => {
    const rgba = [300, 256, 500]
    const result = rgbaArrayToHex(rgba)

    expect(result).toBe('#ffffff')
  })
})
