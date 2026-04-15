# 使用 `@ahip/core`

本文说明如何在宿主渲染或行为派发前校验和规范化 AHIP item，适合宿主集成方、后端服务和测试环境阅读。

## `@ahip/core` 提供什么

`@ahip/core` 是协议层入口，提供：

- AHIP v0.2 类型
- JSON Schema 导出
- 校验
- 规范化
- fallback 辅助工具
- 扩展标识符辅助工具

## 关键导出

- `validateAHIPItem`
- `assertValidAHIPItem`
- `normalizeAHIPItem`
- `getFallbackText`
- `isExtensionIdentifier`

## 示例

```ts
import { normalizeAHIPItem, validateAHIPItem } from "@ahip/core";
import { gomokuGameStartItem } from "@ahip/examples";

const validation = validateAHIPItem(gomokuGameStartItem.item);

if (!validation.valid) {
  throw new Error(validation.errors.join("\n"));
}

const normalized = normalizeAHIPItem(validation.value);
```

## 集成说明

- 渲染或派发行为前，先校验不可信 payload。
- 宿主不支持某个 block、widget 或扩展时，应保留 fallback text。
- 对未知 executable 或 action-like 数据保持保守处理。
- applet 和 widget 的解析由宿主控制；本包不定义远程 applet 加载。

## Preview 边界

本包已经可用于早期集成，但 preview 阶段 schema 对齐和扩展细节仍可能继续演进。

## 下一步阅读

- 仓库总览: [overview.md](./overview.md)
- React 渲染集成: [react-rendering.md](./react-rendering.md)
- Examples 与 fixtures: [examples.md](./examples.md)
