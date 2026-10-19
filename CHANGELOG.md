# Changelog

All notable changes to `hvab-blocks` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The public API consists of `hb-*` block classes, public `--hb-*` system and component tokens, and documented state attributes. Private `--_<block>-*` tokens are implementation details.

## [Unreleased]

### Fixed

- Toaster regions shrink to fit between both inline insets on narrow screens, preserving the preferred width override and inline-end anchoring.
- Dialog titles and toast titles/messages wrap unbroken text. Long toast content scrolls within a viewport-bounded card while its close slot stays visible, with a configurable content reserve.
- `hb-spin` stops rotating under `prefers-reduced-motion: reduce`, preserving its appearance and ordinary-mode customization. The loading example includes visible status text.
- Text skeletons honor `--hb-skeleton-height` and center using the effective height. Skeleton pulse/shimmer stop under reduced motion even with a public animation override.
- Tabs consistently use the hover/active text role when selected, including with an idle color override; disabled keeps hint text across hover and selected states.

### Changed

- Added narrow-container composition examples for bounded popovers, brief tooltips and sheets with wrapping text/actions, including positioning and scrolling limits.
- Clarified the token contract: overrides apply within each role, with explicit state/accessibility policies, local geometry defaults and bounded structure/motion exceptions. Updated block examples and the usage catalogue.

## [0.3.0] - 2026-10-19

### Added

- Light/dark functional-text roles: `--hb-color-text-info-contrast`, `--hb-color-text-positive-contrast` and `--hb-color-text-warning-contrast`.
- Dialog footer overrides `--hb-dialog-footer-button-padding-block` and `--hb-dialog-footer-button-line` for multiline actions.
- A Gravity source inventory and upstream MIT notice in `THIRD_PARTY_NOTICES.md`, included in the optional npm archive and copy-first instructions.

### Fixed

- Dialog actions stack at full width in containers narrower than 480px and use a row in wider dialogs, preserving DOM order and showing long labels in full. The dialog divider no longer overflows the panel.
- Functional text contrast is improved in both themes: field labels/help use complementary text, status text and labels use the new contrast roles, and toast messages use primary text. Existing global secondary/hint values are unchanged.
- Selected table rows retain their selection background over hover and zebra stripes, including after reordering and with public overrides; palette values are unchanged.
- Color inputs retain their explicit width inside fields regardless of block import order, while other field controls continue to stretch.
- Text-input, textarea and progress examples have accessible names; the popover demo reserves preview space outside the anchor to preserve positioning.
- Modal documentation distinguishes native dialog behavior from consumer-owned page scroll locking.
- The npm archive includes the changelog and working documentation links; package verification checks distributed content and links.
- The local development server redirects its root to the catalogue.
- Forced-color controls preserve distinct unchecked, checked, mixed and disabled indicators, and selects retain their native dropdown arrow.
- Disabled radio groups retain their muted styling on hover when the disabled state is set on the group.
- Checked and mixed disabled controls use the existing disabled skin consistently across supported native, ARIA, and data attribute combinations.

### Upgrade notes

- No existing public class, token or state attribute is removed or renamed. Custom themes that override ordinary status-text tokens should also set the new contrast roles to customize the updated field, label and text assignments. Component color overrides still take precedence; see [tokens/README.md](tokens/README.md) for the supported surface combinations.
- Copy-first consumers must retain both `LICENSE` and `THIRD_PARTY_NOTICES.md`. The notice distinguishes the historical donor comparison baseline from the exact later contrast-value revision; original per-port donor SHAs were not recorded for the initial imported catalogue.

## [0.2.0] - 2026-07-14

### Added

- `hb-radio-group`: segmented native radio controls with selected, hover, disabled, focus-visible, size, and width states.

## [0.1.1] - 2026-07-14

### Fixed

- Disabled outlined buttons retain a transparent border footprint, preventing layout shifts when their state changes.

## [0.1.0] - 2026-07-10

First public release of the portable CSS source tree.

### Added

- Design-token foundation for colour schemes, typography, radius, component spacing, motion, control geometry, and focus rings.
- Light and dark colour schemes selected with `data-color-scheme`.
- Content and feedback blocks: `alert`, `divider`, `hotkey`, `icon`, `label`, `progress`, `skeleton`, `spin`, and `text`.
- Form and action blocks: `button`, `checkbox`, `color-input`, `field`, `link`, `radio`, `range-input`, `select`, `switch`, `text-input`, and `textarea`.
- Surface and navigation blocks: `breadcrumbs`, `card`, `pagination`, `table`, and `tabs`.
- Overlay skins: `dialog`, `modal`, `popover`, `sheet`, `toast` (with `toaster` region), and `tooltip`.
- Per-block documentation and generated static demos with examples, modifiers, states, public tokens, and documented behaviour boundaries.
- Copy-first vendoring with canonical source stamps, provenance records, and a documented resync workflow.
- Optional dependency consumption through the CSS package entry point and selective public exports.

### Notes

- The library provides CSS structure and skins only. Consumers own framework bindings, state management, page layout, and interactive behaviour such as positioning, focus traps, keyboard handling, portals, and timers.
- Blocks are opt-in: they style their documented `hb-*` classes and do not reset or style bare HTML elements globally.
