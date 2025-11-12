import { createEl } from '../../utils/svg-el'

export function getTransparencyAnimationElement(
  animation: __esri.CIMSymbolAnimationTransparency
) {
  const el = createEl('animate')
  el.setAttribute('additive', 'sum')
  el.setAttribute('attributeName', 'opacity')
  el.setAttribute('from', '1')
  el.setAttribute('to', (1 - (animation.toTransparency || 0)).toString())

  return el
}
