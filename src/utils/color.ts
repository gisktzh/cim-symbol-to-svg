export function rgbaArrayToHex(rgba: number[]): string {
  return (
    '#' +
    Math.min(255, rgba[0]).toString(16).padStart(2, '0') +
    Math.min(255, rgba[1]).toString(16).padStart(2, '0') +
    Math.min(255, rgba[2]).toString(16).padStart(2, '0')
  )
}
