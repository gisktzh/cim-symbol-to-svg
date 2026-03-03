import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { StrokeMixin } from './mixins/stroke-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'
import { CIMSolidStroke } from '@arcgis/core/symbols/cim/types'

export class CIMSolidStrokeTransformer extends AnimationsMixin(
  StrokeMixin(AbstractCIMSymbolLayerTransformer<CIMSolidStroke>)
) {
  getSvgAttrs() {
    return this.transformStroke(this.layer.color)
  }

  getSvgElements() {
    const animations = this.getAnimationElements()

    return animations.length > 0 ? animations : null
  }
}
