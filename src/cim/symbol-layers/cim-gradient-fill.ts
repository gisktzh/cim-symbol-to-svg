import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { FillMixin } from './mixins/fill-mixin'
import { GradientMixin } from './mixins/gradient-mixin'

export function isCIMGradientFill(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMGradientFill {
  return layer.type === 'CIMGradientFill'
}

export class CIMGradientFillTransformer extends GradientMixin(
  FillMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMGradientFill>)
) {
  getSvgAttrs() {
    const fillUuid = this.transformGradient()
    return this.transformFill(fillUuid)
  }

  getSvgElements() {
    return null
  }
}
