import { CIMGradientStroke } from '@arcgis/core/symbols/cim/types'
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { GradientMixin } from './mixins/gradient-mixin'
import { StrokeMixin } from './mixins/stroke-mixin'

export class CIMGradientStrokeTransformer extends GradientMixin(
  StrokeMixin(AbstractCIMSymbolLayerTransformer<CIMGradientStroke>)
) {
  getSvgAttrs() {
    const fillUuid = this.transformGradient()
    return this.transformStroke(fillUuid)
  }

  getSvgElements() {
    return null
  }
}
