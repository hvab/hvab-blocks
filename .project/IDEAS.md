# Remaining work after the audit

Updated 2026-10-19 during 0.3.0 release preparation. All eleven confirmed audit fixes are closed; the items below are separate investigations or product decisions, not reopened defects. The original [V01–V06 report](../audit/2-sol-6-1-xhigh.md#v01) remains historical evidence; the current status is recorded here.

## Recommended sequence

1. **Donor provenance inventory completed for 0.3.0 (V01).** [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) records all 32 block families and token sources, the historical 7.43.0 comparison baseline, and the exact 8.0.0-beta.2 source of the contrast values. The upstream MIT notice ships in source/package distributions and copy-first instructions. Original per-port SHAs were not recorded in the initial imported tree and remain unknown; the comparison baseline is not presented as proof of each original port. Record exact revisions for future ports.
2. **Final consumer sync (remaining V06).** Earlier Selecta acceptance already covers the relevant Field, ConfirmDialog and control-state scenarios; do not repeat that work as if it had never happened. Before the consumer adopts the completed main, inspect its current revision and import route, then verify the actual combined integration. A full current-consumer build and production deployment are separate from core acceptance. Aegea/React verification becomes relevant only when there is a real integration to exercise.
3. **0.3.0 release.** The owner authorized the minor release, including complete changelog, provenance inventory, release gates, main/tag push and GitHub Release. Registry publication and consumer deployment remain separate. Use the GitHub tag/release as the publication record.

## Decisions before further CSS work

- **Browser and mobile scope (V04).** `.browserslistrc` still says `defaults`; agree a concrete browser/device floor. The closed dialog issue has owner Safari acceptance and targeted geometry evidence, not a complete mobile catalogue acceptance. Then inspect remaining modal/sheet/toast/tooltip/popover/menu layouts, physical iOS keyboard and safe areas, Firefox and actual zoom where supported. Mobile full-width toast remains a declared limitation. Report bounded reproducible failures rather than starting a general responsive rewrite.
- **Reduced-motion spinner (V03).** `spin` still rotates through its independent period; its README explicitly describes that choice while the general contract describes shared reduced-motion support. Recommend a non-rotating loading indicator with consumer-owned status text under reduced motion; agree the behavior before changing CSS, then align the contract and example. No change has been approved yet.
- **Layer contract and documentation (V02).** Inventory actual direct sys/motion/layout exceptions and distinguish working public overrides from real failures. Update the wording or make a bounded fix where evidence requires it; do not turn the earlier raw exception count into a mass refactor. The old Selecta wrapper path in AGENTS and the historical USAGE catalogue inventory can be corrected in a scoped documentation pass.
- **RTL scope (V05).** Decide whether any real consumer needs RTL. `switch` still combines logical inset with physical `translateX`; that is a verification candidate, not a newly confirmed supported-case defect. If RTL is supported, inspect switch states, select arrow and focus geometry in both themes. Otherwise document the current LTR boundary rather than expanding scope implicitly.

## Deferred ideas

- **Container queries:** the concrete dialog-footer use case is implemented and accepted through #1 / PR #17. Extend this approach only for another real component/container need; do not reopen the completed footer work.
- **Native accordion:** add a CSS skin for `<details>` / `<summary>` when a real screen needs it. Keep disclosure behavior browser-owned and take visual values from Gravity.
- **`light-dark()`:** consider only after the browser floor is agreed and a concrete maintenance benefit is shown. Preserve Gravity values, the public token API and explicit `[data-color-scheme]` switching through `color-scheme`.
- Revisit [Modern Web Guidance research notes: skills, reusable rules, browser tools and trade-offs](WEB-PLATFORM-AGENT-GUIDANCE.md) when evaluating development tooling. These notes are not adopted repository instructions.

Earlier inspiration: [Bootstrap 6 Alpha](https://blog.getbootstrap.com/2026/10/08/bootstrap-6-alpha/). The ideas are preserved for reference, not scheduled implementation.
