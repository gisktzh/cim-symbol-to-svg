import { CIMSymbolLayer } from '@arcgis/core/symbols/cim/types';
import { Globals } from '../..';
export declare abstract class AbstractCIMSymbolLayerTransformer<T extends CIMSymbolLayer = CIMSymbolLayer> {
    layer: T;
    globals: Globals;
    constructor(layer: T, globals: Globals);
    abstract getSvgAttrs(): Attr[];
    abstract getSvgElements(): SVGElement[] | null;
}
//# sourceMappingURL=abstract-cim-symbol-layer-transformer.d.ts.map