# Remaining work after the audit

Updated 2026-10-19 during 0.3.0 release preparation. All eleven confirmed audit fixes are closed; the items below are separate investigations or product decisions, not reopened defects. The original [V01–V06 report](../audit/2-sol-6-1-xhigh.md#v01) remains historical evidence; the current status is recorded here.

## Recommended sequence

1. **Donor provenance inventory completed for 0.3.0 (V01).** [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) records all 32 block families and token sources, the historical 7.43.0 comparison baseline, and the exact 8.0.0-beta.2 source of the contrast values. The upstream MIT notice ships in source/package distributions and copy-first instructions. Original per-port SHAs were not recorded in the initial imported tree and remain unknown; the comparison baseline is not presented as proof of each original port. Record exact revisions for future ports.
2. **Consumer handoff (V06): closed in this repository by owner decision (2026-10-19).** The owner has already transferred the required information to Selecta. Release adoption, framework integration and compatibility acceptance belong to the consumer repository/chat and are not remaining core tasks or release gates here. Core work accumulates for the next batch release; the owner will adopt it in Selecta separately. Reopen a core task only for a concrete library defect or an explicit request made here.
3. **0.3.0 release.** The owner authorized the minor release, including complete changelog, provenance inventory, release gates, main/tag push and GitHub Release. Registry publication and consumer deployment remain separate. Use the GitHub tag/release as the publication record.

## Decisions before further CSS work

- **Browser and mobile scope (V04): dialog/toast fixes and toaster width fitting implemented and verified, pending publication.** Sol 6.1 implemented unbroken title/message wrapping, bounded long-toast content with accessible dismissal and toaster width fitting between both inline insets; the parent independently checked both schemes, public overrides and keyboard/pointer behavior, including focus-gutter corrections, classic scrollbar space and live resizing. Evidence and limits are in PROGRESS. A separate mobile full-width variant and floating-panel/sheet composition work remain deferred. The owner wants modern-browser support defined dynamically through Browserslist, without a separate manual version matrix. The approved query is defaults and fully supports css-has, retaining automatic version selection while filtering incompatible KaiOS/Opera Mini/UC/QQ entries. Actual zoom and physical iOS keyboard/safe-area behavior remain unverified. Accumulate changes for a later batch release; no version bump is planned now.
- **Reduced-motion spinner (V03): implemented and verified, pending publication.** The approved behavior stops the arc under reduced motion, preserves ordinary rotation and public overrides, and documents consumer-owned loading status. README/SPEC and the generated example are aligned; see PROGRESS for verification. No release is included in this step.
- **Layer contract and documentation (V02): implemented and verified, pending publication.** Fixed skeleton text height, tabs role precedence and skeleton reduced motion with public overrides; aligned SPEC/docs and generated examples without a broad CSS rewrite. Both themes and public overrides passed focused Chrome verification; see PROGRESS. The label separator gap token remains explicitly deferred.
- **RTL scope (V05): closed as no action by owner decision (2026-10-19).** Current consumers do not need RTL; the supported scope is LTR. No RTL implementation or acceptance work is planned. Revisit only if a real consumer requirement appears; the historical switch geometry observation is not an active defect in the accepted scope.

## Deferred ideas

- **Container queries:** the concrete dialog-footer use case is implemented and accepted through #1 / PR #17. Extend this approach only for another real component/container need; do not reopen the completed footer work.
- **Native accordion:** add a CSS skin for `<details>` / `<summary>` when a real screen needs it. Keep disclosure behavior browser-owned and take visual values from Gravity.
- **`light-dark()`:** consider only after the browser floor is agreed and a concrete maintenance benefit is shown. Preserve Gravity values, the public token API and explicit `[data-color-scheme]` switching through `color-scheme`.
- Revisit [Modern Web Guidance research notes: skills, reusable rules, browser tools and trade-offs](WEB-PLATFORM-AGENT-GUIDANCE.md) when evaluating development tooling. These notes are not adopted repository instructions.

Earlier inspiration: [Bootstrap 6 Alpha](https://blog.getbootstrap.com/2026/10/08/bootstrap-6-alpha/). The ideas are preserved for reference, not scheduled implementation.
