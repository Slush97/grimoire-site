import type { APIRoute } from 'astro';
import { badge, humanize } from '../../lib/badge';

// On-demand endpoint (not part of the static prerender).
export const prerender = false;

/*
 * Shields.io endpoint badge: apt repo install count.
 *
 * apt.grimoiremods.com is served by the grimoire-apt Worker, which tallies real
 * .deb downloads (full, non-range GETs) in KV and exposes the running total at
 * /__count. We proxy + format it here so all three reach badges share one host
 * (grimoiremods.com) and one number formatter (lib/badge.humanize).
 */

const COUNT_URL = 'https://apt.grimoiremods.com/__count';
const ACCENT = 'f97316'; // brand orange, matches the GitHub downloads badge

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(COUNT_URL, { headers: { 'User-Agent': 'grimoire-site-badge' } });
    if (!res.ok) return badge('apt installs', 'unavailable', 'lightgrey');
    const j = (await res.json()) as { count?: number };
    const count = Number(j.count ?? 0);
    return badge('apt installs', humanize(count), ACCENT);
  } catch {
    return badge('apt installs', 'unavailable', 'lightgrey');
  }
};
