import type { APIRoute } from 'astro';
import { badge, humanize } from '../../lib/badge';

// On-demand endpoint (not part of the static prerender).
export const prerender = false;

/*
 * Shields.io endpoint badge: GameBanana download count for the Grimoire tool.
 *
 * Grimoire is published on GameBanana as tool 22583. apiv11's ProfilePage
 * returns the lifetime download count directly as `_nDownloadCount`. (The older
 * Core/Item/Data endpoint silently rejects these field names and reports 0, so
 * apiv11 is required, same finding as grimoire-admin/.../reach/gamebanana.ts.)
 *
 * No auth needed; GameBanana's API is public.
 */

const TOOL_ID = '22583';
const GB_YELLOW = 'FCDC2A'; // matches the existing GameBanana badge in the README

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(
      `https://gamebanana.com/apiv11/Tool/${TOOL_ID}/ProfilePage`,
      { headers: { 'User-Agent': 'grimoire-site-badge' } },
    );
    if (!res.ok) return badge('gamebanana', 'unavailable', 'lightgrey');
    const j = (await res.json()) as Record<string, unknown>;
    if (j.error || j.error_code) return badge('gamebanana', 'unavailable', 'lightgrey');
    const downloads = Number(j._nDownloadCount ?? 0);
    return badge('gamebanana', humanize(downloads), GB_YELLOW);
  } catch {
    return badge('gamebanana', 'unavailable', 'lightgrey');
  }
};
