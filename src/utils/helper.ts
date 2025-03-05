function capitalize(value: string) {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function transformTagStringsToObjects(
  strings: string[]
): { id: string; text: string }[] {
  return strings.map((text, index) => ({ id: String(index), text }));
}

export { capitalize, transformTagStringsToObjects };
