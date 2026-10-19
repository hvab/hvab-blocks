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

## Narrow containers and long content

The panel already limits its height and scrolls `.hb-sheet__content`. Compose plain text and long actions to fit the available width: allow the text to break, stack actions and give each multiline button automatic height, wrapping and block padding. These local styles do not change the ordinary single-line button contract.

```html demo
<div
  class="hb-sheet"
  data-state="open"
  style="
    --hb-button-height: var(--hb-size-control-height-xl);
    position: static;
    width: 320px;
    max-width: 100%;
    height: 280px;
  "
>
  <div class="hb-sheet__panel">
    <div class="hb-sheet__handle" aria-hidden="true"></div>
    <div class="hb-sheet__content" style="scroll-padding-block: var(--hb-gap-2)">
      <p style="overflow-wrap: anywhere">theme_configuration_production_customer_workspace_2026.json</p>
      <p>The export includes the current theme, saved preferences and workspace settings.</p>
      <p>Review the destination and confirm that you want to include all of these settings.</p>
      <div style="display: grid; gap: var(--hb-gap-2); padding-block: var(--hb-gap-2)">
        <button
          type="button"
          class="hb-button hb-button_view_outlined"
          style="
            min-width: 0;
            height: auto;
            padding-block: var(--hb-gap-2);
            line-height: 1.4;
            white-space: normal;
            overflow-wrap: anywhere;
          "
        >
          Export all theme settings and workspace preferences to the selected destination
        </button>
        <button type="button" class="hb-button hb-button_view_outlined">Cancel</button>
      </div>
    </div>
  </div>
</div>
```

The 320px by 280px static host stands in for the viewport; the panel keeps its normal maximum height and the entire content, including the last action, remains scrollable. Action padding and scroll padding leave room for default focus outlines at the scrollport edges, including when keyboard focus scrolls to a button. Adjust that space when increasing focus width/offset or changing content padding. A live sheet still needs consumer-owned dismissal, focus placement/return, appropriate dialog semantics and background scroll locking.

Wrap only plain-text slots and the actions that need multiple lines. Preserve intentional horizontal scrolling for tables or code instead of applying a blanket wrapping rule to the sheet. Existing `--hb-sheet-panel-max-block` and `--hb-sheet-content-padding-inline` overrides remain available; choose values that leave usable space for the content and controls. Safe-area padding is provided by the block; physical mobile keyboard and safe-area behavior need device-specific validation.

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
