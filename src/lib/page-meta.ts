import { site } from '../site.mjs';

export const pageMeta = {
  default: { title: site.name, description: site.description, label: 'Engineering notes' },
  writing: {
    title: 'Writing',
    description: 'Articles and short notes on databases, distributed systems, storage, performance and search.',
    label: site.name,
  },
  about: { title: 'About', description: site.bio, label: site.name },
};
