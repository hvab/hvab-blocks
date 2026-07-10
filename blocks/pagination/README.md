# Pagination

Row of page controls. `__item` is a native `<button>`/`<a>` (page numbers, prev/next); `__ellipsis` is a non-interactive `<span>` break. Which pages to show and click handlers are computed by the consumer.

## Usage

```html demo
<nav aria-label="Pagination" class="hb-pagination">
  <button type="button" class="hb-pagination__item" aria-label="Previous page">‹</button>
  <button type="button" class="hb-pagination__item" aria-current="page">1</button>
  <button type="button" class="hb-pagination__item">2</button>
  <button type="button" class="hb-pagination__item">3</button>
  <span class="hb-pagination__ellipsis">…</span>
  <button type="button" class="hb-pagination__item">10</button>
  <button type="button" class="hb-pagination__item" aria-label="Next page">›</button>
</nav>
```

## Sizes

```html demo
<nav aria-label="Pagination" class="hb-pagination hb-pagination_size_s">
  <button type="button" class="hb-pagination__item" aria-current="page">1</button>
  <button type="button" class="hb-pagination__item">2</button>
</nav>
<nav aria-label="Pagination" class="hb-pagination">
  <button type="button" class="hb-pagination__item" aria-current="page">1</button>
  <button type="button" class="hb-pagination__item">2</button>
</nav>
<nav aria-label="Pagination" class="hb-pagination hb-pagination_size_l">
  <button type="button" class="hb-pagination__item" aria-current="page">1</button>
  <button type="button" class="hb-pagination__item">2</button>
</nav>
<nav aria-label="Pagination" class="hb-pagination hb-pagination_size_xl">
  <button type="button" class="hb-pagination__item" aria-current="page">1</button>
  <button type="button" class="hb-pagination__item">2</button>
</nav>
```

## State Examples

```html demo
<nav aria-label="Pagination" class="hb-pagination">
  <button type="button" class="hb-pagination__item" disabled aria-label="Previous page">‹</button>
  <button type="button" class="hb-pagination__item" aria-current="page">1</button>
  <button type="button" class="hb-pagination__item">2</button>
  <button type="button" class="hb-pagination__item" aria-label="Next page">›</button>
</nav>
```

## Modifiers

| Modifier               | Values         | Default | Purpose                       |
| ---------------------- | -------------- | ------- | ----------------------------- |
| `hb-pagination_size_*` | `s`, `l`, `xl` | `m`     | Item height, padding, radius. |

## States

| State    | Markup                                                   | Notes                                 |
| -------- | -------------------------------------------------------- | ------------------------------------- |
| Current  | `[aria-current="page"]`                                  | Brand background; hover stays brand.  |
| Disabled | `:disabled`, `[aria-disabled="true"]`, `[data-disabled]` | Hint text color, no hover background. |

## Public Tokens

| Token                                   | Controls                   |
| --------------------------------------- | -------------------------- |
| `--hb-pagination-gap`                   | Gap between items.         |
| `--hb-pagination-font-size`             | Item font size.            |
| `--hb-pagination-item-height`           | Item height and min-width. |
| `--hb-pagination-item-padding`          | Item inline padding.       |
| `--hb-pagination-item-radius`           | Item corner radius.        |
| `--hb-pagination-item-color`            | Item text color.           |
| `--hb-pagination-item-background`       | Item background.           |
| `--hb-pagination-item-background-hover` | Item hover background.     |
| `--hb-pagination-ellipsis-color`        | Ellipsis text color.       |
| `--hb-pagination-focus-ring-width`      | Focus outline width.       |
| `--hb-pagination-focus-ring-color`      | Focus outline color.       |
| `--hb-pagination-focus-ring-offset`     | Focus outline offset.      |

```html demo
<nav aria-label="Pagination" class="hb-pagination" style="--hb-pagination-gap: var(--hb-gap-3)">
  <button type="button" class="hb-pagination__item" aria-current="page">1</button>
  <button type="button" class="hb-pagination__item">2</button>
</nav>
```

## Limits

No "page N of M" summary and no jump-to-page input — both deferred. Page range calculation and ellipsis placement are the consumer's responsibility.
