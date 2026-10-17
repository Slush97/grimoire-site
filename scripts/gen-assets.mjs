/*
 * gen-assets.mjs
 * Build-adjacent asset generator. Run manually (pnpm gen:assets) whenever
 * screenshots change or the OG card design is touched; outputs are
 * committed so the Cloudflare build never depends on sharp.
 *
 *   1. public/screenshots/thumbs/<name>.webp : 880w gallery thumbnails
 *      used by every era stage; full PNGs stay as the lightbox targets.
 *   2. public/og.png : 1200x630 social card (Discord/Twitter embeds).
 *      The homepage hero in miniature: Cormorant wordmark, lede, the
 *      download buttons, and the Hero Locker shot running off the edge.
 *      Rendered by headless Chromium (CHROME, default `chromium`).
 */
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = path.join(ROOT, 'public');
const SHOTS_DIR = path.join(ROOT, 'public/screenshots');
const THUMBS_DIR = path.join(SHOTS_DIR, 'thumbs');
const OG_OUT = path.join(ROOT, 'public/og.png');

/* ─── 1. Gallery thumbnails ──────────────────────────────────────── */

async function genThumbs() {
  await mkdir(THUMBS_DIR, { recursive: true });
  const files = (await readdir(SHOTS_DIR)).filter((f) => f.endsWith('.png'));
  for (const f of files) {
    const out = path.join(THUMBS_DIR, f.replace(/\.png$/, '.webp'));
    await sharp(path.join(SHOTS_DIR, f))
      .resize({ width: 880, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    console.log('thumb:', path.relative(ROOT, out));
  }
}

/* ─── 1b. Full-size WebP for the lightbox ────────────────────────── */

/*
 * The stages link screenshots as .png so the plain link still hands a
 * universally-openable file to no-JS visitors and to anyone who saves
 * one. The lightbox, which additionally prefetches both neighbours of
 * whatever you opened, swaps in the .webp beside it (see Lightbox.astro)
 * and falls back to the PNG if it 404s. Some of these shots are UI
 * screenshots with large flat regions where PNG does badly: browse.png
 * is 1.2 MB, so opening the gallery used to cost ~3.5 MB.
 *
 * Quality 88 rather than the thumbnails' 82: these are viewed full-size,
 * and text in a UI screenshot is where WebP artifacts show first.
 */
async function genFullWebp() {
  const files = (await readdir(SHOTS_DIR)).filter((f) => f.endsWith('.png'));
  for (const f of files) {
    const out = path.join(SHOTS_DIR, f.replace(/\.png$/, '.webp'));
    await sharp(path.join(SHOTS_DIR, f)).webp({ quality: 88 }).toFile(out);
    console.log('full: ', path.relative(ROOT, out));
  }
}

/* ─── 2. OG card ─────────────────────────────────────────────────── */

/*
 * Drawn as a page and screenshotted rather than drawn as an SVG for
 * sharp: sharp's bundled FreeType can't read woff2, so librsvg set the
 * site's faces in tofu. Chromium reads the same files the site serves.
 *
 * No reach numbers on the card. It's a committed file, so any figure on
 * it would go stale, which is the thing "never invent a number" rules out.
 */

const W = 1200;
const H = 630;
const SHOT_W = 917;
const SHOT_H = Math.round((SHOT_W * 700) / 1528);
const asset = (p) => `file://${path.join(PUBLIC, p)}`;

function stars(n, seed = 7) {
  /* Deterministic LCG so the card is reproducible across runs. */
  let s = seed;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = Math.round(rnd() * W);
    const y = Math.round(rnd() * H);
    const d = (0.8 + rnd() * 1.6).toFixed(1);
    const o = (0.12 + rnd() * 0.5).toFixed(2);
    out += `<i style="left:${x}px;top:${y}px;width:${d}px;height:${d}px;opacity:${o}"></i>`;
  }
  return out;
}

const ogHtml = `<!doctype html>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'Cormorant Garamond';
    font-weight: 400 600;
    font-display: block;
    src: url('${asset('fonts/cormorant-garamond-400-600-normal-latin.woff2')}');
  }
  @font-face {
    font-family: 'Inter';
    font-weight: 400 700;
    font-display: block;
    src: url('${asset('fonts/inter-400-700-normal-latin.woff2')}');
  }
  html,
  body {
    margin: 0;
    width: ${W}px;
    height: ${H}px;
    overflow: hidden;
  }
  body {
    position: relative;
    background: #0e0e11;
    color: #f4f4f5;
    font-family: 'Inter';
    -webkit-font-smoothing: antialiased;
  }
  .band {
    position: absolute;
    left: -300px;
    top: 430px;
    width: 1500px;
    height: 240px;
    transform: rotate(-12deg);
    background: radial-gradient(closest-side, rgba(194, 155, 76, 0.09), rgba(167, 139, 250, 0.04) 55%, transparent);
    filter: blur(12px);
  }
  i {
    position: absolute;
    border-radius: 50%;
    background: #fff6e6;
  }
  .copy {
    position: absolute;
    left: 76px;
    top: 0;
    bottom: 0;
    width: 470px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 {
    margin: 0 0 22px;
    font: 600 136px/0.9 'Cormorant Garamond';
    letter-spacing: -0.015em;
  }
  p {
    margin: 0 0 38px;
    font-size: 30px;
    line-height: 1.4;
    color: #c9c9cf;
    text-wrap: balance;
  }
  .btn {
    align-self: flex-start;
    display: flex;
    align-items: center;
    height: 62px;
    padding: 0 32px;
    border-radius: 999px;
    background: #7c3aed;
    font-size: 23px;
    font-weight: 600;
  }
  .meta {
    margin-top: 24px;
    font-size: 20px;
    color: #74747d;
  }
  .glow {
    position: absolute;
    left: 640px;
    top: 20px;
    width: 640px;
    height: 320px;
    background: radial-gradient(closest-side, rgba(124, 58, 237, 0.3), transparent);
    filter: blur(48px);
  }
  .shot {
    position: absolute;
    left: 610px;
    top: ${Math.round((H - SHOT_H) / 2)}px;
    width: ${SHOT_W}px;
    height: ${SHOT_H}px;
    border: 1px solid #313139;
    border-radius: 14px;
    overflow: hidden;
    background: #0b0b0d;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
  }
  .shot img {
    display: block;
    width: 100%;
  }
</style>
<div class="band"></div>
${stars(110)}
<div class="copy">
  <h1>Grimoire</h1>
  <p>A free, open-source mod manager for Deadlock.</p>
  <div class="btn">Free download</div>
  <div class="meta">Windows · Linux · MIT licensed</div>
</div>
<div class="glow"></div>
<div class="shot"><img src="${asset('shots/hero.webp')}" alt="" /></div>
`;

async function genOg() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'grimoire-og-'));
  const html = path.join(dir, 'og.html');
  const shot = path.join(dir, 'og.png');
  await writeFile(html, ogHtml);
  await promisify(execFile)(process.env.CHROME ?? 'chromium', [
    '--headless',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    `--window-size=${W},${H}`,
    /* Gives the woff2 faces and the screenshot time to land before capture. */
    '--virtual-time-budget=5000',
    `--screenshot=${shot}`,
    `file://${html}`,
  ]);
  await sharp(shot).png({ compressionLevel: 9 }).toFile(OG_OUT);
  await rm(dir, { recursive: true });
  console.log('og:', path.relative(ROOT, OG_OUT));
}

await genThumbs();
await genFullWebp();
await genOg();
