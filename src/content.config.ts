import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * The player guide, synced from ../grimoire/docs/guide/ by
 * scripts/sync-docs.mjs. Front matter shape is the app repo's contract
 * (docs/guide/STYLE.md there); `slug` is load-bearing because the app
 * links to grimoiremods.com/docs/<slug> from in-app Help.
 */
const docs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    order: z.number().int(),
    updated: z.coerce.date(),
  }),
});

export const collections = { docs };
