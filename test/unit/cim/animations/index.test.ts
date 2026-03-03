import {
  CIMSolidFill,
  CIMSymbolAnimation,
  CIMSymbolAnimationColor,
  CIMSymbolLayerUnion,
} from '@arcgis/core/symbols/cim/types'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getAnimationElements } from '../../../../src/cim/animations'

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

import { getColorAnimationElement } from '../../../../src/cim/animations/animation-color'
import { getOffsetAnimationElement } from '../../../../src/cim/animations/animation-offset'
import { getRotationAnimationElement } from '../../../../src/cim/animations/animation-rotation'
import { getScaleAnimationElement } from '../../../../src/cim/animations/animation-scale'
import { getSizeAnimationElement } from '../../../../src/cim/animations/animation-size'
import { getTransparencyAnimationElement } from '../../../../src/cim/animations/animation-transparency'
import getOtherLayerTypes from '../../../test-utils/get-other-layer-types'

describe('getAnimationElements', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null if playAnimation is false', () => {
    const animation: CIMSymbolAnimation = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: false },
      toColor: [255, 255, 255, 255],
    }
    const layer: CIMSolidFill = {
      type: 'CIMSolidFill',
      color: [255, 255, 255, 255],
      enable: true,
    }

    expect(getAnimationElements(animation, layer)).toBeNull()
  })

  it('calls the correct generator based on animation type', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const animationTypes: {
      animation: CIMSymbolAnimation
      callback: Function
      acceptedLayerTypes: CIMSymbolLayerUnion['type'][]
    }[] = [
      {
        animation: {
          type: 'CIMSymbolAnimationColor',
          toColor: [255, 255, 255, 255],
          animatedSymbolProperties: { playAnimation: true },
        },
        callback: getColorAnimationElement,
        acceptedLayerTypes: ['CIMSolidFill', 'CIMSolidStroke'],
      },
      {
        animation: {
          type: 'CIMSymbolAnimationOffset',
          offsetX: 0,
          offsetY: 0,
          animatedSymbolProperties: { playAnimation: true },
        },
        callback: getOffsetAnimationElement,
        acceptedLayerTypes: [
          'CIMPictureMarker',
          'CIMVectorMarker',
          'CIMHatchFill',
          'CIMPictureFill',
        ],
      },
      {
        animation: {
          type: 'CIMSymbolAnimationRotation',
          toRotation: 360,
          animatedSymbolProperties: { playAnimation: true },
        },
        callback: getRotationAnimationElement,
        acceptedLayerTypes: [
          'CIMPictureMarker',
          'CIMVectorMarker',
          'CIMHatchFill',
          'CIMPictureFill',
        ],
      },
      {
        animation: {
          type: 'CIMSymbolAnimationScale',
          scaleFactor: 1.2,
          animatedSymbolProperties: { playAnimation: true },
        },
        callback: getScaleAnimationElement,
        acceptedLayerTypes: [
          'CIMGradientFill',
          'CIMPictureMarker',
          'CIMVectorMarker',
          'CIMGradientStroke',
          'CIMHatchFill',
          'CIMPictureFill',
          'CIMPictureStroke',
          'CIMSolidFill',
          'CIMSolidStroke',
        ],
      },
      {
        animation: {
          type: 'CIMSymbolAnimationSize',
          toSize: 42,
          animatedSymbolProperties: { playAnimation: true },
        },
        callback: getSizeAnimationElement,
        acceptedLayerTypes: ['CIMPictureMarker', 'CIMVectorMarker'],
      },
      {
        animation: {
          type: 'CIMSymbolAnimationTransparency',
          toTransparency: 1,
          animatedSymbolProperties: { playAnimation: true },
        },
        callback: getTransparencyAnimationElement,
        acceptedLayerTypes: [
          'CIMGradientFill',
          'CIMPictureMarker',
          'CIMVectorMarker',
          'CIMGradientStroke',
          'CIMHatchFill',
          'CIMPictureFill',
          'CIMPictureStroke',
          'CIMSolidFill',
          'CIMSolidStroke',
        ],
      },
    ]

    for (const { animation, callback, acceptedLayerTypes } of animationTypes) {
      acceptedLayerTypes.forEach((layerType) => {
        const layer: CIMSymbolLayerUnion = {
          type: layerType,
        } as CIMSymbolLayerUnion // Typesafety is given by `layerType`, as typeguards later on ensure that stuff works. That's what we're actually testing.

        const el = getAnimationElements(animation, layer)
        expect(callback).toHaveBeenCalled()
        expect(el).toBe(fakeEl)
      })

      getOtherLayerTypes(acceptedLayerTypes).forEach((layerType) => {
        const layer: CIMSymbolLayerUnion = {
          type: layerType,
        } as CIMSymbolLayerUnion // Typesafety is given by `layerType`, as typeguards later on ensure that stuff works. That's what we're actually testing.

        expect(() => getAnimationElements(animation, layer)).toThrow()
      })
    }
  })

  it('reverses from/to if reverseAnimation is true', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    el.setAttribute('from', '0')
    el.setAttribute('to', '1')
    vi.mocked(getColorAnimationElement).mockReturnValueOnce(el)

    const animation: CIMSymbolAnimationColor = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: true, reverseAnimation: true },
      toColor: [255, 255, 255, 255],
    }

    const layer: CIMSolidFill = {
      type: 'CIMSolidFill',
      color: [0, 0, 0, 0],
      enable: false,
    }
    const result = getAnimationElements(animation, layer)!
    expect(result.getAttribute('values')).toContain('1:0')
    expect(result.getAttribute('from')).toBeNull()
    expect(result.getAttribute('to')).toBeNull()
  })

  it('sets repeatCount if repeatType is Loop', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    el.setAttribute('from', '0')
    el.setAttribute('to', '1')
    vi.mocked(getColorAnimationElement).mockReturnValueOnce(el)

    const animation: CIMSymbolAnimationColor = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: true, repeatType: 'Loop' },
      toColor: [255, 255, 255, 255],
    }

    const layer: CIMSolidFill = {
      type: 'CIMSolidFill',
      color: [0, 0, 0, 0],
      enable: false,
    }
    const result = getAnimationElements(animation, layer)!
    expect(result.getAttribute('repeatCount')).toBe('indefinite')
  })

  it('applies startTimeOffset', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    el.setAttribute('from', '0')
    el.setAttribute('to', '1')
    vi.mocked(getColorAnimationElement).mockReturnValueOnce(el)

    const animation: CIMSymbolAnimationColor = {
      type: 'CIMSymbolAnimationColor',
      animatedSymbolProperties: { playAnimation: true, startTimeOffset: 2 },
      toColor: [255, 255, 255, 255],
    }

    const layer: CIMSolidFill = {
      type: 'CIMSolidFill',
      color: [0, 0, 0, 0],
      enable: false,
    }
    const result = getAnimationElements(animation, layer)!
    expect(result.getAttribute('begin')).toBe('2s')
  })
})
