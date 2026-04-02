# Custom Extensions

This page explains how the preview implementation uses namespaced identifiers for custom blocks and widgets. It is intended for hosts and package consumers who need to add local extensions without changing AHIP core semantics.

## Identifier Model

AHIP uses namespaced extension identifiers of the form `<namespace>/<name>`.

Examples in this repository include:

- `org.ahip.examples/profile.card`
- `org.ahip.examples/counter.widget`
- `org.ahip.examples/gomoku.board`

## Integration Guidelines

- Keep extension identifiers namespaced and stable.
- Provide `fallback_text` for custom blocks and widgets whenever practical.
- Do not auto-execute unknown custom values.
- Let hosts decide which custom renderers are registered locally.

`@ahip/examples` includes both supported and unsupported custom fixtures so hosts can verify safe degradation behavior.

## Read Next

- Examples package structure: [examples.md](./examples.md)
- Applet boundary: [applet-boundary.md](./applet-boundary.md)
