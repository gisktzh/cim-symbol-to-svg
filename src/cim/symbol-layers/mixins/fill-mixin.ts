import { CIMFill } from '@arcgis/core/symbols/cim/types'
import { createAttr } from '../../../utils/attr'
import { rgbaArrayToHex } from '../../../utils/color'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'

export function FillMixin<
  C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<T>>,
  T extends CIMFill,
>(Base: C) {
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
