import { Globals } from '../..'
import { round } from '../../utils/round'
import { cimLineSymbolToSvg } from '../symbols/cim-line-symbol'
import { cimPointSymbolToSvg } from '../symbols/cim-point-symbol'
import { cimPolygonSymbolToSvg } from '../symbols/cim-polygon-symbol'
import { cimTextSymbolToSvg } from '../symbols/cim-text-symbol'

type Path = [number, number][]
type Paths = Path[]

// The difference between paths and rings is that rings are closed. In SVG speech this is `Z` at the end.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRings(geometry: any): geometry is { rings: Paths } {
  return !!geometry.rings
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPaths(geometry: any): geometry is { paths: Paths } {
  return !!geometry.paths
}

function translateToSize(n: number, min: number, max: number, size: number) {
  return ((n - min) / (max - min)) * size
}

function pathsToSvgSyntax(
  paths: Paths,
  closePaths: boolean,
  frame: __esri.Envelope,
  symbolHeight: number,
  symbolWidth: number,
  xOffset: number = 0,
  yOffset: number = 0
): string {
  return paths
    .map(
      (path) =>
        'M ' +
        path
          .map((p) => [
            round(
              translateToSize(p[0], frame.xmin, frame.xmax, symbolWidth) +
                xOffset,
              6
            ),
            round(
              symbolHeight -
                translateToSize(p[1], frame.ymin, frame.ymax, symbolHeight) +
                yOffset,
              6
            ),
          ])
          .flat()
          .join(' ') +
        (closePaths ? ' Z' : '')
    )
    .join(' ')
}

export function transformMarkerGraphicToSvg(
  graphic: __esri.CIMMarkerGraphic,
  frame: __esri.Envelope,
  globals: Globals,
  xOffset: number = 0,
  yOffset: number = 0
) {
  if (graphic.symbol.type === 'CIMLineSymbol') {
    // Could have a geometry but most often doesn't, at least the ESRI symbols don't.
    return cimLineSymbolToSvg(graphic.symbol, globals)
  }

  if (graphic.symbol.type === 'CIMPointSymbol') {
    // Could have a geometry but most often doesn't, at least the ESRI symbols don't.
    return cimPointSymbolToSvg(graphic.symbol, globals)
  }

  if (graphic.symbol.type === 'CIMTextSymbol') {
    return cimTextSymbolToSvg(graphic.symbol, graphic.textString)
  }

  if (graphic.symbol.type === 'CIMPolygonSymbol') {
    const el = cimPolygonSymbolToSvg(graphic.symbol, globals)

    if (
      !graphic.geometry ||
      (!isRings(graphic.geometry) && !isPaths(graphic.geometry))
    ) {
      // No known geometry, no placement necessary.
      return el
    }
    const paths = isRings(graphic.geometry)
      ? graphic.geometry.rings
      : graphic.geometry.paths

    el.setAttribute(
      'd',
      pathsToSvgSyntax(
        paths,
        isRings(graphic.geometry),
        frame,
        globals.dimensions.height,
        globals.dimensions.width,
        xOffset,
        yOffset
      )
    )

    return el
  }
}
