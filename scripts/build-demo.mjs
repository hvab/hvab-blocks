import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const blockOrder = Array.from(
  readFileSync(path.join(root, 'index.css'), 'utf8').matchAll(/@import url\('blocks\/([^/]+)\/\1\.css'\);/g),
  (match) => match[1]
);

const documentedBlocks = blockOrder.filter((block) => existsSync(readmePath(block)));
validateDemoCssTokens();

const outputs = new Map(
  await Promise.all([
    outputHtml(path.join(root, 'demo/index.html'), renderIndex(blockOrder, documentedBlocks)),
    ...documentedBlocks.map((block) => outputHtml(path.join(root, `demo/${block}.html`), renderBlockPage(block))),
  ])
);

const stale = [];

for (const [file, content] of outputs) {
  if (check) {
    if (!existsSync(file) || readFileSync(file, 'utf8') !== content) {
      stale.push(path.relative(root, file));
    }
  } else {
    writeFileSync(file, content);
  }
}

if (stale.length > 0) {
  console.error(`Generated demo files are stale:\n${stale.map((file) => `- ${file}`).join('\n')}`);
  process.exit(1);
}

function renderIndex(blocks, readmeBlocks) {
  const links = blocks
    .map(
      (block) => `          <li>
            <a class="demo-index-link hb-card hb-card_view_filled hb-link hb-link_view_normal" href="./${block}.html">
              <span class="hb-text hb-text_typography_subheader-3">${escapeHtml(block)}</span>
            </a>
          </li>`
    )
    .join('\n');

  return renderShell({
    title: 'hvab-blocks',
    documentTitle: 'demo',
    lead: 'Generated demo index for the CSS/BEM block library. README-backed pages are built from fenced HTML examples in block documentation.',
    body: `      <ul class="demo-grid">\n${links}\n      </ul>`,
    blocks: readmeBlocks,
  });
}

function renderBlockPage(block) {
  const readme = readFileSync(readmePath(block), 'utf8');
  const title = readme.match(/^#\s+(.+)$/m)?.[1] ?? block;
  const lead = firstParagraph(readme);
  const examples = extractDemoExamples(readme);

  if (examples.length === 0) {
    throw new Error(`No \`\`\`html demo examples found in ${path.relative(root, readmePath(block))}`);
  }

  const body = `      <div class="demo-sections">
${examples.map((example, index) => renderExample(block, example, index)).join('\n')}
      </div>`;

  return renderShell({
    title,
    lead,
    body,
    blocks: documentedBlocks,
    currentBlock: block,
  });
}

function renderExample(block, example, index) {
  const title = example.title ?? `Example ${index + 1}`;
  const blockSlug = slugifyClassPart(block);
  const variantSlug = slugifyClassPart(title);
  const previewClass = [
    'demo-card__preview',
    `demo-card__preview_block_${blockSlug}`,
    `demo-card__preview_variant_${variantSlug}`,
    `demo-card__preview_example_${blockSlug}_${variantSlug}`,
  ].join(' ');

  return `        <section class="demo-card">
          <h2 class="demo-card__title hb-text hb-text_typography_header-1">${escapeHtml(title)}</h2>
          <div class="${previewClass}">
${indent(example.code, 12)}
          </div>
          <pre class="demo-card__code hb-card hb-card_view_filled"><code class="hb-text hb-text_typography_code-2">${escapeHtml(example.code)}</code></pre>
        </section>`;
}

function renderShell({ title, documentTitle = title, lead, body, blocks = [], currentBlock }) {
  return `<!doctype html>
<html lang="en" data-color-scheme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>hvab-blocks - ${escapeHtml(documentTitle)}</title>
    <link rel="stylesheet" href="../index.css" />
    <link rel="stylesheet" href="./demo.css" />
  </head>
  <body>
    <div class="demo-shell">
      <aside class="demo-sidebar" aria-label="Blocks">
        <a class="demo-sidebar__title hb-link hb-link_view_primary hb-text hb-text_typography_subheader-3" href="./index.html">hvab-blocks</a>
        ${renderSideNav(blocks, currentBlock)}
        <button type="button" id="scheme-toggle" class="hb-button hb-button_view_normal hb-button_size_m">Toggle scheme</button>
      </aside>
      <main class="demo-page">
        <header class="demo-header">
          <h1 class="demo-title hb-text hb-text_typography_display-1">${escapeHtml(title)}</h1>
          <p class="demo-lead hb-text hb-text_typography_body-3 hb-text_color_secondary">${escapeHtml(lead)}</p>
        </header>
${body}
      </main>
    </div>
    <script>
      const root = document.documentElement;
      document.getElementById('scheme-toggle').addEventListener('click', () => {
        root.dataset.colorScheme = root.dataset.colorScheme === 'dark' ? 'light' : 'dark';
      });
    </script>
  </body>
</html>
`;
}

function renderSideNav(blocks, currentBlock) {
  const links = blocks
    .map((block) => {
      const current = block === currentBlock ? ' aria-current="page"' : '';
      const view = block === currentBlock ? 'primary' : 'normal';

      return `          <li><a class="demo-nav__link hb-link hb-link_view_${view} hb-text hb-text_typography_body-2" href="./${block}.html"${current}>${escapeHtml(block)}</a></li>`;
    })
    .join('\n');

  return `        <nav class="demo-nav">
          <ul class="demo-nav__list">
${links}
          </ul>
        </nav>`;
}

function extractDemoExamples(readme) {
  const examples = [];
  let currentHeading = null;
  const lines = readme.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^#{2,3}\s+(.+)$/);

    if (heading) {
      currentHeading = heading[1];
      continue;
    }

    if (lines[index] !== '```html demo') {
      continue;
    }

    const code = [];
    index += 1;

    while (index < lines.length && lines[index] !== '```') {
      code.push(lines[index]);
      index += 1;
    }

    examples.push({
      title: currentHeading,
      code: code.join('\n').trim(),
    });
  }

  return examples;
}

