import { CIMGradientStroke } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
declare const CIMGradientStrokeTransformer_base: (abstract new (...args: any[]) => {
    getStops(colorRamp: import("@arcgis/core/symbols/cim/types").CIMLinearContinuousColorRamp | import("@arcgis/core/symbols/cim/types").CIMFixedColorRamp | import("@arcgis/core/symbols/cim/types").CIMMultipartColorRamp, startOffset: number, endOffset: number): SVGStopElement[];
    transformGradient(): `${string}-${string}-${string}-${string}-${string}`;
    layer: import("@arcgis/core/symbols/cim/types").CIMGradientFill | CIMGradientStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMGradientStroke, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMGradientStroke>);
export declare class CIMGradientStrokeTransformer extends CIMGradientStrokeTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-gradient-stroke.d.ts.map