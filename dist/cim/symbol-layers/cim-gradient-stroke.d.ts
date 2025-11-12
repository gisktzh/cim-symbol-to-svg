import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMGradientStroke(layer: __esri.CIMSymbolLayer): layer is __esri.CIMGradientStroke;
declare const CIMGradientStrokeTransformer_base: (abstract new (...args: any[]) => {
    getStops(colorRamp: __esri.CIMColorRamp, startOffset: number, endOffset: number): SVGStopElement[];
    transformGradient(): `${string}-${string}-${string}-${string}-${string}`;
    layer: __esri.CIMGradientStroke | __esri.CIMGradientFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: __esri.CIMPictureStroke | __esri.CIMSolidStroke | __esri.CIMGradientStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMGradientStroke, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMGradientStroke>);
export declare class CIMGradientStrokeTransformer extends CIMGradientStrokeTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-gradient-stroke.d.ts.map