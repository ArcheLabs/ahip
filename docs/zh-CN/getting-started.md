# 快速开始

本文覆盖从 checkout 到首次校验与渲染的最短路径，适合想在本地评估仓库或把 AHIP 包接入外部宿主的工程师。

## 安装

```sh
corepack pnpm install
```

## Workspace 命令

```sh
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

这些命令会在整个 package workspace 中运行。

## 第一个校验示例

```ts
import { validateAHIPItem } from "@ahip/core";
import { standardBlockItem } from "@ahip/examples";

const result = validateAHIPItem(standardBlockItem.item);

if (!result.valid) {
  throw new Error(result.errors.join("\n"));
}
```

## 第一个渲染示例

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

## 集成建议

- 渲染内容或派发宿主行为前，先校验不可信 item。
- examples 是集成辅助材料，不是完整协议定义。
- widget 与 applet 解析应保持宿主可控。
- applet 是宿主校验并本地注册的运行单元，AHIP 不定义远程 applet 加载或动态代码执行。

## 下一步阅读

- 包职责: [package-overview.md](./package-overview.md)
- 校验与规范化: [core-validation.md](./core-validation.md)
- React 宿主渲染: [react-rendering.md](./react-rendering.md)
