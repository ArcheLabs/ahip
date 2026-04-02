# Gomoku (Five in a Row)

This page explains how the Gomoku showcase demonstrates the current AHIP preview surface. It is intended for readers who want a concrete end-to-end example of blocks, widgets, fallback behavior, and local applet resolution.

## Why Gomoku

Gomoku (Five in a Row) is the first showcase because it demonstrates:

- structured interaction beyond plain text
- custom block rendering
- widget rendering through a local applet registry
- safe fallback behavior on unsupported hosts

## Showcase Items

The package exports four lifecycle items:

- game start item
- human move submission item
- updated board item
- game finished item

## Protocol Shape

- custom block: `org.ahip.examples/gomoku.board`
- widget type: `org.ahip.examples/gomoku.widget`
- local applet id: `gomoku-local-applet`

## Boundary Demonstration

- The AHIP item references the Gomoku block and widget.
- The host resolves the widget locally through the applet registry.
- Unsupported hosts still show fallback text such as move history and winner status.

This keeps the example in `@ahip/examples` and avoids pushing game-specific logic into `@ahip/core`.

## Read Next

- Examples package: [examples.md](./examples.md)
- Applet boundary: [applet-boundary.md](./applet-boundary.md)
