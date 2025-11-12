type SVGDefsChild = SVGPatternElement | SVGLinearGradientElement | SVGRadialGradientElement | SVGClipPathElement | SVGMaskElement | SVGMarkerElement | SVGSymbolElement | SVGFilterElement | SVGStyleElement | SVGGElement;
export type Globals = {
    defs: SVGDefsChild[];
    dimensions: {
        width: number;
        height: number;
    };
};
export default function cimSymbolToSVG(cimSymbol: __esri.CIMSymbol): SVGSVGElement | undefined;
export {};
//# sourceMappingURL=index.d.ts.map