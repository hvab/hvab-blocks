# Dialog

Content layout for a modal: header, body, footer, and an optional close slot. This is a class composition, not a block-in-block import — `dialog` is placed inside [modal](../modal/README.md)'s `hb-modal__panel`, which supplies the surface (background/radius/shadow/scroll) while `dialog` supplies the inner structure and width.

## Usage

```html demo
<div class="hb-modal__panel">
  <div class="hb-dialog">
    <div class="hb-dialog__header">
      <div class="hb-dialog__title">Delete project</div>
    </div>
    <hr class="hb-dialog__divider" />
    <div class="hb-dialog__body">This action cannot be undone. All files will be removed.</div>
    <hr class="hb-dialog__divider" />
    <div class="hb-dialog__footer">
      <button type="button" class="hb-button hb-button_view_outlined">Cancel</button>
      <button type="button" class="hb-button hb-button_view_action">Delete</button>
    </div>
  </div>
</div>
```

## With close slot

```html demo
<div class="hb-modal__panel">
  <div class="hb-dialog">
    <button type="button" class="hb-dialog__close hb-button hb-button_view_flat hb-button_size_s" aria-label="Close">
      ×
    </button>
    <div class="hb-dialog__header">
      <div class="hb-dialog__title">Invite teammates</div>
    </div>
    <div class="hb-dialog__body">Share an invite link with your team.</div>
    <div class="hb-dialog__footer">
      <button type="button" class="hb-button hb-button_view_action">Copy link</button>
    </div>
  </div>
</div>
```

## Sizes

Sizes control the dialog width; the surrounding panel width follows.

```html demo
<div class="hb-modal__panel">
  <div class="hb-dialog hb-dialog_size_s"><div class="hb-dialog__body">Size s (480px)</div></div>
</div>
<div class="hb-modal__panel">
  <div class="hb-dialog hb-dialog_size_m"><div class="hb-dialog__body">Size m (720px)</div></div>
</div>
<div class="hb-modal__panel">
  <div class="hb-dialog hb-dialog_size_l"><div class="hb-dialog__body">Size l (900px)</div></div>
</div>
```

## Modifiers

| Modifier           | Values        | Default | Purpose       |
| ------------------ | ------------- | ------- | ------------- |
| `hb-dialog_size_*` | `s`, `m`, `l` | `s`     | Dialog width. |

## Public Tokens

| Token                               | Controls                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `--hb-dialog-width`                 | Dialog width.                                                             |
| `--hb-dialog-side-padding`          | Inline padding of header/body/footer; also the divider's negative margin. |
| `--hb-dialog-header-padding-top`    | Header top padding.                                                       |
| `--hb-dialog-header-padding-bottom` | Header bottom padding.                                                    |
| `--hb-dialog-title-size`            | Title font size.                                                          |
| `--hb-dialog-title-weight`          | Title font weight.                                                        |
| `--hb-dialog-title-line`            | Title line height.                                                        |
| `--hb-dialog-title-color`           | Title color.                                                              |
| `--hb-dialog-body-padding-block`    | Body block padding.                                                       |
| `--hb-dialog-footer-padding`        | Footer padding (all sides).                                               |
| `--hb-dialog-footer-gap`            | Gap between footer buttons.                                               |
| `--hb-dialog-line-width`            | Divider thickness.                                                        |
| `--hb-dialog-line-color`            | Divider color.                                                            |
| `--hb-dialog-close-offset-block`    | Close slot offset from the top.                                           |
| `--hb-dialog-close-offset-inline`   | Close slot offset from the end edge.                                      |

```html demo
<div class="hb-modal__panel">
  <div class="hb-dialog" style="--hb-dialog-side-padding: var(--hb-gap-4)">
    <div class="hb-dialog__body">Narrow side padding</div>
  </div>
</div>
```

## Limits

No sticky header/footer while the body scrolls — deferred. The `dialog`/`aria-modal` role placement (on `hb-modal__panel` or on `hb-dialog`) is a consumer decision.
