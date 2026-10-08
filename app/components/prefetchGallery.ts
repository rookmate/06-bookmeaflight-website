import { preload } from "react-dom"

/** Warm at most one desktop row on intent, using the rendered responsive sources. */
export function prefetchGallery(id: string) {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return

  const photos = document.getElementById(id)?.querySelectorAll("img")
  for (const photo of Array.from(photos ?? []).slice(0, 5)) {
    preload(photo.src, {
      as: "image",
      imageSrcSet: photo.srcset,
      imageSizes: photo.sizes,
      fetchPriority: "low",
    })
  }
}
