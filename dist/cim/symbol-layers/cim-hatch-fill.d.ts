import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMHatchFill(layer: __esri.CIMSymbolLayer): layer is __esri.CIMHatchFill;
declare const CIMHatchFillTransformer_base: (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: __esri.CIMHatchFill | __esri.CIMPictureFill | __esri.CIMSolidFill | __esri.CIMGradientStroke | __esri.CIMGradientFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMHatchFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMHatchFill>);
export declare class CIMHatchFillTransformer extends CIMHatchFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-hatch-fill.d.ts.map