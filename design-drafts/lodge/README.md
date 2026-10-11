# The Lodge

Direction C. A plain document site in the shape of the old occult text archives
(chaosmatrix.org is the reference: nav box top left, centred revision block,
horizontal rules, links that look like links), built to a modern standard and
with the 1920s-40s New York material kept to the margins.

Deliberately the opposite move to `../broadsheet/`. Broadsheet wears the era:
painted sign bands, script and slab display faces, "Slush & Co. Bros." The
Lodge wears one wordmark, one seal, one ornament and a pair of period link
colours, and spends the rest of the page on facts.

`index.html` is a single self-contained file. Open it in a browser, no server.

## What is period, and what is not

| Era accent | Where |
|---|---|
| Limelight wordmark | masthead only, one word |
| Lodge seal (keyhole in a ticked ring) | masthead, favicon |
| Stepped-diamond ornament | one section divider |
| Roman numerals | the four core features |
| Brick and plum link colours | body links, visited links |
| Warm paper, faint tooth | page background |

Everything else is a plain document: system serif, 40rem measure, hairline
rules, a real `<table>` for downloads, numbered notes with return links, an
odometer for the counter.

## Modern, quietly

- Day and night editions off one token set. Night follows the OS by default;
  `<html data-theme="light|dark">` forces one.
- Sticky rail on wide screens, two boxes side by side on narrow.
- Real focus rings, skip link, `:target` highlight on the notes, print rules.
- No third-party requests. Type is the system serif and system mono, apart
  from Limelight, which is embedded as base64 (OFL, already vendored in
  `../broadsheet/fonts/embedded.css`).

## Facts on the page, and where they came from

| Fact | Source |
|---|---|
| Revision 1.28.0, 19 August 2026 | GitHub releases API, checked 26 August 2026 |
| Asset names and sizes | same release payload |
| 42,462 installers | sum of installer assets across the release feed, using the `isInstaller` rules from `src/lib/reach.ts` (no `latest*.yml`, no `.blockmap`) |
| First release 9 January 2026 | `v1.0.0` tag in `../../../grimoire` |
| Twenty-seven guides | `src/content/docs/` |
| Vanilla launch stashes mods | `electron/main/services/launch.ts`, `stashEnabledMods` |

Numbers are hand-copied into the HTML because this is a draft. In the Astro
port they come from `data/content.ts` and `lib/reach.ts` like every other
stage, and the counter footnote (why the raw GitHub total is five times
larger) travels with the number.

## Known gaps

- `Fig. 1` is the site's existing `installed.png` screenshot, which is a
  v1.9.2 build. Recapture before this ships.
- One page only. The sub-pages (`/download`, `/docs`, `/tools`) and the docs
  index in this skin are not drafted yet.
- Guide links point at the live `grimoiremods.com/docs/<slug>` routes.

## Published preview

- https://claude.ai/code/artifact/2373117a-15a8-4c54-9559-fd0a8900b050
