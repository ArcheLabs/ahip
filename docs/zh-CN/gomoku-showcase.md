# Gomoku（五子棋）

本文说明 Gomoku showcase 如何展示当前 AHIP preview 能力。它适合想看 blocks、widgets、fallback 行为和本地 applet 解析端到端示例的读者。

## 为什么选择 Gomoku

Gomoku（五子棋）是第一个 showcase，因为它展示了：

- 超出纯文本的结构化交互
- 自定义 block 渲染
- 通过本地 applet registry 渲染 widget
- 不支持宿主上的安全 fallback 行为

## Showcase Items

本包导出四个生命周期 item：

- game start item
- human move submission item
- updated board item
- game finished item

## 协议形状

- custom block: `org.ahip.examples/gomoku.board`
- widget type: `org.ahip.examples/gomoku.widget`
- local applet id: `gomoku-local-applet`

## 边界演示

- AHIP item 引用 Gomoku block 和 widget。
- 宿主通过 applet registry 在本地解析 widget。
- 不支持的宿主仍能显示 fallback 文本，例如 move history 和 winner status。

这让游戏示例留在 `@ahip/examples` 中，不会把游戏私有逻辑推入 `@ahip/core`。

## 下一步阅读

- Examples 包: [examples.md](./examples.md)
- Applet 边界: [applet-boundary.md](./applet-boundary.md)
