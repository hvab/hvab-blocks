# V04 — composition documentation local commit (2026-10-19)

The owner requested a local commit and the next-step recommendation. Commit the nine reviewed README/catalogue/Unreleased/backlog/progress files for the completed composition examples. Canonical CSS and the prior browser acceptance are unchanged. Keep the branch, version and remote state unchanged; no release. The agreed post-audit implementation scope is complete. Optional variants, the label gap token and new blocks remain deferred; the next useful preparation is one review of the accumulated Unreleased batch before a separately authorized release.

Pre-commit verification: lint:styles, full format:check, docs:check, demo:check and git diff --check pass. npm start serves the catalogue and all three updated pages with HTTP 200 at localhost:8152. No CSS, package manifest or lockfile changes are included.

# V04 — narrow-screen composition documentation (2026-10-19)

The owner approved completing the next V04 step with documentation and catalogue examples for popover/tooltip and sheet. Scope: demonstrate available width/height, long-content scrolling and intentional text/action wrapping through consumer composition. Keep canonical CSS, public API, version and release state unchanged; no commit or push requested.

Plan and definition of done:

1. Add README examples using existing public tokens and local composition styles: bounded scrollable popover, brief width-bounded tooltip and sheet with wrapping text/actions. Distinguish static catalogue bounds from real positioning and keep large/interactive tooltip content in a popover.
2. Regenerate the three catalogue pages and record the addition in Unreleased. Check both schemes, narrow/short layouts, inherited/inline public overrides, complete text and final-action reachability. Do not add permanent test infrastructure.
3. Run required style/format/docs/demo gates, serve the catalogue and record results and limits. Update the remaining V04 scope; keep optional full-width/corner variants deferred until a real need.

Implementation and verification:

- Added scoped README recipes and generated catalogue examples for popover, tooltip and sheet. Popover uses existing public minimum/maximum width controls plus a local block-size limit and scrollable named region; only its plain-text filename wraps. Tooltip remains brief/noninteractive, fits the placed width and explains why larger content needs another surface. Sheet uses its existing scroll container with local plain-text/action wrapping, automatic multiline button height and an inherited 44px button height for touch targets.
- Parent Chrome diagnostics passed 1350 assertions across 90 cases: both schemes, viewport widths 280/320/375/568/1280px, including 320px-high layouts, plus inline/inherited public overrides. Confirmed actual public width/padding/block-size/button-height values, no horizontal overflow, full filename visibility and complete final-action reachability. Keyboard Tab and Space and pointer clicks reach/activate the final buttons; default focus outlines fit inside their scrollports.
- Verification caught the final sheet button's focus outline touching the clip edge after Tab under a short host/public geometry override. Added local scroll-padding-block alongside action padding in the example; the corrected case passes. Canonical sheet/button CSS is unchanged. Visually inspected all three examples in light and dark schemes.
- Generated examples also fit their actual catalogue previews over HTTP in both schemes. lint:styles, full format:check, docs:check, demo:check and git diff --check pass. npm start serves /demo/, /demo/popover.html, /demo/tooltip.html and /demo/sheet.html with HTTP 200. Evidence, screenshots and the temporary diagnostic script are outside the repository at /Users/hob/.codex/visualizations/2026/10/18/01a14e49-61af-7311-bfb6-de191e520538/v04/composition/.
- Limits are explicit: preview coordinates/percentage bounds demonstrate a positioned container, not live collision handling. A real positioning integration must use the space remaining at the actual placement and update it as conditions change. Arbitrary tables/code, oversized custom focus/padding geometry, live overlay dismissal/focus behavior and physical mobile keyboard/safe areas remain composition-specific; no screen-reader, Safari/Firefox or physical-device acceptance is claimed here.

Result: the agreed V04 floating-panel/sheet documentation scope is complete and recorded in Unreleased. Optional full-width/corner variants remain deferred until a real screen needs them; device-specific limitations are documented rather than presented as a new mandatory gate. Canonical CSS, public API, dependencies and version remain unchanged. No commit, push or release. Next small step is a local documentation commit when requested; accumulate the changes for the later batch release.

# V04 — toaster width and scope documentation commit (2026-10-19)

The owner requested committing the completed changes and a recommendation for the next step. Commit the accepted toaster width fix, its README/catalogue/Unreleased entry and the previously approved V06 core-scope documentation together. Keep the branch and version unchanged; no push or release. The preceding independent browser acceptance remains applicable because source CSS has not changed since verification. Remaining useful V04 work is documented narrow-screen composition for popover/tooltip and sheet; optional full-width/corner variants remain deferred until a real screen needs them.

Pre-commit verification: lint:styles, full format:check, docs:check, demo:check and git diff --check pass. Catalogue serving and independent browser verification are recorded below. This local commit contains all eight reviewed working-tree files, with the completed V06 scope decision included; remote publication stays deferred.

# V04 — toaster width implementation (2026-10-19)

The owner approved the next scoped step: fit the toaster region inside narrow screens while preserving its preferred desktop width and public width/inset controls. Continue Sol6.1 implementation with parent review/acceptance. No commit/push/release, consumer integration or other V04 changes requested. Preserve the pre-existing uncommitted V06 scope-documentation changes.

Plan and definition of done:

