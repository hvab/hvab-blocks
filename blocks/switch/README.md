# Switch

Toggle switch wrapper around a native `input[type="checkbox"]`. Use it for binary on/off settings; native checkbox semantics remain available.

## Usage

```html demo
<label class="hb-switch">
  <input class="hb-switch__control" type="checkbox" />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">Enable feature</span>
</label>
```

## Sizes

```html demo
<label class="hb-switch hb-switch_size_s">
  <input class="hb-switch__control" type="checkbox" />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">size s</span>
</label>
<label class="hb-switch hb-switch_size_m">
  <input class="hb-switch__control" type="checkbox" checked />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">size m</span>
</label>
<label class="hb-switch hb-switch_size_l">
  <input class="hb-switch__control" type="checkbox" checked />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">size l</span>
</label>
```

## States

```html demo
<label class="hb-switch">
  <input class="hb-switch__control" type="checkbox" />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">Off</span>
</label>
<label class="hb-switch">
  <input class="hb-switch__control" type="checkbox" checked />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">On</span>
</label>
<label class="hb-switch">
  <input class="hb-switch__control" type="checkbox" disabled />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">Disabled</span>
</label>
<label class="hb-switch">
  <input class="hb-switch__control" type="checkbox" data-state="checked" />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">Headless checked</span>
</label>
```

## Icon Only

```html demo
<label class="hb-switch" aria-label="Dark theme">
  <input class="hb-switch__control" type="checkbox" checked />
  <span class="hb-switch__box" aria-hidden="true"></span>
</label>
```

## Modifiers

| Modifier           | Values        | Default | Purpose                           |
| ------------------ | ------------- | ------- | --------------------------------- |
| `hb-switch_size_*` | `s`, `m`, `l` | `m`     | Track, slider, and `l` text size. |

## States

| State            | Markup                                                    | Notes                                     |
| ---------------- | --------------------------------------------------------- | ----------------------------------------- |
| Checked          | `:checked`, `aria-checked="true"`, `data-state="checked"` | Brand track and shifted slider.           |
| Disabled         | `disabled`, `aria-disabled="true"`, `data-disabled`       | Muted label and disabled cursor.          |
| Checked disabled | checked plus disabled                                     | Brand track is kept with reduced opacity. |

## Public Tokens

| Token                           | Controls                      |
| ------------------------------- | ----------------------------- |
| `--hb-switch-track-width`       | Track width.                  |
| `--hb-switch-track-height`      | Track height.                 |
| `--hb-switch-track-radius`      | Track radius.                 |
| `--hb-switch-track-background`  | Track background.             |
| `--hb-switch-slider-size`       | Slider size.                  |
| `--hb-switch-slider-offset`     | Slider inset from track edge. |
| `--hb-switch-slider-background` | Slider background.            |
| `--hb-switch-slider-x`          | Slider horizontal shift.      |
| `--hb-switch-box-opacity`       | Track and slider opacity.     |
| `--hb-switch-gap`               | Gap between switch and label. |
| `--hb-switch-text-color`        | Label color.                  |
| `--hb-switch-text-size`         | Label font size.              |
| `--hb-switch-text-line`         | Label line height.            |
| `--hb-switch-focus-ring-width`  | Focus outline width.          |
| `--hb-switch-focus-ring-color`  | Focus outline color.          |
| `--hb-switch-focus-ring-offset` | Focus outline offset.         |

```html demo
<label class="hb-switch" style="--hb-switch-track-background: var(--hb-color-text-positive)">
  <input class="hb-switch__control" type="checkbox" checked />
  <span class="hb-switch__box" aria-hidden="true"></span>
  <span class="hb-switch__label">Positive track</span>
</label>
```

## Limits

The block does not provide loading state, async transitions, or setting persistence. The consumer owns state changes and announcements.
