# Third-party sources and notices

## Gravity UI UIKit

`hvab-blocks` adapts CSS values and component structure from [Gravity UI UIKit](https://github.com/gravity-ui/uikit), distributed under the MIT license. The upstream notice below accompanies the adapted source alongside this project's [LICENSE](LICENSE). Preserve both files when copying tokens or blocks, including a selective subset.

### Revision evidence

- **Original catalogue (0.1.0) and segmented radio group (0.2.0):** the configured donor checkout's retained Git reflog records `c1702e6aa9fcac95537e9af0646d619e1ea0d453` (package version 7.43.0) from 2026-07-02 until its next update on 2026-10-17. This is a historical comparison baseline for the July releases. The initial hvab repository was imported as a finished tree and contains no per-port donor SHA records; the reflog and matching source structure do not establish the exact original revision of every port. Earlier ports may predate this baseline. That historical gap remains explicitly recorded, rather than assigning the current donor SHA retroactively.
- **Functional text contrast added in 0.3.0:** `7d187fd0a108edda969266f85ab33a54b13fb36e` (8.0.0-beta.2) is the recorded and rechecked value source. `styles/themes/default.generated.css` supplies light blue-800, green-800 and orange-800, dark blue-750 and green-700, and dark text-warning-heavy. Exact values and local semantic assignments are in [tokens/README.md](tokens/README.md).
- **Dialog and table audit comparisons:** the same 8.0.0-beta.2 revision was inspected as a reference. The accepted footer order, container breakpoint, neutral selection precedence and forced-color fixes are local changes, not wholesale replacements from that revision.

The upstream LICENSE contents are identical at both recorded revisions. This inventory was checked on 2026-10-19. Future ports must record the donor commit, exact paths and local deviations when introduced.

### Source inventory

Paths in the table are relative to the [7.43.0 comparison tree](https://github.com/gravity-ui/uikit/tree/c1702e6aa9fcac95537e9af0646d619e1ea0d453). They identify the corresponding donor source families, not a claim of byte-for-byte copying or proof of each original port revision. Only the required CSS subset is adapted; React implementations, font files, donor icon packages and JavaScript dependencies are not bundled.

| Distributed hvab paths                                                                                                                                                        | Corresponding Gravity source / adaptation                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens/color.css`                                                                                                                                                            | `styles/themes/{light,dark}/{text,base,line,sfx,private}.scss`; semantic subset, with local monochrome brand, surfaces and selection. Later contrast additions use the separately pinned generated theme above.                                                                                           |
| `tokens/typography.css`, `tokens/spacing.css`                                                                                                                                 | `styles/themes/common/{typography,spacing}.scss`; renamed scales, inherited consumer font and local gap namespace.                                                                                                                                                                                        |
| `tokens/radius.css`, `tokens/size.css`, `tokens/focus.css`, `tokens/motion.css`                                                                                               | Shared values consolidated from component styles, `src/components/controls/{variables,mixins}.scss` and `src/components/variables.scss`; hvab scale names and reduced-motion policy are local. No single upstream file is claimed as an exact source for these scales.                                    |
| `tokens/ref.css`                                                                                                                                                              | Local reference-layer scaffold.                                                                                                                                                                                                                                                                           |
| `blocks/text/`                                                                                                                                                                | `src/components/Text/{text/text,colorText/colorText}.scss` and common typography.                                                                                                                                                                                                                         |
| `blocks/button/`, `blocks/checkbox/`, `blocks/radio/`, `blocks/switch/`                                                                                                       | `src/components/{Button,Checkbox,Radio,Switch}/` styles; native and attribute state adaptations.                                                                                                                                                                                                          |
| `blocks/radio-group/`                                                                                                                                                         | `src/components/SegmentedRadioGroup/SegmentedRadioGroup.scss`; shared separator/selection pseudo-element structure adapted to native radios and public hvab tokens.                                                                                                                                       |
| `blocks/text-input/`, `blocks/textarea/`                                                                                                                                      | `src/components/controls/{TextInput,TextArea}/` and shared controls styles.                                                                                                                                                                                                                               |
| `blocks/select/`, `blocks/range-input/`, `blocks/color-input/`, `blocks/field/`                                                                                               | Native-control/layout adaptations using theme and control values. Related reference families: `Select/`, `Slider/`, `lab/ColorPicker/`, `ControlLabel/`, and `controls/common/OuterAdditionalContent/` under `src/components/`; these are not claimed as direct one-to-one ports of their React controls. |
| `blocks/alert/`, `blocks/card/`, `blocks/divider/`, `blocks/hotkey/`, `blocks/icon/`, `blocks/label/`, `blocks/link/`, `blocks/progress/`, `blocks/skeleton/`, `blocks/spin/` | Corresponding `src/components/{Alert,Card,Divider,Hotkey,Icon,Label,Link,Progress,Skeleton,Spin}/` styles. Icon supplies a CSS slot; the Gravity icons package is not included.                                                                                                                           |
| `blocks/breadcrumbs/`, `blocks/pagination/`, `blocks/table/`, `blocks/tabs/`                                                                                                  | `src/components/{Breadcrumbs,Pagination,Table}/`, `src/components/legacy/{Breadcrumbs,Tabs}/` and `src/components/tabs/`; reduced CSS structures and local selection policy. In the later audit donor, Table is under `src/components/legacy/Table/`.                                                     |
| `blocks/dialog/`, `blocks/modal/`, `blocks/sheet/`, `blocks/tooltip/`, `blocks/popover/`, `blocks/toast/`                                                                     | `src/components/{Dialog,Modal,Sheet,Tooltip}/`, `src/components/legacy/Popover/` and `src/components/Toaster/{Toast,ToastList}/`; CSS skins only, with consumer-owned behavior.                                                                                                                           |
| `index.css`, block/token README files                                                                                                                                         | Local composition and documentation of the adapted CSS API.                                                                                                                                                                                                                                               |

SCSS nesting and mixins are flattened to plain CSS; names become `hb-*` / `--hb-*`, internal tokens become `--_<block>-*`, and documented attributes replace donor state classes. Local overrides and audit fixes are described in the block documentation and [CHANGELOG.md](CHANGELOG.md). The upstream notice is retained for the adapted subset as a whole, without asserting that every local rule originated upstream.

### Upstream MIT notice

Verbatim from Gravity UI UIKit's LICENSE at both revisions above:

```text
The MIT License (MIT)

Copyright (c) 2021 YANDEX LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