1. Delegate minimal toaster-width CSS and relevant README/example/Unreleased documentation to Sol6.1. No new public API unless required; keep existing toast height, wrapping, dismissal and focus behavior.
2. Parent checks both schemes, narrow/wide viewports and live resizing; default 320px at viewport 320px with 12px insets must become 296px at x=12px. Public smaller/wider preferred widths must work within the available space, including inline/ancestor insets and zero values.
3. Check long-content scrolling/close/focus regressions and ordinary wide geometry, plus required style/format/docs/demo gates and catalogue serving. Record limits and leave work uncommitted for the later batch release.

Implementation and parent acceptance:

- Sol 6.1 subagent toaster_width implemented the scoped CSS, README/example, generated toast catalogue and Unreleased entry. The parent independently reviewed and verified the result. The region now uses both inline insets, automatic width, the existing public width as its maximum and an automatic start margin. No new token, viewport-unit calculation or JavaScript was introduced.
- Default width is 296px with 12px gutters at a 320px viewport; ordinary wide rendering is byte-identical to baseline screenshots in both schemes. Smaller preferred widths remain exact when space permits; larger widths shrink to the available containing block. Inline and inherited overrides, percentage/calc widths, rem insets and unitless 0/0px work.
- Parent Chrome diagnostics passed 4812 assertions across 510 width cases in light/dark at 280–1280px widths, plus 34 scrollbar/containing-block/live-resize assertions. Long and unbroken messages wrap; scrolling reaches the final action, dismissal stays visible and works by pointer and keyboard. A forced 17px classic scrollbar at viewport 320px leaves a 303px layout viewport and a correctly fitted 279px region. A transformed 280px containing block fits a 256px region between its 12px insets.
- Visually inspected both narrow-theme screenshots. The generated catalogue example also renders at 296px with 12px gutters in both schemes. lint:styles, format:check, docs:check, demo:check and git diff --check pass; npm start serves /demo/ and /demo/toast.html with HTTP 200.
- Evidence and temporary verification scripts are outside the repository at /Users/hob/.codex/visualizations/2026/10/18/01a14e49-61af-7311-bfb6-de191e520538/v04/toaster-width/. Baseline source was extracted from HEAD ad1e6f0 without switching branches. Verification is local Chrome evidence; other browsers, actual browser zoom and physical mobile behavior were not checked in this step.

Result: toaster width fitting is implemented and independently accepted locally. Public --hb-toaster-width now means preferred maximum width; pathological insets/padding still require composition validation. Other V04 areas remain unchanged: separate full-width/corner variants and floating-panel/sheet composition recipes are deferred. No commit, push, version bump or release. Preserve prior V06 documentation edits; next small step is the scoped local commit when requested, with publication kept for the later batch release.

# V06 — consumer handoff closed in core (2026-10-19)

The owner confirmed the Selecta handoff is complete and owns all future adoption/integration/compatibility work in the consumer repository/chat. Core changes here accumulate for the next batch release; the consumer adopts that release separately. Closing V06 here records the work boundary, not a claim that unreleased changes already passed consumer acceptance.

Plan and definition of done:

1. Remove V06 consumer integration from the core backlog and check whether a matching open core issue exists.
2. Make AGENTS/SPEC explicit that the Selecta pilot is historical context; ongoing consumer integration is outside core scope unless requested here.
3. Preserve historical evidence and current CSS/release state. Record any additional handoff information the owner needs; no unsolicited messages to the consumer chat and no commit/push/release.

Result: V06 is closed in the core backlog. AGENTS and SPEC now explicitly keep consumer adoption/integration/compatibility in the consumer repository/chat; the original pilot evidence remains historical. GitHub currently has no open issues in hvab/hvab-blocks, so there is no separate remote V06 issue to close. No additional consumer handoff is needed now: the next batch of core changes is recorded in CHANGELOG Unreleased, and the owner will adopt the eventual release separately. No consumer files/chat were accessed or messaged. CSS, package version, branch and remote state are unchanged; these scope-documentation edits remain uncommitted. Verification: lint:styles, format:check, docs:check and git diff --check pass; npm start serves /demo/ with HTTP 200. Next core work remains the deferred toaster-width/layout recipe scope, not consumer integration.

# V04 — local commit and browser policy (2026-10-19)

The owner requested committing the completed work after the proposed modern-browser query. Apply defaults and fully supports css-has, verify its resolved targets, and commit the scoped V04 CSS/docs/examples and recorded browser/RTL decisions. No branch switch, push, version bump or release.

Current policy: Browserslist manages versions dynamically; the required :has feature filters unsupported targets. RTL remains outside scope. The dialog/toast implementation and independent acceptance are recorded below. Remaining V04 layout work stays deferred; accumulate this commit with V02/spin for a later batch release.

Verification before commit: lint:styles, format:check, docs:check, demo:check and git diff --check pass. Browserslist 4.29.3 resolved the actual config to 27 targets, excluding KaiOS, Opera Mini, UC and QQ. The recorded 4952 browser assertions remain applicable; source CSS has not changed since that acceptance.

# Browser support — defaults investigation (2026-10-19)

The owner wants modern browsers via Browserslist, without a manually maintained per-browser version matrix. Scope: inspect the existing defaults query and compare obvious prerequisites already used in the CSS; do not change browser configuration or implement compatibility work in this step. Done when the actual query meaning, resolved sample and any material mismatch are explained.

