import { CIMPolygonSymbol } from '@arcgis/core/symbols/cim/types'
import { createAttr } from '../../utils/attr'
import { Globals } from '../..'
import { createEl } from '../../utils/svg-el'
import { cimSymbolLayerToSvgAttrs } from '../symbol-layers'
import { isCIMHatchFill } from '../../typeguards/cim-hatch-fill'
import { isCIMPictureFill } from '../../typeguards/cim-picture-fill'
import { isCIMSolidFill } from '../../typeguards/cim-solid-fill'
import { isCIMGradientFill } from '../../typeguards/cim-gradient-fill'
import { isCIMStroke } from '@/typeguards/cim-stroke'

export function cimPolygonSymbolToSvg(
  symbol: CIMPolygonSymbol,
  globals: Globals
): SVGPathElement {
  const el = createEl('path')
  const attrs =
    symbol.symbolLayers
      ?.filter((l) => l.enable)
      .map((layer) => cimSymbolLayerToSvgAttrs(layer, globals))
      .flat() || []

  if (
    symbol.symbolLayers
      ?.filter(
        (l) =>
          isCIMGradientFill(l) ||
          isCIMSolidFill(l) ||
          isCIMHatchFill(l) ||
          isCIMPictureFill(l) ||
          isCIMGradientFill(l)
      )
      .filter((l) => l.enable).length === 0
  ) {
    attrs.push(createAttr('fill', 'none'))
  }

  if (
    symbol.symbolLayers?.filter((l) => isCIMStroke(l)).filter((l) => l.enable)
      .length === 0
  ) {
    attrs.push(createAttr('stroke', 'none'))
  }

  attrs.forEach((attr) => {
    el.setAttributeNode(attr)
  })

  return el
}
