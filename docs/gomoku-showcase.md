# Gomoku (Five in a Row)

Gomoku (Five in a Row) is the first showcase because it demonstrates:

- structured interaction beyond plain text
- custom block rendering
- widget rendering through a local applet registry
- safe fallback behavior on unsupported hosts

The showcase exports four lifecycle items:

- game start item
- human move submission item
- updated board item
- game finished item

Protocol shape:

- custom block: `org.ahip.examples/gomoku.board`
- widget type: `org.ahip.examples/gomoku.widget`
- local applet id: `gomoku-local-applet`

Important boundary:

- the AHIP item references the Gomoku block and widget
- the host resolves the widget locally through the applet registry
- unsupported hosts still show fallback text such as move history and winner status

This keeps Gomoku in the examples layer instead of pushing game-specific logic into `@ahip/core`.
