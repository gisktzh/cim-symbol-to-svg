import { isCIMGradientFill } from '@/cim/symbol-layers/cim-gradient-fill'
import { createAttr } from '@/utils/attr'
import { Globals } from '../..'
import { createEl } from '../../utils/svg-el'
import { cimSymbolLayerToSvgAttrs } from '../symbol-layers'
import { isCIMHatchFill } from '../symbol-layers/cim-hatch-fill'
import { isCIMPictureFill } from '../symbol-layers/cim-picture-fill'
import { isCIMSolidFill } from '../symbol-layers/cim-solid-fill'
import { isCIMSolidStroke } from '../symbol-layers/cim-solid-stroke'
import { isCIMPictureStroke } from '../symbol-layers/cim-picture-stroke'
import { isCIMGradientStroke } from '../symbol-layers/cim-gradient-stroke'

export function cimPolygonSymbolToSvg(
  symbol: __esri.CIMPolygonSymbol,
  globals: Globals
): SVGPathElement {
  const el = createEl('path')
  const attrs = symbol.symbolLayers
    .filter((l) => l.enable)
    .map((layer) => cimSymbolLayerToSvgAttrs(layer, globals))
    .flat()

  if (
    symbol.symbolLayers.filter(
      (l) =>
        isCIMGradientFill(l) ||
        isCIMSolidFill(l) ||
        isCIMHatchFill(l) ||
        isCIMPictureFill(l) ||
        isCIMGradientFill(l)
    ).length === 0
  ) {
    attrs.push(createAttr('fill', 'none'))
  }

  if (
    symbol.symbolLayers.filter(
      (l) =>
        isCIMSolidStroke(l) || isCIMPictureStroke(l) || isCIMGradientStroke(l)
    ).length === 0
  ) {
    attrs.push(createAttr('stroke', 'none'))
  }

  attrs.forEach((attr) => {
    el.setAttributeNode(attr)
  })

  return el
}
