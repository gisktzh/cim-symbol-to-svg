import { CIMPictureFill } from '@arcgis/core/symbols/cim/types'
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { FillMixin } from './mixins/fill-mixin'
import { PictureMixin } from './mixins/picture-mixin'

export class CIMPictureFillTransformer extends FillMixin(
  PictureMixin(AbstractCIMSymbolLayerTransformer<CIMPictureFill>)
) {
  getSvgAttrs() {
    const pictureUuid = this.transformPicture(50, 50)
    const fillAttrs = this.transformFill(pictureUuid)

    return fillAttrs
  }

  getSvgElements() {
    return null
  }
}
