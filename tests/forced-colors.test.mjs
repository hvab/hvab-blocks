import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { openBrowser } from './helpers/chrome.mjs';

const root = process.env.HB_CONTROL_ROOT
  ? resolve(process.env.HB_CONTROL_ROOT)
  : fileURLToPath(new URL('../', import.meta.url));
const baselineRoot = process.env.HB_BASELINE_ROOT;
const artifacts = process.env.HB_TEST_ARTIFACTS;
const disabled = { native: 'disabled', aria: 'aria-disabled="true"', data: 'data-disabled' };
const checked = { native: 'checked', aria: 'checked aria-checked="true"', data: 'checked data-state="checked"' };
const control = (block, state, source = 'native', disabledSource = '', style = '') => {
  const attributes =
    state === 'mixed'
      ? source === 'aria'
        ? 'aria-checked="mixed"'
        : 'data-state="indeterminate"'
      : state === 'checked'
        ? checked[source]
        : '';
  return `<label class="hb-${block}" style="${style}"><input class="hb-${block}__control" type="${block === 'radio' ? 'radio' : 'checkbox'}" ${attributes} ${disabledSource ? disabled[disabledSource] : ''}><span class="hb-${block}__box" aria-hidden="true"></span><span class="hb-${block}__label">${block} ${state}</span></label>`;
};
const scene =
  ['checkbox', 'radio', 'switch']
    .flatMap((block) => ['unchecked', 'checked'].map((state) => '<p>' + control(block, state) + '</p>'))
    .join('') +
  '<p>' +
  control('checkbox', 'mixed', 'aria') +
  '</p><p>' +
  control('checkbox', 'checked', 'native', 'native') +
  '</p>' +
  '<label><input type="checkbox">Native unchecked</label><label><input type="checkbox" checked>Native checked</label>' +
  '<p><select class="hb-select" aria-label="Custom select"><option>A</option><option>B</option></select><select aria-label="Native reference"><option>A</option><option>B</option></select></p>';

async function setup(browser, preference, scheme, markup, forced = 'active') {
  await browser.command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1200, y: 700 });
  await browser.command('Emulation.setEmulatedMedia', {
    features: [
      { name: 'forced-colors', value: forced },
      { name: 'prefers-color-scheme', value: preference },
    ],
  });
  await browser.evaluate(
    async (preference, scheme, markup) => {
      document.documentElement.dataset.colorScheme = scheme;
      document.documentElement.style.colorScheme = preference;
      document.documentElement.style.setProperty('--hb-duration-fast', '0s');
      document.body.style.cssText =
        'font:16px Arial;margin:16px;background:var(--hb-color-base-background);color:var(--hb-color-text-primary)';
      document.body.innerHTML = markup;
      document
        .querySelectorAll('[aria-checked="mixed"],[data-state="indeterminate"]')
        .forEach((e) => (e.indeterminate = true));
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    },
    preference,
    scheme,
    markup
  );
}
const sample = (browser) =>
  browser.evaluate(() => {
    const input = document.querySelector('input'),
      box = input.nextElementSibling;
    const css = getComputedStyle(box),
      before = getComputedStyle(box, '::before'),
      after = getComputedStyle(box, '::after');
    return {
      background: css.backgroundColor,
      border: css.borderColor,
      opacity: css.opacity,
      color: css.color,
      label: getComputedStyle(input.parentElement).color,
      beforeColor: before.color,
      beforeBackground: before.backgroundColor,
      beforeDisplay: before.display,
      afterColor: after.color,
      afterDisplay: after.display,
      width: css.width,
      height: css.height,
      transform: before.transform,
      checked: input.checked,
      indeterminate: input.indeterminate,
      disabled: input.disabled,
    };
  });
