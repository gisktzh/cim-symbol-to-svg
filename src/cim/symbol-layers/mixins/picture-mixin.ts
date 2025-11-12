import { warn } from '../../../utils/logging'
import { createEl } from '../../../utils/svg-el'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'

export function PictureMixin<
  T extends AbstractConstructor<
    AbstractCIMSymbolLayerTransformer<
      __esri.CIMPictureFill | __esri.CIMPictureMarker | __esri.CIMPictureStroke
    >
  >,
>(Base: T) {
  abstract class MixinClass extends Base {
    transformPicture(width?: number, height?: number) {
      const image = this.getImageEl()

      const pattern = createEl('pattern')
      if (width) {
        pattern.setAttribute('width', width.toString())
      }
      if (height) {
        pattern.setAttribute('height', height.toString())
      }

      pattern.setAttribute('patternUnits', 'userSpaceOnUse')

      const uuid = crypto.randomUUID()
      pattern.setAttribute('id', uuid)

      pattern.appendChild(image)

      this.globals.defs.push(pattern)

      return uuid
    }

    getImageEl() {
      const image = createEl('image')
      image.setAttribute('href', this.layer.url)
      image.setAttribute('xlink:href', this.layer.url)
      image.setAttribute('crossorigin', 'anonymous')

      if (this.layer.colorSubstitutions) {
        warn('Color substitution is currently not supported')
      }

      return image
    }
  }

  return MixinClass
}
