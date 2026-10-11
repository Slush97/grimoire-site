# grimoire-site

Marketing site for [Grimoire](https://github.com/Slush97/grimoire). Lives at `grimoiremods.com` and `www.grimoiremods.com`. Astro on a Cloudflare Worker.

The homepage (`/`) and every sub-page are a plain open-source project site (dark, violet accent, Cormorant headings), built on one shared layout. The original "era museum" lives on at `/1996`: five complete visual themes (era stages) render the same product facts, and a fixed TIME MACHINE remote (bottom right) zaps between them with a CRT static burst. Default channel is GEOCITIES. The museum is self-contained; sub-pages no longer reskin per era. A pixel egg in the footer is the way in.

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
    index.astro          homepage: hero, stats strip, features, download
    1996.astro           the era museum; EraSwitcher swaps the five stages
    download.astro       /download (live GitHub release data, Windows-first)
    tools.astro          /tools (repo, mp1 spec, vpkmerge showcase)
    privacy.astro        /privacy, the WEBSITE's policy (the app's lives in
                         the synced guide at /docs/privacy)
    docs/index.astro     /docs (player guide index)
    docs/[slug].astro    /docs/<slug> (one guide page with a sidebar; slug is
                         a contract, the app's in-app Help links point here)
    404.astro            dead-link page
    api/*-badge.json.ts  shields endpoint badges (on-demand, not prerendered);
                         all three fetch through lib/reach.ts
  components/
    DownloadPanel.astro  per-OS download tabs, shared by / and /download
    BrandSprite.astro    simple-icons SVG symbols (#i-github, #i-windows...)
    EasterEgg.astro      footer egg; static burst, then /1996
    ambient/             PROTOTYPE background variants behind the homepage
                         hero, picked with ?bg=<id>. Once one wins, mount it
                         directly, delete Ambient.astro and the losers, and
                         drop the grimoire.amb.proto line from /privacy
    EraSwitcher.astro    TIME MACHINE remote + static burst + html[data-era]
                         + the master ♪ sound toggle (era radio engine)
    Lightbox.astro       shared screenshot overlay (prefers the .webp beside
                         each .png, falls back on error)
    Neko.astro           cursor-chasing cat (skins in public/neko/)
    SeoJsonLd.astro      SoftwareApplication + WebSite JSON-LD
    stages/              five era stages: Terminal, Win95, Geocities, Aero,
                         Fugazi. Each is self-contained
                         (markup + scoped styles + scripts) and renders
                         the shared facts from data/content.ts
  content/
    docs/                SYNCED player-guide markdown (pnpm sync:docs).
                         Source of truth is ../grimoire/docs/guide/;
                         never hand-edit these files
  data/
    content.ts           single source of truth: brand, features, release
                         fetch (memoized per build) + pinned fallback,
                         plus the build-time reach line
    docs.ts              guide section grouping (unknown slugs land in
                         "Everything else"), shared by the index + sidebar
    eras.ts              era registry, localStorage key, channel order
    kitties.ts           neko skin roster
  lib/
    badge.ts             shields.io endpoint payload + number humanizer
    reach.ts             the ONE definition of what counts as an install,
                         and the three public counters. Shared by the badge
                         endpoints (Worker) and content.ts (build).
  layouts/
    Site.astro           shell for every page but /1996: head meta, bar, footer
    Museum.astro         shell for /1996, pre-paint era restore + font preload
  styles/
    site.css             tokens, buttons, bar, footer, docs prose
    museum.css           reset + stage visibility rules (html[data-era])
    fonts.css            GENERATED @font-face rules (pnpm gen:fonts)
  scripts/
    era-radio.ts         the TV's audio: one global stream engine + the
                         per-era station registry + tuner-widget binding
scripts/
  gen-assets.mjs         regenerates og.png, screenshot thumbs + full webp
  gen-fonts.mjs          vendors the woff2 faces + writes styles/fonts.css
  sync-docs.mjs          copies ../grimoire/docs/guide/*.md into
                         src/content/docs/ (rewrites ./x.md links to /docs/x;
                         falls back to the docs/guide-refresh branch via git
                         while that branch is unmerged)
public/
  _headers               cache policy for unhashed assets (fonts, shots)
  og.png                 1200x630 social card (committed, generated)
  shots/                 homepage screenshot crops (1:1, -sm for phones)
  screenshots/           full-size .png + .webp, plus thumbs/*.webp (880w)
  fonts/                 self-hosted woff2 (committed, generated) + OFL.txt
  neko/                  oneko sprite sheets
wrangler.jsonc           binds grimoiremods.com + www.grimoiremods.com
```

## Era switching contract

- Applies to `/1996` only. `<html data-era="...">` drives everything there. Values live in `src/data/eras.ts` and must stay in sync with the inline pre-paint script in `Museum.astro` (it hardcodes the id list to run before paint).
- museum.css shows only the matching `.stage-<era>`.
- `EraSwitcher` dispatches `era:change` on `document`; the Geocities radio uses it to pause when you leave 1996 and resume when you zap back, and the era radio engine retunes on it.
- Adding an era = new stage component + eras.ts entry + visibility rule in museum.css + the pre-paint list in Museum.astro + a station list in `src/scripts/era-radio.ts`.

## Era radio

Every channel has sound, like a real TV. One global engine (`src/scripts/era-radio.ts`, initialized by EraSwitcher, so it runs on `/1996` only) owns a single Audio element: sound is on by default, starts on the visitor's first gesture (browsers block cold autoplay), fades in slowly to 0.35, and retunes when you zap channels. The remote carries the master ♪ toggle (persisted as `grimoire.sound`); each stage also mounts a themed tuner widget (`[data-era-radio]`) that is a pure view over the engine: play toggles the global sound, station buttons retune that era.

Exceptions and rules:

- Geocities keeps its own richer 1996 radio (visualizer, Plaza now-playing, STOP DA MUSIC). The engine goes `silent` on that channel when the widget is present.
- A saved STOP DA MUSIC mute (`geo-muted`) defaults the engine to off for first-time engine users. Respect both prefs in any redesign.
- All stations are free, listener-supported streams (SomaFM, Kohina, laut.fm, Nightride). Verify a stream is alive and HTTPS before adding it; never two streams at once.

## Dev commands

```bash
pnpm install
pnpm dev              # astro dev
pnpm build            # astro build
pnpm preview          # astro preview
pnpm gen:assets       # regenerate og.png + screenshot thumbs/webp (sharp)
pnpm gen:fonts        # re-vendor woff2 faces + styles/fonts.css (network)
pnpm sync:docs        # re-sync the player guide from ../grimoire (commit the result)
                      # GRIMOIRE_REPO=../grimoire-wt-x pnpm sync:docs reads another checkout
pnpm wrangler deploy  # deploy to Cloudflare
```

`pnpm-workspace.yaml` allows install scripts for esbuild, sharp and workerd.
pnpm 10 blocks them by default and the build fails without it.

## Deploy notes

- Deploys as **Workers with Assets**, same pattern as `grimoire-admin/`. Use `wrangler deploy`, NOT `wrangler pages deploy`.
- Custom domain bindings live in `wrangler.jsonc`. Domains attached 2026-05-15.

## Env

| Var | Where | Purpose |
|---|---|---|
| `GITHUB_TOKEN_SITE` | local `.env` or Worker secret | **Optional.** Authenticates the build-time fetch of the latest release for `/download`, the reach numbers, and the downloads badge. Skips the anonymous 60/hr GitHub rate limit. Fine-grained PAT, Contents: Read-only on `Slush97/grimoire`. |

**An expired PAT is worse than no PAT.** GitHub answers 401 to a request that
would have succeeded anonymously, and the pinned-release fallback then hides
it, so the site can quietly serve a months-old version. Both call sites now
retry anonymously on 401/403 and print `[content]` / `[reach]` warnings, so
**watch the build log**: if you see "GITHUB_TOKEN_SITE rejected", rotate the
token or unset it.

## Conventions

- **No em-dashes** anywhere. Workspace-wide rule.
- **Stages are costumes, not components.** No shared visual tokens between era stages; each owns its world. Shared facts come only from `data/content.ts`.
- **Windows-first download ordering.** Most users are on Windows; surface that asset first.
- **No telemetry, no analytics scripts.** Counters/polls/preferences are localStorage only.
- **No third-party requests from a visitor's browser.** Fonts are self-hosted (`pnpm gen:fonts`); there is no Google Fonts link, no CDN, no embed. A page load talks to grimoiremods.com and nothing else. This is the same trust pillar as "no telemetry" and it is easy to break by pasting in one `<link>`.
- **Never invent a number.** Stage copy may only quote counters from `lib/reach.ts` (public GitHub / apt / GameBanana figures), attributed to their source. A channel that fails to fetch is dropped from the copy, never replaced with a stale or estimated figure. The Fugazi stage is a SaaS parody and still obeys this: the corporate framing is the joke, the figures are real.
- **Weekly users and daily launches are derived, so they live in one place.** `activity()` in `lib/reach.ts` computes both from GitHub's public per-release counts. Weekly users is the installer downloads of one release that stayed newest for 4 to 10 days. Daily launches is latest*.yml fetches per day, divided by the app's 2 checks per launch. If the app's update-check schedule changes (`grimoire/electron/main/index.ts`, `Sidebar.tsx`), fix `FEED_FETCHES_PER_LAUNCH` and the `/privacy#numbers` explanation together. The GitHub installer total includes in-app updates; say "downloads", never "users", for it.
- **`/privacy` must stay true of the code.** Adding a storage key, a third-party request, or a Worker route means updating that page in the same change. It also describes Cloudflare's Bot Fight Mode, which injects `/cdn-cgi/challenge-platform/` into every page and sets `cf_clearance`; if that setting is turned off in the dashboard, remove the section.
- **Plain wording about privacy.** Say what is and isn't sent, in plain words. No "no telemetry" slogans, no "phones home".
- **`/download` is build-time data.** On each Grimoire release: bump `PINNED_RELEASE` in `data/content.ts` and redeploy this site.
- **`/docs` is synced content, committed.** `src/content/docs/` is written only by `pnpm sync:docs`; the CF build never reaches into the sibling repo. When a guide page changes in `Slush97/grimoire`, re-run the sync, commit, redeploy. Slugs are a contract with in-app Help links: never rename a route here.
- **Screenshots changed?** Re-run `pnpm gen:assets` and commit the outputs (thumbs, full-size webp, og.png).
- **Accessibility escape hatches are load-bearing.** STOP DA FLASHING (calm mode), STOP DA MUSIC, prefers-reduced-motion handling, and the static-burst skip under calm/reduced-motion must survive any redesign.

## Related

- `../grimoire/` is the product this advertises. Don't claim features that don't exist.
- `../grimoire-admin/` is the dashboard (gated by Cloudflare Access; not linked from the public site).
