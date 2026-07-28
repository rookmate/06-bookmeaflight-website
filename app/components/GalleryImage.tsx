"use client"

import Image from "next/image"
import { useState } from "react"

export interface GalleryImageData {
  readonly src: string
  readonly alt: string
}

type GalleryImageStatus = "loading" | "loaded" | "error"

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
  readonly onOpen: (previewSrc: string, aspectRatio: number) => void
}

export default function GalleryImage({
  src,
  alt,
  preload = false,
  onOpen,
}: GalleryImageProps) {
  const [status, setStatus] = useState<GalleryImageStatus>("loading")

  return (
    <button
      type="button"
      aria-label={`View ${alt} larger`}
      disabled={status !== "loaded"}
      onClick={(event) => {
        const image = event.currentTarget.querySelector("img")
        const previewSrc = image?.currentSrc ?? src
        const aspectRatio =
          image?.naturalWidth && image.naturalHeight
            ? image.naturalWidth / image.naturalHeight
            : 1

        onOpen(previewSrc, aspectRatio)
      }}
      className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg bg-gray-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-default"
    >
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
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </button>
  )
}
