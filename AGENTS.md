# AGENTS.md — working on hvab-blocks

Instructions for people and AI agents. The repository should contain enough context for anyone to continue the project without external knowledge.

## Communication

- Be concise and practical.
- Ask one clarifying question when a task is unclear or risky. Otherwise proceed with explicit assumptions.
- After each iteration, state what changed, how to verify it, known limits, and the next small step.

## Source of truth

In descending order of authority:

1. `SPEC.md` — the design-system contract: tokens, naming, layer invariants, states, and the Gravity porting recipe. The contract wins on conflict.
2. `.project/PROGRESS.md` — current state, active plan, and next steps when an active work track exists. It is an AI working artifact, not part of the initial public tree.
3. `AGENTS.local.md` — machine-specific paths for the donor, consumer, preset, and archive. It is not committed.

The contract contains decision history and rationale. The `pale`/`viby`/`balder` archive is a reference for future block ideas; its paths live in `AGENTS.local.md`. It is historical reference only, not a value source: Gravity is the donor.

## Project constants

- **Plain CSS and BEM, no build step.** Core source files are regular `.css`; do not add SCSS, CSS Modules, or preprocessor syntax.
- **Configuration is copied inline from `dotfiles25` base**, not consumed as a dependency. See `AGENTS.local.md` for the preset path.
- **Gravity UI is the donor for values and structure.** Take only the subset needed by a real screen. Follow contract section 11 for ports.
- **The first consumer is the Selecta sidebar** (`ThemeControls.vue`, Vue 3). It consumes the CSS core through thin Vue wrappers located in Selecta's `src/components/ui/`, not in this repository.
- **Two-line tokens** (contract section 1.3): public `--hb-<block>-*` tokens are the consumer override API; private `--_<block>-*` tokens are modified internally.
- **`hb-`-prefixed classes** (`.hb-button`, `.hb-button__icon`, `.hb-button_size_m`) are the stable namespace across consumers. The prefix is not repeated in elements or modifiers.
- **States use attributes** (`:disabled`, `[aria-*]`, `[data-*]`), not BEM modifiers.

## Workflow

1. Create or update `.project/PROGRESS.md` with steps and definitions of done before starting new work.
2. Follow the contract section 7 checklist for every block and section 11 for Gravity ports.
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
