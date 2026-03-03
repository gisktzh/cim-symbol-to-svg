import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getRotationAnimationElement } from '@/cim/animations/animation-rotation'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'
import {
  CIMHatchFill,
  CIMPictureMarker,
  CIMSymbolAnimationRotation,
  CIMVectorMarker,
} from '@arcgis/core/symbols/cim/types'

describe('getRotationAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animateTransform element for supported layers', () => {
    const animation: CIMSymbolAnimationRotation = {
      type: 'CIMSymbolAnimationRotation',
      toRotation: 90,
      rotateClockwise: true,
    }
    const layer: CIMHatchFill = {
      type: 'CIMHatchFill',
      rotation: 30,
      lineSymbol: {
        type: 'CIMLineSymbol',
      },
      enable: false,
    }

    const el = getRotationAnimationElement(animation, layer)

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('rotation')
    expect(el.getAttribute('from')).toBe('30')
    expect(el.getAttribute('to')).toBe('90')
  })

  it('negates rotation if rotateClockwise is false', () => {
    const animation: CIMSymbolAnimationRotation = {
      type: 'CIMSymbolAnimationRotation',
      toRotation: 45,
      rotateClockwise: false,
    }
    const layer: CIMVectorMarker = {
      type: 'CIMVectorMarker',
      rotation: 10,
      frame: {
        xmin: 0,
        ymin: 0,
        xmax: 0,
        ymax: 0,
      },
      markerGraphics: [],
      size: 0,
      enable: false,
    }

    const el = getRotationAnimationElement(animation, layer)

    expect(el.getAttribute('from')).toBe('10')
    expect(el.getAttribute('to')).toBe('-45') // negated
  })

  it('defaults layer.rotation to 0 if not defined', () => {
    const animation: CIMSymbolAnimationRotation = {
      type: 'CIMSymbolAnimationRotation',
      toRotation: 60,
      rotateClockwise: true,
    }
    const layer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      url: '',
      size: 0,
      enable: false,
    }

    const el = getRotationAnimationElement(animation, layer)

    expect(el.getAttribute('from')).toBe('0')
    expect(el.getAttribute('to')).toBe('60')
  })
})
