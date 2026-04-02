import { describe, expect, it } from "vitest";

import {
  ahipV02Schema,
  assertValidAHIPItem,
  getAHIPValidator,
  isExtensionIdentifier,
  normalizeAHIPItem,
  validateAHIPItem,
  type AHIPItem
} from "../src/index.js";

const validItem: AHIPItem = {
  protocol: "ahip",
  version: "0.2",
  item_id: "item-1",
  kind: "turn",
  actor: {
    actor_id: "agent-1",
    actor_kind: "agent"
  },
  created_at: "2026-04-02T00:00:00Z",
  content: [
    {
      id: "block-1",
      type: "text",
      text: "Hello from AHIP"
    }
  ]
};

describe("@ahip/core validation", () => {
  it("loads the embedded v0.2 schema", () => {
    expect(ahipV02Schema.$id).toBe("https://ahip.dev/schema/0.2/ahip.schema.json");
    expect(getAHIPValidator()).toBeTypeOf("function");
  });

  it("validates a minimal AHIP item", () => {
    const result = validateAHIPItem(validItem);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.value).toEqual(validItem);
  });

  it("rejects an invalid protocol version", () => {
    const result = validateAHIPItem({
      ...validItem,
      version: "0.1"
    });

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toContain("must be equal to constant");
  });

  it("asserts and normalizes valid items", () => {
    expect(assertValidAHIPItem(validItem)).toEqual(validItem);

    const normalized = normalizeAHIPItem(validItem);
    expect(normalized.content?.[0]?.fallback_text).toBe("Hello from AHIP");
    expect(normalized.fallback_text).toBe("Hello from AHIP");
  });

  it("checks extension identifiers with the schema-aligned pattern", () => {
    expect(isExtensionIdentifier("dev.vibly/kanban_board")).toBe(true);
    expect(isExtensionIdentifier("org.example.gomoku.board")).toBe(false);
  });
});
