# Browser regression checks

## Disabled states

Run the disabled-state regressions with Node (the package's supported version) and an installed Chrome/Chromium:

```sh
node --test tests/disabled-states.test.mjs
```

On macOS the check uses Google Chrome from `/Applications`. On other systems it uses `google-chrome` on `PATH`. Set `CHROME_BIN` to a different installed executable if needed.

The check opens its own headless profile, loads the real `index.css` from a temporary HTML fixture and drives native pointer/keyboard input through a local DevTools pipe. It does not use a user profile, listen on a port, install dependencies or modify generated demo files. The browser/profile are closed and removed afterwards. Missing Chrome is a failure, not a skipped PASS.

The matrix compares coherent native/ARIA/data checked, mixed and disabled combinations with the existing same-source disabled skin in both color schemes. It checks actual hover, focus, geometry and public token overrides. It uses the public motion duration override to make style comparisons deterministic. It covers ordinary mode; the forced-colors suite below checks the same control state sources with system palettes.

## Forced colors

```sh
node --test tests/forced-colors.test.mjs
```

This suite checks light/dark forced-color emulation independently of the library's light/dark scheme: 224 native/ARIA/data state combinations plus keyboard, label activation, focus, system-color public overrides, native select behavior and AX role/name/state comparisons. It reads the browser's system colors rather than hardcoding RGB values. The switch intentionally retains native checkbox semantics.

For byte-identical normal-mode screenshot comparisons and paired before/after artifacts, point to an unchanged local checkout of the historical pre-fix revision `3b211d4223e153e0aad210cf4fa5d3fcbbd96b96`:

```sh
HB_BASELINE_ROOT=/path/to/main-checkout HB_TEST_ARTIFACTS=/tmp/hvab-forced-artifacts node --test tests/forced-colors.test.mjs
```

Without `HB_BASELINE_ROOT`, the four normal-paint comparisons are reported as skipped, not passed. `HB_TEST_ARTIFACTS` is optional and writes screenshots outside the repository. To replay the final assertions against the unmodified CSS as a negative control, set `HB_CONTROL_ROOT=/path/to/main-checkout`; failures are expected there.

The browser helper is shared by both suites and uses isolated profiles. Forced-color emulation is not physical Windows high-contrast verification. The owner accepted and closed the original #2/#7 scope; see the [historical completion record](../.project/history/AUDIT-2026-10.md). These regression checks do not recreate that closed manual gate or claim fresh cross-browser/device certification. A second Chromium build exercises the same engine family.

## Field/color-input regression

Requires Node.js 22+ and Chrome/Chromium. Run from the repository root:

```sh
CHROME_BIN=/path/to/chrome node tests/field-color-input.mjs
```

On macOS the default executable is Google Chrome. The test starts a local HTTP server and an isolated headless browser profile, then removes the profile. No dependencies are installed. Set `REPORT_PATH` to save the measured snapshots as JSON.

The matrix covers both selective block import orders and the full entrypoint, light/dark schemes, vertical/inline fields, standalone/wrapped inputs, default and public widths, every color-input size, invalid/disabled combinations, hover/focus, public overrides, messages, label/addon geometry, and neighboring full-width slots. Hover/focus pseudo states are forced through CDP; this does not replace cross-browser or real consumer keyboard/pointer checks.
