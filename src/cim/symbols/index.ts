import { getPathBBox } from '@/utils/path-bbox'
import { Globals } from '../..'
import { warn } from '../../utils/logging'
import { createEl } from '../../utils/svg-el'
import { cimSymbolLayerToSvgElement } from '../symbol-layers'
import { isCIMVectorMarker } from '../../typeguards/cim-vector-marker'
import { CIMSymbolUnion } from '@arcgis/core/symbols/cim/types'

export function innerSymbolToSvg(
  symbol: CIMSymbolUnion | undefined | null,
  globals: Globals
) {
  if (symbol === undefined || symbol === null) {
    warn('No symbol given - on purpose?')
    return
  }

  if (symbol.type === 'CIMTextSymbol') {
    warn('CIMTextSymbols are not implemented yet')
    return
  }

  if (symbol.symbolLayers === undefined) {
    warn('Symbol without layers given - on purpose?')
    return
  }

  const vectorMarkerLayers = symbol.symbolLayers
    .filter((l) => isCIMVectorMarker(l))
    .filter((l) => l.enable)

  const maxCoords = vectorMarkerLayers
    .map((layer) => [
      layer.frame.xmax - layer.frame.xmin,
      layer.frame.ymax - layer.frame.ymin,
    ])
    .reduce(
      ([xPrev, yPrev], [xCurr, yCurr]) => [
        xCurr > xPrev ? xCurr : xPrev,
        yCurr > yPrev ? yCurr : yPrev,
      ],
      [-Infinity, -Infinity]
    )

  globals.dimensions.width = maxCoords[0]
  globals.dimensions.height = maxCoords[1]

  const svg = createEl('svg')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  const svgEls = vectorMarkerLayers
    .reverse()
    .map((l) => cimSymbolLayerToSvgElement(l, globals))
    .filter((l) => l !== null)
    .flat()

  svgEls.forEach((el) => svg.appendChild(el))

  if (globals.defs.length > 0) {
    const defsEl = createEl('defs')
    globals.defs.forEach((el) => defsEl.appendChild(el))

    svg.appendChild(defsEl)
  }

  const bboxes = Array.from(svg.querySelectorAll('path')).map((el) =>
    getPathBBox(el)
  )
  const minX = bboxes.reduce((p, c) => Math.min(p, c.minX), Infinity)
  const minY = bboxes.reduce((p, c) => Math.min(p, c.minY), Infinity)
  const width =
    bboxes.reduce((p, c) => Math.max(p, c.maxX), -Infinity) + Math.abs(minX)
  const height =
    bboxes.reduce((p, c) => Math.max(p, c.maxY), -Infinity) + Math.abs(minY)

  svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`)

  return svg
}
