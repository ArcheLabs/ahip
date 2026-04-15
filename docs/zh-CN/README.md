# AHIP 中文文档

这里提供 AHIP 预览版实现的中文入口，帮助中文读者快速理解仓库定位、集成边界和当前状态。

推荐阅读顺序：

1. [overview.md](./overview.md)
2. [getting-started.md](./getting-started.md)
3. [package-overview.md](./package-overview.md)
4. [core-validation.md](./core-validation.md)
5. [react-rendering.md](./react-rendering.md)
6. [examples.md](./examples.md)
7. [custom-extensions.md](./custom-extensions.md)
8. [applet-boundary.md](./applet-boundary.md)
9. [gomoku-showcase.md](./gomoku-showcase.md)

如果你主要想先理解“AHIP 是什么、为什么存在、当前能做到什么”，先读 [overview.md](./overview.md)。

包内 npm README 位于：

- [`packages/ahip-core/README.zh-CN.md`](../../packages/ahip-core/README.zh-CN.md)
- [`packages/ahip-react/README.zh-CN.md`](../../packages/ahip-react/README.zh-CN.md)
- [`packages/ahip-examples/README.zh-CN.md`](../../packages/ahip-examples/README.zh-CN.md)

Applet 是由宿主校验并本地注册的运行单元。AHIP item 可以引用 applet，但 AHIP 不定义远程 applet 加载或浏览器侧动态代码执行。
