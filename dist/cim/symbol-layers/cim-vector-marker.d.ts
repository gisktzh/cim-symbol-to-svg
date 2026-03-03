import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
import { CIMVectorMarker } from '@arcgis/core/symbols/cim/types';
declare const CIMVectorMarkerTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[];
    layer: import("@arcgis/core/symbols/cim/types").CIMPictureMarker | CIMVectorMarker | import("@arcgis/core/symbols/cim/types").CIMSolidFill | import("@arcgis/core/symbols/cim/types").CIMSolidStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    getRotationAttrs(): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMVectorMarker, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMVectorMarker>);
export declare class CIMVectorMarkerTransformer extends CIMVectorMarkerTransformer_base {
    getSvgAttrs(): never[];
    getSvgElements(): (SVGPathElement | SVGUseElement | SVGTextElement)[];
}
export {};
//# sourceMappingURL=cim-vector-marker.d.ts.map