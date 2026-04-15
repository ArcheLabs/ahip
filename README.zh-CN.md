# AHIP

AHIP 是 Agent-Human Interaction Protocol，一种面向代理、人类、宿主、工具、widget 与 artifact 引用的结构化交互协议。本仓库提供 AHIP 的 preview monorepo，包含协议核心实现、React 渲染层，以及用于集成和验证的 examples 包。

AHIP 适用于纯文本聊天不足以表达交互意图的场景。一个 AHIP item 可以同时携带语义化内容块、动作、审批、widget、artifact 和状态更新，同时保持“宿主控制渲染与执行”的边界。

## 设计目标

- 用结构化协议对象表达交互，而不是把 UI 细节写死在产品私有格式里。
- 让 agent 表达语义意图，由宿主决定最终呈现方式。
- 当 block、widget 或扩展不被支持时，保持可预期的 fallback 行为。
- 通过命名空间扩展标识符支持扩展能力，但不把 AHIP 变成远程代码执行机制。
- 提供一套可复用的实现基线，便于外部宿主做验证、渲染和集成测试。

## 仓库内容

- `@ahip/core`
  提供 AHIP v0.2 的类型、Schema、校验、规范化和安全辅助工具。
- `@ahip/react`
  提供宿主可控的 React 渲染层，包括 block/widget registry、fallback 处理和宿主接口。
- `@ahip/examples`
  提供 fixtures、showcase、示例宿主接入工具，以及用于说明本地 applet 边界的 Gomoku（五子棋）示例。
- `docs/`
  提供集成文档、包说明、扩展说明和 showcase 文档。

每个 package 也包含面向 npm 展示的 README：

- [`packages/ahip-core/README.zh-CN.md`](./packages/ahip-core/README.zh-CN.md)
- [`packages/ahip-react/README.zh-CN.md`](./packages/ahip-react/README.zh-CN.md)
- [`packages/ahip-examples/README.zh-CN.md`](./packages/ahip-examples/README.zh-CN.md)

## 当前状态

本仓库目前处于 preview / pre-release 阶段。

- 基础包结构和初始集成路径已经可用于实验和早期接入。
- 协议校验、React 渲染、fixtures 与示例宿主接入工具已具备可验证实现。
- 部分 API 与扩展边界后续仍可能继续演进。
- 宿主在渲染内容或触发任何 action-like 行为前，应先校验不可信输入。
- `@ahip/examples` 属于参考实现的一部分，不等同于完整标准文本。

## 快速开始

### 1. 安装依赖

```sh
corepack pnpm install
```

### 2. 校验一个 AHIP item

```ts
import { validateAHIPItem } from "@ahip/core";
import { standardBlockItem } from "@ahip/examples";

const result = validateAHIPItem(standardBlockItem.item);

if (!result.valid) {
  console.error(result.errors);
}
```

### 3. 在 React 宿主中渲染

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

## 文档导航

- 文档入口: [docs/README.md](./docs/README.md)
- 总览: [docs/overview.md](./docs/overview.md)
- 核心校验与规范化: [docs/core-validation.md](./docs/core-validation.md)
- React 渲染集成: [docs/react-rendering.md](./docs/react-rendering.md)
- examples 与 fixtures: [docs/examples.md](./docs/examples.md)
- applet 边界: [docs/applet-boundary.md](./docs/applet-boundary.md)
- Gomoku（五子棋）showcase: [docs/gomoku-showcase.md](./docs/gomoku-showcase.md)
- 中文文档入口: [docs/zh-CN/README.md](./docs/zh-CN/README.md)

## 开发命令

```sh
corepack pnpm install
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

根目录脚本会统一运行 `packages/ahip-core`、`packages/ahip-react` 和 `packages/ahip-examples`。

## 集成原则

- 用 `@ahip/core` 对输入做校验和规范化，再进入渲染或执行流程。
- 用 `@ahip/react` 作为宿主可控的 React 参考实现，而不是把协议对象直接映射成产品私有 UI。
- 用 `@ahip/examples` 验证 fallback、registry、applet 解析与 showcase 场景。
- Applet 是由宿主校验并本地注册的运行单元。AHIP item 可以引用 applet，但本仓库不定义远程 applet 加载、浏览器侧代码下载，也不自动执行不可信 applet 代码。
