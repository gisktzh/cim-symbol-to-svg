import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
import { CIMFixedColorRamp, CIMGradientFill, CIMGradientStroke, CIMLinearContinuousColorRamp, CIMMultipartColorRamp } from '@arcgis/core/symbols/cim/types';
export declare function GradientMixin<C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<CIMGradientFill | CIMGradientStroke>>>(Base: C): (abstract new (...args: any[]) => {
    getStops(colorRamp: CIMLinearContinuousColorRamp | CIMFixedColorRamp | CIMMultipartColorRamp, startOffset: number, endOffset: number): SVGStopElement[];
    transformGradient(): `${string}-${string}-${string}-${string}-${string}`;
    layer: CIMGradientFill | CIMGradientStroke;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & C;
//# sourceMappingURL=gradient-mixin.d.ts.map