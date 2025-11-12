export function createAttr(name: string, textContent: string | null): Attr {
  const attr = document.createAttribute(name)
  attr.textContent = textContent

  return attr
}
