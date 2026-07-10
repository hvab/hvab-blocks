# Card

Container surface: background, border, shadow, radius, and default padding. Content and inner layout are owned by the consumer.

## Usage

The unmodified block is the `outlined` view: transparent background with a generic border.

```html demo
<div class="hb-card">Outlined card content.</div>
```

## Views

```html demo
<div class="hb-card">Outlined</div>
<div class="hb-card hb-card_view_filled">Filled</div>
<div class="hb-card hb-card_view_raised">Raised</div>
```

## Clickable

Set `[data-clickable]` when the card host is a link or button, to get hover feedback and a focus ring.

```html demo
<a class="hb-card hb-card_view_filled" href="#" data-clickable>Clickable filled card</a>
```

## Selected

```html demo
<div class="hb-card hb-card_view_filled" data-clickable aria-selected="true">Selected card</div>
```

## Modifiers

| Modifier         | Values             | Default    | Purpose                         |
| ---------------- | ------------------ | ---------- | ------------------------------- |
| `hb-card_view_*` | `filled`, `raised` | `outlined` | Background, border, and shadow. |

## States

| State     | Markup                                      | Notes                                             |
| --------- | ------------------------------------------- | ------------------------------------------------- |
| Clickable | `[data-clickable]`                          | Enables hover feedback and `:focus-visible` ring. |
| Selected  | `[aria-selected="true"]`, `[data-selected]` | Inset `line-brand` ring; does not shift layout.   |

## Public Tokens

| Token                         | Controls                        |
| ----------------------------- | ------------------------------- |
| `--hb-card-padding`           | Default padding.                |
| `--hb-card-background`        | Background color.               |
| `--hb-card-border-width`      | Border width.                   |
| `--hb-card-border-color`      | Border color.                   |
| `--hb-card-radius`            | Corner radius.                  |
| `--hb-card-ring`              | Selection ring box-shadow.      |
| `--hb-card-shadow`            | Drop shadow (used by `raised`). |
| `--hb-card-focus-ring-width`  | Focus outline width.            |
| `--hb-card-focus-ring-color`  | Focus outline color.            |
| `--hb-card-focus-ring-offset` | Focus outline offset.           |

```html demo
<div class="hb-card hb-card_view_raised" style="--hb-card-padding: 0; overflow: hidden">
  <div style="height: 64px; background: var(--hb-color-base-generic)"></div>
  <div style="padding: var(--hb-gap-4)">
    <div class="hb-text hb-text_typography_subheader-2">Card composition</div>
    <div class="hb-text hb-text_color_secondary">Inner layout stays with the consumer.</div>
  </div>
</div>
```

## Limits

No semantic themes (info/success/…) — only outlined/filled/raised. Selection styling uses ARIA/data attributes only; there is no dedicated selection-card variant.
