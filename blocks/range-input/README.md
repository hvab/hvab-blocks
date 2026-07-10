# Range Input

Native range input chrome. The block wraps `input[type="range"]` to provide track, thumb, optional marks, and field composition without custom slider behavior.

## Usage

```html demo
<div class="hb-range-input">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="40" aria-label="Value" />
</div>
```

## Sizes

```html demo
<div class="hb-range-input hb-range-input_size_s">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="25" aria-label="size s" />
</div>
<div class="hb-range-input hb-range-input_size_m">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="40" aria-label="size m" />
</div>
<div class="hb-range-input hb-range-input_size_l">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="55" aria-label="size l" />
</div>
<div class="hb-range-input hb-range-input_size_xl">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="70" aria-label="size xl" />
</div>
```

## Marks

Native `step`, `min`, `max`, and `list` stay on the input. Labels are rendered with `datalist.hb-range-input__marks`.

```html demo
<div class="hb-range-input">
  <input
    class="hb-range-input__control"
    type="range"
    min="0"
    max="100"
    step="10"
    value="60"
    list="range-percent"
    aria-label="step 10"
  />
  <datalist class="hb-range-input__marks" id="range-percent">
    <option value="0" label="0"></option>
    <option value="50" label="50"></option>
    <option value="100" label="100"></option>
  </datalist>
</div>
```

## States

```html demo
<div class="hb-range-input">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="60" aria-label="Default" />
</div>
<div class="hb-range-input" aria-invalid="true">
  <input
    class="hb-range-input__control"
    type="range"
    min="0"
    max="100"
    value="60"
    aria-label="Invalid"
    aria-invalid="true"
  />
</div>
<div class="hb-range-input" aria-disabled="true">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="60" aria-label="Disabled" disabled />
</div>
```

## Field Composition

```html demo
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="font-size">Font size</label>
  <div class="hb-field__control hb-range-input">
    <input class="hb-range-input__control" id="font-size" type="range" min="14" max="24" value="18" />
  </div>
  <span class="hb-field__addons"><output>18</output></span>
</div>
```

## Modifiers

| Modifier                | Values              | Default | Purpose                              |
| ----------------------- | ------------------- | ------- | ------------------------------------ |
| `hb-range-input_size_*` | `s`, `m`, `l`, `xl` | `m`     | Track, thumb, and thumb border size. |

## States

| State    | Markup                                          | Notes                                                 |
| -------- | ----------------------------------------------- | ----------------------------------------------------- |
| Invalid  | `aria-invalid="true"` on root or control        | Styles track, thumb border, and focus ring as danger. |
| Disabled | `disabled` on control or `aria-disabled="true"` | Native `disabled` blocks input.                       |
| Focus    | `:focus-visible` on control                     | Focus ring is applied to the thumb.                   |

## Public Tokens

| Token                                 | Controls                       |
| ------------------------------------- | ------------------------------ |
| `--hb-range-input-track-size`         | Track thickness.               |
| `--hb-range-input-thumb-size`         | Thumb size.                    |
| `--hb-range-input-thumb-border-width` | Thumb border width.            |
| `--hb-range-input-radius`             | Track radius.                  |
| `--hb-range-input-thumb-radius`       | Thumb radius.                  |
| `--hb-range-input-track-color`        | Track color.                   |
| `--hb-range-input-track-color-hover`  | Track color on hover.          |
| `--hb-range-input-thumb-color`        | Thumb fill color.              |
| `--hb-range-input-thumb-border-color` | Thumb border color.            |
| `--hb-range-input-focus-ring-width`   | Focus outline width.           |
| `--hb-range-input-focus-ring-color`   | Focus outline color.           |
| `--hb-range-input-marks-gap`          | Gap between control and marks. |
| `--hb-range-input-mark-color`         | Mark label color.              |
| `--hb-range-input-mark-size`          | Mark label font size.          |
| `--hb-range-input-mark-line`          | Mark label line height.        |

```html demo
<div class="hb-range-input" style="--hb-range-input-thumb-size: 28px; --hb-range-input-track-size: 8px">
  <input class="hb-range-input__control" type="range" min="0" max="100" value="45" aria-label="Override" />
</div>
```

## Limits

CSS cannot read `input.value`, so dynamic fill before the thumb, `startPoint`, tooltip values, and multi-thumb ranges stay in the consumer wrapper. Native marks and `step` work without JavaScript.
