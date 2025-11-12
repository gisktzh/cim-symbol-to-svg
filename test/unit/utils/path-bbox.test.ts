import { describe, it, expect } from 'vitest'
import { getPathBBox } from '@/utils/path-bbox'

describe('path-bbox.ts', () => {
  it('should output the correct bbox for an untransformed path', () => {
    const pathEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    pathEl.setAttribute('d', 'M 0 1 10 11')

    const bbox = getPathBBox(pathEl)

    expect(bbox.minX).toBe(0)
    expect(bbox.minY).toBe(1)
    expect(bbox.maxX).toBe(10)
    expect(bbox.maxY).toBe(11)
  })

  it('should output the correct bbox for a transformed path', () => {
    const pathEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    pathEl.setAttribute('d', 'M 0 1 10 11')
    pathEl.setAttribute('transform', 'rotate(45) scale(3)')

    const bbox = getPathBBox(pathEl)

    expect(bbox.minX).toBe(-2.1213203435596424)
    expect(bbox.minY).toBe(2.121320343559643)
    expect(bbox.maxX).toBe(-2.1213203435596384)
    expect(bbox.maxY).toBe(44.54772721475249)
  })

  it('should take stroke widths into account', () => {
    const pathEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    pathEl.setAttribute('d', 'M 0 1 10 11')
    pathEl.setAttribute('transform', 'rotate(45) scale(3)')
    pathEl.setAttribute('stroke-width', '50')

    const bbox = getPathBBox(pathEl)

    expect(bbox.minX).toBe(-27.121320343559642)
    expect(bbox.minY).toBe(-22.878679656440358)
    expect(bbox.maxX).toBe(22.87867965644036)
    expect(bbox.maxY).toBe(69.54772721475248)
  })
})
