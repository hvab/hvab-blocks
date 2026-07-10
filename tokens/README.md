# Tokens

Foundation tokens are the public theme API for `hvab-blocks`. They are plain CSS custom properties and must be loaded before any block CSS.

Use `index.css` for the full bundle. If you import blocks manually, import the needed files from `tokens/` first.

## Files

- `ref.css` — raw `--hb-ref-*` values. This layer has no semantic meaning and is not read by blocks directly.
- `color.css` — scheme-aware `--hb-color-*` roles for text, base surfaces, lines, and visual effects.
- `typography.css` — `--hb-typography-*` size, line-height, weight, and mono-family tokens.
- `radius.css` — `--hb-radius-*` corner scale.
- `spacing.css` — `--hb-gap-*` component rhythm and the reserved `--hb-spacing-*` section rhythm namespace.
- `motion.css` — `--hb-duration-*` and `--hb-ease-*`, with centralized reduced-motion handling.
- `size.css` — `--hb-size-*` control geometry shared by interactive blocks.
- `focus.css` — `--hb-focus-ring-*` focus-ring geometry.

## Layers

Tokens follow the project contract:

```text
ref -> system -> component tokens -> block selectors
```

Blocks read system tokens only through their private component defaults. They do not read `--hb-ref-*` directly.

## Color Schemes

Color is the only scheme-aware token file. The light scheme is defined on `:root` and `[data-color-scheme='light']`; the dark scheme is defined on `[data-color-scheme='dark']`.

```html
<html data-color-scheme="dark">
  ...
</html>
```

Brand roles are intentionally monochrome and invert between schemes:

- light: dark brand surface with light contrast text;
- dark: light brand surface with dark contrast text.

When adding color roles, add both light and dark values in the same change.

## Consumer Theme Example

Consumers usually do not edit `tokens/color.css`. They load their theme overrides after `hvab-blocks/index.css`:

```js
import 'hvab-blocks/index.css';
import './app-theme.css';
```

```css
/* app-theme.css */
:root,
[data-color-scheme='light'] {
  --hb-color-base-background: rgb(255 255 255);
  --hb-color-base-brand: rgb(18 24 38);
  --hb-color-base-brand-hover: rgb(36 45 64);
  --hb-color-text-brand: rgb(18 24 38);
  --hb-color-text-brand-contrast: rgb(255 255 255);
  --hb-color-line-brand: rgb(18 24 38);
}

[data-color-scheme='dark'] {
  --hb-color-base-background: rgb(12 14 18);
  --hb-color-base-brand: rgb(238 241 247);
  --hb-color-base-brand-hover: rgb(216 222 232);
  --hb-color-text-brand: rgb(238 241 247);
  --hb-color-text-brand-contrast: rgb(12 14 18);
  --hb-color-line-brand: rgb(238 241 247);
}
```

Use this for semantic theme roles. Use block public tokens (`--hb-button-*`, `--hb-card-*`) only for local one-off overrides.

## Reference Layer Example

`ref.css` can stay empty until repeated raw values become useful. When a project needs a reusable raw palette, define it in `ref.css` and consume it from semantic tokens:

```css
/* tokens/ref.css */
:root {
  --hb-ref-palette-brand-950: rgb(18 24 38);
  --hb-ref-palette-brand-100: rgb(238 241 247);
}
```

```css
/* tokens/color.css */
:root,
[data-color-scheme='light'] {
  --hb-color-base-brand: var(--hb-ref-palette-brand-950);
  --hb-color-text-brand-contrast: rgb(255 255 255);
}

[data-color-scheme='dark'] {
  --hb-color-base-brand: var(--hb-ref-palette-brand-100);
  --hb-color-text-brand-contrast: rgb(12 14 18);
}
```

Blocks still do not read `--hb-ref-*` directly.

## Adding Tokens

- Add a token only when a real block needs it.
- Port limited scales as complete scales: typography, radius, size, spacing, motion, and focus.
- Add color roles one by one, but always as light/dark pairs.
- Keep values in `tokens/`; block selectors should use component tokens, not raw values.
- Treat `--hb-*` token names as public API once they are used by a block or documented here.
