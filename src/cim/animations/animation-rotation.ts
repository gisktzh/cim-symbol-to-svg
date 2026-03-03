import {
  CIMHatchFill,
  CIMMarker,
  CIMPictureFill,
  CIMSymbolAnimationRotation,
} from '@arcgis/core/symbols/cim/types'
import { createEl } from '../../utils/svg-el'

export function getRotationAnimationElement(
  animation: CIMSymbolAnimationRotation,
  layer: CIMMarker | CIMPictureFill | CIMHatchFill
) {
  let toRotation = animation.toRotation
  if (!animation.rotateClockwise) {
    toRotation *= -1
  }

  const el = createEl('animateTransform')
  el.setAttribute('additive', 'sum')
  el.setAttribute('type', 'rotation')
  el.setAttribute('from', (layer.rotation || 0).toString())
  el.setAttribute('to', toRotation.toString())

  return el
}
