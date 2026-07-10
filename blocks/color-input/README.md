# Color Input

Native color input chrome. The class is applied directly to `input[type="color"]`; the color picker UI remains browser-owned.

## Usage

```html demo
<input class="hb-color-input" type="color" value="#16181d" aria-label="Accent color" />
```

## Sizes

```html demo
<input class="hb-color-input hb-color-input_size_s" type="color" value="#16181d" aria-label="size s" />
<input class="hb-color-input hb-color-input_size_m" type="color" value="#5b57f0" aria-label="size m" />
<input class="hb-color-input hb-color-input_size_l" type="color" value="#30aa6e" aria-label="size l" />
<input class="hb-color-input hb-color-input_size_xl" type="color" value="#e9033a" aria-label="size xl" />
```

## States

```html demo
<input class="hb-color-input" type="color" value="#5b57f0" aria-label="Default" />
<input class="hb-color-input" type="color" value="#e9033a" aria-invalid="true" aria-label="Invalid" />
<input class="hb-color-input" type="color" value="#bdbdbd" disabled aria-label="Disabled" />
```

## Field Composition

```html demo
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="accent">Accent</label>
  <span class="hb-field__control hb-field__addons">
    <input class="hb-color-input" id="accent" type="color" value="#16181d" />
    <input class="hb-text-input" type="text" value="#16181d" size="8" style="width: auto" aria-label="Accent hex" />
  </span>
</div>
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="danger">Danger</label>
  <input class="hb-field__control hb-color-input" id="danger" type="color" value="#e9033a" aria-invalid="true" />
  <p class="hb-field__message hb-field__message_view_error">This color conflicts with the background.</p>
</div>
```

## Modifiers

| Modifier                | Values              | Default | Purpose                                           |
| ----------------------- | ------------------- | ------- | ------------------------------------------------- |
| `hb-color-input_size_*` | `s`, `m`, `l`, `xl` | `m`     | Control width, height, radius, and swatch radius. |

## States

| State    | Markup                             | Notes                                   |
| -------- | ---------------------------------- | --------------------------------------- |
| Invalid  | `aria-invalid="true"`              | Styles border and focus ring as danger. |
| Disabled | `disabled`, `aria-disabled="true"` | Native `disabled` also blocks input.    |
| Focus    | `:focus-visible`                   | Uses shared focus ring tokens.          |

## Public Tokens

| Token                                   | Controls                   |
| --------------------------------------- | -------------------------- |
| `--hb-color-input-control-width`        | Control width.             |
| `--hb-color-input-control-height`       | Control height.            |
| `--hb-color-input-control-padding`      | Padding around the swatch. |
| `--hb-color-input-control-radius`       | Control border radius.     |
| `--hb-color-input-control-background`   | Control background.        |
| `--hb-color-input-control-border-width` | Control border width.      |
| `--hb-color-input-control-border-color` | Control border color.      |
| `--hb-color-input-swatch-radius`        | Native swatch radius.      |
| `--hb-color-input-focus-ring-width`     | Focus outline width.       |
| `--hb-color-input-focus-ring-color`     | Focus outline color.       |
| `--hb-color-input-focus-ring-offset`    | Focus outline offset.      |

```html demo
<input
  class="hb-color-input"
  type="color"
  value="#5b57f0"
  aria-label="Wide color input"
  style="--hb-color-input-control-width: 72px; --hb-color-input-control-height: 32px"
/>
```

## Limits

The block does not provide palettes, alpha controls, format conversion, synchronization with text fields, or a custom picker popup.
