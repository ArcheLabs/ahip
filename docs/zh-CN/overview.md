# AHIP 概览

本文用于帮助中文读者快速理解 AHIP 的定位、设计目标、仓库结构与当前集成边界。适合第一次接触该仓库，或正在评估是否将 AHIP 接入宿主产品的工程团队阅读。

## AHIP 是什么

AHIP 是 Agent-Human Interaction Protocol，一种用于描述人类、agent、宿主、工具与结构化交互对象之间关系的协议格式。它不是某个产品私有的 UI 协议，也不是单纯的聊天消息格式，而是一层更通用的交互数据模型。

一个 AHIP item 可以包含：

- 文本、Markdown、图片、文件、表格、图表等内容块
- 动作与审批对象
- widget 引用
- artifact 引用
- 状态补丁与上下文元数据

## 为什么需要 AHIP

纯文本聊天很难稳定表达复杂交互，例如：

- 需要用户审批后再继续的流程
- 需要结构化展示结果的流程
- 需要宿主渲染局部交互界面的流程
- 需要在不同宿主之间保持语义一致的流程

AHIP 试图把这些交互表示为宿主可校验、可渲染、可降级的数据对象，而不是把产品私有 UI 或远程代码执行耦合进协议。

## 设计目标

- 让 agent 表达语义意图，由宿主控制最终呈现与执行
- 让不支持某些能力的宿主仍能安全降级
- 通过命名空间扩展支持自定义 block 和 widget
- 保持 applet 边界清晰：AHIP 只引用 applet，宿主本地注册并解析
- 让外部项目能够基于统一的数据结构做集成和测试

## 仓库结构

当前 monorepo 主要包含：

- `packages/ahip-core`
  提供协议类型、Schema、校验、规范化与安全辅助工具
- `packages/ahip-react`
  提供 React 宿主可用的渲染层与 registry 模型
- `packages/ahip-examples`
  提供 fixtures、showcase 和示例宿主接入工具
- `docs/`
  提供面向外部读者的集成与说明文档

## 当前状态

本仓库目前处于 preview / pre-release 阶段。

- 基础结构已经可用于集成和实验
- 核心校验、React 渲染与 examples 已具备可运行实现
- 部分接口与扩展边界后续仍可能继续演进
- `@ahip/examples` 主要服务于参考实现与集成验证，不等同于完整标准文本

## 集成原则

- 对不可信输入先做校验，再进入渲染或执行路径
- 把 widget、action、artifact 等能力保持在宿主控制下
- 对未知 block、widget 或扩展值保留 fallback
- 不把远程 applet 下载、在线插件市场或浏览器侧代码执行引入当前边界

## 下一步阅读

- 英文总览: [../overview.md](../overview.md)
- 快速开始: [../getting-started.md](../getting-started.md)
- React 渲染: [../react-rendering.md](../react-rendering.md)
- applet 边界: [../applet-boundary.md](../applet-boundary.md)
