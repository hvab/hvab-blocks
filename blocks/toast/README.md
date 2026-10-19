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

## Narrow containers

The region prefers 320px and shrinks to fit between both inline insets (12px by default), remaining anchored at the inline end. At a 320px viewport it is 296px wide. `--hb-toaster-width` changes the preferred maximum: smaller values remain exact when they fit; larger values still shrink to the available space. Both width and inset overrides can be inherited or set inline. Insets accept `0` and `0px` equally.

This example uses a positioned 320px container instead of the viewport so the same constraint is visible in the catalogue. `position: static` examples follow their normal containing block and do not apply the positioned insets.

```html demo
<div style="position: relative; width: 320px; max-width: 100%; height: 160px">
  <div class="hb-toaster" style="position: absolute">
    <div class="hb-toast" role="status">
      <div class="hb-toast__content">
        <div class="hb-toast__message">Changes saved within the available width.</div>
      </div>
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

## Long content

Titles and messages wrap unbroken text. A card is bounded by the dynamic viewport height minus both block insets of its toaster; its border and padding are included in that limit. Only `hb-toast__content` scrolls, including the title, message and actions. The icon and close slot stay outside this scrollport.

Block insets `0`, `0px` and `var(--hb-gap-0)` all leave the full viewport height available. Set `--hb-toaster-inset-block` on the region or an ancestor; inherited and inline overrides retain the same height policy. An explicit `--hb-toast-max-height` still replaces that default limit.

When a direct `hb-toast__close` child exists, `--hb-toast-close-space` reserves space at the content's inline end throughout scrolling. It also narrows short messages/actions; title end padding remains an independent additional inset. This keeps a transparent close button clear of the scrolling text. Coordinate the reserve with custom close sizes, close offsets and card padding; CSS cannot measure an arbitrary absolutely positioned close control. The default reserve fits the illustrated small button. Keep the close control as a direct card child, after the content in keyboard order.

The scrollport has a compensated gutter so action focus outlines remain visible without shifting the normal text position. Its default follows inherited `--hb-button-focus-ring-width` (otherwise `--hb-focus-ring-width`), with zero outline offset. Coordinate `--hb-toast-content-gutter` with nonzero focus offsets, larger element-local rings or other controls: for example, a 4px ring with a 3px offset needs a gutter of at least 7px. Button offset values `0` and `0px` both retain the default gutter.

Give a text-only scrollport `tabindex="0"` and an accessible name so keyboard users can scroll it across browsers. The examples are static: the consumer supplies dismissal, focus management and announcements. Avoid announcing an entire long document as a live status; choose appropriate semantics for the actual notification.

```html demo
<div class="hb-toaster" style="position: static">
  <div class="hb-toast" role="status">
    <div class="hb-toast__content">
      <div class="hb-toast__title">QuarterlyReportWithoutSpacesForTheEntireOrganization2026.pdf</div>
      <div class="hb-toast__message">
        https://example.org/reports/QuarterlyReportWithoutSpacesForTheEntireOrganization2026.pdf
      </div>
    </div>
    <button type="button" class="hb-toast__close hb-button hb-button_view_flat hb-button_size_s" aria-label="Close">
      ×
    </button>
  </div>
</div>
<div class="hb-toaster" style="position: static">
  <div class="hb-toast" style="--hb-toast-max-height: 240px">
    <div class="hb-toast__content" tabindex="0" role="region" aria-label="Import details">
      <div class="hb-toast__title">Import details</div>
      <div class="hb-toast__message">
        The import contains many records. Review the source, check the field mappings, and confirm the destination
        before continuing. Existing records are preserved. New records will appear after processing finishes. Large
        attachments may take longer to process. If a record needs attention, its details will appear in the import log.
        Review the final summary and download that log before closing this notification.
      </div>
      <div class="hb-toast__actions">
        <button type="button" class="hb-button hb-button_view_outlined hb-button_size_s">Download log</button>
      </div>
    </div>
    <button type="button" class="hb-toast__close hb-button hb-button_view_flat hb-button_size_s" aria-label="Close">
      ×
    </button>
  </div>
</div>
```

## Themes

Messages use `text-primary` in every theme; status tints and icon colors are unchanged. The default float surface and status tints over page/float/modal underlays support small message text in both schemes; see the [color contrast contract](../../tokens/README.md#functional-text-contrast). Custom backgrounds need their own contrast check. `--hb-toast-message-color` still overrides the default independently of the title.

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
| `--hb-toaster-inset-inline` | Minimum distance from both inline edges.          |
| `--hb-toaster-gap`          | Gap between stacked toasts.                       |
| `--hb-toaster-width`        | Preferred maximum region width (default 320px).   |

### `hb-toast`

| Token                                 | Controls                                        |
| ------------------------------------- | ----------------------------------------------- |
| `--hb-toast-max-height`               | Maximum card height (including padding/border). |
| `--hb-toast-content-gutter`           | Compensated space for content focus outlines.   |
| `--hb-toast-close-space`              | Content end reserve with a direct close slot.   |
| `--hb-toast-gap`                      | Gap between icon and content.                   |
| `--hb-toast-padding`                  | Card padding.                                   |
| `--hb-toast-text-color`               | Card text color.                                |
| `--hb-toast-background`               | Card background.                                |
| `--hb-toast-border-width`             | Card border width.                              |
| `--hb-toast-border-color`             | Card border color.                              |
| `--hb-toast-radius`                   | Card corner radius.                             |
| `--hb-toast-shadow`                   | Card shadow.                                    |
| `--hb-toast-icon-color`               | Icon color.                                     |
| `--hb-toast-title-padding-inline-end` | Title end padding (keeps clear of `__close`).   |
| `--hb-toast-title-size`               | Title font size.                                |
| `--hb-toast-title-weight`             | Title font weight.                              |
| `--hb-toast-title-line`               | Title line height.                              |
| `--hb-toast-message-size`             | Message font size.                              |
| `--hb-toast-message-line`             | Message line height.                            |
| `--hb-toast-message-color`            | Message color.                                  |
| `--hb-toast-message-indent`           | Space between title and message.                |
| `--hb-toast-actions-gap`              | Gap between action buttons.                     |
| `--hb-toast-actions-indent`           | Space above `__actions`.                        |
| `--hb-toast-close-offset-block`       | Close slot offset from the top.                 |
| `--hb-toast-close-offset-inline`      | Close slot offset from the end edge.            |

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

The height limit covers one card, not the combined stack. The consumer must limit the queue/stack to the available viewport. Outside a toaster, the default height limit uses the whole viewport; override `--hb-toast-max-height` for other containers. Explicit height overrides and excessive padding/insets can exceed the available screen space and need consumer validation.

Only the bottom-end corner is positioned by default — corner variants via modifiers, a separate mobile full-width variant, and built-in entrance keyframes are deferred. Width fitting uses the toaster's containing block; an ancestor that establishes a fixed-position containing block changes that boundary. Excessive inline insets or card padding can leave insufficient space and need consumer validation.
