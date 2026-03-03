import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { FillMixin } from './mixins/fill-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'
import { CIMSolidFill } from '@arcgis/core/symbols/cim/types'

export class CIMSolidFillTransformer extends AnimationsMixin(
  FillMixin(AbstractCIMSymbolLayerTransformer<CIMSolidFill>)
) {
  getSvgAttrs() {
    return this.transformFill(this.layer.color)
  }

  getSvgElements() {
    const animations = this.getAnimationElements()

    return animations.length > 0 ? animations : null
  }
}
