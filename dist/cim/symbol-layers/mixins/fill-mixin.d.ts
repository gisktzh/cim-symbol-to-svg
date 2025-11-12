import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function FillMixin<T extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<__esri.CIMGradientFill | __esri.CIMGradientStroke | __esri.CIMHatchFill | __esri.CIMPictureFill | __esri.CIMSolidFill>>>(Base: T): (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: __esri.CIMHatchFill | __esri.CIMPictureFill | __esri.CIMSolidFill | __esri.CIMGradientStroke | __esri.CIMGradientFill;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & T;
//# sourceMappingURL=fill-mixin.d.ts.map