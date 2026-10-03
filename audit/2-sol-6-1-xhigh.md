# hvab-blocks — проход 2: независимая проверка и план устранения

Дата: 2026-10-03 (UTC). Sol 6.1 / xhigh. Verification-and-planning-only: исправления и GitHub задачи не создавались.

## 1. Executive summary и baseline drift

**Итог F01–F12: 12 Confirmed, 0 Partially confirmed, 0 Rejected, 0 Cannot verify.** Все Still valid на проверенном дереве. Исходные severity сохранены: 5 Medium и 7 Low. Это результат отдельных воспроизведений с отрицательными контролями, а не принятия выводов Astra по авторитету.

Найдены **2 дополнительные записи Low**: N01 расширяет неполноту checked+disabled selector combinations на radio/switch; N02 фиксирует исчезновение стрелки select в forced colors. N01 объединён с F08 по первопричине. Очищенный реестр содержит **13 C-ID: 5 Medium и 8 Low**. План — **11 R-ID**, плюс 6 отдельных verification/decision steps V01–V06. Critical/High, P0 и общий запрет текущей разработки не обоснованы.

Первые работы: R01 — доступность длинных действий диалога и его divider; R02 — различимость custom controls и select в forced colors; R03 — читаемость функционального текста. Затем локальные исправления каскада/сочетаний состояний и документации. Framework rewrite, JS в CSS core и перенос всех возможностей Gravity не требуются.

### Зафиксированное состояние

- Repository hvab/hvab-blocks, branch main, package 0.2.0. HEAD этого прохода: **fddd30b07ad43e60052a9156e6132283fd793983**.
- Baseline Astra: **b9c78a6bdccbc6d511032381b04c9b5143cc3719**. Diff HEAD с ним добавляет только audit/1-astra-xhigh-prompt.md и audit/2-sol-6-1-xhigh-verify-prompt.md. CSS, tokens, README, generators и package metadata между SHA одинаковы; Already fixed — 0.
- Полностью прочитан audit/1-astra-xhigh.md. Его SHA-256: **27c5b0b3502c8ef7d6d807eefcede0be601604664d179ae2e49ab20b91c966a6**. Старый отчёт не исправлялся; его заключительный delivery blocker относится к завершению первого прохода.
- Перед вторым исследованием status: чужой unstaged ` M .project/PROGRESS.md`, отчёт Astra первоначально untracked. По новому разрешению владельца ранее отклонённый `git add -- audit/1-astra-xhigh.md` повторён один раз и **разрешён**. После него staged только Astra report; чужой файл не staged.
- Сняты хеши 132 index-listed файлов: 129 исходных файлов, 2 полученных prompt и первый отчёт. Исследование не изменило ни один из них. Итог второго прохода создаётся только в audit/2-sol-6-1-xhigh.md; имя проверено по точному промпту.
- Среда проверена: macOS 15.8, Node 24.20.0, npm 12.0.2, Chrome 154.0.8037.93, @web/dev-server 0.4.6, Prettier 3.8.4, Stylelint 17.13.0, PostCSS 8.5.15.
- Прочитаны общие/проектные AGENTS и AGENTS.local; релевантных .agents/skills в checkout нет. Прямой scope пользователя исключает изменение PROGRESS вопреки общему workflow.
- Исследование выполнено на новой временной копии текущих файлов, с symlink к уже установленным node_modules и отдельным Chrome profile. Зависимости не устанавливались. Temp harness, JSON, screenshots и проверки не добавлены в репозиторий.
- GitHub Issues прочитаны через `gh issue list --repo hvab/hvab-blocks --state all --limit 100 --json number,title,state,labels,url`: успешный ответ **[]**, открытых/закрытых записей в результате нет. Tasks/Issues не создавались.

