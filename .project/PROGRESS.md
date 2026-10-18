# Current project status — 2026-10-19

- All eleven audit fixes (#1–#11) are closed and integrated into main through PRs #12–#19. The remaining formatting warning was fixed in PR #20. No manual acceptance remains for that agreed set.
- The primary checkout is consolidated onto main. Accepted CSS fixes and main's package/documentation changes are preserved; the previously local catalogue redirect and audit records are included in this consolidation.
- Current recommended next work is in [IDEAS.md](IDEAS.md): donor provenance before a new distribution, a final consumer sync, release-note completion, and explicit browser/motion/RTL decisions. No new CSS implementation is active.
- The package is still version 0.2.0; no new release, registry publication or consumer deployment has been performed.
- [Local audit and integration history](history/LOCAL-AUDIT-2026-10-19.md) preserves the previously uncommitted develop journal, including owner acceptance and merged PR references. It is historical evidence, not an active task list.

## Local consolidation plan and completion criteria

Preserve both main's committed history and the local develop journal, reconcile deferred ideas with completed work, retain the existing catalogue redirect and verify the project gates and HTTP routing. Finish with one scoped local commit on main and a clean working tree. Keep develop as a recoverable historical branch; do not reset or delete it. No remote publication is requested in this step.

## Consolidation result

- Preserved main's complete committed progress record below and the byte-identical local develop journal in history/LOCAL-AUDIT-2026-10-19.md. Both prompt-format changes were already present in main and required no reapplication. The container-query idea is marked delivered for dialog; other ideas and main's Modern Web Guidance pointer are retained.
- Preserved the local catalogue middleware and its README wording. HTTP checks confirm / redirects with 302 to /demo/, catalogue and CSS return 200, and an unknown path stays 404.
- Full format:check, style lint, demo:check, docs:check, pack:check and diff whitespace checks pass. The package check resolves 52 local documentation links across 80 files. Core blocks, tokens, entrypoint, package metadata, audit reports, scripts and existing verification files exactly match origin/main.
- The consolidation is recorded in one local commit on main. Remote publication, a new version and consumer deployment are deferred; develop remains available as history. The next recommended task is the V01 provenance inventory before a new distribution, followed by the current consumer integration and release-note/version preparation.

## Earlier committed implementation records

The entries below are retained as history. Earlier pending/next statements are superseded by the current status above.

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

## Issue #11 — package documentation links

Scope: repair README/USAGE links in npm pack output without changing CSS, tokens, exports, or publishing to the registry. Base: origin/main `5955feff38aeae132d847809ca1aaea8e5ff04c2`.

### Plan and definition of done

1. Reproduce missing documentation targets from an actual extracted npm archive; record the six failures and the baseline manifest.
2. Ship the consumer changelog and pin maintainer references to the existing v0.2.0 tag; add an archive regression check covering local consumer links, CSS/docs contents, and exports.
3. If needed, format only the two tracked audit prompt files in a separate prerequisite commit; preserve their text.
4. Pass lint, full formatting, demo/docs checks, Pages build, dry-run and actual pack checks, and catalogue serving. Review the independent diff, commit/push the branch, and create a draft PR.

Done means all six links resolve locally or reference a verified release tag, all 32 block CSS/README files and public exports remain present, no reports/WIP enter the package, and verification/limitations are recorded here.

### State

- Read Issue #11, audit E12/R11, repository AGENTS/SPEC, and local paths. No relevant repository .agents/skills exist; the global NL workflow does not apply.
- Created an isolated worktree at /tmp/hvab-blocks-issue-11-package from current origin/main. The shared checkout and its foreign PROGRESS remain untouched.
- Verified v0.2.0 contains AGENTS.md, SPEC.md, and RELEASE.md; these maintainer references can be pinned without package bloat.
- Next: reproduce on the real archive before implementation.

### Verification and delivery

- Baseline actual archive: 79 files, six broken README/USAGE links (CHANGELOG ×3, RELEASE, AGENTS, SPEC).
- Fix: ship CHANGELOG.md; pin three maintainer references to verified v0.2.0. The package now contains 80 files; only CHANGELOG.md was added. Size growth: 988 compressed / 2427 unpacked bytes. CSS, exports, generated demo, and changelog content are unchanged.
- New `npm run pack:check` packs/extracts in a temporary directory, compares all CSS/docs with source and exports with package.json, resolves 48 local documentation links, and rejects development/report files. Supports npm 12 map and older array JSON output; removes its temporary archive/cache.
- Negative controls: original main fails for missing CHANGELOG; a deliberate missing README target fails in the link resolver.
- Prerequisite commit `b2a977bd13a37e9746ace50d1172b187049b0ec3`: only three blank lines added across the two authorized tracked audit prompts. Verified identical content after whitespace removal; no reports added/edited.
- PASS: lint:styles, full format:check, docs:check, demo:build, demo:check, pages:build, git diff --check, actual pack:check, dry-run manifest comparison (no tarball created; all 32 block CSS/README pairs retained).
- PASS: npm start served the catalogue; in-app browser loaded /demo/ and /demo/button.html with no captured warning/error logs. Initial sandbox listener restriction was resolved through approved localhost execution.
- Limits: no registry publication, deployment, full Selecta build, or cross-browser UI regression; no CSS/UI changes require those for this packaging fix. pack:check requires Node/npm and tar (verified macOS; Linux-compatible commands, not tested on Windows). External maintainer references deliberately remain at v0.2.0; verification uses the existing Git tag, not live network availability. The markdown checker covers inline target existence, not anchor IDs or reference-style links.
- Delivery: pushed fix/issue-11-package-docs-20261003 and created draft PR #13 (https://github.com/hvab/hvab-blocks/pull/13). GitHub reports MERGEABLE/CLEAN, with no PR checks or workflow runs configured. Shared checkout remains untouched; this worktree is clean after removing the temporary dependency symlink.
- Next: review draft PR #13; do not merge automatically. PROGRESS additions may conflict with concurrent tracks; keep each track's independent entries when merging. No CHANGELOG-content conflict was introduced.

## Docs examples — Issues #8–10 (2026-10-03)

Base: origin/main `5955feff38aeae132d847809ca1aaea8e5ff04c2`. Work is isolated on `fix/docs-examples-8-10-20261003`; the primary checkout's progress file is untouched.

### Plan and definition of done

1. Reproduce missing names in the generated text-input, textarea and progress demos; capture values and states as negative controls. Done when the 19 unnamed semantic nodes have meaningful names and existing names, values, states and unique IDs are preserved.
2. Correct native dialog scroll-lock responsibility in the modal README and CSS header only. Done when native top-layer/inert behavior is distinguished from consumer scrolling policy, with a fresh bare-native Chrome wheel reproduction.
3. Move the popover preview height reservation outside its anchor. Done when the existing 8px gap and menu roles/actions remain, with menu containment at narrow and desktop widths. No CSS skin/API/token changes.
4. Add a focused repeatable browser regression check; regenerate demos; run style lint, formatting, demo/docs checks, Pages build and pack dry-run. Capture browser evidence and explicitly mark unavailable AT/consumer/cross-browser checks.
5. Commit/push only this track's changes and create a draft PR; record exact SHA, CI and mergeability. Do not merge.

### Verification and limits

- Issues #8–10 and audit/2-sol-6-1-xhigh.md were reread. No repository `.agents/skills` exists; global NL-specific skills do not apply.
- Issue #10 already specifies the external height reservation and gap; no new design choice is required.
- VoiceOver/NVDA speech, Safari/Firefox, physical touch and full consumer builds are not available in this automated Chrome check.
- Completed #8: the baseline reproduced 5/12/2 unnamed text-input/textarea/progress nodes. Explicit author names now cover all 19. Fresh Chrome AX has 13/17/2 named nodes; exact existing DOM values, states, styles and already-present names match the baseline. No IDs added; no duplicate IDs.
- Completed #9: README and the matching CSS header now assign background scroll policy to the consumer for both hosts, separately from native top-layer/inert behavior. Chrome 154 bare-native and full-CSS wheel deltaY=400 both moved the page to scrollY=400 while the dialog stayed modal/open. Close preserved the native display:none state and the observed scroll position. This is a reproduction, not a universal scrolling policy.
- Completed #10: an outer wrapper reserves the existing 160px demo space; the containing block has only the anchor height. Gap changed from 168px to 8px. Both themes at 320/375/1280px keep anchor and menu inside the preview, above the source region, with the same actions/roles. Popover CSS is unchanged. Narrow/desktop screenshots visually inspected.
- Added `scripts/check-doc-examples.mjs`: dependency-free Chrome CDP check for AX names/counts, IDs, field/progress states and menu bounds/actions. Run against a separate debugging profile and the running catalogue; see its header for commands.
- PASS: lint:styles, demo:check, docs:check, targeted Prettier, pages:build (33 HTML), pack dry-run (79 entries, all 32 CSS blocks, no scripts/progress/audit additions), git diff --check and browser runtime checks. npm start served the isolated catalogue without page errors.
- Full format:check initially reproduced only the two baseline audit prompt warnings. By explicit follow-up authorization, adopted only prerequisite `b2a977bd13a37e9746ace50d1172b187049b0ec3` from PR13 as `21152d9c613153779cc06ca506957b515387f991`: three blank lines in existing prompts, no content changes or packaging fix. Full format:check now PASS; lint/demo/docs gates rerun and PASS.
- NOT RUN: VoiceOver/NVDA speech, Safari/Firefox, physical touch, real consumer wheel/touch/scroll-lock restoration. No consumer policy was introduced or tested; those issue acceptance checks remain follow-up validation.
- Shared-file note: only this branch appends this completed track to PROGRESS; parallel tracks may conflict in that file. No CHANGELOG changes or foreign reports/WIP are included; the explicitly authorized formatting-only prerequisite is a separate commit.
- Implementation and local validation complete. Next step: review the draft PR and unavailable platform/consumer acceptance before merging.

## Issue #1 implementation — 2026-10-18

### Plan and definition of done

1. Implement the approved policy: full-width stacked actions below the default 480px dialog width, an end-aligned row at 480px and above, unchanged DOM/Tab order and fully wrapping labels. Use the dialog's actual width, including narrow containers on desktop.
2. Remove the independent divider overflow, preserve public padding/size overrides, document the composition and regenerate its catalogue examples.
3. Verify isolated divider/actions cases, 320/375/1280px layouts, sizes, long labels and keyboard/scroll reachability; exercise the real Selecta wrappers in a temporary fixture. Run the required style/format/catalogue gates and record unavailable manual environments.

Done means the implementation and examples are reviewable in the current checkout, with verification evidence and limits recorded. No commit, branch switch, PR change or issue closure is authorized by this step.

### State

- Implemented named size-container layout on the dialog: stacked/stretched footer below 480px, end-aligned row from 480px. The fixed structural threshold matches the existing default dialog width; unsupported size queries retain the safe stacked layout. No reordering or wrapper changes.
- Direct footer buttons wrap full labels, including unbroken strings, with automatic height. The button block now also reads its existing height token as min-height, preserving size modifiers and public height overrides when the footer uses height:auto. Footer text line height and block padding have their own public/private tokens; no other block's private tokens are accessed.
- Removed divider negative margins; it now spans the unpadded root and cannot shrink vertically. Updated both block READMEs, corrected the footer-padding description and regenerated the narrow-dialog catalogue example.
- Chrome 156: 720 geometry combinations passed across native/div hosts, 320/375/1280px viewports, default/s/m/l dialog sizes, 1–3 short/long Latin/Cyrillic/unbroken labels and default/16/48px side padding. Divider-only and actions-only cases were checked separately. On the original CSS, divider-only reproduces clientWidth=272/scrollWidth=304; long-actions-only reproduces the first action at x=-339.53px. Both are resolved in the working copy.
- Additional 64 layout cases cover narrow desktop containers, 479/480px boundary, xs–xl buttons, public height/font/padding/gap overrides, CSS zoom 200%/400%, and native/div long-body Tab/Shift+Tab traversal with visible focus and scrolling to every action. RTL order and loading button.css after dialog.css also passed. CSS zoom is reflow evidence, not physical browser-toolbar zoom acceptance.
- Real unchanged Selecta ConfirmDialog/Button wrappers from 8662ce5 passed six light/dark scenarios at 320/375/1280px with synthetic long labels, using a temporary copy and the working CSS. Initial focus, Tab order/trapping, cancel/confirm events and return focus passed. Inspected narrow-light and wide-dark screenshots. The first fixture attempt used a doubled Vite base URL; corrected only the temporary HTML before successful acceptance. The initial permission review could not complete due to a usage limit; after the user's continuation, the retry succeeded.
- Evidence: /private/tmp/hvab-1-evidence/matrix.json, extra.json and selecta-\*.png; temporary verification scripts /private/tmp/hvab-1-check.mjs and /private/tmp/hvab-1-extra.mjs. No verification infrastructure was added to the repository or consumer checkout.
- Style lint, full format:check, demo:check, docs:check and diff whitespace checks passed. npm start serves the updated catalogue with HTTP 200 at /demo/dialog.html. Unlike the previously checked remote main, this current checkout has no format:check warning.
- Limits: Safari/Firefox and physical browser zoom/AT were not exercised. Issue #1 remains open; PR #16 and the other pending accessibility issues are unchanged. Implementation is uncommitted on the existing develop branch with unrelated local edits preserved. Next: review the local change and complete cross-engine/physical zoom acceptance before final issue closure.

## Issue #1 commit and PR — 2026-10-18

Plan: commit only the five implementation/documentation/demo files and this issue's progress record; prepare the PR from current main in an isolated checkout. Preserve unrelated working changes and keep #1 open pending Safari/Firefox and browser zoom 200–400% acceptance. Done means the commit is published, the PR is attached to this chat and the remaining acceptance is explicit without automatic issue-closing keywords.

- Publication preparation: local implementation commit e1eecec contains only the five issue files and the issue-specific progress section. The isolated PR branch starts at main d0fb7ed; all five implementation files match the accepted version byte-for-byte. Style lint, demo/docs checks, changed-file formatting, whitespace checks and npm start HTTP serving pass on this base. Full formatting reports only the unchanged main file .project/WEB-PLATFORM-AGENT-GUIDANCE.md. Safari/Firefox and real browser zoom 200–400% remain pending; no automatic issue closure is configured.

## Issue #3 contrast decision exploration — 2026-10-18

Plan: inspect current E03 role assignments and the configured Gravity donor, independently recompute foreground/background pairs with alpha on light/dark surfaces, compare concrete correction options and recommend a scoped policy. Done means the owner can choose a foreground/surface matrix; no CSS implementation or tracker change is part of this step.

- Re-read live #3 and E03/R03. Current affected main files retain the audited color assignments. A transient Chrome 156 composition measured 126 pairs across light/dark page, float and modal backgrounds; all measured ancestors have opacity=1 and no background image. Reproduced the E03 ratios, including light field label 3.977, help 2.108, warning 2.943, dark help 2.465 and neutral toast 4.352. Existing passing page-surface error/default-label/dark-colored-toast pairs were also reproduced.
- Configured Gravity donor is clean at 7d187fd0a108edda969266f85ab33a54b13fb36e, version 8.0.0-beta.2. Current theme values live in styles/themes/default.generated.css, sourced from uikit-themer (the older AGENTS.local theme-directory pointers no longer match). Relevant semantic text/tint values match hvab. Gravity Toast content inherits primary text instead of hvab's explicit secondary; ControlLabel uses primary and OuterAdditionalContent notes inherit their color. Gravity Label already uses heavy text plus light tints, matching hvab. Gravity Text exposes complementary and heavy variants absent from hvab's current subset. Gravity's dark base background is rgb(34,29,34), whereas hvab uses black, so donor ratios cannot be carried over without recomposition.
- Important rejected shortcut: existing heavy roles alone do not solve the light cases. Positive-heavy is 4.232 on white, warning-heavy 4.469; info-heavy is 5.020 on white but only 4.304 on its tinted label surface. Do not round 4.469 into a passing threshold.
- Recommendation for owner choice: field labels/help use existing complementary; toast messages use primary. Preserve colored info/positive/warning functional text through three documented local contrast roles sourced from Gravity palette values, leaving existing global secondary/hint and semantic roles unchanged. Apply those new roles to affected field-warning, label themes and text modifiers. Candidate light values: blue-800 rgb(44,90,138), green-800 rgb(42,108,76), orange-800 rgb(145,74,17). Candidate dark values: blue-750 rgb(134,193,247), green-700 rgb(130,200,185), existing warning-heavy rgb(255,197,108). These are proposed local semantic assignments, not existing donor semantic roles or approved implementation.
- Alternative: use primary text for the affected colored statuses, retaining their status words and tinted backgrounds; no new palette roles, but less text-color differentiation. Both proposals pass all 44 selected light/dark page/float pairs displayed in the comparison; the colored candidate minimum is 4.637. Additional dark-float failures in unchanged error/default-label pairs are outside the initial E03 page cases and are not claimed fixed; final implementation must specify supported backgrounds explicitly. Label value opacity remains outside the confirmed E03 scope.
- Evidence: /private/tmp/hvab-3-evidence/contrast.json and options.json. Interactive comparison: /Users/hob/.codex/visualizations/2026/10/18/01a14e49-61af-7311-bfb6-de191e520538/contrast-options.html; 16 control combinations at 320/736px render without horizontal overflow; inspected the wide preview. Source-backed consumer inspection confirms Selecta uses the real Field wrapper and currently imports neither Label nor Toast; no consumer runtime acceptance of proposed colors is claimed.
- No component/token/demo changes, commits or tracker edits. Next: owner selects the role policy; implementation and full regression of supported surfaces/public overrides follow separately.

## Issue #3 implementation — 2026-10-18

### Plan and definition of done

1. Implement the approved colored-text proposal: three light/dark contrast roles from the recorded Gravity palette values; complementary field labels/help, contrast warning/status text and primary toast messages. Preserve every existing color token, especially secondary/hint, plus all public component overrides.
2. Document the local semantic delta, exact default background contract and unchanged out-of-scope cases. Add a catalogue example through block README generation.
3. Recompute actual rendered foreground/background contrast in both schemes on page/float/modal surfaces; verify original passing E03 pairs, unchanged roles, public overrides and the real Selecta Field wrapper. Complete required style/format/docs/catalogue checks and record evidence and limits.

Done means the selected functional pairs meet 4.5:1 without rounding, existing E03 passes are preserved, and the implementation is reviewable in the current checkout. No commit, PR, release or issue closure is part of this request.

### State

- Added the three approved contrast roles in both schemes and applied them to field warning, label info/success/warning and text info/positive/warning. Field labels/help now use complementary; toast messages use primary. Every pre-existing color-token declaration is byte-for-byte unchanged, including secondary/hint, ordinary status and heavy roles. Public component overrides remain intact.
- Documented Gravity palette provenance, the local semantic delta, page/float/modal surface support, custom-theme migration and unchanged error/danger/normal-label/muted-value limits. Added floating-surface Field and Label catalogue examples through their READMEs and regenerated the demos.
- Chrome 156: measured 126 rendered pairs across both schemes and three surfaces. All 84 changed functional pairs meet 4.5:1 without rounding; the minimum is 4.636954:1 for the dark success label over float. All 49 previously passing pairs in the baseline matrix remain passing. Inspected light/dark component screenshots.
- Verified 36 public-component and new-semantic-role override assertions. The unchanged Selecta Field wrapper passed eight scenarios across light/dark, default/illustrative custom themes and 375/1280px viewports, including label focus, native input editing, v-model updates and description associations. Its measured label/message minimum was 6.579866:1. The consumer checkout was not modified.
- Style lint, full format:check, demo:check, docs:check and diff whitespace checks passed. The running npm start catalogue returns HTTP 200 for /demo/field.html and /demo/label.html at localhost:8147. Evidence: /private/tmp/hvab-3-implementation/contrast.json, consumer.json and component/consumer screenshots; temporary browser scripts /private/tmp/hvab-3-implementation.mjs and /private/tmp/hvab-3-consumer.mjs. No verification infrastructure was added to the repository.
- Limits: browser acceptance used Chrome, not Safari/Firefox. The contrast guarantee applies only to the documented default foreground/background pairs; unchanged error/danger/normal-label and muted label values are outside its expanded surface scope. Changes remain uncommitted on develop, unrelated edits are preserved and #3 remains open. Next: review the implementation before a separate commit/PR step.

## Issue #3 commit and PR — 2026-10-18

Plan: commit only the approved contrast implementation, documentation, generated examples and issue-specific progress record. Prepare a branch from current main in an isolated checkout, preserving already merged fixes and unrelated primary-checkout edits. Verify the resulting patch, required project checks and catalogue serving, publish and attach the PR. Keep #3 open pending Safari acceptance and provide a concrete light/dark checklist. Done means the scoped commit is published in a reviewable PR; no merge or issue closure is authorized.

- Publication preparation: primary commit 0c62e5f contains only the 12 contrast/code/documentation/demo files and issue-specific progress. Main-based implementation commit e6b45a7 preserves all previously merged audit fixes. Recomputed 126 pairs on this branch: all 84 changed pairs pass, minimum 4.636954:1, all 49 baseline passes retained. Style lint, demo/docs checks, changed-file formatting and diff whitespace checks pass. npm start serves all four catalogue pages at localhost:8148, matching source apart from the expected server reload script. Full format:check reports only the unchanged main file .project/WEB-PLATFORM-AGENT-GUIDANCE.md, absent from primary develop. Safari/Firefox remain NOT RUN; #3 stays open pending acceptance.

## Issue #4 table-state decision exploration — 2026-10-18

Plan: inspect live #4 and current main, reproduce zebra/selected/hover precedence with an actual pointer in both schemes, compare the configured Gravity donor and show concrete policy options. Done means the owner has a source-backed recommendation and interactive comparison; no component implementation, commit or tracker mutation is part of this request.

- Confirmed #4 OPEN and current main c83cdfa; table CSS/README match the primary checkout. Chrome 156 reproduces the cascade defect in both schemes: even selected rows use zebra, odd selected rows switch to ordinary hover. Reordering changes the selected appearance. The default zebra and ordinary hover values happen to be identical (light black 5%, dark white 10%), so fixing role precedence alone does not add a visible hover contrast on even unselected rows.
- Configured Gravity donor remains clean at 7d187fd0 (8.0.0-beta.2). The matching Table lives under src/components/legacy/Table. Table.scss uses simple-hover-solid under @media (hover: hover); withTableSelection.scss explicitly uses base-selection-hover for interactive selected rows. No striped/zebra implementation was found in that Table. Table.tsx excludes disabled rows from interactive behavior and styles retain opacity 0.3. The donor's selected/hover colors are yellow: rgb(255 190 92 / 0.3 / 0.5) in light and 0.2 / 0.3 in dark; hvab selection is intentionally neutral. Source inspection, not donor runtime acceptance; online retrieval of the pinned source was unavailable.
- Recommendation: selected > unselected hover > zebra > base; retain existing selected color on hover. Reduce zebra selector specificity locally with :where and exclude selected rows from ordinary hover; preserve public-background override precedence and disabled opacity. No palette or new token is needed. Alternative: a dedicated selected-hover role, as Gravity uses; verbatim donor colors introduce yellow selection, while a neutral adaptation requires a separately justified local role/value decision. Merely moving the current rules is insufficient because specificity differs.
- A transient source copy with the recommended selector changes was exercised with actual pointer movement and settled transitions: 48 scenario records cover both schemes, striped/unstriped, selected/unselected, hover and reorder. Selected rows retain their role across parity/hover/reorder, disabled opacity stays 0.3. Evidence: /private/tmp/hvab-4-evidence/states.json and screenshots. No repository CSS changes were made; full public-override and consumer acceptance belong to implementation. No Table usage was found in Selecta src/ui/components searches.
- Interactive comparison shows current behavior, retained selection and Gravity selection/hover colors on hvab surfaces: /Users/hob/.codex/visualizations/2026/10/18/01a14e49-61af-7311-bfb6-de191e520538/table-selection.html. Twenty-four theme/variant/hover combinations at 320/736px fit without horizontal overflow; inspected the preview and verified reorder. This illustrates the donor roles, not the complete Gravity component. No commit, issue change or PR action. Next: owner chooses the selected-hover policy before implementation.

## Issue #4 implementation — 2026-10-19

Plan: implement the approved priority selected > unselected hover > zebra > base with a local selector change, preserving all colors and public overrides. Document the policy and provide a generated combined-state example. Verify actual pointer states after transitions, both schemes, striped/unstriped rows, parity/reorder, disabled opacity and inherited/row-level public overrides. Complete the required style/format/docs/demo checks and catalogue serving. Done means the scoped change is reviewable in the current checkout; no commit, branch switch, PR or issue closure is requested.

- Implemented two selector changes: zebra uses :where for the descendant/parity portion, and ordinary hover excludes aria-selected=true without increasing specificity. Selected background therefore wins over zebra and remains unchanged on hover. Token values and all color declarations are unchanged.
- Documented state priority, identical default zebra/hover colors, independent disabled opacity and public overrides. Expanded the combined-state README example to include selected odd/even and unselected interactive odd/even rows; regenerated demo/table.html through demo:build.
- Chrome 156 acceptance passed 224 settled-pointer/reorder scenarios (3,136 computed background/opacity assertions): both schemes, striped/unstriped, selected/unselected/noninteractive rows, disabled combinations, and public overrides on an ancestor, the table and individual rows. Distinct custom selected/hover/zebra colors confirm which role wins; the final public row-background and opacity overrides retain precedence. Row-level roles override inherited values. Inspected default light/dark screenshots.
- Evidence: /private/tmp/hvab-4-implementation/states.json and light/dark default/custom-role screenshots; transient script /private/tmp/hvab-4-acceptance.mjs. No verification infrastructure or consumer changes were added. Safari/Firefox were not exercised in this step.
- Style lint, full format:check, demo:check, docs:check and diff whitespace checks passed. The existing npm start server serves the updated catalogue with HTTP 200 at http://localhost:8147/demo/table.html. No token diff; unrelated edits preserved. Changes are uncommitted on develop, #4 remains open. Next: review the catalogue and prepare a commit/PR when requested.

## Issue #4 commit and PR — 2026-10-19

Plan: record the owner's Safari acceptance, commit only the approved table change, README, generated demo and issue-specific progress. Prepare a PR from current main in the existing isolated checkout after verifying its clean tracked state; preserve primary develop and unrelated edits. Verify exact patch content and required project checks, publish and attach the PR. No merge or issue closure is authorized by this step.

- Owner reports «сафари проверил - все ок». Record this as owner Safari acceptance; version and specific zoom/settings were not supplied, and Firefox is not represented as verified.

- Publication preparation: primary commit bdd8f44 contains only table CSS, README, generated demo and issue-specific progress. The main-based PR copies those accepted files byte-for-byte; CSS entrypoint and all color/foundation token files also match the verified checkout. Style lint, demo/docs checks, changed-file formatting and diff whitespace checks pass; the catalogue serves the updated example at localhost:8148. Full format:check reports only the unchanged main file .project/WEB-PLATFORM-AGENT-GUIDANCE.md. Owner Safari acceptance is recorded above; Firefox remains NOT RUN.
