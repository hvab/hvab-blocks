# Toast

Notification card (`hb-toast`) plus the `hb-toaster` region the consumer stacks cards into. The two classes live in one file because the region is meaningless without cards. Queueing, auto-dismiss timers, enter/exit animation, and portal/stacking are entirely the consumer's responsibility — CSS only styles the card and lays out the region.

## Usage

```html demo
<div class="hb-toaster" style="position: static">
  <div class="hb-toast" role="status">
    <div class="hb-toast__content">
      <div class="hb-toast__message">Changes saved.</div>
    </div>
  </div>
</div>
```

## With icon, title, and actions

```html demo
<div class="hb-toaster" style="position: static">
  <div class="hb-toast hb-toast_theme_success" role="status">
    <svg class="hb-toast__icon hb-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M6.5 11 3 7.5l1.1-1.1L6.5 8.8l5.4-5.4L13 4.5z" />
    </svg>
    <div class="hb-toast__content">
      <div class="hb-toast__title">Deploy succeeded</div>
      <div class="hb-toast__message">Version 1.4.0 is live.</div>
      <div class="hb-toast__actions">
        <button type="button" class="hb-button hb-button_view_outlined hb-button_size_s">View</button>
      </div>
    </div>
    <button type="button" class="hb-toast__close hb-button hb-button_view_flat hb-button_size_s" aria-label="Close">
      ×
    </button>
  </div>
</div>
```

## Themes

```html demo
<div class="hb-toaster" style="position: static">
  <div class="hb-toast hb-toast_theme_info" role="status">
    <div class="hb-toast__content"><div class="hb-toast__message">Info</div></div>
  </div>
  <div class="hb-toast hb-toast_theme_success" role="status">
    <div class="hb-toast__content"><div class="hb-toast__message">Success</div></div>
  </div>
  <div class="hb-toast hb-toast_theme_warning" role="status">
    <div class="hb-toast__content"><div class="hb-toast__message">Warning</div></div>
  </div>
  <div class="hb-toast hb-toast_theme_danger" role="status">
    <div class="hb-toast__content"><div class="hb-toast__message">Danger</div></div>
  </div>
</div>
```

## Modifiers

| Modifier           | Values                                 | Default | Purpose                                  |
| ------------------ | -------------------------------------- | ------- | ---------------------------------------- |
| `hb-toast_theme_*` | `info`, `success`, `warning`, `danger` | neutral | Tints the whole card and the icon color. |

## Public Tokens

### `hb-toaster`

| Token                       | Controls                                          |
| --------------------------- | ------------------------------------------------- |
| `--hb-toaster-inset-block`  | Distance from the block edge (bottom by default). |
| `--hb-toaster-inset-inline` | Distance from the inline edge (end by default).   |
| `--hb-toaster-gap`          | Gap between stacked toasts.                       |
| `--hb-toaster-width`        | Region width.                                     |

### `hb-toast`

| Token                                 | Controls                                      |
| ------------------------------------- | --------------------------------------------- |
| `--hb-toast-gap`                      | Gap between icon and content.                 |
| `--hb-toast-padding`                  | Card padding.                                 |
| `--hb-toast-text-color`               | Card text color.                              |
| `--hb-toast-background`               | Card background.                              |
| `--hb-toast-border-width`             | Card border width.                            |
| `--hb-toast-border-color`             | Card border color.                            |
| `--hb-toast-radius`                   | Card corner radius.                           |
| `--hb-toast-shadow`                   | Card shadow.                                  |
| `--hb-toast-icon-color`               | Icon color.                                   |
| `--hb-toast-title-padding-inline-end` | Title end padding (keeps clear of `__close`). |
| `--hb-toast-title-size`               | Title font size.                              |
| `--hb-toast-title-weight`             | Title font weight.                            |
| `--hb-toast-title-line`               | Title line height.                            |
| `--hb-toast-message-size`             | Message font size.                            |
| `--hb-toast-message-line`             | Message line height.                          |
| `--hb-toast-message-color`            | Message color.                                |
| `--hb-toast-message-indent`           | Space between title and message.              |
| `--hb-toast-actions-gap`              | Gap between action buttons.                   |
| `--hb-toast-actions-indent`           | Space above `__actions`.                      |
| `--hb-toast-close-offset-block`       | Close slot offset from the top.               |
| `--hb-toast-close-offset-inline`      | Close slot offset from the end edge.          |

## Token Override

```html demo
<div class="hb-toaster" style="position: static">
  <div class="hb-toast" role="status" style="--hb-toast-radius: var(--hb-radius-xl)">
    <div class="hb-toast__content"><div class="hb-toast__message">Larger radius</div></div>
  </div>
</div>
```

## Behavior Boundary

The toast block does not provide JavaScript behavior. The consumer owns:

- the queue and how many toasts stack at once;
- auto-dismiss timers and manual dismissal;
- enter/exit animation and mount/unmount timing;
- portal and stacking policy, and the toaster's screen corner.

## Limits

Only the bottom-end corner is positioned by default — corner variants via modifiers, a mobile full-width layout, and built-in entrance keyframes are deferred.
