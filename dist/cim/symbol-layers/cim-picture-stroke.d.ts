import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
export declare function isCIMPictureStroke(layer: __esri.CIMSymbolLayer): layer is __esri.CIMPictureStroke;
declare const CIMPictureStrokeTransformer_base: (abstract new (...args: any[]) => {
    transformPicture(width?: number, height?: number): `${string}-${string}-${string}-${string}-${string}`;
    getImageEl(): SVGImageElement;
    layer: __esri.CIMPictureFill | __esri.CIMPictureMarker | __esri.CIMPictureStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: __esri.CIMPictureStroke | __esri.CIMSolidStroke | __esri.CIMGradientStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: __esri.CIMPictureStroke, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<__esri.CIMPictureStroke>);
export declare class CIMPictureStrokeTransformer extends CIMPictureStrokeTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-picture-stroke.d.ts.map