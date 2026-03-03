import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StrokeMixin } from '@/cim/symbol-layers/mixins/stroke-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import * as attrUtils from '@/utils/attr'
import { CIMStroke } from '@arcgis/core/symbols/cim/types'

describe('StrokeMixin', () => {
  const createAttrSpy = vi.spyOn(attrUtils, 'createAttr')

  const Base = class extends AbstractCIMSymbolLayerTransformer<CIMStroke> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = StrokeMixin(Base)

  beforeEach(() => {
    createAttrSpy.mockClear()
  })

  it('should transform stroke with string value', () => {
    const layer: CIMStroke = {
      width: 5,
      capStyle: 'Round',
      joinStyle: 'Bevel',
      miterLimit: 10,
      enable: false,
    }
    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })

    const result = instance.transformStroke('my-gradient')

    expect(result).toHaveLength(5)
    expect(createAttrSpy).toHaveBeenCalledWith('stroke', 'url(#my-gradient)')
    expect(createAttrSpy).toHaveBeenCalledWith('stroke-width', '5')
    expect(createAttrSpy).toHaveBeenCalledWith('stroke-linecap', 'round')
    expect(createAttrSpy).toHaveBeenCalledWith('stroke-linejoin', 'bevel')
    expect(createAttrSpy).toHaveBeenCalledWith('stroke-miterlimit', '10')
  })

  it('should transform stroke with rgba array', () => {
    const layer: CIMStroke = {
      width: 2,
      capStyle: undefined,
      joinStyle: undefined,
      miterLimit: undefined,
      enable: false,
    }
    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })

    const rgba = [255, 0, 0, 1]
    const result = instance.transformStroke(rgba)

    expect(result[0].name).toBe('stroke')
    expect(result[1].name).toBe('stroke-width')
    expect(result[2].name).toBe('stroke-linecap')
    expect(result[3].name).toBe('stroke-linejoin')
    expect(result[4].name).toBe('stroke-miterlimit')
  })
})
