import type { Metadata } from "next"
import { cloudinaryImageUrl } from "./cloudinary"

export const siteUrl = "https://www.bookmeaflight.eu"

const shareImage = cloudinaryImageUrl({
  src: "v1718299505/homepage3a.jpg",
  width: 1200,
  quality: 85,
  format: "jpg",
  crop: { mode: "fill", width: 1200, height: 630 },
})

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "website",
      siteName: "Bookmeaflight",
      title,
      description,
      url: pathname,
      images: [{
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Bookmeaflight travel photography",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: shareImage, alt: "Bookmeaflight travel photography" }],
    },
  }
}
