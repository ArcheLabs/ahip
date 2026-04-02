# Using `@ahip/examples`

`@ahip/examples` is organized around fixture categories:

- `validFixtures`
- `invalidFixtures`
- `extensionFixtures`
- `appletBoundaryFixtures`
- `gomokuShowcaseFixtures`

Representative examples:

- standard block item
- custom block rendered through registry
- widget rendered through registry
- unsupported widget fallback
- applet-resolved widget
- partial-failure render item

The package also exports lightweight demo helpers:

- `createExampleHostDemo`
- `createLocalAppletRegistry`
- `gomokuAppletManifest`
- `gomokuAppletRegistrationFlow`

Use the examples package to test a host’s validation, fallback handling, registry wiring, and local applet resolution.
