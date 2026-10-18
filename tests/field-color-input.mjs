// Run: CHROME_BIN=/path/to/chrome node tests/field-color-input.mjs
// Uses an isolated headless Chrome profile; no browser package or CSS build needed.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chromeBin = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
assert.ok(existsSync(chromeBin), 'Set CHROME_BIN to a Chrome/Chromium executable');
const profile = mkdtempSync(path.join(tmpdir(), 'hb-field-chrome-'));
const tokens = ['ref', 'color', 'typography', 'radius', 'spacing', 'motion', 'size', 'focus'];
const adjacent = ['text-input', 'textarea', 'select', 'range-input'];
const sizes = { base: 28, s: 24, m: 28, l: 36, xl: 44 };
const states = {
  default: '',
  invalid: 'aria-invalid="true"',
  disabled: 'disabled',
  'aria-disabled': 'aria-disabled="true"',
  'disabled-invalid': 'disabled aria-invalid="true"',
  'aria-disabled-invalid': 'aria-disabled="true" aria-invalid="true"',
  hover: '',
  focus: '',
  'invalid-focus': 'aria-invalid="true"',
};
const errors = [];
let fixture = '';
const server = createServer((req, res) => {
  if (req.url === '/fixture') {
    res.setHeader('Content-Type', 'text/html');
    res.end(fixture);
  } else if (req.url === '/favicon.ico') {
    res.writeHead(204).end();
  } else {
    const file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
    if (!file.startsWith(root + path.sep) || !existsSync(file)) return res.writeHead(404).end();
    res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : 'text/html');
    res.end(readFileSync(file));
  }
});
let chrome;
let ws;
let checks = 0;
const failures = [];
const snapshots = [];
const check = (actual, expected, label) => {
  checks++;
  if (actual !== expected) failures.push(`${label}: expected ${expected}, got ${actual}`);
};

