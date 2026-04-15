# AHIP Documentation

This section organizes the preview documentation for AHIP package consumers, host integrators, and contributors who need to understand the current implementation boundary.

If you are new to the repository, read the documents in this order:

1. [overview.md](./overview.md)
2. [getting-started.md](./getting-started.md)
3. [package-overview.md](./package-overview.md)
4. [core-validation.md](./core-validation.md)
5. [react-rendering.md](./react-rendering.md)
6. [examples.md](./examples.md)
7. [applet-boundary.md](./applet-boundary.md)
8. [gomoku-showcase.md](./gomoku-showcase.md)

Package-local npm READMEs live inside each package:

- [`packages/ahip-core/README.md`](../packages/ahip-core/README.md)
- [`packages/ahip-react/README.md`](../packages/ahip-react/README.md)
- [`packages/ahip-examples/README.md`](../packages/ahip-examples/README.md)

## Document Groups

### Protocol and Data Model

- [overview.md](./overview.md)
- [core-validation.md](./core-validation.md)

### Rendering and Host Integration

- [react-rendering.md](./react-rendering.md)
- [applet-boundary.md](./applet-boundary.md)

### Extensions and Examples

- [custom-extensions.md](./custom-extensions.md)
- [examples.md](./examples.md)
- [gomoku-showcase.md](./gomoku-showcase.md)

## Chinese Entry Point

- [zh-CN/README.md](./zh-CN/README.md)
- [zh-CN/overview.md](./zh-CN/overview.md)
- [zh-CN/getting-started.md](./zh-CN/getting-started.md)
- [zh-CN/package-overview.md](./zh-CN/package-overview.md)
- [zh-CN/core-validation.md](./zh-CN/core-validation.md)
- [zh-CN/react-rendering.md](./zh-CN/react-rendering.md)
- [zh-CN/examples.md](./zh-CN/examples.md)
- [zh-CN/custom-extensions.md](./zh-CN/custom-extensions.md)
- [zh-CN/applet-boundary.md](./zh-CN/applet-boundary.md)
- [zh-CN/gomoku-showcase.md](./zh-CN/gomoku-showcase.md)

## Preview Boundary

- The implementation is ready for integration and experimentation.
- Some APIs and extension boundaries may still evolve before a stable release.
- Hosts should validate untrusted input before rendering content or dispatching behavior.
- Applets are host-validated local runtime units; AHIP does not define remote applet loading or browser-side dynamic code execution.
- The examples package documents the reference implementation surface; it is not a substitute for protocol conformance requirements.
