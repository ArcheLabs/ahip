# @ahip/core

Core validation, schema, and safety helpers for the Agent-Human Interaction Protocol.

AHIP items are structured interaction objects for humans, agents, hosts, tools, widgets, and artifact references. Use this package whenever a host, service, or test suite needs to validate and normalize AHIP data before rendering content or dispatching behavior.

[中文说明](./README.zh-CN.md) | [Repository](https://github.com/ArcheLabs/ahip) | [Docs](https://github.com/ArcheLabs/ahip/tree/main/docs)

## Install

```sh
npm install @ahip/core
```

## What It Provides

- AHIP v0.2 TypeScript types.
- The AHIP v0.2 JSON Schema.
- Validation helpers for untrusted input.
- Normalization helpers for safer host consumption.
- Fallback helpers for unsupported content.
- Extension identifier and block guard helpers.

## Basic Validation

```ts
import { validateAHIPItem } from "@ahip/core";

const result = validateAHIPItem(input);

if (!result.valid) {
  throw new Error(result.errors.join("\n"));
}

const item = result.value;
```

## Normalize Before Host Use

```ts
import { normalizeAHIPItem, validateAHIPItem } from "@ahip/core";

const validation = validateAHIPItem(input);

if (validation.valid && validation.value) {
  const normalized = normalizeAHIPItem(validation.value);
  // Pass normalized to your renderer or host pipeline.
}
```

## Schema Export

```ts
import { ahipV02Schema } from "@ahip/core";
```

The schema is also available as a package subpath:

```ts
import schema from "@ahip/core/schema/ahip-v0.2.schema.json";
```

## Important Exports

- `validateAHIPItem`
- `assertValidAHIPItem`
- `normalizeAHIPItem`
- `getAHIPValidator`
- `getFallbackText`
- `isExtensionIdentifier`
- `isKnownBlock`
- `isCustomBlock`
- `CORE_BLOCK_TYPES`
- AHIP TypeScript types such as `AHIPItem`, `ContentBlock`, `AHIPAction`, `WidgetRef`, `ArtifactRef`, and `CapabilitySet`

## Safety Notes

- Validate untrusted payloads before rendering, dispatching actions, opening artifacts, or resolving widgets.
- Treat unknown action-like or executable-looking data conservatively.
- Keep applet and widget execution host-controlled. AHIP items may reference applets, but this package does not define remote applet loading or dynamic code execution.
- Preserve `fallback_text` where possible so unsupported hosts can degrade safely.

## More Documentation

- [Core validation guide](https://github.com/ArcheLabs/ahip/blob/main/docs/core-validation.md)
- [Package overview](https://github.com/ArcheLabs/ahip/blob/main/docs/package-overview.md)
- [Applet boundary](https://github.com/ArcheLabs/ahip/blob/main/docs/applet-boundary.md)
