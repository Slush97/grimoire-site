/*
 * gen-assets.mjs
 * Build-adjacent asset generator. Run manually (pnpm gen:assets) whenever
 * screenshots change or the OG card design is touched; outputs are
 * committed so the Cloudflare build never depends on sharp.
 *
 *   1. public/screenshots/thumbs/<name>.webp : 880w gallery thumbnails
 *      used by every era stage; full PNGs stay as the lightbox targets.
 *   2. public/og.png : 1200x630 social card (Discord/Twitter embeds).
 *      Candlelit-Geocities look: starfield, gold arched-ish wordmark,
 *      LED visitor counter, real app screenshot in a beveled frame.
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
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

/* ─── 2. OG card ─────────────────────────────────────────────────── */

const W = 1200;
const H = 630;

function starfield(n, seed = 7) {
  /* Deterministic LCG so the card is reproducible across runs. */
  let s = seed;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = (rnd() * W).toFixed(1);
    const y = (rnd() * H).toFixed(1);
    const r = (0.6 + rnd() * 1.6).toFixed(2);
    const o = (0.25 + rnd() * 0.75).toFixed(2);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff8d4" opacity="${o}"/>`;
  }
  return out;
}

function led(digits) {
  const cells = [...digits]
    .map(
      (d, i) =>
        `<g transform="translate(${i * 34},0)">
           <rect width="30" height="44" rx="3" fill="#0a0618" stroke="#3a2a5a"/>
           <text x="15" y="33" text-anchor="middle" font-family="Liberation Mono" font-size="30" font-weight="700" fill="#ff3a4a">${d}</text>
         </g>`,
    )
    .join('');
  return cells;
}

const ogSvg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b0624"/>
      <stop offset="70%" stop-color="#140a30"/>
      <stop offset="100%" stop-color="#241040"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff3b0"/>
      <stop offset="45%" stop-color="#ffd96a"/>
      <stop offset="55%" stop-color="#c8871a"/>
      <stop offset="100%" stop-color="#ffdf80"/>
    </linearGradient>
    <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff2eb5"/><stop offset="25%" stop-color="#ff9933"/>
      <stop offset="50%" stop-color="#ffd96a"/><stop offset="75%" stop-color="#50e878"/>
      <stop offset="100%" stop-color="#5acafe"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${starfield(140)}

  <!-- marquee strips -->
  <rect x="0" y="0" width="${W}" height="38" fill="#07041a" stroke="#3a2a5a"/>
  <text x="600" y="26" text-anchor="middle" font-family="Liberation Sans" font-weight="700" font-size="19" fill="#ffd96a" letter-spacing="2">✦ WELCOME TO GRIMOIRE'S HOMEPAGE!!1! ✦ BEST VIEWED BY MOONLIGHT ✦ NO TELEMETRY EVER!!! ✦</text>
  <rect x="0" y="${H - 38}" width="${W}" height="38" fill="#07041a" stroke="#3a2a5a"/>
  <text x="600" y="${H - 13}" text-anchor="middle" font-family="Liberation Sans" font-weight="700" font-size="19" fill="#b660e0" letter-spacing="2">★ FREE!! ★ MIT LICENSED!!1! ★ WINDOWS · LINUX · ARCH (BTW) ★ SIGN THE BOOK OF NAMES!!! ★</text>

  <!-- wordmark -->
  <g transform="translate(64,130)">
    <text x="3" y="83" font-family="Liberation Sans" font-weight="700" font-size="92" letter-spacing="4" fill="#000" opacity="0.8">GRIMOIRE</text>
    <text x="0" y="80" font-family="Liberation Sans" font-weight="700" font-size="92" letter-spacing="4" fill="url(#gold)" stroke="#5a3a10" stroke-width="2">GRIMOIRE</text>
    <text x="2" y="122" font-family="Liberation Sans" font-weight="700" font-size="27" fill="#fff8d4">✦ MOD MANAGER 4 <tspan fill="#ffd96a">DEADLOCK</tspan>!!! ✦</text>
    <rect x="2" y="148" width="430" height="6" fill="url(#rainbow)"/>
  </g>

  <!-- pitch lines -->
  <g font-family="Liberation Sans" font-weight="700" font-size="24" fill="#fff5db" transform="translate(66,332)">
    <text y="0">★ ONE-CLICK GAMEBANANA INSTALLS</text>
    <text y="44">★ HERO LOCKER + SHAREABLE PROFILES</text>
    <text y="88">★ NO TELEMETRY · NO LOGIN · NO ADWARE</text>
  </g>

  <!-- LED visitor counter -->
  <g transform="translate(66,470)">
    <rect x="-14" y="-32" width="350" height="104" rx="6" fill="#0f0a26" stroke="#3a2a5a" stroke-width="2"/>
    <text x="161" y="-6" text-anchor="middle" font-family="Liberation Sans" font-weight="700" font-size="17" fill="#ffd96a" letter-spacing="3">★ SOULS BEHELD ★</text>
    <g transform="translate(60,6)">${led('001337')}</g>
  </g>

  <!-- screenshot frame (image composited by sharp at 690,120; frame drawn here) -->
  <g transform="translate(676,108)">
    <rect x="0" y="0" width="468" height="370" fill="#1a1030" stroke="#ffd96a" stroke-width="3"/>
    <rect x="0" y="0" width="468" height="34" fill="#241644" stroke="#ffd96a" stroke-width="3"/>
    <text x="14" y="24" font-family="Liberation Sans" font-weight="700" font-size="17" fill="#fff8d4">Netscape: MY MOD MANAGER!!.exe</text>
    <text x="440" y="25" text-anchor="middle" font-family="Liberation Sans" font-weight="700" font-size="18" fill="#ffd96a">✕</text>
  </g>
  <g transform="translate(640,500)">
    <rect x="0" y="0" width="200" height="56" rx="8" fill="#c8243d" stroke="#fff8d4" stroke-width="3" transform="rotate(-3 100 28)"/>
    <text x="100" y="36" text-anchor="middle" font-family="Liberation Sans" font-weight="700" font-size="24" fill="#fff8d4" transform="rotate(-3 100 28)">100% FREE!!</text>
  </g>
  <g transform="translate(880,494)">
    <text x="0" y="24" font-family="Liberation Sans" font-weight="700" font-size="26" fill="#5acafe">grimoiremods.com</text>
  </g>
</svg>`;

async function genOg() {
  /* Screenshot pane: 462x330 region inside the drawn frame. */
  const shot = await sharp(path.join(SHOTS_DIR, 'browse.png'))
    .resize(462, 333, { fit: 'cover', position: 'top' })
    .toBuffer();
  await sharp(Buffer.from(ogSvg))
    .composite([{ input: shot, left: 679, top: 145 }])
    .png({ compressionLevel: 9 })
    .toFile(OG_OUT);
  console.log('og:', path.relative(ROOT, OG_OUT));
}

await genThumbs();
await genOg();
