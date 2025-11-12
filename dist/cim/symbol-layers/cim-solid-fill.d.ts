import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMSolidFill(layer: __esri.CIMSymbolLayer): layer is __esri.CIMSolidFill;
declare const CIMSolidFillTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[] | undefined;
    layer: __esri.CIMPictureMarker | __esri.CIMSolidFill | __esri.CIMSolidStroke | __esri.CIMVectorMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: __esri.CIMHatchFill | __esri.CIMPictureFill | __esri.CIMSolidFill | __esri.CIMGradientStroke | __esri.CIMGradientFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMSolidFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMSolidFill>);
export declare class CIMSolidFillTransformer extends CIMSolidFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGAnimateElement[] | null;
}
export {};
//# sourceMappingURL=cim-solid-fill.d.ts.map