- .browserslistrc currently contains defaults. Official Browserslist documentation expands it to `> 0.5%, last 2 versions, Firefox ESR, not dead` (union of the positive queries, then excluding dead browsers). It is a moving data-driven target, not only the latest two versions of Chrome/Firefox/Safari.
- An isolated npm exec outside the repository, using Browserslist 4.29.3 and its current bundled database, resolves defaults to modern mainstream desktop/mobile versions plus Chrome 109, QQ 14.9, UC 15.5, KaiOS 2.5/3.0–3.1 and Opera Mini all. This snapshot is evidence of query semantics, not a permanent pinned support list. No project dependencies/lockfiles were changed.
- The database query defaults and not supports css-has returns QQ 14.9, UC 15.5, KaiOS 2.5/3.0–3.1 and Opera Mini all. Current radio/radio-group and toast already use :has; Can I Use confirms these browsers do not support it or dynamic viewport units. Literal defaults therefore exceeds the current native-CSS feature baseline. This is not a new regression from choosing a policy; it exposes the broad meaning of the existing query.
- Proposed minimal refinement for the owner's modern-browser intent: defaults and fully supports css-has. It keeps Browserslist-managed version selection and removes those known incompatible entries. This is a feature-based target filter, not proof of every CSS feature or physical-device acceptance. The current config remains defaults; no filter/legacy-support rewrite is applied without a follow-up choice.
- Sources: https://github.com/browserslist/browserslist#queries and https://caniuse.com/css-has (also viewport-unit-variants). Browser policy no longer requires a separate manual minimum-version exercise. Remaining V04 layout work and accumulated unreleased fixes stay as recorded below; no commit/version/release.

# V05 — RTL scope decision (2026-10-19)

The owner explicitly confirmed that RTL is not needed. Record this decision in the backlog and keep CSS unchanged; done when V05 is no longer an open implementation/acceptance task.

Decision recorded: V05 is closed as no action for current consumers; supported scope is LTR. Revisit RTL only for a new real consumer requirement. No RTL CSS or verification work is planned. Existing V04 fixes remain uncommitted and accumulated for a later batch release. Next small step remains the requested local commit when authorized, then the remaining V04 scope.

# V04 — dialog/toast implementation (2026-10-19)

Owner-approved scope: fix unbroken dialog titles and toast title/message wrapping, and bound a single long toast while keeping dismissal visible and reachable. Preserve other V04 limitations and accumulate changes for a later batch release. The owner requested implementation by a Sol 6.1 subagent and independent acceptance by the parent coordinator. No commit/push/version bump/release requested.

Plan and definition of done:

1. Delegate scoped CSS, relevant README/examples and Unreleased notes to Sol 6.1. Preserve prior investigation changes and unrelated source/comments.
2. Parent reviews diff, layout/scroll policy and public token precedence. Keep the close control reachable at every scroll position; do not silently truncate text or transfer queue/positioning behavior into CSS.
3. Parent independently checks both schemes, native/div dialog, long text, short/long toast, pointer/keyboard dismissal, scrolling to final actions and inherited/inline public overrides. Verify required style/format/docs/demo gates and catalogue serving.
4. Record results and limits. Leave toaster width/mobile variant, sheet/popover/tooltip, label, versions, branches and remote state untouched.

## Implementation and parent acceptance

- Sol 6.1 subagent v04_implementation implemented the scoped CSS and documentation. Parent retained context, reviewed the diff and ran separate Chrome diagnostics against the real CSS, including baseline HEAD snapshots. No other V04 source areas were delegated or changed.
- Dialog title now shrinks in its flex header and wraps unbroken strings. Toast title/message wrap independently. Each card has a dynamic-viewport height default minus its toaster's effective block insets; border/padding stay inside the limit. Only content scrolls; the close slot stays outside the scrollport, with reserved end space and a higher paint layer.
- Three public/private roles support the new behavior: --hb-toast-max-height, --hb-toast-close-space and --hb-toast-content-gutter. Existing public roles remain read-only and retain their precedence. A direct close child reserves content end space, so some short text/actions may wrap earlier. Title end padding remains additional; enlarged/custom close geometry requires a coordinated reserve. The gutter compensates padding with negative margins, preserving the normal text position while allowing action focus rings to paint inside the scrollport.
- Parent review caught clipped focus outlines at the last action. Sol corrected it with the compensated gutter. A further parent case found that deriving gutter from a public unitless focus offset 0 made CSS math invalid; Sol simplified the default to inherited button/system focus width. Offset0 and 0px are equivalent again. Nonzero/custom element-local focus offsets use an explicit content-gutter, documented with the 4px width + 3px offset → 7px example. Final visual review also caught the scrollbar passing under close; Sol moved close-space to a simple end margin on the scrollport. Parent verified its right edge stays before close with both default and enlarged focus gutters. No global button/focus-token changes.
- Independent parent acceptance: Chrome 156.0.8078.36, light/dark, 320×568, 375×667, 568×320 and 1280×800; 4952 assertions passed. Native/div dialog titles and 48 dialog configurations were checked; 144 toast configurations cover short/long/unbroken/message-only/icon/no-close variants and default/ancestor/inline overrides. Checked public width/height cap, padding, border, radius, background/text typography, close offsets, no text/close intersection at start/middle/end of scroll, stable close geometry, scrollport/scrollbar separation from close, final-action hit targets, real pointer activation and Tab → Space dismissal with visible focus.
- Additional parent cases verify text-only named/tabbable content scrolls by PageDown; default 2px and custom 4px+ 3px focus outlines fit their gutters in both schemes; gutter overrides and block insets 0/24/40px work, including live viewport-height changes. Eight baseline failure controls confirm the original bugs. At 375×667 the long default card changes from height 760px/top -105px to height 643px/top 12px, with reachable close and full content. The representative short card stays 320×166px. Public overrides and queue/stack limits outside these coordinated cases remain consumer responsibilities.
- README and generated dialog/toast demos include clear long-content examples and keyboard/scroll/override responsibilities. Updated only Unreleased changelog; SPEC and global tokens did not need changes. Parent visually inspected generated examples and corrected long cards in both schemes. Required lint:styles, format:check, docs:check, demo:check and git diff --check pass; npm start served catalogue/dialog/toast pages with HTTP 200.
- Parent evidence is stored outside the repository in /Users/hob/.codex/visualizations/2026/10/18/01a14e49-61af-7311-bfb6-de191e520538/v04/accepted/ (JSON measurements, baseline and actual screenshots). Temporary scripts/profiles are outside the repository; no permanent tests or dependencies added.
- Limits and next step: this is bounded Chrome acceptance, not new physical iOS/Safari/Firefox/zoom certification. Height policy covers one card; combined stack/queue stays consumer-owned. Explicit oversized height/padding/inset overrides can defeat viewport fit; custom close/focus geometry needs matching reserve/gutter. Known 320px toaster width and all sheet/popover/tooltip/label work remain deferred. The approved scope is implemented and verified, left uncommitted on main over 7f66439. Accumulate it with V02/spin in Unreleased; no branch/version/remote/release changes. Next small step is a local commit if requested.

