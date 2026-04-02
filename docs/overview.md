# AHIP Overview

This page introduces what AHIP is, what this repository implements today, and where to look next. It is intended for engineers evaluating the protocol or planning a host integration.

## What AHIP Is

AHIP, the Agent-Human Interaction Protocol, is a structured interaction format for communication between humans, agents, hosts, tools, widgets, and artifact references. It is designed for interaction flows that need more than plain text, such as approvals, forms, charts, files, state updates, and host-controlled widgets.

AHIP does not define a transport or a product UI. Instead, it defines data structures and behavior boundaries so that different hosts can validate, render, and safely degrade the same interaction objects.

## What This Repository Provides

This monorepo contains a preview implementation of AHIP v0.2 with three packages:

- `@ahip/core` for protocol types, JSON Schema, validation, normalization, and safety helpers
- `@ahip/react` for a host-controlled React renderer
- `@ahip/examples` for fixtures, showcase items, and sample host wiring

The repository is intentionally framework-light outside the React package and does not include product-specific business logic.

## Design Principles

- Host-controlled rendering: agents express intent; hosts decide presentation and execution.
- Fallback-first behavior: unsupported blocks and widgets should degrade safely.
- Controlled extensibility: custom identifiers are namespaced and resolved locally.
- Local applet boundary: AHIP items may reference applets, but hosts register and resolve them locally.
- Safe handling of untrusted data: validation should happen before rendering or dispatching behavior.

## Preview Status

This repository is in preview / pre-release status.

- The baseline integration path is ready for experimentation.
- The package APIs are usable for early adopters.
- Some extension boundaries and integration interfaces may still evolve.
- Examples are included to help hosts evaluate behavior; they should not be treated as a complete normative standard.

## Reading Path

- To install and run the workspace, continue with [getting-started.md](./getting-started.md).
- To compare the package roles, read [package-overview.md](./package-overview.md).
- To integrate validation, read [core-validation.md](./core-validation.md).
- To integrate rendering, read [react-rendering.md](./react-rendering.md).
- To understand local applet resolution, read [applet-boundary.md](./applet-boundary.md).
