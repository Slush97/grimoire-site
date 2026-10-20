/*
 * reach.ts
 * Honest install counts, and the one definition of what counts as an
 * install. Shared by the shields endpoints under pages/api/ (which run on
 * the Worker, per request) and by data/content.ts (which runs at build
 * time, to put real numbers in stage copy).
 *
 * Deliberately dependency-free and binding-free: content.ts imports this
 * during the Astro build in plain Node, so nothing here may reach for
 * `cloudflare:workers`. Callers pass their own GitHub token.
 *
 * NO TELEMETRY. Every number here is a public counter published by
 * someone else about us (GitHub's per-asset download tally, GameBanana's
 * profile page, our own apt/dnf Worker's DO counter). Nothing is collected
 * from anyone running Grimoire. See the workspace CLAUDE.md.
 */

const REPO = 'Slush97/grimoire';
const GB_TOOL_ID = '22583';
const APT_COUNT_URL = 'https://apt.grimoiremods.com/__count';
const RPM_COUNT_URL = 'https://rpm.grimoiremods.com/__count';
const UA = 'grimoire-site';

/*
 * Real installer? The plain "downloads total" number GitHub gives you
 * counts electron-updater plumbing: latest*.yml is fetched on every launch
 * (liveness, not installs), and .blockmap/.zsync during in-app
 * differential updates. Those are excluded here. The installers
 * themselves are still fetched by every in-app update, so the installer
 * total is downloads including updates, not people.
 *
 * This mirrors the canonical classifier in
 * grimoire-admin/src/pages/api/reach/github.ts. Those are separate
 * deployables with no shared package, so that copy stays hand-synced;
 * within THIS project everything routes through here.
 */
export function isInstaller(name: string): boolean {
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

const isUpdateFeed = (name: string) => {
  const n = name.toLowerCase();
  return n.startsWith('latest') && n.endsWith('.yml');
};

interface GhAsset {
  name: string;
  download_count: number;
}
interface GhRelease {
  tag_name: string;
  published_at: string;
  prerelease: boolean;
  assets: GhAsset[];
}

export interface GithubReach {
  /** Cumulative installer downloads, every release. Includes in-app updates. */
  installs: number;
  /** Machines that installed or updated to one week-long release. */
  weekly: { users: number; tag: string; days: number } | null;
  /** App launches per day, from update-feed fetches. */
  launchesPerDay: number | null;
}

const DAY_MS = 86_400_000;

/*
 * The app fetches latest*.yml from the newest release twice per launch
 * (the renderer's check on mount, then main's 5s startup check in
 * grimoire/electron/main/index.ts) and never on a timer. apt, AUR and
 * Flatpak installs skip both, so this undercounts Linux.
 */
const FEED_FETCHES_PER_LAUNCH = 2;

/*
 * Weekly and daily figures without telemetry. GitHub only publishes
 * cumulative per-asset counts, but each machine downloads a given version
 * once (fresh install or update), so a release's installer count is the
 * number of machines that took it while it was the newest. For a release
 * that stayed newest for about a week, that's weekly users (a floor: it
 * misses package-manager installs and anyone who skipped the update).
 * Releases newest for under 4 or over 10 days don't qualify; if none of the
 * last month's releases do, the figure is dropped rather than stretched.
 */
function activity(releases: GhRelease[], now: number): Pick<GithubReach, 'weekly' | 'launchesPerDay'> {
  const windows = releases.map((r, i) => {
    const start = Date.parse(r.published_at);
    const end = i === 0 ? now : Date.parse(releases[i - 1].published_at);
    let installs = 0;
    let feed = 0;
    for (const a of r.assets) {
      if (isUpdateFeed(a.name)) feed += a.download_count;
      else if (isInstaller(a.name)) installs += a.download_count;
    }
    return { tag: r.tag_name, start, days: (end - start) / DAY_MS, installs, feed };
  });

  const week = windows.find((w) => now - w.start < 30 * DAY_MS && w.days >= 4 && w.days <= 10);
  const weekly = week ? { users: week.installs, tag: week.tag, days: Math.round(week.days) } : null;

  const daily = windows.find((w) => w.days >= 1 && now - w.start < 30 * DAY_MS);
  const launchesPerDay = daily ? Math.floor(daily.feed / daily.days / FEED_FETCHES_PER_LAUNCH / 100) * 100 : null;

  return { weekly, launchesPerDay };
}

/*
 * Installer downloads across the full release history, plus the activity
 * figures above. per_page=100 in one call: a smaller window would silently
 * undercount older releases and make the total drift down over time.
 */
export async function fetchGithubReach(token?: string): Promise<GithubReach | null> {
  const url = `https://api.github.com/repos/${REPO}/releases?per_page=100`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': UA,
  };
  try {
    let res: Response | null = null;
    if (token) {
      res = await fetch(url, { headers: { ...headers, Authorization: `Bearer ${token}` } });
      /*
       * An expired PAT answers 401 to a request that would have worked
       * unauthenticated, so a dead token is strictly worse than none.
       * Degrade to anonymous rather than reporting "no data".
       */
      if (!res.ok && (res.status === 401 || res.status === 403)) {
        console.warn(`[reach] GitHub token rejected (${res.status}); retrying anonymously`);
        res = null;
      }
    }
    if (!res) res = await fetch(url, { headers });
    if (!res.ok) return null;

    // Nightlies are prereleases that get deleted as newer ones land, so
    // counting them would make the total drop.
    const releases = ((await res.json()) as GhRelease[])
      .filter((r) => !r.prerelease)
      .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
    let installs = 0;
    for (const r of releases) {
      for (const a of r.assets ?? []) {
        if (isInstaller(a.name)) installs += a.download_count;
      }
    }
    return { installs, ...activity(releases, Date.now()) };
  } catch {
    return null;
  }
}

