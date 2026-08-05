# Broadsheet theme drafts

Self-contained HTML mockups for the new flagship landing direction: 1920s-40s
New York occult, built from Deadlock's in-game billboard and store-sign art
(references: deadlock.wiki/Brands, the sandbox poster guide on Steam, and the
Deadlock Graphical Library on the official forums). Chosen direction is the
Broadsheet; two rejected pitches are kept alongside for the record.

Everything here is a draft. The end state is porting `landing.html` and
`docs.html` into proper Astro stages (see grimoire-site/CLAUDE.md for the era
stage architecture); nothing in this directory ships as-is.

## Files

| File | What |
|---|---|
| `landing.html` | The chosen direction: stacked painted sign bands, framed v1.26.0 app screenshots (sepia at rest, color on hover), directory of secondary features, download bazaar |
| `docs.html` | "The Reader's Companion": all 27 player guides pre-rendered and hash-routed, contents grouped exactly like `src/pages/docs/index.astro` |
| `oracle.html` | Rejected pitch A: gold-on-black Art Deco prestige (New York Oracle billboard) |
| `anathema.html` | Rejected pitch B: current dark brand with a neon-sign hero |
| `gen-docs.py` | Regenerates `docs.html` from `src/content/docs/*.md` (needs python-markdown) |
| `capture-screenshots.mjs` | Headless app screenshots via Xvfb + CDP (needs playwright-core) |
| `fonts/embedded.css` | Latin subsets of Ultra, Yellowtail, Oswald, Jost, Poiret One, Limelight, Bebas Neue as base64 @font-face (Google Fonts, OFL) |
| `icon-github.svg` / `icon-discord.svg` | Brand marks (Simple Icons), inlined by the generator |

## Viewing

Open `landing.html` in a browser. It links to `docs.html` relatively. Every
page is a single file with fonts and screenshots embedded, so no server needed.

## Regenerating the docs page

```bash
python3 gen-docs.py   # rewrites docs.html from src/content/docs
```

## Recapturing app screenshots

Expects the app checkout at `../../../grimoire` (sibling of grimoire-site).

```bash
cd ../../../grimoire
GRIMOIRE_SOCIAL_BASE_URL=https://grimoire-social.slusheliott.workers.dev pnpm build
cd - && npm i playwright-core
xvfb-run -a -s "-screen 0 1920x1080x24" node capture-screenshots.mjs
```

Notes from the first capture run:

- The script drives the real app with your real `~/.config/grimoire` data, so
  curate what is enabled first. The Installed shot in `landing.html` is cropped
  to its top two rows because an 18+-titled mod sat in row three.
- "Stop Game" appears in the sidebar if Deadlock is running while you capture.
- Shots land in `shots-fresh/`; embedding into `landing.html` is currently
  manual (magick resize to 1200px webp q72, then swap the data URIs). This
  becomes a build step during the Astro port.

## Design tokens (Broadsheet)

Paper `#ece1c8`, warm paper `#e4d5b4`, ink `#2b241c`, brick `#9e3d2b`, plum
`#4a4160`, sage `#7d8471`, mustard `#c9932b`. Display: Ultra. Script:
Yellowtail. Condensed caps: Oswald. Body: Jost. No em-dashes in copy, no
telemetry/trust-pledge marketing blocks (owner's call, 2026-08-04).

## Published previews

- Landing: https://claude.ai/code/artifact/f0366c13-3dd5-4197-9350-51210ba694c5
- Docs: https://claude.ai/code/artifact/76809bdf-789e-4ab5-9965-682b0dd55440
