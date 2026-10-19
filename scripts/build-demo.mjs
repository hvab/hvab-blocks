import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import { lexer, parser, Renderer } from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const blockOrder = Array.from(
  readFileSync(path.join(root, 'index.css'), 'utf8').matchAll(/@import url\('blocks\/([^/]+)\/\1\.css'\);/g),
  (match) => match[1]
);

const documentedBlocks = blockOrder.filter((block) => existsSync(readmePath(block)));
const pages = ['tokens', ...documentedBlocks];
const groups = [
  { title: 'Foundation', pages: ['tokens'] },
  { title: 'Typography', pages: ['hotkey', 'icon', 'text'] },
  {
    title: 'Forms',
    pages: [
      'button',
      'checkbox',
      'color-input',
      'field',
      'radio',
      'radio-group',
      'range-input',
      'select',
      'switch',
      'text-input',
      'textarea',
    ],
  },
  { title: 'Content', pages: ['card', 'divider', 'label', 'table'] },
  { title: 'Feedback', pages: ['alert', 'progress', 'skeleton', 'spin', 'toast'] },
  { title: 'Navigation', pages: ['breadcrumbs', 'link', 'pagination', 'tabs'] },
  { title: 'Overlays', pages: ['dialog', 'modal', 'popover', 'sheet', 'tooltip'] },
];
for (const group of groups) group.pages.sort();
const groupedPages = groups.flatMap((group) => group.pages);
if (
  groupedPages.length !== pages.length ||
  new Set(groupedPages).size !== pages.length ||
  pages.some((page) => !groupedPages.includes(page))
) {
  throw new Error('Every documented page must belong to exactly one catalogue group');
}
validateDemoCssTokens();

