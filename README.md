# Bookmeaflight Website

A modern portfolio website for Bookmeaflight, wellness content creators specializing in hospitality, fashion and dining experiences.

## About

Bookmeaflight is a wellness content creation brand that showcases curated experiences across three main categories:

- **Hospitality** - Luxury hotel and spa experiences
- **Fashion** - Accessories and lifestyle products
- **Dining** - Restaurant and culinary experiences

## Features

- **Responsive Design** - Parser-discoverable, art-directed hero imagery and mobile-first layouts
- **One Page** - The homepage shows one cover photo per category, taken from `app/galleryImages.ts`. Choosing one opens its gallery underneath, and the old category URLs redirect to it. Every gallery is rendered in the HTML and native hash links work without JavaScript
- **Image Gallery** - Square thumbnails that open a lightbox over a blurred view of the page, with previous/next controls, arrow-key navigation and display-sized images
- **Smooth Navigation** - Sticky header links that open a category's gallery and mark it while it is open
- **Image Delivery** - A shared Cloudinary loader serves responsive images directly from the CDN. Hidden galleries use lazy loading; hovering or focusing a category preloads at most five thumbnails unless data saving is enabled
- **Modern UI** - Clean, minimalist design with Tailwind CSS
- **Search and Sharing** - Canonical URLs, Open Graph and Twitter previews, sitemap and robots.txt

## Tech Stack

- **Framework**: Next.js 16 with App Router and React 19
- **Styling**: Tailwind CSS
- **Fonts**: System font stacks (no external font fetch at build time)
- **Images**: Cloudinary via the custom Next Image loader in `app/cloudinary.ts`
- **Icons**: Custom SVG components
- **Language**: TypeScript

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── CategoryGalleries.tsx
│   ├── ChevronIcon.tsx
│   ├── EmailIcon.tsx
│   ├── GalleryGrid.tsx
│   ├── GalleryImage.tsx
│   ├── GalleryLightbox.tsx
│   ├── HeroImage.tsx
│   ├── InstagramIcon.tsx
│   ├── NavLinks.tsx
│   ├── PlaneIcon.tsx
│   └── useHash.ts
├── Header.tsx          # Navigation header
├── Footer.tsx          # Site footer
├── layout.tsx          # Root layout
└── page.tsx            # Homepage
```

## Getting Started

Use Node.js 24. The `.node-version` file selects it for fnm and GitHub Actions; Vercel uses the `engines.node` setting in `package.json`.

1. Install Node 24 and dependencies:

   ```bash
   fnm install
   fnm use
   npm ci
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks
- `npm test` - Build the production site and verify its static output and compressed payload budgets
- `npm run test:static` - Verify an existing production build
- `npm run test:e2e` - Build and run browser tests in desktop Chromium and mobile WebKit

Install the test browsers once with `npx playwright install chromium webkit`. To run browser tests against a build you already made, use `npx playwright test`. Playwright starts and stops a local production server on port 3186. Tests cover keyboard focus, lightbox navigation and dismissal, browser Back/Forward, image failures, bounded prefetching, responsive navigation, and galleries without JavaScript. Interaction tests mock image responses. `tests/e2e/image-delivery.spec.ts` separately checks real Cloudinary delivery of the hero, a thumbnail and an expanded image, so that test requires network access.

GitHub Actions runs the dependency audit, lint, production build, static tests, type checks and browser tests on pushes and pull requests. Failed browser runs include screenshots and traces in the workflow artifacts.

The canonical production origin is `https://www.bookmeaflight.eu`, matching the live domain redirect. Update `app/siteMetadata.ts` if the production domain changes. The sitemap lists the single canonical homepage. Each category's photos live in `app/galleryImages.ts` as versioned Cloudinary asset paths, and its first photo is the category cover. `app/cloudinary.ts` owns delivery widths, quality and crops; the site does not proxy these images through `/_next/image`.

### Dependency overrides

`postcss` stays pinned to the declared patched version. Tailwind 3 and `postcss-nested` still request `postcss-selector-parser` 6, so the override selects the upstream 7.1.6 fix for [GHSA-rj75-hqrm-r3gf](https://github.com/postcss/postcss-selector-parser/security/advisories/GHSA-rj75-hqrm-r3gf). The production CSS build and desktop/mobile browser tests verify compatibility. Remove the override when the dependency chain requests a patched version itself.

The existing `braces` override uses the pinned `@dieub/braces-depth-guard` fork. Keep its removal tied to an upstream fix and a clean audit; changing a package name alone is not evidence that a security issue is resolved.

## Contact

- **Email**: hello@bookmeaflight.eu
- **Instagram**: [@bookmeaflight](https://instagram.com/bookmeaflight)

## Deployment

This project is optimized for deployment on Vercel. The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
