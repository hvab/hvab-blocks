# hvab-blocks — независимый аудит, проход 1 (Astra xhigh)

Дата: 2026-10-03 (UTC). Режим: review-only. Исправления не выполнялись.

## 1. Executive summary

Найдено **12 воспроизводимых дефектов: 5 Medium и 7 Low**. Critical/High не подтверждены. Наиболее существенны обрезание действий узкого диалога, неверное отображение состояний custom controls при forced colors, недостаточный контраст рабочих подписей/сообщений, подавление selection у полосатой таблицы и зависимость документированной композиции `field + color-input` от порядка CSS.

На аудируемом исходном дереве все четыре штатные проверки (`lint:styles`, `format:check`, `demo:check`, `docs:check`) прошли. После синхронизации с prompt-only commit общий `format:check` стал FAIL только из-за форматирования двух полученных prompt-файлов; сам отчёт проходит отдельный Prettier check. Чужие prompt-файлы не исправлялись. Сборка Pages на временной копии прошла; эти результаты не подтверждают визуальную корректность. Дефекты обнаружены чтением CSS и отдельными измерениями Chrome 154.

Проверены все **32 блока**, 8 файлов foundation CSS, entrypoint, все README, генераторы, package metadata, lockfile, конфигурация и workflow. Все 33 страницы каталога открыты при ширине 1280 и 320 CSS px. Для первого README-примера каждого блока сравнивались computed styles полного entrypoint и выборочного набора зависимостей: 32/32 совпали. Отдельный тест перестановки блоков выявил F05.

Граница продукта сохранена: отсутствие JavaScript behavior, focus traps, portals, сортировки и полноценных framework bindings не объявляется дефектом CSS. Сознательно отложенный мобильный layout toast, решение о motion у `spin`, неполная RTL-поддержка и вопросы происхождения Gravity-кода вынесены отдельно.

## 2. Baseline, методы и покрытие

### 2.1 Зафиксированное состояние

- Репозиторий: `hvab/hvab-blocks`, branch `main`, package `0.2.0`.
- Аудируемый HEAD: **`b9c78a6bdccbc6d511032381b04c9b5143cc3719`**.
- Исходный `git status --short`: только ` M .project/PROGRESS.md`; diff — 7 добавленных строк плана мобильного аудита. Staged diff пуст. Эти изменения не редактировались и не считаются результатом аудита.
- В локальном checkout отсутствовал `audit/`. Первый промпт прочитан read-only из GitHub, blob **`65f394637f6c3e425d3cd3dbd087beef08b294c7`**. Удалённая `main` на момент проверки: **`fddd30b07ad43e60052a9156e6132283fd793983`**. GitHub compare показал ровно один дополнительный commit, содержащий только два audit prompt-файла; исходный код совпадает с локальным HEAD. В ходе самого аудита pull/fetch/reset/checkout не выполнялись; последующая синхронизация перед разрешённой отправкой отчёта описана в конце. Второй промпт не читался как задание и не выполнялся.
- Прочитаны применимые общие и проектные `AGENTS.md`, `AGENTS.local.md`. Релевантных проектных `.agents/skills` не найдено; найденные пользовательские skills для NL/API и оптимизации изображений к этой задаче не применялись. Требование обновлять `.project/PROGRESS.md` уступает прямому запрету пользователя изменять что-либо кроме отчёта.
- Среда: macOS **15.8**, Node **24.20.0**, npm **12.0.2**, Chrome **154.0.8037.93**, `@web/dev-server` **0.4.6**, Prettier **3.8.4**, Stylelint **17.13.0**, PostCSS **8.5.15**.
- Lockfile v3 содержит 318 записей с корневой записью. Версии 293 установленных пакетов совпадают с lockfile; 24 отсутствующие записи — optional Rollup binaries других платформ. Зависимости не устанавливались.
- Для исходных 129 tracked-файлов сняты SHA-256; перед сохранением отчёта все совпадали с baseline, включая чужой `.project/PROGRESS.md`. В конце дополнительно проверены Git status, staged diff и HEAD.

