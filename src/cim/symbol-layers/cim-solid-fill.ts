import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { FillMixin } from './mixins/fill-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'

export function isCIMSolidFill(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMSolidFill {
  return layer.type === 'CIMSolidFill'
}

export class CIMSolidFillTransformer extends AnimationsMixin(
  FillMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMSolidFill>)
) {
  getSvgAttrs() {
    return this.transformFill(this.layer.color)
  }

  getSvgElements() {
    const animations = this.getAnimationElements()

    return animations ? animations : null
  }
}
