import { CIMMarker } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function MarkerMixin<C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<T>>, T extends CIMMarker>(Base: C): (abstract new (...args: any[]) => {
    getRotationAttrs(): Attr[];
    layer: T;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & C;
//# sourceMappingURL=marker-mixin.d.ts.map