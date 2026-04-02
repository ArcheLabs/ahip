# Custom Extensions

AHIP uses namespaced extension identifiers.

Examples in this repo use schema-valid identifiers such as:

- `org.ahip.examples/profile.card`
- `org.ahip.examples/counter.widget`
- `org.ahip.examples/gomoku.board`

Guidelines:

- keep extension identifiers namespaced
- provide `fallback_text` for custom blocks and widgets whenever practical
- do not auto-execute unknown custom values
- let hosts decide which custom renderers are registered locally

`@ahip/examples` includes both custom block and unsupported-custom fixtures so hosts can test safe degradation.
