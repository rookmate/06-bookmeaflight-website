"use client"

import { useState } from "react"
import GalleryImage, { type GalleryImageData } from "./GalleryImage"
import GalleryLightbox from "./GalleryLightbox"

export type { GalleryImageData } from "./GalleryImage"

interface GalleryGridProps {
  readonly images: readonly GalleryImageData[]
}

interface LightboxSelection {
  readonly image: GalleryImageData
  readonly previewSrc: string
  readonly aspectRatio: number
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selection, setSelection] = useState<LightboxSelection | null>(null)

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
              onOpen={(previewSrc, aspectRatio) =>
                setSelection({ image, previewSrc, aspectRatio })
              }
            />
          ))}
        </div>
      </div>

      {selection && (
        <GalleryLightbox
          src={selection.image.src}
          previewSrc={selection.previewSrc}
          alt={selection.image.alt}
          aspectRatio={selection.aspectRatio}
          onClose={() => setSelection(null)}
        />
      )}
    </>
  )
}
