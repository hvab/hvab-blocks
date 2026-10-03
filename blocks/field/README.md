# Field

Form field layout for label, control slot, optional addons, and message text. The block owns layout and message styling only. Native control chrome belongs to control-specific blocks such as `text-input`, `textarea`, `select`, `range-input`, `color-input`, `checkbox`, and `radio`.

## Usage

The default field layout stacks label, control, addons, and message vertically.

The control slot stretches to fill its grid column when its width is automatic. A control block with an explicit width, such as `color-input`, keeps its own width and public width overrides in either block import order. The slot class can be mixed directly onto the control or applied to a wrapper; a combined `hb-field__control hb-field__addons` wrapper still fills the column.

```html demo
<div class="hb-field">
  <label class="hb-field__label" for="theme-name">Theme name</label>
  <input class="hb-field__control hb-text-input" id="theme-name" type="text" value="My theme" />
</div>
<div class="hb-field">
  <label class="hb-field__label" for="theme-note">Description</label>
  <textarea class="hb-field__control hb-textarea" id="theme-note" rows="3" placeholder="Theme notes"></textarea>
  <p class="hb-field__message">Optional metadata for export.</p>
</div>
```

## Inline Layout

`hb-field_layout_inline` creates the sidebar-style row: label, control, addons. Messages span the full row width.

```html demo
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="font-size">Font size</label>
  <div class="hb-field__control hb-range-input">
    <input class="hb-range-input__control" id="font-size" type="range" min="14" max="24" value="18" />
  </div>
  <span class="hb-field__addons"><output>18</output></span>
</div>
<div class="hb-field hb-field_layout_inline">
  <label class="hb-field__label" for="contrast">Contrast</label>
  <input class="hb-field__control hb-text-input" id="contrast" type="text" value="#fff" aria-invalid="true" />
  <span class="hb-field__addons">
    <button type="button" class="hb-button hb-button_view_flat hb-button_size_s">Lock</button>
  </span>
  <p class="hb-field__message hb-field__message_view_warning">Low contrast with the background.</p>
</div>
```

## Messages

Message views are visual only. Put the actual invalid state on the control with `aria-invalid="true"`.

```html demo
<div class="hb-field">
  <label class="hb-field__label" for="folder">Theme folder</label>
  <input class="hb-field__control hb-text-input" id="folder" type="text" value="bad name!" aria-invalid="true" />
  <p class="hb-field__message hb-field__message_view_error">Use latin letters, numbers, and hyphens only.</p>
</div>
<div class="hb-field">
  <label class="hb-field__label" for="token">Token name</label>
  <input class="hb-field__control hb-text-input" id="token" type="text" value="accent" />
  <p class="hb-field__message hb-field__message_view_warning">This token shadows a local override.</p>
</div>
```

## Anatomy

| Part                 | Required    | Purpose                                        |
| -------------------- | ----------- | ---------------------------------------------- |
| `.hb-field`          | Yes         | Field root.                                    |
| `.hb-field__label`   | Recommended | Label or label-like text.                      |
| `.hb-field__control` | Recommended | Slot class on the real control or its wrapper. |
| `.hb-field__addons`  | No          | Inline actions, values, or secondary controls. |
| `.hb-field__message` | No          | Help, warning, or error message.               |

## Modifiers

| Modifier                   | Values             | Default  | Purpose           |
| -------------------------- | ------------------ | -------- | ----------------- |
| `hb-field_layout_*`        | `inline`           | vertical | Layout direction. |
| `hb-field__message_view_*` | `error`, `warning` | neutral  | Message tone.     |

## Public Tokens

| Token                      | Controls                     |
| -------------------------- | ---------------------------- |
| `--hb-field-gap`           | Row gap in the default grid. |
| `--hb-field-column-gap`    | Column gap in inline layout. |
| `--hb-field-addons-gap`    | Gap between addon items.     |
| `--hb-field-label-width`   | Inline label column width.   |
| `--hb-field-label-color`   | Label color.                 |
| `--hb-field-label-size`    | Label font size.             |
| `--hb-field-label-line`    | Label line height.           |
| `--hb-field-message-color` | Message color.               |
| `--hb-field-message-size`  | Message font size.           |
| `--hb-field-message-line`  | Message line height.         |

```html demo
<div class="hb-field hb-field_layout_inline" style="--hb-field-label-width: 8rem">
  <label class="hb-field__label" for="compact-name">Name</label>
  <input class="hb-field__control hb-text-input" id="compact-name" type="text" value="Compact" />
</div>
```

## Limits

`field` does not validate data, connect messages with `aria-describedby`, or style the control chrome. Consumers own those semantics and behavior.
