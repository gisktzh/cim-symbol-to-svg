type Point = { x: number; y: number }
type Transform = {
  translateX: number
  translateY: number
  scaleX: number
  scaleY: number
  rotate: number
}

function parseTransform(transform: string) {
  const transformObj: Transform = {
    translateX: 0,
    translateY: 0,
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
  }

  const translateMatch = transform.match(/translate\(([^,]+),\s*([^,]+)\)/)
  if (translateMatch) {
    transformObj.translateX = parseFloat(translateMatch[1])
    transformObj.translateY = parseFloat(translateMatch[2])
  }

  const scaleMatch = transform.match(/scale\(([^,]+),?\s*([^)]+)?\)/)
  if (scaleMatch) {
    transformObj.scaleX = parseFloat(scaleMatch[1])
    transformObj.scaleY = scaleMatch[2]
      ? parseFloat(scaleMatch[2])
      : transformObj.scaleX
  }

  const rotateMatch = transform.match(/rotate\(([^)]+)\)/)
  if (rotateMatch) {
    transformObj.rotate = parseFloat(rotateMatch[1])
  }

  return transformObj
}

function applyTransformToPoint(point: Point, transformObj: Transform): Point {
  const { translateX, translateY, scaleX, scaleY, rotate } = transformObj
  const x = point.x * scaleX
  const y = point.y * scaleY

  const radians = rotate * (Math.PI / 180)
  const rotatedX = x * Math.cos(radians) - y * Math.sin(radians)
  const rotatedY = x * Math.sin(radians) + y * Math.cos(radians)

  return {
    x: rotatedX + translateX,
    y: rotatedY + translateY,
  }
}

export function getPathBBox(pathElement: SVGPathElement) {
  const d = pathElement.getAttribute('d')

  if (!d) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
    }
  }

  const strokeWidth = parseFloat(
    pathElement.getAttribute('stroke-width') || '0'
  )
  const transform = pathElement.getAttribute('transform') || ''

  const points =
    d
      .replace('M ', '')
      .replace(' Z', '')
      ?.match(/[-0-9.]+ [-0-9.]+/g)
      ?.map((p: string): Point => {
        const cs = p.split(' ').map(parseFloat)

        return {
          x: cs[0],
          y: cs[1],
        }
      }) || []

  const transformObj = parseTransform(transform)

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity

  points.forEach((point) => {
    const transformedPoint = applyTransformToPoint(point, transformObj)
    minX = Math.min(minX, transformedPoint.x)
    minY = Math.min(minY, transformedPoint.y)
    maxX = Math.max(maxX, transformedPoint.x)
    maxY = Math.max(maxY, transformedPoint.y)
  })

  return {
    minX: minX - strokeWidth / 2,
    minY: minY - strokeWidth / 2,
    maxX: maxX + strokeWidth / 2,
    maxY: maxY + strokeWidth / 2,
  }
}
