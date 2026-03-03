import CIMSymbol from '@arcgis/core/symbols/CIMSymbol';
type SVGDefsChild = SVGPatternElement | SVGLinearGradientElement | SVGRadialGradientElement | SVGClipPathElement | SVGMaskElement | SVGMarkerElement | SVGSymbolElement | SVGFilterElement | SVGStyleElement | SVGGElement;
export type Globals = {
    defs: SVGDefsChild[];
    dimensions: {
        width: number;
        height: number;
    };
};
export default function cimSymbolToSVG(cimSymbol: CIMSymbol): SVGSVGElement | undefined;
export {};
//# sourceMappingURL=index.d.ts.map