Все относительные пути и номера строк ниже относятся к аудируемому HEAD, если явно не указан другой репозиторий. Локальные пользовательские пути и секреты в отчёт не включены. Ссылки на код можно разрешить относительно [зафиксированного дерева](https://github.com/hvab/hvab-blocks/tree/b9c78a6bdccbc6d511032381b04c9b5143cc3719).

### 2.2 Coverage matrix

Обозначения: **S** — чтение всего CSS, README/API и metadata; **C** — открытие generated demo при 1280×800 и 320×800; **I** — сравнение первого README-примера через full/selective imports; **R** — дополнительное адресное runtime-воспроизведение. C не означает ручной visual review каждого пикселя/состояния.

| Область / блоки                                                                                                               | Глубина и метод                                                                                       | Ограничения / результат                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `README`, `SPEC`, `USAGE`, `VENDOR`, `tokens/README`, `AGENTS`, `CHANGELOG`, `RELEASE`, `.project/PROGRESS`, `.project/IDEAS` | Полное чтение и сверка с кодом                                                                        | Исторические планы отделены от текущего кода                                                                                                   |
| `tokens/{ref,color,typography,radius,spacing,motion,size,focus}.css`, `index.css`                                             | S; AST inventory, var dependency graph, 40 imports, theme runtime                                     | 56 одинаковых по именам light/dark ролей; отсутствующих обязательных sys/private refs и циклов не найдено; не все consumer overrides перебраны |
| `button`                                                                                                                      | S/C/I/R                                                                                               | 20 комбинаций view×size до/после disabled, публичная высота, hover/loading, reduced motion; размеры стабильны                                  |
| `field`, `color-input`                                                                                                        | S/C/I/R                                                                                               | Композиции и порядок подключения, contrast сообщений; F03/F05                                                                                  |
| `text-input`, `textarea`, `select`                                                                                            | S/C/I/R для AX text inputs                                                                            | Все варианты прочитаны; AX примеров text-input/textarea проверен; native picker/menu в разных OS не тестировался                               |
| `checkbox`, `radio`, `switch`                                                                                                 | S/C/I/R                                                                                               | Native focus/Space, forced colors, disabled mixed; F02/F08; RTL switch отдельно как ограничение                                                |
| `radio-group`                                                                                                                 | S/C/I/R                                                                                               | Native/ARIA/data selectors, group disabled hover, AX всех примеров; F07                                                                        |
| `range-input`                                                                                                                 | S/C/I/R                                                                                               | Анатомия, track/thumb pseudos, invalid/disabled selectors, размеры datalist; Firefox native pseudos не запускались                             |
| `modal`, `dialog`                                                                                                             | S/C/I/R                                                                                               | Div и native hosts, 1280/375/320 px, длинные действия, divider, backdrop, native background scroll; F01/F06/F10                                |
| `sheet`                                                                                                                       | S/C/I/R                                                                                               | 320×568, длинный body, max-height, достижимость последней кнопки; физические safe areas и экранная клавиатура не эмулировались                 |
| `toast`, `tooltip`, `popover`                                                                                                 | S/C/I; R toast geometry/contrast, popover anchor                                                      | Closed/open/arrow CSS прочитан; collision/portal behavior не входит в core; F03/F11                                                            |
| `table`                                                                                                                       | S/C/I/R                                                                                               | Striped+selected+interactive, actual hover; F04; sorting/virtualization не поставляются                                                        |
| `tabs`, `pagination`, `breadcrumbs`                                                                                           | S/C/I                                                                                                 | Прочитаны states, focus, overflow и semantic examples; все keyboard поведения consumer не симулировались                                       |
| `text`, `label`                                                                                                               | S/C/I/R                                                                                               | Светлая/тёмная схема, alpha-composited contrast, API; F03                                                                                      |
| `alert`, `card`                                                                                                               | S/C/I                                                                                                 | Themes, slots, selection/focus declarations, границы skin/behavior                                                                             |
| `progress`, `skeleton`, `spin`                                                                                                | S/C/I/R                                                                                               | Reduced motion computed animations; AX progress; намеренное исключение spin отмечено отдельно                                                  |
| `divider`, `icon`, `hotkey`, `link`                                                                                           | S/C/I                                                                                                 | Modifiers, inherited colors, SVG/label responsibilities; privacy-sensitive `:visited` визуально не доказывался                                 |
| Все `demo/*.html`, `demo/demo.css`                                                                                            | C, exact `demo:check`, чтение источника генерации/общего CSS                                          | Generated HTML не перечитывался вручную построчно; источник примеров прочитан, синхронность проверена машиной                                  |
| Все 3 `scripts/*.mjs`                                                                                                         | Полное чтение, безопасные команды; Pages только в копии                                               | Непривилегированный sandbox сначала блокировал localhost; после разрешённого запуска каталог проверен                                          |
| `package.json`, lockfile, configs, `.github/workflows/pages.yml`                                                              | Чтение + AST/JSON, pack dry-run, локальный Pages output                                               | GitHub workflow/deployment/npm publish не запускались                                                                                          |
| Gravity UI                                                                                                                    | Read-only: version/SHA/license, выборочные light/dark/typography/SegmentedRadioGroup/Dialog исходники | Не полный diff upstream; реальная версия исходного порта не зафиксирована проектом                                                             |
| Selecta                                                                                                                       | Read-only: package dependency, `src/ui/hvab.css`, Button/Checkbox/RadioGroup/ConfirmDialog wrappers   | Реальные Vue wrappers существуют; full Vue runtime и сборка Selecta не запускались                                                             |

Непрочитанное/непроверенное: все содержимое `node_modules`, полный upstream Gravity, архивы pale/viby/balder, история каждого решения, GitHub Issues, production/demo deployment, остальные исходники Selecta, Aegea, реальные React-приложения, Safari/Firefox, физические Windows high-contrast и iOS, screen reader speech, touch devices, browser zoom 200/400%. Узкие CSS viewports не объявляются эквивалентом полного zoom-теста.

### 2.3 Журнал проверок

Перед запуском прочитаны scripts. Временная копия содержит текущие tracked-файлы; `node_modules` подключён symlink по существующему пути и использовался без установки/изменения зависимостей. Локальные имена временных каталогов нормализованы ниже как `<temp>`; эти утилиты и screenshots не являются deliverables и не добавлялись в репозиторий. Основные сценарии воспроизводятся по snippets и измерениям в findings.

| Команда / проверка                                                                        | Среда                          | Статус                                    | Что установлено и чего не доказывает                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `git status --short`, `git rev-parse HEAD`, `git diff --stat`, `git diff --cached --stat` | Исходный checkout              | PASS                                      | Зафиксирован baseline; исходный staged diff пуст                                                                                                                                                                                 |
| `npm run lint:styles`                                                                     | Исходный checkout              | PASS                                      | Нет lint errors; это не проверка cascade/contrast                                                                                                                                                                                |
| `npm run format:check`                                                                    | Исходный checkout, до отчёта   | PASS                                      | Все matched-файлы отформатированы                                                                                                                                                                                                |
| `npm run demo:check`                                                                      | Исходный checkout              | PASS                                      | Generated HTML совпадает с текущими README                                                                                                                                                                                       |
| `npm run docs:check`                                                                      | Исходный checkout              | PASS                                      | Проверяемые metadata/public token mentions присутствуют; не проверяет всю семантику                                                                                                                                              |
| `git diff --check`                                                                        | Исходный checkout              | PASS                                      | Нет whitespace errors в исходном diff                                                                                                                                                                                            |
| `npm run pages:build`                                                                     | Временная копия                | PASS                                      | `dist` создан без изменения исходного дерева                                                                                                                                                                                     |
| `npm run demo:check` после сборки                                                         | Временная копия                | PASS                                      | Генерация оставила синхронный demo                                                                                                                                                                                               |
| `npm pack --dry-run --json --ignore-scripts --cache <temp-cache>`                         | Временная копия, offline/local | PASS (манифест); F12 по содержимому       | 79 entries, все 32 block CSS и radio-group включены; публикации и записи tarball не было                                                                                                                                         |
| `node <temp>/hvab-astra-static.cjs`                                                       | Node/PostCSS, read-only        | PASS с оговорками                         | Inventory, color pairs, обязательные refs/cycles, отсутствие public assignments/global selectors/inter-block imports; найденные 92 прямых sys-reference occurrences в обычных declarations — drift контракта, не 92 runtime bugs |
| `node <temp>/hvab-astra-distribution.cjs`                                                 | Временная копия                | PASS Pages / FAIL doc links               | 33 HTML и их локальные href/src существуют; в npm manifest отсутствуют цели 6 doc-ссылок (F12)                                                                                                                                   |
| `npm start -- --hostname 127.0.0.1 --port 8793`                                           | Sandbox, временная копия       | FAIL / BLOCKED                            | `listen EPERM`; CLI вернул 0 несмотря на сообщение ошибки — это не успешный запуск                                                                                                                                               |
| Headless Chrome launch                                                                    | Sandbox                        | FAIL / BLOCKED                            | Процесс завершился с 134; этот запуск не использован как evidence                                                                                                                                                                |
| `npm start -- --port 8793` + изолированный headless Chrome                                | После разрешённого escalation  | PASS                                      | `/demo/` обслуживается; временный профиль Chrome, localhost, без пользовательского профиля                                                                                                                                       |
| `node <temp>/hvab-astra-runtime.mjs`                                                      | Chrome DevTools Protocol       | PASS исполнения; FAIL отдельных сценариев | 66 открытий demo; viewport, computed style, geometry, AX, forced colors, reduced motion. Browser exception не обнаружено; единственный resource error — отсутствующий `favicon.ico`                                              |
| `node <temp>/hvab-astra-runtime2.mjs`                                                     | Chrome DevTools Protocol       | PASS исполнения; FAIL отдельных сценариев | Темы/public overrides, 20 button sizes, alpha contrast, keyboard, sheet reachability, native scroll, popover                                                                                                                     |
| `node <temp>/hvab-astra-selective.mjs`                                                    | Chrome DevTools Protocol       | PASS 32/32 / FAIL reversed mix            | По 20 computed properties на каждом classed element первого README-примера full/selective совпали. Перестановка field/color-input меняет ширину 28→984 px (F05); `dist/index.html` содержит 32 ссылки                            |
| SHA-256 всех 129 исходных tracked-файлов                                                  | До сохранения и финально       | PASS                                      | Исходное дерево и чужой diff не изменены                                                                                                                                                                                         |
| Safari/Firefox, полноценный zoom/touch/screen-reader, React/Vue runtime suite             | —                              | NOT RUN                                   | Нет такой проверки; доступность Chrome не заменяет её                                                                                                                                                                            |
| `npm ci`, `npm audit`, workflow, publish, production                                      | —                              | NOT RUN                                   | Не требовались для разрешённого локального аудита; зависимости/сеть не изменялись                                                                                                                                                |

После сохранения отчёта и синхронизации с `fddd30b` выполнен повторный `npm run format:check`: **FAIL**, предупреждения только для `audit/1-astra-xhigh-prompt.md` и `audit/2-sol-6-1-xhigh-verify-prompt.md`. Отдельный `./node_modules/.bin/prettier --check audit/1-astra-xhigh.md`: **PASS**; `git diff --check`: **PASS**. Это существующее форматирование входных заданий, добавленных другим коммитом, а не регрессия исходников или отчёта. Их форматирование не входит в разрешённый scope.

## 3. Findings

### F01 — Medium — Длинные действия узкого диалога обрезаются с недостижимого начала строки

**Уверенность:** высокая; runtime reproduction и screenshot Chrome. **Код:** `blocks/dialog/dialog.css:77–84`, `.hb-dialog__footer`; `blocks/button/button.css:44` (`white-space: nowrap`); `blocks/modal/modal.css:55–60`, панель с `overflow: auto`.

**Ожидание и контракт:** dialog владеет внутренней раскладкой header/body/footer (`blocks/dialog/README.md:3`); панель должна удерживать эту композицию доступной на экране. Чужой план мобильного аудита также явно упоминает доступность modal actions; это контекст, а не доказательство.

**Сценарий:** подключить `index.css`, использовать div-host modal с `.hb-modal__panel > .hb-dialog`, ширину viewport 320 px и две обычные кнопки footer: «Сохранить изменения», «Отменить изменения». Никаких resets или overrides блока; для измерений body `margin:0; font:16px Arial`. У панели ширина **272 px**, отступы footer оставляют **208 px**, кнопки вместе с gap требуют **317.80 px**. Из-за `justify-content:flex-end` без wrap первая начинается в **x = −53.80**, при левой границе панели **x = 24**. Начало текста и часть hit area срезаны `overflow:auto` панели. Screenshot показывает только хвост первой надписи.

**Влияние:** реальные локализованные/длинные действия мобильного диалога частично недоступны; появляется и при сужении доступной CSS-ширины. Вероятность высокая для этого предусловия, охват — dialog footer. Короткие Cancel/Delete на 320 px помещаются, поэтому это не утверждение о любой модалке.

**Альтернативы/false positive:** это не отсутствие focus trap или действия consumer. Повторяется на plain HTML вне demo и без Vue; отрицательный start overflow нельзя считать полноценным горизонтальным scroll fallback. F06 — другая причина overflow, наблюдается и с короткими действиями.

**Минимальное направление:** определить wrapping/stacking или другой безопасный responsive layout для footer, сохранив публичные токены. Проверка результата: 320/375 px, короткие и длинные подписи, обе кнопки целиком внутри доступной панели; затем keyboard/zoom. Не просто скрывать overflow.

### F02 — Medium — Forced colors меняет смысл checkbox/radio и делает switch невидимым

**Уверенность:** высокая для Chrome forced-colors emulation; физическая Windows-среда не проверялась. **Код:** `blocks/checkbox/checkbox.css:23,41–50,62–80`; `blocks/radio/radio.css:41–50,60–74`; `blocks/switch/switch.css:45–78`.

**Ожидание:** документированные checked/unchecked состояния должны оставаться визуально различимыми; native control сохраняет реальное значение, но полностью скрыт через `opacity:0`. [CSS Color Adjustment Level 1](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-mode) описывает замену authored colors в forced-colors mode.

**Минимальный пример:** два обычных README checkbox (`checked` у одного), checked radio и checked switch; `index.css`; эмулировать `forced-colors: active`. У unchecked checkbox `::before` постоянно существует и скрывается только прозрачным `currentcolor`. Chrome заменяет цвет и border color на **`rgb(0,0,0)`**: оба чекбокса нарисованы с галочкой. У checked radio точка и фон box становятся белыми, точка исчезает. У switch фон track и thumb также белые; границ нет, весь индикатор исчезает. Native input по-прежнему `opacity:0`. Результат проверен не только computed styles, но и screenshot.

**Влияние:** пользователь forced-colors не может надёжно узнать значение нескольких базовых контролов. Условие ограничено этим режимом, но ошибка систематическая для указанной реализации.

**Альтернативы/false positive:** default mode показывает различимые состояния; checked действительно различается в DOM. Не требуется JS и не предлагается переносить headless behavior в core. Отключённые upstream high-contrast _темы_ и пользовательский browser forced-colors — разные механизмы.

**Минимальное направление:** обеспечить forced-colors rendering через системные цвета/границы и явное присутствие mark только в нужном состоянии либо native fallback. Проверить unchecked/checked/mixed/disabled/focus в эмуляции и Windows high contrast. Не применять blanket `forced-color-adjust:none` без проверки читаемости.

### F03 — Medium — Рабочие подписи, помощь и статусы имеют недостаточный контраст по умолчанию

**Уверенность:** высокая; computed colors, alpha compositing и расчёт luminance. **Код:** `tokens/color.css:18–19,26–34` и dark counterparts; `blocks/field/field.css:17–22,35–39,55–69`; `blocks/toast/toast.css:50–52,91–96`; `blocks/label/label.css:73–85`; `blocks/text/text.css:160–185`.

**Ожидание:** реальные labels/help/status content должны оставаться читаемыми. Для оценки использован критерий [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 4.5:1 для обычного текста. Это внешний измеримый критерий, а не заявление, что библиотека обещала полную сертификацию WCAG.

**Воспроизведение:** открыть `demo/field.html`, `text.html`, `label.html`, `toast.html`; для обеих схем взять computed color и background каждого ancestor, скомпозить alpha над реальным фоном страницы, затем вычислить WCAG contrast. Здесь нет изображений/градиентов или ancestor opacity у измеренных элементов. Примеры:

| Содержимое                 | Схема / реальный фон                          | Размер | Contrast                    |
| -------------------------- | --------------------------------------------- | ------ | --------------------------- |
| Field label                | light, white; black 50%                       | 13px   | **3.977:1**                 |
| Field help                 | light, white; black 30%                       | 11px   | **2.108:1**                 |
| Field help                 | dark, black; white 30%                        | 11px   | **2.465:1**                 |
| Field warning              | light, white; `rgb(189 142 75)`               | 11px   | **2.943:1**                 |
| Toast message              | light float white; black 50%                  | 13px   | **3.977:1**                 |
| Toast message              | dark float `rgb(56 52 56)`; white 50%         | 13px   | **4.352:1**                 |
| Label info/success/warning | light, собственный alpha background над white | 13px   | **4.304 / 3.706 / 3.849:1** |
| Text info/positive/warning | light, white                                  | 13px   | **3.576 / 2.957 / 2.943:1** |

**Влияние/охват:** не только decorative hint: дефолтные подписи enabled controls и содержательная помощь/уведомления. Вероятность определяется использованием стандартных ролей; CSS-wide роли затрагивают несколько блоков.

**Альтернативы/false positive:** disabled controls исключены; проверялись действующие labels и сообщения. Цвета не сравнивались с абстрактным фоном без alpha. Например, field error на white даёт 4.627:1, dark labels на black — 5.281:1; они не включены в дефект. Совпадение цвета с донором не гарантирует контраст после выбора размеров и surface.

**Минимальное направление:** пересмотреть назначения ролей для функционального текста и документировать допустимые пары; где уместно брать более контрастные donor roles. Проверить весь набор light/dark surfaces после изменения, не объявлять все hint/disabled colors ошибочными и не менять тему вслепую.

### F04 — Medium — Zebra table подавляет выбранность и hover чётных строк

**Уверенность:** высокая. **Код:** `blocks/table/table.css:95–111`, `.hb-table.hb-table_striped … :nth-child(even)`, `.hb-table__row_interactive:hover`, `[aria-selected='true']`. **Ожидание:** README Table отдельно обещает stripe и selection background, без ограничения на их совместное применение; SPEC §3.3 требует предсказуемого cascade.

**Сценарий:** таблица `.hb-table.hb-table_striped`, `tbody.hb-table__body`, строки `.hb-table__row.hb-table__row_interactive`, у первых двух `aria-selected="true"`. Первая строка имеет **`rgba(22,24,29,0.08)`** (selection), вторая — **`rgba(0,0,0,0.05)`** (zebra), как невыбранная четвёртая. Hover второй оставляет zebra. Причина: specificity zebra **0,5,0**, interactive hover **0,3,0**, selected **0,2,0**. Положение selected-правила ниже не помогает. Для нечётной selected строки hover также может вытеснить selection из-за большей специфичности.

**Влияние:** визуальное состояние выбора зависит от номера строки; sorting/reordering меняет его вид при неизменном `aria-selected`. Ограниченный, но реальный дефект таблицы.

**Альтернативы/false positive:** native/ARIA значение не менялось; public `--hb-table-row-background` не задавался, так что это не намеренный consumer override. Hover третьей строки работал, подтверждая действительный pointer input.

**Минимальное направление:** явно задать приоритет selected/hover/zebra, уменьшить specificity stripe или развести defaults и states. Проверка: все комбинации even/odd × selected/unselected × hover, обе схемы и внешний public override.

### F05 — Medium — `field + color-input` зависит от порядка подключённых блоков

**Уверенность:** высокая. **Код:** `blocks/field/field.css:43–45` и `blocks/color-input/color-input.css:25–28`; пример прямого mix присутствует в `blocks/color-input/README.md:38–42`. **Контракт:** SPEC §6 требует tokens перед blocks; SPEC §8 запрещает зависимость блока от порядка других блоков. USAGE разрешает selective imports.

**Сценарий:** подключить все 8 token CSS, затем `field.css` и `color-input.css`; разметка `<div class="hb-field"><input type="color" class="hb-field__control hb-color-input"></div>`. На viewport 1000 px с UA body margin input имеет **28 px**. Поменять местами только два block CSS — input становится **984 px**. В обоих случаях присутствует всё необходимое, public tokens не переопределялись, семантический input тот же. `width:100%` и token-based width имеют одинаковую specificity и побеждают по source order.

**Влияние:** выборочный copy/import либо иной порядок CSS bundler меняет геометрию документированной композиции. Вероятность ограничена перестановкой этих блоков; текущий `index.css` использует рабочий порядок.

**Альтернативы/false positive:** отсутствие tokens исключено. Все 32 initial examples full/selective совпали при обычном порядке; это отдельный порядок-зависимый случай, а не поломка всего selective loading. Коллизия относится к официально показанному mix, не к произвольным конфликтующим consumer classes.

**Минимальное направление:** согласовать владение шириной slot и самостоятельного input, сохранив tokens и официальную анатомию. Проверка: обе перестановки imports, inline/vertical field, standalone color input, public width override. Документирование обязательного межблочного порядка требует явного пересмотра контракта.

### F06 — Low — Divider создаёт лишний горизонтальный scroll даже у обычного диалога

**Уверенность:** высокая. **Код:** `blocks/dialog/dialog.css:87–92`; markup `blocks/dialog/README.md:8–23`. **Ожидание:** divider растягивается до границ panel; комментарий говорит о компенсации side padding. Но padding задан дочерним header/body/footer, а сам dialog-root не имеет его.

**Сценарий:** стандартный dialog с короткими Cancel/Delete и прямыми `hr.hb-dialog__divider`. При viewport 1280 panel `clientWidth=480`, divider width **544**, panel `scrollWidth=512`. При 320: panel **272**, divider **336**, `scrollWidth=304`. Отрицательные margins расширяют root на 32 px с каждой стороны. Удаление только divider из временного DOM даёт `scrollWidth=clientWidth=272`.

**Влияние:** лишний горизонтальный scroll/срез линий во всех показанных композициях с прямым divider; небольшой, но воспроизводимый layout defect. F01 не дубликат: там длинные кнопки уходят в отрицательное начало даже без необходимости в divider.

**Альтернативы:** не вызвано отсутствием global reset, размером label или consumer padding. Минимальное направление — согласовать divider с реальным местом padding; проверить desktop/narrow, default/custom side-padding и отсутствие лишнего scrollWidth. Не менять все margins без проверки анатомии.

### F07 — Low — Hover возвращает активный цвет option внутри disabled radio-group

**Уверенность:** высокая. **Код:** `blocks/radio-group/radio-group.css:145–153,183–189`; expected API `blocks/radio-group/README.md:128` разрешает disabled на корне группы.

**Сценарий:** `<div class="hb-radio-group" data-disabled>` с обычным option/input, без `disabled` на самом input. До pointer hover color option **`rgba(0,0,0,0.3)`**, после — **`rgba(0,0,0,0.85)`**. Hover rule исключает disabled на control, но не на group; specificity выше group-disabled selector. На light фоне disabled и hover backgrounds случайно одинаковы, поэтому надёжное evidence — изменение text color.

**Влияние:** группа, документированная как muted, визуально отвечает как enabled. Охват — root-only `data-disabled`/`aria-disabled`, unchecked option; native disabled input исключён hover selector корректно.

**Альтернативы:** не утверждается, что aria/data должны сами блокировать выбор: это consumer behavior. Defect только в обещанном визуальном disabled. Минимальное направление — учесть состояние группы в hover eligibility/priority; проверить native, root ARIA/data, keyboard focus, обе схемы.

### F08 — Low — Native disabled + mixed checkbox теряет ожидаемую различимость отметки

**Уверенность:** высокая. **Код:** `blocks/checkbox/checkbox.css:144–163,166–192`, особенно перечень checked-disabled combinations в 185–190; documented states `blocks/checkbox/README.md:79–81`.

**Сценарий:** обычная README-анатомия, input `type="checkbox" disabled aria-checked="mixed"`. Mixed rule рисует minus белым brand-contrast; disabled rule меняет background на black 7%, но заключительное icon rule покрывает только matched families (`aria-disabled + aria-checked`, `data-disabled + data-state`, native disabled + native checked). Native disabled + mixed не совпадает. Runtime: mark **white**, box **`rgba(0,0,0,0.07)`**. На white surface получается почти неразличимый minus, в отличие от native checked+disabled с hint mark. Установка JS `indeterminate` сама по себе этот selector gap не закрывает: styles читают атрибуты.

**Влияние:** пользователь теряет ясное представление о mixed состоянии недоступного checkbox; это ошибка совместного оформления двух поддержанных состояний. Охват узкий. Не заявляется нарушение contrast criterion для disabled controls — у них есть исключение.

**Альтернативы:** публичные overrides отсутствуют; речь не об обязанности CSS управлять `indeterminate`. Минимальное направление — покрыть поддержанные cross-family combinations либо явно определить ограничения; проверить native disabled+mixed/data-state и ARIA/data с native checked в обеих схемах.

### F09 — Low — Часть copy-paste примеров не имеет доступного имени

**Уверенность:** высокая, Chrome accessibility tree. **Код:** `blocks/text-input/README.md:9,24–26,76`; `blocks/textarea/README.md:9,16–18,24–27,34–36,97–100`; `blocks/progress/README.md:8–17,52–54`. Generated pages faithfully повторяют эти примеры.

**Ожидание:** опубликованные примеры должны показывать работающую семантику, когда сами создают interactive/status roles; responsibility consumer не требует оставлять документированный пример без имени. Критерий для оценки — [WCAG 2.2 SC 4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html).

**Сценарий:** открыть соответствующий demo и прочитать AX tree. У text-input с `value="My theme"`, `Default`, `Invalid` и pill override `name=""`; у textarea с собственным текстом и без label/placeholder также `name=""`; оба `role="progressbar"` без имени. Field composition с настоящими labels именуется правильно. Placeholder использовался Chrome как fallback name у части других примеров — они не включены в пустые имена.

**Влияние:** ухудшение использования каталога с assistive technology и распространение неполной разметки при копировании. Это дефект примеров, не требование встроить генерацию labels в CSS.

**Альтернативы:** value/textContent textarea — значение, а не label; heading карточки не связан с control. Иконные checkbox/switch в этом Chrome получили имя из label: утверждение об их безымянности проверено и отклонено. Минимальное направление — labels или explicit accessible names в README, затем generated demo; повторить AX и screen-reader smoke.

### F10 — Low — Документация ошибочно обещает native dialog scroll lock от браузера

**Уверенность:** высокая для проверенного Chrome. **Код:** `blocks/modal/README.md:86`. **Ожидание по этой строке:** consumer добавляет scroll lock только div host, native `<dialog>` получает его от UA.

**Сценарий:** страница с обычным content высотой 3000 px, `<dialog class="hb-modal__panel">…</dialog>`, `showModal()`, wheel `deltaY=500` на backdrop. `dialog.open === true`, но **`window.scrollY === 500`**. Остальной CSS только entrypoint. Native backdrop при этом действительно нарисован (`rgba(0,0,0,0.25)`); `showModal()` сработал.

**Влияние:** consumer, следующий boundary docs, оставит фон прокручиваемым. Вероятность — native host на scrollable page в данном браузере; не переносится автоматически на каждый engine.

**Альтернативы:** modal top layer/inertness и scroll locking — разные эффекты. Это documentation bug; отсутствие JavaScript lock внутри библиотеки намеренно и не предлагается как исправление. Минимальное направление — скорректировать boundary docs и дать consumer проверяемую ответственность; проверить wheel/touch и восстановление позиции в поддержанных браузерах.

### F11 — Low — Anchored popover demo отодвигает меню на 168 px и выводит его из зарезервированного места

**Уверенность:** высокая. **Код:** `blocks/popover/README.md:16–21`. **Ожидание:** inline placement должен демонстрировать popup рядом с anchor, согласно описанию примера.

**Сценарий:** `demo/popover.html`, desktop. У relative inline-block parent задан `padding-block-end:160px`; меню имеет `top:calc(100% + 8px)`. 100% уже включает этот padding. Runtime: button bottom **452**, menu top **620**, gap **168 px**. Зарезервированный padding оказывается перед menu, а меню выступает вниз в область source preview.

**Влияние:** каталог даёт визуально сломанный пример и неверную starting point для consumer placement. Core `.hb-popover` тут не виноват; Floating UI не запускался и не должен исправлять статический stand-in.

**Альтернативы:** измерение без consumer override, это generated exact README content. Минимальное направление — разделить anchor containing block и внешнее резервирование высоты. Проверка: menu начинается на ожидаемом gap и остаётся внутри preview footprint после повторной генерации.

### F12 — Low — Пакетная документация ссылается на исключённый changelog и другие отсутствующие файлы

**Уверенность:** высокая, локальный npm pack dry-run. **Код:** `package.json:7–13`, `USAGE.md:60` и `README.md:50–51`.

**Ожидание:** dependency-потребителю предлагается прочитать changelog до обновления публичного API; относительная ссылка должна разрешаться в доставленной документации либо вести к закреплённому внешнему источнику.

**Сценарий:** `npm pack --dry-run --json --ignore-scripts` на копии; проверить файлы по `files`. 79 entries содержат `README.md`, `USAGE.md`, `VENDOR.md`, CSS/README блоков, но **не** `CHANGELOG.md`, `RELEASE.md`, `AGENTS.md`, `SPEC.md`. Из README/USAGE шесть ссылок ведут к этим отсутствующим целям, включая три вхождения CHANGELOG. Все block docs и CSS при этом присутствуют.

**Влияние:** опубликованный по текущему manifest пакет имеет недоступную migration/reference документацию. Охват — optional npm/package consumption; checkout/copy tree имеет эти файлы. Реальная публикация пакета не проверялась, утверждение относится к воспроизводимому текущему manifest.

**Альтернативы:** это не проблема `exports` CSS и не отсутствие radio-group в пакете. Минимальное направление — включить нужные consumer docs, прежде всего changelog, либо заменить ссылки на version-pinned URLs; проверить pack manifest и разрешение всех ссылок без публикации.

## 4. Архитектурные наблюдения и documentation drift

### 4.1 Формальный SPEC строже фактической архитектуры

SPEC §2.1/§2.3/§2.4 объявляет исключений почти нет: только собственные component tokens в declarations, оформление modifiers/states только через private tokens, отсутствие raw geometry с sys-домом. В реализации есть прямые motion/sys ссылки (например `button.css:55–58`, `radio.css:63,74`), visual declarations в modifiers/states (`text.css:194–199`, `field.css:29–32`, `tabs.css:98`) и raw значения размеров/padding (`label.css`, `radio-group.css`, `tabs.css`). AST нашёл 92 occurrences прямых sys references в non-custom declarations, в основном transition duration/easing.

Это **не** 92 доказанных пользовательских дефекта. Публичные `--hb-<block>-*` нигде не присваиваются самим block CSS; базовый механизм public fallback работает. Но буквальное утверждение «без исключений» уже не описывает код. Нужен осознанный выбор: подтвердить ограниченные исключения и привести SPEC в соответствие либо изменить реализацию там, где это даёт измеримое преимущество. Не вводить сотни лишних tokens только ради формальности.

### 4.2 Reduced motion: реальное, документированное исключение spin

`tokens/motion.css` обнуляет duration; в Chrome button/progress loading получают `0s`, активных animations нет; skeleton pulse получает `animation-name:none`. `spin` остаётся `hb-spin 1s infinite` с running animation. Это прямо предписано `blocks/spin/README.md:64`, но противоречит общему ожиданию reduced motion в SPEC §7.8. Поэтому это **конфликт документированных решений**, а не случайно забытый guard. Следующая проверка — согласовать продуктовую политику и доступный статический loading indicator; не менять молча по результату аудита.

### 4.3 Provenance Gravity и attribution не замыкаются на доставляемый пакет

Локальный donor доступен read-only: `@gravity-ui/uikit` **7.43.0**, SHA **`c1702e6aa9fcac95537e9af0646d619e1ea0d453`**, чистый tracked status при осмотре. Это версия доступного donor, **не доказанная версия первоначального порта**.

В SPEC §11 Gravity явно объявлен источником. Совпадения подтверждены выборочно: light info/positive/warning/danger после разрешения donor aliases равны `rgb(52 139 220)`, `rgb(48 170 110)`, `rgb(189 142 75)`, `rgb(233 3 58)`; body-1 13/18 и display-1 28/36, segmented-control sizes/paddings и его pseudo-element структура. Monochrome brand override явно документирован в `tokens/README.md` и не считается ошибкой относительно yellow Gravity.

При этом project `LICENSE:3` содержит только собственный copyright; [donor LICENSE на проверенном SHA](https://github.com/gravity-ui/uikit/blob/c1702e6aa9fcac95537e9af0646d619e1ea0d453/LICENSE) содержит `Copyright (c) 2021 YANDEX LLC`. Donor notice и version/SHA порта не найдены в `VENDOR.md`, блоках/tokens или pack manifest. VENDOR учит записывать provenance hvab-копии, но не фиксирует происхождение самого Gravity-порта; SPEC с attribution не входит в npm files.

Это существенный **provenance/attribution риск с доказанным отсутствием записи**, без правового заключения о конкретном объёме заимствования. Перед следующей дистрибуцией нужно установить реальную исходную ревизию/объём переноса и необходимую upstream notice, затем проверить её попадание в package и copy-first процесс. Полный forensic diff и правовая оценка в этот аудит не входят.

### 4.4 Документы и coverage tooling

- README сообщает 32 блока — верно. `USAGE.md` catalogue перечисляет 31: **radio-group отсутствует**, хотя есть CSS, README, generated page и import.
- AGENTS/SPEC исторически говорят о будущих wrappers в `src/components/ui/` и старом пути `ThemeControls.vue`. Read-only осмотр Selecta на SHA **`3df22e0167c773a04bdefcb69c722e112068efcc`** обнаружил реальные wrappers в `src/ui/`, `src/components/ThemeControls/ThemeControls.vue`, dependency `hvab-blocks#v0.2.0`. Button/Checkbox/RadioGroup используют публичные классы/атрибуты; ConfirmDialog компонует Reka с modal/dialog. Это подтверждает наличие интеграции по коду, не проверенную совместимость всех Vue runtime-сценариев. Selecta имела чужие изменения `.project/PROGRESS.md` и `src/components/App/App.vue`; они не редактировались и приложение не запускалось.
- `scripts/check-docs.mjs` пропускает block без README (`continue`), проверяет наличие token names подстрокой и не проверяет states, actual semantics, inventory completeness или все относительные ссылки. Для текущего дерева README есть у всех 32, поэтому гипотетическое удаление README не объявляется существующим bug.
- `build-demo.mjs` экранирует заголовки/lead/source view, но намеренно вставляет trusted README HTML в live preview. В текущем проекте не найден внешний пользовательский/сетевой путь, превращающий это в XSS; небезопасная абстрактная «HTML injection» не заведена как finding.
- Pages workflow делает build/deploy, но не запускает все lint/docs gate. Это ограничение процесса, не доказательство неработающего production deploy. Workflow не запускался и удалённый сайт не проверялся.
- `.browserslistrc` содержит только `defaults`: это изменяемая выборка, не зафиксированный minimum engine. Полная поддержка `:has`, logical properties, `1lh`, native controls и `::backdrop` на всех engines этим аудитом не доказана.

## 5. Ограничения, гипотезы и следующие минимальные проверки

| Случай                                 | Наблюдение / классификация                                                                                                                                                                             | Следующая минимальная проверка                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Mobile toast                           | При 320×568 fixed region имеет width 320 и x=−12 из-за end inset. `toast/README.md` прямо откладывает mobile full-width layout. Это известная граница, не новый F                                      | При принятии mobile scope проверить clamped width, insets, safe areas и длинные сообщения                                        |
| RTL switch/select/tooltip sides        | У checked switch с `dir=rtl` thumb `left:18px` плюс physical `translateX(16px)` при track 36px выносит thumb наружу. Полная RTL поддержка не обещана; directional semantics других блоков не перебраны | Уточнить RTL support contract, затем проверить logical start/end и physical positioning data-side во всех directional blocks     |
| Narrow demo shell                      | В 320px catalogue overflow: color-input 338px, modal/toast 368px, text 336px. Это не означает такое же page overflow у каждого production host                                                         | Отдельно отделить shell intrinsic grid sizing, demo-only inline styles и block constraints; проверить 320/375/zoom после F01/F06 |
| Font/touch/zoom                        | Контролы desktop-size часто меньше 44px; SPEC требует увеличения только на touch-target screens. Это не blanket defect desktop scale                                                                   | Проверить реальный touch consumer, hit area и font enlargement, включая iOS input zoom                                           |
| Close slot, very long unbroken content | Код допускает потенциальные overlaps; exhaustive title/URL matrices не выполнялись                                                                                                                     | Синтетические long tokens/title + close, resize/zoom; не превращать предположение в подтверждённый F                             |
| Contrast outside tested surfaces       | Alpha цвета зависят от actual background, consumer theme и opacity                                                                                                                                     | Проверить дополнительные floating/modal/custom-brand surfaces и focus contrast; результаты F03 не сертификат полного UI          |
| Accessibility                          | AX names и CSS focus проверены частично; no screen reader narration, полная focus order/ARIA validation не выполнена                                                                                   | VoiceOver/NVDA smoke, native/headless mixed values, focus and disclosure state wiring в consumer                                 |
| API версии                             | v0.2.0 additive radio-group и v0.1.1 button fix согласуются с осмотренным деревом и changelog; all-history ABI diff не делался                                                                         | Перед breaking release сравнить class/public-token/state inventory двух нужных tags                                              |

## 6. Что работает и что не следует менять без причины

- Простые CSS файлы действительно можно подключать без build. Нет JS в blocks, нет hidden inter-block imports, global element reset или обнаруженных ненеймспейсных block selectors; keyframes имеют `hb-` names.
- Optional empty reference layer допустим и прямо описан. Не нужно добавлять raw palette только ради наличия ref → sys стрелки. Отсутствие деклараций public component tokens с рабочим fallback — корректный API, а не undefined-token defect.
- 56 color roles имеют обе схемы; missing required sys/private refs и cycles не обнаружены. Runtime подтвердил root theme override, dark/light nesting и inherited public `--hb-button-height:52px`, переживающий `size_xl` и disabled.
- Все 20 button view×size cases сохранили width/height после native disabled; не следует отменять исправление border footprint из 0.1.1.
- Нативные checkbox/radio/switch реагировали на Space, получали `:focus-visible` и 2px outline; input не удалён из accessibility tree. Forced-colors дефект не означает, что нужно заменить native semantics собственной JS-реализацией.
- Long sheet при 320×568 держит panel height 544px, content height 524px; после `scrollTop=1220` последняя кнопка достигает видимого bottom=568px. Это проверка конкретной длинной композиции, не всех mobile environments.
- Реальный native dialog backdrop отрисовался; top layer не требует добавления глобального z-index. Consumer behavior boundary следует сохранить, исправив конкретную ошибку документации F10.
- Generated demo синхронен README; локальная Pages структура и links целы. Не редактировать generated HTML вручную.
- Color-input/range browser UI, tabs keyboard management, tooltip collisions, modal focus traps, toast timers, sorting и React/Vue state остаются у consumer. Не раздувать CSS core framework bindings ради этих функций.

## 7. Remediation-направления и вход для независимой проверки

1. **Сначала подтвердить F01–F05** по приведённым предусловиям и значениям. Для F01/F02 полезны screenshot и геометрия/AX вместе; lint не способен подтвердить исправление. F05 проверить отдельно от обычного selective import, который проходит.
2. **Layout:** F01 и F06 находятся рядом, но требуют отдельных regression cases: длинные действия и обычный divider. Скрытие overflow не является общим решением. Известный mobile-toast scope не смешивать с подтверждёнными ошибками modal.
3. **Состояния и доступность:** F02/F04/F07/F08 исправлять через существующие classes/attributes/private tokens; F03 требует согласованного решения о semantic roles и проверки реальных background pairs. F09 правится в источниках README с последующей генерацией.
4. **Docs/distribution:** F10–F12 и отсутствующий radio-group в USAGE не требуют изменения framework boundary. Восстановление donor provenance/notice предваряет решение о следующей дистрибуции; данный аудит ничего не публикует.
5. После согласования изменений использовать существующие lint/format/docs/demo commands плюс адресные runtime cases, затем Safari/Firefox/Windows forced-colors и consumer smoke. Здесь не создаются issue drafts, plan commits или исправления.

Единственный результат аудита в репозитории — `audit/1-astra-xhigh.md`; исправлений исходников нет. После завершения проверок родительский тред передал дополнительное разрешение пользователя на commit/push только отчёта. Для отправки выполнена синхронизация с удалённым prompt-only commit `fddd30b`: он добавляет лишь два подготовленных задания в `audit/`, не меняя аудируемый код. Чужой `.project/PROGRESS.md` и исходные 129 tracked-файлов сохранены. Issues, PR, releases, deployments и второй проход Sol не выполнялись; второй проход запускается отдельно.

Отправка отчёта на момент завершения заблокирована: автоматическая проверка дважды отклонила `git add`, сначала по исходному запрету, затем потому, что переданная родительским тредом цитата не считается прямым сообщением пользователя. Индекс пуст, commit/push не выполнялись. Для отправки требуется прямое подтверждение, принимаемое механизмом разрешений; обход блокировки не выполнялся.
