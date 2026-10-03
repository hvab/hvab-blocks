# Checkbox

Checkbox wrapper around a native `input[type="checkbox"]`. The real input remains in the DOM and the visual box is rendered with CSS.

## Usage

```html demo
<label class="hb-checkbox">
  <input class="hb-checkbox__control" type="checkbox" />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">Enable option</span>
</label>
```

## Sizes

```html demo
<label class="hb-checkbox hb-checkbox_size_m">
  <input class="hb-checkbox__control" type="checkbox" />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">size m</span>
</label>
<label class="hb-checkbox hb-checkbox_size_l">
  <input class="hb-checkbox__control" type="checkbox" checked />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">size l</span>
</label>
<label class="hb-checkbox hb-checkbox_size_xl">
  <input class="hb-checkbox__control" type="checkbox" checked />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">size xl</span>
</label>
```

## States

```html demo
<label class="hb-checkbox">
  <input class="hb-checkbox__control" type="checkbox" />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">Default</span>
</label>
<label class="hb-checkbox">
  <input class="hb-checkbox__control" type="checkbox" checked />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">Checked</span>
</label>
<label class="hb-checkbox">
  <input class="hb-checkbox__control" type="checkbox" aria-checked="mixed" />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">Mixed</span>
</label>
<label class="hb-checkbox">
  <input class="hb-checkbox__control" type="checkbox" disabled />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">Disabled</span>
</label>
```

## Icon Only

```html demo
<label class="hb-checkbox" aria-label="Lock">
  <input class="hb-checkbox__control" type="checkbox" checked />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
</label>
```

## Modifiers

| Modifier             | Values         | Default | Purpose                      |
| -------------------- | -------------- | ------- | ---------------------------- |
| `hb-checkbox_size_*` | `m`, `l`, `xl` | `m`     | Box size and `xl` text size. |

## States

| State    | Markup                                                    | Notes                                                                         |
| -------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Checked  | `:checked`, `aria-checked="true"`, `data-state="checked"` | Brand fill with check icon.                                                   |
| Mixed    | `aria-checked="mixed"`, `data-state="indeterminate"`      | Brand fill with minus icon. Native `indeterminate` must be set by JavaScript. |
| Disabled | `disabled`, `aria-disabled="true"`, `data-disabled`       | Muted text and box.                                                           |

## Public Tokens

| Token                             | Controls                   |
| --------------------------------- | -------------------------- |
| `--hb-checkbox-box-size`          | Box size.                  |
| `--hb-checkbox-radius`            | Box border radius.         |
| `--hb-checkbox-gap`               | Gap between box and label. |
| `--hb-checkbox-text-color`        | Label color.               |
| `--hb-checkbox-text-size`         | Label font size.           |
| `--hb-checkbox-text-line`         | Label line height.         |
| `--hb-checkbox-box-background`    | Box background.            |
| `--hb-checkbox-box-border-width`  | Box border width.          |
| `--hb-checkbox-box-border-color`  | Box border color.          |
| `--hb-checkbox-icon-color`        | Check or mixed icon color. |
| `--hb-checkbox-focus-ring-width`  | Focus outline width.       |
| `--hb-checkbox-focus-ring-color`  | Focus outline color.       |
| `--hb-checkbox-focus-ring-offset` | Focus outline offset.      |

```html demo
<label class="hb-checkbox" style="--hb-checkbox-box-size: 28px; --hb-checkbox-radius: 999px">
  <input class="hb-checkbox__control" type="checkbox" checked />
  <span class="hb-checkbox__box" aria-hidden="true"></span>
  <span class="hb-checkbox__label">Round 28px</span>
</label>
```

## Forced Colors

In `forced-colors: active`, the custom indicator uses system foreground and surface colors, with `GrayText` for disabled states and a system focus ring. Unchecked boxes have no tick; checked and mixed boxes keep distinct tick and minus marks.

Only the indicator paint surface uses `forced-color-adjust: none`; the native input and label retain automatic color adjustment. Native semantics, label activation and geometry tokens remain available. Public color overrides still win on the custom surface: consumers supplying them in this mode should use paired system colors to preserve the user's contrast palette. ARIA/data attributes still require the consumer to synchronize native state and enforce disabled behavior.

## Limits

The block does not manage group state, form validation, or native `indeterminate`. Consumers own those behaviors.
