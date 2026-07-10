# Button

Interactive primitive for actions and link-like actions. The block provides visual states, sizes, focus styles, and loading treatment. Behavior, routing, async state, and click handling stay in the consumer.

## Usage

Use `button` for actions and `a` for navigation. Keep the `hb-button` base class and add modifiers by chaining them with the base class.

```html demo
<button type="button" class="hb-button hb-button_view_action">Action</button>
<button type="button" class="hb-button hb-button_view_normal">Normal</button>
<button type="button" class="hb-button hb-button_view_outlined">Outlined</button>
<button type="button" class="hb-button hb-button_view_flat">Flat</button>
```

```html
<a class="hb-button hb-button_view_normal" href="/settings">Open settings</a>
```

## Anatomy

The button has no required inner elements. Inline content is laid out with `inline-flex`, so text, icons, and `hb-spin` can be composed directly.

```html demo
<button type="button" class="hb-button hb-button_view_action" data-loading aria-busy="true">
  <span class="hb-spin hb-spin_size_xs" style="--hb-spin-color: var(--hb-color-text-brand-contrast)">
    <span class="hb-spin__inner"></span>
  </span>
  Loading
</button>
```

## Modifiers

| Modifier           | Values                                 | Default | Purpose                                              |
| ------------------ | -------------------------------------- | ------- | ---------------------------------------------------- |
| `hb-button_view_*` | `normal`, `action`, `outlined`, `flat` | `flat`  | Visual priority.                                     |
| `hb-button_size_*` | `xs`, `s`, `m`, `l`, `xl`              | `m`     | Control height, padding, radius, and `xl` font size. |

```html demo
<button type="button" class="hb-button hb-button_view_normal hb-button_size_xs">xs</button>
<button type="button" class="hb-button hb-button_view_normal hb-button_size_s">s</button>
<button type="button" class="hb-button hb-button_view_normal hb-button_size_m">m</button>
<button type="button" class="hb-button hb-button_view_normal hb-button_size_l">l</button>
<button type="button" class="hb-button hb-button_view_normal hb-button_size_xl">xl</button>
```

## States

| State    | Markup                                              | Notes                                                                                                        |
| -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Disabled | `disabled`, `aria-disabled="true"`, `data-disabled` | `aria-disabled` and `data-disabled` only style the control. The consumer must block navigation or handlers.  |
| Loading  | `data-loading`, `aria-busy="true"`                  | Adds animated stripes and `cursor: progress`. The consumer decides whether loading also disables the action. |
| Focus    | `:focus-visible`                                    | Uses the shared focus ring tokens.                                                                           |
| Hover    | `:hover`                                            | Reads the view-specific hover tokens.                                                                        |

```html demo
<button type="button" class="hb-button hb-button_view_action" disabled>Native disabled</button>
<button type="button" class="hb-button hb-button_view_normal" aria-disabled="true">ARIA disabled</button>
<button type="button" class="hb-button hb-button_view_outlined" data-disabled>Data disabled</button>
```

```html demo
<button type="button" class="hb-button hb-button_view_action" data-loading>Data loading</button>
<button type="button" class="hb-button hb-button_view_normal" aria-busy="true">ARIA busy</button>
<button type="button" class="hb-button hb-button_view_normal" data-loading disabled>Loading disabled</button>
```

## Public Tokens

Override public tokens on the button itself or on an ancestor. Do not set private `--_button-*` variables from consumer code.

| Token                           | Controls                                 |
| ------------------------------- | ---------------------------------------- |
| `--hb-button-height`            | Block height.                            |
| `--hb-button-padding`           | Inline padding.                          |
| `--hb-button-radius`            | Border radius.                           |
| `--hb-button-font-size`         | Font size.                               |
| `--hb-button-gap`               | Gap between inline children.             |
| `--hb-button-text-color`        | Text color.                              |
| `--hb-button-text-color-hover`  | Text color on hover.                     |
| `--hb-button-background`        | Background color.                        |
| `--hb-button-background-hover`  | Background color on hover.               |
| `--hb-button-background-image`  | Background image layer. Used by loading. |
| `--hb-button-background-size`   | Background image size. Used by loading.  |
| `--hb-button-border-width`      | Border width.                            |
| `--hb-button-border-color`      | Border color.                            |
| `--hb-button-focus-ring-width`  | Focus outline width.                     |
| `--hb-button-focus-ring-offset` | Focus outline offset.                    |
| `--hb-button-focus-ring-color`  | Focus outline color.                     |
| `--hb-button-animation`         | Root animation. Used by loading.         |

```html demo
<button type="button" class="hb-button hb-button_view_action" style="--hb-button-radius: 999px">Pill radius</button>
<button type="button" class="hb-button hb-button_view_normal" style="--hb-button-height: 52px">Height 52</button>
```

## Limits

The block does not ship dedicated `__icon` or `__text` elements yet. Compose inline icons directly and rely on `gap`. Selected, max-width, and active-press variants are intentionally not part of v1.
