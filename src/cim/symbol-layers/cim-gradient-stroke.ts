import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { GradientMixin } from './mixins/gradient-mixin'
import { StrokeMixin } from './mixins/stroke-mixin'

export function isCIMGradientStroke(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMGradientStroke {
  return layer.type === 'CIMGradientStroke'
}

export class CIMGradientStrokeTransformer extends GradientMixin(
  StrokeMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMGradientStroke>)
) {
  getSvgAttrs() {
    const fillUuid = this.transformGradient()
    return this.transformStroke(fillUuid)
  }

  getSvgElements() {
    return null
  }
}
