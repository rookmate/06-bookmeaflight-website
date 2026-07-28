"use client"

import Image from "next/image"
import { useCallback, useState } from "react"

export interface GalleryImageData {
  readonly src: string
  readonly alt: string
}

type GalleryImageStatus = "loading" | "loaded" | "error"

const GALLERY_IMAGE_SIZES = [
  "(min-width: 1536px) 300px",
  "(min-width: 1024px) 20vw",
  "(min-width: 768px) 25vw",
  "50vw",
].join(", ")

interface GalleryImageProps extends GalleryImageData {
  readonly preload?: boolean
}

export default function GalleryImage({
  src,
  alt,
  preload = false,
}: GalleryImageProps) {
  const [status, setStatus] = useState<GalleryImageStatus>("loading")
  const handleImageRef = useCallback((image: HTMLImageElement | null) => {
    if (!image?.complete) {
      return
    }

    setStatus(image.naturalWidth > 0 ? "loaded" : "error")
  }, [])

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
      {status === "loading" && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        </div>
      )}

      {status === "error" && (
        <div
          role="img"
          aria-label={`${alt}. Image unavailable.`}
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
        >
          <div className="p-2 text-center text-sm text-gray-400">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded bg-gray-300">
              <span className="text-xs" aria-hidden="true">
                📷
              </span>
            </div>
            <div>Image unavailable</div>
          </div>
        </div>
      )}

      {status !== "error" && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          sizes={GALLERY_IMAGE_SIZES}
          preload={preload}
          ref={handleImageRef}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  )
}
