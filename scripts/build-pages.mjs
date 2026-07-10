import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');

rmSync(output, { force: true, recursive: true });
mkdirSync(output);

for (const entry of ['blocks', 'tokens', 'index.css']) {
  cpSync(path.join(root, entry), path.join(output, entry), { recursive: true });
}

for (const entry of readdirSync(path.join(root, 'demo'))) {
  const source = path.join(root, 'demo', entry);
  const destination = path.join(output, entry);

  if (entry.endsWith('.html')) {
    writeFileSync(destination, readFileSync(source, 'utf8').replaceAll('../index.css', './index.css'));
  } else {
    cpSync(source, destination, { recursive: true });
  }
}
