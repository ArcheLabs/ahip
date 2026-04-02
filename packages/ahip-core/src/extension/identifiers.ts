const EXTENSION_IDENTIFIER_PATTERN =
  /^[a-z0-9]+(?:[.-][a-z0-9]+)*(?:\.[a-z0-9]+(?:[.-][a-z0-9]+)*)*\/[a-z0-9][a-z0-9._-]*$/;

export function isExtensionIdentifier(value: unknown): value is string {
  return typeof value === "string" && EXTENSION_IDENTIFIER_PATTERN.test(value);
}
