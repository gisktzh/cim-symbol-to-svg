import { CIMSymbolAnimationScale } from '@arcgis/core/symbols/cim/types'
import { createEl } from '../../utils/svg-el'

export function getScaleAnimationElement(animation: CIMSymbolAnimationScale) {
  const el = createEl('animateTransform')
  el.setAttribute('additive', 'sum')
  el.setAttribute('type', 'scale')
  el.setAttribute('from', '1')
  el.setAttribute('to', animation.scaleFactor.toString())

  return el
}
