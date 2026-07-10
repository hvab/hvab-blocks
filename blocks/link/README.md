# Link

Chrome for a native `<a>`. Router logic and `rel`/`target` are the consumer's responsibility.

## Usage

```html demo
<a class="hb-link" href="#">Default link</a>
```

## Views

```html demo
<a class="hb-link hb-link_view_normal" href="#">Normal</a>
<a class="hb-link hb-link_view_primary" href="#">Primary</a>
<a class="hb-link hb-link_view_secondary" href="#">Secondary</a>
```

## Underline and visitable

```html demo
<a class="hb-link hb-link_underline" href="#">Underlined link</a>
<a class="hb-link hb-link_visitable" href="#">Visitable link</a>
```

## State Examples

```html demo
<a class="hb-link" aria-disabled="true">Disabled link</a>
```

## Modifiers

| Modifier            | Values                           | Default  | Purpose                   |
| ------------------- | -------------------------------- | -------- | ------------------------- |
| `hb-link_view_*`    | `normal`, `primary`, `secondary` | `normal` | Base text color role.     |
| `hb-link_underline` | flag                             | off      | Always-on text underline. |
| `hb-link_visitable` | flag                             | off      | Enables `:visited` color. |

## States

| State    | Markup                                      | Notes                                                                               |
| -------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Disabled | `[aria-disabled="true"]`, `[data-disabled]` | Hint color, `pointer-events: none`. Consumer must still remove navigation/handlers. |

## Public Tokens

| Token                                | Controls                                   |
| ------------------------------------ | ------------------------------------------ |
| `--hb-link-text-color`               | Base text color.                           |
| `--hb-link-text-decoration`          | Text decoration.                           |
| `--hb-link-radius`                   | Focus-ring corner radius.                  |
| `--hb-link-focus-ring-width`         | Focus outline width.                       |
| `--hb-link-focus-ring-color`         | Focus outline color.                       |
| `--hb-link-focus-ring-offset`        | Focus outline offset.                      |
| `--hb-link-text-color-hover`         | Hover text color.                          |
| `--hb-link-text-color-visited`       | Visited color (`hb-link_visitable`).       |
| `--hb-link-text-color-visited-hover` | Visited-hover color (`hb-link_visitable`). |

```html demo
<a class="hb-link" href="#" style="--hb-link-text-color: var(--hb-color-text-danger)">Custom color link</a>
```

## Limits

`aria-disabled`/`data-disabled` only style the link — the consumer must still remove navigation or the click handler on a disabled link. `target="_blank"`/`rel` and router-link integration are not handled by the block.
