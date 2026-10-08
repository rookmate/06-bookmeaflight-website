"use client"

import { useRef, useState } from "react"
import GalleryImage, {
  type GalleryPreview,
} from "./GalleryImage"
import GalleryLightbox from "./GalleryLightbox"
import type { GalleryImageData } from "../galleryImages"

interface GalleryGridProps {
  readonly images: readonly GalleryImageData[]
  readonly active: boolean
}

interface LightboxSelection {
  readonly index: number
  readonly preview?: GalleryPreview
}

export default function GalleryGrid({ images, active }: GalleryGridProps) {
  const [selection, setSelection] = useState<LightboxSelection | null>(null)
  const previews = useRef(new Map<string, GalleryPreview>())
  // A closing drawer can retain its photos, but never its modal or scroll lock.
  if (!active && selection) setSelection(null)

  function selectImage(index: number) {
    const nextIndex = (index + images.length) % images.length
    setSelection({
      index: nextIndex,
      preview: previews.current.get(images[nextIndex].src),
    })
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image, index) => (
          <GalleryImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            onOpen={() => selectImage(index)}
            onPreviewLoad={(preview) => previews.current.set(image.src, preview)}
          />
        ))}
      </div>

      {active && selection && (
        <GalleryLightbox
          image={images[selection.index]}
          preview={selection.preview}
          index={selection.index}
          count={images.length}
          onPrevious={() => selectImage(selection.index - 1)}
          onNext={() => selectImage(selection.index + 1)}
          onClose={() => setSelection(null)}
        />
      )}
    </>
  )
}
