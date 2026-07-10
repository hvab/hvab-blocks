# Modal

Veil plus a centered panel. Two hosts are supported: a native `<dialog>` and a headless-lib `div`. Opening/closing, focus-trap, and scroll lock are consumer behavior. Content structure (header/body/footer/close) is the separate [dialog](../dialog/README.md) block, placed inside `__panel`.

## Usage — div host

The div host draws its own veil and centers the panel with flexbox. Open state is shown statically here with `data-state="open"` — no JS runs in this demo.

```html demo
<div class="hb-modal" data-state="open" style="position: static; height: 260px">
  <div class="hb-modal__panel">
    <div class="hb-dialog hb-dialog_size_s" role="dialog" aria-modal="true" aria-labelledby="modal-demo-title">
      <div class="hb-dialog__header">
        <div class="hb-dialog__title" id="modal-demo-title">Delete preset?</div>
      </div>
      <hr class="hb-dialog__divider" />
      <div class="hb-dialog__body">This action cannot be undone. The consumer owns dismissal and focus-trap logic.</div>
      <hr class="hb-dialog__divider" />
      <div class="hb-dialog__footer">
        <button type="button" class="hb-button hb-button_view_outlined">Cancel</button>
        <button type="button" class="hb-button hb-button_view_action">Delete</button>
      </div>
    </div>
  </div>
</div>
```

## Usage — native dialog host

The native host uses `<dialog class="hb-modal__panel">`; its veil is `::backdrop`, which the browser only paints once the consumer calls `dialog.showModal()`. The demo below shows the panel with the `open` attribute so its surface renders without JS, but the backdrop will not appear until `showModal()` runs.

```html demo
<dialog class="hb-modal__panel" open style="position: static; padding: var(--hb-gap-6)">
  Native dialog panel content.
</dialog>
```

## State Examples

```html demo
<div class="hb-modal" data-state="open" style="position: static; height: 160px">
  <div class="hb-modal__panel" style="padding: var(--hb-gap-6)">Open</div>
</div>
<div class="hb-modal" data-state="closed" style="position: static; height: 160px">
  <div class="hb-modal__panel" style="padding: var(--hb-gap-6)">Closed (invisible, kept in flow here)</div>
</div>
```

## States

| State  | Markup                                                                            | Notes                                                                           |
| ------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Open   | no attribute or `data-state="open"` (div host); native `[open]` via `showModal()` | Veil visible, panel at full scale.                                              |
| Closed | `data-state="closed"` (div host)                                                  | Veil fades out, panel scales down slightly; consumers may also unmount instead. |

## Public Tokens

| Token                         | Controls                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| `--hb-modal-visibility`       | Div-host visibility value.                                   |
| `--hb-modal-padding`          | Div-host padding around the panel; also caps panel max size. |
| `--hb-modal-veil`             | Veil color (div-host background and native `::backdrop`).    |
| `--hb-modal-opacity`          | Div-host opacity.                                            |
| `--hb-modal-panel-max-inline` | Panel max inline size.                                       |
| `--hb-modal-panel-max-block`  | Panel max block size.                                        |
| `--hb-modal-panel-text-color` | Panel text color.                                            |
| `--hb-modal-panel-background` | Panel background.                                            |
| `--hb-modal-panel-radius`     | Panel corner radius.                                         |
| `--hb-modal-panel-shadow`     | Panel shadow.                                                |
| `--hb-modal-panel-scale`      | Panel scale (used for the closed transition).                |

```html demo
<div class="hb-modal" data-state="open" style="position: static; height: 160px">
  <div class="hb-modal__panel" style="padding: var(--hb-gap-6); --hb-modal-panel-radius: var(--hb-radius-xl)">
    Larger radius
  </div>
</div>
```

## Behavior Boundary

The modal block does not provide JavaScript behavior. The consumer owns:

- opening/closing (`showModal()`/`close()` or toggling `data-state`);
- focus-trap and `Escape` dismissal;
- scroll lock for the div host (native `<dialog>` gets this from the UA);
- portal and stacking for the div host (native `<dialog>` uses the top layer).

## Limits

No fullscreen or bottom-sheet variation — for a bottom sheet see the [sheet](../sheet/README.md) block instead.
