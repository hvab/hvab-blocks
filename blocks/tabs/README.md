# Tabs

Tab list skin: `hb-tabs` is the tablist itself, `__tab` are its items (`<button role="tab">` or `<a>`). Panel switching, keyboard navigation, and `aria-controls` are consumer/headless-lib behavior — panels hide via native `hidden`.

## Usage

```html demo
<div class="hb-tabs" role="tablist" aria-label="Sections">
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="true">Overview</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Details</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">History</button>
</div>
```

## Sizes

```html demo
<div class="hb-tabs" role="tablist" aria-label="Sizes m">
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="true">m</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Tab</button>
</div>
<div class="hb-tabs hb-tabs_size_l" role="tablist" aria-label="Sizes l">
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="true">l</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Tab</button>
</div>
<div class="hb-tabs hb-tabs_size_xl" role="tablist" aria-label="Sizes xl">
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="true">xl</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Tab</button>
</div>
```

## Overflow

```html demo
<div class="hb-tabs hb-tabs_overflow_scroll" role="tablist" aria-label="Many sections" style="max-width: 240px">
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="true">Overview</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Details</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">History</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Settings</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Activity</button>
</div>
```

## State Examples

```html demo
<div class="hb-tabs" role="tablist" aria-label="States">
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="true">Active</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Idle</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false" disabled>Disabled</button>
  <a class="hb-tabs__tab" role="tab" data-state="active" href="#">Headless active</a>
</div>
```

## Modifiers

| Modifier                  | Values    | Default | Purpose                                |
| ------------------------- | --------- | ------- | -------------------------------------- |
| `hb-tabs_size_*`          | `l`, `xl` | `m`     | Item height, gap, and font size.       |
| `hb-tabs_overflow_scroll` | flag      | wrap    | Horizontal scroll instead of wrapping. |

## States

| State    | Markup                                                   | Notes                                          |
| -------- | -------------------------------------------------------- | ---------------------------------------------- |
| Active   | `[aria-selected="true"]`, `[data-state="active"]`        | Brand underline and primary text color.        |
| Disabled | `:disabled`, `[aria-disabled="true"]`, `[data-disabled]` | Hint text color, no hover/active color change. |

## Public Tokens

| Token                         | Controls                                |
| ----------------------------- | --------------------------------------- |
| `--hb-tabs-item-height`       | Tab height.                             |
| `--hb-tabs-item-gap`          | Gap between tabs.                       |
| `--hb-tabs-indicator-width`   | Active underline thickness.             |
| `--hb-tabs-indicator-color`   | Active underline color.                 |
| `--hb-tabs-line-width`        | Baseline (tablist bottom border) width. |
| `--hb-tabs-line-color`        | Baseline color.                         |
| `--hb-tabs-font-size`         | Tab font size.                          |
| `--hb-tabs-text-color`        | Idle tab text color.                    |
| `--hb-tabs-text-color-active` | Hover/active tab text color.            |
| `--hb-tabs-focus-ring-width`  | Focus outline width.                    |
| `--hb-tabs-focus-ring-color`  | Focus outline color.                    |
| `--hb-tabs-focus-ring-offset` | Focus outline offset.                   |

```html demo
<div
  class="hb-tabs"
  role="tablist"
  aria-label="Custom color"
  style="--hb-tabs-indicator-color: var(--hb-color-text-positive)"
>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="true">Active</button>
  <button type="button" class="hb-tabs__tab" role="tab" aria-selected="false">Idle</button>
</div>
```

## Limits

No `__icon`/`__counter` slots and no collapse-into-menu behavior for overflowing tabs — both deferred. Tab panels, keyboard handling, and `aria-controls` wiring are the consumer's responsibility.
