import { CIMLineSymbol } from '@arcgis/core/symbols/cim/types'
import { Globals } from '../..'
import { createEl } from '../../utils/svg-el'
import { cimSymbolLayerToSvgAttrs } from '../symbol-layers'

export function cimLineSymbolToSvg(
  symbol: CIMLineSymbol,
  globals: Globals
): SVGLineElement {
  const el = createEl('line')
  symbol.symbolLayers
    ?.filter((l) => l.enable)
    .map((layer) => cimSymbolLayerToSvgAttrs(layer, globals))
    .flat()
    .forEach((attr) => {
      el.setAttributeNode(attr)
    })

  return el
}
