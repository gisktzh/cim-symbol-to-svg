import { createAttr } from '../../../utils/attr'
import { rgbaArrayToHex } from '../../../utils/color'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'

export function StrokeMixin<
  T extends AbstractConstructor<
    AbstractCIMSymbolLayerTransformer<
      __esri.CIMGradientStroke | __esri.CIMSolidStroke | __esri.CIMPictureStroke
    >
  >,
>(Base: T) {
  abstract class MixinClass extends Base {
    transformStroke(strokeValue: string | number[]) {
      return [
        createAttr(
          'stroke',
          typeof strokeValue === 'string'
            ? `url(#${strokeValue})`
            : rgbaArrayToHex(strokeValue)
        ),
        createAttr('stroke-width', this.layer.width.toString()),
        createAttr(
          'stroke-linecap',
          this.layer.capStyle ? this.layer.capStyle.toLocaleLowerCase() : null
        ),
        createAttr(
          'stroke-linejoin',
          this.layer.joinStyle ? this.layer.joinStyle.toLocaleLowerCase() : null
        ),
        createAttr(
          'stroke-miterlimit',
          this.layer.miterLimit ? this.layer.miterLimit.toString() : null
        ),
      ]
    }
  }

  return MixinClass
}
