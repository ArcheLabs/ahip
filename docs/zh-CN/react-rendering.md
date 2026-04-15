# 使用 `@ahip/react`

本文说明如何在 React 宿主中渲染 AHIP item，同时保持渲染和行为由宿主控制。适合将 AHIP 接入 React 应用的前端团队阅读。

## `@ahip/react` 提供什么

`@ahip/react` 提供一个带有类型化宿主接入点的参考 React 渲染器。

主要导出包括：

- `AHIPItemRenderer`
- `AHIPContentRenderer`
- `AHIPFallbackRenderer`
- `createBlockRegistry`
- `createWidgetRegistry`
- `WidgetHost`

## 宿主提供的输入

- `actionDispatcher`
- `artifactOpener`
- `appletRegistry`
- `blockRendererRegistry`
- `widgetRegistry`

## 示例

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

## 渲染规则

- 不支持的标准 block 或自定义 block 通过 fallback 渲染。
- 不支持的 widget 通过 fallback 渲染。
- 单个 renderer 失败不应使整个 item 失效。
- widget 与 applet 解析保持宿主可控。
- applet 是宿主校验并本地注册的运行单元，本渲染器不下载或执行远程 applet 代码。

## Preview 边界

渲染器已经可用于集成和评估，但 preview API 成熟前仍可能有细节调整。

## 下一步阅读

- 校验流程: [core-validation.md](./core-validation.md)
- 示例 fixtures 与宿主接线: [examples.md](./examples.md)
- 本地 applet 解析: [applet-boundary.md](./applet-boundary.md)
