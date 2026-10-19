# Release flow

`main` is the stable branch. Releases are cut from a clean, reviewed `main`; short-lived branches are used for normal changes.

The primary release deliverable is a documented, copyable CSS source tree. npm publishing and demo hosting are optional and must not block a release unless they have been explicitly enabled for the repository.

## Between releases

Accumulate completed changes under `Unreleased` in `CHANGELOG.md`. Keep the package version unchanged until an explicitly requested batch release; ordinary fixes and documentation updates do not require a new version.

Pushing main without a version tag does not create a GitHub Release. The enabled Pages workflow deploys main separately, so the hosted catalogue can include Unreleased changes. Consumer adoption and deployment belong to the consumer repository and are not core release gates unless explicitly requested.

## Versions

Use semantic versioning during the `0.x` lifecycle:

- `0.x.0` — additive public functionality.
- `0.x.y` — compatible fixes and documentation corrections.
- Removing or renaming an `hb-*` class, a public `--hb-*` token, or a documented state attribute is breaking. Decide the next pre-1.0 version deliberately and describe the migration in the changelog.

## Release checklist

1. Confirm that `main` contains only reviewed, releasable work.
2. Move public changes from `Unreleased` into a dated version section in `CHANGELOG.md`.
3. Run the release checks:

   ```bash
   npm run demo:build
   npm run docs:check
   npm run demo:check
   npm run lint:styles
   npm run format:check
   npm run pack:check
   git diff --check
   ```

4. Confirm the working tree is clean.
5. Bump the package version and create the matching version commit and tag:

   ```bash
   npm version minor
   ```

   Use `npm version patch` for a compatible fix release. `npm version` updates `package.json` and `package-lock.json`, creates a version commit, and creates a `vX.Y.Z` tag.

6. Push `main` and tags, then create a GitHub Release from the tag using the public changelog entry. npm registry publication is a separate explicitly authorized action; `pack:check` builds and inspects a temporary archive without publishing it.

   ```bash
   git push origin main --follow-tags
   ```

7. If the demo is deployed, verify that deployment separately. It is not coupled to the tag.
