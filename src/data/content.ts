/*
 * Single source of truth for the museum page. Every era stage reads from
 * here and renders the same product in its own visual language. Live
 * GitHub release data is fetched once per build (memoized) and shared
 * with /download.
 */

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
  tag_name: 'v1.16.0',
  name: 'v1.16.0',
  published_at: '2026-06-10T05:03:10Z',
  html_url: 'https://github.com/Slush97/grimoire/releases/tag/v1.16.0',
  body: '',
  assets: [
    {
      name: 'Grimoire-Setup-1.16.0.exe',
      size: 191381711,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.16.0/Grimoire-Setup-1.16.0.exe',
    },
    {
      name: 'Grimoire-Portable-1.16.0.exe',
      size: 191151749,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.16.0/Grimoire-Portable-1.16.0.exe',
    },
    {
      name: 'Grimoire-1.16.0.AppImage',
      size: 220333967,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.16.0/Grimoire-1.16.0.AppImage',
    },
    {
      name: 'grimoire_1.16.0_amd64.deb',
      size: 181239456,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.16.0/grimoire_1.16.0_amd64.deb',
    },
    {
      name: 'SHA256SUMS',
      size: 370,
      browser_download_url:
        'https://github.com/Slush97/grimoire/releases/download/v1.16.0/SHA256SUMS',
    },
  ],
};

/*
 * Memoized per Node process. Astro builds each page in the same Vite
 * process, so /index and /download share one network round-trip.
 */
let _releasePromise: Promise<Release | null> | null = null;

async function fetchRelease(): Promise<Release | null> {
  const ghToken =
    import.meta.env.GITHUB_TOKEN_SITE ?? process.env.GITHUB_TOKEN_SITE;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'grimoire-site-build',
  };
  if (ghToken) headers.Authorization = `Bearer ${ghToken}`;
  try {
    const res = await fetch(
      'https://api.github.com/repos/Slush97/grimoire/releases/latest',
      { headers },
    );
    if (!res.ok) return null;
    return (await res.json()) as Release;
  } catch {
    return null;
  }
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
    sha256Sums: sums,
    primaryHref,
  };
}

export function fmtBytes(b: number | undefined | null): string {
  if (!b) return '';
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}
