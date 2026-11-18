import rss from '@astrojs/rss';
import { site } from '../site.mjs';
import { getWriting, writingUrl } from '../lib/writing';

export async function GET() {
  const entries = await getWriting(false);
  return rss({
    title: site.name,
    description: site.description,
    site: site.url,
    items: entries.map(({ id, data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.published,
      link: writingUrl(id),
      categories: data.tags,
    })),
  });
}
