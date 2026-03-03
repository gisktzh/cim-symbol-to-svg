import { describe, it, expect, vi } from 'vitest'
import { PictureMixin } from '@/cim/symbol-layers/mixins/picture-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import * as svgUtils from '@/utils/svg-el'
import * as logging from '@/utils/logging'
import { CIMPictureMarker } from '@arcgis/core/symbols/cim/types'

describe('PictureMixin', () => {
  const Base = class extends AbstractCIMSymbolLayerTransformer<CIMPictureMarker> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = PictureMixin(Base)

  it('should create a pattern with image inside', () => {
    const createElSpy = vi.spyOn(svgUtils, 'createEl')
    const fakeEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'pattern'
    )
    createElSpy.mockReturnValue(fakeEl)
    const appendChildSpy = vi
      .spyOn(fakeEl, 'appendChild')
      .mockImplementation((n) => n)
    const setAttributeSpy = vi
      .spyOn(fakeEl, 'setAttribute')
      .mockImplementation(() => {})

    const globals = { defs: [], dimensions: { width: -1, height: -1 } }
    const layer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      url: 'https://example.com/img.png',
      size: 0,
      enable: true,
    }
    const instance = new MixinClass(layer, globals)

    const uuid = instance.transformPicture(100, 200)

    expect(createElSpy).toHaveBeenCalledWith('image')
    expect(createElSpy).toHaveBeenCalledWith('pattern')
    expect(appendChildSpy).toHaveBeenCalledWith(fakeEl)
    expect(setAttributeSpy).toHaveBeenCalledWith('width', '100')
    expect(setAttributeSpy).toHaveBeenCalledWith('height', '200')
    expect(setAttributeSpy).toHaveBeenCalledWith(
      'patternUnits',
      'userSpaceOnUse'
    )
    expect(setAttributeSpy).toHaveBeenCalledWith('id', uuid)
    expect(globals.defs).toContain(fakeEl)
  })

  it('should create an image element with the right attributes', () => {
    const createElSpy = vi.spyOn(svgUtils, 'createEl')
    const fakeImage = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    )
    createElSpy.mockReturnValue(fakeImage)

    const spy = vi.spyOn(fakeImage, 'setAttribute')

    const layer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      url: 'https://example.com/img.png',
      size: 0,
      enable: true,
    }

    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })
    const el = instance.getImageEl()

    expect(el).toBe(fakeImage)

    expect(spy).toHaveBeenCalledWith('href', 'https://example.com/img.png')
    expect(spy).toHaveBeenCalledWith(
      'xlink:href',
      'https://example.com/img.png'
    )
    expect(spy).toHaveBeenCalledWith('crossorigin', 'anonymous')
  })

  it('should warn when colorSubstitutions is present', () => {
    const warnSpy = vi.spyOn(logging, 'warn').mockImplementation(() => {})

    const createElSpy = vi.spyOn(svgUtils, 'createEl')
    const fakeImage = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    )
    createElSpy.mockReturnValue(fakeImage)

    const layer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      url: 'https://example.com/img.png',
      size: 0,
      enable: true,
      colorSubstitutions: [
        {
          oldColor: [255, 0, 0, 255],
          newColor: [0, 255, 0, 255],
        },
      ],
    }

    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })
    instance.getImageEl()

    expect(warnSpy).toHaveBeenCalledWith(
      'Color substitution is currently not supported'
    )
  })
})
