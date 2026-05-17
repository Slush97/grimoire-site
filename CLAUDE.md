# grimoire-site

Marketing site for [Grimoire](https://github.com/Slush97/grimoire). Lives at `grimoiremods.com` and `www.grimoiremods.com`. Astro on a Cloudflare Worker.

## Stack

- Astro 6 (Node engine >= 22.12.0)
- Tailwind 4 via `@tailwindcss/vite`
- `@astrojs/cloudflare` adapter, deployed as a **Cloudflare Worker with Assets** (not classic Pages)
- `wrangler 4`
- pnpm

## Project structure

```
src/
  pages/
    index.astro          landing
    download.astro       /download (live GitHub release data, Windows-first ordering)
  components/            shared UI
  layouts/
public/
  doodles/, brand SVGs, parchment textures
wrangler.jsonc           binds grimoiremods.com + www.grimoiremods.com to the Worker
```

## Dev commands

```bash
pnpm install
pnpm dev              # astro dev
pnpm build            # astro build
pnpm preview          # astro preview
pnpm wrangler deploy  # deploy to Cloudflare
```

## Deploy notes

- Deploys as **Workers with Assets**, same pattern as `grimoire-admin/`. Use `wrangler deploy`, NOT `wrangler pages deploy`.
- Custom domain bindings live in `wrangler.jsonc`. `grimoiremods.com` and `www.grimoiremods.com` were attached 2026-05-15.

## Env

| Var | Where | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | local `.env` or Worker secret | **Optional.** Authenticates the build-time fetch of the latest release for `/download`. Skips the anonymous 60/hr GitHub rate limit. Use a fine-grained PAT, Contents: Read-only on `Slush97/grimoire`. |

## Conventions

- **No em-dashes** in copy. Workspace-wide rule.
- **Visual identity follows `grimoire/`.** Dark theme, orange accent. Tokens documented in `grimoire/docs/design-overhaul-brief.md`. Parchment grain + brand SVGs in `public/` are part of the same identity.
- **Windows-first download ordering.** Most users are on Windows; surface that asset first.
- **No telemetry, no analytics scripts.** The Grimoire client is offline-first by design; the marketing site stays consistent with that posture.
- **`/download` is build-time data.** If you ship a new Grimoire release and the site shows the old version, redeploy here.

## Related

- `../grimoire/` is the product this advertises. Don't claim features that don't exist.
- `../grimoire-admin/` is the dashboard (gated by Cloudflare Access; not linked from the public site).
