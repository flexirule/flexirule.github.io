# FlexiRule Website

The source for the FlexiRule public marketing website, built with Astro and intended for publication at [https://flexirule.github.io](https://flexirule.github.io).

## Stack

- Astro 7 + TypeScript 5.9 (kept within the supported peer range of `@astrojs/check`)
- Statically generated HTML with a data-driven sitemap endpoint
- Custom FlexiRule styling; no off-the-shelf marketing theme
- GitHub Actions for pull-request validation and GitHub Pages deployment

## Requirements and local development

Node.js 22.22.0 or newer is specified in `.nvmrc`.

```sh
npm install
npm run dev
```

## Checks and production build

```sh
npm run check
npm run build
npm run preview
```

The generated website is written to `dist/`.

## Page and content structure

- `src/pages/index.astro`: homepage
- `src/pages/comparisons/index.astro`: comparison library
- `src/pages/comparisons/[slug].astro`: reusable, statically generated comparison page
- `src/data/comparisons.ts`: comparison copy, summaries and metadata
- `src/pages/sitemap.xml.ts`: generated XML sitemap, using the same comparison data as the pages
- `src/components/`: reusable site navigation, footer and comparison-card components
- `src/layouts/BaseLayout.astro`: shared page shell and SEO metadata
- `src/styles/global.css`: design tokens, layout and responsive styling

Add comparison entries to `src/data/comparisons.ts`; Astro generates a static route for each entry, and the sitemap endpoint automatically includes it. Keep each page's content and metadata specific to its topic. Avoid unsupported competitor claims, and review technical statements before publication.

## GitHub Pages

The `.github/workflows/site.yml` workflow validates pull requests targeting `develop` and deploys pushes to `develop`. In **Repository Settings → Pages**, choose **GitHub Actions** as the build and deployment source.

The canonical site URL is configured as `https://flexirule.github.io`. If a custom domain is introduced, update `site` in `astro.config.mjs`, `public/robots.txt`, and other canonical/SEO references together.

## SEO baseline

The shared layout defines page-specific titles and descriptions, canonical URLs, Open Graph and Twitter metadata. The sitemap endpoint emits an XML sitemap at build time; `robots.txt` points crawlers to it. The homepage adds SoftwareApplication structured data. This provides technical SEO foundations, not a guarantee of search rankings.

## Brand assets

The FlexiRule mark is represented as a compact vector in `public/flexirule-mark.svg`. The social card is maintained at `public/og/flexirule-social.svg`.
