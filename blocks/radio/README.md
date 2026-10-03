# Radio

Radio wrapper around a native `input[type="radio"]`. The real input remains in the DOM and the visual mark is rendered with CSS.

## Usage

```html demo
<label class="hb-radio">
  <input class="hb-radio__control" type="radio" name="density" value="normal" checked />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">Normal</span>
</label>
```

## Sizes

```html demo
<label class="hb-radio hb-radio_size_m">
  <input class="hb-radio__control" type="radio" name="sizes" />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">size m</span>
</label>
<label class="hb-radio hb-radio_size_l">
  <input class="hb-radio__control" type="radio" name="sizes" checked />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">size l</span>
</label>
<label class="hb-radio hb-radio_size_xl">
  <input class="hb-radio__control" type="radio" name="sizes" />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">size xl</span>
</label>
```

## States

```html demo
<label class="hb-radio">
  <input class="hb-radio__control" type="radio" name="states" />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">Default</span>
</label>
<label class="hb-radio">
  <input class="hb-radio__control" type="radio" name="states" checked />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">Checked</span>
</label>
<label class="hb-radio">
  <input class="hb-radio__control" type="radio" name="disabled" disabled />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">Disabled</span>
</label>
```

## Group

```html demo
<div role="radiogroup" aria-label="Density" style="display: flex; flex-wrap: wrap; gap: 1rem">
  <label class="hb-radio">
    <input class="hb-radio__control" type="radio" name="density-demo" value="compact" />
    <span class="hb-radio__box" aria-hidden="true"></span>
    <span class="hb-radio__label">Compact</span>
  </label>
  <label class="hb-radio">
    <input class="hb-radio__control" type="radio" name="density-demo" value="normal" checked />
    <span class="hb-radio__box" aria-hidden="true"></span>
    <span class="hb-radio__label">Normal</span>
  </label>
  <label class="hb-radio">
    <input class="hb-radio__control" type="radio" name="density-demo" value="comfortable" />
    <span class="hb-radio__box" aria-hidden="true"></span>
    <span class="hb-radio__label">Comfortable</span>
  </label>
</div>
```

## Modifiers

| Modifier          | Values         | Default | Purpose                                   |
| ----------------- | -------------- | ------- | ----------------------------------------- |
| `hb-radio_size_*` | `m`, `l`, `xl` | `m`     | Box size, disc inset, and `xl` text size. |

## States

| State    | Markup                                                    | Notes                       |
| -------- | --------------------------------------------------------- | --------------------------- |
| Checked  | `:checked`, `aria-checked="true"`, `data-state="checked"` | Brand fill with inner disc. |
| Disabled | `disabled`, `aria-disabled="true"`, `data-disabled`       | Muted text and box.         |

## Public Tokens

| Token                          | Controls                   |
| ------------------------------ | -------------------------- |
| `--hb-radio-box-size`          | Box size.                  |
| `--hb-radio-disc-inset`        | Inner disc inset.          |
| `--hb-radio-gap`               | Gap between box and label. |
| `--hb-radio-text-color`        | Label color.               |
| `--hb-radio-text-size`         | Label font size.           |
| `--hb-radio-text-line`         | Label line height.         |
| `--hb-radio-box-background`    | Box background.            |
| `--hb-radio-box-border-width`  | Box border width.          |
| `--hb-radio-box-border-color`  | Box border color.          |
| `--hb-radio-disc-color`        | Inner disc color.          |
| `--hb-radio-focus-ring-width`  | Focus outline width.       |
| `--hb-radio-focus-ring-color`  | Focus outline color.       |
| `--hb-radio-focus-ring-offset` | Focus outline offset.      |

```html demo
<label class="hb-radio" style="--hb-radio-box-size: 28px; --hb-radio-disc-inset: 9px">
  <input class="hb-radio__control" type="radio" checked />
  <span class="hb-radio__box" aria-hidden="true"></span>
  <span class="hb-radio__label">28px</span>
</label>
```

## Forced Colors

In `forced-colors: active`, the custom indicator uses system foreground and surface colors, with `GrayText` for disabled states and a system focus ring. Unchecked circles have no dot; checked circles keep their dot.

Only the indicator paint surface uses `forced-color-adjust: none`; the native input and label retain automatic color adjustment. Native semantics, label activation and geometry tokens remain available. Public color overrides still win on the custom surface: consumers supplying them in this mode should use paired system colors to preserve the user's contrast palette. ARIA/data attributes still require the consumer to synchronize native state and enforce disabled behavior.

## Limits

The block does not create a `radiogroup`, enforce validation, or manage selected value. Native `name` grouping and any framework state stay in the consumer.
