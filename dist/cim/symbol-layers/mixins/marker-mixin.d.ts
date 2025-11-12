import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function MarkerMixin<T extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<__esri.CIMPictureMarker | __esri.CIMVectorMarker>>>(Base: T): (abstract new (...args: any[]) => {
    getRotationAttrs(): Attr[];
    layer: __esri.CIMPictureMarker | __esri.CIMVectorMarker;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & T;
//# sourceMappingURL=marker-mixin.d.ts.map