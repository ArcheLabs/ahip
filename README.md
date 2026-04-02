# AHIP

AHIP is the Agent-Human Interaction Protocol: a structured interaction format for agents, humans, hosts, tools, widgets, and artifact references. This repository contains the preview monorepo for the protocol core, a React renderer, and a curated examples package that hosts can use for integration and evaluation.

AHIP is designed for cases where plain text chat is not enough. An item may include semantic content blocks, actionable next steps, approvals, widgets, artifacts, and state updates while keeping rendering and execution under host control.

## Design Goals

- Express interaction as structured protocol objects instead of product-specific UI payloads.
- Keep rendering host-controlled so agents describe intent and hosts decide presentation.
- Preserve safe fallback behavior when a block, widget, or extension is unsupported.
- Support extensibility through namespaced identifiers without turning AHIP into remote code execution.
- Provide a reusable implementation baseline that external hosts can validate, render, and test against.

## Repository Contents

- `@ahip/core`
  Validation, normalization, schema exports, protocol types, and safety helpers for AHIP v0.2.
- `@ahip/react`
  A host-controlled React renderer with block and widget registries, fallback handling, and typed host integration points.
- `@ahip/examples`
  Fixtures, showcase items, sample host wiring, and Gomoku (Five in a Row) examples that demonstrate the protocol and the local applet boundary.
- `docs/`
  Integration guides, package overview material, extension guidance, and showcase documentation.

## Project Status

This repository is currently a preview release.

- The package structure and baseline integration flow are ready for experimentation and early host integration.
- Core validation, React rendering, fixtures, and sample host wiring are implemented and tested.
- Some APIs and extension boundaries may still evolve before a stable release.
- Hosts should validate untrusted input before rendering content or dispatching any action-like behavior.
- The examples package is part of the reference implementation; it is not a complete normative standard by itself.

## Quick Start

### 1. Install dependencies

```sh
corepack pnpm install
```

### 2. Validate an AHIP item

```ts
import { validateAHIPItem } from "@ahip/core";
import { standardBlockItem } from "@ahip/examples";

const result = validateAHIPItem(standardBlockItem.item);

if (!result.valid) {
  console.error(result.errors);
}
```

### 3. Render an item in React

```tsx
import { AHIPItemRenderer } from "@ahip/react";
import { createExampleHostDemo, gomokuGameStartItem } from "@ahip/examples";

const host = createExampleHostDemo();

export function ExampleScreen() {
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

## Documentation

- Start here: [docs/README.md](./docs/README.md)
- Repository and package overview: [docs/overview.md](./docs/overview.md)
- Core validation and normalization: [docs/core-validation.md](./docs/core-validation.md)
- React renderer integration: [docs/react-rendering.md](./docs/react-rendering.md)
- Examples and fixtures: [docs/examples.md](./docs/examples.md)
- Applet boundary: [docs/applet-boundary.md](./docs/applet-boundary.md)
- Gomoku showcase: [docs/gomoku-showcase.md](./docs/gomoku-showcase.md)
- 中文说明: [README.zh-CN.md](./README.zh-CN.md), [docs/zh-CN/README.md](./docs/zh-CN/README.md)

## Development

```sh
corepack pnpm install
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

The root workspace scripts run across `packages/ahip-core`, `packages/ahip-react`, and `packages/ahip-examples`.

## Integration Notes

- Use `@ahip/core` to validate and normalize input before rendering.
- Use `@ahip/react` when you want a host-controlled React implementation instead of building a renderer from scratch.
- Use `@ahip/examples` to test fallback behavior, registry wiring, applet resolution, and showcase flows such as Gomoku (Five in a Row).
- Applets are locally registered runtime units. AHIP items may reference them, but this repository does not define remote applet loading or browser-side code download.
