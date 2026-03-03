import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getSizeAnimationElement } from '@/cim/animations/animation-size'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'
import {
  CIMPictureMarker,
  CIMSymbolAnimationSize,
  CIMVectorMarker,
} from '@arcgis/core/symbols/cim/types'

describe('getSizeAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animateTransform element for CIMPictureMarker', () => {
    const animation: CIMSymbolAnimationSize = {
      type: 'CIMSymbolAnimationSize',
      toSize: 20,
    }
    const layer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      size: 10,
      url: '',
      enable: true,
    }

    const el = getSizeAnimationElement(animation, layer)

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('scale')
    expect(el.getAttribute('from')).toBe('1')
    expect(el.getAttribute('to')).toBe('2') // 20 / 10
  })

  it('creates an animateTransform element for CIMVectorMarker', () => {
    const animation: CIMSymbolAnimationSize = {
      type: 'CIMSymbolAnimationSize',
      toSize: 15,
    }
    const layer: CIMVectorMarker = {
      type: 'CIMVectorMarker',
      size: 5,
      frame: {
        xmin: 0,
        ymin: 0,
        xmax: 0,
        ymax: 0,
      },
      markerGraphics: [],
      enable: false,
    }

    const el = getSizeAnimationElement(animation, layer)

    expect(el.getAttribute('to')).toBe('3') // 15 / 5
  })

  it('handles fractional size values', () => {
    const animation: CIMSymbolAnimationSize = {
      type: 'CIMSymbolAnimationSize',
      toSize: 7.5,
    }
    const layer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      size: 2.5,
      url: '',
      enable: false,
    }

    const el = getSizeAnimationElement(animation, layer)

    expect(el.getAttribute('to')).toBe('3') // 7.5 / 2.5
  })
})
