/*
 * gen-fonts.mjs
 * Build-adjacent font vendorer. Run manually (pnpm gen:fonts) when the
 * font roster changes; outputs are committed so the Cloudflare build
 * never touches the network.
 *
 * Why self-host at all: the site used to pull one render-blocking
 * stylesheet from fonts.googleapis.com, which then pulled woff2 files
 * from fonts.gstatic.com. That is two extra DNS + TLS handshakes on the
 * critical path before a single glyph can paint, on a site whose whole
 * pitch is that it does not phone anywhere. Served from our own Worker
 * the faces ride the connection the HTML already opened, and no visitor
 * request reaches Google.
 *
 * Writes:
 *   public/fonts/*.woff2   the faces themselves
 *   public/fonts/OFL.txt   upstream license (all four families are SIL OFL)
 *   src/styles/fonts.css   @font-face rules, imported by both layouts
 *
 * All four families are variable where upstream offers it, so one file
 * covers a whole weight axis instead of one file per weight.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const FONT_DIR = path.join(ROOT, 'public/fonts');
const CSS_OUT = path.join(ROOT, 'src/styles/fonts.css');

/* Google serves woff2 only to browsers that advertise support. */
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/*
 * The roster. `query` is the css2 family spec; keep the axis ranges wide
 * enough to cover every weight the stages actually set, since a missing
 * weight means the browser synthesizes a fake bold (visibly worse).
 *
 * Who uses what:
 *   Inter              the site's body text, Fugazi, Win95 UI chrome, Lightbox
 *   JetBrains Mono     code on the site, Terminal, the TIME MACHINE remote
 *   Comic Neue         Geocities
 *   Cormorant Garamond the site's display headings, Fugazi pull-quotes
 */
const FAMILIES = [
  { name: 'Inter', slug: 'inter', query: 'Inter:wght@400..700' },
  { name: 'JetBrains Mono', slug: 'jetbrains-mono', query: 'JetBrains+Mono:wght@400..700' },
  { name: 'Comic Neue', slug: 'comic-neue', query: 'Comic+Neue:wght@400;700' },
  {
    name: 'Cormorant Garamond',
    slug: 'cormorant-garamond',
    query: 'Cormorant+Garamond:ital,wght@0,400..600;1,400',
  },
];

/*
 * Subsets to keep. Google splits each face by unicode-range; latin alone
 * covers English, and latin-ext picks up the accented characters that
 * turn up in mod author names. Everything else (cyrillic, greek,
 * vietnamese) is dropped: it is most of the bytes and none of the site.
 */
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']);

/* Parse the @font-face blocks out of a Google css2 response. */
function parseFaces(css) {
  const faces = [];
  let subset = null;
  for (const line of css.split('\n')) {
    const comment = line.match(/^\/\*\s*([a-z-]+)\s*\*\/$/);
    if (comment) subset = comment[1];
    const block = line.trim();
    if (block.startsWith('@font-face')) faces.push({ subset, text: '' });
    if (faces.length) faces[faces.length - 1].text += line + '\n';
  }
  return faces
    .map((f) => {
      const grab = (re) => f.text.match(re)?.[1] ?? null;
      return {
        subset: f.subset,
        style: grab(/font-style:\s*([^;]+);/)?.trim() ?? 'normal',
        weight: grab(/font-weight:\s*([^;]+);/)?.trim() ?? '400',
        range: grab(/unicode-range:\s*([^;]+);/)?.trim() ?? null,
        url: grab(/src:\s*url\(([^)]+)\)/),
      };
    })
    .filter((f) => f.url && KEEP_SUBSETS.has(f.subset));
}

async function main() {
  await mkdir(FONT_DIR, { recursive: true });
  const rules = [];

  for (const fam of FAMILIES) {
    const res = await fetch(
      `https://fonts.googleapis.com/css2?family=${fam.query}&display=swap`,
      { headers: { 'User-Agent': UA } },
    );
    if (!res.ok) throw new Error(`${fam.name}: css2 responded ${res.status}`);
    const faces = parseFaces(await res.text());
    if (!faces.length) throw new Error(`${fam.name}: no latin faces in response`);

    for (const face of faces) {
      /* inter-400..700-normal-latin.woff2 : self-describing, stable across runs. */
      const weight = face.weight.replace(/\s+/g, '-');
      const file = `${fam.slug}-${weight}-${face.style}-${face.subset}.woff2`;
      const bin = await fetch(face.url, { headers: { 'User-Agent': UA } });
      if (!bin.ok) throw new Error(`${file}: ${bin.status}`);
      const bytes = Buffer.from(await bin.arrayBuffer());
      await writeFile(path.join(FONT_DIR, file), bytes);
      console.log(`font: public/fonts/${file} (${(bytes.length / 1024).toFixed(1)} KB)`);

      rules.push(
        [
          '@font-face {',
          `  font-family: '${fam.name}';`,
          `  font-style: ${face.style};`,
          `  font-weight: ${face.weight};`,
          '  font-display: swap;',
          `  src: url('/fonts/${file}') format('woff2');`,
          face.range ? `  unicode-range: ${face.range};` : null,
          '}',
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }
  }

  const header = `/*
 * fonts.css : GENERATED by scripts/gen-fonts.mjs. Do not hand-edit.
 * Regenerate with \`pnpm gen:fonts\` after changing the roster there.
 *
 * Self-hosted so no visitor request reaches Google and the faces arrive
 * on the connection that already delivered the HTML. font-display: swap
 * everywhere: a costume rendering in a fallback face for 100ms is much
 * cheaper than a blank stage.
 *
 * Families: ${FAMILIES.map((f) => f.name).join(', ')} (all SIL OFL, see public/fonts/OFL.txt)
 */\n\n`;
  await writeFile(CSS_OUT, header + rules.join('\n\n') + '\n');
  console.log(`css:  src/styles/fonts.css (${rules.length} faces)`);

  const license = await fetch(
    'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt',
  );
  if (license.ok) {
    await writeFile(
      path.join(FONT_DIR, 'OFL.txt'),
      `The fonts in this directory (${FAMILIES.map((f) => f.name).join(', ')})\n` +
        `are licensed under the SIL Open Font License 1.1. Full text follows.\n` +
        `Each family has its own copyright holder; see fonts.google.com.\n\n` +
        (await license.text()),
    );
    console.log('license: public/fonts/OFL.txt');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
