/*
 * Fresh Grimoire screenshots via CDP. Spawns the built app under the
 * ambient Xvfb DISPLAY with a remote-debugging port, closes the
 * auto-opened DevTools, then drives the HashRouter directly.
 * Read-only: navigation only, no clicks on app controls.
 */
import { chromium } from 'playwright-core';
import { spawn } from 'child_process';
import { createRequire } from 'module';
import http from 'http';
import { mkdirSync } from 'fs';
mkdirSync(new URL('./shots-fresh', import.meta.url).pathname, { recursive: true });

const GRIMOIRE = new URL('../../../grimoire', import.meta.url).pathname;
const OUT = new URL('./shots-fresh', import.meta.url).pathname;
const PORT = 9223;

const electronPath = createRequire(GRIMOIRE + '/package.json')('electron');

const child = spawn(electronPath, ['.', `--remote-debugging-port=${PORT}`], {
  cwd: GRIMOIRE,
  stdio: 'ignore',
});
process.on('exit', () => child.kill());

const getJson = (path) =>
  new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: PORT, path }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(data); }
      });
    }).on('error', reject);
  });

// Wait for the debugger endpoint, then for the renderer page to exist
let targets = null;
for (let i = 0; i < 60; i++) {
  await new Promise((r) => setTimeout(r, 1000));
  try {
    targets = await getJson('/json/list');
    if (Array.isArray(targets) && targets.some((t) => t.type === 'page' && !t.url.startsWith('devtools://'))) break;
  } catch { /* not up yet */ }
}
if (!targets) throw new Error('debugger endpoint never came up');

// Close the DevTools that open automatically for unpackaged builds
for (const t of targets) {
  if (t.url.startsWith('devtools://')) await getJson(`/json/close/${t.id}`);
}

const browser = await chromium.connectOverCDP(`http://127.0.0.1:${PORT}`);
const page = browser
  .contexts()
  .flatMap((c) => c.pages())
  .find((p) => !p.url().startsWith('devtools://'));
if (!page) throw new Error('renderer page not found among targets');

await page.setViewportSize({ width: 1442, height: 826 });
await page.waitForTimeout(6000); // app boot, library scan, first paint

const targetsList = [
  { hash: '#/', file: 'installed.png', settle: 6000 },
  { hash: '#/browse', file: 'browse.png', settle: 10000 },
  { hash: '#/locker', file: 'locker.png', settle: 10000 },
  { hash: '#/profiles', file: 'profiles.png', settle: 4000 },
];

for (const t of targetsList) {
  await page.evaluate((h) => { window.location.hash = h; }, t.hash);
  await page.waitForTimeout(t.settle);
  await page.screenshot({ path: `${OUT}/${t.file}` });
  console.log('captured', t.file);
}

await browser.close();
child.kill();
console.log('done');
process.exit(0);
