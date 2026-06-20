import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { badge, humanize } from '../../lib/badge';

// On-demand endpoint (not part of the static prerender).
export const prerender = false;

/*
 * Shields.io endpoint badge: honest cumulative GitHub installer downloads.
 *
 * The plain shields `.../downloads/Slush97/grimoire/total` badge is a lie. It
 * sums EVERY release asset, and ~85% of that total is electron-updater plumbing:
 *   - latest*.yml  : polled by every running client on a schedule (liveness, not installs)
 *   - .blockmap    : pulled only during an in-app differential auto-update
 * That inflates the headline to ~96k when real installer downloads are ~13k.
 *
 * This endpoint fetches the full release history and counts only real installer
 * assets, so the badge reflects actual installs. The classification mirrors the
 * canonical one in grimoire-admin/src/pages/api/reach/github.ts (kept in sync by
 * hand; these are separate deployables with no shared package).
 *
 * Scope is GitHub Releases only: AUR and the apt repo are separate channels.
 * Hence the "github downloads" label, not a bare "downloads".
 */

interface GhAsset {
  name: string;
  download_count: number;
}
interface GhRelease {
  assets: GhAsset[];
}

const REPO = 'Slush97/grimoire';
const ACCENT = 'f97316'; // brand orange, matches the other README badges

// Real installer? Excludes feed (latest*.yml), differential-update (.blockmap/
// .zsync), and metadata (checksums, builder-debug, anything else).
function isInstaller(name: string): boolean {
  const n = name.toLowerCase();
  if (n.startsWith('latest') && n.endsWith('.yml')) return false;
  if (n.endsWith('.blockmap') || n.endsWith('.zsync')) return false;
  return (
    n.endsWith('.exe') ||
    n.endsWith('.msi') ||
    n.endsWith('.appimage') ||
    n.endsWith('.deb') ||
    n.endsWith('.rpm') ||
    n.endsWith('.pacman') ||
    n.endsWith('.snap') ||
    n.endsWith('.dmg') ||
    n.endsWith('.pkg')
  );
}

export const GET: APIRoute = async () => {
  // Optional token lifts the anonymous 60/hr GitHub limit (shared across all CF
  // egress IPs) to 5000/hr. Same secret the build-time release fetch uses.
  const token =
    env.GITHUB_TOKEN_SITE ??
    import.meta.env.GITHUB_TOKEN_SITE ??
    process.env.GITHUB_TOKEN_SITE;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'grimoire-site-badge',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    // per_page=100 captures the full release history in one call so the total
    // stays cumulative (a small window would undercount older releases).
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases?per_page=100`,
      { headers },
    );
    if (!res.ok) return badge('github downloads', 'unavailable', 'lightgrey');
    const releases = (await res.json()) as GhRelease[];

    let installs = 0;
    for (const r of releases) {
      for (const a of r.assets ?? []) {
        if (isInstaller(a.name)) installs += a.download_count;
      }
    }
    return badge('github downloads', humanize(installs), ACCENT);
  } catch {
    return badge('github downloads', 'unavailable', 'lightgrey');
  }
};
