"use client"

import Image from "next/image"
import { useState } from "react"

export interface GalleryImageData {
  readonly src: string
  readonly alt: string
}

export interface GalleryPreview {
  readonly src: string
  readonly aspectRatio: number
}

const GALLERY_IMAGE_SIZES = [
  "(min-width: 1536px) 261px",
  "(min-width: 1280px) 237px",
  "(min-width: 1024px) 186px",
  "(min-width: 768px) 172px",
  "(min-width: 640px) 296px",
  "45vw",
].join(", ")

interface GalleryImageProps extends GalleryImageData {
  readonly preload?: boolean
  readonly onOpen: () => void
  readonly onPreviewLoad: (preview: GalleryPreview) => void
}

export default function GalleryImage({
  src,
  alt,
  preload = false,
  onOpen,
  onPreviewLoad,
}: GalleryImageProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <a
      href={src}
      aria-label={`View ${alt} larger`}
      aria-haspopup="dialog"
      onClick={(event) => {
        if (
          event.button !== 0 || event.metaKey || event.ctrlKey ||
          event.shiftKey || event.altKey
        ) return
        event.preventDefault()
        onOpen()
      }}
      className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg bg-stone-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2"
    >
      {hasError && (
        <div
          role="img"
          aria-label={`${alt}. Image unavailable.`}
          className="absolute inset-0 flex items-center justify-center bg-stone-200"
        >
          <div className="p-3 text-center text-sm text-stone-700">
            <div>Image unavailable</div>
            <div className="mt-1 underline underline-offset-4">Try full-size image</div>
          </div>
        </div>
      )}

      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={GALLERY_IMAGE_SIZES}
          preload={preload}
          onLoad={(event) => {
            const image = event.currentTarget
            onPreviewLoad({
              src: image.currentSrc,
              aspectRatio: image.naturalWidth / image.naturalHeight,
            })
          }}
          onError={() => setHasError(true)}
        />
      )}
    </a>
  )
}
