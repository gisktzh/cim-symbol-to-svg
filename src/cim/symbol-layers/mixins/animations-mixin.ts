import {
  CIMPictureMarker,
  CIMSolidFill,
  CIMSolidStroke,
  CIMVectorMarker,
} from '@arcgis/core/symbols/cim/types'
import { getAnimationElements } from '../../animations'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'

export function AnimationsMixin<
  C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<T>>,
  T extends CIMPictureMarker | CIMSolidFill | CIMSolidStroke | CIMVectorMarker,
>(Base: C) {
  abstract class MixinClass extends Base {
    getAnimationElements() {
      return (
        this.layer.animations
          ?.map((a) =>
            getAnimationElements<NonNullable<T['animations']>[number]>(
              a,
              this.layer
            )
          )
          .filter((a) => !!a) || []
      )
    }
  }

  return MixinClass
}
