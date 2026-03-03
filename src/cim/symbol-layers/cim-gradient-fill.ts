import { CIMGradientFill } from '@arcgis/core/symbols/cim/types'
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { FillMixin } from './mixins/fill-mixin'
import { GradientMixin } from './mixins/gradient-mixin'

export class CIMGradientFillTransformer extends GradientMixin(
  FillMixin(AbstractCIMSymbolLayerTransformer<CIMGradientFill>)
) {
  getSvgAttrs() {
    const fillUuid = this.transformGradient()
    return this.transformFill(fillUuid)
  }

  getSvgElements() {
    return null
  }
}
