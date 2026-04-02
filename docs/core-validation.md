# Using `@ahip/core`

This page explains how to validate and normalize AHIP items before host-side rendering or behavior dispatch. It is intended for host integrators, backend services, and test environments that ingest AHIP payloads.

## What `@ahip/core` Provides

`@ahip/core` is the protocol entry point for:

- AHIP v0.2 types
- JSON Schema export
- validation
- normalization
- fallback helpers
- extension identifier helpers

## Key Exports

- `validateAHIPItem`
- `assertValidAHIPItem`
- `normalizeAHIPItem`
- `getFallbackText`
- `isExtensionIdentifier`

## Example

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

## Integration Notes

- Validate untrusted payloads before rendering or dispatching behavior.
- Preserve fallback text when a host does not support a block, widget, or extension.
- Treat unknown executable or action-like data conservatively.

## Preview Boundary

The package is usable for early integration, but some schema alignment and extension details may continue to evolve during the preview phase.

## Read Next

- Repository overview: [overview.md](./overview.md)
- React renderer integration: [react-rendering.md](./react-rendering.md)
- Examples and fixtures: [examples.md](./examples.md)
