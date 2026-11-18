import { getCollection, type CollectionEntry } from 'astro:content';

export const writingUrl = (id: string) => `/writing/${id}/`;

export async function getWriting(includeDrafts = import.meta.env.DEV) {
  const entries = await getCollection('writing', ({ data }) => includeDrafts || !data.draft);
  return entries.sort((a, b) =>
    b.data.published.getTime() - a.data.published.getTime() || a.id.localeCompare(b.id)
  );
}

export type WritingEntry = CollectionEntry<'writing'>;

export const formatDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format;
