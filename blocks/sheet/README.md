# Sheet

Bottom sheet (typically mobile): a veil plus a panel that slides up from the bottom. Opening/closing, swipe gestures, drag-to-resize, and scroll lock are consumer behavior.

## Usage

Shown statically open here — no JS runs in this demo.

```html demo
<div class="hb-sheet" data-state="open" style="position: static; height: 280px">
  <div class="hb-sheet__panel">
    <div class="hb-sheet__handle"></div>
    <div class="hb-sheet__content">
      <div class="hb-text hb-text_typography_subheader-2" style="margin-block-end: var(--hb-gap-2)">Theme actions</div>
      <button type="button" class="hb-button hb-button_view_flat">Rename</button>
      <button type="button" class="hb-button hb-button_view_flat">Duplicate</button>
      <button type="button" class="hb-button hb-button_view_flat">Share</button>
      <button type="button" class="hb-button hb-button_view_outlined" style="margin-block-start: var(--hb-gap-3)">
        Cancel
      </button>
    </div>
  </div>
</div>
```

## Without handle

```html demo
<div class="hb-sheet" data-state="open" style="position: static; height: 160px">
  <div class="hb-sheet__panel">
    <div class="hb-sheet__content">No drag handle — the sheet is closed by other UI (e.g. a close button).</div>
  </div>
</div>
```

## State Examples

```html demo
<div class="hb-sheet" data-state="open" style="position: static; height: 160px">
  <div class="hb-sheet__panel">
    <div class="hb-sheet__handle"></div>
    <div class="hb-sheet__content">Open</div>
  </div>
</div>
<div class="hb-sheet" data-state="closed" style="position: static; height: 160px">
  <div class="hb-sheet__panel">
    <div class="hb-sheet__handle"></div>
    <div class="hb-sheet__content">Closed (translated below the fold, kept in flow here)</div>
  </div>
</div>
```

## States

| State  | Markup                              | Notes                                                                              |
| ------ | ----------------------------------- | ---------------------------------------------------------------------------------- |
| Open   | no attribute or `data-state="open"` | Veil visible, panel at rest.                                                       |
| Closed | `data-state="closed"`               | Veil fades out, panel translates down by 100%; consumers may also unmount instead. |

## Public Tokens

| Token                               | Controls                                          |
| ----------------------------------- | ------------------------------------------------- |
| `--hb-sheet-visibility`             | Visibility value.                                 |
| `--hb-sheet-veil`                   | Veil color.                                       |
| `--hb-sheet-opacity`                | Veil opacity.                                     |
| `--hb-sheet-panel-max-block`        | Panel max height.                                 |
| `--hb-sheet-panel-text-color`       | Panel text color.                                 |
| `--hb-sheet-panel-background`       | Panel background.                                 |
| `--hb-sheet-panel-radius`           | Top corner radius.                                |
| `--hb-sheet-panel-shadow`           | Panel shadow.                                     |
| `--hb-sheet-panel-shift`            | Panel vertical translate (closed transition).     |
| `--hb-sheet-handle-width`           | Handle width.                                     |
| `--hb-sheet-handle-height`          | Handle height.                                    |
| `--hb-sheet-handle-margin`          | Handle margin.                                    |
| `--hb-sheet-handle-background`      | Handle color.                                     |
| `--hb-sheet-handle-radius`          | Handle corner radius.                             |
| `--hb-sheet-content-padding-inline` | Content inline padding (combined with safe-area). |

```html demo
<div class="hb-sheet" data-state="open" style="position: static; height: 160px">
  <div class="hb-sheet__panel" style="--hb-sheet-panel-radius: var(--hb-radius-l)">
    <div class="hb-sheet__handle"></div>
    <div class="hb-sheet__content">Smaller top radius</div>
  </div>
</div>
```

## Behavior Boundary

The sheet block does not provide JavaScript behavior. The consumer owns:

- opening/closing and toggling `data-state`;
- swipe-to-dismiss and drag-to-resize gestures;
- scroll lock for the page behind the sheet;
- portal and stacking policy.

## Limits

Only a bottom sheet is provided — top/side variants and height snap points are deferred.
