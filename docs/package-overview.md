# Package Overview

This page explains the responsibility of each published package. It is intended for engineers choosing which AHIP packages to depend on in a host application or integration test suite.

## `@ahip/core`

Use this package when you need protocol-level handling.

- Exports AHIP v0.2 types and the JSON Schema used by the implementation
- Validates untrusted input
- Normalizes items for safer host consumption
- Exposes fallback and extension helpers for host-side logic

## `@ahip/react`

Use this package when you want a React renderer that keeps host control explicit.

- Provides `AHIPItemRenderer` and supporting renderer components
- Uses registries for standard blocks, custom blocks, and widgets
- Accepts host-supplied action dispatch, artifact open behavior, and local applet lookup
- Preserves fallback-first rendering when a renderer is unavailable or fails

## `@ahip/examples`

Use this package when you need integration fixtures and reference wiring.

- Ships valid and invalid AHIP fixtures
- Includes custom block, unsupported widget, partial-failure, and applet-boundary examples
- Includes the Gomoku (Five in a Row) showcase
- Provides lightweight sample host utilities for local applet registration and renderer wiring

## Package Selection

- Start with `@ahip/core` if you need validation only.
- Add `@ahip/react` if your host renders AHIP items in React.
- Add `@ahip/examples` if you want fixtures, sample host wiring, or showcase items during integration.

## Read Next

- Protocol handling: [core-validation.md](./core-validation.md)
- React integration: [react-rendering.md](./react-rendering.md)
- Fixtures and showcases: [examples.md](./examples.md)
