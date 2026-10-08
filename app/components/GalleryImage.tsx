"use client"

import { useState } from "react"
import { cloudinaryImageUrl } from "../cloudinary"
import { galleryThumbnailProps } from "../galleryThumbnails"
import type { GalleryImageData } from "../galleryImages"

interface GalleryImageProps extends GalleryImageData {
  readonly load: boolean
  readonly onOpen: () => void
  readonly onPreviewLoad: (src: string) => void
}

export default function GalleryImage({
  src,
  alt,
  load,
  onOpen,
  onPreviewLoad,
}: GalleryImageProps) {
  const [hasError, setHasError] = useState(false)
  const imageProps = galleryThumbnailProps({ src, alt })

  return (
    <a
      href={cloudinaryImageUrl({ src, width: 2400 })}
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

      {/* Native lazy loading can fetch the entire gallery. With scripting enabled,
          the grid observer admits images only near the viewport. */}
      {load && !hasError && (
        // eslint-disable-next-line @next/next/no-img-element -- Responsive props come from next/image, shared with prefetch and the no-JS fallback.
        <img
          {...imageProps}
          alt={alt}
          onLoad={(event) => onPreviewLoad(event.currentTarget.currentSrc)}
          onError={() => setHasError(true)}
        />
      )}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Keep native images and links usable without JavaScript. */}
        <img {...imageProps} alt={alt} />
      </noscript>
    </a>
  )
}
