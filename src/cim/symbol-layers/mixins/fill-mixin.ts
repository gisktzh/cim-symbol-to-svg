import { createAttr } from '../../../utils/attr'
import { rgbaArrayToHex } from '../../../utils/color'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'

export function FillMixin<
  T extends AbstractConstructor<
    AbstractCIMSymbolLayerTransformer<
      | __esri.CIMGradientFill
      | __esri.CIMGradientStroke
      | __esri.CIMHatchFill
      | __esri.CIMPictureFill
      | __esri.CIMSolidFill
    >
  >,
>(Base: T) {
  abstract class MixinClass extends Base {
    transformFill(fillValue: string | number[]) {
      const attrs = []

      if (typeof fillValue === 'string') {
        attrs.push(createAttr('fill', `url(#${fillValue})`))
      } else {
        attrs.push(createAttr('fill', rgbaArrayToHex(fillValue)))
        if (fillValue.length === 4) {
          attrs.push(
            createAttr(
              'opacity',
              (Math.round((fillValue[3] / 255) * 100) / 100).toString()
            )
          )
        }
      }

      return attrs
    }
  }

  return MixinClass
}
