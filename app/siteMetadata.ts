import type { Metadata } from "next"

export const siteUrl = "https://www.bookmeaflight.eu"

const shareImage =
  "https://res.cloudinary.com/dnwbkkjpo/image/upload/c_fill,w_1200,h_630,g_auto,q_85,f_jpg/v1718299505/homepage3a.jpg"

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
