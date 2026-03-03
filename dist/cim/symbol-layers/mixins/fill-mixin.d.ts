import { CIMFill } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function FillMixin<C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<T>>, T extends CIMFill>(Base: C): (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: T;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & C;
//# sourceMappingURL=fill-mixin.d.ts.map