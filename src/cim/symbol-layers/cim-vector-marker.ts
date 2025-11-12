import { transformMarkerGraphicToSvg } from '../graphics/cim-marker-graphic'
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { MarkerMixin } from './mixins/marker-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'

export function isCIMVectorMarker(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMVectorMarker {
  return layer.type === 'CIMVectorMarker'
}

export class CIMVectorMarkerTransformer extends AnimationsMixin(
  MarkerMixin(AbstractCIMSymbolLayerTransformer<__esri.CIMVectorMarker>)
) {
  getSvgAttrs() {
    return []
  }

  getSvgElements() {
    const graphics = this.layer.markerGraphics.map((graphic) =>
      transformMarkerGraphicToSvg(
        graphic,
        this.layer.frame,
        this.globals,
        this.layer.offsetX,
        this.layer.offsetY
      )
    )

    const rotationAttrs = this.getRotationAttrs()
    if (rotationAttrs.length) {
      graphics.forEach((g) =>
        rotationAttrs.forEach((a) =>
          g!.setAttributeNode(a.cloneNode(true) as Attr)
        )
      )
    }

    const animationEls = this.getAnimationElements()
    if (animationEls) {
      graphics.forEach((g) =>
        animationEls.forEach((a) => g!.appendChild(a.cloneNode(true)))
      )
    }

    return graphics.filter((g) => !!g)
  }
}
