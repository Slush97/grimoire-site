/*
 * proto-font.mjs
 * Prototype-only font vendorer. Same idea as gen-fonts.mjs, but for the
 * /proto/* design directions: pass css2 family specs, it writes the woff2
 * files into public/fonts/proto/ and prints @font-face rules to paste
 * into the prototype page. Nothing is fetched from a visitor's browser.
 *
 *   node scripts/proto-font.mjs "Limelight" "Bodoni+Moda:ital,wght@0,400..900;1,400..900"
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const FONT_DIR = path.join(ROOT, 'public/fonts/proto');
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']);

function parseFaces(css) {
  const faces = [];
  let subset = null;
  for (const line of css.split('\n')) {
    const comment = line.match(/^\/\*\s*([a-z-]+)\s*\*\/$/);
    if (comment) subset = comment[1];
    if (line.trim().startsWith('@font-face')) faces.push({ subset, text: '' });
    if (faces.length) faces[faces.length - 1].text += line + '\n';
  }
  return faces
    .map((f) => {
      const grab = (re) => f.text.match(re)?.[1] ?? null;
      return {
        subset: f.subset,
        family: grab(/font-family:\s*'([^']+)'/),
        style: grab(/font-style:\s*([^;]+);/)?.trim() ?? 'normal',
        weight: grab(/font-weight:\s*([^;]+);/)?.trim() ?? '400',
        range: grab(/unicode-range:\s*([^;]+);/)?.trim() ?? null,
        url: grab(/src:\s*url\(([^)]+)\)/),
      };
    })
    .filter((f) => f.url && KEEP_SUBSETS.has(f.subset));
}

const queries = process.argv.slice(2);
if (!queries.length) {
  console.error('usage: node scripts/proto-font.mjs "<css2 family spec>" ...');
  process.exit(1);
}

await mkdir(FONT_DIR, { recursive: true });
const rules = [];
for (const q of queries) {
  const res = await fetch(`https://fonts.googleapis.com/css2?family=${q}&display=swap`, {
    headers: { 'User-Agent': UA },
  });
  if (!res.ok) throw new Error(`${q}: css2 responded ${res.status}`);
  const faces = parseFaces(await res.text());
  if (!faces.length) throw new Error(`${q}: no latin faces`);
  for (const face of faces) {
    const slug = face.family.toLowerCase().replace(/\s+/g, '-');
    const file = `${slug}-${face.weight.replace(/\s+/g, '-')}-${face.style}-${face.subset}.woff2`;
    const bin = await fetch(face.url, { headers: { 'User-Agent': UA } });
    if (!bin.ok) throw new Error(`${file}: ${bin.status}`);
    await writeFile(path.join(FONT_DIR, file), Buffer.from(await bin.arrayBuffer()));
    rules.push(
      [
        '@font-face {',
        `  font-family: '${face.family}';`,
        `  font-style: ${face.style};`,
        `  font-weight: ${face.weight};`,
        '  font-display: swap;',
        `  src: url('/fonts/proto/${file}') format('woff2');`,
        face.range ? `  unicode-range: ${face.range};` : null,
        '}',
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }
}
console.log(rules.join('\n'));
