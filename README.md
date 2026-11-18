# Philip Chen’s engineering site

A static Astro site for writing, technical notes, and selected work.

## Run locally

Use Node.js 24 and npm. With nvm, run `nvm install` and `nvm use` from this directory.

```sh
npm ci
npm run dev
```

Open `http://localhost:4321/`. The Writing page includes entries marked as drafts during development. The formatting demo is at `/writing/article-format-preview/`.

```sh
npm run build
npm run preview
```

Production output is in `dist/`. The preview server serves that output. Check the home, Writing, About, an article, `/rss.xml`, and `/sitemap-index.xml`. The formatting demo URL should return 404 in production preview.

## Publish a post

Create `src/content/writing/my-post.md`. Its filename determines the URL, so keep the filename stable once it is published. Use lowercase words separated by hyphens.

```md
---
title: My post title
description: A short summary for the archive, RSS and page metadata.
published: 2026-11-18
type: Note
tags: [Storage, Performance]
draft: true
toc: true
---

Start with the article body. The frontmatter title is already the page’s H1.

## A section

Write here.
```

- Use `Article` or `Note` for `type`. It defaults to `Article`. Dates are displayed in UTC. Add `updated: YYYY-MM-DD` after a substantive revision.
- Preview in `npm run dev`. Set `draft: false` or remove the field once the post is approved for publication. The production build omits drafts from article routes, the home page, Writing, RSS, the sitemap and social cards. Drafts still live in the Git source, so keep private material out of the repository.
- Use fenced code blocks with a language identifier, Markdown tables and ordinary reference links. Use `toc: true` to build an optional contents list from level-two and level-three headings. Headings get direct links automatically.
- Put publishable images under `public/images/<post-slug>/` and reference them as `![Descriptive alternative text](/images/<post-slug>/diagram.webp)`. For a captioned diagram, use an MDX `figure` with an image and a `figcaption`. Keep images for unpublished drafts outside `public/`, which is copied into every build. For draft-local images, place the image next to the draft and use a relative Markdown path such as `![Description](./diagram.png)`.
- Use the `.mdx` extension when you need a component or inline markup. See the formatting demo for examples. The build generates a 1200×630 social card for each published post.

## Configure the site

Edit `src/site.mjs` for the site name, affiliation, bio, deployment origin and public links. GitHub Pages supplies `SITE_URL` in the deployment workflow. For other hosting, set `SITE_URL` in the host settings or replace the reserved `https://example.com` fallback with the actual HTTPS origin. Rebuild whenever the origin changes because it feeds the canonical URLs, sitemap, RSS and social cards.

Set `email` and add or edit entries in `social` as needed. Leave unused fields blank. Set `newsletterUrl` to the hosted signup page of an active subscription provider to enable the email subscription link.

Analytics are off by default. A provider that uses a deferred script and a `data-domain` attribute can be enabled in production via `analytics.scriptUrl` and `analytics.domain`. For a provider using a different tag format, update the optional script in `src/layouts/Base.astro`.

Edit `src/lib/work.ts` to add public project pages, demos or talks to Selected work. Each entry has a title, description, source label and URL.

## Deploy to GitHub Pages

1. Create a public repository named `YOUR-USERNAME.github.io` on your GitHub account and push this repository's `main` branch to it. That name gives the site a root URL, where its internal links will work.
2. Under **Settings → Pages**, select **GitHub Actions** as the publishing source. Under **Actions → Deploy to GitHub Pages**, run the workflow if it did not run after enabling Pages. Subsequent pushes to `main` deploy automatically.
3. Open the Pages URL, the writing archive, and an article. Check that `/rss.xml`, `/sitemap-index.xml`, and the article's social image load.

If you add a domain later, configure it under **Settings → Pages → Custom domain**, follow the provider's DNS instructions, and rerun the workflow once HTTPS is ready. The workflow uses the configured site origin.

## Deploy to Netlify or another static host

[Netlify’s Astro deployment guide](https://docs.astro.build/en/guides/deploy/netlify/) describes the Git import workflow. The same build settings work on a static host that supports Node.js 24.

1. Create a repository on your Git provider and push this repository’s `main` branch. Keep the lockfile tracked and let the host build `dist/`.
2. Sign in to the hosting provider, import the repository and allow the host to read it. Use the repository root, Node.js 24, `npm run build` as the build command and `dist` as the publish directory.
3. Set `SITE_URL` to the actual production origin in the host settings and rebuild.
4. Open the deployed home, Writing, About and article pages. Check the feed and sitemap, and open an article’s `og:image` URL to verify the social card.
5. If you later choose a custom domain, add it in the host dashboard and follow the host’s DNS instructions. Update `SITE_URL` and rebuild once that origin is available.

Deployment needs a Git repository and hosting account with repository access. A custom domain additionally needs registrar or DNS access. A newsletter or analytics account is needed only if you enable that integration.
