# AHIP

Standalone monorepo for the Agent-Human Interaction Protocol.

## Packages

- `@ahip/core`: protocol types, schema, validation, normalization, and safety helpers
- `@ahip/react`: React host-facing rendering scaffold
- `@ahip/examples`: fixtures and example AHIP items

## Tooling

- package manager: `pnpm`
- language: `TypeScript`
- build: `tsup`
- tests: `vitest`
- schema validation: `ajv`

## Commands

```sh
pnpm install
pnpm build
pnpm typecheck
pnpm test
pnpm lint
```