# V04 — narrow overlay geometry investigation (2026-10-19)

Owner-approved scope: investigate modal, sheet, toast and floating-panel geometry with long content on narrow screens; report reproducible problems and recommendations without implementation. Release cadence: accumulate changes in Unreleased and publish a batch later; no new version is planned now.

Plan and definition of done:

1. Use current CSS and documented anatomy, including actual native showModal() and fixed overlays rather than catalogue-only static positioning.
2. Inspect 320/375px widths plus wider controls and short-height cases in both color schemes. Measure surfaces/text/close/actions and maximum scroll reach; separate wrapping, size and positioning responsibilities.
3. Reproduce failures with positive/negative controls, preserve a runnable temporary fixture and screenshots, and record prioritized findings with source locations and proposed scope.
4. Keep production CSS, public docs/API, versions, Git and remote state unchanged. Desktop Chrome viewport checks do not constitute real browser zoom, physical iOS keyboard/safe-area or Safari/Firefox acceptance.

## Findings and recommendations

Baseline: main at 7f66439, package 0.3.0. Chrome 156.0.8078.36, real index.css, 25 scenarios × six viewports (320×568, 375×667, 768×800, 1280×800, 568×320, 320×320) × two schemes = 300 measured configurations. Both themes have identical initial/end geometry. Actual fixed div overlays and native showModal() were used, with scroll-to-end and text-glyph/close intersection measurements. Measurements are viewport geometry, not real zoom/touch acceptance. Cases and source locations below are current; the historical audit is unchanged.

1. **P2 — single long toast hides its header/close above the viewport.** At 375×667, a 12-sentence notification (a single card, not queue overflow) is 760px tall; card top is -105px and the close button top is -96px. At 320×568, card top is -204px. Fixed region/card have no vertical size cap or usable scroll container (toast.css:19–32,59–70,107–110); document/card scrolling and focus do not recover the hidden top. Short content fits as a control. A temporary card max-height/overflow control exposes the header/close and allows reaching the final action. Recommend a bounded toast height policy with scrollable long content and reachable dismissal; keep queue limits consumer-owned and avoid silently truncating messages. Root overflow is a diagnostic control, not a finished decision about sticky dismissal/body scrolling.
2. **P2 — an unbroken dialog title crosses the close control and forces horizontal panel scrolling.** Filename theme_configuration_production_customer_workspace_2026.json (59 characters) produces a 479px title inside a 272px panel at 320×568; panel scrollWidth is 511px, and five glyph rectangles intersect the close button. Both native and div hosts reproduce it. The title is a flex child without shrink/wrapping policy (dialog.css:57–69). Temporary min-width:0 + overflow-wrap:anywhere on the title reduces panel scrollWidth to 272px, removes glyph/close intersection and preserves the final action. Recommend this scoped title policy; body/pre/table overflow remains a separate content decision. The accepted footer/divider fixes remain accepted.
3. **P2 — unbroken toast title/message paint outside the card.** The same filename in a 320px card at 375×667 produces scrollWidth 495px and title/close glyph intersection. The visible overflow has no horizontal scroll recovery; this also occurs on wider screens because card width is fixed. The existing content min-width:0 allows flex shrink but does not break text (toast.css:78–93). A temporary overflow-wrap:anywhere on title/message removes excess overflow and intersection. Recommend scoped wrapping on those text slots, leaving arbitrary action content to its own layout policy.
4. **P3 / known mobile limitation — default toaster width exceeds a 320px viewport.** Region width 320px + end inset 12px places the left edge at -12px even with short content (toast.css:19–32). This is independent of long-content defects; mobile full-width layout is already deferred in toast README Limits. A temporary public width clamp min(320px, calc(100vw - 24px)) yields width 296px and x=12. Recommend agreeing a viewport-fit policy for the default region, without requiring a new full-width visual variant or reopening this as an undisclosed regression.
5. **Integration requirement — floating panels need available width/height and content rules.** At 320×568, fixed popover/tooltip at x=16 with the filename are 360px wide and end at x=376. Tooltip already wraps its text; a public max-width clamp to 288px resolves this. Popover still has scrollWidth 489px after that clamp; applying a plain-text wrap policy additionally resolves it. A long popover is 2062px high; its final action is at y≈2041px and stays outside the viewport after document scrolling. A consumer max-height + overflow:auto makes it reachable. These fixture coordinates intentionally stand in for consumer positioning: README assigns collision handling/coordinates to the consumer, so this is not evidence that a real positioning library fails. Recommend a documented integration recipe using available dimensions, scrolling and intentional wrapping; do not claim that flip/shift alone can fit content larger than the viewport. A long tooltip also exceeds the short-height viewport and should remain a brief hint, with larger content using a popover.
6. **P3 / content composition — sheet gets horizontal scrolling from unbroken text and ordinary nowrap buttons.** At 320px, the filename makes sheet content scrollWidth 493px; a long spaced action label makes the ordinary hb-button 680px wide and content scrollWidth 692px. Horizontal scrolling can reveal the content; the vertical final action in the plain long-body case is reachable. Temporary wrapping on the text or consumer button removes the excess width. Recommend a scoped consumer recipe for plain text and multiline actions; avoid globally changing all hb-button labels or forcing arbitrary sheet content such as tables/code to wrap. Physical keyboard/safe-area behavior remains unverified, not a newly confirmed defect.

