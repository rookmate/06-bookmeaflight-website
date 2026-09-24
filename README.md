# Bookmeaflight Website

A modern portfolio website for Bookmeaflight, wellness content creators specializing in hospitality, fashion and dining experiences.

## About

Bookmeaflight is a wellness content creation brand that showcases curated experiences across three main categories:

- **Hospitality** - Luxury hotel and spa experiences
- **Fashion** - Accessories and lifestyle products
- **Dining** - Restaurant and culinary experiences

## Features

- **Responsive Design** - Parser-discoverable, art-directed hero imagery and mobile-first layouts
- **Image Gallery** - Visible, linked thumbnails even without JavaScript, plus a lightbox with previous/next controls, arrow-key navigation and display-sized images
- **Smooth Navigation** - Sticky site navigation across every portfolio route
- **Performance Optimized** - Bounded Cloudinary inputs, tightly sized Next Image output and compressed production-payload budgets
- **Modern UI** - Clean, minimalist design with Tailwind CSS
- **Search and Sharing** - Canonical URLs, Open Graph and Twitter previews, sitemap and robots.txt

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Fonts**: System font stacks (no external font fetch at build time)
- **Images**: Cloudinary for optimized image delivery
- **Icons**: Custom SVG components
- **Language**: TypeScript

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── EmailIcon.tsx
│   ├── GalleryGrid.tsx
│   ├── GalleryImage.tsx
│   ├── GalleryLightbox.tsx
│   ├── HeroImage.tsx
│   ├── InstagramIcon.tsx
│   ├── NavigationTiles.tsx
│   └── PlaneIcon.tsx
├── dining/             # Dining portfolio page
├── fashion/            # Fashion portfolio page
├── hospitality/        # Hospitality portfolio page
├── Header.tsx          # Navigation header
├── Footer.tsx          # Site footer
├── layout.tsx          # Root layout
└── page.tsx            # Homepage
```

## Getting Started

1. **Install dependencies**:

   ```bash
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

Install the test browsers once with `npx playwright install chromium webkit`. To run browser tests against a build you already made, use `npx playwright test`. Playwright starts and stops a local production server on port 3186. Tests cover keyboard focus, lightbox navigation and dismissal, image failures, responsive navigation, and galleries without JavaScript. Image responses are mocked for repeatable interaction tests; inspect the real photography separately when changing crops or image URLs.

GitHub Actions runs the dependency audit, lint, production build, static tests, type checks and browser tests on pushes and pull requests. Failed browser runs include screenshots and traces in the workflow artifacts.

The canonical production origin is `https://www.bookmeaflight.eu`, matching the live domain redirect. Update `app/siteMetadata.ts` if the production domain changes. The sitemap includes the homepage and each entry in `app/portfolioSections.ts`.

## Contact

- **Email**: hello@bookmeaflight.eu
- **Instagram**: [@bookmeaflight](https://instagram.com/bookmeaflight)

## Deployment

This project is optimized for deployment on Vercel. The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
