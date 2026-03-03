import { CIMSymbolLayerUnion } from '@arcgis/core/symbols/cim/types'
import { it, expect } from 'vitest'
import getOtherLayerTypes from './get-other-layer-types'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function testLayerTypeGuard(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function,
  acceptedLayerTypes: CIMSymbolLayerUnion['type'][]
) {
  const rejectedLayerTypes = getOtherLayerTypes(acceptedLayerTypes)

  it('should return true for any accepted layer type', () => {
    acceptedLayerTypes.forEach((type) => {
      expect(callback({ type })).toBe(true)
    })

    rejectedLayerTypes.forEach((type) => {
      expect(callback({ type })).toBe(false)
    })
  })
}
