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
- Full format:check retains only the two baseline audit prompt warnings; those unrelated source files are unchanged. This gate remains FAIL, not a claimed PASS.
- NOT RUN: VoiceOver/NVDA speech, Safari/Firefox, physical touch, real consumer wheel/touch/scroll-lock restoration. No consumer policy was introduced or tested; those issue acceptance checks remain follow-up validation.
- Shared-file note: only this branch appends this completed track to PROGRESS; parallel tracks may conflict in that file. No CHANGELOG changes or foreign reports/WIP are included.
- Next step: publish the isolated commit and draft PR; review unavailable platform/consumer acceptance before merging.
