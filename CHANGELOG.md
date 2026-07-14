# Changelog

All notable changes to `hvab-blocks` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The public API consists of `hb-*` block classes, public `--hb-*` system and component tokens, and documented state attributes. Private `--_<block>-*` tokens are implementation details.

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
