# Label

Badge/tag for statuses, counters, and short key-value pairs. Non-interactive.

## Usage

```html demo
<span class="hb-label"><span class="hb-label__content">New</span></span>
```

Key-value pairs use `__value` after a `__separator`; the value is visually muted.

```html demo
<span class="hb-label">
  <span class="hb-label__content">Status</span><span class="hb-label__separator">:</span
  ><span class="hb-label__value">Active</span>
</span>
```

## Sizes

```html demo
<span class="hb-label hb-label_size_xs"><span class="hb-label__content">xs</span></span>
<span class="hb-label hb-label_size_s"><span class="hb-label__content">s</span></span>
<span class="hb-label hb-label_size_m"><span class="hb-label__content">m</span></span>
```

## Themes

```html demo
<span class="hb-label"><span class="hb-label__content">Normal</span></span>
<span class="hb-label hb-label_theme_info"><span class="hb-label__content">Info</span></span>
<span class="hb-label hb-label_theme_success"><span class="hb-label__content">Success</span></span>
<span class="hb-label hb-label_theme_warning"><span class="hb-label__content">Warning</span></span>
<span class="hb-label hb-label_theme_danger"><span class="hb-label__content">Danger</span></span>
<span class="hb-label hb-label_theme_unknown"><span class="hb-label__content">Unknown</span></span>
<span class="hb-label hb-label_theme_clear"><span class="hb-label__content">Clear</span></span>
```

## Modifiers

| Modifier           | Values                                                     | Default | Purpose                             |
| ------------------ | ---------------------------------------------------------- | ------- | ----------------------------------- |
| `hb-label_size_*`  | `xs`, `s`, `m`                                             | `s`     | Height, radius, and inline padding. |
| `hb-label_theme_*` | `info`, `success`, `warning`, `danger`, `unknown`, `clear` | neutral | Text and background color role.     |

## Public Tokens

| Token                       | Controls                                          |
| --------------------------- | ------------------------------------------------- |
| `--hb-label-height`         | Label height.                                     |
| `--hb-label-radius`         | Corner radius.                                    |
| `--hb-label-padding-inline` | Inline padding.                                   |
| `--hb-label-font-size`      | Font size.                                        |
| `--hb-label-text-color`     | Text color.                                       |
| `--hb-label-background`     | Background color.                                 |
| `--hb-label-border`         | Border (box-shadow-based, used by `clear` theme). |

```html demo
<span
  class="hb-label"
  style="--hb-label-background: var(--hb-color-base-brand); --hb-label-text-color: var(--hb-color-text-brand-contrast)"
  ><span class="hb-label__content">Brand</span></span
>
```

## Limits

No interactive/hover state, no close/copy addon buttons, no shimmer/loading animation. Long content is truncated with ellipsis inside `__content`/`__value`; the label itself does not wrap.
