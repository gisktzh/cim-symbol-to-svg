import { isPaths, isRings } from '@/typeguards/paths'
import { describe, expect, it } from 'vitest'

describe('paths', () => {
  describe('isRings', () => {
    it('should correctly identify an object with a `rings` attribute', () => {
      expect(isRings({ rings: [] })).toBeTruthy()
      expect(isRings({ rings: [[], []] })).toBeTruthy()
      expect(isRings({ paths: [] })).toBeFalsy()
    })
  })

  describe('isPaths', () => {
    it('should correctly identify an object with a `paths` attribute', () => {
      expect(isPaths({ paths: [] })).toBeTruthy()
      expect(isPaths({ paths: [[], []] })).toBeTruthy()
      expect(isPaths({ rings: [] })).toBeFalsy()
    })
  })
})
