/*
 * Single source of truth for the museum page. Every era stage reads from
 * here and renders the same product in its own visual language. Live
 * GitHub release data and the public reach counters are each fetched once
 * per build (memoized) and shared across the pages that need them.
 */
import { commas, fetchReach, type Reach } from '../lib/reach';

export const brand = {
  name: 'Grimoire',
  tagline: 'Mod manager for Deadlock',
  github: 'https://github.com/Slush97/grimoire',
  discord: 'https://discord.gg/KgYGHEMq2P',
  gamebanana: 'https://gamebanana.com/tools/22583',
  aur: 'https://aur.archlinux.org/packages/grimoire-bin',
  domain: 'grimoiremods.com',
  year: 'MMXXVI',
  license: 'MIT',
} as const;

/*
 * Core feature inventory. Stored in a neutral voice. Each era stage
 * re-renders these in its own register: Fugazi calls "Manage your library"
 * "frictionless mod orchestration," Win95 calls it "MOD LIBRARY MANAGER",
 * Terminal calls it `grimoire library`. Same facts, different costumes.
 */
export interface Feature {
  id: string;
  topic: string;
  summary: string;
}

export const features: Feature[] = [
  {
    id: 'browse',
    topic: 'Browse the GameBanana catalog',
    summary:
      "The full Deadlock library, mirrored locally, searchable in milliseconds. One-click install via the gb1click:// protocol.",
  },
  {
    id: 'library',
    topic: 'Manage your mod library',
    summary:
      'Toggle, reorder, prioritize. Catch overlapping VPK paths before they crash a match.',
  },
  {
    id: 'locker',
    topic: 'Hero Locker',
    summary:
      'One active skin per hero, picked from every variant you have installed. The rest stay on disk, ready to swap.',
  },
  {
    id: 'profiles',
    topic: 'Profiles',
    summary:
      'Save full mod loadouts and switch in one click. Export as short mp1: codes or .modprofile.json files.',
  },
];

export interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

export interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: ReleaseAsset[];
}

/*
 * Pinned fallback release. The /download CTA is the site's primary
 * conversion, but it depends on a build-time fetch of the GitHub release
 * feed (getLatestRelease). That fetch runs unauthenticated on the
 * Cloudflare build, whose egress IPs share GitHub's anonymous 60/hr API
 * limit, so it intermittently returns null and the page used to ship with
 * no download links at all ("couldn't reach github").
 *
 * When the live fetch fails, getDownloadUrls falls back to this snapshot so
 * the setup .exe and the other platform assets are always downloadable.
 * Live data always wins when the fetch succeeds.
 *
 * BUMP THIS on each Grimoire release, alongside the redeploy this site
 * already needs (see grimoire-site/CLAUDE.md: "/download is build-time data").
 */
const PINNED_RELEASE: Release = {
  tag_name: 'v1.25.0',
  name: 'v1.25.0',
  published_at: '2026-07-28T01:59:41Z',
  html_url: 'https://github.com/Slush97/grimoire/releases/tag/v1.25.0',
  body: '',
  assets: [
    {
      name: 'Grimoire-Setup-1.25.0.exe',
      size: 192769538,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.25.0/Grimoire-Setup-1.25.0.exe',
    },
    {
      name: 'Grimoire-Portable-1.25.0.exe',
      size: 192539574,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.25.0/Grimoire-Portable-1.25.0.exe',
    },
    {
      name: 'Grimoire-1.25.0.AppImage',
      size: 222441057,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.25.0/Grimoire-1.25.0.AppImage',
    },
    {
      name: 'grimoire_1.25.0_amd64.deb',
      size: 182462020,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.25.0/grimoire_1.25.0_amd64.deb',
    },
    {
      name: 'SHA256SUMS',
      size: 370,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.25.0/SHA256SUMS',
    },
  ],
};

/*
 * Memoized per Node process. Astro builds each page in the same Vite
 * process, so /index and /download share one network round-trip.
 */
let _releasePromise: Promise<Release | null> | null = null;

/*
 * An expired token must never be worse than no token.
 *
 * GITHUB_TOKEN_SITE is optional: it exists only to skip the anonymous
 * 60/hr limit. But an expired PAT does not degrade to anonymous, it
 * makes GitHub answer 401 to a request that would have succeeded
 * unauthenticated. Combined with the pinned fallback below (which is
 * doing its job perfectly and therefore hides the failure), that let the
 * site quietly advertise a nine-version-old release. So: on 401/403 from
 * an authenticated call, retry once anonymously, and say so loudly in
 * the build log either way.
 */
async function ghFetch(url: string, accept: string): Promise<Response | null> {
  const token = import.meta.env.GITHUB_TOKEN_SITE ?? process.env.GITHUB_TOKEN_SITE;
  const headers: Record<string, string> = {
    Accept: accept,
    'User-Agent': 'grimoire-site-build',
  };
  try {
    if (token) {
      const res = await fetch(url, {
        headers: { ...headers, Authorization: `Bearer ${token}` },
      });
      if (res.ok) return res;
      if (res.status !== 401 && res.status !== 403) return null;
      console.warn(
        `[content] GITHUB_TOKEN_SITE rejected (${res.status}). Retrying anonymously; ` +
          `rotate the PAT or unset it. See grimoire-site/CLAUDE.md > Env.`,
      );
    }
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`[content] GitHub responded ${res.status} for ${url}`);
      return null;
    }
    return res;
  } catch (err) {
    console.warn(`[content] GitHub fetch failed for ${url}:`, err);
    return null;
  }
}

