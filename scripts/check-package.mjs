import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temporary = mkdtempSync(path.join(os.tmpdir(), 'hvab-pack-check-'));

try {
  const output = JSON.parse(
    execFileSync(
      'npm',
      ['pack', '--json', '--ignore-scripts', '--cache', path.join(temporary, 'cache'), '--pack-destination', temporary],
      { cwd: root, encoding: 'utf8' }
    )
  );
  // npm 12 returns a package-name map; earlier versions return an array.
  const [report] = Array.isArray(output) ? output : Object.values(output);
  execFileSync('tar', ['-xzf', path.join(temporary, report.filename), '-C', temporary]);
  const packed = path.join(temporary, 'package');
  const sourceManifest = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  const packedManifest = JSON.parse(readFileSync(path.join(packed, 'package.json'), 'utf8'));
  assert.deepEqual(packedManifest.exports, sourceManifest.exports, 'Package exports must be preserved');

  const required = ['index.css', 'README.md', 'USAGE.md', 'VENDOR.md', 'CHANGELOG.md', 'LICENSE'];
  for (const directory of ['tokens', 'blocks']) {
    for (const file of readdirSync(path.join(root, directory), { recursive: true })) {
      if (/\.(css|md)$/.test(file)) required.push(path.join(directory, file));
    }
  }
  for (const file of required) {
    assert.ok(existsSync(path.join(packed, file)), `Missing package file: ${file}`);
    assert.equal(
      readFileSync(path.join(packed, file), 'utf8'),
      readFileSync(path.join(root, file), 'utf8'),
      `Package content differs: ${file}`
    );
  }

  const errors = [];
  let links = 0;
  for (const file of required.filter((file) => file.endsWith('.md'))) {
    const markdown = readFileSync(path.join(packed, file), 'utf8');
    for (const [, target] of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^[a-z][a-z\d+.-]*:|^#/i.test(target)) continue;
      links++;
      const destination = path.resolve(packed, path.dirname(file), target.split(/[?#]/)[0]);
      if (!existsSync(destination)) errors.push(`${file} -> ${target}`);
    }
  }
  assert.deepEqual(errors, [], `Broken documentation links in archive:\n${errors.join('\n')}`);
  for (const file of report.files) {
    assert.ok(
      !/^(?:audit|\.project|demo|scripts|node_modules)\//.test(file.path),
      `Unexpected development file in archive: ${file.path}`
    );
  }
  console.log(
    `Package check passed: ${report.files.length} files, ${links} local documentation links, ${report.size} compressed bytes`
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
