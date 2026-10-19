# Current work

Updated 2026-10-19.

## State

- The original audit and agreed post-audit fixes are complete. Both findings from the combined changelog/API/package review were corrected in a6c9ddd. See [history/AUDIT-2026-10.md](history/AUDIT-2026-10.md) for completion evidence and recovery of the original reports.
- Version 0.4.0 is released: tag v0.4.0 at 9813f7f, GitHub Release published and Pages deployed. The accepted demo and previous accumulated fixes are included; Unreleased is empty.
- The core has no outstanding implementation gate from this audit. Optional ideas belong in [IDEAS.md](IDEAS.md); consumer adoption/compatibility work belongs in the consumer repository.
- Local component acceptance is bounded by the recorded environments. Historical missing-device coverage is not a new blanket manual gate for every change.

## Documentation cleanup — 2026-10-19

Owner-approved scope: remove superseded audit work files and refresh current documentation. No source CSS, public API, package version, commit, push or release changes requested.

Plan and definition of done:

1. Remove the four obsolete audit prompts/reports, consolidate completed journals into one historical summary and keep the pre-cleanup Git revision/path recovery commands.
2. Keep only actual deferred work in IDEAS. Refresh README/USAGE/release documentation, stale SPEC paths/pilot planning and the already-completed acceptance status in browser-check documentation. Retain useful regression assets and archive research notes.
3. Check remaining links and stale audit references; run required style/format/docs/demo/package checks and catalogue serving. Record results and remaining optional cleanup ideas.

Completed:

- Removed four superseded files from audit/. Replaced the long historical journal with one completion record and verified that its Git recovery commands resolve all original receipts at a6c9ddd. Moved optional Modern Web Guidance research into history byte-for-byte.
- Replaced the 568-line active journal and completed-work backlog with this current state and a short deferred-ideas list. The historical summary retains issue/PR mapping, owner acceptance boundaries, post-audit commits, package/API review outcomes and verification limits.
- Updated README browser/release scope and main-based maintainer links, reusable vendoring metadata, release checks/cadence and SPEC paths/completed-pilot wording. Removed the obsolete initial-repository release recipe and the already-completed #2/#7 manual hold in browser-check documentation.

Verification before the subsequent reference-wording cleanup: lint:styles, full format:check, docs:check, demo:check, pack:check and git diff --check passed. All 47 Markdown files passed a relative-file-link check (73 links); stale audit paths remained only in deliberate Git recovery commands. The archive contained 81 files with 61 local documentation links. npm start served /demo/, /demo/toast.html and /README.md with HTTP 200 at localhost:8156. No new browser/device acceptance was claimed for documentation-only edits.

## External reference wording — 2026-10-19

The owner clarified the development model: external UI libraries are references for examples; implementation is written for this project's contract. Preserve the owner's staged cleanup, including removal of THIRD_PARTY_NOTICES.md. Remove remaining mandatory-donor/porting language and stale notice links; keep the project's LICENSE, values, public API and release version unchanged.

Plan and definition of done:

1. Align SPEC, agent guidance, token explanations and current/history notes with reference-based development rather than mandatory copying or mechanical renaming.
2. Remove stale notice references from vendoring/release documentation, the package manifest and package/Pages checks. Preserve consumer vendoring instructions, which describe copying hvab-blocks itself.
3. Verify remaining references and documentation links, unchanged CSS declarations and the owner's staged diff. Run required style/format/docs/demo/package checks, inspect an isolated Pages build and serve the catalogue. No staging, commit, push or release requested.

Completed: SPEC and agent/local guidance now describe independently implementing the project contract while using external libraries as examples. Removed mechanical porting rules, mandatory external palette/role naming and matching language in token docs, comments, deferred ideas and history. Actual token values and contrast expectations are unchanged. Consumer vendoring still describes copying this project's source; its own LICENSE remains intact. Aligned the package file list and package/Pages checks with the owner's notice deletion and removed stale links from documentation/changelog.

Verification: all 41 canonical CSS files have identical parsed rules/declarations to the staged versions; only color-token comments changed. The owner's complete staged patch is byte-identical to the pre-edit snapshot. The manifest only drops the retired file from its files list; version 0.3.0, exports and dependencies are unchanged. lint:styles, full format:check, docs:check, demo:check, pack:check and git diff --check pass. All 46 Markdown files have valid relative file links (66 links); the package contains 80 files and 55 local documentation links. An isolated Pages build includes the project's LICENSE, current docs/catalogue and all 40 CSS imports without the retired file. npm start serves /demo/ and /demo/toast.html with HTTP 200 at localhost:8157. No new browser/device acceptance is claimed. Changes remain outside the index; no commit, push or release.

## Demo catalogue review and polish — 2026-10-19

The owner requested reviewing all demo pages/documentation/examples and modest interface cleanup, including persistent light/dark selection across page navigation. Scope the changes to the catalogue shell/generator and confirmed example-presentation issues; preserve core block behavior, public API, version and release state. No commit, push or release requested.

