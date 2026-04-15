# AHIP repository instructions

## Read first
Before making changes, read these files in order:

1. `README.md`
2. `docs/README.md`
3. `docs/overview.md`
4. `docs/applet-boundary.md`
5. `packages/ahip-core/src/schema/ahip-v0.2.schema.json`
6. `packages/ahip-core/src/types/index.ts`

Treat the public docs and checked-in core schema/types as the source of truth for repository goals, package boundaries, protocol semantics, and naming.

## Repository goal
This repository is the standalone AHIP monorepo.

Initial scope:
- `packages/ahip-core`
- `packages/ahip-react`
- `packages/ahip-examples`
- `docs/`

Do not add product-specific host logic here.

## Working rules
- Prefer incremental, reviewable commits.
- Keep protocol semantics aligned with the v0.2 draft and schema.
- Use the term `applet` consistently. Do not reintroduce `skill`, `capability`, or `module` as the main runtime term.
- Favor simple, typed, testable implementations.
- Add tests for parsing, validation, and renderer registry behavior where practical.
- Do not invent online plugin downloading or remote code execution.
- Assume applets are locally registered and host-controlled.

## Implementation priority
1. Scaffold monorepo structure.
2. Implement `@ahip/core`.
3. Implement `@ahip/react`.
4. Implement `@ahip/examples`.
5. Add docs and examples needed to verify the flow.

## Verification
Before finishing, run the relevant install, build, typecheck, lint, and test commands for the files you changed.
If something cannot be completed, explain exactly what remains and why.
