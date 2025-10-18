# Bookmeaflight Website

A modern portfolio website for Bookmeaflight, wellness content creators specializing in hospitality, fashion, and dining experiences.

## About

Bookmeaflight is a wellness content creation brand that showcases curated experiences across three main categories:
- **Hospitality** - Luxury hotel and spa experiences
- **Fashion** - Accessories and lifestyle products
- **Dining** - Restaurant and culinary experiences

## Features

- **Responsive Design** - Optimized for all device sizes with mobile-first approach
- **Image Gallery** - Masonry-style image grids showcasing portfolio work
- **Smooth Navigation** - Fixed header and footer with scroll-based visibility
- **Performance Optimized** - Cloudinary integration for optimized image delivery
- **Modern UI** - Clean, minimalist design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Fonts**: IBM Plex Sans & Chivo (Google Fonts)
- **Images**: Cloudinary for optimized image delivery
- **Icons**: Custom SVG components
- **Language**: TypeScript

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── EmailIcon.tsx
│   ├── ImageChapter.tsx
│   ├── InstagramIcon.tsx
│   ├── NavigationTiles.tsx
│   └── PlaneIcon.tsx
├── brands/             # Fashion portfolio page
├── hotels/             # Hospitality portfolio page
├── restaurants/        # Dining portfolio page
├── Header.tsx          # Navigation header
├── Footer.tsx          # Site footer
├── layout.tsx          # Root layout
└── page.tsx            # Homepage
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
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

## Contact

- **Email**: hello@bookmeaflight.eu
- **Instagram**: [@bookmeaflight](https://instagram.com/bookmeaflight)

## Deployment

This project is optimized for deployment on Vercel. The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
