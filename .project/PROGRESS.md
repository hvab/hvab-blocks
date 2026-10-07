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
