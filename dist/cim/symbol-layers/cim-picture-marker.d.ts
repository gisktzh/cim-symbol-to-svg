import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
import { CIMPictureMarker } from '@arcgis/core/symbols/cim/types';
declare const CIMPictureMarkerTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[];
    layer: CIMPictureMarker | import("@arcgis/core/symbols/cim/types").CIMVectorMarker | import("@arcgis/core/symbols/cim/types").CIMSolidFill | import("@arcgis/core/symbols/cim/types").CIMSolidStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    getRotationAttrs(): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformPicture(width?: number, height?: number): `${string}-${string}-${string}-${string}-${string}`;
    getImageEl(): SVGImageElement;
    layer: CIMPictureMarker | import("@arcgis/core/symbols/cim/types").CIMPictureFill | import("@arcgis/core/symbols/cim/types").CIMPictureStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMPictureMarker, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMPictureMarker>);
export declare class CIMPictureMarkerTransformer extends CIMPictureMarkerTransformer_base {
    getSvgAttrs(): never[];
    getSvgElements(): SVGImageElement[];
}
export {};
//# sourceMappingURL=cim-picture-marker.d.ts.map