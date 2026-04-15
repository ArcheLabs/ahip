# 自定义扩展

本文说明 preview 实现如何使用命名空间标识符表示自定义 block 和 widget。适合需要在不改变 AHIP core 语义的前提下添加本地扩展的宿主和包使用方阅读。

## 标识符模型

AHIP 使用 `<namespace>/<name>` 形式的命名空间扩展标识符。

本仓库中的示例包括：

- `org.ahip.examples/profile.card`
- `org.ahip.examples/counter.widget`
- `org.ahip.examples/gomoku.board`

## 集成原则

- 保持扩展标识符命名空间清晰且稳定。
- 尽量为自定义 block 和 widget 提供 `fallback_text`。
- 不要自动执行未知自定义值。
- 由宿主决定本地注册哪些自定义 renderer。
- applet 可以帮助宿主组织本地 renderer 和处理逻辑，但 AHIP 不定义远程 applet 加载。

`@ahip/examples` 同时提供支持和不支持的自定义 fixtures，方便宿主验证安全降级行为。

## 下一步阅读

- Examples 包结构: [examples.md](./examples.md)
- Applet 边界: [applet-boundary.md](./applet-boundary.md)
