import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { getAnimationElements } from '@/cim/animations'

const fakeEl = document.createElementNS('http://www.w3.org/2000/svg', 'animate')

vi.mock('@/cim/animations/animation-color', () => ({
  getColorAnimationElement: vi.fn(() => fakeEl),
}))
vi.mock('@/cim/animations/animation-offset', () => ({
  getOffsetAnimationElement: vi.fn(() => fakeEl),
}))
vi.mock('@/cim/animations/animation-rotation', () => ({
  getRotationAnimationElement: vi.fn(() => fakeEl),
}))
vi.mock('@/cim/animations/animation-scale', () => ({
  getScaleAnimationElement: vi.fn(() => fakeEl),
}))
vi.mock('@/cim/animations/animation-size', () => ({
  getSizeAnimationElement: vi.fn(() => fakeEl),
}))
vi.mock('@/cim/animations/animation-transparency', () => ({
  getTransparencyAnimationElement: vi.fn(() => fakeEl),
}))

import { getColorAnimationElement } from '@/cim/animations/animation-color'
import { getOffsetAnimationElement } from '@/cim/animations/animation-offset'
import { getRotationAnimationElement } from '@/cim/animations/animation-rotation'
import { getScaleAnimationElement } from '@/cim/animations/animation-scale'
import { getSizeAnimationElement } from '@/cim/animations/animation-size'
import { getTransparencyAnimationElement } from '@/cim/animations/animation-transparency'

describe('getAnimationElements', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null if playAnimation is false', () => {
    const animation: __esri.CIMSymbolAnimation = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: false },
    } as __esri.CIMSymbolAnimation
    const layer: __esri.CIMSymbolLayer = {
      type: 'CIMSolidFill',
    } as __esri.CIMSymbolLayer

    expect(getAnimationElements(animation, layer)).toBeNull()
  })

  it('calls the correct generator based on animation type', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const animationTypes: [__esri.CIMSymbolAnimation['type'], Function][] = [
      ['CIMSymbolAnimationColor', getColorAnimationElement],
      ['CIMSymbolAnimationOffset', getOffsetAnimationElement],
      ['CIMSymbolAnimationRotation', getRotationAnimationElement],
      ['CIMSymbolAnimationScale', getScaleAnimationElement],
      ['CIMSymbolAnimationSize', getSizeAnimationElement],
      ['CIMSymbolAnimationTransparency', getTransparencyAnimationElement],
    ]

    const layer = {
      type: 'CIMSolidFill',
      size: 10,
    } as unknown as __esri.CIMSolidFill

    for (const [type, mockFn] of animationTypes) {
      const animation: __esri.CIMSymbolAnimation = {
        type,
        animatedSymbolProperties: { playAnimation: true },
      } as __esri.CIMSymbolAnimation

      const el = getAnimationElements(animation, layer)
      expect(mockFn).toHaveBeenCalled()
      expect(el).toBe(fakeEl)
    }
  })

  it('returns null if generator returns null', () => {
    ;(getColorAnimationElement as Mock).mockReturnValueOnce(null)

    const animation: __esri.CIMSymbolAnimation = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: true },
    } as __esri.CIMSymbolAnimation
    const layer: __esri.CIMSymbolLayer = {
      type: 'CIMSolidFill',
    } as __esri.CIMSymbolLayer

    expect(getAnimationElements(animation, layer)).toBeNull()
  })

  it('reverses from/to if reverseAnimation is true', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    el.setAttribute('from', '0')
    el.setAttribute('to', '1')
    ;(getColorAnimationElement as Mock).mockReturnValueOnce(el)

    const animation: __esri.CIMSymbolAnimation = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: true, reverseAnimation: true },
    } as unknown as __esri.CIMSymbolAnimation

    const layer: __esri.CIMSymbolLayer = {
      type: 'CIMSolidFill',
    } as __esri.CIMSymbolLayer
    const result = getAnimationElements(animation, layer)!
    expect(result.getAttribute('values')).toContain('1:0')
    expect(result.getAttribute('from')).toBeNull()
    expect(result.getAttribute('to')).toBeNull()
  })

  it('sets repeatCount if repeatType is Loop', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    el.setAttribute('from', '0')
    el.setAttribute('to', '1')
    ;(getColorAnimationElement as Mock).mockReturnValueOnce(el)

    const animation: __esri.CIMSymbolAnimation = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: true, repeatType: 'Loop' },
    } as unknown as __esri.CIMSymbolAnimation

    const layer: __esri.CIMSymbolLayer = {
      type: 'CIMSolidFill',
    } as __esri.CIMSymbolLayer
    const result = getAnimationElements(animation, layer)!
    expect(result.getAttribute('repeatCount')).toBe('indefinite')
  })

  it('applies startTimeOffset', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    el.setAttribute('from', '0')
    el.setAttribute('to', '1')
    ;(getColorAnimationElement as Mock).mockReturnValueOnce(el)

    const animation: __esri.CIMSymbolAnimation = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: true, startTimeOffset: 2 },
    } as unknown as __esri.CIMSymbolAnimation

    const layer: __esri.CIMSymbolLayer = {
      type: 'CIMSolidFill',
    } as __esri.CIMSymbolLayer
    const result = getAnimationElements(animation, layer)!
    expect(result.getAttribute('begin')).toBe('2s')
  })
})
