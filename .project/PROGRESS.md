# Issue #5 — field/color-input import order

Base: `5955feff38aeae132d847809ca1aaea8e5ff04c2` (`origin/main`).
Branch: `fix/issue-5-field-color-width-20261003`.
Scope: R05/C05; preserve tokens, classes, states, and documented direct/wrapper anatomy.
The primary checkout's progress file and other issue groups are out of scope.

## Plan and definition of done

1. Reproduce default and public widths with both import permutations; save a runnable browser regression test before fixing CSS.
2. Let field own grid-slot stretching and controls own explicit widths. Preserve full-width text/select/range slots, plain native slots, addons, and message states; document the ownership without changing API.
3. Verify light/dark, vertical/inline, standalone/direct/wrapped compositions, widths 28/40/72, size variants, disabled/invalid/hover/focus, public overrides, full index, and Selecta's entry/wrappers.
4. Run lint, demo/docs checks, targeted/full formatting, isolated Pages build and pack. Confirm npm start serves the catalogue and browser console stays clear.
5. Review only own diff, commit/push, open draft PR, record exact SHA, CI and mergeability. No merge or registry publication.

## Initial findings

- Issue #5 and audit E05/R05 reread. Both width declarations have one-class specificity.
- SPEC §§1.3, 3.3, 6–8, 10–11 require preserved public overrides and import-independent blocks; no layer or token rewrite is needed.
- Project/ancestor AGENTS read; no repository `.agents/skills` exists. Available local NL skills do not apply to this repository.
- Adjacent text-input, textarea, select, and range blocks already declare full width. Selecta uses a plain wrapper slot and field-before-color imports in `src/ui/hvab.css`.
- Initial baseline full-format warnings: the two audit prompt files. Later explicit parent authorization allowed the three-blank-line prerequisite commit from PR13; no audit report content is included.

Next: add the runnable browser matrix and record the failing baseline.

## Implementation and browser matrix

- Reproduced the reverse-order width failure before the CSS fix. The first test run also caught CSSOM fractional rounding and transition sampling; the harness now uses a 0.001px tolerance for grid tracks and disables only fixture transitions.
- Field uses `justify-self: stretch` instead of `width: 100%`. Explicit control widths remain owned by their control block. A two-class rule preserves the documented combined slot/addons wrapper; standalone addons keep end alignment.
- Added `tests/field-color-input.mjs`, an isolated headless Chrome/CDP test with no added dependencies. Run `CHROME_BIN=/path/to/chrome node tests/field-color-input.mjs`; optional `REPORT_PATH` saves measurements outside the source tree.
- Chrome 154: **8,735 assertions, 0 failures**, light/dark × both block permutations/full index × direct/wrapped/standalone × default/40/72px × base/s/m/l/xl × default/invalid/native disabled/ARIA disabled/combined disabled-invalid/hover/focus/invalid-focus. Full-width adjacent and plain native slots, mixed addons, messages, label/action geometry, public height/border overrides, and console/runtime errors are covered.
- Hover/focus combinations in the matrix use CDP forced pseudo states for deterministic coverage. Real pointer/keyboard interaction is checked separately in consumer smoke.
- README paragraphs clarify ownership; classes, tokens, states and anatomy are unchanged (no version/API delta). Source demo examples are unchanged, so generated HTML should remain identical.

Next: final gates, isolated Selecta build/runtime smoke, then own commit and draft PR.

## Final verification