async function semantics(browser) {
  const { nodes } = await browser.command('Accessibility.getFullAXTree');
  return nodes
    .filter((n) => ['checkbox', 'radio', 'combobox'].includes(n.role?.value))
    .map((n) => ({
      role: n.role.value,
      name: n.name?.value,
      properties: n.properties
        .filter((p) => ['checked', 'disabled', 'invalid'].includes(p.name))
        .map((p) => ({ name: p.name, value: p.value.value })),
    }));
}
async function hover(browser) {
  const point = await browser.evaluate(() => {
    const r = document.querySelector('label').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  await browser.command('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await browser.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
  assert.equal(await browser.evaluate(() => document.querySelector('label').matches(':hover')), true);
}
async function screenshot(browser, name) {
  const png = Buffer.from((await browser.command('Page.captureScreenshot', { format: 'png' })).data, 'base64');
  if (artifacts) {
    await mkdir(artifacts, { recursive: true });
    await writeFile(join(artifacts, name + '.png'), png);
  }
  return png;
}

test('forced colors preserves indicators and coherent state sources', { timeout: 120000 }, async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'hvab-forced-tests-'));
  let browser, baseline;
  try {
    browser = await openBrowser(join(directory, 'current'), root);
    t.diagnostic(browser.version.product);
    if (baselineRoot) baseline = await openBrowser(join(directory, 'baseline'), resolve(baselineRoot));
    for (const preference of ['light', 'dark'])
      for (const scheme of ['light', 'dark']) {
        await setup(browser, preference, scheme, '<span/>');
        const palette = await browser.evaluate(() => {
          const result = {};
          for (const keyword of ['ButtonFace', 'ButtonText', 'GrayText', 'Highlight', 'HighlightText']) {
            const e = document.createElement('span');
            e.style.cssText = 'forced-color-adjust:none;color:' + keyword;
            document.body.append(e);
            result[keyword] = getComputedStyle(e).color;
            e.remove();
          }
          return result;
        });
        assert.notEqual(palette.ButtonText, palette.ButtonFace, 'system foreground and surface must differ');
        t.diagnostic(JSON.stringify({ preference, scheme, palette }));
        for (const block of ['checkbox', 'radio', 'switch'])
          for (const state of ['unchecked', 'checked', ...(block === 'checkbox' ? ['mixed'] : [])]) {
            for (const source of state === 'mixed'
              ? ['aria', 'data']
              : state === 'checked'
                ? ['native', 'aria', 'data']
                : ['native'])
              for (const disabledSource of ['', 'native', 'aria', 'data']) {
                await t.test(
                  `${preference}/${scheme} ${block} ${state} ${source}/${disabledSource || 'enabled'}`,
                  async () => {
                    const markup = control(block, state, source, disabledSource);
                    await setup(browser, preference, scheme, markup, 'none');
                    const normal = await sample(browser);
                    const normalSemantics = await semantics(browser);
                    assert.equal(normalSemantics.length, 1, 'native control must appear in the AX tree');
                    assert.equal(normalSemantics[0].role, block === 'radio' ? 'radio' : 'checkbox');
                    assert.equal(normalSemantics[0].name, `${block} ${state}`);
                    await setup(browser, preference, scheme, markup);
                    const actual = await sample(browser);
                    assert.deepEqual(await semantics(browser), normalSemantics, 'AX role, name and state unchanged');
                    assert.deepEqual(
                      [actual.width, actual.height],
                      [normal.width, normal.height],
                      'geometry unchanged by forced mode'
                    );
                    if (block === 'switch')
                      assert.equal(actual.transform, normal.transform, 'thumb position unchanged');
                    assert.equal(actual.checked, state === 'checked');
                    assert.equal(actual.indeterminate, state === 'mixed');
                    assert.equal(actual.disabled, disabledSource === 'native');
                    const ink = disabledSource ? palette.GrayText : palette.ButtonText;
                    if (block === 'checkbox') {
                      assert.equal(actual.background, palette.ButtonFace);
                      assert.equal(actual.border, ink);
                      if (state === 'unchecked')
                        assert.ok(
                          actual.beforeDisplay === 'none' || actual.beforeColor === 'rgba(0, 0, 0, 0)',
                          'unchecked must not paint a tick'
                        );
                      else {
                        assert.equal(actual.color, ink);
                        assert.equal(state === 'mixed' ? actual.afterDisplay : actual.beforeDisplay, 'block');
                      }
                      if (state === 'mixed') assert.equal(actual.beforeDisplay, 'none');
                    } else if (block === 'radio') {
                      assert.equal(actual.background, palette.ButtonFace);
                      assert.equal(actual.border, ink);
                      if (state === 'unchecked')
                        assert.ok(
                          actual.beforeDisplay === 'none' || actual.beforeBackground === 'rgba(0, 0, 0, 0)',
                          'unchecked must not paint a dot'
                        );
                      else {
                        assert.notEqual(actual.beforeDisplay, 'none');
                        assert.equal(actual.beforeBackground, ink);
                      }
                    } else {
                      assert.equal(
                        actual.background,
                        disabledSource ? palette.GrayText : state === 'checked' ? palette.Highlight : palette.ButtonText
                      );
                      assert.equal(
                        actual.beforeBackground,
                        !disabledSource && state === 'checked' ? palette.HighlightText : palette.ButtonFace
                      );
                      assert.notEqual(actual.background, actual.beforeBackground, 'track and thumb must differ');
                      assert.equal(actual.opacity, '1');
                    }
                    if (disabledSource) assert.equal(actual.label, palette.GrayText);
                    await hover(browser);
                    assert.deepEqual(await sample(browser), actual, 'hover retains the system skin');
                  }
                );
              }
          }
        await t.test(
          `${preference}/${scheme} enabled keyboard and public geometry/system-color overrides`,
          async () => {
            for (const block of ['checkbox', 'radio', 'switch']) {
              const style =
                block === 'checkbox'
                  ? '--hb-checkbox-box-size:26px;--hb-checkbox-icon-color:ButtonText'
                  : block === 'radio'
                    ? '--hb-radio-box-size:26px;--hb-radio-disc-color:ButtonText'
                    : '--hb-switch-track-width:52px;--hb-switch-slider-background:ButtonFace';
              await setup(browser, preference, scheme, control(block, 'checked', 'native', '', style));
              const actual = await sample(browser);
              assert.equal(actual.width, block === 'switch' ? '52px' : '26px');
              if (block === 'checkbox') assert.equal(actual.beforeColor, palette.ButtonText);
              if (block === 'radio') assert.equal(actual.beforeBackground, palette.ButtonText);
              if (block === 'switch') assert.equal(actual.beforeBackground, palette.ButtonFace);
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyDown',
                key: 'Tab',
                code: 'Tab',
                windowsVirtualKeyCode: 9,
              });
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyUp',
                key: 'Tab',
                code: 'Tab',
                windowsVirtualKeyCode: 9,
              });
              assert.equal(
                await browser.evaluate(() => document.activeElement === document.querySelector('input')),
                true
              );
              assert.equal(
                await browser.evaluate(
                  () => getComputedStyle(document.querySelector('input').nextElementSibling).outlineStyle
                ),
                'solid'
              );
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyDown',
                key: ' ',
                code: 'Space',
                windowsVirtualKeyCode: 32,
              });
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyUp',
                key: ' ',
                code: 'Space',
                windowsVirtualKeyCode: 32,
              });
              assert.equal(
                await browser.evaluate(() => document.querySelector('input').checked),
                block === 'radio',
                'Space keeps a selected radio checked and toggles a checkbox'
              );
              const labelPoint = await browser.evaluate(() => {
                const rect = document.querySelector('input').parentElement.lastElementChild.getBoundingClientRect();
                return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
              });
              await browser.command('Input.dispatchMouseEvent', {
                type: 'mousePressed',
                ...labelPoint,
                button: 'left',
                clickCount: 1,
              });
              await browser.command('Input.dispatchMouseEvent', {
                type: 'mouseReleased',
                ...labelPoint,
                button: 'left',
                clickCount: 1,
              });
              assert.equal(
                await browser.evaluate(() => document.querySelector('input').checked),
                true,
                'visible label activates the native input'
              );
            }
          }
        );
        await t.test(
          `${preference}/${scheme} select native indicator, keyboard, disabled and public height`,
          async () => {
            const markup =
              '<select class="hb-select" aria-label="Custom" style="--hb-select-height:52px"><option>A</option><option>B</option></select><select aria-label="Native"><option>A</option><option>B</option></select>';
            await setup(browser, preference, scheme, markup, 'none');
            const normalSemantics = await semantics(browser);
            assert.deepEqual(
              normalSemantics.map((n) => [n.role, n.name]),
              [
                ['combobox', 'Custom'],
                ['combobox', 'Native'],
              ]
            );
            await setup(browser, preference, scheme, markup);
            assert.deepEqual(await semantics(browser), normalSemantics, 'select AX role and name unchanged');
            const values = await browser.evaluate(() =>
              [...document.querySelectorAll('select')].map((e) => ({
                appearance: getComputedStyle(e).appearance,
                image: getComputedStyle(e).backgroundImage,
                height: getComputedStyle(e).height,
              }))
            );
            assert.equal(values[0].appearance, values[1].appearance);
            assert.notEqual(values[0].appearance, 'none');
            assert.equal(values[0].image, 'none');
            assert.equal(values[0].height, '52px');
            await browser.command('Input.dispatchKeyEvent', {
              type: 'keyDown',
              key: 'Tab',
              code: 'Tab',
              windowsVirtualKeyCode: 9,
            });
            await browser.command('Input.dispatchKeyEvent', {
              type: 'keyUp',
              key: 'Tab',
              code: 'Tab',
              windowsVirtualKeyCode: 9,
            });
            assert.equal(
              await browser.evaluate(() => document.activeElement === document.querySelector('select')),
              true
            );
            assert.equal(
              await browser.evaluate(() => getComputedStyle(document.querySelector('select')).outlineStyle),
              'solid'
            );
            const valuesAfterKeys = [];
            for (const index of [0, 1]) {
              if (index) await browser.evaluate(() => document.querySelectorAll('select')[1].focus());
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyDown',
                key: 'b',
                code: 'KeyB',
                text: 'b',
                windowsVirtualKeyCode: 66,
              });
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyUp',
                key: 'b',
                code: 'KeyB',
                windowsVirtualKeyCode: 66,
              });
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyDown',
                key: 'Escape',
                code: 'Escape',
                windowsVirtualKeyCode: 27,
              });
              await browser.command('Input.dispatchKeyEvent', {
                type: 'keyUp',
                key: 'Escape',
                code: 'Escape',
                windowsVirtualKeyCode: 27,
              });
              valuesAfterKeys.push(
                await browser.evaluate((index) => document.querySelectorAll('select')[index].value, index)
              );
            }
            assert.deepEqual(valuesAfterKeys, ['B', 'B'], 'native typeahead selects the same option');
            for (const source of ['native', 'aria']) {
              await setup(
                browser,
                preference,
                scheme,
                `<select class="hb-select" aria-label="Disabled" ${disabled[source]}><option>A</option></select>`
              );
              assert.equal(
                await browser.evaluate(() => getComputedStyle(document.querySelector('select')).color),
                palette.GrayText
              );
            }
          }
        );
        await setup(browser, preference, scheme, scene);
        await screenshot(browser, `after-forced-${preference}-${scheme}`);
        if (baseline) {
          await setup(baseline, preference, scheme, scene);
          await screenshot(baseline, `before-forced-${preference}-${scheme}`);
        }
        await t.test(
          `${preference}/${scheme} normal paint matches PR12 baseline`,
          { skip: !baselineRoot },
          async () => {
            await setup(browser, preference, scheme, scene, 'none');
            await setup(baseline, preference, scheme, scene, 'none');
            assert.deepEqual(
              await screenshot(browser, `after-normal-${preference}-${scheme}`),
              await screenshot(baseline, `before-normal-${preference}-${scheme}`)
            );
          }
        );
      }
  } finally {
    try {
      await Promise.all([browser?.close(), baseline?.close()]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }
});