Evidence: /Users/hob/.codex/visualizations/2026/10/18/01a14e49-61af-7311-bfb6-de191e520538/v04/index.html contains live reproductions in fixed-size iframes and links to standalone light/dark cases; repro.html loads canonical local index.css. measurements.json records all 300 configurations; controls.json records diagnostic style changes and scroll/focus counterchecks. summary.png and per-case screenshots show the actual failures. Diagnostic styles were applied only in the isolated browser page, not production CSS. Temporary scripts/profiles are outside the repository.

Recommended next scope: fix dialog/toast text wrapping; separately agree and implement a bounded long-toast height/dismissal policy. The default toaster viewport clamp is a small optional mobile-support decision. Document floating-panel/sheet composition recipes rather than introducing positioning JS or a general layout rewrite.

Verification: lint:styles, full format:check and git diff --check pass; npm start serves the catalogue with HTTP 200. Only this journal and V04 backlog status are changed in the repository; no production CSS/docs/API/version changes, commit, push or release. V02 and spin remain accumulated for a later batch release. Safari/Firefox, actual 200–400% browser zoom and physical iOS keyboard/safe areas remain outside this verification and are not a new per-change delivery gate.

# V02 — skeleton/tabs implementation (2026-10-19)

Owner-approved scope: fix text skeleton height, tabs state-color priority and skeleton reduced motion with public animation overrides; align SPEC and documentation. Do not add a label separator token. The owner subsequently requested a local V02 commit; remote publication remains separate.

Plan and definition of done:

1. Preserve public names and default appearance while fixing the three reproduced cases.
2. Align role precedence, structural/motion exceptions and local defaults in SPEC, token/block docs and generated examples; correct the previously identified catalogue/consumer-path drift.
3. Verify both themes, inherited and inline public overrides, tabs state combinations and live reduced-motion switching. Pass style/format/documentation checks and serve the catalogue.
4. Record results and limits; leave label unchanged and commit the completed V02 scope locally on the owner's request.

## Implementation result

- Text skeleton now sets the private 1em height default; the existing public height read applies to all variants, and line-centering margins use the effective height. Sized text retains its previous default appearance. The gradient pseudo-element and pulse root explicitly stop under reduced motion, even with a custom public animation.
- Tabs resolves the public/private idle and active roles on each tab through a private alias. Selected and hovered tabs consistently use the active role; native/ARIA/data disabled states retain system hint text, including selected + hovered combinations. Underline and focus tokens remain independent.
- SPEC sections 1–2, 4, 7–8 and token/block docs now distinguish role-specific precedence, accessibility guards, local geometry/period defaults and bounded structure/direct-system exceptions. Updated public examples, generated skeleton/tabs demos, Unreleased changelog, USAGE radio-group entry and the verified Selecta paths in AGENTS. No public tokens were added or renamed; label CSS/API and system token values are unchanged.
- Chrome 156.0.8078.36: 1374 assertions passed in both themes. Coverage: all five skeleton sizes and four shapes; default, ancestor and inline height/radius/background overrides; text centering; independent idle/active/both overrides; tabs native/ARIA/data disabled and selected combinations with real pointer hover; public geometry, underline, baseline and keyboard focus styles. Pulse and gradient move, stop, then resume across live no-preference → reduce → no-preference changes, with both default and inherited/inline custom animation periods and shimmer color.
- Updated catalogue examples visually inspected in both themes; all four animated skeleton examples compute animation:none under reduce. PASS: lint:styles, full format:check, docs:check, demo:check and git diff --check. npm start served /demo/, /demo/skeleton.html and /demo/tabs.html with HTTP 200. Temporary verification scripts, profiles and screenshots stay outside the repository; no test files or dependencies added.
- Limits: verification is bounded to Chrome and these cases, not every component/token or a new cross-browser acceptance. Text centering expects a length-valued public height, as documented. Label separator spacing remains deferred by owner request. The completed V02 scope is prepared for the requested local commit on main over the existing local spin commit; 0.3.0 and remote state are unchanged. Next small step: prepare a patch release together with the spin fix when requested.

