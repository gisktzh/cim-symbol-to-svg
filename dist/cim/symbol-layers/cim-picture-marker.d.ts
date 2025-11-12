import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMPictureMarker(layer: __esri.CIMSymbolLayer): layer is __esri.CIMPictureMarker;
declare const CIMPictureMarkerTransformer_base: (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[] | undefined;
    layer: __esri.CIMPictureMarker | __esri.CIMSolidFill | __esri.CIMSolidStroke | __esri.CIMVectorMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    getRotationAttrs(): Attr[];
    layer: __esri.CIMPictureMarker | __esri.CIMVectorMarker;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformPicture(width?: number, height?: number): `${string}-${string}-${string}-${string}-${string}`;
    getImageEl(): SVGImageElement;
    layer: __esri.CIMPictureFill | __esri.CIMPictureMarker | __esri.CIMPictureStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMPictureMarker, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMPictureMarker>);
export declare class CIMPictureMarkerTransformer extends CIMPictureMarkerTransformer_base {
    getSvgAttrs(): never[];
    getSvgElements(): SVGImageElement[];
}
export {};
//# sourceMappingURL=cim-picture-marker.d.ts.map