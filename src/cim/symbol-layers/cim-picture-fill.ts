import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { FillMixin } from './mixins/fill-mixin'
import { PictureMixin } from './mixins/picture-mixin'

export function isCIMPictureFill(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMPictureFill {
  return layer.type === 'CIMPictureFill'
}

export class CIMPictureFillTransformer extends FillMixin(
  PictureMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMPictureFill>)
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
