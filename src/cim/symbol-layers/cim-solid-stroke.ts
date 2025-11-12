import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { StrokeMixin } from './mixins/stroke-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'

export function isCIMSolidStroke(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMSolidStroke {
  return layer.type === 'CIMSolidStroke'
}

export class CIMSolidStrokeTransformer extends AnimationsMixin(
  StrokeMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMSolidStroke>)
) {
  getSvgAttrs() {
    return this.transformStroke(this.layer.color)
  }

  getSvgElements() {
    const animations = this.getAnimationElements()

    return animations ? animations : null
  }
}
