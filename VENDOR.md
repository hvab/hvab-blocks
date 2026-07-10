# Copy-first vendoring

Vendoring copies `hvab-blocks` source into the consumer repository. The consumer owns that copy and can build it independently of future upstream changes. There is no separate build artifact: copy the same CSS files that dependency-based consumers import.

This guide covers provenance and resyncing. For class, token, and state rules, see [USAGE.md](USAGE.md).

## Copy a block

1. Copy `tokens/` in full. Blocks reference `--hb-*` tokens, so a block cannot work without them.
2. Copy the required `blocks/<name>/` directories. A directory includes its CSS and README.
3. Copy `index.css` only when taking the complete catalogue. Otherwise create a local entry point that imports tokens first and selected blocks second.
4. Preserve the canonical-source comment in the first line of each CSS file.
5. Record the upstream version, commit, copied paths, and any local deviations in the consumer repository.

For example, keep a record next to the copied source:

```markdown
## vendor: hvab-blocks

- version: 0.1.0
- commit: <upstream commit SHA>
- copied on: 2026-07-10
- paths: tokens/ (all), blocks/button/, blocks/field/
- local deviations: none
```

The CSS files cannot know which upstream revision was copied, so this record is required for a reliable resync.

## Resync

1. Obtain the desired upstream revision.
2. Diff each copied directory against the consumer copy:

   ```bash
   git diff --no-index \
     src/vendor/hvab-blocks/blocks/button \
     path/to/hvab-blocks/blocks/button
   ```

3. Resolve each difference deliberately: take an upstream change, preserve a documented local deviation, or move a reusable improvement upstream first.
4. Update the provenance record with the new version, commit, date, copied paths, and remaining deviations.

## Local changes

Vendor source may be changed locally, but an undocumented change turns a future resync into archaeology. Keep one-off project-specific changes in the provenance record. If a change is reusable, contribute it to `hvab-blocks` first and then copy a clean upstream revision.

## Ways to copy

- Copy directories directly for a small selection of blocks.
- Use a source snapshot tool such as `degit` when Git history is not needed.
- Use `git subtree` only when history-aware upstream merges are worth its added complexity.
