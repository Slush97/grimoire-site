# grimoire-site

Marketing site for [Grimoire](https://github.com/Slush97/grimoire), the Deadlock mod manager.
Deployed at <https://grimoiremods.com>.

Astro + Tailwind v4, hosted on Cloudflare Workers via `@astrojs/cloudflare`.

## Local development

```sh
pnpm install
pnpm dev      # localhost:4321
pnpm build    # output to ./dist
pnpm preview  # preview the built site
```

The `/download` page fetches the latest GitHub release at build time. If
`api.github.com` is unreachable from CI, the page degrades to a "Live release
data unavailable" notice rather than failing the build.

### `GITHUB_TOKEN` (optional, recommended in CI)

Unauthenticated, the GitHub REST API gives any single IP 60 requests/hour. If
Cloudflare's build pool burns that quota, builds during the next window render
the degraded page. Setting `GITHUB_TOKEN` in the build environment bumps the
quota to 5000/hr and removes the risk in practice.

In Cloudflare Pages: Settings → Environment variables → Production →
`GITHUB_TOKEN` = a fine-grained PAT with `public_repo` read access. Locally,
drop it in an untracked `.env` (Vite picks it up automatically).

## Layout

```
src/
  layouts/Base.astro    header, footer, meta, global script
  pages/
    index.astro         landing
    download.astro      release-driven downloads page
  styles/global.css     @theme tokens + a few effects
public/                 static assets (logo, screenshots, og.png)
wrangler.jsonc          Cloudflare Worker config
```

## Deploying

`astro build` produces a Cloudflare Worker bundle under `dist/`. Cloudflare's
build pipeline runs `pnpm build` and deploys the result; no manual `wrangler
deploy` step in the normal flow.