/*
 * apt.grimoiremods.com and rpm.grimoiremods.com count install events (a new
 * machine's one-time fetch of the apt signing key or the dnf repo file)
 * separately from package downloads (which include upgrades). `installs` is
 * the one that means "new user". The badge shows both repos added together,
 * so if either can't be read the sum is dropped rather than undercounted.
 */
export async function fetchRepoInstalls(): Promise<number | null> {
  const [apt, rpm] = await Promise.all([fetchInstalls(APT_COUNT_URL), fetchInstalls(RPM_COUNT_URL)]);
  return apt === null || rpm === null ? null : apt + rpm;
}

async function fetchInstalls(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) return null;
    const j = (await res.json()) as { count?: number; installs?: number };
    return typeof j.installs === 'number' ? j.installs : null;
  } catch {
    return null;
  }
}

/*
 * GameBanana lifetime downloads for the tool listing. apiv11's
 * ProfilePage is required: the older Core/Item/Data endpoint silently
 * rejects these field names and reports 0.
 */
export async function fetchGameBananaDownloads(): Promise<number | null> {
  try {
    const res = await fetch(`https://gamebanana.com/apiv11/Tool/${GB_TOOL_ID}/ProfilePage`, {
      headers: { 'User-Agent': UA },
    });
    if (!res.ok) return null;
    const j = (await res.json()) as Record<string, unknown>;
    if (j.error || j.error_code) return null;
    const n = Number(j._nDownloadCount ?? 0);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export interface Reach {
  githubInstalls: number | null;
  repoInstalls: number | null;
  gamebananaDownloads: number | null;
  weekly: GithubReach['weekly'];
  launchesPerDay: number | null;
}

/*
 * All three channels, each independently failable. A channel that fails
 * comes back null and the caller drops it from the copy rather than
 * substituting a stale or invented figure: a marketing page that guesses
 * at its own install count is exactly the thing this project does not do.
 */
export async function fetchReach(token?: string): Promise<Reach> {
  const [github, repoInstalls, gamebananaDownloads] = await Promise.all([
    fetchGithubReach(token),
    fetchRepoInstalls(),
    fetchGameBananaDownloads(),
  ]);
  return {
    githubInstalls: github?.installs ?? null,
    repoInstalls,
    gamebananaDownloads,
    weekly: github?.weekly ?? null,
    launchesPerDay: github?.launchesPerDay ?? null,
  };
}

/* 13480 -> "13,480". Stage copy wants the full honest number, not "13k". */
export function commas(n: number): string {
  return n.toLocaleString('en-US');
}

// 108,195 -> "108k+", 5,600 -> "5.6k+", 79 -> "79". Rounds down, so the + stays true.
export function atLeast(n: number): string {
  if (n < 1000) return String(n);
  return `${n < 10_000 ? Math.floor(n / 100) / 10 : Math.floor(n / 1000)}k+`;
}
