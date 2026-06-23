/*
 * Era registry for the theme switcher. One entry per stage component in
 * src/components/stages/. Channel order is chronological(ish): the
 * switcher cycles through computing history from the terminal era up to
 * the present.
 *
 * The active era is persisted in localStorage (ERA_KEY) and mirrored on
 * <html data-era="...">:
 *   - on / (the museum), CSS in museum.css shows only the matching stage
 *   - on /download, /tools and /404, geo.css reskins the shared chrome
 * Both layouts set the attribute with a pre-paint inline script so there
 * is no flash of the wrong century.
 */

export const ERAS = [
  { id: 'terminal',  label: 'TERMINAL',  year: '1979', osd: 'VT220 GREEN' },
  { id: 'win95',     label: 'WIN95',     year: '1995', osd: 'A 32-BIT EXPERIENCE' },
  { id: 'geocities', label: 'GEOCITIES', year: '1996', osd: 'UNDER CONSECRATION' },
  { id: 'aero',      label: 'AERO',      year: '2007', osd: 'THE WOW STARTS NOW' },
  { id: 'fugazi',    label: 'FUGAZI',    year: '2026', osd: 'SYNERGY UNLOCKED' },
] as const;

export type EraId = (typeof ERAS)[number]['id'];

export const ERA_IDS = ERAS.map((e) => e.id) as readonly EraId[];
export const ERA_KEY = 'grimoire.era';
export const DEFAULT_ERA: EraId = 'geocities';

export function coerceEra(value: string | null | undefined): EraId {
  return (ERA_IDS as readonly string[]).includes(value ?? '')
    ? (value as EraId)
    : DEFAULT_ERA;
}

export function eraIndex(id: EraId): number {
  return ERA_IDS.indexOf(id);
}

/* OSD channel number, e.g. "CH 03" for geocities. */
export function eraChannel(id: EraId): string {
  return `CH ${String(eraIndex(id) + 1).padStart(2, '0')}`;
}
