export type Path = [number, number][];
export type Paths = Path[];
export declare function isRings(geometry: any): geometry is {
    rings: Paths;
};
export declare function isPaths(geometry: any): geometry is {
    paths: Paths;
};
//# sourceMappingURL=paths.d.ts.map