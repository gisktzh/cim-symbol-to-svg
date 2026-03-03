import {
  CIMSolidFill,
  CIMSolidStroke,
  CIMSymbolAnimationColor,
} from '@arcgis/core/symbols/cim/types'
import { rgbaArrayToHex } from '../../utils/color'
import { createEl } from '../../utils/svg-el'

export function getColorAnimationElement(
  animation: CIMSymbolAnimationColor,
  layer: CIMSolidFill | CIMSolidStroke
) {
  const el = createEl('animate')
  el.setAttribute('additive', 'sum')

  el.setAttribute(
    'attributeName',
    layer.type === 'CIMSolidFill' ? 'fill' : 'stroke'
  )
  el.setAttribute('from', rgbaArrayToHex(layer.color))
  el.setAttribute('to', rgbaArrayToHex(animation.toColor))

  return el
}
