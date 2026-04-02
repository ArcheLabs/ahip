# Using `@ahip/react`

`@ahip/react` renders AHIP items without assuming product-specific UI rules.

Main pieces:

- `AHIPItemRenderer`
- `createBlockRegistry`
- `createWidgetRegistry`
- `AHIPFallbackRenderer`
- `WidgetHost`

Host-controlled inputs:

- `actionDispatcher`
- `artifactOpener`
- `appletRegistry`
- `blockRendererRegistry`
- `widgetRegistry`

Example:

```tsx
import { AHIPItemRenderer } from "@ahip/react";
import { createExampleHostDemo, gomokuGameStartItem } from "@ahip/examples";

const demo = createExampleHostDemo();

<AHIPItemRenderer
  actionDispatcher={demo.actionDispatcher}
  appletRegistry={demo.appletRegistry}
  artifactOpener={demo.artifactOpener}
  blockRendererRegistry={demo.blockRendererRegistry}
  item={gomokuGameStartItem.item}
  widgetRegistry={demo.widgetRegistry}
/>;
```

Rendering rules:

- unsupported block => fallback renderer
- unsupported widget => fallback renderer
- one renderer failure does not invalidate the whole item
- widgets stay host-controlled
