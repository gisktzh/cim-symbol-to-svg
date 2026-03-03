import { CIMStroke } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function StrokeMixin<C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<CIMStroke>>>(Base: C): (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: CIMStroke;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & C;
//# sourceMappingURL=stroke-mixin.d.ts.map