# V02 — token contract investigation (2026-10-19)

Scope: identify current, actionable differences between SPEC and token/block CSS; distinguish public override failures, theme inconsistencies, intentional structure/accessibility exceptions, and documentation drift. No CSS implementation or commit is requested.

Plan and definition of done:

1. Inventory block declarations against SPEC sections 1–2 and 7, using current source rather than historical counts.
2. Inspect representative exceptions and reproduce potential consumer-visible failures where needed.
3. Report prioritized concrete corrections and explicit documentation decisions, with source locations and limits; preserve unrelated code and the existing local spin commit.

## V02 findings and proposed scope

Current baseline: main at 7ca49b3, containing the unpublished hb-spin fix. AST inventory covers all 32 block CSS files and resolves system tokens against actual declarations in tokens/ (so --hb-color-input-\* is correctly recognized as a component API, not a system color token). There are 28 direct system-token declarations in ordinary properties: 24 transitions and 4 round-radius uses. The 105 literal private defaults include repeats, component geometry and animation periods; they are not 105 bugs. Structural/state declarations require semantic classification, not a blanket violation count.

### Reproduced behavior differences

1. **Skeleton text height (P2):** blocks/skeleton/skeleton.css:74 hardcodes height:1em over the base public/private height. With inherited --hb-skeleton-height:40px and 16px text, a sized rectangular skeleton is 40px while variant_text stays 16px. README documents the token as block height without a text exception. Recommended fix: make 1em the text variant's private default, retain the public height read, and calculate centering against the effective height. Preserve the default text appearance and check combined size/text modifiers.
2. **Tabs state color priority (P2):** tabs.css:48 reads public idle color before a private value, while :hover at line 63 reads the active token directly; selected at line 95 only changes the private fallback. With idle rgb(180,30,40) and active rgb(20,110,60), an already selected tab is red until hovered, when it becomes green. README lines 80–81 explicitly assign idle versus hover/active roles. Recommended fix: resolve idle and hover/selected consistently through internal state aliases, preserving the documented public names; describe state-specific role priority instead of promising one base token wins every state. Disabled/focus combinations must retain their intended policy in that scoped fix.
3. **Skeleton reduced motion with public animation (P2):** skeleton.css:102–106 only clears the private animation. Setting documented --hb-skeleton-animation to hb-skeleton-pulse 2s linear infinite or hb-skeleton-shimmer 2s linear infinite leaves the root/pseudo-element animation active under reduce; the default pulse correctly becomes none. README promises both animations are disabled, and the clarified SPEC now requires an explicit stop. Recommended fix: animation:none on the actual pulse root and gradient ::after inside the media rule, preserving normal-mode public customization. Accessibility guards are an explicit exception to public visual override precedence.
4. **Label separator spacing (P3 / theme limitation):** label.css:50 uses margin-inline:4px, without a component override. Changing --hb-gap-1 from 4px to 12px changes a field's gap to 12px but leaves this separator at 4px. Recommended optional follow-up: a separator-gap public/private pair defaulting to --hb-gap-1, with unchanged default pixels. This adds public API and should be scoped separately from compatible bug fixes; do not substitute unrelated radius/control-size tokens just because their numbers match.

The first four observations were reproduced in Chrome 156 with real index.css in both light and dark. The tabs sample used a real pointer hover after the transition settled. A 52px ancestor button-height override still applies over its size_s modifier as a control case. Evidence is in temporary hvab-v02-evidence.json; no permanent test harness was added. This is bounded verification, not an exhaustive public-token matrix or cross-browser acceptance.

### Contract corrections recommended instead of a mass CSS rewrite

- SPEC section 2 says there are no exceptions, but sections 2.4/2.6 already define exceptions; section 7.4 still says no raw px/hex/ms at all. Align these sections around semantic values versus local component geometry and separate animation periods. Examples: dialog width 480px and field label width 12rem are local layout defaults; check/radio mark dimensions and donor-specific control geometry are not automatically the same semantic scale as button heights. Do not round/replace donor values merely to match an existing token.
- Permit shared duration/easing reads in transition declarations (24 current declarations), rather than introducing dozens of unused public duration/easing tokens. Keep explicit reduced-motion guards for continuous animation.
- Decide and document the fixed round-shape exception for checkbox mixed mark, radio ring/disc and switch thumb (4 direct --hb-radius-round reads). They are literal layer deviations, not evidence that a documented radius override is broken. Add component radius APIs only for an actual customization requirement.
- Allow structural layout/shape/overflow modifiers: field inline grid, text ellipsis, divider orientation, skeleton aspect ratio, table width. Allow state-driven indicator visibility, selected radio-group separator geometry and focus painting on the actual control surface. Preserve public visual token reads; avoid variables that only mirror display/grid/placement syntax.
- Allow private defaults on the element that owns them (for example sheet panel/handle) and resolved private state aliases (radio-group) when public role tokens are still respected. The documented toaster namespace is a separate block in toast.css, not accidental cross-block token usage.
- Clarify precedence: a public token overrides the private default for that role, not every other state-specific public role. Structural and reduced-motion policies must be listed separately. Align SPEC, tokens/README and relevant block docs; do not silently change every component's established state behavior.
- Small adjacent documentation drift: USAGE's catalogue omits radio-group; AGENTS references ThemeControls.vue and src/components/ui/, while the current read-only Selecta tree uses src/components/ThemeControls/ThemeControls.vue and src/ui/. No Selecta files were changed.

