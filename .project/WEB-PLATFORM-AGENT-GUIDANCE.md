# Modern Web Guidance: план для AI-assisted frontend-разработки

> Статус: **backlog / к внедрению**. Этот файл — руководство и набор заготовок. Установка инструментов, создание скиллов и изменение `AGENTS.md` **ещё не выполнялись**.
>
> Подготовлено: 2026-10-14. Основа: [статья Brecht De Ruyte](https://utilitybend.com/blog/modern-web-guidance-antigravity-and-my-own-design-token-skills/), [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance), текущие документы `hvab-blocks`.

## 1. Главная идея

У работы с AI-агентом три последовательных этапа:

1. **Web platform knowledge** — Modern Web Guidance (MWG): актуальные HTML/CSS/браузерные API, доступность, производительность, совместимость и fallback.
2. **Project knowledge** — `AGENTS.md`, `SPEC.md` и при необходимости свои небольшие скиллы: конкретные соглашения проекта, токены, BEM, структура, ограничения.
3. **Verification** — тесты, ревью и реальный браузер (например, Chrome DevTools MCP): проверить поведение вместо доверия первому ответу агента.

Платформенные гайды могут предлагать демонстрационный CSS, не подходящий проекту. Перед внедрением адаптировать его к локальному контракту. Скилл — способ доставлять специализированные инструкции по требованию, а не заменять ревью.

## 2. Где применить

| Сценарий | Что искать в MWG | Что проверить |
| --- | --- | --- |
| Диалоги, drawer, popover, tooltip | native `<dialog>`, Popover API, Anchor Positioning, анимация top layer | закрытие, фокус, Esc, клавиатура, браузерная поддержка, мобильный viewport |
| Появление/исчезновение UI | `@starting-style`, `transition-behavior`, `overlay` | выходная анимация, `prefers-reduced-motion`, рабочий fallback |
| Sticky / scroll UI | scroll-driven animations, state-aware sticky headers | доступность, переполнение, отсутствие ненужных scroll listeners |
| Адаптивные блоки | container size/style queries, subgrid | совместимость и поведение в разных контейнерах |
| Формы | HTML validation, `:user-invalid`, нативные элементы | ошибки, disabled/loading, фокус, подсказки, клавиатура |
| Производительность | LCP, INP, `content-visibility`, предварительная загрузка | замеры до/после, визуальная целостность |

Полезные темы из статьи: `animate-to-from-top-layer`, `animate-element-entry-exit`, `state-aware-sticky-headers`, `dark-mode`, `component-specific-light-dark-theme`, design-token reactivity. Точные названия и доступность гайдов перепроверять в каталоге MWG.

### Browser support и fallback

- **Первый источник требований к браузерам — сам проект**: `.browserslistrc`, документация и реальные потребители. В `hvab-blocks` сейчас `defaults`. Baseline — вспомогательный сигнал; произвольный `Baseline 2024` нельзя объявлять без решения по поддержке браузеров.
- Отличать **дополнительные улучшения** (анимация, декоративный эффект, prefetch) от **критической функциональности** (открытие/закрытие диалога, отправка формы, ввод).
- Для дополнительных эффектов предпочтителен progressive enhancement. Критический сценарий должен оставаться работоспособным во всех поддерживаемых браузерах.
- `@supports`, feature detection, небольшой fallback либо условно загружаемый polyfill — по конкретной необходимости; не добавлять библиотеку автоматически.
- Style queries удобны для вложенных режимов, но их fallback на селекторах атрибутов не всегда эквивалентен при вложенности. Не применять для обязательной логики без проверки.

## 3. Существующий контракт hvab-blocks (не переписывать)

В этом репозитории уже есть подходящая архитектура:

- Приоритет: `SPEC.md` → `.project/PROGRESS.md` (активная работа) → `AGENTS.local.md`, как описано в `AGENTS.md`. `SPEC.md` побеждает при конфликте.
- Plain CSS, BEM с `hb-`, без Sass/CSS Modules и без сборки ядра.
- Репозиторий поставляет CSS, разметку образцов и стили состояний. JS-поведение, focus trap, обработчики событий и Vue-обёртки реализуются потребителем (например, Selecta).
- Состояния через нативные псевдоклассы и `[aria-*]`/`[data-*]`; не заводить дополнительные BEM-модификаторы для состояний.
- Токены уже организованы: `ref → system → component tokens → selectors`. Публичные `--hb-<block>-*` служат API переопределения; внутренние `--_<block>-*` — дефолтами блока. Пример действующего правила: `var(--hb-button-background, var(--_button-background))`.
- Светлая/тёмная темы уже заданы через `:root` / `[data-color-scheme='light']` / `[data-color-scheme='dark']` в `tokens/color.css`.
- Не переносить из статьи автора чужие `--p-* / --s-* / --c-*`, обязательные `@layer` или Atomic Design. Это его индивидуальные решения, а у нас есть собственный контракт.
- Новые токены — под реальную потребность блока; не создавать «дизайн-систему поверх дизайн-системы».

## 4. План внедрения

### P0 — Modern Web Guidance

- [ ] Выбрать способ установки для **каждого используемого** агента и установить MWG на своей машине (Codex, Claude Code, при необходимости Antigravity).
- [ ] Проверить, что поиск и получение конкретного гайда работают.
- [ ] Сравнить результат на одной задаче: решение агента без гайда и с ним.
- [ ] Отключить телеметрию, если это нужно для рабочего кода.

Универсальный мастер:

~~~bash
npx modern-web-guidance@latest install
~~~

Прямой вариант для **Codex CLI**:

~~~bash
codex plugin marketplace add GoogleChrome/modern-web-guidance
codex plugin add modern-web-guidance@googlechrome
~~~

Внутри **Claude Code** (slash-команды):

~~~text
/plugin marketplace add GoogleChrome/modern-web-guidance
/plugin install modern-web-guidance@googlechrome
~~~

Для **Antigravity**:

~~~bash
agy plugin install https://github.com/GoogleChrome/modern-web-guidance
~~~

Проба без установки скилла:

~~~bash
npx modern-web-guidance@latest search "animate a dialog modal backdrop"
npx modern-web-guidance@latest retrieve "animate-to-from-top-layer"
~~~

Здесь `npx` может впервые скачивать пакет из npm; сами руководства ищутся локально после установки пакета. Команды приведены для ручного исполнения, ничего из них этим документом не запускается. После обновлений агента перепроверять [официальную инструкцию](https://github.com/GoogleChrome/modern-web-guidance#alternative-installation-methods).

### P0 — Короткое дополнение к AGENTS.md

Заготовка для обсуждения и последующего внесения в нужный проект (**не добавлять автоматически во все репозитории**):

~~~markdown
## Web platform guidance

- When available, consult modern-web-guidance for relevant HTML, CSS, browser API, accessibility, and performance decisions.
- Apply project conventions and existing contracts before incorporating examples from external guides.
- Prefer semantic HTML and native browser capabilities when they meet the actual requirements.
- Treat this project's Browserslist and documented support policy as authoritative; check compatibility before adopting new features.
- Use progressive enhancement for optional effects, and preserve critical functionality in every supported browser.
- Avoid new dependencies, polyfills, and JS-based reimplementations without a concrete need.
- Verify keyboard operation, focus, accessibility, responsive behaviour, and reduced-motion handling.
- For interactive UI changes, use browser verification when available and worthwhile.
~~~

Для `hvab-blocks` не дублировать в этом фрагменте подробные правила токенов и BEM: они уже описаны в `SPEC.md` и `AGENTS.md`. Подключение MWG не должно нарушать иерархию источников истины.

### P1 — Свой skill: component-states

- [ ] Выделить переносимую версию скилла, пригодную для нескольких фронтенд-проектов.
- [ ] Проверить, где конкретный агент читает локальные скиллы; для Codex кандидат: `.agents/skills/component-states/SKILL.md`.
- [ ] Сначала применять MWG по вопросу платформы; затем адаптировать рекомендации к проекту.
- [ ] Протестировать на `modal`, `tooltip` или `radio-group`. При работе с `hvab-blocks` менять только CSS-часть, JS оставлять потребителю.

Заготовка `SKILL.md`:

~~~markdown
---
name: component-states
description: Use when implementing or reviewing interactive UI states, dialogs, menus, focus behaviour, entry/exit animations, and scroll-responsive UI.
---

# Component states

1. Read the repository's source-of-truth instructions and inspect existing patterns.
2. Consult modern-web-guidance for relevant platform guidance when available.
   Useful topics: state-aware-sticky-headers, animate-element-entry-exit,
   animate-to-from-top-layer.
3. Adapt examples to the current project's component API, selectors, and tokens.
4. Prefer semantic HTML and declarative CSS where they meet requirements.
5. Check browser compatibility; preserve critical functionality if modern
   animation or layout features are unsupported.
6. Review the full state matrix: default, hover, focus-visible, active,
   disabled, loading, invalid, expanded/closed (where applicable).
7. Preserve keyboard access, visible focus, and reduced-motion behaviour.
8. Verify small viewports, light/dark themes, and actual browser behaviour.
9. Do not add dependencies or unrelated refactors.
10. Respect project boundaries: in CSS-only libraries, leave behavioural
    JavaScript to the consumer.
~~~

Важно: «prefer CSS-only» — рекомендация, а не запрет на JS. Например, позиционирование иногда можно решить CSS, но управление фокусом и бизнес-логикой может требовать JavaScript.

### P1 — Design tokens: тонкая надстройка, не новая система

- [ ] При появлении повторяющихся ошибок AI в токенах решить, нужен ли отдельный `design-tokens` skill.
- [ ] Если нужен, ссылаться на `SPEC.md`, `tokens/README.md` и существующие исходники; держать skill коротким.
- [ ] Проверять, что агент использует публичный `--hb-<block>-*` как consumer override API и внутренний `--_<block>-*` как fallback, не обращается к raw reference tokens из блока.
- [ ] Не вводить новый токен без реального потребителя и необходимости; учитывать тему и стабильность публичного API.
- [ ] Зафиксировать реальную ошибку/повторяемый паттерн до создания скилла, чтобы избежать дублирования `AGENTS.md`.

### P2 — Theming: по необходимости

- [ ] При работе с темами сверяться с гайдами MWG `dark-mode` и `component-specific-light-dark-theme`.
- [ ] Сохранять текущую схему `[data-color-scheme]` и семантические токены `--hb-color-*`.
- [ ] Проверять в обеих темах цвет текста, контраст границ, фокус, прозрачность и тени, изображения и иллюстрации.
- [ ] Не навязывать `light-dark()` и систему переключения темы автора статьи: они могут расходиться с контрактом данного репозитория.

### P2 — Chrome DevTools MCP

- [ ] Подключить только к агентам, в которых реально нужен доступ к браузеру.
- [ ] Проверить базовый сценарий: открыть локальную demo-страницу, снять DOM/screenshot, прочитать console, изменить viewport.
- [ ] После существенного UI-изменения проверять реальные сценарии взаимодействия (при наличии MCP).
- [ ] Для авторизованных вкладок учитывать риск: агент может видеть их содержимое и выполнять действия; по возможности использовать отдельную изолированную браузерную сессию.

**Codex CLI:**

~~~bash
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
~~~

**Claude Code CLI (MCP only):**

~~~bash
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
~~~

Для Claude Code также существует официальный plugin-вариант с MCP и скиллами; см. [client configurations](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/client-configurations.md).

## 5. Практический ежедневный workflow

1. **Прочитать задачу и контракт**: `SPEC.md`, `AGENTS.md`, README конкретного блока, текущие CSS/JS и ограничения Browserslist.
2. **Получить точечную платформенную подсказку**: спросить MWG о соответствующей функциональности; не подгружать всё подряд.
3. **Решить совместимость**: feature additive или critical? Нужно ли fallback? Не появилась ли новая зависимость?
4. **Вписать решение в кодовую базу**: токены, атрибуты состояний, BEM, существующая структура; без больших побочных рефакторингов.
5. **Проверить**: линтеры и документы, реальные размеры и состояния, клавиатура, reduced motion, две темы. Пользоваться браузером при необходимости.
6. **Коротко отчитаться**: изменения, что проверено, ограничения, остающийся риск. Для `hvab-blocks` отражать активный план в `.project/PROGRESS.md` по правилам проекта.

Готовый запрос агенту:

~~~text
Implement this UI change within the existing project contract.
First inspect AGENTS.md, SPEC.md (if present), relevant components and
browser-support policy. When available, consult modern-web-guidance on the
underlying web-platform feature, then adapt the result to the project's
own selectors, tokens and architecture. Prefer native semantics and
minimal changes. Preserve functionality in supported browsers, keyboard
operation, reduced-motion behaviour and responsive layout. Verify the
result with project checks and browser tools when available. Report
what was actually verified and any remaining limitations.
~~~

**Проверки в hvab-blocks** (после будущих изменений кода):

~~~bash
npm run lint:styles
npm run format:check
npm run demo:check
npm run docs:check
npm start
~~~

Ручной QA: проверить статический каталог `/demo/`, особенно `modal`, `sheet`, `toast`, `tooltip`, меню, popover и `radio-group`; размеры узких экранов, переполнение по горизонтали, достижимость действий, нормальные/disabled/focus состояния. Активный mobile audit уже записан в `.project/PROGRESS.md`.

## 6. Приоритет, критерии готовности и ограничения

**Минимально полезный результат:**

- [ ] MWG доступен хотя бы в одном основном агенте и находится по релевантному запросу.
- [ ] Для нового кода агент следует действующему проектному контракту и Browserslist.
- [ ] Один реальный UI-кейс пройден по схеме guidance → project rules → verification.
- [ ] Замечания по совместимости, доступности и границам CSS/JS отражены в ревью.
- [ ] Созданы лишь те локальные скиллы, которые решают повторяющиеся проблемы.

**Не делать без отдельного решения:** массовую миграцию на `@layer` или Atomic Design, новую иерархию токенов, переход на framework components, установку полифиллов «на всякий случай», автоматическое использование MCP на каждой мелкой правке.

**Ограничения:** MWG находится в preview; рекомендации могут изменяться. Результаты eval в README опубликованы самим проектом и не гарантируют качество в этой кодовой базе. Skill может не сработать автоматически; принимать результат следует только после проверки.

## 7. Телеметрия и ссылки

MWG сообщает о сборе анонимных данных использования, включая названия агента, идентификаторы гайдов и поисковые запросы, которые формулирует агент. Сырые сообщения пользователя, по заявлению проекта, не собираются. Для отключения:

~~~bash
export DISABLE_TELEMETRY=1
~~~

Устанавливать в окружении, откуда запускается агент. Локальный поиск гайдов и опциональная телеметрия — разные части механизма. Лицензия проекта — Apache-2.0; если копировать файлы гайдов в свой репозиторий, соблюдать требования лицензии и атрибуции.

Источники:
- [Статья: Modern Web Guidance, Antigravity and design token skills](https://utilitybend.com/blog/modern-web-guidance-antigravity-and-my-own-design-token-skills/)
- [Modern Web Guidance — официальный репозиторий и установка](https://github.com/GoogleChrome/modern-web-guidance)
- [Chrome DevTools MCP — установка и возможности](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools for agents — документация Chrome](https://developer.chrome.com/docs/devtools/agents/get-started)
- [Web Platform Baseline](https://web-platform-dx.github.io/web-features/)
- Локально: [AGENTS.md](../AGENTS.md), [SPEC.md](../SPEC.md), [tokens/README.md](../tokens/README.md), [PROGRESS.md](PROGRESS.md)
