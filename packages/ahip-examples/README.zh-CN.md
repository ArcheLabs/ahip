# @ahip/examples

Agent-Human Interaction Protocol 的 examples、fixtures 与 showcase 数据。

本包用于测试 AHIP 校验、渲染、fallback、自定义扩展处理和本地 applet 解析。这里的 examples 属于参考集成材料，不是完整规范文本。

[English](./README.md) | [仓库首页](https://github.com/ArcheLabs/ahip/blob/main/README.zh-CN.md) | [文档入口](https://github.com/ArcheLabs/ahip/tree/main/docs/zh-CN)

## 安装

```sh
npm install @ahip/core @ahip/react @ahip/examples
```

## 包含内容

- 标准内容、审批、支付和 artifact 的有效 AHIP fixtures。
- 用于校验拒绝测试的无效 fixtures。
- 用于 registry 集成的自定义 block 与 widget fixtures。
- 用于 fallback 覆盖的不支持 block 与 widget fixtures。
- Gomoku（五子棋）showcase。
- 示例宿主工具，用于演示 action dispatch、artifact opening、block/widget registries 和本地 applet lookup。

## 基础 Fixture 用法

```ts
import { validateAHIPItem } from "@ahip/core";
import { standardBlockItem } from "@ahip/examples";

const result = validateAHIPItem(standardBlockItem.item);

if (!result.valid) {
  throw new Error(result.errors.join("\n"));
}
```

## 示例 React 宿主接入

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

## 重要导出

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

## 边界说明

- Fixtures 用于集成测试、demo 和宿主评估。
- 示例宿主刻意保持很小，不是生产 runtime。
- Gomoku showcase 演示本地 applet 注册与解析，不引入远程 applet 加载。
- 协议语义应以 `@ahip/core` 的 schema/types 和项目文档为准，不能只从 examples 推断。

## 更多文档

- [Examples 说明](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/examples.md)
- [Gomoku showcase](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/gomoku-showcase.md)
- [Applet 边界](https://github.com/ArcheLabs/ahip/blob/main/docs/zh-CN/applet-boundary.md)
