import { CIMPointSymbol } from '@arcgis/core/symbols/cim/types'
import { Globals } from '../..'
import { createEl } from '../../utils/svg-el'
import { cimSymbolLayerToSvgAttrs } from '../symbol-layers'

export function cimPointSymbolToSvg(
  symbol: CIMPointSymbol,
  globals: Globals
): SVGUseElement {
  const el = createEl('use')

  symbol.symbolLayers
    ?.filter((l) => l.enable)
    .map((layer) => cimSymbolLayerToSvgAttrs(layer, globals))
    .flat()
    .forEach((attr) => {
      el.setAttributeNode(attr)
    })

  return el
}