Plan and definition of done:

1. Inspect all 32 block pages and index in light/dark at desktop and narrow widths. Check document/example coverage, resource/runtime errors, navigation, code readability and horizontal overflow; retain screenshots/measurements outside the repository.
2. Fix theme persistence before paint with validated stored values and graceful storage failure. Make only evidence-based shell/layout/documentation-rendering improvements using minimal maintained code; keep generated pages synchronized.
3. Repeat the full-page pass, verify actual theme toggle/navigation/reload and keyboard interaction, inspect visual output and run required style/format/docs/demo/package checks plus an isolated Pages build. Record fixes, limits and next step.

Completed:

- Theme selection now uses a small shared demo script, restores a validated light/dark value before styles load, and survives navigation/reload. Unavailable storage keeps the toggle usable. Stored values are restricted to light/dark and never interpolated as HTML; Markdown remains trusted repository-authored build input. The pressed state exposes the active dark theme.
- Replaced the example-only README extraction with development-time Markdown rendering. All block prose, states/token tables, ordinary code snippets and limits now appear alongside the same 160 live examples. Added the foundation token guide, working cross-page anchors and expandable, escaped HTML source. The browser and CSS package do not receive the Markdown renderer.
- Kept the theme control above the scrollable desktop navigation. Narrow screens use a compact native page selector; ordinary links remain available without JavaScript. Added a keyboard skip link and focusable local scroll areas; removed page-wide overflow from long tables, code and wide examples.
- Corrected two confirmed README example issues: vertical dividers now have an explicit horizontal layout and vertical ARIA orientation; a clickable card composes hb-link for readable theme-aware text. No core CSS, public API or runtime dependencies changed. Updated README, USAGE and Unreleased.

Verification:

- Chrome 156 on macOS: all 34 pages (index, tokens and 32 blocks), light/dark, 1280/375/320 px: 204 combinations. No runtime/resource errors or page-wide horizontal overflow, including with every HTML-source disclosure expanded. Exact live-source, documentation heading/table coverage and unique IDs match the READMEs. The mobile button page starts its content at y=161 instead of y=1152.
- Reviewed contact sheets of all 160 live previews in both themes and full viewport screenshots of representative documentation pages; inspected corrected card/divider examples separately. Screenshots and measurements are outside the repository in the task's demo-review visualization directory.
- Sixteen behavior assertions cover actual theme-button clicks, desktop link navigation, reload/pre-DOMContentLoaded restoration, invalid/blocked storage, keyboard skip link, native HTML-source disclosure, documentation anchors and no-JavaScript mobile links. The mobile selector's change/navigation handler was checked with a synthetic change event; the native OS popup could not be driven reliably through headless CDP and is not claimed as physical-device acceptance.
- All 1330 local HTML references/fragment targets resolve both in demo and in an isolated Pages build; the built site includes demo.js and the token guide. The npm archive remains 80 files with 55 local documentation links; marked is development-only. Version stays 0.3.0, exports and all core CSS remain unchanged.

Limits: this is catalogue presentation/behavior acceptance in Chrome, not new Safari/Firefox or assistive-technology acceptance and not application behavior for the static CSS examples.

## Demo follow-up — dialog, sheet and navigation

Owner feedback: standalone dialog surfaces stretch beyond their inner dialog; sheet examples lack clear content layout/bottom spacing; navigation hover is imperceptible and block ordering should be shared semantic groups with alphabetical entries. Continue the uncommitted catalogue work without changing core CSS, version or release state.

Plan and definition of done:

1. Reproduce dialog/panel width and sheet content geometry in both themes; distinguish component behavior from missing demo composition.
2. Correct the README example compositions, document consumer-owned inner layout and render the same alphabetically sorted semantic groups in sidebar, mobile selector and index. Add visible catalogue hover using existing system roles and library link/card primitives.
3. Verify dialog widths, sheet bottom spacing, links/hover/group coverage at desktop and narrow widths in both themes. Regenerate pages, pass required checks and record the acceptance limits. No commit, push or release requested.

Completed:

- Standalone dialog README samples now size each surface with fit-content and cap it to the preview/container width; 272px examples retain their smaller cap. The surface follows its 480/720/900px child instead of stretching to 1046px around a 480px dialog. Live modal composition and all core styles are unchanged.
- Sheet README samples explicitly model a bounded mobile viewport. The first sample explains the veil and static action menu, stacks 44px-high actions with grid spacing and leaves 12px inner bottom padding. Short samples also have explicit content padding; the existing long-content/scroll composition retains its action/scroll reserve. Documentation makes the consumer-owned inner-layout boundary explicit.
- Defined seven shared catalogue groups: Foundation, Typography, Forms, Content, Feedback, Navigation and Overlays. Each page occurs once and entries sort alphabetically; the sidebar, index and mobile optgroups consume the same data. Group validation leaves canonical CSS import order untouched.
- Sidebar links use the existing hb-link primitive plus a visible system-role hover background. Index cards use the existing data-clickable card hover/focus treatment. The shell continues to compose hb-button, hb-select, hb-link, hb-card and hb-text with catalogue-specific layout. Updated the demo description and Unreleased.

