/*
 * Shared helpers for the shields.io "endpoint" badges served from this site.
 * See src/pages/api/*-badge.json.ts. These exist so the README can surface
 * honest reach numbers (real installs, not update-poll traffic) that no plain
 * shields URL can compute.
 */

// Shields-style short number: 695 -> "695", 1446 -> "1.4k", 12850 -> "13k".
export function humanize(n: number): string {
  if (n < 1000) return String(n);
  const units: Array<[number, string]> = [
    [1e9, 'G'],
    [1e6, 'M'],
    [1e3, 'k'],
  ];
  for (const [unit, suffix] of units) {
    if (n >= unit) {
      const v = n / unit;
      const s = v < 10 ? v.toFixed(1).replace(/\.0$/, '') : String(Math.round(v));
      return `${s}${suffix}`;
    }
  }
  return String(n);
}

// A shields.io endpoint-badge JSON response, cached an hour at the edge and by
// shields itself so we stay polite to the upstream APIs.
export function badge(label: string, message: string, color: string): Response {
  return new Response(
    JSON.stringify({ schemaVersion: 1, label, message, color, cacheSeconds: 3600 }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    },
  );
}
