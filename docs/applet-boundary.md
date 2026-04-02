# Applet Boundary

AHIP references applets. Hosts register and resolve them locally.

This repo treats an applet as a local runtime unit that may provide:

- widget renderers
- custom block renderers
- action or artifact-related host behavior
- fallback-aware UI integration

The boundary is intentionally simple:

1. an AHIP item references a widget or custom block
2. the host checks its local registration state
3. the host resolves the widget through a local applet registry
4. if resolution fails, the host renders fallback text instead

What this repo does not do:

- download applets from the network
- execute remote UI code
- define a universal applet sandbox
- standardize a production applet packaging format

See `gomokuAppletManifest`, `gomokuAppletRegistrationFlow`, and `createExampleHostDemo` in `@ahip/examples` for the concrete local-registration example.