Verification: Chrome 156, both themes, 1600/1280/760/375/320px: 152 focused geometry/grouping/pointer-hover assertions passed, including matching panel/dialog widths, s/m/l sizing, a public 240px dialog override, sheet action order/44px height/12px bottom gap and identical alphabetical groups. Settled-paint desktop/mobile screenshots were inspected. The full 34-page, two-theme, three-width pass still has no overflow/resource/runtime errors and preserves all 160 README examples. Theme/navigation/keyboard/source checks still pass. All 1330 local references resolve in the catalogue and isolated Pages output.

lint:styles, separate demo CSS lint, full format:check, docs:check, demo:check, pack:check and git diff --check pass. The package remains version 0.3.0 with 80 files/55 local documentation links; all core CSS is unchanged. npm start continues serving the catalogue on localhost:8159. Browser acceptance remains Chrome-only; no new device or consumer certification is claimed.

## Sidebar group heading hierarchy

Owner-approved scope: preserve heading size, use weight 600, 24px before each group and 8px after each heading, with slightly muted text in both themes.

Plan and definition of done: update only the shared sidebar heading presentation using the public text override and existing spacing/color roles; verify computed styles and visual output in light/dark, then run required style/format checks and confirm catalogue serving. Keep the current uncommitted work and release state.

Completed: sidebar group headings use the public hb-text weight override (600), gap-6 before (24px), gap-2 after (8px), and complementary text color. The existing caption size is preserved. Removed the unsupported hb-text_color_complementary modifier from the generated shell and applied the supported public color override to headings and the lead text where that modifier was intended. Regenerated all pages.

Verification: Chrome 156 computed styles and screenshots confirm all seven headings in both light/dark: weight 600, unchanged caption size, measured 24px between groups and 8px from heading to list, black/white at 70% opacity for the complementary role. The catalogue still serves on localhost:8159. lint:styles, separate demo CSS lint, full format:check, demo:check and git diff --check pass. No core CSS, version, commit or release changes.

## Batch release preparation — 2026-10-19

The owner accepted the demo and authorized committing all demo changes, then releasing the accumulated batch. Follow RELEASE.md on main. The batch adds three public toast controls, so the next version is 0.4.0 under the documented 0.x version policy. npm registry publication remains a separate action.

Plan and definition of done:

1. Verify the complete reviewed demo diff, fresh origin/main and existing tags/releases; pass the required release checks and commit the catalogue changes without changing the version.
2. Compare the public API with v0.3.0, move Unreleased into a dated 0.4.0 entry, document compatibility and commit release preparation. Run npm version minor from a clean tree to create the version commit and matching v0.4.0 tag.
3. Push main and the matching tag, create a GitHub Release from the version changelog, and verify remote tag/commit/release metadata. Check the independent Pages deployment and hosted catalogue. Record evidence and leave the repository clean.

Release preflight passed: lint:styles, demo CSS lint, full format:check, docs:check, demo:check, pack:check and whitespace checks. Origin/main is seven reviewed commits behind local main with no remote-only commits; the latest release/tag is v0.3.0. Public-surface comparison with v0.3.0 retains all 238 hb-\* class names, all 41 attribute/state selector forms and every previous public token; only the three documented toast tokens are added. Exports and runtime dependencies are unchanged. The package contains 80 files and 55 local documentation links; all 1330 local HTML references resolve in the catalogue and isolated Pages build.

Completed:

- Accepted demo changes committed as 25f7428; release notes as 7107579. npm version minor created Release 0.4.0 at 9813f7f664a476eee1d58e2554c8c567beafa118 and annotated tag v0.4.0, updating both manifest/lock versions to 0.4.0 from a clean main.
- Repeated the required release checks at 0.4.0: docs:check, demo:check, lint:styles, full format:check, pack:check and whitespace checks pass. The verified archive has 80 files and 55 local documentation links. The isolated Pages build retains all 1330 local HTML references.
- Atomically pushed main and v0.4.0. Remote main and the peeled tag match 9813f7f. Published [GitHub Release v0.4.0](https://github.com/hvab/hvab-blocks/releases/tag/v0.4.0) on 2026-10-19 with the exact changelog entry; draft/prerelease are both false. npm registry publication was not part of this release.
- Independent [Pages deployment 39264572812](https://github.com/hvab/hvab-blocks/actions/runs/39264572812) succeeded for the release commit. Verified 82 public files byte-for-byte against the release sources: all 34 HTML pages, shared demo script/style, CSS sources, project license and distributed top-level documentation at https://hvab.github.io/hvab-blocks/.

## Next step

The release is complete. Future accepted changes accumulate under Unreleased until another batch release is explicitly requested. No audit implementation or consumer-integration gate is open in this repository.
