import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
import { CIMPictureStroke } from '@arcgis/core/symbols/cim/types';
declare const CIMPictureStrokeTransformer_base: (abstract new (...args: any[]) => {
    transformPicture(width?: number, height?: number): `${string}-${string}-${string}-${string}-${string}`;
    getImageEl(): SVGImageElement;
    layer: import("@arcgis/core/symbols/cim/types").CIMPictureMarker | import("@arcgis/core/symbols/cim/types").CIMPictureFill | CIMPictureStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformStroke(strokeValue: string | number[]): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMPictureStroke, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMPictureStroke>);
export declare class CIMPictureStrokeTransformer extends CIMPictureStrokeTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-picture-stroke.d.ts.map