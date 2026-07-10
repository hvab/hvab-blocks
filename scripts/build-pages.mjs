import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');

rmSync(output, { force: true, recursive: true });
mkdirSync(output);

for (const entry of ['blocks', 'demo', 'tokens', 'index.css']) {
  cpSync(path.join(root, entry), path.join(output, entry), { recursive: true });
}

writeFileSync(
  path.join(output, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=./demo/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>hvab-blocks demo</title>
  </head>
  <body>
    <p><a href="./demo/">Open the hvab-blocks demo</a></p>
  </body>
</html>
`
);
