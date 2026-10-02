import type { MetadataRoute } from "next"
import { siteUrl } from "./siteMetadata"

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL("/", siteUrl).href }]
}
