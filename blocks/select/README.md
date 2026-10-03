# Select

Native select chrome. The class is applied directly to `select`; the dropdown, options, keyboard behavior, and value handling remain native browser behavior.

## Usage

```html demo
<select class="hb-select" aria-label="Font">
  <option>System UI</option>
  <option>Inter</option>
  <option>Roboto</option>
</select>
```

## Sizes

```html demo
<select class="hb-select hb-select_size_s" aria-label="size s">
  <option>size s</option>
  <option>System UI</option>
</select>
<select class="hb-select hb-select_size_m" aria-label="size m">
  <option>size m</option>
  <option>System UI</option>
</select>
<select class="hb-select hb-select_size_l" aria-label="size l">
  <option>size l</option>
  <option>System UI</option>
</select>
<select class="hb-select hb-select_size_xl" aria-label="size xl">
  <option>size xl</option>
  <option>System UI</option>
</select>
```

## States

```html demo
<select class="hb-select" aria-label="Default">
  <option>Default</option>
  <option>System UI</option>
</select>
<select class="hb-select" aria-label="Invalid" aria-invalid="true">
  <option>Invalid</option>
  <option>System UI</option>
</select>
<select class="hb-select" aria-label="Disabled" disabled>
  <option>Disabled</option>
  <option>System UI</option>
</select>
```

## Field Composition

```html demo
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="font">Font</label>
  <select class="hb-field__control hb-select" id="font">
    <option>System UI</option>
    <option>Inter</option>
    <option>Roboto</option>
  </select>
</div>
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="preset">Preset</label>
  <select class="hb-field__control hb-select" id="preset" aria-invalid="true">
    <option>Not selected</option>
    <option>Default</option>
    <option>Compact</option>
  </select>
  <p class="hb-field__message hb-field__message_view_error">Choose a preset before export.</p>
</div>
```

## Modifiers

| Modifier           | Values              | Default | Purpose                                              |
| ------------------ | ------------------- | ------- | ---------------------------------------------------- |
| `hb-select_size_*` | `s`, `m`, `l`, `xl` | `m`     | Control height, padding, radius, and `xl` font size. |

## States

| State    | Markup                             | Notes                                   |
| -------- | ---------------------------------- | --------------------------------------- |
| Invalid  | `aria-invalid="true"`              | Styles border and focus ring as danger. |
| Disabled | `disabled`, `aria-disabled="true"` | Native `disabled` also blocks input.    |
| Focus    | `:focus-visible`                   | Uses shared focus ring tokens.          |

## Public Tokens

| Token                           | Controls                             |
| ------------------------------- | ------------------------------------ |
| `--hb-select-height`            | Select height.                       |
| `--hb-select-padding`           | Inline padding.                      |
| `--hb-select-arrow-reserve`     | Inline space reserved for the arrow. |
| `--hb-select-radius`            | Border radius.                       |
| `--hb-select-font-size`         | Font size.                           |
| `--hb-select-text-color`        | Text color.                          |
| `--hb-select-arrow-color`       | CSS arrow color.                     |
| `--hb-select-background`        | Background.                          |
| `--hb-select-border-width`      | Border width.                        |
| `--hb-select-border-color`      | Border color.                        |
| `--hb-select-focus-ring-width`  | Focus outline width.                 |
| `--hb-select-focus-ring-color`  | Focus outline color.                 |
| `--hb-select-focus-ring-offset` | Focus outline offset.                |
| `--hb-select-arrow-size`        | CSS arrow segment size.              |

```html demo
<select class="hb-select" aria-label="Override" style="--hb-select-radius: 999px">
  <option>Pill radius</option>
  <option>System UI</option>
</select>
```

## Forced Colors

In `forced-colors: active`, the native select appearance supplies the dropdown indicator and the custom gradient arrow is removed. Arrow color and size tokens apply to the custom arrow in ordinary mode; the browser owns the native indicator in forced colors. Geometry tokens remain available, and disabled colors use the system palette. The select retains automatic color adjustment, native keyboard behavior and semantics. `aria-disabled` alone does not prevent interaction; consumers still enforce it.

## Limits

The block does not implement a custom popup, hidden select, multi-select UI, search, clear button, or custom option rendering.
