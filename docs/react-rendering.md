# Using `@ahip/react`

This page explains how to render AHIP items in a React host while keeping rendering and behavior under host control. It is intended for frontend teams integrating AHIP into a React application.

## What `@ahip/react` Provides

`@ahip/react` offers a reference React renderer with typed integration points for host logic.

Main exports include:

- `AHIPItemRenderer`
- `AHIPContentRenderer`
- `AHIPFallbackRenderer`
- `createBlockRegistry`
- `createWidgetRegistry`
- `WidgetHost`

## Host-Supplied Inputs

- `actionDispatcher`
- `artifactOpener`
- `appletRegistry`
- `blockRendererRegistry`
- `widgetRegistry`

## Example

```tsx
import { AHIPItemRenderer } from "@ahip/react";
import { createExampleHostDemo, gomokuGameStartItem } from "@ahip/examples";

const host = createExampleHostDemo();

export function ItemScreen() {
  return (
    <AHIPItemRenderer
      item={gomokuGameStartItem.item}
      actionDispatcher={host.actionDispatcher}
      appletRegistry={host.appletRegistry}
      artifactOpener={host.artifactOpener}
      blockRendererRegistry={host.blockRendererRegistry}
      widgetRegistry={host.widgetRegistry}
    />
  );
}
```

## Rendering Rules

- Unsupported standard or custom blocks render through fallback.
- Unsupported widgets render through fallback.
- A failure in one renderer should not invalidate the whole item.
- Widget resolution remains host-controlled.

## Preview Boundary

The renderer is ready for integration and evaluation, but hosts should expect some API refinement while the preview surface matures.

## Read Next

- Validation flow: [core-validation.md](./core-validation.md)
- Example fixtures and sample host wiring: [examples.md](./examples.md)
- Local applet resolution: [applet-boundary.md](./applet-boundary.md)
