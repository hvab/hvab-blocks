# AGENTS.md — working on hvab-blocks

Instructions for people and AI agents. The repository should contain enough context for anyone to continue the project without external knowledge.

## Communication

- Be concise and practical.
- Ask one clarifying question when a task is unclear or risky. Otherwise proceed with explicit assumptions.
- After each iteration, state what changed, how to verify it, known limits, and the next small step.

## Source of truth

In descending order of authority:

1. `SPEC.md` — the design-system contract: tokens, naming, layer invariants, states, and external-reference guidance. The contract wins on conflict.
2. `.project/PROGRESS.md` — current state, active plan, and next steps when an active work track exists. It is an AI working artifact, not part of the initial public tree.
3. `AGENTS.local.md` — machine-specific paths for reference projects, consumers, the preset, and the archive. It is not committed.

The contract contains decision history and rationale. The `pale`/`viby`/`balder` archive is historical reference for future block ideas; its paths live in `AGENTS.local.md`.

Deferred ideas live in `.project/IDEAS.md`. Completed audit evidence is summarized in `.project/history/AUDIT-2026-10.md`; raw superseded reports and journals remain recoverable through the Git revision recorded there. Historical pending statements are not active tasks or new acceptance gates.

## Project constants

- **Plain CSS and BEM, no build step.** Core source files are regular `.css`; do not add SCSS, CSS Modules, or preprocessor syntax.
- **Configuration is copied inline from `dotfiles25` base**, not consumed as a dependency. See `AGENTS.local.md` for the preset path.
- **External UI libraries provide examples.** Write implementation for this project's contract and the actual screen. Follow contract section 11 when consulting references.
- **The first consumer is the Selecta sidebar** (`src/components/ThemeControls/ThemeControls.vue`, Vue 3). It consumes the CSS core through thin Vue wrappers located in Selecta's `src/ui/`, not in this repository. This is historical consumer context. Release adoption, framework integration and compatibility acceptance belong to the consumer repository/chat; do not add them to the core backlog or use them as release gates unless explicitly requested here.
- **Two-line tokens** (contract section 1.3): public `--hb-<block>-*` tokens are the consumer override API; private `--_<block>-*` tokens are modified internally.
- **`hb-`-prefixed classes** (`.hb-button`, `.hb-button__icon`, `.hb-button_size_m`) are the stable namespace across consumers. The prefix is not repeated in elements or modifiers.
- **States use attributes** (`:disabled`, `[aria-*]`, `[data-*]`), not BEM modifiers.

## Workflow

1. Create or update `.project/PROGRESS.md` with steps and definitions of done before starting new work.
2. Follow the contract section 7 checklist for every block and section 11 when consulting external examples.
3. Update `.project/PROGRESS.md` after each step with completed work, verification, limits, and the next step.
4. Before finishing, `npm run lint:styles` and `npm run format:check` must pass, and `npm start` must serve the catalogue without errors.

## Commands

```bash
npm install
npm start              # @web/dev-server (--watch), catalogue at /demo/
npm run lint:styles    # stylelint
npm run format:check   # prettier --check
npm run format         # prettier --write
```
