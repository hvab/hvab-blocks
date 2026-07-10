# Hotkey

Non-interactive chip for displaying keyboard shortcuts. Use it inside copy, menus, command palettes, or shortcut references.

## Usage

Use `kbd` for keyboard input semantics. Put separators in `hb-hotkey__plus` when you want the plus sign to use the muted separator color.

```html demo
<kbd class="hb-hotkey">Cmd<span class="hb-hotkey__plus">+</span>K</kbd>
<kbd class="hb-hotkey">Ctrl<span class="hb-hotkey__plus">+</span>Shift<span class="hb-hotkey__plus">+</span>P</kbd>
<kbd class="hb-hotkey">Esc</kbd>
```

## Inline Text

```html demo
<span>
  Open the command palette with
  <kbd class="hb-hotkey">Cmd<span class="hb-hotkey__plus">+</span>K</kbd>
  and type a block name.
</span>
```

## Anatomy

| Part               | Required | Purpose                            |
| ------------------ | -------- | ---------------------------------- |
| `.hb-hotkey`       | Yes      | Shortcut chip.                     |
| `.hb-hotkey__plus` | No       | Muted separator between key names. |

## Public Tokens

| Token                        | Controls         |
| ---------------------------- | ---------------- |
| `--hb-hotkey-padding-block`  | Block padding.   |
| `--hb-hotkey-padding-inline` | Inline padding.  |
| `--hb-hotkey-radius`         | Border radius.   |
| `--hb-hotkey-font-size`      | Font size.       |
| `--hb-hotkey-line`           | Line height.     |
| `--hb-hotkey-text-color`     | Text color.      |
| `--hb-hotkey-plus-color`     | Separator color. |
| `--hb-hotkey-background`     | Chip background. |

```html demo
<kbd
  class="hb-hotkey"
  style="
    --hb-hotkey-background: var(--hb-color-base-brand);
    --hb-hotkey-text-color: var(--hb-color-text-brand-contrast);
  "
>
  Enter
</kbd>
```

## Limits

The block does not parse shortcuts, localize key names, or listen for keyboard events. It only styles already-rendered text.
