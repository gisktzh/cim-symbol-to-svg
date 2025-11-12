import { Globals } from '../..'
import { createEl } from '../../utils/svg-el'
import { cimSymbolLayerToSvgAttrs } from '../symbol-layers'

export function cimPointSymbolToSvg(
  symbol: __esri.CIMPointSymbol,
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
