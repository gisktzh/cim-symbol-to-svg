import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMVectorMarker } from '@/typeguards/cim-vector-marker'

describe('isCIMVectorMarker', () => {
  testLayerTypeGuard(isCIMVectorMarker, ['CIMVectorMarker'])
})
