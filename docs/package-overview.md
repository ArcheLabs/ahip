# Package Overview

`@ahip/core`

- Exports the AHIP v0.2 types and JSON Schema
- Validates untrusted input
- Normalizes items for safe host use
- Preserves fallback-first behavior

`@ahip/react`

- Provides `AHIPItemRenderer` and supporting renderer components
- Uses host-controlled registries for blocks and widgets
- Allows hosts to supply action dispatch, artifact open behavior, and local applet lookup
- Falls back safely when blocks or widgets are unsupported

`@ahip/examples`

- Ships valid and invalid fixtures
- Includes custom block, unsupported widget, and applet-boundary examples
- Includes the Gomoku (Five in a Row) showcase
- Provides lightweight demo host utilities for local applet registration flow