async function fetchRelease(): Promise<Release | null> {
  const res = await ghFetch(
    'https://api.github.com/repos/Slush97/grimoire/releases/latest',
    'application/vnd.github+json',
  );
  if (!res) {
    console.warn(
      `[content] Falling back to PINNED_RELEASE ${PINNED_RELEASE.tag_name}. ` +
        `If the real latest is newer, /download is now stale.`,
    );
    return null;
  }
  return (await res.json()) as Release;
}

export function getLatestRelease(): Promise<Release | null> {
  if (!_releasePromise) _releasePromise = fetchRelease();
  return _releasePromise;
}

export interface DownloadUrls {
  release: Release | null;
  version: string;
  releaseDate: string;
  releaseUrl: string;
  windowsInstaller: ReleaseAsset | null;
  windowsPortable: ReleaseAsset | null;
  linuxAppImage: ReleaseAsset | null;
  linuxDeb: ReleaseAsset | null;
  linuxRpm: ReleaseAsset | null;
  sha256Sums: ReleaseAsset | null;
  /* Best single CTA target. Windows installer if available, then portable, then releases page. */
  primaryHref: string;
}

/*
 * Returns every artifact a stage might want to surface in its own CTA.
 * Stages that just want "the download link" should use primaryHref.
 */
export async function getDownloadUrls(): Promise<DownloadUrls> {
  // Live data wins; fall back to the pinned snapshot when the build-time
  // fetch fails so the download links are never empty.
  const release = (await getLatestRelease()) ?? PINNED_RELEASE;
  const assets = release.assets ?? [];
  const find = (pred: (n: string) => boolean) =>
    assets.find((a) => pred(a.name.toLowerCase())) ?? null;

  const winInstaller = find((n) => n.endsWith('.exe') && n.includes('setup'));
  const winPortable = find(
    (n) => n.endsWith('.exe') && !n.includes('setup') && !n.includes('blockmap'),
  );
  const appImage = find((n) => n.endsWith('.appimage'));
  const deb = find((n) => n.endsWith('.deb'));
  const rpm = find((n) => n.endsWith('.rpm'));
  const sums = find((n) => n === 'sha256sums' || n.endsWith('.sha256sums'));

  const tag = release?.tag_name ?? '';
  const version = tag.replace(/^v/, '');
  const releaseDate = release
    ? new Date(release.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  const releaseUrl = release?.html_url ?? `${brand.github}/releases/latest`;

  /*
   * Stages render in-character CTAs that point to the actual binary. Most
   * users are on Windows so the primary href surfaces the installer.
   * Falls through to portable, then to the releases page.
   */
  const primaryHref =
    winInstaller?.browser_download_url ??
    winPortable?.browser_download_url ??
    `/download`;

  return {
    release,
    version,
    releaseDate,
    releaseUrl,
    windowsInstaller: winInstaller,
    windowsPortable: winPortable,
    linuxAppImage: appImage,
    linuxDeb: deb,
    linuxRpm: rpm,
    sha256Sums: sums,
    primaryHref,
  };
}

/*
 * Honest reach numbers, fetched once per build alongside the release.
 *
 * Only the Fugazi stage uses these today: it is a parody of a Series-B
 * SaaS landing page, and a parody of that genre needs a social-proof
 * line. It used to invent one ("12,000+ developers, 47,000 mods
 * deployed"), which is the single claim on this site a reader could have
 * screenshotted as a lie. Real public counters are funnier in that slot
 * anyway: the joke is the corporate framing, not the figures.
 *
 * Every channel is independently failable; a channel that fails is
 * dropped from the copy rather than replaced with a stale pin. See the
 * NO TELEMETRY note at the top of lib/reach.ts: these are public counters
 * other people keep about us, not anything collected from users.
 */
let _reachPromise: Promise<Reach> | null = null;

export function getReach(): Promise<Reach> {
  if (!_reachPromise) {
    const token = import.meta.env.GITHUB_TOKEN_SITE ?? process.env.GITHUB_TOKEN_SITE;
    _reachPromise = fetchReach(token);
  }
  return _reachPromise;
}

/*
 * The social-proof line, assembled from whatever resolved. Returns null
 * when nothing did, so the caller can drop the line entirely instead of
 * rendering a sad half-sentence.
 *
 * Each channel is attributed to its source rather than merged into one
 * headline figure. Two reasons, both about not overclaiming: a download
 * is not an install (people fetch things they never run), and GameBanana's
 * counter tracks its own listing, some of which lands on the same GitHub
 * assets already counted. Attributed and slightly boring beats impressive
 * and unfalsifiable.
 */
export async function getReachLine(): Promise<string | null> {
  const reach = await getReach();
  const parts: string[] = [];
  if (reach.githubInstalls !== null) {
    parts.push(`${commas(reach.githubInstalls)} downloads from GitHub`);
  }
  if (reach.gamebananaDownloads !== null) {
    parts.push(`${commas(reach.gamebananaDownloads)} from GameBanana`);
  }
  if (!parts.length) return null;
  return parts.join(' · ');
}

export function fmtBytes(b: number | undefined | null): string {
  if (!b) return '';
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}
