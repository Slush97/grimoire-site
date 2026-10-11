/*
 * docs.ts
 * Section grouping for the synced player guide, mirroring the guide's own
 * README. A page whose slug is not listed lands in "Everything else", so a
 * newly synced page can never silently drop off the index or the sidebar.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

const SECTIONS: { title: string; slugs: string[] }[] = [
  {
    title: 'The basics',
    slugs: ['first-run', 'installing-mods', 'load-order', 'conflicts', 'launching', 'troubleshooting'],
  },
  {
    title: 'The Locker',
    slugs: [
      'locker',
      'locker-skins',
      'locker-cards',
      'locker-sounds',
      'locker-effects',
      'locker-global',
      'locker-glb-tutorial',
      'locker-overrides',
    ],
  },
  { title: 'Profiles', slugs: ['profiles', 'profiles-sharing', 'snapshots'] },
  { title: 'Tuning and customizing', slugs: ['crosshair', 'autoexec', 'performance-presets', 'appearance'] },
  {
    title: 'Optional features',
    slugs: ['experimental-features', 'stats', 'discover', 'servers', 'door-stuck-sounds'],
  },
  { title: 'Trust', slugs: ['privacy'] },
];

export type Doc = CollectionEntry<'docs'>;
export interface DocSection {
  title: string;
  pages: Doc[];
}

let _sections: Promise<DocSection[]> | null = null;

export function getDocSections(): Promise<DocSection[]> {
  _sections ??= getCollection('docs').then((all) => {
    const docs = all.sort((a, b) => a.data.order - b.data.order);
    const bySlug = new Map(docs.map((d) => [d.data.slug, d]));
    const placed = new Set(SECTIONS.flatMap((s) => s.slugs));
    const sections = SECTIONS.map((s) => ({
      title: s.title,
      pages: s.slugs.map((slug) => bySlug.get(slug)).filter((d) => d !== undefined),
    })).filter((s) => s.pages.length > 0);
    const leftovers = docs.filter((d) => !placed.has(d.data.slug));
    if (leftovers.length > 0) sections.push({ title: 'Everything else', pages: leftovers });
    return sections;
  });
  return _sections;
}
