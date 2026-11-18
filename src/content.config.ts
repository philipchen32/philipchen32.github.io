import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    type: z.enum(['Article', 'Note']).default('Article'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    toc: z.boolean().default(false),
  }).refine(({ published, updated }) => !updated || updated >= published, {
    message: 'The update date must be on or after the publication date.',
    path: ['updated'],
  }),
});

export const collections = { writing };
