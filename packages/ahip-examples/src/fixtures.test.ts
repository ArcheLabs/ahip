import { describe, expect, it } from "vitest";
import { validateAHIPItem } from "@ahip/core";

import { invalidFixtures, validFixtures } from "./index.js";

describe("@ahip/examples fixture validity", () => {
  it("validates the schema-ready baseline valid fixtures", () => {
    for (const fixture of validFixtures) {
      const result = validateAHIPItem(fixture.item);
      expect(result.valid, fixture.id).toBe(true);
    }
  });

  it("rejects invalid fixtures", () => {
    for (const fixture of invalidFixtures) {
      const result = validateAHIPItem(fixture.item);
      expect(result.valid, fixture.id).toBe(false);
    }
  });
});
