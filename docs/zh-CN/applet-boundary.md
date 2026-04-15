# Applet 边界

本文说明 preview 实现使用的 applet 边界，适合需要理解 AHIP 如何引用 applet、同时避免引入远程代码加载的宿主集成方阅读。

## 核心模型

AHIP item 可以引用 applet。宿主负责在本地校验、注册和解析这些 applet。

在本仓库中，applet 是本地运行单元，可能提供：

- widget renderer
- 自定义 block renderer
- 与 action 或 artifact 相关的宿主行为
- 支持 fallback 的 UI 集成

## 解析流程

1. AHIP item 引用一个 widget 或自定义 block。
2. 宿主检查本地注册状态和宿主自己的校验策略。
3. 宿主通过本地 applet registry 解析 widget 或 renderer。
4. 如果解析失败，宿主回退到安全文本或 block-level fallback 内容。

## 本仓库不定义什么

- 远程 applet 下载
- 浏览器侧动态代码执行
- 通用 applet sandbox
- 生产级 applet 打包标准
- 自动执行不可信 applet 代码

当前实现刻意保持边界很窄：AHIP 负责引用 applet，宿主决定如何在本地注册、校验和解析它们。

## 下一步阅读

- 示例宿主接线与 fixtures: [examples.md](./examples.md)
- Gomoku showcase: [gomoku-showcase.md](./gomoku-showcase.md)
- 中文概览: [overview.md](./overview.md)
