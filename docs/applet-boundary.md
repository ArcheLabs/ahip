# Applet Boundary

This page explains the applet boundary used by the preview implementation. It is intended for host integrators who need to understand how AHIP references applets without introducing remote code loading.

## Core Model

AHIP items may reference applets. Hosts validate, register, and resolve them locally.

In this repository, an applet is a local runtime unit that may provide:

- widget renderers
- custom block renderers
- action or artifact-related host behavior
- fallback-aware UI integration

## Resolution Flow

1. An AHIP item references a widget or custom block.
2. The host checks its local registration state and any host-specific validation policy.
3. The host resolves the widget or renderer through a local applet registry.
4. If resolution fails, the host falls back to safe text or block-level fallback content.

## What This Repository Does Not Define

- remote applet download
- browser-side dynamic code execution
- a universal applet sandbox
- a production applet packaging standard
- automatic execution of untrusted applet code

The implementation keeps the boundary intentionally narrow: AHIP references applets, while hosts decide how to register, validate, and resolve them locally.

## Read Next

- Sample host wiring and fixtures: [examples.md](./examples.md)
- Gomoku showcase: [gomoku-showcase.md](./gomoku-showcase.md)
- Chinese introduction: [zh-CN/overview.md](./zh-CN/overview.md)
