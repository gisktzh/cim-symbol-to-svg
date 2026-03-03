export type Path = [number, number][]
export type Paths = Path[]

// The difference between paths and rings is that rings are closed. In SVG speech this is `Z` at the end.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRings(geometry: any): geometry is { rings: Paths } {
  return !!geometry.rings
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPaths(geometry: any): geometry is { paths: Paths } {
  return !!geometry.paths
}
