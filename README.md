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
- 31 CSS blocks for content, feedback, forms, surfaces, navigation, and overlays.
- Per-block README files with markup, modifiers, states, public tokens, and limits.
- A generated static HTML catalogue under `demo/`.

The library styles structure and documented states. Consumers supply framework bindings and interactive behaviour such as positioning, focus traps, keyboard handling, portals, timers, and page layout.

## Documentation

- [USAGE.md](USAGE.md) — consumer integration guide and block catalogue.
- [tokens/README.md](tokens/README.md) — token layers and theme overrides.
- [VENDOR.md](VENDOR.md) — copy-first provenance and resync workflow.
- [CHANGELOG.md](CHANGELOG.md) — public changes between releases.
- [RELEASE.md](RELEASE.md) — maintainer release flow.

## Demo

The static catalogue is deployed to [GitHub Pages](https://hvab.github.io/hvab-blocks/).

## Local development

```bash
npm install
npm start
```

The static catalogue is served at `/demo/`; the command does not open a browser automatically.

```bash
npm run demo:build
npm run demo:check
npm run docs:check
npm run lint:styles
npm run format:check
```

## License

[MIT](LICENSE)
