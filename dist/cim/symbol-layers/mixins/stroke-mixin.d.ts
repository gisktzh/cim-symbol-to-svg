import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function StrokeMixin<T extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<__esri.CIMGradientStroke | __esri.CIMSolidStroke | __esri.CIMPictureStroke>>>(Base: T): (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: __esri.CIMPictureStroke | __esri.CIMSolidStroke | __esri.CIMGradientStroke;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & T;
//# sourceMappingURL=stroke-mixin.d.ts.map