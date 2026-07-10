# Release flow

`main` is the stable branch. Releases are cut from a clean, reviewed `main`; short-lived branches are used for normal changes.

The primary release deliverable is a documented, copyable CSS source tree. npm publishing and demo hosting are optional and must not block a release unless they have been explicitly enabled for the repository.

## Versions

Use semantic versioning during the `0.x` lifecycle:

- `0.1.0` — first public release.
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
   git diff --check
   ```

4. Confirm the working tree is clean.
5. Bump the package version and create the matching version commit and tag:

   ```bash
   npm version minor
   ```

   Use `npm version patch` for a compatible fix release. `npm version` updates `package.json` and `package-lock.json`, creates a version commit, and creates a `vX.Y.Z` tag.

6. If the optional npm distribution remains supported, inspect its contents before publishing:

   ```bash
   npm pack --dry-run
   ```

7. Push `main` and tags, then create a GitHub Release from the tag using the public changelog entry.

   ```bash
   git push origin main --follow-tags
   ```

8. If the demo is deployed, verify that deployment separately. It is not coupled to the tag.

## Initial 0.1.0 repository

The first public release is created in a new clean repository, not by rewriting the development checkout:

1. Assemble the approved final tree in a separate directory and set the package version to `0.1.0`.
2. Initialise a new repository with `main`, add the remote, and create the initial commit.
3. Create an annotated `v0.1.0` tag for that commit.
4. Push `main` and the tag, then create the first GitHub Release.

Do not carry over the old `.git` directory or run `npm version` while preparing that initial tree: its version and tag are established manually as part of the new repository's initial release.
