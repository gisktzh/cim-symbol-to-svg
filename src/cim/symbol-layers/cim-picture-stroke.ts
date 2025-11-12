import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { StrokeMixin } from './mixins/stroke-mixin'
import { PictureMixin } from './mixins/picture-mixin'

export function isCIMPictureStroke(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMPictureStroke {
  return layer.type === 'CIMPictureStroke'
}

export class CIMPictureStrokeTransformer extends PictureMixin(
  StrokeMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMPictureStroke>)
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
