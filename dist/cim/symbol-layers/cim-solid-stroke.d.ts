import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
import { CIMSolidStroke } from '@arcgis/core/symbols/cim/types';
declare const CIMSolidStrokeTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[];
    layer: import("@arcgis/core/symbols/cim/types").CIMPictureMarker | import("@arcgis/core/symbols/cim/types").CIMVectorMarker | import("@arcgis/core/symbols/cim/types").CIMSolidFill | CIMSolidStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMSolidStroke, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMSolidStroke>);
export declare class CIMSolidStrokeTransformer extends CIMSolidStrokeTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGAnimateElement[] | null;
}
export {};
//# sourceMappingURL=cim-solid-stroke.d.ts.map