import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blockOrder = Array.from(
  readFileSync(path.join(root, 'index.css'), 'utf8').matchAll(/@import url\('blocks\/([^/]+)\/\1\.css'\);/g),
  (match) => match[1]
);

const errors = [];

checkIndexDocs();
checkTokenDocs();
checkBlockDocs();

if (errors.length > 0) {
  console.error(`Documentation contract check failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

function checkIndexDocs() {
  const cssFile = path.join(root, 'index.css');
  const css = readFileSync(cssFile, 'utf8');

  if (!css.includes('@entry index')) {
    errors.push(`${relative(cssFile)}: missing "@entry index" in entry header`);
  }

  if (!css.includes('@docs ./USAGE.md')) {
    errors.push(`${relative(cssFile)}: missing "@docs ./USAGE.md" in entry header`);
  }
}

function checkTokenDocs() {
  const readmeFile = path.join(root, 'tokens', 'README.md');

  if (!existsSync(readmeFile)) {
    errors.push(`${relative(readmeFile)}: missing token README`);
  }

  for (const fileName of readdirSync(path.join(root, 'tokens'))
    .filter((file) => file.endsWith('.css'))
    .sort()) {
    const cssFile = path.join(root, 'tokens', fileName);
    const css = readFileSync(cssFile, 'utf8');

    if (!css.includes('@foundation ')) {
      errors.push(`${relative(cssFile)}: missing "@foundation" in token header`);
    }

    if (!css.includes('@docs ./README.md')) {
      errors.push(`${relative(cssFile)}: missing "@docs ./README.md" in token header`);
    }
  }
}

function checkBlockDocs() {
  for (const block of blockOrder) {
    const readmeFile = path.join(root, 'blocks', block, 'README.md');

    if (!existsSync(readmeFile)) {
      continue;
    }

    const cssFile = path.join(root, 'blocks', block, `${block}.css`);
    const css = readFileSync(cssFile, 'utf8');
    const readme = readFileSync(readmeFile, 'utf8');
    const tokens = Array.from(
      css.matchAll(new RegExp(`--hb-${escapeRegExp(block)}-[a-z0-9-]+`, 'g')),
      (match) => match[0]
    )
      .filter((token, index, list) => list.indexOf(token) === index)
      .sort();

    if (!css.includes('@docs ./README.md')) {
      errors.push(`${relative(cssFile)}: missing "@docs ./README.md" in block header`);
    }

    if (!readme.includes('```html demo')) {
      errors.push(`${relative(readmeFile)}: missing fenced "html demo" examples`);
    }

    for (const token of tokens) {
      if (!readme.includes(token)) {
        errors.push(`${relative(readmeFile)}: missing public token ${token}`);
      }
    }
  }
}

function relative(file) {
  return path.relative(root, file);
}

function escapeRegExp(value) {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