const outputs = new Map(
  await Promise.all([
    outputHtml(path.join(root, 'demo/index.html'), renderIndex()),
    ...pages.map((block) => outputHtml(path.join(root, `demo/${block}.html`), renderBlockPage(block))),
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

function renderIndex() {
  const sections = groups
    .map(
      (group) => `      <section class="demo-group" aria-labelledby="group-${slugifyClassPart(group.title)}">
        <h2 class="demo-group__title hb-text hb-text_typography_header-1" id="group-${slugifyClassPart(group.title)}">${escapeHtml(group.title)}</h2>
        <ul class="demo-grid">
          ${group.pages
            .map(
              (page) => `<li>
            <a class="demo-index-link hb-card hb-card_view_filled hb-link hb-link_view_normal" href="./${page}.html" data-clickable>
              <span class="hb-text hb-text_typography_subheader-3">${escapeHtml(page)}</span>
            </a>
          </li>`
            )
            .join('\n')}
        </ul>
      </section>`
    )
    .join('\n');

  return renderShell({
    title: 'hvab-blocks',
    documentTitle: 'demo',
    lead: 'Browse the block documentation and live HTML examples. Each page includes usage, states, public tokens and implementation limits.',
    body: sections,
  });
}

function renderBlockPage(block) {
  const readme = readFileSync(readmePath(block), 'utf8');
  const title = readme.match(/^#\s+(.+)$/m)?.[1] ?? block;
  const tokens = lexer(readme);
  const intro = tokens.findIndex((token) => token.type === 'paragraph');
  tokens.splice(intro, 1);
  tokens.shift();
  const renderer = new Renderer();
  const headings = new Map();
  let heading = 'Example';
  let examples = 0;

  renderer.heading = function (token) {
    heading = token.text;
    const slug = `docs-${slugifyClassPart(token.text)}`;
    const count = (headings.get(slug) ?? 0) + 1;
    headings.set(slug, count);
    return `<h${token.depth} id="${slug}${count > 1 ? `-${count}` : ''}">${this.parser.parseInline(token.tokens)}</h${token.depth}>`;
  };
  renderer.code = function (token) {
    if (token.lang !== 'html demo') return `<pre tabindex="0"><code>${escapeHtml(token.text)}</code></pre>`;
    examples += 1;
    return renderExample(block, { title: heading, code: token.text.trim() });
  };
  renderer.table = function (token) {
    return `<div class="demo-table" tabindex="0" role="region" aria-label="${escapeHtml(heading)} table">${Renderer.prototype.table.call(this, token)}</div>`;
  };
  renderer.link = function (token) {
    let href = token.href
      .replace('../../tokens/README.md', './tokens.html')
      .replace(/^\.\.\/([a-z0-9-]+)\/README\.md/, './$1.html');
    if (href !== token.href || href.startsWith('#')) href = href.replace(/#(.+)$/, '#docs-$1');
    return Renderer.prototype.link.call(this, { ...token, href });
  };

  // README files and live HTML examples are trusted, repository-authored build input.
  const body = `      <article class="demo-docs">${parser(tokens, { renderer })}</article>`;
  if (block !== 'tokens' && examples === 0) {
    throw new Error(`No live HTML examples found in ${path.relative(root, readmePath(block))}`);
  }

  return renderShell({ title, lead: firstParagraph(readme), body, currentBlock: block });
}

function renderExample(block, example) {
  const title = example.title;
  const blockSlug = slugifyClassPart(block);
  const variantSlug = slugifyClassPart(title);
  const previewClass = [
    'demo-card__preview',
    `demo-card__preview_block_${blockSlug}`,
    `demo-card__preview_variant_${variantSlug}`,
    `demo-card__preview_example_${blockSlug}_${variantSlug}`,
  ].join(' ');

  return `        <div class="demo-card">
          <div class="${previewClass}">
${indent(example.code, 12)}
          </div>
          <details class="demo-card__source">
            <summary>HTML source</summary>
            <pre class="demo-card__code" tabindex="0"><code>${escapeHtml(example.code)}</code></pre>
          </details>
        </div>`;
}

function renderShell({ title, documentTitle = title, lead, body, currentBlock }) {
  return `<!doctype html>
<html lang="en" data-color-scheme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>hvab-blocks - ${escapeHtml(documentTitle)}</title>
    <link rel="icon" href="data:," />
    <script src="./demo.js"></script>
    <link rel="stylesheet" href="../index.css" />
    <link rel="stylesheet" href="./demo.css" />
  </head>
  <body>
    <a class="demo-skip-link" href="#main-content">Skip to content</a>
    <div class="demo-shell">
      <aside class="demo-sidebar" aria-label="Blocks">
        <a class="demo-sidebar__title hb-link hb-link_view_primary hb-text hb-text_typography_subheader-3" href="./index.html">hvab-blocks</a>
        <button type="button" id="scheme-toggle" class="hb-button hb-button_view_outlined hb-button_size_xl" aria-pressed="false">Dark theme</button>
        ${renderSideNav(currentBlock)}
      </aside>
      <main class="demo-page" id="main-content" tabindex="-1">
        <header class="demo-header">
          <h1 class="demo-title hb-text hb-text_typography_display-1">${escapeHtml(title)}</h1>
          <p class="demo-lead hb-text hb-text_typography_body-3">${escapeHtml(lead)}</p>
        </header>
${body}
      </main>
    </div>
  </body>
</html>
`;
}

function renderSideNav(currentBlock) {
  const sections = groups
    .map(
      (group) => `          <section aria-labelledby="nav-${slugifyClassPart(group.title)}">
            <h2 class="demo-nav__heading hb-text hb-text_typography_caption-2" id="nav-${slugifyClassPart(group.title)}">${escapeHtml(group.title)}</h2>
            <ul class="demo-nav__list">
              ${group.pages.map((page) => `<li><a class="demo-nav__link hb-link hb-link_view_normal hb-text hb-text_typography_body-2" href="./${page}.html"${page === currentBlock ? ' aria-current="page"' : ''}>${escapeHtml(page)}</a></li>`).join('\n')}
            </ul>
          </section>`
    )
    .join('\n');

  return `        <label class="demo-mobile-nav">
          Browse
          <select id="block-select" class="hb-select">
            <option value="./index.html">All blocks</option>
            ${groups
              .map(
                (group) => `<optgroup label="${escapeHtml(group.title)}">
              ${group.pages.map((page) => `<option value="./${page}.html"${page === currentBlock ? ' selected' : ''}>${escapeHtml(page)}</option>`).join('\n')}
            </optgroup>`
              )
              .join('\n')}
          </select>
        </label>
        <nav class="demo-nav" aria-label="Blocks">
${sections}
        </nav>`;
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
  return block === 'tokens' ? path.join(root, 'tokens/README.md') : path.join(root, 'blocks', block, 'README.md');
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
