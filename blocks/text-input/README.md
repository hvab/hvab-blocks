# Text Input

Native single-line text input chrome. The class is applied directly to `input`; there is no wrapper, clear button, or JavaScript behavior in the block.

## Usage

```html demo
<input class="hb-text-input" type="text" placeholder="Theme name" />
<input class="hb-text-input" type="text" aria-label="Theme name" value="My theme" />
```

## Sizes

```html demo
<input class="hb-text-input hb-text-input_size_s" type="text" placeholder="size s" />
<input class="hb-text-input hb-text-input_size_m" type="text" placeholder="size m" />
<input class="hb-text-input hb-text-input_size_l" type="text" placeholder="size l" />
<input class="hb-text-input hb-text-input_size_xl" type="text" placeholder="size xl" />
```

## States

```html demo
<input class="hb-text-input" type="text" aria-label="Theme name (default)" value="Default" />
<input class="hb-text-input" type="text" aria-label="Theme name (invalid)" value="Invalid" aria-invalid="true" />
<input class="hb-text-input" type="text" aria-label="Theme name (disabled)" value="Disabled" disabled />
<input class="hb-text-input" type="text" placeholder="Placeholder" />
```

## Field Composition

```html demo
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="name">Theme name</label>
  <input class="hb-field__control hb-text-input" id="name" type="text" value="My theme" />
</div>
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="folder">Folder</label>
  <input class="hb-field__control hb-text-input" id="folder" type="text" value="bad name!" aria-invalid="true" />
  <p class="hb-field__message hb-field__message_view_error">Use latin letters, numbers, and hyphens only.</p>
</div>
```

## Modifiers

| Modifier               | Values              | Default | Purpose                                              |
| ---------------------- | ------------------- | ------- | ---------------------------------------------------- |
| `hb-text-input_size_*` | `s`, `m`, `l`, `xl` | `m`     | Control height, padding, radius, and `xl` font size. |

## States

| State    | Markup                             | Notes                                   |
| -------- | ---------------------------------- | --------------------------------------- |
| Invalid  | `aria-invalid="true"`              | Styles border and focus ring as danger. |
| Disabled | `disabled`, `aria-disabled="true"` | Native `disabled` also blocks input.    |
| Focus    | `:focus-visible`                   | Uses shared focus ring tokens.          |

## Public Tokens

| Token                               | Controls              |
| ----------------------------------- | --------------------- |
| `--hb-text-input-height`            | Input height.         |
| `--hb-text-input-padding`           | Inline padding.       |
| `--hb-text-input-radius`            | Border radius.        |
| `--hb-text-input-font-size`         | Font size.            |
| `--hb-text-input-text-color`        | Text color.           |
| `--hb-text-input-placeholder-color` | Placeholder color.    |
| `--hb-text-input-background`        | Background.           |
| `--hb-text-input-border-width`      | Border width.         |
| `--hb-text-input-border-color`      | Border color.         |
| `--hb-text-input-focus-ring-width`  | Focus outline width.  |
| `--hb-text-input-focus-ring-color`  | Focus outline color.  |
| `--hb-text-input-focus-ring-offset` | Focus outline offset. |

```html demo
<input
  class="hb-text-input"
  type="text"
  aria-label="Theme name (pill radius)"
  value="Pill radius"
  style="--hb-text-input-radius: 999px"
/>
```

## Limits

The block does not include a clear button, prefix/suffix icons, masking, autocomplete behavior, or validation logic.
