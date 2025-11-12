export function createAttr(name: string, textContent: string | null): Attr {
  const attr = document.createAttributeNS('http://www.w3.org/2000/svg', name)
  attr.textContent = textContent

  return attr
}
