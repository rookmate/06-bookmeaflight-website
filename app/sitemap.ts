import type { MetadataRoute } from "next"
import { portfolioSections } from "./portfolioSections"
import { siteUrl } from "./siteMetadata"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...portfolioSections.map((section) => section.href)].map((pathname) => ({
    url: new URL(pathname, siteUrl).href,
  }))
}
