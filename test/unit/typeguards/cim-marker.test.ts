import { isCIMMarker } from '@/typeguards/cim-marker'
import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'

describe('isCIMMarker', () => {
  testLayerTypeGuard(isCIMMarker, ['CIMPictureMarker', 'CIMVectorMarker'])
})
