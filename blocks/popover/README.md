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
