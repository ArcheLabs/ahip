# Getting Started

AHIP is split into three packages:

- `@ahip/core` for types, schema, validation, and normalization
- `@ahip/react` for host-controlled rendering
- `@ahip/examples` for fixtures, showcases, and demo host helpers

Basic flow:

1. Validate incoming items with `@ahip/core`.
2. Normalize or inspect fallback text as needed.
3. Render items with `@ahip/react`.
4. Use `@ahip/examples` fixtures to test host behavior and unsupported-content fallbacks.

```ts
import { validateAHIPItem } from "@ahip/core";
import { standardBlockItem } from "@ahip/examples";

const result = validateAHIPItem(standardBlockItem.item);
if (!result.valid) {
  throw new Error(result.errors.join("\n"));
}
```
