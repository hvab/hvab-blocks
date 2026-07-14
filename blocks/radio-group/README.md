# Radio group

Segmented group of native `input[type="radio"]` controls. Use it when exactly one option is selected from a compact set.

## Usage

```html demo
<div class="hb-radio-group hb-radio-group_size_s" role="radiogroup" aria-label="Theme">
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="theme" value="light" checked />
    <span class="hb-radio-group__content">Light</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="theme" value="dark" />
    <span class="hb-radio-group__content">Dark</span>
  </label>
</div>
```

Each option must use the same native `name`. The consumer owns its selected value and change handler.

## Compact icon-only group

Give icon-only controls accessible names on the native inputs.

```html demo
<div class="hb-radio-group hb-radio-group_size_s" role="radiogroup" aria-label="Theme">
  <label class="hb-radio-group__option">
    <input
      class="hb-radio-group__control"
      type="radio"
      name="theme-icons"
      value="light"
      checked
      aria-label="Light theme"
    />
    <span class="hb-radio-group__content" aria-hidden="true">☀</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="theme-icons" value="dark" aria-label="Dark theme" />
    <span class="hb-radio-group__content" aria-hidden="true">☾</span>
  </label>
</div>
```

## Sizes and width

```html demo
<div class="hb-radio-group hb-radio-group_size_s" role="radiogroup" aria-label="Small">
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="small" checked />
    <span class="hb-radio-group__content">One</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="small" />
    <span class="hb-radio-group__content">Two</span>
  </label>
</div>
<div class="hb-radio-group hb-radio-group_size_m" role="radiogroup" aria-label="Medium">
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="medium" checked />
    <span class="hb-radio-group__content">One</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="medium" />
    <span class="hb-radio-group__content">Two</span>
  </label>
</div>
<div class="hb-radio-group hb-radio-group_size_l" role="radiogroup" aria-label="Large">
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="large" checked />
    <span class="hb-radio-group__content">One</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="large" />
    <span class="hb-radio-group__content">Two</span>
  </label>
</div>
<div class="hb-radio-group hb-radio-group_size_xl hb-radio-group_width_max" role="radiogroup" aria-label="Full width">
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="full-width" checked />
    <span class="hb-radio-group__content">One</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="full-width" />
    <span class="hb-radio-group__content">Two</span>
  </label>
</div>
```

## States

```html demo
<div class="hb-radio-group" role="radiogroup" aria-label="Enabled state">
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="states" />
    <span class="hb-radio-group__content">Default</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="states" checked />
    <span class="hb-radio-group__content">Checked</span>
  </label>
</div>
<div class="hb-radio-group" role="radiogroup" aria-label="Disabled state">
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="disabled-states" disabled />
    <span class="hb-radio-group__content">Disabled</span>
  </label>
  <label class="hb-radio-group__option">
    <input class="hb-radio-group__control" type="radio" name="disabled-states" checked disabled />
    <span class="hb-radio-group__content">Disabled checked</span>
  </label>
</div>
```

## Modifiers

| Modifier                 | Values              | Default | Purpose                              |
| ------------------------ | ------------------- | ------- | ------------------------------------ |
| `hb-radio-group_size_*`  | `s`, `m`, `l`, `xl` | `m`     | Control height, padding, and radius. |
| `hb-radio-group_width_*` | `auto`, `max`       | `auto`  | Intrinsic or full available width.   |

## States

| State    | Markup                                              | Notes                                                                  |
| -------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| Checked  | `:checked`, `aria-checked="true"`                   | Selected option has its own border and fill.                           |
| Disabled | `disabled`, `aria-disabled="true"`, `data-disabled` | Muted option. A group can also set `aria-disabled` or `data-disabled`. |
| Focus    | `:focus-visible`                                    | Focus ring follows the native radio input.                             |

## Public tokens

| Token                                            | Controls                                |
| ------------------------------------------------ | --------------------------------------- |
| `--hb-radio-group-height`                        | Option height.                          |
| `--hb-radio-group-padding`                       | Inline option padding.                  |
| `--hb-radio-group-radius`                        | Outer option corners.                   |
| `--hb-radio-group-font-size`                     | Option font size.                       |
| `--hb-radio-group-font-weight`                   | Option font weight.                     |
| `--hb-radio-group-text-color`                    | Default text colour.                    |
| `--hb-radio-group-text-color-hover`              | Hovered option text colour.             |
| `--hb-radio-group-text-color-checked`            | Selected option text colour.            |
| `--hb-radio-group-text-color-disabled`           | Disabled option text colour.            |
| `--hb-radio-group-background`                    | Default option background.              |
| `--hb-radio-group-background-hover`              | Hovered option background.              |
| `--hb-radio-group-background-checked`            | Selected option background.             |
| `--hb-radio-group-background-disabled`           | Disabled option background.             |
| `--hb-radio-group-background-disabled-checked`   | Selected disabled option background.    |
| `--hb-radio-group-border-width`                  | Option border width.                    |
| `--hb-radio-group-border-color`                  | Default option border and separator.    |
| `--hb-radio-group-border-color-checked`          | Selected option border colour.          |
| `--hb-radio-group-border-color-disabled-checked` | Selected disabled option border colour. |
| `--hb-radio-group-content-gap`                   | Gap between inline children.            |
| `--hb-radio-group-focus-ring-width`              | Focus outline width.                    |
| `--hb-radio-group-focus-ring-color`              | Focus outline colour.                   |
| `--hb-radio-group-focus-ring-offset`             | Focus outline offset.                   |

## Limits

The block styles a compact single-choice group only. It does not manage value, keyboard behavior beyond native radio controls, validation, or a visible group label. Add a separate label or accessible `aria-label`/`aria-labelledby` to the group.
