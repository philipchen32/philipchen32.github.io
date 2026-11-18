export const site = {
  name: 'Philip Chen',
  bio: 'I’m a developer advocate at Zilliz and work with the open-source Milvus community.',
  description: 'Writing and technical notes on databases, distributed systems, storage, performance, search and AI infrastructure.',
  // GitHub Pages supplies SITE_URL. Other hosts can set it or replace the local fallback.
  url: process.env.SITE_URL || 'https://example.com',
  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/philipchen32' },
    { label: 'GitHub', url: '' },
  ],
  email: '',
  newsletterUrl: '',
  // Set both values to opt in to a provider such as Plausible.
  analytics: { scriptUrl: '', domain: '' },
};
