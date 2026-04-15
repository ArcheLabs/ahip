# 使用 `@ahip/examples`

本文说明 examples 包的组织方式，以及如何在宿主集成中使用它。适合需要 fixtures、showcase 数据或 AHIP 示例宿主接线的工程师阅读。

## 包含内容

`@ahip/examples` 围绕以下 fixture 组组织：

- `validFixtures`
- `invalidFixtures`
- `extensionFixtures`
- `appletBoundaryFixtures`
- `gomokuShowcaseFixtures`

## 代表性场景

- 标准 block item
- 通过 registry 渲染的自定义 block
- 通过 registry 渲染的 widget
- 安全 fallback 的不支持 widget
- 通过 applet 解析的 widget
- 局部 renderer 失败但整体 item 可继续展示的场景

## 示例宿主工具

本包也导出示例宿主辅助工具：

- `createExampleHostDemo`
- `createLocalAppletRegistry`
- `gomokuAppletManifest`
- `gomokuAppletRegistrationFlow`

这些工具用于演示宿主接线和本地 applet 注册。它们适合测试、demo 和集成探索，但不是完整宿主 runtime，也不是规范层。

## 集成说明

- 用有效 fixtures 测试基础校验和渲染。
- 用无效 fixtures 验证拒绝行为。
- 用扩展和 applet 边界 fixtures 覆盖 fallback 与 registry 处理。
- 用 Gomoku 评估更完整的端到端场景，同时避免引入产品私有逻辑。

## 下一步阅读

- 扩展与标识符: [custom-extensions.md](./custom-extensions.md)
- 本地 applet 边界: [applet-boundary.md](./applet-boundary.md)
- Gomoku showcase: [gomoku-showcase.md](./gomoku-showcase.md)