try {
  await new Promise((resolve, reject) => server.once('error', reject).listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  chrome = spawn(
    chromeBin,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );
  chrome.on('error', (error) => errors.push(error.message));
  const portFile = path.join(profile, 'DevToolsActivePort');
  for (let i = 0; !existsSync(portFile) && i < 100; i++) await delay(100);
  assert.ok(existsSync(portFile), `Chrome did not start: ${errors.join('; ')}`);
  const port = readFileSync(portFile, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  ws = new WebSocket(targets.find((target) => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let id = 0;
  const pending = new Map();
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      message.error ? request.reject(message.error) : request.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    else if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error')
      errors.push(message.params.entry.text);
  };
  const cmd = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const requestId = ++id;
      pending.set(requestId, { resolve, reject });
      ws.send(JSON.stringify({ id: requestId, method, params }));
    });
  const evaluate = async (fn) => {
    const result = await cmd('Runtime.evaluate', { expression: `(${fn})()`, returnByValue: true, awaitPromise: true });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  await cmd('Page.enable');
  await cmd('Runtime.enable');
  await cmd('Log.enable');
  await cmd('DOM.enable');
  await cmd('CSS.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1000, height: 800, deviceScaleFactor: 1, mobile: false });
  console.log((await cmd('Browser.getVersion')).product);
  const baselines = new Map();
  for (const scheme of ['light', 'dark']) {
    for (const order of ['field-first', 'color-first', 'index']) {
      const imports =
        order === 'index'
          ? ['/index.css']
          : [
              ...tokens.map((token) => `/tokens/${token}.css`),
              ...(order === 'field-first' ? ['field', 'color-input'] : ['color-input', 'field']).map(
                (block) => `/blocks/${block}/${block}.css`
              ),
              ...adjacent.map((block) => `/blocks/${block}/${block}.css`),
            ];
      const markup = [];
      for (const layout of ['vertical', 'inline', 'standalone', 'wrapped']) {
        for (const width of [0, 40, 72])
          for (const [size, defaultWidth] of Object.entries(sizes)) {
            for (const [state, attrs] of Object.entries(states)) {
              const key = `${layout}-${width}-${size}-${state}`;
              const style = width
                ? `--hb-color-input-control-width:${width}px;--hb-color-input-control-height:32px`
                : '';
              const input = `<input id="${key}" class="hb-color-input ${size === 'base' ? '' : `hb-color-input_size_${size}`} ${['vertical', 'inline'].includes(layout) ? 'hb-field__control' : ''}" type="color" value="#5b57f0" ${attrs} data-expected-width="${width || defaultWidth}" data-expected-height="${width ? 32 : defaultWidth}" data-state="${state}" aria-label="${key}">`;
              const control = layout === 'wrapped' ? `<div class="hb-field__control">${input}</div>` : input;
              markup.push(
                layout === 'standalone'
                  ? `<div style="${style}">${control}</div>`
                  : `<div class="hb-field ${layout === 'inline' ? 'hb-field_layout_inline' : ''}" style="${style}"><label class="hb-field__label" for="${key}">Color</label>${control}<span class="hb-field__addons">Action</span><p class="hb-field__message">Help</p></div>`
              );
            }
          }
      }
      for (const layout of ['vertical', 'inline']) {
        for (const control of [
          '<input class="hb-field__control hb-text-input" aria-label="Text">',
          '<textarea class="hb-field__control hb-textarea" aria-label="Note"></textarea>',
          '<select class="hb-field__control hb-select" aria-label="Select"><option>Option</option></select>',
          '<div class="hb-field__control hb-range-input"><input class="hb-range-input__control" type="range" aria-label="Range"></div>',
          '<input class="hb-field__control" aria-label="Native text">',
          '<div class="hb-field__control hb-field__addons"><input class="hb-color-input" type="color" aria-label="Swatch"><input class="hb-text-input" style="width:auto" size="8" aria-label="Hex"></div>',
        ])
          markup.push(
            `<div class="hb-field ${layout === 'inline' ? 'hb-field_layout_inline' : ''}" data-neighbor><label class="hb-field__label">Neighbor</label>${control}<span class="hb-field__addons">Action</span></div>`
          );
      }
      for (const view of ['neutral', 'error', 'warning'])
        markup.push(
          `<div class="hb-field"><p class="hb-field__message ${view === 'neutral' ? '' : `hb-field__message_view_${view}`}" data-message="${view}">${view}</p></div>`
        );
      markup.push(
        '<div style="--hb-color-input-control-width:72px;--hb-color-input-control-border-color:rgb(123, 45, 67)"><input class="hb-color-input hb-field__control hb-color-input_size_s" type="color" disabled aria-invalid="true" data-public aria-label="Public override"></div>'
      );
      fixture = `<!doctype html><html data-color-scheme="${scheme}"><head>${imports.map((href) => `<link rel="stylesheet" href="${href}">`).join('')}<style>.hb-field{width:640px}body{margin:8px;font:16px Arial}.hb-color-input{transition:none}</style></head><body>${markup.join('')}</body></html>`;
      await cmd('Page.navigate', { url: origin + '/fixture' });
      for (let i = 0; i < 100; i++) {
        if (await evaluate(() => document.readyState === 'complete' && document.querySelector('[data-public]'))) break;
        await delay(20);
      }
      const documentNode = await cmd('DOM.getDocument');
      const nodes = await cmd('DOM.querySelectorAll', {
        nodeId: documentNode.root.nodeId,
        selector: '[data-state="hover"], [data-state="focus"], [data-state="invalid-focus"]',
      });
      for (const nodeId of nodes.nodeIds) {
        const attrs = (await cmd('DOM.getAttributes', { nodeId })).attributes;
        const state = attrs[attrs.indexOf('data-state') + 1];
        await cmd('CSS.forcePseudoState', {
          nodeId,
          forcedPseudoClasses: state === 'hover' ? ['hover'] : ['focus', 'focus-visible'],
        });
      }
      const snapshot = await evaluate(() => {
        const geometry = (e) => ({ width: e.getBoundingClientRect().width, height: e.getBoundingClientRect().height });
        return {
          colors: [...document.querySelectorAll('[data-expected-width]')].map((e) => {
            const css = getComputedStyle(e),
              field = e.closest('.hb-field');
            return {
              id: e.id,
              ...geometry(e),
              expectedWidth: +e.dataset.expectedWidth,
              expectedHeight: +e.dataset.expectedHeight,
              border: css.borderColor,
              background: css.backgroundColor,
              outline: css.outline,
              cursor: css.cursor,
              label: field && geometry(field.querySelector('label')),
              addons: field && geometry(field.querySelector('.hb-field__addons')),
            };
          }),
          neighbors: [...document.querySelectorAll('[data-neighbor]')].map((e) => {
            const columns = getComputedStyle(e).gridTemplateColumns.split(' ');
            return {
              slot: geometry(e.querySelector('.hb-field__control')).width,
              expected: parseFloat(columns[e.classList.contains('hb-field_layout_inline') ? 1 : 0]),
            };
          }),
          messages: [...document.querySelectorAll('[data-message]')].map((e) => ({
            view: e.dataset.message,
            color: getComputedStyle(e).color,
            margin: getComputedStyle(e).margin,
          })),
          public: {
            ...geometry(document.querySelector('[data-public]')),
            border: getComputedStyle(document.querySelector('[data-public]')).borderColor,
          },
        };
      });
      const label = `${scheme}/${order}`;
      snapshots.push({ scheme, order, snapshot });
      for (const color of snapshot.colors) {
        check(color.width, color.expectedWidth, `${label}/${color.id}/width`);
        check(color.height, color.expectedHeight, `${label}/${color.id}/height`);
        if (color.id.endsWith('-disabled') || color.id.includes('disabled-invalid'))
          check(color.cursor, 'not-allowed', `${label}/${color.id}/cursor`);
        if (color.id.endsWith('-focus')) check(color.outline.includes('solid'), true, `${label}/${color.id}/outline`);
      }
      for (const neighbor of snapshot.neighbors)
        check(Math.abs(neighbor.slot - neighbor.expected) < 0.001, true, `${label}/neighbor full width`);
      check(snapshot.public.width, 72, `${label}/public width`);
      check(snapshot.public.border, 'rgb(123, 45, 67)', `${label}/public border`);
      check(new Set(snapshot.messages.map((message) => message.color)).size, 3, `${label}/message tones`);
      if (baselines.has(scheme))
        check(JSON.stringify(snapshot) === baselines.get(scheme), true, `${label}/same geometry and states`);
      else baselines.set(scheme, JSON.stringify(snapshot));
    }
  }
  check(errors.length, 0, 'Browser console/runtime errors');
  if (process.env.REPORT_PATH)
    writeFileSync(process.env.REPORT_PATH, JSON.stringify({ checks, failures, snapshots }, null, 2));
  console.log(`${checks} assertions; ${failures.length} failures`);
  if (failures.length) console.error(failures.slice(0, 12).join('\n'));
  assert.equal(failures.length, 0, 'Field/color-input browser regression matrix failed');
} finally {
  if (ws) ws.close();
  if (chrome) {
    chrome.kill('SIGTERM');
    await Promise.race([new Promise((resolve) => chrome.once('exit', resolve)), delay(2000)]);
    if (chrome.exitCode === null) chrome.kill('SIGKILL');
  }
  server.close();
  rmSync(profile, { recursive: true, force: true });
}
