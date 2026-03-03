import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
import { CIMSolidFill } from '@arcgis/core/symbols/cim/types';
declare const CIMSolidFillTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[];
    layer: import("@arcgis/core/symbols/cim/types").CIMPictureMarker | import("@arcgis/core/symbols/cim/types").CIMVectorMarker | CIMSolidFill | import("@arcgis/core/symbols/cim/types").CIMSolidStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMSolidFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMSolidFill>);
export declare class CIMSolidFillTransformer extends CIMSolidFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGAnimateElement[] | null;
}
export {};
//# sourceMappingURL=cim-solid-fill.d.ts.map