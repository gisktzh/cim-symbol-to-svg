import { CIMVectorMarker } from '@arcgis/core/symbols/cim/types'

export function isCIMVectorMarker(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMVectorMarker {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMVectorMarker'
}
