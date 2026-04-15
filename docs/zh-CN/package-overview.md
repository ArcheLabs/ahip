# 包总览

本文说明每个发布包的职责，适合正在决定宿主应用或集成测试套件应依赖哪些 AHIP 包的工程师。

## `@ahip/core`

当你需要协议层处理能力时使用本包。

- 导出 AHIP v0.2 类型和实现使用的 JSON Schema
- 校验不可信输入
- 规范化 item，方便宿主安全消费
- 提供 fallback 与扩展辅助工具

## `@ahip/react`

当你需要一个保持宿主控制边界的 React 渲染器时使用本包。

- 提供 `AHIPItemRenderer` 与配套渲染组件
- 使用 registry 管理标准 block、自定义 block 和 widget
- 接收宿主提供的 action dispatch、artifact open 行为与本地 applet lookup
- 在 renderer 不存在或失败时保持 fallback-first 渲染

## `@ahip/examples`

当你需要 integration fixtures 或参考接入工具时使用本包。

- 提供有效与无效 AHIP fixtures
- 包含自定义 block、不支持 widget、局部失败和 applet 边界示例
- 包含 Gomoku（五子棋）showcase
- 提供轻量示例宿主工具，用于本地 applet 注册和 renderer 接线

## 如何选择

- 只需要校验时，从 `@ahip/core` 开始。
- React 宿主需要渲染 AHIP item 时，加入 `@ahip/react`。
- 需要 fixtures、示例宿主接入或 showcase 时，加入 `@ahip/examples`。

## 下一步阅读

- 协议处理: [core-validation.md](./core-validation.md)
- React 集成: [react-rendering.md](./react-rendering.md)
- Fixtures 与 showcases: [examples.md](./examples.md)
