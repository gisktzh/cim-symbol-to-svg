import { Globals } from '../..';
export declare abstract class AbstractCIMSymbolLayerTransformer<T extends __esri.CIMSymbolLayer = __esri.CIMSymbolLayer> {
    layer: T;
    globals: Globals;
    constructor(layer: T, globals: Globals);
    abstract getSvgAttrs(): Attr[];
    abstract getSvgElements(): SVGElement[] | null;
}
//# sourceMappingURL=abstract-cim-symbol-layer-transformer.d.ts.map