# Textarea

Native multiline textarea chrome. The class is applied directly to `textarea`; auto-resize and counters stay in the consumer.

## Usage

```html demo
<textarea class="hb-textarea" rows="3" placeholder="Theme notes"></textarea>
<textarea class="hb-textarea" rows="3" aria-label="Theme notes">Existing multiline value</textarea>
```

## Sizes

```html demo
<textarea class="hb-textarea hb-textarea_size_s" rows="2" placeholder="size s"></textarea>
<textarea class="hb-textarea hb-textarea_size_m" rows="2" aria-label="Theme notes (size m)">size m</textarea>
<textarea class="hb-textarea hb-textarea_size_l" rows="2" aria-label="Theme notes (size l)">size l</textarea>
<textarea class="hb-textarea hb-textarea_size_xl" rows="2" aria-label="Theme notes (size xl)">size xl</textarea>
```

## Resize

```html demo
<textarea class="hb-textarea hb-textarea_resize_none" rows="2" aria-label="Theme notes">resize none</textarea>
<textarea class="hb-textarea hb-textarea_resize_vertical" rows="2" aria-label="Theme notes">resize vertical</textarea>
<textarea class="hb-textarea hb-textarea_resize_horizontal" rows="2" aria-label="Notes">resize horizontal</textarea>
<textarea class="hb-textarea hb-textarea_resize_both" rows="2" aria-label="Theme notes">resize both</textarea>
```

## States

```html demo
<textarea class="hb-textarea" rows="3" placeholder="Default"></textarea>
<textarea class="hb-textarea" rows="3" aria-label="Theme notes (invalid)" aria-invalid="true">Invalid value</textarea>
<textarea class="hb-textarea" rows="3" aria-label="Theme notes (readonly)" readonly>Readonly value</textarea>
<textarea class="hb-textarea" rows="3" aria-label="Theme notes (disabled)" disabled>Disabled value</textarea>
```

## Field Composition

```html demo
<div class="hb-field">
  <label class="hb-field__label" for="theme-note">Description</label>
  <textarea
    class="hb-field__control hb-textarea"
    id="theme-note"
    rows="4"
    placeholder="For README or export"
  ></textarea>
  <p class="hb-field__message">Multiline text without JavaScript auto-resize.</p>
</div>
<div class="hb-field">
  <label class="hb-field__label" for="css-note">CSS comment</label>
  <textarea class="hb-field__control hb-textarea hb-textarea_resize_none" id="css-note" rows="3" aria-invalid="true">
Required before export.</textarea
  >
  <p class="hb-field__message hb-field__message_view_error">This field is required.</p>
</div>
```

## Modifiers

| Modifier               | Values                                   | Default    | Purpose                                              |
| ---------------------- | ---------------------------------------- | ---------- | ---------------------------------------------------- |
| `hb-textarea_size_*`   | `s`, `m`, `l`, `xl`                      | `m`        | Minimum height, padding, radius, and `xl` font size. |
| `hb-textarea_resize_*` | `none`, `vertical`, `horizontal`, `both` | `vertical` | Native resize behavior.                              |

## States

| State    | Markup                             | Notes                                     |
| -------- | ---------------------------------- | ----------------------------------------- |
| Invalid  | `aria-invalid="true"`              | Styles border and focus ring as danger.   |
| Disabled | `disabled`, `aria-disabled="true"` | Native `disabled` also blocks input.      |
| Readonly | `readonly`                         | Native behavior; no special visual state. |
| Focus    | `:focus-visible`                   | Uses shared focus ring tokens.            |

## Public Tokens

| Token                             | Controls              |
| --------------------------------- | --------------------- |
| `--hb-textarea-min-height`        | Minimum height.       |
| `--hb-textarea-padding-inline`    | Inline padding.       |
| `--hb-textarea-padding-block`     | Block padding.        |
| `--hb-textarea-radius`            | Border radius.        |
| `--hb-textarea-font-size`         | Font size.            |
| `--hb-textarea-line`              | Line height.          |
| `--hb-textarea-text-color`        | Text color.           |
| `--hb-textarea-placeholder-color` | Placeholder color.    |
| `--hb-textarea-background`        | Background.           |
| `--hb-textarea-border-width`      | Border width.         |
| `--hb-textarea-border-color`      | Border color.         |
| `--hb-textarea-focus-ring-width`  | Focus outline width.  |
| `--hb-textarea-focus-ring-color`  | Focus outline color.  |
| `--hb-textarea-focus-ring-offset` | Focus outline offset. |
| `--hb-textarea-resize`            | Native resize value.  |

```html demo
<textarea
  class="hb-textarea"
  rows="2"
  aria-label="Theme notes (custom height)"
  style="--hb-textarea-min-height: 12rem; --hb-textarea-resize: none"
>
Custom height</textarea
>
```

## Limits

The block does not auto-grow, count characters, add clear buttons, or manage validation.
