# Browser regression checks

Run the disabled-state regressions with Node (the package's supported version) and an installed Chrome/Chromium:

```sh
node --test tests/disabled-states.test.mjs
```

On macOS the check uses Google Chrome from `/Applications`. On other systems it uses `google-chrome` on `PATH`. Set `CHROME_BIN` to a different installed executable if needed.

The check opens its own headless profile, loads the real `index.css` from a temporary HTML fixture and drives native pointer/keyboard input through a local DevTools pipe. It does not use a user profile, listen on a port, install dependencies or modify generated demo files. The browser/profile are closed and removed afterwards. Missing Chrome is a failure, not a skipped PASS.

The matrix compares coherent native/ARIA/data checked, mixed and disabled combinations with the existing same-source disabled skin in both color schemes. It checks actual hover, focus, geometry and public token overrides. It uses the public motion duration override to make style comparisons deterministic. It does not test forced colors or replace physical Windows, Safari/Firefox and consumer/assistive-technology checks.
