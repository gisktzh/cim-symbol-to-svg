import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMSolidStroke } from '@/typeguards/cim-solid-stroke'

describe('isCIMSolidStroke', () => {
  testLayerTypeGuard(isCIMSolidStroke, ['CIMSolidStroke'])
})
