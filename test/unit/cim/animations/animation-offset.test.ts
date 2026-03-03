import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOffsetAnimationElement } from '@/cim/animations/animation-offset'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'
import {
  CIMHatchFill,
  CIMPictureFill,
  CIMPictureMarker,
  CIMSymbolAnimationOffset,
  CIMVectorMarker,
} from '@arcgis/core/symbols/cim/types'

describe('getOffsetAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animateTransform element for supported layers with no existing offsets', () => {
    const animation: CIMSymbolAnimationOffset = {
      type: 'CIMSymbolAnimationOffset',
      offsetX: 15,
      offsetY: 25,
    }
    const layer: CIMHatchFill = {
      type: 'CIMHatchFill',
      lineSymbol: {
        type: 'CIMLineSymbol',
      },
      enable: false,
    }

    const el = getOffsetAnimationElement(animation, layer)

    expect(createEl).toHaveBeenCalledWith('animateTransform')
    expect(el.tagName).toBe('animateTransform')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('type')).toBe('translate')
    expect(el.getAttribute('from')).toBe('0 0')
    expect(el.getAttribute('to')).toBe('15 25')
  })

  it('respects existing layer offsets', () => {
    const animation: CIMSymbolAnimationOffset = {
      type: 'CIMSymbolAnimationOffset',
      offsetX: 20,
      offsetY: 30,
    }
    const layer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      offsetX: 5,
      offsetY: 10,
      url: '',
      size: 0,
      enable: true,
    }

    const el = getOffsetAnimationElement(animation, layer)

    expect(el.getAttribute('to')).toBe('15 20') // 20 - 5 and 30 - 10
  })

  it('handles only offsetX defined', () => {
    const animation: CIMSymbolAnimationOffset = {
      type: 'CIMSymbolAnimationOffset',
      offsetX: 12,
      offsetY: 0,
    }
    const layer: CIMVectorMarker = {
      type: 'CIMVectorMarker',
      offsetX: 2,
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

    const el = getOffsetAnimationElement(animation, layer)

    expect(el.getAttribute('to')).toBe('10 0')
  })

  it('handles only offsetY defined', () => {
    const animation: CIMSymbolAnimationOffset = {
      type: 'CIMSymbolAnimationOffset',
      offsetY: 8,
      offsetX: 0,
    }
    const layer: CIMPictureFill = {
      type: 'CIMPictureFill',
      offsetY: 3,
      url: '',
      height: 0,
      enable: false,
    }

    const el = getOffsetAnimationElement(animation, layer)

    expect(el.getAttribute('to')).toBe('0 5')
  })
})
