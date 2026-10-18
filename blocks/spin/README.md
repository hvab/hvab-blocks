# Spin

Non-interactive loading spinner. The block renders a half-arc that rotates unless the user prefers reduced motion, and leaves loading semantics to the consumer.

## Usage

Use `hb-spin` with the required `hb-spin__inner` element.

```html demo
<span class="hb-spin" aria-hidden="true">
  <span class="hb-spin__inner"></span>
</span>
```

## Loading status

Pair the decorative arc with visible status text so loading stays understandable when rotation stops. Keep the arc hidden from assistive technologies; the text conveys the state.

```html demo
<p role="status">
  <span class="hb-spin hb-spin_size_s" aria-hidden="true">
    <span class="hb-spin__inner"></span>
  </span>
  Loading results…
</p>
```

This static example shows the loading state. In an application, keep the status region mounted before updating its text when loading starts or finishes; initial page content is not a guaranteed live announcement. Set `aria-busy` on the region being updated and keep the status message outside that busy region. The consumer owns these updates.

For a loading button, retain a visible label:

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

By default, `spin` rotates once per second. `--hb-spin-period` and `--hb-spin-ease` customize ordinary rotation.

Under `prefers-reduced-motion: reduce`, a local media rule sets `animation: none`. The half-arc stays visible in its resting orientation; its size, stroke, color and layout remain unchanged. Period and easing overrides do not re-enable the animation in this mode. Turning reduced motion off starts rotation again.

The independent rotation period is not a shared transition duration. Keep this explicit guard rather than coupling the spinner to `--hb-duration-*`. Use visible loading text as in the example above; movement alone does not communicate progress or completion.

## Limits

The block does not announce loading to assistive technologies by itself. The consumer owns `aria-busy`, live regions, button disabled state, and status copy.
