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
  readonly onOpen: (previewSrc: string) => void
}

export default function GalleryImage({
  src,
  alt,
  preload = false,
  onOpen,
}: GalleryImageProps) {
  const [status, setStatus] = useState<GalleryImageStatus>("loading")
  const handleImageRef = useCallback((image: HTMLImageElement | null) => {
    if (!image?.complete) {
      return
    }

    setStatus(image.naturalWidth > 0 ? "loaded" : "error")
  }, [])

  return (
    <button
      type="button"
      aria-label={`View ${alt} larger`}
      disabled={status !== "loaded"}
      onClick={(event) => {
        const previewSrc =
          event.currentTarget.querySelector("img")?.currentSrc ?? src

        onOpen(previewSrc)
      }}
      className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg bg-gray-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-default"
    >
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
    </button>
  )
}