function firstParagraph(markdown) {
  const withoutCode = markdown.replaceAll(/```[\s\S]*?```/g, '');
  const paragraphs = withoutCode
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith('#') && !part.startsWith('|') && !part.startsWith('- '));

  return (
    paragraphs[0]?.replaceAll(/\[([^\]]+)]\([^)]+\)/g, '$1').replaceAll(/`([^`]+)`/g, '$1') ?? 'Generated block demo.'
  );
}

function readmePath(block) {
  return path.join(root, 'blocks', block, 'README.md');
}

function validateDemoCssTokens() {
  const tokenFiles = [
    'color.css',
    'typography.css',
    'radius.css',
    'spacing.css',
    'motion.css',
    'size.css',
    'focus.css',
  ].map((file) => path.join(root, 'tokens', file));
  const tokenDefinitions = new Set(
    tokenFiles.flatMap((file) =>
      Array.from(readFileSync(file, 'utf8').matchAll(/(--hb-[a-z0-9-]+)\s*:/g), (match) => match[1])
    )
  );
  const demoCssFile = path.join(root, 'demo/demo.css');
  const demoCss = readFileSync(demoCssFile, 'utf8');
  const missing = Array.from(demoCss.matchAll(/var\((--hb-[a-z0-9-]+)/g), (match) => match[1])
    .filter((token, index, list) => list.indexOf(token) === index)
    .filter((token) => !tokenDefinitions.has(token))
    .sort();

  if (missing.length > 0) {
    console.error(
      `Demo shell references undefined token(s) in ${path.relative(root, demoCssFile)}:\n${missing
        .map((token) => `- ${token}`)
        .join('\n')}`
    );
    process.exit(1);
  }
}

function indent(text, spaces) {
  const padding = ' '.repeat(spaces);

  return text
    .split('\n')
    .map((line) => `${padding}${line}`)
    .join('\n');
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function slugifyClassPart(value) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '');
}

async function outputHtml(file, content) {
  const options = (await prettier.resolveConfig(file)) ?? {};

  return [file, await prettier.format(content, { ...options, parser: 'html' })];
}
