# Progress

Static progress bar: a track with a fill sized by a public value token. The block does not compute progress — the consumer sets the value and mirrors it into ARIA attributes.

## Usage

```html demo
<div
  class="hb-progress"
  role="progressbar"
  aria-label="Theme export"
  aria-valuenow="42"
  aria-valuemin="0"
  aria-valuemax="100"
  style="--hb-progress-value: 42%"
>
  <div class="hb-progress__item"></div>
</div>
```

## Sizes

```html demo
<div class="hb-progress hb-progress_size_xs" style="--hb-progress-value: 60%">
  <div class="hb-progress__item"></div>
</div>
<div class="hb-progress hb-progress_size_s" style="--hb-progress-value: 60%"><div class="hb-progress__item"></div></div>
<div class="hb-progress hb-progress_size_m" style="--hb-progress-value: 60%"><div class="hb-progress__item"></div></div>
```

## Themes

```html demo
<div class="hb-progress hb-progress_theme_info" style="--hb-progress-value: 50%">
  <div class="hb-progress__item"></div>
</div>
<div class="hb-progress hb-progress_theme_success" style="--hb-progress-value: 70%">
  <div class="hb-progress__item"></div>
</div>
<div class="hb-progress hb-progress_theme_warning" style="--hb-progress-value: 40%">
  <div class="hb-progress__item"></div>
</div>
<div class="hb-progress hb-progress_theme_danger" style="--hb-progress-value: 20%">
  <div class="hb-progress__item"></div>
</div>
```

## State Examples

Loading marks an indeterminate progress with a moving stripe fill. Pair it with `aria-busy="true"` since the numeric value is not meaningful while loading.

```html demo
<div
  class="hb-progress"
  role="progressbar"
  aria-label="Theme export"
  data-loading
  aria-busy="true"
  style="--hb-progress-value: 100%"
>
  <div class="hb-progress__item"></div>
</div>
```

## Modifiers

| Modifier              | Values                                 | Default | Purpose          |
| --------------------- | -------------------------------------- | ------- | ---------------- |
| `hb-progress_size_*`  | `xs`, `s`, `m`                         | `s`     | Track height.    |
| `hb-progress_theme_*` | `info`, `success`, `warning`, `danger` | neutral | Fill color role. |

## States

| State   | Markup                                 | Notes                                                                            |
| ------- | -------------------------------------- | -------------------------------------------------------------------------------- |
| Loading | `[data-loading]`, `[aria-busy="true"]` | Striped animation over the fill; pauses on reduced motion via `--hb-duration-*`. |

## Public Tokens

| Token                                 | Controls                                          |
| ------------------------------------- | ------------------------------------------------- |
| `--hb-progress-height`                | Track height.                                     |
| `--hb-progress-radius`                | Track and fill corner radius.                     |
| `--hb-progress-track-background`      | Track background.                                 |
| `--hb-progress-value`                 | Fill width (set by the consumer).                 |
| `--hb-progress-fill-background`       | Fill color.                                       |
| `--hb-progress-fill-background-image` | Fill background image (loading stripes use this). |
| `--hb-progress-fill-animation`        | Fill animation shorthand.                         |

```html demo
<div class="hb-progress" style="--hb-progress-value: 65%; --hb-progress-fill-background: var(--hb-color-text-positive)">
  <div class="hb-progress__item"></div>
</div>
```

## Limits

The block renders a single fill segment; multi-segment/stacked progress and an in-bar text label are not provided. `aria-valuenow`/`aria-valuemin`/`aria-valuemax` are the consumer's responsibility.
