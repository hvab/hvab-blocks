# Alert

Inline notification banner (not a toast), themed by semantic role. `__icon` and `__close` are slots for `hb-icon`/`hb-spin` and a close button; their behavior belongs to the consumer.

## Usage

```html demo
<div class="hb-alert" role="alert">
  <div class="hb-alert__content">
    <div class="hb-alert__message">Changes are saved automatically.</div>
  </div>
</div>
```

## With title and icon

```html demo
<div class="hb-alert hb-alert_theme_info" role="alert">
  <svg class="hb-alert__icon hb-icon" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 4h1v1H8V5zm0 2h1v4H8V7z" />
  </svg>
  <div class="hb-alert__content">
    <div class="hb-alert__title">Heads up</div>
    <div class="hb-alert__message">A new version is available.</div>
  </div>
</div>
```

## With actions and close

```html demo
<div class="hb-alert hb-alert_theme_warning" role="alert">
  <div class="hb-alert__content">
    <div class="hb-alert__title">Storage almost full</div>
    <div class="hb-alert__message">You are using 92% of your quota.</div>
    <div class="hb-alert__actions">
      <button type="button" class="hb-button hb-button_view_outlined hb-button_size_s">Dismiss</button>
      <button type="button" class="hb-button hb-button_view_normal hb-button_size_s">Upgrade</button>
    </div>
  </div>
  <button type="button" class="hb-alert__close hb-button hb-button_view_flat hb-button_size_s" aria-label="Close">
    ×
  </button>
</div>
```

## Themes

```html demo
<div class="hb-alert" role="alert">
  <div class="hb-alert__content"><div class="hb-alert__message">Normal</div></div>
</div>
<div class="hb-alert hb-alert_theme_info" role="alert">
  <div class="hb-alert__content"><div class="hb-alert__message">Info</div></div>
</div>
<div class="hb-alert hb-alert_theme_success" role="alert">
  <div class="hb-alert__content"><div class="hb-alert__message">Success</div></div>
</div>
<div class="hb-alert hb-alert_theme_warning" role="alert">
  <div class="hb-alert__content"><div class="hb-alert__message">Warning</div></div>
</div>
<div class="hb-alert hb-alert_theme_danger" role="alert">
  <div class="hb-alert__content"><div class="hb-alert__message">Danger</div></div>
</div>
```

## Modifiers

| Modifier           | Values                                 | Default | Purpose                |
| ------------------ | -------------------------------------- | ------- | ---------------------- |
| `hb-alert_theme_*` | `info`, `success`, `warning`, `danger` | neutral | Background color role. |

## Public Tokens

| Token                       | Controls                                 |
| --------------------------- | ---------------------------------------- |
| `--hb-alert-padding-block`  | Block padding.                           |
| `--hb-alert-padding-inline` | Inline padding.                          |
| `--hb-alert-radius`         | Corner radius.                           |
| `--hb-alert-background`     | Background color.                        |
| `--hb-alert-icon-gap`       | Gap next to `__icon` and `__close`.      |
| `--hb-alert-title-indent`   | Space between `__title` and `__message`. |
| `--hb-alert-actions-indent` | Space above `__actions`.                 |
| `--hb-alert-actions-gap`    | Gap between action buttons.              |
| `--hb-alert-title-color`    | Title color.                             |
| `--hb-alert-title-size`     | Title font size.                         |
| `--hb-alert-title-weight`   | Title font weight.                       |
| `--hb-alert-title-line`     | Title line height.                       |
| `--hb-alert-message-color`  | Message color.                           |
| `--hb-alert-message-size`   | Message font size.                       |
| `--hb-alert-message-line`   | Message line height.                     |

```html demo
<div class="hb-alert" role="alert" style="--hb-alert-background: var(--hb-color-base-generic-hover)">
  <div class="hb-alert__content"><div class="hb-alert__message">Custom background</div></div>
</div>
```

## Limits

One size only — `s`/`l` variants are deferred. `__actions` lays out as wrapped inline buttons; a horizontal-only layout variant is deferred. The `role="alert"` host and any dismiss/auto-hide behavior belong to the consumer.
