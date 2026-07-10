# Divider

Non-interactive separator for horizontal or vertical separation. The block does not set external margins; surrounding layout owns spacing.

## Usage

Use an empty `hr` for a plain horizontal rule.

```html demo
<span>Content above</span>
<hr class="hb-divider" />
<span>Content below</span>
```

Use `role="separator"` when the host is not `hr`.

```html demo
<div class="hb-divider" role="separator">Centered label</div>
<div class="hb-divider hb-divider_align_start" role="separator">Start label</div>
<div class="hb-divider hb-divider_align_end" role="separator">End label</div>
```

## Orientation

Vertical dividers stretch inside a horizontal layout.

```html demo
<span>Left</span>
<div class="hb-divider hb-divider_orientation_vertical" role="separator"></div>
<span>Right</span>
<div class="hb-divider hb-divider_orientation_vertical" role="separator">or</div>
<span>Next</span>
```

## Modifiers

| Modifier                   | Values         | Default    | Purpose                                 |
| -------------------------- | -------------- | ---------- | --------------------------------------- |
| `hb-divider_orientation_*` | `vertical`     | horizontal | Divider direction.                      |
| `hb-divider_align_*`       | `start`, `end` | center     | Label alignment for non-empty dividers. |

## Public Tokens

| Token                      | Controls                    |
| -------------------------- | --------------------------- |
| `--hb-divider-size`        | Line thickness.             |
| `--hb-divider-color`       | Line color.                 |
| `--hb-divider-content-gap` | Gap between label and line. |

```html demo
<hr class="hb-divider" style="--hb-divider-size: 3px; --hb-divider-color: var(--hb-color-text-danger)" />
```

## Limits

The block only draws the separator. It does not add margins, section spacing, collapse behavior, or headings.
