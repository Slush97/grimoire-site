import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { badge, humanize } from '../../lib/badge';
import { fetchGithubReach } from '../../lib/reach';

// On-demand endpoint (not part of the static prerender).
export const prerender = false;

/*
 * Shields.io endpoint badge: honest cumulative GitHub installer downloads.
 *
 * The plain shields `.../downloads/Slush97/grimoire/total` badge is a lie. It
 * sums EVERY release asset, and ~85% of that total is electron-updater plumbing
 * (latest*.yml polled on a schedule by running clients, .blockmap fetched during
 * in-app differential updates). That inflates the headline to ~96k when real
 * installer downloads are ~13k.
 *
 * What counts as an installer lives in lib/reach.ts, shared with the build-time
 * reach numbers the Fugazi stage prints, so the site can never quote two
 * different definitions of "install".
 *
 * Scope is GitHub Releases only: AUR and the apt repo are separate channels.
 * Hence the "github downloads" label, not a bare "downloads".
 */

const ACCENT = 'f97316'; // brand orange, matches the other README badges

export const GET: APIRoute = async () => {
  // Optional Worker secret lifts the anonymous 60/hr GitHub limit (shared
  // across all CF egress IPs) to 5000/hr. Runtime env only: import.meta.env
  // would inline the build's token, and CI builds with a job token that dies
  // when the job ends.
  const token = env.GITHUB_TOKEN_SITE;

  const github = await fetchGithubReach(token);
  if (github === null) return badge('github downloads', 'unavailable', 'lightgrey');
  return badge('github downloads', humanize(github.installs), ACCENT);
};
