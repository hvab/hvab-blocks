# Breadcrumbs

Navigation trail with separators drawn between items. The host is an `<ol>`; wrap it in a `<nav aria-label="…">` for semantics.

## Usage

```html demo
<nav aria-label="Breadcrumb">
  <ol class="hb-breadcrumbs">
    <li class="hb-breadcrumbs__item"><a class="hb-breadcrumbs__link" href="#">Home</a></li>
    <li class="hb-breadcrumbs__item"><a class="hb-breadcrumbs__link" href="#">Blocks</a></li>
    <li class="hb-breadcrumbs__item">
      <span class="hb-breadcrumbs__link" aria-current="page">Breadcrumbs</span>
    </li>
  </ol>
</nav>
```

## State Examples

```html demo
<nav aria-label="Breadcrumb">
  <ol class="hb-breadcrumbs">
    <li class="hb-breadcrumbs__item"><a class="hb-breadcrumbs__link" href="#">Home</a></li>
    <li class="hb-breadcrumbs__item">
      <span class="hb-breadcrumbs__link" aria-disabled="true">Archived</span>
    </li>
    <li class="hb-breadcrumbs__item">
      <span class="hb-breadcrumbs__link" aria-current="page">Current</span>
    </li>
  </ol>
</nav>
```

## States

| State    | Markup                                                  | Notes                             |
| -------- | ------------------------------------------------------- | --------------------------------- |
| Current  | `[aria-current="page"]` on `__link`                     | Bold weight, no hover cursor.     |
| Disabled | `[aria-disabled="true"]`, `[data-disabled]` on `__link` | Hint text color, no hover cursor. |

## Public Tokens

| Token                                | Controls                             |
| ------------------------------------ | ------------------------------------ |
| `--hb-breadcrumbs-font-size`         | Trail font size.                     |
| `--hb-breadcrumbs-item-height`       | Item height.                         |
| `--hb-breadcrumbs-text-color`        | Base text color.                     |
| `--hb-breadcrumbs-link-color`        | Link color.                          |
| `--hb-breadcrumbs-divider`           | Separator character (CSS `content`). |
| `--hb-breadcrumbs-divider-color`     | Separator color.                     |
| `--hb-breadcrumbs-divider-gap`       | Space around the separator.          |
| `--hb-breadcrumbs-link-radius`       | Link focus-ring radius.              |
| `--hb-breadcrumbs-current-weight`    | Current item font weight.            |
| `--hb-breadcrumbs-focus-ring-width`  | Focus outline width.                 |
| `--hb-breadcrumbs-focus-ring-color`  | Focus outline color.                 |
| `--hb-breadcrumbs-focus-ring-offset` | Focus outline offset.                |

```html demo
<nav aria-label="Breadcrumb">
  <ol class="hb-breadcrumbs" style="--hb-breadcrumbs-divider: '›'">
    <li class="hb-breadcrumbs__item"><a class="hb-breadcrumbs__link" href="#">Home</a></li>
    <li class="hb-breadcrumbs__item">
      <span class="hb-breadcrumbs__link" aria-current="page">Custom divider</span>
    </li>
  </ol>
</nav>
```

## Limits

No built-in collapse for long trails — provide an overflow "…" item via consumer JS if needed; without it the trail wraps onto multiple lines.
