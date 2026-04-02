# Getting Started

This page covers the shortest path from checkout to first validation and rendering. It is intended for engineers who want to evaluate the repository locally or wire the packages into an external host.

## Install

```sh
corepack pnpm install
```

## Workspace Commands

```sh
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

These commands run across the package workspace.

## First Validation Example

```ts
import { validateAHIPItem } from "@ahip/core";
import { standardBlockItem } from "@ahip/examples";

const result = validateAHIPItem(standardBlockItem.item);

if (!result.valid) {
  throw new Error(result.errors.join("\n"));
}
```

## First Rendering Example

```tsx
import { AHIPItemRenderer } from "@ahip/react";
import { createExampleHostDemo, gomokuGameStartItem } from "@ahip/examples";

const host = createExampleHostDemo();

export function ExampleView() {
  return (
    <AHIPItemRenderer
      item={gomokuGameStartItem.item}
      actionDispatcher={host.actionDispatcher}
      artifactOpener={host.artifactOpener}
      appletRegistry={host.appletRegistry}
      blockRendererRegistry={host.blockRendererRegistry}
      widgetRegistry={host.widgetRegistry}
    />
  );
}
```

## Integration Guidance

- Validate untrusted items before rendering or dispatching any host behavior.
- Treat examples as integration aids, not as the full protocol definition.
- Keep widget and applet resolution host-controlled.

## Read Next

- Package roles: [package-overview.md](./package-overview.md)
- Validation and normalization: [core-validation.md](./core-validation.md)
- React host rendering: [react-rendering.md](./react-rendering.md)