Recommendation: first a bounded skeleton/tabs correctness change (items 1–3), with explicit role/guard wording; then the wider contract/documentation alignment. Treat label separator API as a separately chosen addition. No CSS, contract, public README, version, commit or remote state was changed during this investigation; only this journal is updated.

# Spin reduced motion — implementation (2026-10-19)

The owner approved stopping hb-spin under prefers-reduced-motion:reduce while preserving ordinary rotation, updating README/SPEC, adding a clear loading example and verifying both modes. The owner subsequently requested a local commit. No version bump or remote publication is requested.

Plan and definition of done:

1. Add a local animation:none media rule, preserving the public token API and all normal-mode styles.
2. Explain continuous-animation policy in SPEC and consumer loading semantics in README; regenerate the example and record the unreleased fix.
3. Verify normal/reduced/normal transitions, light/dark schemes, all sizes and public overrides; confirm the example remains understandable with no motion. Pass style/format/docs/demo checks and catalogue serving.

## Implementation result

- Added only a local reduced-motion guard to spin.css: animation:none. Ordinary animation, size variants, color/stroke/radius and public tokens are unchanged. The rule follows the pinned Gravity Spin sources recorded below; no global motion token changes.
- README now documents both modes and live switching, with a generated Loading status example containing visible text and an aria-hidden decorative arc. It distinguishes a static example from consumer-owned live announcements and busy regions. SPEC separates shared transition durations from explicit continuous-animation guards. Added an Unreleased changelog entry and marked V03 implemented locally.
- Chrome 156: 280 focused checks passed across full/selective imports, light/dark, all five sizes and custom size/stroke/color/radius/period/easing. Each sequence switches no-preference → reduce → no-preference without navigation: rotation moves, stops, then resumes with its original period. Reduced-mode screenshots remain byte-identical over time; geometry and appearance values remain unchanged. The catalogue exposes the status role/text in its accessibility tree and all arcs stop under reduce. Visually inspected the generated example.
- PASS: lint:styles, full format:check, docs:check, demo:check, actual pack:check and git diff --check. npm start serves the updated spin catalogue. Verification used temporary diagnostic scripts/profiles outside the repository; no new test files or dependencies were added.
- Limits: Chrome emulation and AX inspection do not constitute a new physical Safari/Windows or screen-reader speech acceptance. The implementation is ready for the requested local commit on main; version 0.3.0 and the published release are unchanged. Existing verification is sufficient for this change. A separate Safari check is not a project requirement or a delivery gate; the earlier suggestion was unnecessary. Next delivery step is remote publication when requested.

# Spin reduced motion — earlier investigation (2026-10-19)

Scope: explain current hb-spin behavior, compare correction options and the configured Gravity donor, and recommend a bounded change. No CSS implementation, commit or publication is authorized for this investigation.

Plan and definition of done:

1. Inspect spin, shared motion tokens and the contract, separating explicit exceptions from actual behavior.
2. Compare pinned Gravity sources, including the historical donor baseline, and illustrate normal/reduced modes without changing production CSS.
3. Record findings, alternatives, recommendation and limits. Implementation requires the owner's choice.

## Findings and recommendation

- Actual Chrome 156 styles: both no-preference and reduce keep hb-spin at 1s/infinite, with its transform changing over 250ms. The shared fast duration changes from 150ms to 0ms, but spin uses its independent private/public period. README explicitly documents continuous rotation.
- SPEC section 7 item 8 is formally an interactive-block checklist; spin is non-interactive. Treat this as a motion-policy/documentation gap and a donor divergence, not an unqualified violation of that checklist.
- Gravity Spin.scss explicitly sets animation:none under prefers-reduced-motion:reduce at both c1702e6aa9fcac95537e9af0646d619e1ea0d453 (7.43.0 historical comparison) and 7d187fd0a108edda969266f85ab33a54b13fb36e (8.0.0-beta.2 configured checkout). The rule appears in donor commit 621adf4f (2025-07-18). Spin.tsx has no built-in loading announcement. This is source verification, not donor runtime acceptance.
- Options: stop the existing arc; slow rotation; substitute opacity pulse; or retain the explicit current exception. Recommend stopping the arc via a local media rule, preserving normal-mode speed, sizes, colors and public tokens. Slowing still leaves rotation; pulsing requires a new motion design and continues animation. Merely coupling the period to global durations does not clearly express stopping and can be overridden through the public period.
- Pair the decorative arc with consumer-owned visible loading text and appropriate busy/status semantics. A rotating arc already cannot guarantee that the process is alive. No automatic live region or text is added by CSS.
- Proposed implementation scope after owner choice: spin.css media rule; spin README Motion and status example; precise SPEC wording distinguishing shared transition durations from explicit continuous-animation guards; regenerate the spin demo if its marked example changes, and add an Unreleased note. No change to global motion tokens or unrelated animated blocks.
- Inline comparison: spin-motion.html in the thread visualization directory. Three-second opt-in playback compares unchanged, stopped, slowed and pulsing modes; actual system reduced motion disables preview playback. Inspected at 320/736px without horizontal overflow, confirmed 3 animations in reduced-mode comparison, 4 in normal comparison, and 0 under actual system reduce. This illustrates proposals and does not change production CSS.
- Only this working journal changed in the repository. No implementation, commit, branch switch or publication. Next: owner chooses the reduced-motion policy.

