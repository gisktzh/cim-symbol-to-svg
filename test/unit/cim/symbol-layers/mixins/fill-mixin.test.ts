import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FillMixin } from '@/cim/symbol-layers/mixins/fill-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import { Globals } from '@/index'
import * as colorUtils from '@/utils/color'
import * as attrUtils from '@/utils/attr'

describe('FillMixin', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class BaseTransformer extends AbstractCIMSymbolLayerTransformer<any> {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = new MixinClass({} as any, {} as Globals)

    const result = instance.transformFill('myGradient')
    expect(result).toHaveLength(1)
    expect(result[0]).toBeInstanceOf(Attr)
    expect(createAttrSpy).toHaveBeenCalledWith('fill', 'url(#myGradient)')
  })

  it('returns fill attribute for RGBA array input', () => {
    const fakeHex = '#112233'
    vi.spyOn(colorUtils, 'rgbaArrayToHex').mockReturnValue(fakeHex)
    const createAttrSpy = vi.spyOn(attrUtils, 'createAttr')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = new MixinClass({} as any, {} as Globals)
    const rgba: [number, number, number, number] = [17, 34, 51, 255]

    const result = instance.transformFill(rgba)
    expect(result).toHaveLength(2)
    expect(result[0]).toBeInstanceOf(Attr)
    expect(colorUtils.rgbaArrayToHex).toHaveBeenCalledWith(rgba)
    expect(createAttrSpy).toHaveBeenCalledWith('fill', fakeHex)
    expect(createAttrSpy).toHaveBeenCalledWith('opacity', '1')
  })
})
