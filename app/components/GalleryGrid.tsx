"use client"

import { useRef, useState } from "react"
import GalleryImage, {
  type GalleryImageData,
  type GalleryPreview,
} from "./GalleryImage"
import GalleryLightbox from "./GalleryLightbox"

export type { GalleryImageData } from "./GalleryImage"

interface GalleryGridProps {
  readonly images: readonly GalleryImageData[]
}

interface LightboxSelection {
  readonly index: number
  readonly preview?: GalleryPreview
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selection, setSelection] = useState<LightboxSelection | null>(null)
  const previews = useRef(new Map<string, GalleryPreview>())

  function selectImage(index: number) {
    const nextIndex = (index + images.length) % images.length
    setSelection({
      index: nextIndex,
      preview: previews.current.get(images[nextIndex].src),
    })
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, index) => (
            <GalleryImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              preload={index === 0}
              onOpen={() => selectImage(index)}
              onPreviewLoad={(preview) => previews.current.set(image.src, preview)}
            />
          ))}
        </div>
      </div>

      {selection && (
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
