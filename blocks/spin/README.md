# Spin

Non-interactive loading spinner. The block renders a rotating half-arc and leaves loading semantics to the consumer.

## Usage

Use `hb-spin` with the required `hb-spin__inner` element.

```html demo
<span class="hb-spin" aria-hidden="true">
  <span class="hb-spin__inner"></span>
</span>
```

When the spinner communicates loading state, set `aria-busy` or status text on the surrounding component.

```html
<button type="button" class="hb-button hb-button_view_action" aria-busy="true" data-loading>
  <span class="hb-spin hb-spin_size_xs" aria-hidden="true">
    <span class="hb-spin__inner"></span>
  </span>
  Loading
</button>
```

## Sizes

```html demo
<span class="hb-spin hb-spin_size_xs"><span class="hb-spin__inner"></span></span>
<span class="hb-spin hb-spin_size_s"><span class="hb-spin__inner"></span></span>
<span class="hb-spin hb-spin_size_m"><span class="hb-spin__inner"></span></span>
<span class="hb-spin hb-spin_size_l"><span class="hb-spin__inner"></span></span>
<span class="hb-spin hb-spin_size_xl"><span class="hb-spin__inner"></span></span>
```

## Modifiers

| Modifier         | Values                    | Default | Purpose           |
| ---------------- | ------------------------- | ------- | ----------------- |
| `hb-spin_size_*` | `xs`, `s`, `m`, `l`, `xl` | `m`     | Spinner box size. |

## Public Tokens

| Token                    | Controls          |
| ------------------------ | ----------------- |
| `--hb-spin-size`         | Spinner box size. |
| `--hb-spin-stroke-width` | Arc stroke width. |
| `--hb-spin-color`        | Arc color.        |
| `--hb-spin-period`       | Rotation period.  |
| `--hb-spin-ease`         | Rotation easing.  |
| `--hb-spin-inner-radius` | Arc end radius.   |

```html demo
<span class="hb-spin" style="--hb-spin-color: var(--hb-color-text-danger)">
  <span class="hb-spin__inner"></span>
</span>
<span class="hb-spin" style="--hb-spin-size: 48px; --hb-spin-stroke-width: 4px">
  <span class="hb-spin__inner"></span>
</span>
```

## Motion

`spin` intentionally keeps rotating even when shared motion durations are reduced. A stopped spinner reads as stuck, not loading.

## Limits

The block does not announce loading to assistive technologies by itself. The consumer owns `aria-busy`, live regions, button disabled state, and status copy.
