# Field/color-input regression

Requires Node.js 22+ and Chrome/Chromium. Run from the repository root:

```sh
CHROME_BIN=/path/to/chrome node tests/field-color-input.mjs
```

On macOS the default executable is Google Chrome. The test starts a local HTTP server and an isolated headless browser profile, then removes the profile. No dependencies are installed. Set `REPORT_PATH` to save the measured snapshots as JSON.

The matrix covers both selective block import orders and the full entrypoint, light/dark schemes, vertical/inline fields, standalone/wrapped inputs, default and public widths, every color-input size, invalid/disabled combinations, hover/focus, public overrides, messages, label/addon geometry, and neighboring full-width slots. Hover/focus pseudo states are forced through CDP; this does not replace cross-browser or real consumer keyboard/pointer checks.
