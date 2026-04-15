# @ahip/core

Agent-Human Interaction Protocol 的核心校验、Schema 与安全辅助工具。

AHIP item 是面向人类、agent、宿主、工具、widget 与 artifact 引用的结构化交互对象。宿主、服务端或测试套件在渲染内容或触发行为之前，都应使用本包校验与规范化 AHIP 数据。

[English](./README.md) | [仓库首页](https://github.com/ArcheLabs/ahip/blob/main/README.zh-CN.md) | [文档入口](https://github.com/ArcheLabs/ahip/tree/main/docs/zh-CN)

## 安装

```sh
npm install @ahip/core
```

## 提供能力

- AHIP v0.2 TypeScript 类型。
- AHIP v0.2 JSON Schema。
- 面向不可信输入的校验工具。
- 面向宿主消费的规范化工具。
- 面向不支持内容的 fallback 辅助工具。
- 扩展标识符与 block guard 工具。

## 基础校验

```ts
import { validateAHIPItem } from "@ahip/core";

const result = validateAHIPItem(input);

if (!result.valid) {
  throw new Error(result.errors.join("\n"));
}

const item = result.value;
```

## 进入宿主前规范化

```ts
import { normalizeAHIPItem, validateAHIPItem } from "@ahip/core";

const validation = validateAHIPItem(input);

if (validation.valid && validation.value) {
  const normalized = normalizeAHIPItem(validation.value);
  // 将 normalized 传给渲染器或宿主流程。
}
```

## Schema 导出

```ts
import { ahipV02Schema } from "@ahip/core";
```

也可以通过 package subpath 引入：

```ts
import schema from "@ahip/core/schema/ahip-v0.2.schema.json";
```

## 重要导出

- `validateAHIPItem`
- `assertValidAHIPItem`
- `normalizeAHIPItem`
- `getAHIPValidator`
- `getFallbackText`
- `isExtensionIdentifier`
- `isKnownBlock`
- `isCustomBlock`
- `CORE_BLOCK_TYPES`
- `AHIPItem`、`ContentBlock`、`AHIPAction`、`WidgetRef`、`ArtifactRef`、`CapabilitySet` 等 TypeScript 类型

## 安全说明

- 在渲染、派发 action、打开 artifact 或解析 widget 前，先校验不可信 payload。
- 对未知的 action-like 或疑似可执行数据保持保守处理。
- applet 与 widget 的执行必须由宿主控制。AHIP item 可以引用 applet，但本包不定义远程 applet 加载或动态代码执行。
- 尽量保留 `fallback_text`，让不支持某些能力的宿主可以安全降级。

## 更多文档

- [核心校验说明](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/core-validation.md)
- [包总览](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/package-overview.md)
- [Applet 边界](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/applet-boundary.md)
