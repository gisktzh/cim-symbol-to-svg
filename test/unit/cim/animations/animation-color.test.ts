import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getColorAnimationElement } from '@/cim/animations/animation-color'

vi.mock('@/utils/color', () => ({
  rgbaArrayToHex: vi.fn(() => '#123456'),
}))

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { rgbaArrayToHex } from '@/utils/color'
import { createEl } from '@/utils/svg-el'

describe('getColorAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null for unsupported layer types', () => {
    const animation = {
      type: 'CIMSymbolAnimationColor',
      toColor: { toHex: () => '#ffffff' },
    } as __esri.CIMSymbolAnimationColor

    const layer = {
      type: 'CIMVectorMarker', // not supported
    } as __esri.CIMVectorMarker

    const result = getColorAnimationElement(animation, layer)
    expect(result).toBeNull()
    expect(createEl).not.toHaveBeenCalled()
  })

  it('creates an animate element for CIMSolidFill layers', () => {
    const animation = {
      type: 'CIMSymbolAnimationColor',
      toColor: { toHex: vi.fn(() => '#abcdef') },
    } as unknown as __esri.CIMSymbolAnimationColor

    const layer = {
      type: 'CIMSolidFill',
      color: [255, 0, 0, 255],
    } as __esri.CIMSolidFill

    const el = getColorAnimationElement(animation, layer) as SVGElement

    expect(createEl).toHaveBeenCalledWith('animate')
    expect(rgbaArrayToHex).toHaveBeenCalledWith(layer.color)

    expect(el.tagName).toBe('animate')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('attributeName')).toBe('fill')
    expect(el.getAttribute('from')).toBe('#123456')
    expect(el.getAttribute('to')).toBe('#abcdef')
  })

  it('creates an animate element for CIMSolidStroke layers', () => {
    const animation = {
      type: 'CIMSymbolAnimationColor',
      toColor: { toHex: vi.fn(() => '#00ff00') },
    } as unknown as __esri.CIMSymbolAnimationColor

    const layer = {
      type: 'CIMSolidStroke',
      color: [0, 0, 255, 255],
    } as __esri.CIMSymbolLayer

    const el = getColorAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('attributeName')).toBe('stroke')
    expect(el.getAttribute('to')).toBe('#00ff00')
  })
})
