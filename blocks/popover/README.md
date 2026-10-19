# Popover

Overlay skin for a floating content panel: menus, popovers, dropdown surfaces. Unlike `tooltip`, this is a large surface meant for arbitrary content — a bordered `base-float` panel with a shadow. Positioning, anchoring, and focus-trap behavior stay in the consumer or a positioning library such as Floating UI.

## Usage

```html demo
<div class="hb-popover">Popover content goes here.</div>
```

## Anchored Menu Composition

The consumer or positioning library owns anchor coordinates. The inline positioning below is only a static demo stand-in for Floating UI/Radix placement. The outer wrapper reserves preview space without increasing the anchor's height.

```html demo
<div style="padding-block-end: 160px">
  <div style="position: relative; display: inline-block">
    <button type="button" class="hb-button hb-button_view_outlined">Actions</button>
    <div
      class="hb-popover"
      role="menu"
      style="position: absolute; inset-block-start: calc(100% + var(--hb-gap-2)); inset-inline-start: 0"
    >
      <button type="button" class="hb-button hb-button_view_flat hb-button_size_s" role="menuitem">Rename</button>
      <button type="button" class="hb-button hb-button_view_flat hb-button_size_s" role="menuitem">Duplicate</button>
      <button type="button" class="hb-button hb-button_view_flat hb-button_size_s" role="menuitem">Export JSON</button>
    </div>
  </div>
</div>
```

## Narrow containers and long content

Fit the panel to the space available at its actual position. Flip/shift can move a panel but cannot make oversized content fit. The consumer should update the existing `--hb-popover-max-width` from the available inline space and apply a local `max-block-size` with scrolling. Reduce `--hb-popover-min-width` as well when the available width can be less than the default 160px; CSS minimum width otherwise wins over maximum width.

This static example uses a 320px by 240px positioned container with 16px gutters instead of live anchor coordinates. Its percentage limits refer to that container. In a real overlay, use the positioning boundary's available dimensions after placement, accounting for the anchor, gaps and any containing block; do not copy the fixed coordinates as collision handling. Recompute the limits when placement or available space changes.

```html demo
<div style="position: relative; width: 320px; max-width: 100%; height: 240px">
  <div
    class="hb-popover"
    role="region"
    aria-label="Export details"
    tabindex="0"
    style="
      --hb-popover-min-width: 0;
      --hb-popover-max-width: min(360px, calc(100% - 32px));
      position: absolute;
      inset-block-start: 16px;
      inset-inline-start: 16px;
      width: max-content;
      max-block-size: calc(100% - 32px);
      overflow: auto;
      overscroll-behavior: contain;
    "
  >
    <p style="margin-block-start: 0; overflow-wrap: anywhere">
      theme_configuration_production_customer_workspace_2026.json
    </p>
    <p>The export includes the current theme, saved preferences and workspace settings.</p>
    <p>Review the destination and confirm that you want to include all of these settings.</p>
    <p>Scroll to the final action. The entire explanation remains available without truncation.</p>
    <button type="button" class="hb-button hb-button_view_outlined hb-button_size_xl">Export</button>
  </div>
</div>
```

The named scroll region is keyboard focusable; tabbing to the final button also scrolls it into view. The example is a content panel, not an ARIA menu. Opening, dismissal, focus placement/return and any dialog semantics remain consumer behavior. Keep sufficient panel padding for child focus outlines, including with custom focus tokens.

Apply `overflow-wrap: anywhere` only to plain-text slots that need it. Tables, code and interactive compositions need their own overflow policy. If even a scrollable anchored panel leaves too little usable space, use a larger surface such as a dialog or sheet.

## State Examples

```html demo
<div class="hb-popover" data-state="open">Open</div>
<div class="hb-popover" data-state="closed">Closed</div>
```

## States

| State  | Markup                              | Notes                                                                           |
| ------ | ----------------------------------- | ------------------------------------------------------------------------------- |
| Open   | no attribute or `data-state="open"` | Visible by default.                                                             |
| Closed | `data-state="closed"`               | Sets `visibility: hidden` and `opacity: 0`. Consumers may also unmount instead. |

## Public Tokens

| Token                       | Controls             |
| --------------------------- | -------------------- |
| `--hb-popover-min-width`    | Minimum panel width. |
| `--hb-popover-max-width`    | Maximum panel width. |
| `--hb-popover-padding`      | Panel padding.       |
| `--hb-popover-radius`       | Corner radius.       |
| `--hb-popover-background`   | Panel background.    |
| `--hb-popover-border-width` | Border width.        |
| `--hb-popover-border-color` | Border color.        |
| `--hb-popover-shadow`       | Panel shadow.        |
| `--hb-popover-text-color`   | Panel text color.    |
| `--hb-popover-visibility`   | Visibility value.    |
| `--hb-popover-opacity`      | Opacity value.       |

```html demo
<div class="hb-popover" style="--hb-popover-max-width: 240px">Narrow popover</div>
```

## Behavior Boundary

The popover block does not provide JavaScript behavior. The consumer owns:

- anchor coordinates, flip, shift, and collision handling;
- mounting/unmounting or toggling `data-state`;
- focus-trap and keyboard dismissal;
- portal and stacking policy.

## Limits

No arrow/pointer — add one separately (following the tooltip pattern) if a screen needs it. No transform entrance animation keyed by side; only a fade between open/closed.
