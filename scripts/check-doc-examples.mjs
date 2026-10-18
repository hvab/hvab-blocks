// Run a separate Chrome with --headless=new --remote-debugging-port=9222 and a temporary --user-data-dir.
// Start the catalogue, then: node scripts/check-doc-examples.mjs http://127.0.0.1:8000 http://127.0.0.1:9222
// This checks Chrome AX names and static popover geometry; it does not replace screen-reader speech testing.
import assert from 'node:assert/strict';

const [catalogue = 'http://127.0.0.1:8000', chrome = 'http://127.0.0.1:9222'] = process.argv.slice(2);
const target = await (await fetch(`${chrome}/json/new?about:blank`, { method: 'PUT' })).json();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.onopen = resolve;
  socket.onerror = reject;
});
const requests = new Map();
const errors = [];
let nextId = 0;
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const request = requests.get(message.id);
    requests.delete(message.id);
    if (message.error) request.reject(new Error(JSON.stringify(message.error)));
    else request.resolve(message.result);
  } else if (message.method === 'Runtime.exceptionThrown' || message.method === 'Network.loadingFailed') {
    errors.push(message.params);
  }
};
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    requests.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(fn, ...args) {
  const result = await command('Runtime.evaluate', {
    expression: `(${fn})(...${JSON.stringify(args)})`,
    returnByValue: true,
    awaitPromise: true,
  });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function navigate(block) {
  const url = `${catalogue}/demo/${block}.html`;
  await command('Page.navigate', { url });
  for (let attempt = 0; attempt < 100; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    if (await evaluate((expected) => location.href === expected && document.readyState === 'complete', url)) return;
  }
  throw new Error(`Timed out loading ${url}`);
}

try {
  await command('Runtime.enable');
  await command('Network.enable');
  await command('Page.enable');
  await command('Accessibility.enable');
  console.log((await command('Browser.getVersion')).product);
  for (const [block, role, count] of [
    ['text-input', 'textbox', 13],
    ['textarea', 'textbox', 17],
    ['progress', 'progressbar', 2],
  ]) {
    await navigate(block);
    const nodes = (await command('Accessibility.getFullAXTree')).nodes.filter((node) => node.role?.value === role);
    assert.equal(nodes.length, count, `${block}: semantic node count`);
    assert.ok(
      nodes.every((node) => node.name?.value.trim()),
      `${block}: every ${role} must have a name`
    );
    const ids = await evaluate(() => [...document.querySelectorAll('[id]')].map((element) => element.id));
    assert.equal(new Set(ids).size, ids.length, `${block}: duplicate IDs`);
    if (block === 'progress') {
      assert.equal(nodes[0].value.value, 42);
      assert.equal(nodes[1].value, undefined, 'Indeterminate progress must not expose a numeric value');
      assert.equal(nodes[1].properties.find((property) => property.name === 'busy').value.value, 1);
      assert.deepEqual(
        await evaluate(() => {
          const bars = [...document.querySelectorAll('[role="progressbar"]')];
          return bars.map((bar) =>
            ['aria-valuemin', 'aria-valuemax', 'aria-valuenow'].map((name) => bar.getAttribute(name))
          );
        }),
        [
          ['0', '100', '42'],
          [null, null, null],
        ]
      );
    } else {
      const state = await evaluate(() => ({
        disabled: document.querySelector(':disabled').value,
        invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((control) => control.value.trim()),
        readonly: document.querySelector('[readonly]')?.value,
        fieldNames: [...document.querySelectorAll('label')].map((label) => label.textContent.trim()),
      }));
      assert.equal(state.disabled, block === 'textarea' ? 'Disabled value' : 'Disabled');
      assert.deepEqual(
        state.invalid,
        block === 'textarea' ? ['Invalid value', 'Required before export.'] : ['Invalid', 'bad name!']
      );
      assert.deepEqual(
        state.fieldNames,
        block === 'textarea' ? ['Description', 'CSS comment'] : ['Theme name', 'Folder']
      );
      if (block === 'textarea') assert.equal(state.readonly, 'Readonly value');
    }
    console.log(`${block}: ${count} named ${role} nodes; values/states and unique IDs checked`);
  }
  for (const width of [320, 375, 1280]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate('popover');
    for (const scheme of ['light', 'dark']) {
      const bounds = await evaluate((scheme) => {
        document.documentElement.dataset.colorScheme = scheme;
        const preview = document.querySelector('.demo-card__preview_variant_anchored-menu-composition');
        preview.scrollIntoView({ block: 'center' });
        const menu = preview.querySelector('[role="menu"]');
        const button = preview.querySelector('button');
        const probe = document.createElement('div');
        probe.style.cssText = 'position: absolute; visibility: hidden; height: var(--hb-gap-2)';
        preview.append(probe);
        const gapToken = parseFloat(getComputedStyle(probe).height);
        probe.remove();
        return {
          gapToken,
          gap: menu.getBoundingClientRect().top - button.getBoundingClientRect().bottom,
          preview: preview.getBoundingClientRect().toJSON(),
          menu: menu.getBoundingClientRect().toJSON(),
          button: button.getBoundingClientRect().toJSON(),
          code: preview.nextElementSibling.getBoundingClientRect().toJSON(),
          actions: [...menu.querySelectorAll('[role="menuitem"]')].map((item) => item.textContent.trim()),
        };
      }, scheme);
      assert.equal(bounds.gap, bounds.gapToken, `${width}/${scheme}: gap follows --hb-gap-2`);
      for (const element of [bounds.menu, bounds.button]) {
        assert.ok(
          element.left >= bounds.preview.left && element.right <= bounds.preview.right,
          'Horizontal containment'
        );
        assert.ok(element.top >= bounds.preview.top && element.bottom <= bounds.preview.bottom, 'Vertical containment');
      }
      assert.ok(bounds.menu.bottom <= bounds.code.top, 'Menu must not overlap source code');
      assert.deepEqual(bounds.actions, ['Rename', 'Duplicate', 'Export JSON']);
      console.log(`popover ${width}/${scheme}: ${JSON.stringify(bounds)}`);
    }
  }
  assert.deepEqual(errors, [], 'Browser runtime or network errors');
} finally {
  socket.close();
  await fetch(`${chrome}/json/close/${target.id}`);
}
