# @ahip/examples

Examples, fixtures, and showcase data for the Agent-Human Interaction Protocol.

Use this package to test AHIP validation, rendering, fallback behavior, custom extension handling, and local applet resolution. The examples are reference integration material, not a complete normative standard.

[中文说明](./README.zh-CN.md) | [Repository](https://github.com/ArcheLabs/ahip) | [Docs](https://github.com/ArcheLabs/ahip/tree/main/docs)

## Install

```sh
npm install @ahip/core @ahip/react @ahip/examples
```

## What It Contains

- Valid AHIP fixtures for standard content, approvals, payments, and artifacts.
- Invalid fixtures for validation rejection tests.
- Custom block and widget fixtures for registry integration.
- Unsupported block and widget fixtures for fallback coverage.
- A Gomoku (Five in a Row) showcase.
- Sample host utilities that demonstrate action dispatch, artifact opening, block/widget registries, and local applet lookup.

## Basic Fixture Use

```ts
import { validateAHIPItem } from "@ahip/core";
import { standardBlockItem } from "@ahip/examples";

const result = validateAHIPItem(standardBlockItem.item);

if (!result.valid) {
  throw new Error(result.errors.join("\n"));
}
```

## Sample React Host Wiring

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

## Important Exports

- `validFixtures`
- `invalidFixtures`
- `extensionFixtures`
- `appletBoundaryFixtures`
- `gomokuShowcaseFixtures`
- `standardBlockItem`
- `approvalRequestItem`
- `paymentRequestItem`
- `artifactAnnouncementItem`
- `customBlockRegistryItem`
- `unsupportedBlockFallbackItem`
- `widgetRegistryItem`
- `unsupportedWidgetFallbackItem`
- `partialFailureRenderItem`
- `gomokuGameStartItem`
- `gomokuHumanMoveSubmissionItem`
- `gomokuUpdatedBoardItem`
- `gomokuGameFinishedItem`
- `gomokuAppletManifest`
- `gomokuAppletRegistrationFlow`
- `createExampleHostDemo`
- `createLocalAppletRegistry`

## Boundary Notes

- Fixtures are meant for integration tests, demos, and host evaluation.
- The sample host is intentionally small; it is not a production runtime.
- The Gomoku showcase demonstrates local applet registration and resolution without introducing remote applet loading.
- Protocol semantics should come from `@ahip/core` schema/types and the project documentation, not from examples alone.

## More Documentation

- [Examples guide](https://github.com/ArcheLabs/ahip/blob/main/docs/examples.md)
- [Gomoku showcase](https://github.com/ArcheLabs/ahip/blob/main/docs/gomoku-showcase.md)
- [Applet boundary](https://github.com/ArcheLabs/ahip/blob/main/docs/applet-boundary.md)