Все code paths и номера строк ниже относятся к [проверенному SHA](https://github.com/hvab/hvab-blocks/tree/fddd30b07ad43e60052a9156e6132283fd793983), если указан иной repository — к отдельно указанному SHA. Локальные пользовательские пути и секреты исключены.

## 2. Verification matrix

В каждой строке ровно один исходный F-ID. Собственное evidence E-ID подробно раскрыто в §4; оно включает конкретные строки, сценарий, результат и контрпроверку. Высокая уверенность в browser findings относится к указанной версии Chrome и условиям, не ко всем engines/OS. FP — остаточный риск false positive.

| F-ID / исходное утверждение                                       | Было   | Статус    | Актуальность | Итог / уверенность         | Собственное evidence                                                                                | Подтверждённая часть / границы и FP                                                                                                                        | Решение                               | Canonical / основной plan |
| ----------------------------------------------------------------- | ------ | --------- | ------------ | -------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------- |
| F01: длинные действия узкого dialog срезаны с начала              | Medium | Confirmed | Still valid  | Medium / высокая           | [E01](#e01): dialog.css:77–84, modal.css:55–60; 320/375/1280px                                      | Negative start overflow недостижим даже после focus/scroll; короткие кнопки и desktop подходят. FP низкий; точная ширина зависит от font/view              | Исправлять                            | C01 → [R01](#r01)         |
| F02: checkbox/radio/switch неверно показывают forced-color states | Medium | Confirmed | Still valid  | Medium / высокая в Chrome  | [E02](#e02): checkbox.css:23,73–80; radio.css:67–75; switch.css:55–78; screenshot + computed values | Две галочки, две пустые radio, исчезнувшие switch при active; native reference различим. Физический Windows не проверен                                    | Исправлять                            | C02 → [R02](#r02)         |
| F03: labels/help/status text имеют низкий contrast                | Medium | Confirmed | Still valid  | Medium / высокая           | [E03](#e03): color.css:18–19,26–34; field.css:17–22,35–69; 68 composited samples                    | Пересчитаны перечисленные пары; без disabled/decorative blanket claims и без обещания WCAG certification. FP низкий на этих surfaces                       | Исправлять проверенные пары           | C03 → [R03](#r03)         |
| F04: zebra table подавляет selected/hover                         | Medium | Confirmed | Still valid  | Medium / высокая           | [E04](#e04): table.css:96–111; обе схемы, pointer hover, stripe removal                             | Even selected превращается в zebra; отдельно odd selected hover вытесняет selection и без zebra. FP низкий; приоритет selected+hover нужно явно определить | Исправлять                            | C04 → [R04](#r04)         |
| F05: field + color-input зависит от block import order            | Medium | Confirmed | Still valid  | Medium / высокая           | [E05](#e05): field.css:43–45, color-input.css:27; vertical/inline, public width                     | Даже public width 40px превращается в 984/768px при перестановке blocks. Tokens присутствуют, full entrypoint нормален. FP низкий                          | Исправлять                            | C05 → [R05](#r05)         |
| F06: прямой dialog divider создаёт horizontal overflow            | Low    | Confirmed | Still valid  | Low / высокая              | [E06](#e06): dialog.css:87–92; exact README, divider removal                                        | 272→304 scrollWidth, divider 336px; без divider 272. Не дубликат длинного footer. FP низкий                                                                | Исправлять, в одном layout item с F01 | C06 → [R01](#r01)         |
| F07: root-disabled radio-group снова активен на hover             | Low    | Confirmed | Still valid  | Low / высокая              | [E07](#e07): radio-group.css:145–153,183–189; data/ARIA/native controls                             | Root ARIA/data color 30%→85% обеих схем; native disabled остаётся 30%. Не утверждается блокировка действий CSS                                             | Исправлять                            | C07 → [R06](#r06)         |
| F08: native disabled + mixed checkbox плохо различим              | Low    | Confirmed | Still valid  | Low / высокая              | [E08](#e08): checkbox.css:143–191; coherent indeterminate property + attributes                     | Minus белый на black7%; same-family ARIA вариант даёт hint. JS indeterminate не устраняет CSS gap. Без blanket WCAG claims для disabled                    | Объединить с N01 и исправлять         | C08 → [R07](#r07)         |
| F09: часть copy-paste examples без accessible name                | Low    | Confirmed | Still valid  | Low / высокая              | [E09](#e09): text-input/textarea/progress README; AX tree                                           | 5 textbox text-input, 12 textarea, 2 progressbar с пустыми именами. Field labels работают; placeholder-named cases исключены                               | Исправлять source examples            | C09 → [R08](#r08)         |
| F10: docs неверно обещают UA scroll lock native dialog            | Low    | Confirmed | Still valid  | Low / высокая в Chrome     | [E10](#e10): modal/README.md:86; bare UA и full CSS, actual wheel                                   | Открытый native dialog не препятствует background scroll 400px. CSS lock внутри core не требуется. Другие engines не обобщаются                            | Исправлять docs                       | C10 → [R09](#r09)         |
| F11: anchored popover demo имеет gap 168px                        | Low    | Confirmed | Still valid  | Low / высокая              | [E11](#e11): popover/README.md:16–21; generated DOM + padding removal                               | Menu начинается ниже preview, gap 168→8 при удалении anchor padding. Skin/positioning engine не обвиняются                                                 | Исправлять README composition         | C11 → [R10](#r10)         |
| F12: pack docs имеют broken relative links                        | Low    | Confirmed | Still valid  | Low / высокая для manifest | [E12](#e12): package.json:7–13, README.md:50–51, USAGE.md:60,151–152; pack manifest                 | 6 ссылок, 4 отсутствующие цели. optional dependency path; фактическая публикация не проверена. Авторские AGENTS/SPEC не обязаны входить в package          | Исправлять ссылки/consumer docs       | C12 → [R11](#r11)         |

## 3. Rejected, downgraded и already fixed

**Rejected = 0, downgraded severity = 0, Already fixed = 0.** Снимать воспроизведённые записи ради квоты false positives оснований нет. Исходные ограничения Astra в основном уже точны.

При этом implementation scope сужен:

- F01: реальный defect при длинных actions, а не любой modal и не отсутствие JS behavior. Width/scroll failure существует без divider.
- F02: доказано в эмуляции Chrome; физический Windows и чёрная/белая OS palette — ещё release validation. Dropped Gravity high-contrast themes не означают отказ от поддержки браузерного forced-colors.
- F03: не все semantic colors ошибочны. Dark labels, light error, обычные labels и часть dark colored toasts проходят измеренный threshold. Изменять только назначение/допустимые пары с evidence; disabled исключён из contrast finding.
- F04: обещание selection background проверяемо; дополнительное решение о selected+hover должно предшествовать приоритету states. Не включать sorting/virtualization.
- F08/N01: проблема во **взаимодействии поддержанных visual states**, а не в обязанности CSS менять native value или блокировать ARIA-disabled.
- F09: исправляются существующие примеры с native roles; не навешивать ARIA на любой декоративный progress sample и не вводить labels в CSS.
- F12: нужны разрешимые ссылки, не доставка всей внутренней документации любой ценой. В checkout links целы; опубликованный registry package здесь не исследовался.

Отклонены как самостоятельные bugs: отсутствие всех Vue/React wrappers в core, focus trap/portal/scroll-lock JS в CSS, empty ref.css, незадекларированные public tokens с корректным fallback, desktop controls меньше 44px вне touch context, гипотетический XSS из trusted README. Они не возвращаются в план.

## 4. Собственное evidence, контрпроверки и новые findings

### E01

**F01 / Medium.** Корень: nowrap flex footer в blocks/dialog/dialog.css:77–84 и button.css:44; panel clipping/scroll в modal.css:55–60. По dialog/README.md:3 layout внутри panel принадлежит dialog; mutable mobile plan PROGRESS используется только как контекст.

Собственный plain HTML: full index.css, body margin 0 / font 16px Arial, div modal + panel + dialog + footer с двумя обычными hb-button, без divider; labels «Сохранить изменения», «Отменить изменения». При 320px panel x=24, width=272; первая кнопка x=**−53.796875**, width=157.5, вторая x=111.703125, width=152.296875. Совпадение с Astra получено отдельным harness. Для двух outlined labels первая x=−57.796875 при 320 и x=−2.796875 при 375; изменения view не устраняют причину.

Контрпроверки: короткие Cancel/Delete при 320 помещаются; те же длинные buttons при 1280 помещаются. На сломанном варианте установка отрицательного scrollLeft и focus первого button оставляет scrollLeft=0 и тот же отрицательный x; scrollWidth даже равен clientWidth. Поэтому «пусть consumer проскроллит» не объясняет доступность потерянного начала. Проблема reachable в native HTML, без Vue и без divider. Приоритет [R01](#r01); никакие JS controllers не предлагаются.

### E02

**F02 / Medium.** Проверены blocks/checkbox/checkbox.css:23,41–50,73–80; radio/radio.css:41–50,67–75; switch/switch.css:45–78. Scene содержит custom unchecked/checked пары и обычные native checkbox references; screenshot просмотрен.

В обычном режиме unchecked checkbox mark color transparent, checked — white на brand; значения DOM отличаются. Forced colors active: обе checkbox marks и borders black, обе видимые галочки; checked radio box и dot white, визуально оба radio пусты; track/thumb switch white и индикаторы исчезают. Native checkbox references в той же scene по-прежнему визуально различаются. Native inputs custom controls остаются opacity 0.

Это подтверждает actual rendering, а не только строку в stylesheet. Emulation/used-value ограничения отражены явно. Применение system colors и force-adjust объясняется первичным [CSS Color Adjustment Level 1, §3.1](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-mode); blanket forced-color-adjust:none не является acceptance criterion. [R02](#r02) сохраняет native semantics и проверяет обе OS palettes позже.

### E03

**F03 / Medium.** Повторно прочитаны назначения в tokens/color.css:18–19,26–34 и dark scheme; field/field.css:17–22,35–69; toast/toast.css:40,50–52,90–94; label/label.css:19–21,73–85; text/text.css:177–186. Собраны **68** measured samples четырёх generated pages в двух схемах.

Алгоритм независим от Astra: начиная с canvas white, alpha backgrounds всех ancestors скомпозированы снаружи внутрь, затем foreground alpha поверх итоговой surface; стандартная sRGB linearization, luminance и (Lhigh+0.05)/(Llow+0.05). У всех 68 samples ancestor opacity=1 и background-image=none — неподдержанной композиции нет. Threshold для functional text 11/13px regular — 4.5:1 по [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Disabled criterion исключён.

| Пара                                              | Результат               |
| ------------------------------------------------- | ----------------------- |
| Light field label, black50% on white, 13px        | 3.977:1                 |
| Light help, black30% on white, 11px               | 2.108:1                 |
| Dark help, white30% on black, 11px                | 2.465:1                 |
| Light warning, rgb(189 142 75) on white, 11px     | 2.943:1                 |
| Light neutral toast message, 13px                 | 3.977:1                 |
| Dark neutral toast message on rgb(56 52 56), 13px | 4.352:1                 |
| Light label info / success / warning              | 4.304 / 3.706 / 3.849:1 |
| Light text info / positive / warning              | 3.576 / 2.957 / 2.943:1 |

Контрпроверки: light field error 4.627, dark field label 5.281, ordinary light label 5.072, dark colored-toast examples 4.805–5.131 — проходят. Light themed toasts дают 3.771–3.873, тоже ниже threshold. Не переносить «dark toast ниже 4.5» на все dark themes. Accent label value с opacity 0.7 не измерялся отдельно: это не добавлено в подтверждённый scope. Не объявляется полная WCAG conformance всей библиотеки. [R03](#r03).

### E04

**F04 / Medium.** blocks/table/table.css:96–111, documented selection table/README.md:85–94. Plain table содержит 4 interactive rows, первые 2 selected; pointer реально перемещён в row rectangles; style read после transition.

Light: odd selected rgba(22,24,29,0.08); even selected rgba(0,0,0,0.05), как unselected even. Even hover ничего не меняет. Dark: соответственно rgba(242,243,245,0.12) и white10%. Удаление только hb-table_striped возвращает selection even строке без hover: light rgba(22,24,29,0.08), dark rgba(242,243,245,0.12). Отдельный negative control повторён с ожиданием 250ms после снятия класса: моментальное чтение ещё возвращало предыдущий цвет во время transition и не использовано как итоговое evidence. Дополнительно hover odd selected и unstriped selected заменяет selection на hover: specificity hover 0,3,0 выше selected 0,2,0; zebra 0,5,0 сильнее обоих.

Доказательство не требует sorting handlers или package consumer overrides. Сами aria-selected не менялись. Canonical C04 охватывает оба нарушения precedence и единую явную policy selected/hover/zebra; [R04](#r04).

### E05

**F05 / Medium.** field/field.css:43–45 (width:100%) против color-input/color-input.css:27 (public/private width), оба single class. Official mix — color-input/README.md:38–42; SPEC §8 запрещает inter-block order dependence, USAGE selective imports требует только правильные token dependencies.

Собственный усиленный пример: все 8 token files, field + input color, ancestor public --hb-color-input-control-width:40px, UA body margin 8, viewport 1000. Field CSS перед color-input: **40px** в vertical и inline field. Перестановка блоков: **984px** в vertical и **768px** в inline; override уже прочитан в проигравшей декларации и не может изменить победивший width:100%. Это конкретная composition collision, а не неисправность двухлинейной модели внутри самостоятельного блока.

Контрпроверка: ordinary full index и tokens-before-blocks исключают отсутствующие dependencies. [R05](#r05) должен проверить обе перестановки и официальную анатомию; запрет произвольного порядка потребует явного пересмотра SPEC, а не молчаливой правки документации.

### E06

**F06 / Low.** blocks/dialog/dialog.css:87–92; direct divider exact first README example. При 320px panel clientWidth=272, scrollWidth=304, divider width=336; при 375 — 327/359/391; при 1280 — 480/512/544. Удаление только двух hr в transient DOM возвращает scrollWidth=clientWidth во всех трёх случаях.

Root dialog padding отсутствует; side padding задан header/body/footer, поэтому negative margins прямого sibling-divider компенсируют несуществующий root padding. Короткие actions исключают F01 как причину. В [R01](#r01) C06 остаётся самостоятельным acceptance scenario.

### E07

**F07 / Low.** radio-group/radio-group.css:145–153 исключает disabled на input, но не group; group-disabled rules :183–189 проигрывают hover specificity. README :128 явно разрешает aria-disabled/data-disabled на группе.

В каждой схеме проверены root data-disabled, root aria-disabled=true и native disabled input; до pointer группа отвёрстана без hover. Root-only cases: text black/white30% → black/white85%. Native disabled: 30% до и после hover. Значения и физический pointer movement подтверждены независимо. Никакого утверждения о запрете value change через CSS; [R06](#r06).

### E08

**F08 / Low.** checkbox/checkbox.css:143–191; states API checkbox/README.md:79–81. В native checkbox disabled aria-checked=mixed дополнительно установлена настоящая JS property indeterminate=true. Получены checked=false, indeterminate=true, before display none, after display block, minus white на black7% background. Same-family aria-disabled=true + aria-checked=mixed даёт hint black30% mark на том же muted background.

Native indeterminate, правильные sys dependencies и отсутствие public overrides опровергают объяснения «значение не настроено» и «consumer поменял тему». В dark разные values тоже расходятся: cross-family mark brand-contrast против expected hint. Проверено 66 coherent state-source combinations checkbox/radio/switch в двух схемах. [R07](#r07), общая первопричина с N01.

### E09

**F09 / Low.** Read-only AX tree generated demo: text-input — 13 textbox nodes, **5** без имени; textarea — 17, **12** без имени; progress — **2** progressbar, оба без имени. Values My theme, Default, Invalid, Disabled, Pill radius и textarea content не превращаются в accessible name.

Точные source examples: text-input/README.md:9,24–26,76; textarea/README.md:9,16–18,24–27,34–36,98–100; progress/README.md:8–17,52–54. Field compositions имеют names Theme name / Folder / Description / CSS comment; placeholder-based names в проверенном Chrome не включены в пустые. progressbar требует name from author по [WAI-ARIA 1.2, progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar).

Это regression source examples/AX, не оценка screen reader narration и не изменение control CSS. [R08](#r08).

### E10

**F10 / Low.** modal/README.md:86 неверно приписывает native dialog UA scroll lock. На отдельной 3000px page выполнено showModal, wheel deltaY=400 на backdrop вне panel. Dialog open=true, window.scrollY=**400**. Повторено и **без CSS библиотеки**: тот же результат, что исключает CSS-induced scroll failure.

С full index backdrop rgba(0,0,0,0.25); closed native dialog display none до открытия — его native visibility не сломана. Это docs defect, не требование core JS scroll-lock implementation. Другие engines/touch не проверены. [R09](#r09).

### E11

**F11 / Low.** popover/README.md:16–21; generated demo exact. Parent padding-bottom 160px; menu top calc(100% + 8px) даёт gap **168px**. В viewport 1280: preview bottom=612, menu top=620, bottom=714.5 — menu уже находится ниже preview.

Удаление только anchor padding в transient DOM даёт gap **8px**. Для production consumer positioning responsibility намеренно внешняя; исправление относится к static README stand-in и external footprint, а не к hb-popover skin. [R10](#r10).

### E12

**F12 / Low.** package.json:7–13 files whitelist; README.md:50–51; USAGE.md:60 и More references. Собственный npm 12 pack dry-run: **79 entries**, все 32 block CSS и README включены. Из README/USAGE **6** relative links не имеют цели: CHANGELOG (3 occurrences), RELEASE, AGENTS, SPEC. Roots существуют в checkout, отсутствуют в shipped manifest.

Первый parser вспомогательной проверки ожидал array JSON и получил KeyError:0: npm 12 в этой среде выводит map с ключом package name. Исправлена только temp utility, manifest разобран повторно; это не defect npm/package. Фактическая registry publication не выполнялась/не проверялась. [R11](#r11) не обязан поставлять internal authoring docs; допустимы version-pinned external links.

### N01

**Low / высокая уверенность. Still valid. Неполное checked+disabled оформление radio/switch при смешении state sources.**

Код: radio/radio.css:152–156; switch/switch.css:138–154. Контракт: radio/README.md States поддерживает checked и disabled из native/ARIA/data; switch/README.md:79–81 прямо обещает brand track с reduced opacity у checked disabled. Ожидаемое оформление зависит от состояния, а не от совпадения families.

Минимальный scenario: обычная README label/control/box/label анатомия; input.checked=true, aria-disabled=true, без противоречащего aria-checked=false. Consumer владеет inhibition; оценивается CSS skin. Radio dot **white** на muted black7% box вместо hint; switch track **black7%, opacity 1**, slider смещён, вместо обещанного brand track opacity 0.5. То же при data-disabled. Нативный checked+disabled контроль даёт radio hint и switch brand + opacity 0.5. Для coherent aria family, где дополнительно задан aria-checked=true, ожидаемое оформление восстанавливается. Dark повторяет family inconsistency с собственными цветами.

Влияние: ухудшение различимости checked disabled radio и несогласованный toggle appearance у thin wrappers. Охват узкий; native matched-family хорошо работает, value/keyboard management не объявлен сломанным. FP низкий: оба источника поддержаны отдельно, атрибуты не противоречат реальному checked.

Причина совпадает с F08: последние conjunctive selectors перечисляют только часть комбинаций источников. **Merge → C08, primary R07.** Не отдельный rewrite и не три несвязанных исправления одной политики.

### N02

**Low / высокая уверенность в Chrome emulation. Still valid. Select теряет dropdown indicator при forced colors.**

Код: select/select.css:37–52, особенно appearance:none и две linear-gradient стрелки; README:3 и Public tokens документируют native select chrome/CSS arrow. В том же независимом screenshot scene, что E02, native unstyled select сохраняет стрелку, hb-select выглядит как textbox: computed background-image=**none, none**, appearance=none.

Предусловие: forced-colors active, default select без consumer overrides. В обычном режиме обе gradients и видимая стрелка присутствуют. Согласно [CSS Color Adjustment §3.1](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-mode) non-URL background images отключаются. Native affordance одновременно снята appearance:none; смена только arrow-color не исправит это.

Влияние: dropdown труднее распознать визуально, но native value, keyboard behavior и accessible combobox role этим evidence не объявляются сломанными. Поэтому Low, не Medium/High. Physical Windows/default popup не тестировались. FP низкий на измеренной сцене; ожидаемый indicator подтверждён native reference.

Направление: native appearance fallback в forced-colors или явно читаемый system-color indicator; нормальный arrow/public tokens сохраняются. **C13 → R02**: единый validation item для platform forced colors; причина gradient removal остаётся отдельной от прозрачных/скрытых marks C02.

### Покрытие второго прохода и журнал проверок

Основные docs: README, AGENTS, SPEC, USAGE, VENDOR, tokens/README, текущий PROGRESS, CHANGELOG, package.json и scripts прочитаны. CSS/README затронутых блоков изучены адресно, с фокусом на вызывающие declarations и states. Это **не второй полный visual audit всех 32 блоков**: inventory/build/link checks покрывают 32; browser walkthrough — 8 generated block pages плюс plain synthetic scenes.

| Проверка / команда                                                                         | Среда                                                    | Статус / собственный результат                                                                                                             |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| git status, rev-parse, diff Astra baseline..HEAD                                           | Исходный checkout                                        | PASS: code-identical drift, чужой PROGRESS выделен                                                                                         |
| Хеши 132 baseline files                                                                    | Исходный checkout                                        | PASS: изменений после исследования нет                                                                                                     |
| npm run lint:styles                                                                        | Исходный checkout                                        | PASS                                                                                                                                       |
| npm run demo:check                                                                         | Исходный checkout                                        | PASS: generated sources синхронны                                                                                                          |
| npm run docs:check                                                                         | Исходный checkout                                        | PASS; substring/metadata checker не подтверждает semantics                                                                                 |
| git diff --check                                                                           | Исходный checkout                                        | PASS                                                                                                                                       |
| npm run format:check                                                                       | Исходный checkout                                        | FAIL: только два pre-existing audit prompt; их изменение запрещено                                                                         |
| npm run pages:build                                                                        | Новая temp copy                                          | PASS: 33 HTML; не source tree                                                                                                              |
| npm pack --dry-run --json --ignore-scripts --cache <temp-cache>                            | Temp copy, существующие dependencies                     | PASS manifest: 79 entries; E12 FAIL content links                                                                                          |
| Temp pack parser, первый запуск                                                            | Temp utility                                             | FAIL KeyError:0 на npm 12 JSON shape; затем corrected parser PASS                                                                          |
| Temp Pages reference scan                                                                  | Temp dist                                                | PASS: 33 pages, все локальные href/src targets существуют                                                                                  |
| npm start -- --port 8795                                                                   | Temp copy, разрешённый localhost process                 | PASS: catalogue обслуживается                                                                                                              |
| Isolated headless Chrome / local CDP 8796                                                  | Новый temp profile, без пользовательского Chrome profile | PASS: Chrome 154; macOS display-link diagnostics в launcher stderr не Page exceptions                                                      |
| node <temp>/hvab-sol-check.mjs                                                             | Chrome CDP + temp HTML                                   | PASS исполнения: E01–E11, 66 source-state cases, 8 contrast scenes; некоторые проверенные product expectations FAIL                        |
| python3 <temp>/hvab-sol-contrast.py                                                        | Сохранённые собственные computed values                  | PASS: 68 sample pairs; ни одного unsupported image/opacity ancestor                                                                        |
| node <temp>/hvab-sol-more.mjs                                                              | CDP, дополнительные controls                             | PASS исполнения: 20 button view×size без disabled geometry drift, exact F01, nested schemes, public height, reduced motion                 |
| node --input-type=module, temp table negative control                                      | CDP, две схемы, после 250ms transition                   | PASS: stripe removal восстанавливает selection без hover; hover меняет её снова. Первое немедленное чтение исключено как transition sample |
| AX tree text-input/textarea/progress                                                       | 3 generated demos                                        | FAIL expected names: 5 + 12 + 2 unnamed; positive labelled controls PASS                                                                   |
| Forced-colors screenshots + computed values                                                | Chrome emulation                                         | FAIL C02/C13; normal mode и native reference PASS                                                                                          |
| Runtime exceptions                                                                         | Только наши CDP scenes                                   | PASS: 0 Page JS exceptions; это не тест всех deployment paths                                                                              |
| gh issue list --state all --limit 100                                                      | hvab/hvab-blocks, read-only                              | PASS access, []                                                                                                                            |
| Safari/Firefox, physical Windows high contrast, screen-reader speech, touch, 200/400% zoom | —                                                        | NOT RUN                                                                                                                                    |
| Full Vue/React/Aegea runtime, production/demo deployment, npm registry publication         | —                                                        | NOT RUN                                                                                                                                    |

Дополнительные контрпроверки: 20 button views×sizes сохраняют measured width/height после native disabled; inherited public height 52px сохраняется на size_xl+disabled. Nested dark/light action background — rgb(242 243 245)/rgb(22 24 29). Button/progress loading при reduced motion имеют duration 0s и 0 running animations; skeleton none. Spin остаётся 1s/1 running animation, но это явно написано в spin/README.md:64: решение о конфликте со SPEC оставлено V03, не навязан silent fix.

Read-only Selecta на SHA **3df22e0167c773a04bdefcb69c722e112068efcc**: изучены src/ui/hvab.css и реальные src/ui/{Button,RadioGroup,ConfirmDialog} wrappers. ConfirmDialog использует Reka portal и hb-modal/hb-modal\_\_panel/hb-dialog/footer; wrappers существуют и их текущий code path релевантен R01. В CSS consumer field импортирован раньше color-input, поэтому обратный-order defect не заявляется действующей поломкой этого consumer. Vue build/runtime и чужие Selecta изменения не затронуты.

## 5. Очищенный канонический реестр

Сохраняются independent roots. C01/C06 не дедуплицируются: negative footer start и ошибочный divider margin различны, хотя remediation один. C02/C13 различны: color remapping скрытых controls и удаление gradient select. C08 объединяет family omissions из F08/N01.

| C-ID | Источники | Severity | Проверенная проблема / пользовательское влияние                              | Evidence / ограничение                                         | Primary action |
| ---- | --------- | -------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------- |
| C01  | F01       | Medium   | Начало длинного действия недоступно в узком dialog                           | E01; fonts/view влияют на threshold                            | R01            |
| C02  | F02       | Medium   | Forced colors искажает checked у custom checkbox/radio/switch                | E02; Chrome emulation, physical Windows pending                | R02            |
| C03  | F03       | Medium   | Functional labels/help/status плохо читаются на доказанных surfaces          | E03; конкретные pairs, не blanket theme replacement            | R03            |
| C04  | F04       | Medium   | Zebra/hover меняют appearance selected row при прежнем ARIA                  | E04; selected/hover policy требуется уточнить                  | R04            |
| C05  | F05       | Medium   | Selective CSS order меняет width официального field/input mix                | E05; нормальный index order проходит                           | R05            |
| C06  | F06       | Low      | Divider даёт лишний horizontal overflow panel                                | E06; direct README anatomy                                     | R01            |
| C07  | F07       | Low      | Root-disabled radio-group выглядит enabled на hover                          | E07; только visual state, consumer inhibition                  | R06            |
| C08  | F08, N01  | Low      | Неполные combinations источников checked/mixed/disabled искажают mark/track  | E08/N01; native/ARIA/data families, public overrides исключены | R07            |
| C09  | F09       | Low      | Copy-paste textbox/progress examples без accessible names                    | E09; AX Chrome, не screen reader suite                         | R08            |
| C10  | F10       | Low      | Native scroll-lock обещан ошибочно, consumer оставляет scrollable background | E10; UA bare контроль, другие engines pending                  | R09            |
| C11  | F11       | Low      | Static anchored menu находится вне preview с неверным gap                    | E11; README composition only                                   | R10            |
| C12  | F12       | Low      | Dependency package docs направляют в отсутствующие targets                   | E12; текущий pack manifest, не actual published package        | R11            |
| C13  | N02       | Low      | Forced-color select лишён dropdown indicator                                 | N02; affordance, value behavior не сломан                      | R02            |

У каждого C-ID ровно один primary R-ID; перенос между items допустим только с сохранением этого ownership. Непроверенных претензий в implementation scope таблицы нет.

## 6. Приоритизированный remediation plan

P1 — значимый актуальный риск; P2 — плановая ограниченная правка; P3 — малый ущерб. P0 не назначен: не проверен blocker ближайшего выпуска или data loss. Ниже направления и acceptance, **не готовые patches**. Везде сохраняются classes, public tokens и state API; generated demo изменяется только штатной генерацией из README. Общие post-change gates: lint:styles, demo:check, docs:check, targeted formatting и адресные runtime regression. Общий format:check должен отдельно различать known prompt-only baseline warnings и новые warnings.

### R01

**P1, C01/F01 + C06/F06. Результат:** обе actions доступны на узком экране, direct divider не расширяет panel.

Scope: blocks/dialog/dialog.css, при необходимости dialog/README и modal composition docs; modal.css менять лишь если измерения показывают необходимость. Non-goals: JS focus trap/scroll lock, consumer portal, generic responsive layout framework и mobile toast.

Шаги: (1) на текущем markup отдельно сохранить no-divider long-actions и short-actions-with-divider controls; (2) выбрать wrap/stack strategy footer, которая не прячет text/hit area; (3) согласовать divider с реальным местом padding; (4) перепроверить public padding/width tokens и README generation. Dependency: нет implementation predecessors; V06 — consumer acceptance gate, не предпосылка разработки CSS.

Acceptance: 320/375/1280px, default/s/m/l dialog, short/long Latin/Cyrillic labels, 1–3 buttons: каждый button полностью внутри видимой/достижимой panel, нет negative start clipping. У exact divider case scrollWidth=clientWidth при default и custom side-padding. Focus/Tab не перемещает button в недоступную область; длинный body прокручивается до footer. Safari/Firefox narrow и 200/400% zoom, Selecta ConfirmDialog на synthetic actions подтверждают соответствие. Lint/demo/docs/targeted format PASS; «скрыть overflow» без доступных actions — FAIL.

Риски: изменение desktop alignment/order/spacing и long-body scroll; сохранить DOM/order и public geometry API. Возможен независимый откат каждого локального layout change после fixture comparison. Размер **M**, неопределённость средняя (responsive strategy и browsers). Нужны согласование wrap/stack и реальные consumer labels; закрывает evidence geometry + focus + consumer smoke.

### R02

**P1, C02/F02 + C13/N02. Результат:** checked/unchecked/mixed controls различимы, select показывает dropdown indicator в forced colors.

Scope: checkbox/radio/switch/select CSS и их README только для осмысленных support notes. Non-goals: port Gravity high-contrast themes целиком, новые JS widgets, blanket forced-color-adjust:none.

Шаги: (1) сохранить native references и default/forced screenshot pair; (2) выбрать native fallback либо системные colors/borders/explicit mark visibility для custom controls; (3) отдельно решить native appearance/indicator select; (4) проверить input/focus/label hit area; (5) физическая Windows validation. Dependency: R07 может выполняться независимо, но до финального gate объединить его state-source fixtures, чтобы disabled/mixed не регрессировали.

Acceptance: в forced-colors unchecked checkbox **без tick**, checked с tick, mixed с distinct minus; selected radio имеет dot, switch track/thumb/position различимы, select dropdown marker виден. Disabled и focus различимы на light/dark OS palettes; native checked/value и AX roles/names сохраняются. Outside forced-colors normal view и public tokens работают. Windows Edge/Chrome high-contrast screenshot, keyboard/AT smoke; отсутствие реального Windows evidence не считать полным PASS.

Риски: двойные controls при fallback, lost custom size/hit area, user palette contrast. Минимизировать область media guard и проверить native semantics. Размер **M**, неопределённость средняя/высокая из-за OS validation. Закрывает physical screenshot/state matrix и сохранённый normal-mode regression.

### R03

**P1, C03/F03. Результат:** подтверждённые functional text/surface pairs имеют достаточный contrast.

Scope: defaults field/toast/label/text и, только после выбора роли, нужные semantic donor tokens в tokens/color.css. Non-goals: заменить всю палитру/бренд, «исправить» все hint/disabled roles, объявить WCAG certification.

Предпосылка: решить, какая существующая donor role подходит functional text на каждом surface; это часть item, без code change до измеримого pair matrix. Шаги: (1) сохранить measured foreground/background/font roles; (2) выбрать локальное role assignment либо обоснованный semantic value change; (3) проверить обе схемы, float/modal/color surfaces; (4) выполнить regression для consumers/overrides. Независим от R01/R04; concurrent edits tokens/color.css должны согласоваться с R02.

Acceptance: все внесённые в E03 functional samples 11/13px имеют ratio >=4.5 **до округления**, alpha на actual ancestors учтён. Default label/error/dark colored toast, которые уже PASS, остаются PASS; new pairs имеют background contract. Public overrides сохраняются; consumer custom theme отдельно проверяется и не считается автоматически conformant. Contrast calculation + code role mapping + visual light/dark review; lint/docs gates PASS.

Риски: широкое влияние sys role value, brand/status color migration и неожиданный contrast на floating surfaces. Предпочесть минимальное назначение проверенных ролей; откат конкретного role delta, не palette rewrite. Размер **M**, высокая неопределённость решения о ролях; evidence closure — approved pair matrix и повторный compositing.

### R04

**P2, C04/F04. Результат:** documented selected state не зависит от parity и сохраняет согласованное значение при hover.

Scope: table.css:95–111 и таблица states README. Non-goals: sorting handlers, table virtualization, keyboard grid, rewrites всей specificity policy.

Предпосылка: явно определить selected+hover priority (retain selection либо отдельная selected-hover role с узнаваемой selection). Шаги: (1) even/odd selected/unselected fixture; (2) устранить zebra precedence над selected; (3) согласовать hover precedence для selected; (4) проверить public background tokens. Зависимостей нет.

Acceptance: even/odd одинаково используют selection role при одинаковом ARIA; reorder rows не меняет смысл selected appearance. Hover не маскирует selected полностью; unselected hover работает в striped/unstriped table и обеих схемах. Disabled opacity и внешний public row override сохраняются. Actual pointer + computed backgrounds, не только stylesheet order; существующие gates PASS.

Риски: изменение hover aesthetics, consumer expectations priority/public override. README policy + fixtures снижают риск. Размер **S**, неопределённость средняя до решения priority.

### R05

**P2, C05/F05. Результат:** geometry field/color-input mix независима от block order при правильных tokens.

Scope: field.css control-slot ownership, color-input.css width и official composition README. Non-goals: bundler plugin/order enforcement, !important, новое stylesheet layering для всей core.

Шаги: (1) сохранить vertical/inline cases с обеими import permutations; (2) согласовать, кто владеет intrinsic width input и full-width slot; (3) сохранить documented mix либо явно безопасную wrapper anatomy; (4) проверить самостоятельный color-input, addons и full index. Если требуется public API/anatomy change — отдельно версионировать по SPEC §10; не выдать breaking change за bugfix. Зависимостей нет.

Acceptance: default 28px и public 40/72px одинаковы в обеих permutations; vertical/inline field остаются usable, label/action widths не ломаются. Tokens-before-blocks, full entrypoint и Selecta's existing import order проходят. Text-input/select/range slots сохраняют нужную full width. Counterexample «последний import выигрывает» — FAIL.

Риски: accidental width regression остальных controls; test adjacent compositions и consumer imports. Размер **S–M**, средняя неопределённость владения slot. Evidence closure — permutations + public override + consumer snapshot.

### R06

**P2, C07/F07. Результат:** documented root-disabled radio-group не получает enabled hover styling.

Scope: radio-group hover eligibility/disabled cascade; README только если уточняется state contract. Non-goals: блокировать ARIA/data actions через CSS или создавать keyboard controller.

Шаги: root ARIA/data + control native/ARIA/data fixtures; учесть group state при hover; проверить checked и focus interactions. Dependency: нет; один файл с возможными будущими state fixes требует последовательного editing ownership.

Acceptance: text/background remain disabled при pointer hover root ARIA/data; native/control disabled тоже сохраняются; enabled unchecked hover работает. Checked/root disabled, both schemes, public text/background overrides и native focus не регрессируют. Value inhibition тестируется consumer отдельно, не как достижение core CSS.

Риски: overly broad hover guard подавит enabled sibling или selected hover; explicit matrix. Размер **S**, низкая/средняя неопределённость.

### R07

**P2, C08/F08/N01. Результат:** checked/mixed + disabled одинаково оформляются при поддержанных согласованных state sources.

Scope: final combined-state selectors checkbox/radio/switch, соответствующие README support contract. Non-goals: JS indeterminate/value management; undocumented contradictory native/ARIA values; полная headless framework library.

Шаги: (1) определить поддержанную матрицу coherent native/ARIA/data inputs; (2) покрыть cross-family combinations без перезаписи public overrides; (3) mixed JS property + attribute fixture; (4) проверить hover/focus и взаимодействие с R02. Прямых predecessors нет; **финальный gate после R02 и R07 вместе**.

Acceptance: native disabled + aria/data mixed checkbox использует различимый intended disabled mark; native checked + ARIA/data disabled radio получает intended muted dot; switch сохраняет brand track/reduced opacity согласно docs. Same-family native/ARIA/data cases и public icon/track/opacity overrides сохраняются. Не противоречащие DOM checked/indeterminate values verified; обе схемы и forced colors после R02. Не применять 4.5 text criterion к disabled checkbox symbol для обоснования этого item.

Риски: state precedence, overrides, избыточные selectors. Допускается private internal refactoring, классы/API не переименовываются. Размер **M**, средняя неопределённость матрицы; закрывает exhaustive documented matrix + targeted consumer fixture.

### R08

**P2, C09/F09. Результат:** существующие semantic input/progress examples имеют доступные имена.

Scope: README text-input/textarea/progress и generated demo после штатной demo:build. Non-goals: CSS label generator, автоматический ARIA lint всей библиотеки, навешивание interactive roles на decorative examples.

Шаги: найти именно 19 unnamed semantic nodes; дать label/explicit name в source example с уникальными IDs, если выбран for/label; regenerate только demo; перечитать AX. Зависимостей нет.

Acceptance: все прежние unnamed textbox/progressbar nodes получают nonempty meaningful names; old labelled/placeholder cases и values сохраняются, progress numeric/indeterminate state корректен. Demo:check/docs:check/targeted format PASS; VoiceOver/NVDA smoke подтверждает смысл labels, не только nonempty string. Не создавать одинаковые IDs между examples.

Риски: ID collisions, layout примеров, случайная подмена value label. Размер **S**, низкая неопределённость; закрывает source markup + AX snapshot + AT smoke.

### R09

**P2, C10/F10. Результат:** behavior docs native dialog не обещают недоказанный UA scroll lock.

Scope: modal/README.md Behavior Boundary и соответствующий CSS header comment при фактической неточности. Non-goals: внедрение JS scroll-lock или обязательного framework.

Шаги: скорректировать ответственность consumer для обоих hosts, разделить native top-layer/inert behavior и background locking; повторить bare native experiment в заявленных browsers; update demo только при source-example changes. Зависимостей нет.

Acceptance: документация не говорит, что UA универсально locks background. Consumer может выбрать проверенный native/headless scroll policy; closed/open/backdrop remain native. Wheel и touch на scrollable page, восстановление позиции/lock после close проверяются в реальном consumer. Chrome reproduction остаётся documented evidence; прочие browsers не получают fictitious PASS.

Риски: docs могут навязать ненужный двойной lock потребителю с существующей headless библиотекой; формулировать responsibility, не рецепт для всех frameworks. Размер **S**, средняя неопределённость browser policies.

### R10

**P3, C11/F11. Результат:** static popover example начинается на нужном gap и укладывается в preview.

Scope: popover/README.md Anchored Menu Composition; generated demo. Non-goals: hb-popover placement engine, Floating UI integration, viewport collision handling.

Шаги: отделить containing block anchor от external preview height reservation; сохранить menu roles/actions; regenerate; измерить footprint. Зависимостей нет.

Acceptance: gap соответствует --hb-gap-2 (8px при default), menu не выступает в source-code region; оба элемента видны на narrow/desktop; CSS skin unchanged. Demo:check/docs:check/targeted format PASS; no new inline semantics loss.

Риски: сломать обводку/containing block или mobile overflow demo; layout comparison. Размер **S**, низкая неопределённость.

### R11

**P3, C12/F12. Результат:** relative doc links разрешаются в package или ведут к устойчивому источнику.

Scope: package.json files / README.md / USAGE.md; targeted consumer docs. Non-goals: registry publish, доставка всей maintainer history, новый packaging pipeline.

Предпосылка: решить набор shipped consumer docs; прежде всего migration changelog. Шаги: включить нужный file либо version-pinned external URL; internal AGENTS/SPEC и release docs могут иметь external links; повторить pack dry-run и link resolver. Зависимостей нет; V01 учитывается отдельно до нового распространения donor-derived sources.

Acceptance: все 6 текущих doc links разрешимы; все 32 CSS/README и exports сохранились; dry-run не создаёт tarball/publication; links закреплены на release/ref, если это внешний вариант. Full source copy-first path не регрессирует. Npm 12 JSON map parser учтён.

Риски: unnecessary package bloat, unpinned remote URLs, изменение ссылок на неверную release. Размер **S**, низкая неопределённость после docs scope decision.

## 7. Execution order, dependencies и проверки перед implementation

1. **Сначала сохранить fixtures/expected roles**, уточнить решения внутри R01/R03/R04/R05 и support baseline V04. Это локальная проверка на synthetic данных, не новые Issues/backlog.
2. **Первая волна P1:** R01, R02, R03 могут исследоваться параллельно на независимых файлах. R01 проверяется в Selecta через V06; R02 — physical Windows; R03 — approved surface/role matrix. Если правка системных tokens нужна R02/R03 одновременно, token delta имеет одного владельца.
3. **Вторая волна P2:** R04/R05/R06/R07; независимые implementations разрешены, но R02/R07 финально проверяются вместе. R08/R09 — отдельные docs patches без ожидания остальных CSS fixes.
4. **Третья волна P3:** R10/R11. При любом README edit demo generation запускается последовательно, чтобы разные writers не конкурировали за generated outputs.
5. **Перед выпуском:** общие gates, targeted runtime всех затронутых C-ID, выбранный browser/consumer acceptance; V01 решает provenance scope для нового donor-related распространения. Version/public API review по SPEC §10 для R05 и любого выбранного API change. План ничего не выпускает.

Прямой hard dependency graph R-items пуст: локальные fixes не требуют друг друга для начала. Integration gate имеет входы R02 и R07; consumer gate R01 → V06; conditional distribution decision V01 → distribution gate. Эти стрелки **не** задают V06 как prerequisite R01, поэтому циклов нет. У каждого C ровно одно основное R; совместный gate не создаёт duplicate implementation ownership.

**Критический путь для текущего mobile-dialog сценария:** решение R01 → CSS layout → 320/375 geometry/focus → Selecta V06 → cross-browser/zoom acceptance. Ни table, ни package-docs не должны искусственно блокировать этот путь. Для accessibility claim отдельный путь R02/R07 + Windows и R03 + contrast matrix.

**Release blockers:** универсального P0 не доказано. R01 — blocker исправления именно уже наблюдаемого narrow-dialog scenario. Если выпускается обещание forced-colors/accessible default skin, соответствующие R02/R03/R08 gates обязательны. V01 может выявить отдельный distribution blocker, но этот аудит не выносит правовой verdict. R10/R11 и known prompt formatting не блокируют текущую source development сами по себе.

### V01

**Verification/decision, не implementation:** donor provenance/attribution.

Факт: SPEC §11 называет Gravity; текущий local donor SHA c1702e6aa9fcac95537e9af0646d619e1ea0d453, LICENSE copyright 2021 YANDEX LLC; project LICENSE содержит только собственную notice. VENDOR фиксирует происхождение копии hvab, а не фактическую Gravity revision порта. Полный forensic comparison не сделан.

Эксперимент до нового распространения: найти фактическую port revision/историю, сравнить перенесённые CSS/token subsets, определить необходимый notice scope, проверить pack/copy output. Evidence — revision/subset manifest и provenance/notice record с попаданием в нужную distribution. Если substantial transferred portions подтверждены, отдельное минимальное attribution исправление; если только общие идеи/неподлежащие идентификации значения — документировать основание решения. Не делать юридический вывод по совпадению четырёх RGB. **M**, высокая неопределённость; не условие начала R01.

### V02

**Verification/decision:** расхождение буквальных layer invariants с реальными local exceptions.

Изученные прямые motion/sys declarations и layout modifiers не равны 92 пользовательским bugs; count 92 — AST evidence Astra, целиком второй раз не пересчитан. Эксперимент: выписать фактические exceptions к SPEC §2/§7 по AST и выбрать небольшую policy, сохраняя public override tests. Evidence — проверенный exception inventory/решение о contract, затем изменение только при измеримой выгоде. PASS public API → docs alignment candidate; FAIL concrete override → новый адресный C, не mass token rewrite. **S–M**, решение владельца. Сейчас No implementation.

### V03

**Verification/decision:** spin reduced-motion policy.

Собственно повторено: spin 1s/running, skeleton none, button/progress 0s/no running; spin README:64 намеренно сохраняет rotation, SPEC §7.8 общий. Эксперимент: согласовать reduced-motion loading indicator с пользователем продукта, проверить static/low-motion альтернативу и доступное сообщение в реальном consumer. Evidence — approved policy + AT/visual comparison. Если rotation exception принят — явно оформить contract; если нет — отдельное локальное изменение spin. Не включать silent stop в R02/R03. **S**, продуктовая неопределённость.

### V04

**Verification/decision:** browser/mobile support и необследованные overflow cases.

Текущая .browserslistrc=defaults не фиксирует минимальные версии; narrow CSS width не равен zoom/touch validation. Scene: Safari/Firefox 320/375 и 200/400% zoom, keyboard viewport/safe areas на физическом iOS, long titles+close+unbroken tokens, sheet final action. Mobile full-width toaster сейчас явно deferred в toast README:122 — менять его scope только после принятия mobile requirement.

Evidence — supported-engine matrix и geometry/hit/focus records. FAIL documented scenario → новый bounded finding; unsupported accepted scenario → limitation, без implementation. **M**, средняя/высокая неопределённость доступности сред.

### V05

**Verification/decision:** RTL scope.

Astra отметил switch logical inset + physical translateX; код подтверждает такую геометрию, но второй проход не повторял RTL runtime и полный RTL contract отсутствует. Эксперимент: сначала принять/отклонить RTL support scope, затем checked/unchecked/focus switch и select arrow placement при dir=rtl, обе schemes/engines. Evidence — direction-aware bounding boxes и screenshots. При подтверждённом поддержанном сценарии отдельный local fix; иначе accepted limitation. **S**, не blocker LTR consumers.

### V06

**Verification gate, не новый feature:** thin consumer integration.

Selecta wrappers подтверждены read-only по коду и SHA; не равнозначны Vue runtime compatibility. После R01/R05/R07 открыть synthetic ConfirmDialog с длинными action labels и controlled fields, проверить focus/close, import order, emitted native states и public theme/height. Для фактического Aegea/React consumer использовать его реальную documented entry/anatomy, когда он доступен; таких builds здесь нет.

Evidence — measured screenshots/DOM/AX и consumer command results без private-token patches. FAIL из-за library skin → адресный regression C; FAIL consumer wiring → работа в consumer вне этого CSS plan. **M**, неопределённость consumer suite. Эта проверка не создаёт wrappers в core.

## 8. No-action, открытые вопросы и ограничения

- **Accepted boundaries:** JS state, keyboard/focus traps, portals, collision placement, timers, page layout/global reset и framework components принадлежат consumer. Их отсутствие не требует R-item.
- **No action сейчас:** empty ref layer, public vars без декларации с корректным fallback, stable disabled button footprint, arbitrary forced theme override. Контрольные измерения public height/nested schemes подтверждают сохранение этих механизмов.
- **Low-value docs drift:** USAGE catalogue не содержит radio-group, хотя index/README/demo/package содержит 32 blocks; AGENTS/SPEC исторически называют будущие wrappers по старым путям. Это не CSS defect и не новый independent N-ID; можно исправить позже в отдельной docs iteration, не расширяя R-items случайными source changes.
- **Known baseline gate:** два audit prompt файла не проходят Prettier. Их правка запрещена текущим scope; общий FAIL сообщён отдельно от targeted report/source formatting. Не выдавать это за regression отчётов.
- **Tooling limits:** docs checker ищет metadata/token names как substrings и пропускает отсутствующий README. В текущем inventory README есть у всех 32. Полный semantic/ARIA validator не доказан и не добавляется ради этого аудита.
- **Hypothetical XSS:** live README HTML намеренно trusted source; внешний достижимый untrusted input не найден. Это не security finding и не план sanitization rewrite.
- **Not run:** physical Windows, Safari/Firefox, NVDA/VoiceOver narration, touch/safe-area/keyboard, full 200/400% browser zoom, production, registry publish, full Vue/React/Aegea runtime, полный Gravity forensic/history. Headless Chrome evidence не заменяет эти проверки.
- **Donor safety:** отсутствие notice record подтверждено как provenance gap; объём заимствования и точная лицензирующая обязанность требуют V01. Не заявляется незаконность текущей реализации.
- **Пересмотр исходных выводов:** появление нового source SHA требует сверки затронутых areas; этот отчёт не объявляет будущие fixes проверенными. Все 12 F актуальны на указанном code-identical HEAD.
- **Scope сохранён:** источник, config, dependencies, lockfile, demo, PROGRESS и внешние задачи не исправлялись. Temp scripts/screenshots — supporting evidence, не repository deliverables. По отдельному разрешению владельца commit/push ограничиваются **двумя результатами аудита**. Commit message содержит [skip ci], чтобы не запускать push-triggered Pages workflow согласно [GitHub Actions документации](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs). План устранения не выполнялся.

Self-check перед сохранением: каждый F01–F12 имеет ровно одну verification row; N01/N02 отделены; C08 дедуплицирован; 13 C имеют 11 primary R без orphan/циклов; шесть V не являются безусловными implementations. Значения выше получены собственными измерениями либо явно помечены как исходное Astra evidence/непроверенные. Финальный Git/remote результат отправки сообщается отдельно после её проверки.
