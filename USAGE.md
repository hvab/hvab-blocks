# Using hvab-blocks

`hvab-blocks` is a framework-agnostic CSS library. It provides opt-in BEM classes in the `hb-` namespace and public CSS custom properties in the `--hb-*` namespace. It does not ship JavaScript, layout primitives, or global element resets.

Use this guide to add blocks to an application. Each block's README is the source of truth for its markup, modifiers, states, public tokens, and behaviour boundary.

## Choose an integration model

| Model                | Best for                                                                               | Updates                                     |
| -------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| Dependency           | Active projects that can consume a package, Git reference, or local `file:` dependency | Update the dependency version or reference. |
| Copy-first vendoring | Long-lived projects that need to own the CSS source                                    | Re-sync explicitly with a diff.             |

Both models consume the same source CSS. There is no compiled distribution separate from `tokens/`, `blocks/`, and `index.css`.

### Dependency

Add the package to the consumer application, then import the complete bundle once from its entry point:

```jsonc
// package.json
{
  "dependencies": {
    "hvab-blocks": "file:../hvab-blocks",
  },
}
```

```js
// application entry point
import 'hvab-blocks/index.css';
```

For a selective import, load all required token files before the block CSS. A block without its token dependencies will resolve its custom properties to empty values.

```js
import 'hvab-blocks/tokens/ref.css';
import 'hvab-blocks/tokens/color.css';
import 'hvab-blocks/tokens/typography.css';
import 'hvab-blocks/tokens/radius.css';
import 'hvab-blocks/tokens/spacing.css';
import 'hvab-blocks/tokens/motion.css';
import 'hvab-blocks/tokens/size.css';
import 'hvab-blocks/tokens/focus.css';
import 'hvab-blocks/blocks/button/button.css';
```

### Copy-first vendoring

Copy `tokens/` in full, then copy only the needed `blocks/<name>/` directories. Copy `index.css` only when the consumer needs the complete catalogue; otherwise create a local entry point that imports tokens first and selected blocks second.

Keep the canonical-source comment at the top of each copied CSS file. At the time of copying, record the source version, commit, copied paths, and local deviations in the consumer repository. The full procedure and a resync template are in [VENDOR.md](VENDOR.md).

## Consumer rules

1. Keep block classes unchanged. A modifier is always chained with its block: `class="hb-button hb-button_view_action"`, never `class="hb-button_view_action"` alone.
2. Pass runtime state through native or documented attributes such as `disabled`, `aria-invalid="true"`, `aria-selected="true"`, or `data-state="open"`. Do not invent state classes.
3. Use public component tokens (`--hb-<block>-*`) for local visual overrides. Do not override private `--_<block>-*` implementation tokens, block selectors, or use `!important`.
4. Put page layout, section spacing, and application composition in the consumer stylesheet. Blocks intentionally do not own their outside layout.
5. Treat `hb-*` class names, public `--hb-*` tokens, and documented state attributes as public API. Check [CHANGELOG.md](CHANGELOG.md) before updating a dependency or resyncing a copy.
6. If a reusable capability is missing, add it upstream first and then update the dependency or copied files. A one-off vendor patch is acceptable only when it is recorded as a local deviation.

Framework wrappers may map props to block classes, attributes, and public tokens. The wrapper owns behaviour, accessibility wiring, and application state; the block owns only its CSS skin.

## Theme overrides

Load a consumer theme after the library entry point. Override semantic system tokens rather than block selectors or private component tokens.

```js
import 'hvab-blocks/index.css';
import './app-theme.css';
```

```css
/* app-theme.css */
:root,
[data-color-scheme='light'] {
  --hb-color-base-background: rgb(255 255 255);
  --hb-color-base-brand: rgb(18 24 38);
  --hb-color-base-brand-hover: rgb(36 45 64);
  --hb-color-text-brand: rgb(18 24 38);
  --hb-color-text-brand-contrast: rgb(255 255 255);
  --hb-color-line-brand: rgb(18 24 38);
}

[data-color-scheme='dark'] {
  --hb-color-base-background: rgb(12 14 18);
  --hb-color-base-brand: rgb(238 241 247);
  --hb-color-base-brand-hover: rgb(216 222 232);
  --hb-color-text-brand: rgb(238 241 247);
  --hb-color-text-brand-contrast: rgb(12 14 18);
  --hb-color-line-brand: rgb(238 241 247);
}
```

Set `data-color-scheme="light"` or `data-color-scheme="dark"` on the document root. See [tokens/README.md](tokens/README.md) for token layers, colour-scheme rules, and the optional reference layer.

## Block catalogue

Read the block README before using a block. It contains copy-paste examples and the exact supported API.

### Content and feedback

- [Alert](blocks/alert/README.md)
- [Divider](blocks/divider/README.md)
- [Hotkey](blocks/hotkey/README.md)
- [Icon](blocks/icon/README.md)
- [Label](blocks/label/README.md)
- [Progress](blocks/progress/README.md)
- [Skeleton](blocks/skeleton/README.md)
- [Spin](blocks/spin/README.md)
- [Text](blocks/text/README.md)

### Forms and actions

- [Button](blocks/button/README.md)
- [Checkbox](blocks/checkbox/README.md)
- [Color Input](blocks/color-input/README.md)
- [Field](blocks/field/README.md)
- [Link](blocks/link/README.md)
- [Radio](blocks/radio/README.md)
- [Range Input](blocks/range-input/README.md)
- [Select](blocks/select/README.md)
- [Switch](blocks/switch/README.md)
- [Text Input](blocks/text-input/README.md)
- [Textarea](blocks/textarea/README.md)

### Surfaces and navigation

- [Breadcrumbs](blocks/breadcrumbs/README.md)
- [Card](blocks/card/README.md)
- [Pagination](blocks/pagination/README.md)
- [Table](blocks/table/README.md)
- [Tabs](blocks/tabs/README.md)

### Overlays

- [Dialog](blocks/dialog/README.md)
- [Modal](blocks/modal/README.md)
- [Popover](blocks/popover/README.md)
- [Sheet](blocks/sheet/README.md)
- [Toast](blocks/toast/README.md)
- [Tooltip](blocks/tooltip/README.md)

The static HTML catalogue is available under `demo/` when running `npm start`. It is generated from the block README examples and must not be edited by hand.

## More references

- [VENDOR.md](VENDOR.md) — copy-first provenance and resync workflow.
- [tokens/README.md](tokens/README.md) — token layers and consumer theme overrides.
- [CHANGELOG.md](CHANGELOG.md) — public changes between releases.
- [AGENTS.md](AGENTS.md) and [SPEC.md](SPEC.md) — library authoring contract, not required for normal consumption.
