import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getScaleAnimationElement } from '@/cim/animations/animation-scale'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'

describe('getScaleAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animateTransform element with correct attributes', () => {
    const animation = {
      scaleFactor: 2,
    } as unknown as __esri.CIMSymbolAnimationScale

    const el = getScaleAnimationElement(animation) as SVGElement

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('scale')
    expect(el.getAttribute('from')).toBe('1')
    expect(el.getAttribute('to')).toBe('2')
  })

  it('handles decimal scale factors correctly', () => {
    const animation = {
      scaleFactor: 1.5,
    } as unknown as __esri.CIMSymbolAnimationScale

    const el = getScaleAnimationElement(animation) as SVGElement

    expect(el.getAttribute('to')).toBe('1.5')
  })

  it('handles scaleFactor of 0', () => {
    const animation = {
      scaleFactor: 0,
    } as unknown as __esri.CIMSymbolAnimationScale

    const el = getScaleAnimationElement(animation) as SVGElement

    expect(el.getAttribute('to')).toBe('0')
  })
})
