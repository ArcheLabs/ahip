# @ahip/react

Host-controlled React renderer for the Agent-Human Interaction Protocol.

Use this package when a React host needs to render AHIP items while keeping actions, artifacts, widgets, and local applet resolution under host control.

[中文说明](./README.zh-CN.md) | [Repository](https://github.com/ArcheLabs/ahip) | [Docs](https://github.com/ArcheLabs/ahip/tree/main/docs)

## Install

```sh
npm install @ahip/core @ahip/react react react-dom
```

`react` and `react-dom` are peer dependencies.

## Basic Rendering

```tsx
import { AHIPItemRenderer } from "@ahip/react";
import type { AHIPItem } from "@ahip/core";

export function Message({ item }: { item: AHIPItem }) {
  return <AHIPItemRenderer item={item} />;
}
```

Hosts should validate untrusted data with `@ahip/core` before rendering.

## Host-Controlled Behavior

```tsx
import { AHIPItemRenderer } from "@ahip/react";

const actionDispatcher = {
  dispatchAction(action, context) {
    // Route through your host runtime, approval flow, or tool layer.
  }
};

const artifactOpener = {
  openArtifact(artifact, context) {
    // Resolve and open artifacts through host policy.
  }
};

export function Message({ item }) {
  return (
    <AHIPItemRenderer
      item={item}
      actionDispatcher={actionDispatcher}
      artifactOpener={artifactOpener}
    />
  );
}
```

## Custom Blocks, Widgets, and Applets

```tsx
import { AHIPItemRenderer, createBlockRegistry, createWidgetRegistry } from "@ahip/react";

const blockRendererRegistry = createBlockRegistry({
  customBlockRenderers: {
    "org.example/profile.card": ({ block, fallback }) => {
      return <section>{block.title ?? fallback}</section>;
    }
  }
});

const widgetRegistry = createWidgetRegistry({
  widgetRenderers: {
    "org.example/counter.widget": ({ widget }) => {
      return <button>{String(widget.props.count ?? 0)}</button>;
    }
  }
});

export function Message({ item, appletRegistry }) {
  return (
    <AHIPItemRenderer
      item={item}
      appletRegistry={appletRegistry}
      blockRendererRegistry={blockRendererRegistry}
      widgetRegistry={widgetRegistry}
    />
  );
}
```

AHIP items may reference applets, but applets are local runtime units registered, validated, and resolved by the host. This renderer does not download or execute remote applet code.

## Important Exports

- `AHIPItemRenderer`
- `AHIPContentRenderer`
- `AHIPActionBar`
- `AHIPApprovalList`
- `AHIPArtifactList`
- `AHIPStatePatchList`
- `AHIPToolIntentList`
- `AHIPFallbackRenderer`
- `WidgetHost`
- `createBlockRegistry`
- `createWidgetRegistry`
- `defaultBlockRendererRegistry`
- `defaultWidgetRegistry`
- `defaultBlockRenderers`
- Host integration types such as `AHIPActionDispatcher`, `AHIPArtifactOpener`, `AHIPAppletRegistry`, `AHIPBlockRenderer`, and `AHIPWidgetRenderer`

## Fallback Behavior

- Unsupported blocks and widgets render through fallback UI.
- Renderer failures are isolated so one failing block does not have to break the full AHIP item.
- Hosts can supply `fallbackRenderer` and `onRenderError` for product-specific recovery and logging.

## More Documentation

- [React rendering guide](https://github.com/ArcheLabs/ahip/blob/main/docs/react-rendering.md)
- [Applet boundary](https://github.com/ArcheLabs/ahip/blob/main/docs/applet-boundary.md)
- [Examples package](https://github.com/ArcheLabs/ahip/blob/main/docs/examples.md)
