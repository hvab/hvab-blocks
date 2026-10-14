# Modern Web Guidance: конспект статьи и идей для разработки

> **Тип:** архив заметок и выводов из обсуждения от 14 октября 2026 года. Этот документ сохраняет информацию и варианты для будущего возвращения к теме. **Это не план работ и не инструкция для репозитория, где лежит файл.** Ничего из перечисленного не установлено или внедрено.
>
> Статья: [Brecht De Ruyte, Modern Web Guidance as a starting point for my own token skills: getting agents to write better CSS](https://utilitybend.com/blog/modern-web-guidance-antigravity-and-my-own-design-token-skills/) (27 августа 2026).

## Главная идея

Качественную работу AI-агента с фронтендом полезно разделять на три уровня:

1. **Знания веб-платформы.** [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) (MWG) сообщает агенту современные приёмы HTML, CSS и браузерных API, ограничения совместимости, доступность и fallback.
2. **Соглашения кодовой базы.** Собственные rules или skills переводят общее решение в действующую систему токенов, селекторов, компонентов и папок.
3. **Проверка.** Тесты, ревью человеком и при необходимости [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) показывают, как решение ведёт себя в браузере.

Порядок: сначала разобраться, как правильно работает веб-платформа, затем адаптировать подход к проекту, после — проверить. В этом и состоит центральная мысль статьи. Собственный skill не обязан повторять знания MWG.

## Что такое Modern Web Guidance

MWG — набор подготовленных экспертами руководств для кодинговых агентов, связанный с Chrome, Edge и сообществом. Руководства описывают сценарии использования современных возможностей браузера, распространённые ошибки, совместимость и варианты деградации.

Схема работы: агент использует CLI `search`, получает список подходящих руководств, затем извлекает нужное по ID командой `retrieve`. Это локальный семантический поиск, подгружающий содержимое по потребности. При этом инструмент собирает отдельную телеметрию, если она не отключена.

Пример для изучения:

~~~bash
npx modern-web-guidance@latest search "animate a dialog modal backdrop"
npx modern-web-guidance@latest retrieve "animate-to-from-top-layer"
~~~

Практический смысл — уменьшить частоту устаревших решений вроде лишних scroll/resize listeners, тяжёлого JavaScript для нативно поддерживаемых поведений, самописных диалогов без полноценного управления фокусом.

Опубликованные тесты MWG показывают улучшение ответов агентов. Например, срез проекта от 9 октября 2026 года: Codex CLI 58→77%, Claude Code 59→87%, Antigravity 65→90% на их наборах тестов. Это данные самого проекта и не гарантия результата на других задачах.

## Где могут пригодиться руководства

| Повседневная задача | Полезные темы |
| --- | --- |
| Модальные окна и popover | `<dialog>`, Popover API, top layer, `::backdrop`, CSS Anchor Positioning |
| Появление/закрытие элементов | `@starting-style`, `transition-behavior`, `overlay` |
| Sticky header, реакция на прокрутку | scroll-driven animations и scroll-state queries |
| Адаптивные компоненты | container queries, subgrid |
| Формы | нативные элементы и валидация, focus-visible, disabled/invalid |
| Светлая и тёмная темы | `color-scheme`, `light-dark()`, токены, контраст |
| Производительность | LCP, INP, загрузка изображений, `content-visibility` |

Имена руководств, упомянутые в статье: `animate-to-from-top-layer`, `animate-element-entry-exit`, `state-aware-sticky-headers`, `dark-mode`, `component-specific-light-dark-theme`. Их актуальный набор стоит проверять в каталоге MWG.

## Browser support: важная часть идеи

MWG учитывает [Baseline](https://web-platform-dx.github.io/web-features/): Limited availability, Newly available, Widely available. Требования конкретного продукта и `Browserslist` должны определять допустимые функции; произвольно ставить всем проектам `Baseline 2024` не стоит.

Разделение на два типа:

- **Additive:** декоративная анимация, предзагрузка, некоторые улучшения UX. Без поддержки браузером основная функция остаётся доступной; progressive enhancement уместен.
- **Critical:** отправка формы, открытие и закрытие диалога, управление важным элементом. Без поддержки функция ломается; нужны альтернативное решение, проверка поддержки, небольшой fallback или условно загружаемый polyfill.

Из статьи полезен пример `@container style(--density: compact)` для режимов плотности UI. Container style query проверяет стиль предка; контейнер не может применять запрос к самому себе. Fallback через атрибуты вроде `[data-density]` не всегда сохраняет вложенную семантику: порядок селекторов способен изменить итог. Современную функцию иногда лучше отложить для критического поведения.

## Собственные skills: три идеи и их оценка

### 1. component-states — наиболее универсален

Для интерактивных компонентов, форм, модальных окон, tooltip/popover, фокуса, анимаций и sticky-элементов. Идея — получить платформенную рекомендацию и дополнить её правилами проверки состояний: hover, focus-visible, disabled, loading, invalid, expanded/closed; клавиатуры, мобильного экрана и reduced motion.

Важная оговорка: предпочитать декларативный HTML/CSS, когда он действительно покрывает поведение. JavaScript уместен для сценариев, требующих логики и управления взаимодействием. При `prefers-reduced-motion` сохранять смысл изменения состояния, сокращая движение.

### 2. design-tokens — полезен при существующей дизайн-системе

У автора статьи система `--p-*` (primitive), `--s-*` (semantic), `--c-*` (component) и cascade layers. Skill не даёт агенту перескакивать через уровни токенов или добавлять случайные литералы. Это сокращает рутинные замечания на ревью.

**Вывод из обсуждения:** универсальная ценность — следовать уже принятой системе, а не переносить чужие названия токенов, Atomic Design или обязательные `@layer` во все проекты. Отдельный skill оправдан, если агент систематически нарушает соглашения.

### 3. theming — по необходимости

Дополняет руководство MWG по темам локальными правилами. Помимо цветов следует проверять тени, яркость изображений и иллюстраций, контраст границ, hover/focus и приподнятые поверхности. Не каждое приложение нуждается в отдельном skill по тематизации.

## Черновик универсальных правил

Это **пример для возможного повторного использования**, не содержимое действующего `AGENTS.md`:

~~~markdown
## Web platform guidance

- Consult modern-web-guidance for relevant web platform decisions when available.
- Prefer semantic HTML, native CSS, and browser APIs when appropriate.
- Check browser compatibility against the project's actual support policy and Browserslist.
- Preserve core functionality in every supported browser.
- Use progressive enhancement for optional visual effects.
- Avoid polyfills, dependencies, and custom JavaScript without a concrete need.
- Respect keyboard navigation, focus management, and prefers-reduced-motion.
- Follow existing project conventions, design tokens, and component patterns.
- Do not introduce a new CSS architecture without an explicit need.
- Verify interactive UI behaviour in a real browser when practical.
~~~

## Черновик переносимого skill

Пример `component-states/SKILL.md`. Его нужно адаптировать к конкретному агенту и проекту:

~~~markdown
---
name: component-states
description: Use when implementing or reviewing interactive UI states, transitions, dialogs, forms, and animations.
---

# Component states

1. Inspect current project conventions and component patterns.
2. Consult modern-web-guidance for relevant browser features.
3. Prefer native HTML and declarative CSS when they satisfy the requirements.
4. Preserve existing naming, tokens, and component APIs.
5. Verify default, hover, focus-visible, active, disabled, loading,
   invalid, and opened/closed states where applicable.
6. Check keyboard access and focus management.
7. Respect prefers-reduced-motion while preserving state changes.
8. Check browser compatibility and critical fallbacks.
9. Review mobile viewports, overflow, themes, and actual browser behaviour.
10. Avoid new dependencies and unrelated refactoring.
~~~

Лаконичные правила в `AGENTS.md` могут оказаться достаточными. Множество скиллов с дублирующими указаниями создаёт лишнюю сложность.

## Chrome DevTools MCP — дополнительная проверка

MCP даёт агенту возможность работать с реальным Chrome: анализировать DOM и console, смотреть сетевые запросы и производительность, оценивать визуальное поведение и разные viewport. Особенно уместен после сложного изменения интерактивного UI; для мелких CSS-правок обязательная проверка может быть избыточной.

Нужно учитывать доступ к открытым авторизованным вкладкам: предпочтительна отдельная тестовая сессия.

Справочные команды подключения:

**Codex CLI:**

~~~bash
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
~~~

**Claude Code CLI:**

~~~bash
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
~~~

## Команды Modern Web Guidance для справки

**Мастер установки:**

~~~bash
npx modern-web-guidance@latest install
~~~

**Codex CLI:**

~~~bash
codex plugin marketplace add GoogleChrome/modern-web-guidance
codex plugin add modern-web-guidance@googlechrome
~~~

**Claude Code (slash-команды):**

~~~text
/plugin marketplace add GoogleChrome/modern-web-guidance
/plugin install modern-web-guidance@googlechrome
~~~

**Antigravity:**

~~~bash
agy plugin install https://github.com/GoogleChrome/modern-web-guidance
~~~

Способы установки могут меняться: проверять [официальный README](https://github.com/GoogleChrome/modern-web-guidance).

## Телеметрия, лицензия и осторожность

MWG документирует сбор анонимных данных: установки, имена агентов, ID руководств и поисковые запросы, сформулированные агентом. По заявлению авторов, сырые пользовательские промпты не собираются. Локальный поиск руководств и телеметрия — отдельные механизмы.

Отключение:

~~~bash
export DISABLE_TELEMETRY=1
~~~

Лицензия MWG — Apache-2.0. Возможны коммерческое применение и форки при соблюдении условий; при копировании материалов учитывать атрибуцию.

Любая рекомендация из skills должна проходить человеческое ревью. MWG не гарантирует доступность или корректность результата, а внешние руководства не знают всех ограничений кодовой базы.

## Итог мыслей — без решения о внедрении

- **Основная идея:** знания современной платформы + локальные правила + реальная проверка.
- **Наиболее перспективные инструменты:** MWG и Chrome DevTools MCP.
- **Самый полезный потенциальный свой skill:** `component-states`.
- **Условно полезные skills:** `design-tokens` и `theming`.
- **Правила общего назначения:** Browserslist, progressive enhancement, доступность, нативные API, сохранение архитектуры проекта.
- **Чего избегать:** автоматического переноса авторской CSS-архитектуры, массовых полифиллов и избыточных дублирующихся инструкций.

Документ сохранён как архив идей, примеров и аргументов для возвращения к теме позднее. Никаких действий по реализации он не предписывает.

## Ссылки

- [Статья Utilitybend](https://utilitybend.com/blog/modern-web-guidance-antigravity-and-my-own-design-token-skills/)
- [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance)
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Web Platform Baseline](https://web-platform-dx.github.io/web-features/)
