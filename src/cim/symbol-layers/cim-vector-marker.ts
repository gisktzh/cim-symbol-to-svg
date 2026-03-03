import { transformMarkerGraphicToSvg } from '../graphics/cim-marker-graphic'
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { MarkerMixin } from './mixins/marker-mixin'
import { AnimationsMixin } from './mixins/animations-mixin'
import { CIMVectorMarker } from '@arcgis/core/symbols/cim/types'

export class CIMVectorMarkerTransformer extends AnimationsMixin(
  MarkerMixin(AbstractCIMSymbolLayerTransformer<CIMVectorMarker>)
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
      graphics
        .filter((g) => !!g)
        .forEach((g) =>
          rotationAttrs.forEach((a) => {
            g.setAttribute(a.name, a.value)
          })
        )
    }

    const animationEls = this.getAnimationElements()
    animationEls.forEach((a) =>
      graphics.forEach((g) => {
        g!.appendChild(a.cloneNode(true))
      })
    )

    return graphics.filter((g) => !!g)
  }
}
