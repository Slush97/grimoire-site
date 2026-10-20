import type { APIRoute } from 'astro';
import { badge, humanize } from '../../lib/badge';
import { fetchRepoInstalls } from '../../lib/reach';

// On-demand endpoint (not part of the static prerender).
export const prerender = false;

/*
 * Shields.io endpoint badge: apt + dnf repo install count.
 *
 * apt.grimoiremods.com and rpm.grimoiremods.com are served by the grimoire-apt
 * Worker, which tallies install events (a new machine's one-time fetch of the
 * apt signing key or the dnf repo file) and package downloads (install +
 * upgrade events) in a Durable Object, exposed on each host at /__count as
 * { count, installs }. The badge shows both hosts' installs added together.
 * The path keeps its apt-only name because READMEs link it. We proxy + format
 * it here so all three reach badges share one host (grimoiremods.com) and one
 * number formatter (lib/badge.humanize); the fetch itself lives in lib/reach.ts
 * alongside the other channels.
 */

const ACCENT = 'f97316'; // brand orange, matches the GitHub downloads badge

export const GET: APIRoute = async () => {
  const installs = await fetchRepoInstalls();
  if (installs === null) return badge('apt + dnf installs', 'unavailable', 'lightgrey');
  return badge('apt + dnf installs', humanize(installs), ACCENT);
};
