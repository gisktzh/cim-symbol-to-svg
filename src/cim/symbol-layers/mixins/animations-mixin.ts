import { getAnimationElements } from '../../animations'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'

export function AnimationsMixin<
  T extends AbstractConstructor<
    AbstractCIMSymbolLayerTransformer<
      | __esri.CIMPictureMarker
      | __esri.CIMSolidFill
      | __esri.CIMSolidStroke
      | __esri.CIMVectorMarker
    >
  >,
>(Base: T) {
  abstract class MixinClass extends Base {
    getAnimationElements() {
      return this.layer.animations
        ?.map((a) => getAnimationElements(a, this.layer))
        .filter((a) => !!a)
    }
  }

  return MixinClass
}
