import { CIMGradientFill } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
declare const CIMGradientFillTransformer_base: (abstract new (...args: any[]) => {
    getStops(colorRamp: import("@arcgis/core/symbols/cim/types").CIMLinearContinuousColorRamp | import("@arcgis/core/symbols/cim/types").CIMFixedColorRamp | import("@arcgis/core/symbols/cim/types").CIMMultipartColorRamp, startOffset: number, endOffset: number): SVGStopElement[];
    transformGradient(): `${string}-${string}-${string}-${string}-${string}`;
    layer: CIMGradientFill | import("@arcgis/core/symbols/cim/types").CIMGradientStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMGradientFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMGradientFill>);
export declare class CIMGradientFillTransformer extends CIMGradientFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-gradient-fill.d.ts.map