import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function GradientMixin<T extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<__esri.CIMGradientFill | __esri.CIMGradientStroke>>>(Base: T): (abstract new (...args: any[]) => {
    getStops(colorRamp: __esri.CIMColorRamp, startOffset: number, endOffset: number): SVGStopElement[];
    transformGradient(): `${string}-${string}-${string}-${string}-${string}`;
    layer: __esri.CIMGradientStroke | __esri.CIMGradientFill;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & T;
//# sourceMappingURL=gradient-mixin.d.ts.map