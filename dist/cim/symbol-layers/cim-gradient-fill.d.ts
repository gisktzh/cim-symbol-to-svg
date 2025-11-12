import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMGradientFill(layer: __esri.CIMSymbolLayer): layer is __esri.CIMGradientFill;
declare const CIMGradientFillTransformer_base: (abstract new (...args: any[]) => {
    getStops(colorRamp: __esri.CIMColorRamp, startOffset: number, endOffset: number): SVGStopElement[];
    transformGradient(): `${string}-${string}-${string}-${string}-${string}`;
    layer: __esri.CIMGradientStroke | __esri.CIMGradientFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: __esri.CIMHatchFill | __esri.CIMPictureFill | __esri.CIMSolidFill | __esri.CIMGradientStroke | __esri.CIMGradientFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMGradientFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMGradientFill>);
export declare class CIMGradientFillTransformer extends CIMGradientFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-gradient-fill.d.ts.map