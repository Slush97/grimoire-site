#!/usr/bin/env node
/*
 * sync-docs.mjs
 * Pulls the player guide out of the app repo (../grimoire/docs/guide/) into
 * src/content/docs/ so the site can publish it at /docs/<slug>.
 *
 * The guide's source of truth stays in Slush97/grimoire ("when a PR changes
 * behavior a guide page describes, update the page in the same PR"). This
 * script is the only way content enters src/content/docs/; never hand-edit
 * the synced files. Fix the page in the app repo and re-run `pnpm sync:docs`.
 *
 * While the guide lives on the unmerged docs/guide-refresh branch, the script
 * falls back to reading that branch via git when the directory is absent
 * from the current checkout.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// GRIMOIRE_REPO points at another checkout, e.g. a worktree with unmerged guide edits.
const APP_REPO = path.resolve(SITE_ROOT, process.env.GRIMOIRE_REPO || '../grimoire');
const GUIDE_DIR = path.join(APP_REPO, 'docs', 'guide');
const GUIDE_BRANCH = 'docs/guide-refresh';
const OUT_DIR = path.join(SITE_ROOT, 'src', 'content', 'docs');

// Contributor docs, not player pages.
const EXCLUDE = new Set(['README.md', 'STYLE.md']);

function fromCheckout() {
  if (!fs.existsSync(GUIDE_DIR)) return null;
  const names = fs.readdirSync(GUIDE_DIR).filter((n) => n.endsWith('.md'));
  return {
    source: 'checkout',
    pages: names.map((n) => [n, fs.readFileSync(path.join(GUIDE_DIR, n), 'utf8')]),
  };
}

function fromBranch() {
  const git = (args) => execFileSync('git', ['-C', APP_REPO, ...args], { encoding: 'utf8' });
  const names = git(['ls-tree', '--name-only', GUIDE_BRANCH, '--', 'docs/guide/'])
    .split('\n')
    .filter((p) => p.endsWith('.md'))
    .map((p) => path.basename(p));
  return {
    source: `${GUIDE_BRANCH} branch`,
    pages: names.map((n) => [n, git(['show', `${GUIDE_BRANCH}:docs/guide/${n}`])]),
  };
}

// Cross-links are authored repo-relative (./page.md, ./page.md#anchor);
// published pages need site-absolute /docs/ URLs.
function rewriteLinks(md) {
  return md.replace(
    /\]\(\.\/([\w-]+)\.md(#[\w-]+)?\)/g,
    (_, slug, anchor) => `](/docs/${slug}${anchor ?? ''})`,
  );
}

const found = fromCheckout() ?? fromBranch();
const pages = found.pages.filter(([name]) => !EXCLUDE.has(name));
if (pages.length === 0) {
  console.error('[sync-docs] found no guide pages; refusing to empty src/content/docs/');
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const stale of fs.readdirSync(OUT_DIR)) {
  if (stale.endsWith('.md')) fs.rmSync(path.join(OUT_DIR, stale));
}
for (const [name, body] of pages) {
  fs.writeFileSync(path.join(OUT_DIR, name), rewriteLinks(body));
}
console.log(`[sync-docs] synced ${pages.length} pages from ${found.source} to src/content/docs/`);
