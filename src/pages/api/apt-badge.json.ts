import type { APIRoute } from 'astro';
import { badge, humanize } from '../../lib/badge';
import { fetchAptInstalls } from '../../lib/reach';

// On-demand endpoint (not part of the static prerender).
export const prerender = false;

/*
 * Shields.io endpoint badge: apt repo install count.
 *
 * apt.grimoiremods.com is served by the grimoire-apt Worker, which tallies
 * install events (a new machine's one-time fetch of the repo signing key) and
 * .deb downloads (install + upgrade events) in a Durable Object, exposed at
 * /__count as { count, installs }. The badge shows installs. We proxy + format
 * it here so all three reach badges share one host (grimoiremods.com) and one
 * number formatter (lib/badge.humanize); the fetch itself lives in lib/reach.ts
 * alongside the other channels.
 */

const ACCENT = 'f97316'; // brand orange, matches the GitHub downloads badge

export const GET: APIRoute = async () => {
  const installs = await fetchAptInstalls();
  if (installs === null) return badge('apt installs', 'unavailable', 'lightgrey');
  return badge('apt installs', humanize(installs), ACCENT);
};