# Release 0.3.0 — preparation and verification (2026-10-19)

The owner authorized preparation, checks, publication of main and the v0.3.0 tag, and a GitHub Release. npm registry publication and consumer deployment are outside this release.

1. Inventory the Gravity source evidence, distinguish known revisions from unrecoverable original-port provenance, and include upstream notices in source and optional package distribution.
2. Complete the public changelog and custom-theme migration note for all merged audit fixes; preserve CSS and public exports.
3. Run release gates, actual package inspection, Pages build and local catalogue serving; review the final diff.
4. Commit release preparation on main, bump to 0.3.0 with its annotated tag, push main/tag and create the GitHub Release from the changelog. Verify remote version/tag/release and the separate Pages deployment.

Done means the published tag identifies the checked source, notices ship with the package, the release notes cover the audit changes and known provenance limits, and the local main is clean and synchronized.

## Publication and Pages follow-up

- Published v0.3.0 at 4dfa1c71dc169172c7e6f1de720b6b47044261fc; remote main/tag equality and latest non-draft GitHub Release were verified. Package and lockfile are 0.3.0; final archive checks pass.
- Initial Pages workflow 39153026973 succeeded, but HTTP verification found LICENSE and THIRD_PARTY_NOTICES.md absent from the deployed CSS catalogue (404). Follow-up plan: copy the consumer documentation and notices into the Pages artifact, verify source equality and local documentation targets, then publish a separate deployment-only commit. Preserve the existing release tag and package contents.
- The Pages follow-up passes pages:build, full format:check, style lint and whitespace checks. All six consumer documents/notices match source and their local targets resolve in dist. Package metadata, distributed source and the release tag remain unchanged; only build-pages and this journal differ from v0.3.0.
- The workflow reports upstream action-runtime/runner migration notices; these did not fail the deployment. Updating action versions is separate maintenance.

## Preparation result

- Completed the public changelog, including three contrast roles, two dialog footer overrides, all eleven audit fixes and custom-theme upgrade guidance. No CSS, generated demo or public export changes were introduced during release preparation.
- Added THIRD_PARTY_NOTICES.md with all 32 block families and token sources. Donor 7.43.0 at c1702e6aa9fcac95537e9af0646d619e1ea0d453 is only the historical comparison baseline; exact original per-port SHAs are unknown. Contrast values are verified at 7d187fd0a108edda969266f85ab33a54b13fb36e. The copied MIT text matches both upstream LICENSE files byte-for-byte.
- The optional npm archive includes both notices; pack:check enforces their presence and source equality. Actual archive and dry-run inspection: 81 files, 59 local documentation links, no audit/development records. Copy-first instructions preserve both licenses.
- PASS: demo:build (no generated diff), demo:check, docs:check, pages:build, lint:styles, full format:check, pack:check and git diff --check. npm start serves root 302 to /demo/, catalogue/CSS 200 and missing routes 404.
- Chrome 156 regression verification: 95 disabled-state and 237 forced-color results passed, no failures; the latter includes all four normal-paint comparisons against main before PR #16 (dce4042e4da6bf247707087f0fa3d64e50d68206), with no skips in the final run. Field/color-input matrix: 8,735 assertions, zero failures. Documentation examples: 32 named semantic nodes and popover geometry at 320/375/1280px in both themes passed, with no captured runtime/network failures.
- Limits: physical Safari/Windows/screen-reader acceptance is the earlier owner report preserved in the audit history, not a new claim from these Chrome checks. Consumer sync, registry publication and broader browser/motion/RTL decisions remain separate.
- Next publication step: commit this preparation and the 0.3.0 version metadata, push main and the annotated tag, create the GitHub Release from CHANGELOG, and verify the matching remote commit and Pages run. GitHub provides the final publication status without rewriting the tagged source afterwards.

# Current project status — 2026-10-19

- All eleven audit fixes (#1–#11) are closed and integrated into main through PRs #12–#19. The remaining formatting warning was fixed in PR #20. No manual acceptance remains for that agreed set.
- The primary checkout is consolidated onto main. Accepted CSS fixes and main's package/documentation changes are preserved; the previously local catalogue redirect and audit records are included in this consolidation.
- Current recommended next work is in [IDEAS.md](IDEAS.md): final consumer sync and explicit browser/motion/RTL decisions. The 0.3.0 release work above completes the donor inventory and release notes without new CSS implementation.
- The authorized target release is 0.3.0. The GitHub tag and Release are the publication record; registry publication and consumer deployment are outside this task.
- [Local audit and integration history](history/LOCAL-AUDIT-2026-10-19.md) preserves the previously uncommitted develop journal, including owner acceptance and merged PR references. It is historical evidence, not an active task list.

## Earlier local consolidation plan and completion criteria

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
