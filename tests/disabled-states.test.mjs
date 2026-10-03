import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { openBrowser } from './helpers/chrome.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('documented disabled states preserve their existing skin across state sources', { timeout: 90000 }, async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'hvab-disabled-tests-'));
  let browser;
  try {
    browser = await openBrowser(directory, root);
    t.diagnostic(browser.version.product);
    const { command, evaluate } = browser;
    const move = (x, y) => command('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
    const setup = async (scheme, markup, mixed = false) => {
      await move(1200, 700);
      await evaluate(
        async (scheme, markup, mixed) => {
          document.documentElement.dataset.colorScheme = scheme;
          document.documentElement.style.setProperty('--hb-duration-fast', '0s');
          document.body.innerHTML = markup;
          if (mixed) document.querySelector('input').indeterminate = true;
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        },
        scheme,
        markup,
        mixed
      );
    };
    const hover = async () => {
      const point = await evaluate(() => {
        const rect = document.querySelector('label').getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      });
      await move(point.x, point.y);
      await evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
      assert.equal(await evaluate(() => document.querySelector('label').matches(':hover')), true);
    };
    const disabled = { native: 'disabled', aria: 'aria-disabled="true"', data: 'data-disabled' };
    const checked = { native: 'checked', aria: 'checked aria-checked="true"', data: 'checked data-state="checked"' };
    const control = (block, state, source, disabledSource, style = '') => {
      const attributes =
        state === 'mixed'
          ? source === 'aria'
            ? 'aria-checked="mixed"'
            : 'data-state="indeterminate"'
          : state === 'checked'
            ? checked[source]
            : '';
      return `<label class="hb-${block}" style="${style}"><input class="hb-${block}__control" type="${block === 'radio' ? 'radio' : 'checkbox'}" ${attributes} ${disabledSource ? disabled[disabledSource] : ''}><span class="hb-${block}__box" aria-hidden="true"></span><span class="hb-${block}__label">Choice</span></label>`;
    };
    const appearance = () =>
      evaluate(() => {
        const input = document.querySelector('input');
        const box = input.nextElementSibling;
        const css = getComputedStyle(box),
          before = getComputedStyle(box, '::before'),
          after = getComputedStyle(box, '::after');
        return {
          text: getComputedStyle(input.parentElement).color,
          background: css.backgroundColor,
          border: css.borderColor,
          opacity: css.opacity,
          beforeColor: before.color,
          beforeBackground: before.backgroundColor,
          beforeDisplay: before.display,
          afterColor: after.color,
          afterDisplay: after.display,
          transform: before.transform,
          width: css.width,
          height: css.height,
          checked: input.checked,
          mixed: input.indeterminate,
        };
      });

    for (const scheme of ['light', 'dark']) {
      for (const block of ['checkbox', 'radio', 'switch']) {
        for (const state of ['checked', ...(block === 'checkbox' ? ['mixed'] : [])]) {
          const referenceSource = state === 'mixed' ? 'aria' : 'native';
          const referenceDisabled = state === 'mixed' ? 'aria' : 'native';
          await setup(scheme, control(block, state, referenceSource, referenceDisabled), state === 'mixed');
          const expected = await appearance();
          for (const source of state === 'mixed' ? ['aria', 'data'] : ['native', 'aria', 'data']) {
            for (const disabledSource of ['native', 'aria', 'data']) {
              await t.test(`${scheme} ${block} ${state}: ${source} + ${disabledSource} disabled`, async () => {
                await setup(scheme, control(block, state, source, disabledSource), state === 'mixed');
                assert.deepEqual(await appearance(), expected);
                await hover();
                assert.deepEqual(
                  await appearance(),
                  expected,
                  'disabled hover must preserve the existing disabled appearance'
                );
              });
            }
          }
        }
        await t.test(`${scheme} ${block}: public overrides and enabled focus`, async () => {
          const style =
            block === 'checkbox'
              ? '--hb-checkbox-icon-color:rgb(10 20 30);--hb-checkbox-box-size:26px'
              : block === 'radio'
                ? '--hb-radio-disc-color:rgb(10 20 30);--hb-radio-box-size:26px'
                : '--hb-switch-track-background:rgb(10 20 30);--hb-switch-box-opacity:0.7;--hb-switch-track-width:52px';
          await setup(scheme, control(block, 'checked', 'native', 'aria', style));
          const overridden = await appearance();
          if (block === 'checkbox') {
            assert.equal(overridden.beforeColor, 'rgb(10, 20, 30)');
            assert.equal(overridden.width, '26px');
          }
          if (block === 'radio') {
            assert.equal(overridden.beforeBackground, 'rgb(10, 20, 30)');
            assert.equal(overridden.width, '26px');
          }
          if (block === 'switch') {
            assert.equal(overridden.background, 'rgb(10, 20, 30)');
            assert.equal(overridden.opacity, '0.7');
            assert.equal(overridden.width, '52px');
          }
          await hover();
          assert.deepEqual(await appearance(), overridden);
          await setup(scheme, control(block, 'checked', 'native'));
          await command('Input.dispatchKeyEvent', {
            type: 'keyDown',
            key: 'Tab',
            code: 'Tab',
            windowsVirtualKeyCode: 9,
          });
          await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
          assert.equal(await evaluate(() => document.activeElement === document.querySelector('input')), true);
          assert.equal(
            await evaluate(() => getComputedStyle(document.querySelector('input').nextElementSibling).outlineStyle),
            'solid'
          );
        });
      }

      const group = (state, source, style = '') => {
        const rootDisabled =
          source === 'root-aria' ? 'aria-disabled="true"' : source === 'root-data' ? 'data-disabled' : '';
        const inputDisabled = source.startsWith('root-') || source === 'enabled' ? '' : disabled[source];
        return `<div class="hb-radio-group" role="radiogroup" aria-label="Fixture" ${rootDisabled} style="${style}"><label class="hb-radio-group__option"><input class="hb-radio-group__control" type="radio" name="fixture" ${state === 'checked' ? 'checked' : ''} ${inputDisabled}><span class="hb-radio-group__content">Choice</span></label></div>`;
      };
      const groupAppearance = () =>
        evaluate(() => {
          const option = document.querySelector('label'),
            css = getComputedStyle(option),
            fill = getComputedStyle(option, '::after');
          return { color: css.color, background: fill.backgroundColor, border: fill.borderColor, cursor: css.cursor };
        });
      for (const state of ['unchecked', 'checked']) {
        await setup(scheme, group(state, 'native'));
        const expected = await groupAppearance();
        for (const source of ['root-aria', 'root-data', 'native', 'aria', 'data']) {
          await t.test(`${scheme} radio-group ${state}: ${source} disabled before/after hover`, async () => {
            await setup(scheme, group(state, source));
            assert.deepEqual(await groupAppearance(), expected);
            await hover();
            assert.deepEqual(await groupAppearance(), expected);
          });
        }
      }
      await t.test(`${scheme} radio-group: enabled hover, focus and public disabled overrides`, async () => {
        await setup(scheme, group('unchecked', 'enabled'));
        const before = await groupAppearance();
        await hover();
        assert.notDeepEqual(await groupAppearance(), before, 'enabled hover remains active');
        await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        assert.equal(await evaluate(() => getComputedStyle(document.querySelector('label')).outlineStyle), 'solid');
        await setup(
          scheme,
          group(
            'unchecked',
            'root-aria',
            '--hb-radio-group-text-color-disabled:rgb(10 20 30);--hb-radio-group-background-disabled:rgb(40 50 60)'
          )
        );
        await hover();
        const overridden = await groupAppearance();
        assert.equal(overridden.color, 'rgb(10, 20, 30)');
        assert.equal(overridden.background, 'rgb(40, 50, 60)');
      });
    }
  } finally {
    try {
      if (browser) await browser.close();
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }
});
