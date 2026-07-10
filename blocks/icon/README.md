# Icon

Size and color wrapper for inline SVG icons. The library does not ship icon assets; consumers provide SVG paths, sprites, or framework icon components.

## Usage

Put `hb-icon` on the SVG itself when possible. SVG paths should use `fill="currentColor"` or equivalent.

```html demo
<svg class="hb-icon" viewBox="0 0 16 16" aria-hidden="true">
  <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
</svg>
```

## Sizes

```html demo
<svg class="hb-icon hb-icon_size_xs" viewBox="0 0 16 16" aria-hidden="true">
  <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
</svg>
<svg class="hb-icon hb-icon_size_s" viewBox="0 0 16 16" aria-hidden="true">
  <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
</svg>
<svg class="hb-icon hb-icon_size_m" viewBox="0 0 16 16" aria-hidden="true">
  <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
</svg>
<svg class="hb-icon hb-icon_size_l" viewBox="0 0 16 16" aria-hidden="true">
  <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
</svg>
<svg class="hb-icon hb-icon_size_xl" viewBox="0 0 16 16" aria-hidden="true">
  <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
</svg>
```

## Color

Icons inherit text color by default, so color is usually controlled by a parent text role or button view.

```html demo
<span class="hb-text hb-text_color_danger">
  <svg class="hb-icon" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
  </svg>
</span>
<span class="hb-text hb-text_color_positive">
  <svg class="hb-icon" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
  </svg>
</span>
<span class="hb-text hb-text_color_hint">
  <svg class="hb-icon" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
  </svg>
</span>
```

## Composition

```html demo
<button type="button" class="hb-button hb-button_view_action">
  <svg class="hb-icon" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
  </svg>
  Starred
</button>
<button type="button" class="hb-button hb-button_view_outlined" aria-label="Star">
  <svg class="hb-icon hb-icon_size_s" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
  </svg>
</button>
```

## Modifiers

| Modifier         | Values                    | Default | Purpose        |
| ---------------- | ------------------------- | ------- | -------------- |
| `hb-icon_size_*` | `xs`, `s`, `m`, `l`, `xl` | `m`     | Icon box size. |

## Public Tokens

| Token             | Controls               |
| ----------------- | ---------------------- |
| `--hb-icon-size`  | Icon width and height. |
| `--hb-icon-color` | Icon color.            |

```html demo
<svg
  class="hb-icon"
  style="--hb-icon-size: 40px; --hb-icon-color: var(--hb-color-text-warning)"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path fill="currentColor" d="M8 1.2l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.1l-3.9 2.1.8-4.4-3.2-3 4.4-.6z" />
</svg>
```

## Limits

The block does not normalize SVG path style, load icon sets, or define accessible names. Decorative icons should be `aria-hidden="true"`; meaningful icon-only controls need labels on the host control.
