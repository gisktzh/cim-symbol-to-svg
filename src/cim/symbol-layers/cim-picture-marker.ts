import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { PictureMixin } from './mixins/picture-mixin'
import { MarkerMixin } from './mixins/marker-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'

export function isCIMPictureMarker(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMPictureMarker {
  return layer.type === 'CIMPictureMarker'
}

export class CIMPictureMarkerTransformer extends AnimationsMixin(
  MarkerMixin(
    PictureMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMPictureMarker>)
  )
) {
  getSvgAttrs() {
    return []
  }

  getSvgElements() {
    const el = this.getImageEl()

    const rotationAttrs = this.getRotationAttrs()
    if (rotationAttrs.length) {
      rotationAttrs.forEach((a) => el.setAttributeNode(a))
    }

    const width = this.layer.size
      ? this.layer.size * (this.layer.scaleX ? this.layer.scaleX : 1)
      : null
    if (width) {
      el.setAttribute('width', width.toString())
    }

    if (this.layer.size) {
      el.setAttribute('height', this.layer.size.toString())
    } else if (this.layer.height) {
      el.setAttribute('height', this.layer.height.toString())
    }

    if (this.layer.offsetX) {
      el.setAttribute('x', this.layer.offsetX.toString())
    }

    if (this.layer.offsetY) {
      el.setAttribute('y', this.layer.offsetY.toString())
    }

    const animationEls = this.getAnimationElements()
    if (animationEls) {
      animationEls.forEach((a) => el.appendChild(a.cloneNode(true)))
    }

    return [el]
  }
}
