import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMSolidFill } from '@/typeguards/cim-solid-fill'

describe('isCIMSolidFill', () => {
  testLayerTypeGuard(isCIMSolidFill, ['CIMSolidFill'])
})
