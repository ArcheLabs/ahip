import type { ContentBlock, CoreBlockType } from "../types/index.js";
import { isExtensionIdentifier } from "../extension/identifiers.js";

export const CORE_BLOCK_TYPES: readonly CoreBlockType[] = [
  "text",
  "markdown",
  "image",
  "file",
  "code",
  "quote",
  "divider",
  "badge",
  "stat",
  "table",
  "chart",
  "entity_card",
  "form",
  "status",
  "error",
  "payment_request",
  "payment_receipt"
];

export function isKnownBlock(block: ContentBlock): boolean {
  return CORE_BLOCK_TYPES.includes(block.type as CoreBlockType);
}

export function isCustomBlock(block: ContentBlock): boolean {
  return isExtensionIdentifier(block.type);
}
