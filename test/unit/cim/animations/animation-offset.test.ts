import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOffsetAnimationElement } from '@/cim/animations/animation-offset'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'

describe('getOffsetAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null for unsupported layer types', () => {
    const animation = {
      offsetX: 10,
      offsetY: 20,
    } as unknown as __esri.CIMSymbolAnimationOffset
    const layer = {
      type: 'CIMSolidFill',
      offsetX: 0,
      offsetY: 0,
    } as unknown as __esri.CIMSymbolLayer

    const result = getOffsetAnimationElement(animation, layer)
    expect(result).toBeNull()
    expect(createEl).not.toHaveBeenCalled()
  })

  it('creates an animateTransform element for supported layers with no existing offsets', () => {
    const animation = {
      offsetX: 15,
      offsetY: 25,
    } as unknown as __esri.CIMSymbolAnimationOffset
    const layer = { type: 'CIMHatchFill' } as unknown as __esri.CIMSymbolLayer

    const el = getOffsetAnimationElement(animation, layer) as SVGElement

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('translate')
    expect(el.getAttribute('from')).toBe('0 0')
    expect(el.getAttribute('to')).toBe('15 25')
  })

  it('respects existing layer offsets', () => {
    const animation = {
      offsetX: 20,
      offsetY: 30,
    } as unknown as __esri.CIMSymbolAnimationOffset
    const layer = {
      type: 'CIMPictureMarker',
      offsetX: 5,
      offsetY: 10,
    } as unknown as __esri.CIMSymbolLayer

    const el = getOffsetAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('to')).toBe('15 20') // 20 - 5 and 30 - 10
  })

  it('handles only offsetX defined', () => {
    const animation = {
      offsetX: 12,
    } as unknown as __esri.CIMSymbolAnimationOffset
    const layer = {
      type: 'CIMVectorMarker',
      offsetX: 2,
    } as unknown as __esri.CIMSymbolLayer

    const el = getOffsetAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('to')).toBe('10 0')
  })

  it('handles only offsetY defined', () => {
    const animation = {
      offsetY: 8,
    } as unknown as __esri.CIMSymbolAnimationOffset
    const layer = {
      type: 'CIMPictureFill',
      offsetY: 3,
    } as unknown as __esri.CIMSymbolLayer

    const el = getOffsetAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('to')).toBe('0 5')
  })
})
