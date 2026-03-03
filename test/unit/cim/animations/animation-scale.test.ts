import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getScaleAnimationElement } from '@/cim/animations/animation-scale'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'
import { CIMSymbolAnimationScale } from '@arcgis/core/symbols/cim/types'

describe('getScaleAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animateTransform element with correct attributes', () => {
    const animation: CIMSymbolAnimationScale = {
      type: 'CIMSymbolAnimationScale',
      scaleFactor: 2,
    }

    const el = getScaleAnimationElement(animation)

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('scale')
    expect(el.getAttribute('from')).toBe('1')
    expect(el.getAttribute('to')).toBe('2')
  })

  it('handles decimal scale factors correctly', () => {
    const animation: CIMSymbolAnimationScale = {
      type: 'CIMSymbolAnimationScale',
      scaleFactor: 1.5,
    }

    const el = getScaleAnimationElement(animation)

    expect(el.getAttribute('to')).toBe('1.5')
  })

  it('handles scaleFactor of 0', () => {
    const animation: CIMSymbolAnimationScale = {
      type: 'CIMSymbolAnimationScale',
      scaleFactor: 0,
    }

    const el = getScaleAnimationElement(animation)

    expect(el.getAttribute('to')).toBe('0')
  })
})
