import {
  CIMMarker,
  CIMSymbolAnimationSize,
} from '@arcgis/core/symbols/cim/types'
import { createEl } from '../../utils/svg-el'

export function getSizeAnimationElement(
  animation: CIMSymbolAnimationSize,
  layer: CIMMarker
) {
  const el = createEl('animateTransform')
  el.setAttribute('additive', 'sum')
  el.setAttribute('type', 'scale')
  el.setAttribute('from', '1')
  el.setAttribute('to', (animation.toSize / layer.size).toString())

  return el
}