- Final negative control on a pristine `origin/main` archive: **8,735 assertions, 556 failures**; the same runner with the fix: **8,735 assertions, 0 failures**. A 40px public override became 640px in the reversed-order vertical fixture before the fix.
- The full-index color/label/addon/message/public snapshots match the baseline exactly in both schemes.
- PASS: `npm run lint:styles`, `npm run demo:check`, `npm run docs:check`, `npm run pages:build`, targeted Prettier, `git diff --check`.
- PASS: full `npm run format:check` after authorized cherry-pick of PR13's `b2a977bd13a37e9746ace50d1172b187049b0ec3` as `6e7a77ac750220271ee429d01a0e276132d231b1`. This is only three blank lines in existing audit prompts; no #11 packaging changes were copied.
- PASS: isolated dry-run and actual npm archive, 79 entries, 32 block CSS/README pairs, unchanged exports, tests excluded. Pages output: 33 HTML pages; 1,187 local references resolve. No npm publication or site deployment.
- PASS: isolated Selecta production build from committed consumer SHA `3df22e0167c773a04bdefcb69c722e112068efcc`, aliasing only `hvab-blocks/` imports to this worktree. The consumer's dirty checkout was read-only; no WIP files were copied. Existing Rollup PURE annotation warnings in @vueuse/core are unrelated to this CSS change.
- PASS: consumer SFC smoke with actual Field/ColorInput/TextInput/Button/ConfirmDialog wrappers and existing selective entrypoint; light/dark at 375/1000 CSS px, 40×32px public geometry, emitted native input events, disabled/invalid states, pointer hover, Tab, dialog focus containment/cancel/confirm/focus return. Full app mounts 24 fields.
- Consumer/catalogue console evidence: two missing `/favicon.ico` requests (one per local server); no other console/runtime errors. These isolated smoke requests are unrelated to library CSS and are retained as a known limit.
- `npm start` serves `/demo/`, field and color-input pages; screenshots were visually inspected.
- Limits: Chrome 154/macOS only; Safari/Firefox, physical mobile/Windows, AT speech and zoom are NOT RUN. State-matrix pseudo states use CDP; consumer smoke uses native focus/key/pointer events. Long-dialog-action layout belongs to #2 and was not changed.
- Merge note: preserve concurrent `.project/PROGRESS.md` tracks; this branch keeps its own track before the committed baseline. The PR13 prompt-format prerequisite may overlap harmlessly when both PRs merge.

Next: commit/push only the scoped files and create the authorized draft PR; report delivery/CI/mergeability separately.

## Delivery

- Draft PR: https://github.com/hvab/hvab-blocks/pull/15. Implementation commit: `e51922e9d21de8a635b5dde1a0f05ecdfb8335b8`.
- The only intervening main change is the committed Mobile layout audit track (`14ad1a67b86c9b35d8b7ff3574b016ff6c7492c1`); its text is preserved after this branch's track to avoid the append conflict. No main/PR merge or force push is performed.
- All implementation and verification steps are complete. Final remote SHA, checks and mergeability are reported in the task response.

# Current work

## Button geometry and radio group

### Plan

1. Completed: `.hb-button` keeps the border width of its view in the disabled state and makes the border transparent instead. Its outer dimensions now stay stable without changing the current button structure. The audit found no other state-dependent border-width changes: the existing controls only change border colour, while range thumb widths vary by size rather than state.
2. Completed: ported Gravity `SegmentedRadioGroup` as the public CSS block `hb-radio-group`: native `input[type="radio"]`, mutually exclusive options, selected, hover, disabled, and focus-visible states, size variants, documentation, generated demo, and `index.css` import. The compact icon-only example keeps accessible names on the radio inputs. Consumer integration is out of scope for this repository.
3. Completed: `v0.1.1` is tagged and pushed. Its GitHub Release title is `v0.1.1 — Stable disabled button geometry`. The future public `hb-radio-group` will require a subsequent `0.x` minor release; do not publish to npm unless requested.

### Definition of done

- A button keeps its measured width and height while its disabled state changes. Completed: outlined disabled buttons retain a transparent border.
- `hb-radio-group` is documented and usable as an independent CSS block with native radio semantics. Completed.
- The generated demos and release checks pass. Completed for the implementation; prepare `v0.2.0` locally without push.

## Mobile layout audit

### To do

1. Check the mobile layout of every block, prioritising positioned and overlay-like elements: `modal`, `sheet`, `toast`, `tooltip`, popovers, and menus. Verify that content fits the viewport, remains reachable, and does not get clipped or overflow horizontally.
2. Check the modal specifically on narrow viewports: its actions must remain fully visible and usable without overflowing the dialog, as in the reported Selecta screenshot.
