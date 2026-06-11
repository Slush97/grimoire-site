# grimoire-site

Marketing site for [Grimoire](https://github.com/Slush97/grimoire). Lives at `grimoiremods.com` and `www.grimoiremods.com`. Astro on a Cloudflare Worker.

The site is an "era museum": six complete visual themes (era stages) render the same product facts, and a fixed TIME MACHINE remote (bottom right) zaps between them with a CRT static burst. Default channel is GEOCITIES, a 1996 homepage reskinned as a candlelit chaos-magick lodge. The chosen era persists in localStorage and follows the visitor onto the sub-pages, which reskin their shared chrome per era.

## Stack

- Astro 6 (Node engine >= 22.12.0), fully prerendered (static output)
- Tailwind 4 via `@tailwindcss/vite`
- `@astrojs/cloudflare` adapter, deployed as a **Cloudflare Worker with Assets** (not classic Pages)
- `wrangler 4`
- pnpm
- `sharp` (devDependency only, for `pnpm gen:assets`; never runs in the CF build)

## Project structure

```
src/
  pages/
    index.astro          mounts all six era stages; EraSwitcher swaps them
    download.astro       /download (live GitHub release data, Windows-first)
    tools.astro          /tools (repo, mp1 spec, vpkmerge showcase)
    404.astro            themed dead-link page
  components/
    EraSwitcher.astro    TIME MACHINE remote + static burst + html[data-era]
    Neko.astro           cursor-chasing cat (skins in public/neko/)
    stages/              six era stages: Terminal, Win95, Geocities, Aero,
                         Fugazi, Grimoire. Each is self-contained
                         (markup + scoped styles + scripts) and renders
                         the shared facts from data/content.ts
    transitions/         legacy scroll transitions, currently unmounted
  data/
    content.ts           single source of truth: brand, features, release
                         fetch (memoized per build) + pinned fallback
    eras.ts              era registry, localStorage key, channel order
    kitties.ts           neko skin roster
  layouts/
    Museum.astro         shell for /, pre-paint era restore script
    Geo.astro            shell for sub-pages; geo.css chrome, same restore
  styles/
    museum.css           reset + stage visibility rules (html[data-era])
    geo.css              sub-page chrome; CSS variables + per-era reskins
scripts/
  gen-assets.mjs         regenerates public/og.png + screenshot thumbs
public/
  og.png                 1200x630 social card (committed, generated)
  screenshots/           full-size app captures + thumbs/*.webp (880w)
  neko/                  oneko sprite sheets
wrangler.jsonc           binds grimoiremods.com + www.grimoiremods.com
```

## Era switching contract

- `<html data-era="...">` drives everything. Values live in `src/data/eras.ts` and must stay in sync with the inline pre-paint scripts in BOTH layouts (they hardcode the id list to run before paint).
- On `/`, museum.css shows only the matching `.stage-<era>`; on sub-pages, geo.css swaps CSS variables per era.
- `EraSwitcher` dispatches `era:change` on `document`; the Geocities radio uses it to pause when you leave 1996 and resume when you zap back.
- Adding an era = new stage component + eras.ts entry + visibility rule in museum.css + override block in geo.css + both pre-paint lists.

## Dev commands

```bash
pnpm install
pnpm dev              # astro dev
pnpm build            # astro build
pnpm preview          # astro preview
pnpm gen:assets       # regenerate og.png + screenshot thumbs (sharp)
pnpm wrangler deploy  # deploy to Cloudflare
```

## Deploy notes

- Deploys as **Workers with Assets**, same pattern as `grimoire-admin/`. Use `wrangler deploy`, NOT `wrangler pages deploy`.
- Custom domain bindings live in `wrangler.jsonc`. Domains attached 2026-05-15.

## Env

| Var | Where | Purpose |
|---|---|---|
| `GITHUB_TOKEN_SITE` | local `.env` or Worker secret | **Optional.** Authenticates the build-time fetch of the latest release for `/download`. Skips the anonymous 60/hr GitHub rate limit. Fine-grained PAT, Contents: Read-only on `Slush97/grimoire`. |

## Conventions

- **No em-dashes** anywhere. Workspace-wide rule.
- **Stages are costumes, not components.** No shared visual tokens between era stages; each owns its world. Shared facts come only from `data/content.ts`.
- **Windows-first download ordering.** Most users are on Windows; surface that asset first.
- **No telemetry, no analytics scripts.** Counters/polls/preferences are localStorage only.
- **`/download` is build-time data.** On each Grimoire release: bump `PINNED_RELEASE` in `data/content.ts` and redeploy this site.
- **Screenshots changed?** Re-run `pnpm gen:assets` and commit the outputs (thumbs + og.png).
- **Accessibility escape hatches are load-bearing.** STOP DA FLASHING (calm mode), STOP DA MUSIC, prefers-reduced-motion handling, and the static-burst skip under calm/reduced-motion must survive any redesign.

## Related

- `../grimoire/` is the product this advertises. Don't claim features that don't exist.
- `../grimoire-admin/` is the dashboard (gated by Cloudflare Access; not linked from the public site).
