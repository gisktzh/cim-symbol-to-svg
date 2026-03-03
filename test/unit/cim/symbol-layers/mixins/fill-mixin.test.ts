import { describe, it, expect, vi } from 'vitest'
import { FillMixin } from '@/cim/symbol-layers/mixins/fill-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import { Globals } from '@/index'
import * as colorUtils from '@/utils/color'
import * as attrUtils from '@/utils/attr'
import { CIMFill } from '@arcgis/core/symbols/cim/types'

class MockCIMSymbolLayer implements CIMFill {
  type!: 'MockCIMSymbolLayer'
  enable!: true
}

describe('FillMixin', () => {
  class BaseTransformer extends AbstractCIMSymbolLayerTransformer<MockCIMSymbolLayer> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = FillMixin(BaseTransformer)

  it('returns fill attribute for string input', () => {
    const createAttrSpy = vi.spyOn(attrUtils, 'createAttr')

    const layer: MockCIMSymbolLayer = {
      type: 'MockCIMSymbolLayer',
      enable: true,
    }

    const globals: Globals = {
      defs: [],
      dimensions: {
        width: 0,
        height: 0,
      },
    }

    const instance = new MixinClass(layer, globals)

    const result = instance.transformFill('myGradient')
    expect(result).toHaveLength(1)
    expect(result[0]).toBeInstanceOf(Attr)
    expect(createAttrSpy).toHaveBeenCalledWith('fill', 'url(#myGradient)')
  })

  it('returns fill attribute for RGBA array input', () => {
    const fakeHex = '#112233'
    vi.spyOn(colorUtils, 'rgbaArrayToHex').mockReturnValue(fakeHex)
    const createAttrSpy = vi.spyOn(attrUtils, 'createAttr')

    const layer: MockCIMSymbolLayer = {
      type: 'MockCIMSymbolLayer',
      enable: true,
    }

    const globals: Globals = {
      defs: [],
      dimensions: {
        width: 0,
        height: 0,
      },
    }

    const instance = new MixinClass(layer, globals)
    const rgba: [number, number, number, number] = [17, 34, 51, 255]

    const result = instance.transformFill(rgba)
    expect(result).toHaveLength(2)
    expect(result[0]).toBeInstanceOf(Attr)
    expect(colorUtils.rgbaArrayToHex).toHaveBeenCalledWith(rgba)
    expect(createAttrSpy).toHaveBeenCalledWith('fill', fakeHex)
    expect(createAttrSpy).toHaveBeenCalledWith('opacity', '1')
  })
})
