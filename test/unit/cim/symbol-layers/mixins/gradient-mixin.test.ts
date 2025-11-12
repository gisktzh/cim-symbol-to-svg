import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GradientMixin } from '@/cim/symbol-layers/mixins/gradient-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import { Globals } from '@/index'
import * as colorUtils from '@/utils/color'
import * as svgUtils from '@/utils/svg-el'
import * as logging from '@/utils/logging'

describe('GradientMixin', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
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

  const MixinClass = GradientMixin(BaseTransformer)

  it('creates linear gradient stops for CIMLinearContinuousColorRamp', () => {
    const createElSpy = vi.spyOn(svgUtils, 'createEl').mockImplementation(
      (tag: string) =>
        ({
          tag,
          setAttribute: vi.fn(),
          append: vi.fn(),
        }) as unknown as SVGElement
    )
    const rgbaSpy = vi
      .spyOn(colorUtils, 'rgbaArrayToHex')
      .mockImplementation((arr: number[]) => `#${arr.join('')}`)
    const layer = {
      colorRamp: {
        type: 'CIMLinearContinuousColorRamp',
        fromColor: [1, 2, 3, 1],
        toColor: [4, 5, 6, 1],
      } as __esri.CIMColorRamp,
      gradientMethod: 'Linear',
    }
    const globals = {
      defs: [],
      dimensions: { width: -1, height: -1 },
    } as Globals
    const instance = new MixinClass(layer, globals)

    const stops = instance.getStops(layer.colorRamp, 0, 100)
    expect(stops).toHaveLength(2)
    expect(createElSpy).toHaveBeenCalledWith('stop')
    expect(rgbaSpy).toHaveBeenCalledTimes(2)
  })

  it('creates fixed color ramp stops', () => {
    vi.spyOn(colorUtils, 'rgbaArrayToHex').mockImplementation(
      (arr: number[]) => `#${arr.join('')}`
    )

    const layer = {
      colorRamp: {
        type: 'CIMFixedColorRamp',
        colors: [
          [1, 2, 3, 1],
          [4, 5, 6, 1],
        ],
      } as __esri.CIMColorRamp,
      gradientMethod: 'Linear',
    }
    const globals = {
      defs: [],
      dimensions: { width: -1, height: -1 },
    } as Globals
    const instance = new MixinClass(layer, globals)

    const stops = instance.getStops(layer.colorRamp, 0, 100)
    expect(stops).toHaveLength(2)
  })

  it('should warn when gradient method is Rectangular', () => {
    const warnSpy = vi.spyOn(logging, 'warn').mockImplementation(() => {})

    const instance = new MixinClass(
      {
        gradientMethod: 'Rectangular',
        colorRamp: {
          type: 'CIMLinearContinuousColorRamp',
          fromColor: [0, 0, 0, 1],
          toColor: [255, 255, 255, 1],
        },
      },
      { defs: [], dimensions: { width: 100, height: 100 } }
    )

    instance.transformGradient()
    expect(warnSpy).toHaveBeenCalledWith(
      'Rectangular gradients are currently not supported'
    )

    warnSpy.mockRestore()
  })
})
