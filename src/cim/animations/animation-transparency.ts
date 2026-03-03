import { CIMSymbolAnimationTransparency } from '@arcgis/core/symbols/cim/types'
import { createEl } from '../../utils/svg-el'

export function getTransparencyAnimationElement(
  animation: CIMSymbolAnimationTransparency
) {
  const el = createEl('animate')
  el.setAttribute('additive', 'sum')
  el.setAttribute('attributeName', 'opacity')
  el.setAttribute('from', '1')
  el.setAttribute('to', (1 - animation.toTransparency).toString())

  return el
}
