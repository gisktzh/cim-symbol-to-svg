import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { StrokeMixin } from './mixins/stroke-mixin'
import { PictureMixin } from './mixins/picture-mixin'
import { CIMPictureStroke } from '@arcgis/core/symbols/cim/types'

export class CIMPictureStrokeTransformer extends PictureMixin(
  StrokeMixin(AbstractCIMSymbolLayerTransformer<CIMPictureStroke>)
) {
  getSvgAttrs() {
    const pictureUuid = this.transformPicture()
    const strokeAttrs = this.transformStroke(pictureUuid)

    return strokeAttrs
  }

  getSvgElements() {
    return null
  }
}
