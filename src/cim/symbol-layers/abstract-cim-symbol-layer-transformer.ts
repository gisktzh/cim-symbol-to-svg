import { Globals } from '../..'

export abstract class AbstractCIMSymbolLayerTransformer<
  T extends __esri.CIMSymbolLayer = __esri.CIMSymbolLayer,
> {
  constructor(
    public layer: T,
    public globals: Globals
  ) {}
  abstract getSvgAttrs(): Attr[]
  abstract getSvgElements(): SVGElement[] | null
}
