# Skeleton

Loading placeholder block. Renders a static plate by default; shimmer or pulse animation is opt-in via a modifier.

## Usage

```html demo
<div class="hb-skeleton" style="--hb-skeleton-height: 16px"></div>
```

## Sizes

Sizes set a height from the control-height scale. Useful for rectangular placeholders without a custom height.

```html demo
<div class="hb-skeleton hb-skeleton_size_xs"></div>
<div class="hb-skeleton hb-skeleton_size_s"></div>
<div class="hb-skeleton hb-skeleton_size_m"></div>
<div class="hb-skeleton hb-skeleton_size_l"></div>
<div class="hb-skeleton hb-skeleton_size_xl"></div>
```

## Variants

`circle` and `square` set `aspect-ratio: 1` and need a height from the consumer — pair them with a size modifier or `--hb-skeleton-height`. `text` mimics a line of text and centers on the line box. Its private height defaults to `1em`, including when combined with a size modifier. `--hb-skeleton-height` overrides that default; use a length (for example `12px` or `0.75em`) to keep line centering. The margins use the effective height, so a plate taller than the line has negative margins.

```html demo
<div class="hb-skeleton hb-skeleton_variant_circle hb-skeleton_size_l"></div>
<div class="hb-skeleton hb-skeleton_variant_square hb-skeleton_size_l"></div>
<div class="hb-skeleton hb-skeleton_variant_text"></div>
```

## Animation

Under `prefers-reduced-motion: reduce`, pulse on the block and gradient on `::after` stop, including custom `--hb-skeleton-animation` values. They resume with their configured animation when the preference returns to normal. The plate remains visible; loading text and announcements are consumer-owned.

```html demo
<div class="hb-skeleton hb-skeleton_animation_gradient" style="--hb-skeleton-height: 16px"></div>
<div class="hb-skeleton hb-skeleton_animation_pulse" style="--hb-skeleton-height: 16px"></div>
```

## Modifiers

| Modifier                  | Values                     | Default   | Purpose                                               |
| ------------------------- | -------------------------- | --------- | ----------------------------------------------------- |
| `hb-skeleton_size_*`      | `xs`, `s`, `m`, `l`, `xl`  | none      | Height and radius from the control-height scale.      |
| `hb-skeleton_variant_*`   | `circle`, `square`, `text` | rectangle | Shape. `circle`/`square` need a height from the host. |
| `hb-skeleton_animation_*` | `gradient`, `pulse`        | none      | Shimmer sweep or opacity pulse.                       |

## Public Tokens

| Token                         | Controls                                   |
| ----------------------------- | ------------------------------------------ |
| `--hb-skeleton-height`        | Block height, including text.              |
| `--hb-skeleton-radius`        | Corner radius.                             |
| `--hb-skeleton-background`    | Plate background.                          |
| `--hb-skeleton-shimmer-color` | Shimmer gradient color.                    |
| `--hb-skeleton-animation`     | Animation shorthand in normal motion mode. |

```html demo
<div
  class="hb-skeleton hb-skeleton_animation_gradient"
  style="--hb-skeleton-height: 16px; --hb-skeleton-background: var(--hb-color-base-info-light)"
></div>
```

The same inherited height applies to sized and text placeholders:

```html demo
<div style="--hb-skeleton-height: 12px; font-size: 16px; line-height: 24px">
  <div class="hb-skeleton hb-skeleton_size_m"></div>
  <div class="hb-skeleton hb-skeleton_variant_text"></div>
</div>
```

```html demo
<div
  class="hb-skeleton hb-skeleton_animation_pulse"
  style="--hb-skeleton-height: 16px; --hb-skeleton-animation: hb-skeleton-pulse 2s linear infinite"
></div>
```

## Limits

`circle` and `square` do not derive a height on their own — the consumer must set one via a size modifier or `--hb-skeleton-height`, otherwise the block collapses to zero height. Reduced motion disables both animations; there is no reduced-motion fallback animation.
