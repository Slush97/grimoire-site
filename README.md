# grimoire-site

Marketing site for [Grimoire](https://github.com/Slush97/grimoire).
Astro + Tailwind v4, Cloudflare Worker.

## Dev

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Deploy

```sh
pnpm build
pnpm wrangler deploy
```

## Env

| Var | Where | Why |
|---|---|---|
| `GITHUB_TOKEN_SITE` | local `.env` or Worker secret | Optional. Authenticates the build-time fetch of the latest release (`/download` page). Skips the 60/hr unauthenticated rate limit. Fine-grained PAT, Contents: Read-only on `Slush97/grimoire`. |
