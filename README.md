# hvab-blocks

Portable, framework-agnostic CSS building blocks. The library provides design tokens and opt-in BEM classes in the `hb-` namespace; it does not provide JavaScript behaviour, page layout, or global element resets.

`hvab-blocks` is copy-first. You can vendor its CSS into a project and own the resulting source, or consume the same files as a dependency when that is more convenient.

## Quick start

For the complete catalogue, import the public entry point once:

```js
import 'hvab-blocks/index.css';
```

For copy-first use, copy `tokens/` in full and the block directories you need. Load tokens before block CSS:

```css
/* src/styles/hvab.css */
@import url('./vendor/hvab-blocks/tokens/ref.css');
@import url('./vendor/hvab-blocks/tokens/color.css');
@import url('./vendor/hvab-blocks/tokens/typography.css');
@import url('./vendor/hvab-blocks/tokens/radius.css');
@import url('./vendor/hvab-blocks/tokens/spacing.css');
@import url('./vendor/hvab-blocks/tokens/motion.css');
@import url('./vendor/hvab-blocks/tokens/size.css');
@import url('./vendor/hvab-blocks/tokens/focus.css');
@import url('./vendor/hvab-blocks/blocks/button/button.css');
```

```html
<button class="hb-button hb-button_view_action">Save</button>
```

Read [USAGE.md](USAGE.md) before integrating blocks. It covers the two integration models, public API rules, theme overrides, and links to every block README. For copy provenance and later resyncing, use [VENDOR.md](VENDOR.md).

## What is included

- Design tokens for colour schemes, typography, radius, spacing, motion, control size, and focus rings.
- 32 CSS blocks for content, feedback, forms, surfaces, navigation, and overlays, including segmented radio groups.
- Per-block README files with markup, modifiers, states, public tokens, and limits.
- A generated static HTML catalogue under `demo/`.

The library styles structure and documented states. Consumers supply framework bindings and interactive behaviour such as positioning, focus traps, keyboard handling, portals, timers, and page layout.

## Browser scope

The target policy is Browserslist `defaults and fully supports css-has`, recorded in `.browserslistrc`. Versions follow the browser database rather than a manually pinned list. Blocks use native modern CSS, including `:has()`, container queries, dynamic viewport units and typed custom properties; there is no compatibility build for older browsers. The supported direction is LTR.

## Documentation

- [USAGE.md](USAGE.md) — consumer integration guide and block catalogue.
- [tokens/README.md](tokens/README.md) — token layers and theme overrides.
- [VENDOR.md](VENDOR.md) — copy-first provenance and resync workflow.
- [CHANGELOG.md](CHANGELOG.md) — public changes between releases.
- [RELEASE.md](https://github.com/hvab/hvab-blocks/blob/main/RELEASE.md) — current maintainer release flow.

## Demo

The static catalogue is deployed to [GitHub Pages](https://hvab.github.io/hvab-blocks/).

The Pages workflow follows `main` independently of release tags, so the catalogue can include Unreleased changes.

The catalogue includes the full block documentation, live HTML examples with expandable source, and the foundation token guide. The index, sidebar and compact mobile selector share semantic groups with alphabetical entries. Light/dark selection is saved locally and restored when navigating between pages.

Examples demonstrate CSS structure and states; interactive application behaviour remains consumer-owned. Markdown is rendered only by the development-time generator, with no Markdown library shipped to the browser or CSS package.

## Release cadence

Completed changes accumulate in [CHANGELOG.md](CHANGELOG.md) under Unreleased and are released as a batch when explicitly requested. The package version changes during release preparation, not after every fix. Pushing ordinary commits does not create a version tag or GitHub Release.

## Local development

```bash
npm install
npm start
```

The server root redirects to the static catalogue at `/demo/`; the command does not open a browser automatically.

```bash
npm run demo:build
npm run demo:check
npm run docs:check
npm run pack:check
npm run lint:styles
npm run format:check
```
