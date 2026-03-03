import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { PictureMixin } from './mixins/picture-mixin'
import { MarkerMixin } from './mixins/marker-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'
import { CIMPictureMarker } from '@arcgis/core/symbols/cim/types'

export class CIMPictureMarkerTransformer extends AnimationsMixin(
  MarkerMixin(PictureMixin(AbstractCIMSymbolLayerTransformer<CIMPictureMarker>))
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
    }

    if (this.layer.offsetX) {
      el.setAttribute('x', this.layer.offsetX.toString())
    }

    if (this.layer.offsetY) {
      el.setAttribute('y', this.layer.offsetY.toString())
    }

    const animationEls = this.getAnimationElements()
    animationEls.forEach((a) => el.appendChild(a.cloneNode(true)))

    return [el]
  }
}
