# Using `@ahip/core`

`@ahip/core` is the protocol entry point for validation and normalization.

Key exports:

- `validateAHIPItem`
- `assertValidAHIPItem`
- `normalizeAHIPItem`
- `getFallbackText`
- `isExtensionIdentifier`

Example:

```ts
import { normalizeAHIPItem, validateAHIPItem } from "@ahip/core";
import { gomokuGameStartItem } from "@ahip/examples";

const validation = validateAHIPItem(gomokuGameStartItem.item);
if (!validation.valid) {
  console.error(validation.errors);
} else {
  const normalized = normalizeAHIPItem(validation.value);
  console.log(normalized.fallback_text);
}
```

Use `validateAHIPItem` on untrusted payloads before rendering or dispatching any host behavior.
