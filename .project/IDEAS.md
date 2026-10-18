# Remaining work after the audit

Updated 2026-10-19 against main after PR #20. All eleven confirmed audit fixes are closed; the items below are separate investigations or product decisions, not reopened defects. The original [V01–V06 report](../audit/2-sol-6-1-xhigh.md#v01) remains historical evidence; the current status is recorded here.

## Recommended sequence

1. **Donor provenance before the next distribution (V01).** Record the actual Gravity source revisions and copied subsets, distinguish original ports from later value references, and determine what attribution must accompany the distributed files. `VENDOR.md` currently records hvab-to-consumer provenance, while `LICENSE` contains the project's own notice. The contrast-role documentation records a donor SHA for that specific change, not the provenance of the whole library. Produce a source/notice manifest; do not infer a legal violation from the incomplete record.
2. **Final consumer sync (remaining V06).** Earlier Selecta acceptance already covers the relevant Field, ConfirmDialog and control-state scenarios; do not repeat that work as if it had never happened. Before the consumer adopts the completed main, inspect its current revision and import route, then verify the actual combined integration. A full current-consumer build and production deployment are separate from core acceptance. Aegea/React verification becomes relevant only when there is a real integration to exercise.
3. **Release preparation.** Complete `CHANGELOG.md` with the merged dialog/divider, functional contrast, table selection, field width and documentation/package fixes; its Unreleased section currently lists only control-state fixes. Decide the version under `RELEASE.md`, accounting for the new public contrast tokens. Do not bump, tag, publish or deploy automatically. Keep the clean full format check established by PR #20.

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
