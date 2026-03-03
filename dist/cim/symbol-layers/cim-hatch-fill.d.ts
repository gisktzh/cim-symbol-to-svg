import { CIMHatchFill } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
declare const CIMHatchFillTransformer_base: (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMHatchFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMHatchFill>);
export declare class CIMHatchFillTransformer extends CIMHatchFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-hatch-fill.d.ts.map