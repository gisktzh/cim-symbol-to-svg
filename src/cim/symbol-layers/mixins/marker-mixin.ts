import { CIMMarker } from '@arcgis/core/symbols/cim/types'
import { createAttr } from '../../../utils/attr'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'

export function MarkerMixin<
  C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<T>>,
  T extends CIMMarker,
>(Base: C) {
  abstract class MixinClass extends Base {
    getRotationAttrs() {
      const attrs: Attr[] = []

      if (this.layer.rotation) {
        attrs.push(
          createAttr(
            'transform',
            `rotate(${(this.layer.rotateClockwise ? 1 : -1) * this.layer.rotation})`
          )
        )

        if (this.layer.anchorPoint) {
          let unit = ''
          if (
            this.layer.anchorPointUnits &&
            this.layer.anchorPointUnits === 'Relative'
          ) {
            unit = '%'
          }

          attrs.push(
            createAttr(
              'transform-origin',
              `${this.layer.anchorPoint.x}${unit} ${this.layer.anchorPoint.y}${unit}`
            )
          )
        } else {
          attrs.push(createAttr('transform-origin', 'center'))
        }
      }

      return attrs
    }
  }

  return MixinClass
}
