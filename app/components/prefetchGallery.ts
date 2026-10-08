import { preload } from "react-dom"
import { portfolioSections } from "../portfolioSections"
import { galleryThumbnailProps } from "../galleryThumbnails"

/** Warm at most one desktop row on intent, using the rendered responsive sources. */
export function prefetchGallery(id: string) {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return

  const photos = portfolioSections.find((section) => section.id === id)?.images ?? []
  for (const image of photos.slice(0, 5)) {
    const photo = galleryThumbnailProps(image)
    preload(photo.src, {
      as: "image",
      imageSrcSet: photo.srcSet,
      imageSizes: photo.sizes,
      fetchPriority: "low",
    })
  }
}
