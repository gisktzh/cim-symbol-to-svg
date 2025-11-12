import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getSizeAnimationElement } from '@/cim/animations/animation-size'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'

describe('getSizeAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null for unsupported layer types', () => {
    const animation = { toSize: 20 } as unknown as __esri.CIMSymbolAnimationSize
    const layer = {
      type: 'CIMSolidFill',
      size: 10,
    } as unknown as __esri.CIMSymbolLayer

    const result = getSizeAnimationElement(animation, layer)
    expect(result).toBeNull()
    expect(createEl).not.toHaveBeenCalled()
  })

  it('creates an animateTransform element for CIMPictureMarker', () => {
    const animation = { toSize: 20 } as unknown as __esri.CIMSymbolAnimationSize
    const layer = {
      type: 'CIMPictureMarker',
      size: 10,
    } as unknown as __esri.CIMSymbolLayer

    const el = getSizeAnimationElement(animation, layer) as SVGElement

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('scale')
    expect(el.getAttribute('from')).toBe('1')
    expect(el.getAttribute('to')).toBe('2') // 20 / 10
  })

  it('creates an animateTransform element for CIMVectorMarker', () => {
    const animation = { toSize: 15 } as unknown as __esri.CIMSymbolAnimationSize
    const layer = {
      type: 'CIMVectorMarker',
      size: 5,
    } as unknown as __esri.CIMSymbolLayer

    const el = getSizeAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('to')).toBe('3') // 15 / 5
  })

  it('handles fractional size values', () => {
    const animation = {
      toSize: 7.5,
    } as unknown as __esri.CIMSymbolAnimationSize
    const layer = {
      type: 'CIMPictureMarker',
      size: 2.5,
    } as unknown as __esri.CIMSymbolLayer

    const el = getSizeAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('to')).toBe('3') // 7.5 / 2.5
  })
})
