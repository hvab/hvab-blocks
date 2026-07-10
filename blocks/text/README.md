# Text

Typography primitive for applying the shared type scale and semantic text colors to any HTML element. The consumer owns the actual tag and document outline.

## Usage

Use `hb-text` on the element that should receive library typography. Add typography and color modifiers when the inherited defaults are not enough.

```html demo
<p class="hb-text hb-text_typography_body-2">The quick brown fox jumps over the lazy dog.</p>
<strong class="hb-text hb-text_typography_subheader-2">Section title</strong>
<code class="hb-text hb-text_typography_code-inline-2">npm run demo:check</code>
```

## Typography

Typography modifiers map directly to the shared typography tokens.

```html demo
<span class="hb-text hb-text_typography_display-4">Display 4</span>
<span class="hb-text hb-text_typography_display-2">Display 2</span>
<span class="hb-text hb-text_typography_header-2">Header 2</span>
<span class="hb-text hb-text_typography_header-1">Header 1</span>
<span class="hb-text hb-text_typography_subheader-3">Subheader 3</span>
<span class="hb-text hb-text_typography_body-3">Body 3 text sample</span>
<span class="hb-text hb-text_typography_body-2">Body 2 text sample</span>
<span class="hb-text hb-text_typography_body-1">Body 1 text sample</span>
<span class="hb-text hb-text_typography_body-short">Body short text sample</span>
<span class="hb-text hb-text_typography_caption-2">Caption 2</span>
<span class="hb-text hb-text_typography_caption-1">Caption 1</span>
```

```html demo
<span class="hb-text hb-text_typography_code-3">const size = "large";</span>
<span class="hb-text hb-text_typography_code-2">const size = "medium";</span>
<span class="hb-text hb-text_typography_code-1">const size = "small";</span>
<span class="hb-text hb-text_typography_code-inline-3">npm run lint:styles</span>
<span class="hb-text hb-text_typography_code-inline-2">npm run demo:check</span>
<span class="hb-text hb-text_typography_code-inline-1">npm run format:check</span>
```

## Color

Color modifiers use semantic text roles from the color token layer.

```html demo
<span class="hb-text hb-text_color_primary">primary</span>
<span class="hb-text hb-text_color_secondary">secondary</span>
<span class="hb-text hb-text_color_hint">hint</span>
<span class="hb-text hb-text_color_brand">brand</span>
<span class="hb-text hb-text_color_info">info</span>
<span class="hb-text hb-text_color_positive">positive</span>
<span class="hb-text hb-text_color_warning">warning</span>
<span class="hb-text hb-text_color_danger">danger</span>
```

## Overflow

`hb-text_overflow_ellipsis` keeps text on one line and clips it with an ellipsis. The container must provide a width constraint.

```html demo
<span class="hb-text hb-text_typography_body-2 hb-text_overflow_ellipsis" style="max-width: 18rem">
  A very long single-line label that should be clipped with an ellipsis.
</span>
```

## Modifiers

| Modifier                    | Values                                                                                                                      | Purpose               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `hb-text_typography_*`      | `display-1..4`, `header-1..2`, `subheader-1..3`, `body-1..3`, `body-short`, `caption-1..2`, `code-1..3`, `code-inline-1..3` | Type scale role.      |
| `hb-text_color_*`           | `primary`, `secondary`, `hint`, `brand`, `info`, `positive`, `warning`, `danger`                                            | Semantic text color.  |
| `hb-text_overflow_ellipsis` | flag                                                                                                                        | Single-line ellipsis. |

## Public Tokens

| Token              | Controls     |
| ------------------ | ------------ |
| `--hb-text-size`   | Font size.   |
| `--hb-text-line`   | Line height. |
| `--hb-text-weight` | Font weight. |
| `--hb-text-family` | Font family. |
| `--hb-text-color`  | Text color.  |

```html demo
<span class="hb-text hb-text_typography_body-2" style="--hb-text-color: hotpink; --hb-text-weight: 700">
  Public token override
</span>
```

## Limits

The block does not choose semantic HTML tags. Use `h1`, `p`, `span`, `code`, or framework polymorphism in the consumer and add `hb-text` for visual treatment only.
