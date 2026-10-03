# Browser regression checks

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

For byte-identical normal-mode screenshot comparisons and paired before/after artifacts, point to an unchanged local checkout of the PR12 base commit `96bfae78ec8611c2305c53a39239f4a3fbcbdaa5`:

```sh
HB_BASELINE_ROOT=/path/to/pr12-checkout HB_TEST_ARTIFACTS=/tmp/hvab-forced-artifacts node --test tests/forced-colors.test.mjs
```

Without `HB_BASELINE_ROOT`, the four normal-paint comparisons are reported as skipped, not passed. `HB_TEST_ARTIFACTS` is optional and writes screenshots outside the repository. To replay the final assertions against the unmodified CSS as a negative control, set `HB_CONTROL_ROOT=/path/to/pr12-checkout`; failures are expected there.

The browser helper is shared by both suites and uses isolated profiles. Forced-color emulation is not physical Windows high-contrast verification. Windows Edge/Chrome screenshots, keyboard/assistive-technology smoke, Firefox/Safari forced-color behavior and full consumer builds remain separate checks before closing Issue #2. A second Chromium build exercises the same engine family and does not replace them.
