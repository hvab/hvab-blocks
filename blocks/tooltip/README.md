# Tooltip

Overlay skin for a small contextual hint. The block styles the bubble, optional arrow, visibility state, and side-dependent arrow placement. Positioning, mounting, delay, collision handling, and `aria-describedby` wiring stay in the consumer or a positioning library such as Floating UI.

## Usage

Render a tooltip near its anchor and position it from consumer code. Use `role="tooltip"` and connect it to the trigger with `aria-describedby` when the tooltip describes a control.

```html
<button type="button" class="hb-button hb-button_view_outlined" aria-describedby="save-tip">Save</button>
<span id="save-tip" class="hb-tooltip" role="tooltip" data-side="top">
  Saves the current draft
  <span class="hb-tooltip__arrow"></span>
</span>
```

## Anatomy

| Part                 | Required | Purpose                                             |
| -------------------- | -------- | --------------------------------------------------- |
| `.hb-tooltip`        | Yes      | Tooltip bubble.                                     |
| `.hb-tooltip__arrow` | No       | Side-aware arrow. Requires `data-side` on the root. |

```html demo
<span class="hb-tooltip" role="tooltip">Tooltip without arrow</span>
<span class="hb-tooltip" role="tooltip" data-side="top">
  Tooltip with arrow
  <span class="hb-tooltip__arrow"></span>
</span>
```

## Side

`data-side` describes the side where the tooltip content is placed relative to the trigger. The arrow is drawn on the opposite edge of the bubble.

```html demo
<span class="hb-tooltip" role="tooltip" data-side="top">Top<span class="hb-tooltip__arrow"></span></span>
<span class="hb-tooltip" role="tooltip" data-side="right">Right<span class="hb-tooltip__arrow"></span></span>
<span class="hb-tooltip" role="tooltip" data-side="bottom">Bottom<span class="hb-tooltip__arrow"></span></span>
<span class="hb-tooltip" role="tooltip" data-side="left">Left<span class="hb-tooltip__arrow"></span></span>
```

## States

| State  | Markup                              | Notes                                                                           |
| ------ | ----------------------------------- | ------------------------------------------------------------------------------- |
| Open   | no attribute or `data-state="open"` | The tooltip is visible by default.                                              |
| Closed | `data-state="closed"`               | Sets `visibility: hidden` and `opacity: 0`. Consumers may also unmount instead. |

```html demo
<span class="hb-tooltip" role="tooltip" data-state="open">Open</span>
<span class="hb-tooltip" role="tooltip" data-state="closed">Closed</span>
```

## Public Tokens

Override public tokens on the tooltip itself or on an ancestor. Do not set private `--_tooltip-*` variables from consumer code.

| Token                         | Controls                           |
| ----------------------------- | ---------------------------------- |
| `--hb-tooltip-max-width`      | Maximum bubble width.              |
| `--hb-tooltip-padding-block`  | Block padding.                     |
| `--hb-tooltip-padding-inline` | Inline padding.                    |
| `--hb-tooltip-radius`         | Border radius.                     |
| `--hb-tooltip-font-size`      | Font size.                         |
| `--hb-tooltip-line`           | Line height.                       |
| `--hb-tooltip-font-weight`    | Font weight.                       |
| `--hb-tooltip-text-color`     | Text color.                        |
| `--hb-tooltip-background`     | Bubble and arrow background.       |
| `--hb-tooltip-shadow`         | Bubble shadow.                     |
| `--hb-tooltip-arrow-size`     | Arrow square size before rotation. |
| `--hb-tooltip-visibility`     | Visibility value.                  |
| `--hb-tooltip-opacity`        | Opacity value.                     |

```html demo
<span
  class="hb-tooltip"
  role="tooltip"
  data-side="top"
  style="
    --hb-tooltip-background: var(--hb-color-text-danger);
    --hb-tooltip-text-color: var(--hb-color-text-brand-contrast);
    --hb-tooltip-radius: var(--hb-radius-l);
  "
>
  Danger background
  <span class="hb-tooltip__arrow"></span>
</span>
```

## Behavior Boundary

The tooltip block does not provide JavaScript behavior. The consumer owns:

- trigger events and delays;
- mounting and unmounting;
- coordinates, flip, shift, and collision handling;
- portal and stacking policy;
- `aria-describedby` and focus behavior.

## Visual Notes

The default surface uses the inverse brand pair: `--hb-color-base-brand` with `--hb-color-text-brand-contrast`. This keeps the tooltip distinct from the page in both light and dark schemes, so the arrow can be a simple solid diamond without a border.

The arrow center overlaps the bubble by 1px. This hides side corners and leaves only the tip outside the bubble.

## Limits

Only the brand surface is included in v1. A float-surface variant and line clamp are intentionally deferred until a real screen needs them.
