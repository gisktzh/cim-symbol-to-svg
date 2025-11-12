import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMVectorMarker(layer: __esri.CIMSymbolLayer): layer is __esri.CIMVectorMarker;
declare const CIMVectorMarkerTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[] | undefined;
    layer: __esri.CIMPictureMarker | __esri.CIMSolidFill | __esri.CIMSolidStroke | __esri.CIMVectorMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    getRotationAttrs(): Attr[];
    layer: __esri.CIMPictureMarker | __esri.CIMVectorMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMVectorMarker, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMVectorMarker>);
export declare class CIMVectorMarkerTransformer extends CIMVectorMarkerTransformer_base {
    getSvgAttrs(): never[];
    getSvgElements(): (SVGPathElement | SVGUseElement | SVGTextElement)[];
}
export {};
//# sourceMappingURL=cim-vector-marker.d.ts.map