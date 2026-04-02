# Using `@ahip/examples`

This page explains how the examples package is organized and how to use it during host integration. It is intended for engineers who need fixtures, showcase data, or sample host wiring for AHIP.

## What the Package Contains

`@ahip/examples` is organized around these fixture groups:

- `validFixtures`
- `invalidFixtures`
- `extensionFixtures`
- `appletBoundaryFixtures`
- `gomokuShowcaseFixtures`

## Representative Scenarios

- a standard-block item
- a custom block rendered through a registry
- a widget rendered through a registry
- an unsupported widget that falls back safely
- an applet-resolved widget
- an item that survives a partial renderer failure

## Sample Host Utilities

The package also exports sample host helpers:

- `createExampleHostDemo`
- `createLocalAppletRegistry`
- `gomokuAppletManifest`
- `gomokuAppletRegistrationFlow`

These helpers exist to demonstrate host wiring and local applet registration. They are useful for tests, demos, and integration exploration, but they are not a full host runtime or a normative protocol layer.

## Integration Notes

- Use valid fixtures to test baseline validation and rendering.
- Use invalid fixtures to verify rejection behavior.
- Use extension and applet-boundary fixtures to exercise fallback and registry handling.
- Use Gomoku to evaluate a richer end-to-end scenario without product-specific logic.

## Read Next

- Extensions and identifiers: [custom-extensions.md](./custom-extensions.md)
- Local applet boundary: [applet-boundary.md](./applet-boundary.md)
- Gomoku showcase: [gomoku-showcase.md](./gomoku-showcase.md)
