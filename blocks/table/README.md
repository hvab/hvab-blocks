# Table

Static data table on native markup. `hb-table` goes on `<table>`; `__head`/`__body` on `<thead>`/`<tbody>`; `__row` on `<tr>`; `__cell` on `<th>`/`<td>`. Sorting, selection, sticky columns, and virtualization are consumer behavior — CSS only styles the resulting ARIA attributes.

## Usage

```html demo
<table class="hb-table hb-table_width_max">
  <thead class="hb-table__head">
    <tr class="hb-table__row">
      <th class="hb-table__cell">Name</th>
      <th class="hb-table__cell hb-table__cell_align_end">Size</th>
    </tr>
  </thead>
  <tbody class="hb-table__body">
    <tr class="hb-table__row">
      <td class="hb-table__cell">button.css</td>
      <td class="hb-table__cell hb-table__cell_align_end">3.1 KB</td>
    </tr>
    <tr class="hb-table__row">
      <td class="hb-table__cell">card.css</td>
      <td class="hb-table__cell hb-table__cell_align_end">1.8 KB</td>
    </tr>
  </tbody>
</table>
```

## Striped

```html demo
<table class="hb-table hb-table_width_max hb-table_striped">
  <tbody class="hb-table__body">
    <tr class="hb-table__row">
      <td class="hb-table__cell">Row one</td>
    </tr>
    <tr class="hb-table__row">
      <td class="hb-table__cell">Row two</td>
    </tr>
    <tr class="hb-table__row">
      <td class="hb-table__cell">Row three</td>
    </tr>
  </tbody>
</table>
```

## Sortable header

`[aria-sort]` on a header cell draws a direction arrow; the click handler and sort logic belong to the consumer.

```html demo
<table class="hb-table hb-table_width_max">
  <thead class="hb-table__head">
    <tr class="hb-table__row">
      <th class="hb-table__cell" aria-sort="ascending">Name</th>
      <th class="hb-table__cell" aria-sort="descending">Size</th>
      <th class="hb-table__cell">Type</th>
    </tr>
  </thead>
</table>
```

## Interactive, selected, and disabled rows

```html demo
<table class="hb-table hb-table_width_max">
  <tbody class="hb-table__body">
    <tr class="hb-table__row hb-table__row_interactive">
      <td class="hb-table__cell">Hoverable row</td>
    </tr>
    <tr class="hb-table__row" aria-selected="true">
      <td class="hb-table__cell">Selected row</td>
    </tr>
    <tr class="hb-table__row" aria-disabled="true">
      <td class="hb-table__cell">Disabled row</td>
    </tr>
  </tbody>
</table>
```

## Modifiers

| Modifier                    | Values          | Default | Purpose                             |
| --------------------------- | --------------- | ------- | ----------------------------------- |
| `hb-table_width_max`        | flag            | off     | `width: 100%`.                      |
| `hb-table_striped`          | flag            | off     | Zebra background on even body rows. |
| `hb-table__cell_align_*`    | `center`, `end` | start   | Cell text alignment.                |
| `hb-table__row_interactive` | flag            | off     | Enables row hover background.       |

## States

| State          | Markup                                          | Notes                                  |
| -------------- | ----------------------------------------------- | -------------------------------------- |
| Sort direction | `[aria-sort="ascending"\|"descending"]` on `th` | Draws a trailing arrow.                |
| Selected       | `[aria-selected="true"]` on `tr`                | Applies the selection background role. |
| Disabled       | `[aria-disabled="true"]` on `tr`                | Dims the row to 30% opacity.           |

## Public Tokens

| Token                                | Controls                               |
| ------------------------------------ | -------------------------------------- |
| `--hb-table-font-size`               | Table font size.                       |
| `--hb-table-line`                    | Table line height.                     |
| `--hb-table-text-color`              | Text color.                            |
| `--hb-table-row-background`          | Row background (base).                 |
| `--hb-table-row-opacity`             | Row opacity (used by disabled).        |
| `--hb-table-cell-padding-block`      | Cell block padding.                    |
| `--hb-table-cell-padding-inline`     | Cell inline padding.                   |
| `--hb-table-border-width`            | Cell bottom border width.              |
| `--hb-table-border-color`            | Cell bottom border color.              |
| `--hb-table-head-weight`             | Header cell font weight.               |
| `--hb-table-sort-gap`                | Gap before the sort arrow.             |
| `--hb-table-zebra-background`        | Zebra stripe background.               |
| `--hb-table-row-hover-background`    | Hover background for interactive rows. |
| `--hb-table-row-selected-background` | Selected row background.               |

```html demo
<table class="hb-table hb-table_width_max" style="--hb-table-cell-padding-inline: 4px">
  <tbody class="hb-table__body">
    <tr class="hb-table__row">
      <td class="hb-table__cell">Compact cells</td>
    </tr>
  </tbody>
</table>
```

## Limits

No sticky columns/header, no row vertical-align control, no edge-padding modifier. Column widths, virtualization, and responsive collapse are the consumer's responsibility.
