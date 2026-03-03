import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMPictureMarker } from '@/typeguards/cim-picture-marker'

describe('isCIMPictureFill', () => {
  testLayerTypeGuard(isCIMPictureMarker, ['CIMPictureMarker'])
})
