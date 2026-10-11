import type { APIRoute } from 'astro';
import { badge, humanize } from '../../lib/badge';
import { fetchGameBananaDownloads } from '../../lib/reach';

// On-demand endpoint (not part of the static prerender).
export const prerender = false;

/*
 * Shields.io endpoint badge: GameBanana download count for the Grimoire tool.
 *
 * Grimoire is published on GameBanana as tool 22583. apiv11's ProfilePage
 * returns the lifetime download count directly as `_nDownloadCount`. (The older
 * Core/Item/Data endpoint silently rejects these field names and reports 0, so
 * apiv11 is required, same finding as grimoire-admin/.../reach/gamebanana.ts.)
 * The fetch lives in lib/reach.ts alongside the other channels.
 *
 * No auth needed; GameBanana's API is public.
 */

const GB_YELLOW = 'FCDC2A'; // matches the existing GameBanana badge in the README

export const GET: APIRoute = async () => {
  const downloads = await fetchGameBananaDownloads();
  if (downloads === null) return badge('gamebanana', 'unavailable', 'lightgrey');
  return badge('gamebanana', humanize(downloads), GB_YELLOW);
};
