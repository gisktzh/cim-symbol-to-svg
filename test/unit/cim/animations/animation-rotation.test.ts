import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getRotationAnimationElement } from '@/cim/animations/animation-rotation'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'

describe('getRotationAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns undefined for unsupported layer types', () => {
    const animation = {
      toRotation: 45,
      rotateClockwise: true,
    } as unknown as __esri.CIMSymbolAnimationRotation
    const layer = {
      type: 'CIMSolidFill',
      rotation: 0,
    } as unknown as __esri.CIMSymbolLayer

    const result = getRotationAnimationElement(animation, layer)
    expect(result).toBeNull()
    expect(createEl).not.toHaveBeenCalled()
  })

  it('creates an animateTransform element for supported layers', () => {
    const animation = {
      toRotation: 90,
      rotateClockwise: true,
    } as unknown as __esri.CIMSymbolAnimationRotation
    const layer = {
      type: 'CIMHatchFill',
      rotation: 30,
    } as unknown as __esri.CIMSymbolLayer

    const el = getRotationAnimationElement(animation, layer) as SVGElement

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('rotation')
    expect(el.getAttribute('from')).toBe('30')
    expect(el.getAttribute('to')).toBe('90')
  })

  it('negates rotation if rotateClockwise is false', () => {
    const animation = {
      toRotation: 45,
      rotateClockwise: false,
    } as unknown as __esri.CIMSymbolAnimationRotation
    const layer = {
      type: 'CIMVectorMarker',
      rotation: 10,
    } as unknown as __esri.CIMSymbolLayer

    const el = getRotationAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('from')).toBe('10')
    expect(el.getAttribute('to')).toBe('-45') // negated
  })

  it('defaults layer.rotation to 0 if not defined', () => {
    const animation = {
      toRotation: 60,
      rotateClockwise: true,
    } as unknown as __esri.CIMSymbolAnimationRotation
    const layer = {
      type: 'CIMPictureMarker',
    } as unknown as __esri.CIMSymbolLayer

    const el = getRotationAnimationElement(animation, layer) as SVGElement

    expect(el.getAttribute('from')).toBe('0')
    expect(el.getAttribute('to')).toBe('60')
  })
})
