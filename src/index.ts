import { innerSymbolToSvg } from './cim/symbols'

type SVGDefsChild =
  | SVGPatternElement
  | SVGLinearGradientElement
  | SVGRadialGradientElement
  | SVGClipPathElement
  | SVGMaskElement
  | SVGMarkerElement
  | SVGSymbolElement
  | SVGFilterElement
  | SVGStyleElement
  | SVGGElement

export type Globals = {
  defs: SVGDefsChild[]
  dimensions: {
    width: number
    height: number
  }
}

export default function cimSymbolToSVG(cimSymbol: __esri.CIMSymbol) {
  const globals: Globals = {
    defs: [],
    dimensions: {
      width: -1,
      height: -1,
    },
  }

  const svg = innerSymbolToSvg(cimSymbol.data.symbol, globals)

  return svg
}
