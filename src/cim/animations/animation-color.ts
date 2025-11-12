import { rgbaArrayToHex } from '../../utils/color'
import { createEl } from '../../utils/svg-el'

export function getColorAnimationElement(
  animation: __esri.CIMSymbolAnimationColor,
  layer: __esri.CIMSymbolLayer
) {
  if (layer.type !== 'CIMSolidFill' && layer.type !== 'CIMSolidStroke') {
    // All other layer types do not support color animation
    return null
  }

  const el = createEl('animate')
  el.setAttribute('additive', 'sum')

  el.setAttribute(
    'attributeName',
    layer.type === 'CIMSolidFill' ? 'fill' : 'stroke'
  )
  el.setAttribute('from', rgbaArrayToHex(layer.color))
  el.setAttribute('to', animation.toColor.toHex())

  return el
}
