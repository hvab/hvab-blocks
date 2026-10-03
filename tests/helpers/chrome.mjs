import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function openBrowser(directory, root) {
  const executable =
    process.env.CHROME_BIN ||
    (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
  const browser = spawn(
    executable,
    [
      '--headless',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
      '--disable-component-update',
      '--disable-sync',
      '--remote-debugging-pipe',
      `--user-data-dir=${join(directory, 'profile')}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] }
  );
  let sequence = 0;
  let buffer = '';
  let diagnostics = '';
  const pending = new Map();
  browser.stderr.on('data', (chunk) => {
    diagnostics = (diagnostics + chunk).slice(-2000);
  });
  const rejectPending = (error) => {
    for (const request of pending.values()) {
      clearTimeout(request.timer);
      request.reject(error);
    }
    pending.clear();
  };
  browser.on('error', rejectPending);
  browser.on('exit', () => rejectPending(new Error(`Chrome exited: ${diagnostics}`)));
  browser.stdio[3].on('error', rejectPending);
  browser.stdio[4].setEncoding('utf8');
  browser.stdio[4].on('data', (chunk) => {
    buffer += chunk;
    let end;
    while ((end = buffer.indexOf('\0')) !== -1) {
      const message = JSON.parse(buffer.slice(0, end));
      buffer = buffer.slice(end + 1);
      const request = pending.get(message.id);
      if (!request) continue;
      pending.delete(message.id);
      clearTimeout(request.timer);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    }
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`${method} timed out; set CHROME_BIN to an installed Chrome/Chromium executable`));
      }, 10000);
      pending.set(id, { resolve, reject, timer });
      browser.stdio[3].write(`${JSON.stringify({ id, method, params, sessionId })}\0`);
    });
  const disposePipes = () => {
    browser.stderr.destroy();
    browser.stdio[3].destroy();
    browser.stdio[4].destroy();
  };
  const close = async () => {
    if (browser.exitCode !== null || browser.signalCode !== null) {
      disposePipes();
      return;
    }
    const exited = once(browser, 'exit');
    const timer = setTimeout(() => browser.kill('SIGKILL'), 2000);
    try {
      // Chrome may exit before its Browser.close response reaches the pipe.
      await send('Browser.close').catch(() => {});
      await exited;
    } finally {
      clearTimeout(timer);
      disposePipes();
    }
  };
  try {
    const version = await send('Browser.getVersion');
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const command = (method, params) => send(method, params, sessionId);
    const evaluate = async (fn, ...args) => {
      const result = await command('Runtime.evaluate', {
        expression: `(${fn.toString()})(...${JSON.stringify(args)})`,
        returnByValue: true,
        awaitPromise: true,
      });
      assert.equal(result.exceptionDetails, undefined, JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    await command('Page.enable');
    await command('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const file = join(directory, 'fixture.html');
    await writeFile(
      file,
      `<!doctype html><html data-color-scheme="light"><head><link rel="stylesheet" href="${pathToFileURL(join(root, 'index.css')).href}"></head><body></body></html>`
    );
    const url = pathToFileURL(file).href;
    await command('Page.navigate', { url });
    for (let i = 0; i < 100; i++) {
      if (await evaluate((url) => location.href === url && document.readyState === 'complete', url)) break;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    assert.equal(
      await evaluate(
        () => getComputedStyle(document.documentElement).getPropertyValue('--hb-color-text-hint').trim().length > 0
      ),
      true,
      'real index.css and token imports must load'
    );
    return { command, evaluate, close, version };
  } catch (error) {
    if (browser.pid) {
      browser.kill('SIGKILL');
      if (browser.exitCode === null && browser.signalCode === null) await once(browser, 'exit');
    }
    disposePipes();
    throw error;
  }
}
