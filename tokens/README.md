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

### Functional text contrast

`--hb-color-text-info-contrast`, `--hb-color-text-positive-contrast` and `--hb-color-text-warning-contrast` are local semantic roles for small functional text. Their values come from the Gravity UI palette at `7d187fd0a108edda969266f85ab33a54b13fb36e` (8.0.0-beta.2); these role names are an intentional hvab addition, not a verbatim port of Gravity semantic roles.

| Role suffix         | Light value / Gravity source        | Dark value / Gravity source             |
| ------------------- | ----------------------------------- | --------------------------------------- |
| `info-contrast`     | `rgb(44 90 138)` / blue-800-solid   | `rgb(134 193 247)` / blue-750-solid     |
| `positive-contrast` | `rgb(42 108 76)` / green-800-solid  | `rgb(130 200 185)` / green-700-solid    |
| `warning-contrast`  | `rgb(145 74 17)` / orange-800-solid | `rgb(255 197 108)` / text-warning-heavy |

The existing `secondary`, `hint`, ordinary status and `*-heavy` roles retain their values. Simply substituting existing heavy roles is insufficient: on white, positive-heavy is 4.232:1 and warning-heavy is 4.469:1, below the 4.5:1 threshold for ordinary text. The new roles preserve colored text without changing the palette used by other components, placeholders or disabled states.

With the default light/dark tokens and no additional opacity, the supported combinations for the updated functional text are:

- Field labels/help (`text-complementary`) and warning (`text-warning-contrast`) on `base-background`, `base-float` or `base-modal`.
- Text info/positive/warning modifiers on those same opaque surfaces.
- Label info/success/warning content on its corresponding default `base-*-light` tint composited over any of those surfaces.
- Toast messages (`text-primary`) on the default opaque float surface or the default status tints composited over any of those surfaces.

These combinations meet 4.5:1 using sRGB luminance after alpha composition. This is a contract for these specific foreground/background pairs, not arbitrary backgrounds or library-wide WCAG conformance. Existing error/danger and normal-label roles are unchanged; their previously verified page-background pairs remain valid, but they are not covered by the new floating-surface contract. Muted label `__value` opacity is also outside it. Do not use unchanged secondary/hint examples as evidence of sufficient contrast for essential small text.

Custom themes should override the new semantic roles as needed; component public color overrides still take precedence. Recalculate against the final background whenever a theme, surface, tint or opacity changes. Consumer CSS that previously changed the ordinary status tokens must also set the new contrast tokens to customize these updated assignments.

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
