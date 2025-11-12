import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMPictureFill(layer: __esri.CIMSymbolLayer): layer is __esri.CIMPictureFill;
declare const CIMPictureFillTransformer_base: (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: __esri.CIMHatchFill | __esri.CIMPictureFill | __esri.CIMSolidFill | __esri.CIMGradientStroke | __esri.CIMGradientFill;
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
}) & (abstract new (layer: __esri.CIMPictureFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMPictureFill>);
export declare class CIMPictureFillTransformer extends CIMPictureFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-picture-fill.d.ts.map