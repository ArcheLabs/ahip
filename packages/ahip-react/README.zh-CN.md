# @ahip/react

Agent-Human Interaction Protocol 的宿主可控 React 渲染器。

当 React 宿主需要渲染 AHIP item，同时让 action、artifact、widget 与本地 applet 解析继续受宿主控制时，可以使用本包。

[English](./README.md) | [仓库首页](https://github.com/ArcheLabs/ahip/blob/main/README.zh-CN.md) | [文档入口](https://github.com/ArcheLabs/ahip/tree/main/docs/zh-CN)

## 安装

```sh
npm install @ahip/core @ahip/react react react-dom
```

`react` 和 `react-dom` 是 peer dependencies。

## 基础渲染

```tsx
import { AHIPItemRenderer } from "@ahip/react";
import type { AHIPItem } from "@ahip/core";

export function Message({ item }: { item: AHIPItem }) {
  return <AHIPItemRenderer item={item} />;
}
```

宿主应先使用 `@ahip/core` 校验不可信数据，再进入渲染。

## 宿主控制行为

```tsx
import { AHIPItemRenderer } from "@ahip/react";

const actionDispatcher = {
  dispatchAction(action, context) {
    // 路由到你的宿主 runtime、审批流程或工具层。
  }
};

const artifactOpener = {
  openArtifact(artifact, context) {
    // 通过宿主策略解析和打开 artifact。
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

## 自定义 Block、Widget 与 Applet

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

AHIP item 可以引用 applet，但 applet 是由宿主本地注册、校验和解析的运行单元。本渲染器不会下载或执行远程 applet 代码。

## 重要导出

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
- `AHIPActionDispatcher`、`AHIPArtifactOpener`、`AHIPAppletRegistry`、`AHIPBlockRenderer`、`AHIPWidgetRenderer` 等宿主集成类型

## Fallback 行为

- 不支持的 block 和 widget 会通过 fallback UI 渲染。
- 单个 renderer 失败会被隔离，不应破坏整个 AHIP item。
- 宿主可以提供 `fallbackRenderer` 和 `onRenderError`，接入自己的恢复与日志策略。

## 更多文档

- [React 渲染说明](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/react-rendering.md)
- [Applet 边界](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/applet-boundary.md)
- [Examples 包](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/examples.md)
