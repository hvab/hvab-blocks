# Deferred ideas

There is no required implementation work left from the agreed audit or post-audit batch. Completion evidence and decisions are in [history/AUDIT-2026-10.md](history/AUDIT-2026-10.md); the current work/release state is in [PROGRESS.md](PROGRESS.md).

Revisit these only for a concrete screen or demonstrated maintenance benefit:

- **Native accordion:** a CSS skin for `<details>` / `<summary>`, with browser-owned disclosure behavior and project tokens.
- **Container queries:** extend the accepted dialog-footer pattern only when another component needs to respond to its own container.
- **Additional toaster layouts:** a separate mobile full-width variant or corner variants when required by a real screen.
- **Label separator gap:** add a public role only if a real customization needs it; it was deliberately left out of the token cleanup.
- **`light-dark()`:** evaluate whether it reduces maintenance while preserving the current values, public token API and explicit scheme switching.

Research reference: [Modern Web Guidance notes](history/WEB-PLATFORM-AGENT-GUIDANCE.md). These notes are not repository instructions or an active implementation plan.
