import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function AnimationsMixin<T extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<__esri.CIMPictureMarker | __esri.CIMSolidFill | __esri.CIMSolidStroke | __esri.CIMVectorMarker>>>(Base: T): (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[] | undefined;
    layer: __esri.CIMPictureMarker | __esri.CIMSolidFill | __esri.CIMSolidStroke | __esri.CIMVectorMarker;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & T;
//# sourceMappingURL=animations-mixin.d.ts.map