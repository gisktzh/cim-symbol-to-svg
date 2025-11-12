import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMSolidStroke(layer: __esri.CIMSymbolLayer): layer is __esri.CIMSolidStroke;
declare const CIMSolidStrokeTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[] | undefined;
    layer: __esri.CIMPictureMarker | __esri.CIMSolidFill | __esri.CIMSolidStroke | __esri.CIMVectorMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: __esri.CIMPictureStroke | __esri.CIMSolidStroke | __esri.CIMGradientStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMSolidStroke, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMSolidStroke>);
export declare class CIMSolidStrokeTransformer extends CIMSolidStrokeTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGAnimateElement[] | null;
}
export {};
//# sourceMappingURL=cim-solid-stroke.d.ts.map