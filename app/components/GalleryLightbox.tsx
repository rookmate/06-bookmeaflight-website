"use client"

import { useEffect, useRef, useState } from "react"

const THUMBNAIL_TRANSFORMATION = "c_limit,w_1200,q_auto,f_auto"
const LIGHTBOX_WIDTHS = [1200, 1600, 2400] as const

interface GalleryLightboxProps {
  readonly src: string
  readonly previewSrc: string
  readonly alt: string
  readonly aspectRatio: number
  readonly onClose: () => void
}

function getLightboxSrc(src: string, width: number) {
  return src.replace(
    THUMBNAIL_TRANSFORMATION,
    `c_limit,w_${width},q_auto,f_auto`,
  )
}

function getLightboxWidth(aspectRatio: number) {
  const padding = window.innerWidth >= 768 ? 64 : 32
  const availableWidth = window.innerWidth - padding
  const availableHeight = window.innerHeight - padding
  const renderedWidth = Math.min(
    availableWidth,
    availableHeight * aspectRatio,
  )
  const requiredWidth = Math.ceil(renderedWidth * window.devicePixelRatio)

  return (
    LIGHTBOX_WIDTHS.find((width) => width >= requiredWidth) ??
    LIGHTBOX_WIDTHS[LIGHTBOX_WIDTHS.length - 1]
  )
}

export default function GalleryLightbox({
  src,
  previewSrc,
  alt,
  aspectRatio,
  onClose,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isHighResolutionLoaded, setIsHighResolutionLoaded] = useState(false)
  const highResolutionSrc = getLightboxSrc(
    src,
    getLightboxWidth(aspectRatio),
  )

  useEffect(() => {
    const dialog = dialogRef.current
    const root = document.documentElement
    const previousOverflow = root.style.overflow

    root.style.overflow = "hidden"

    if (dialog && !dialog.open) {
      dialog.showModal()
    }

    return () => {
      root.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Expanded view: ${alt}`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close()
        }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent p-4 backdrop:bg-stone-950/80 backdrop:backdrop-blur-sm md:p-8"
    >
      <button
        type="button"
        autoFocus
        aria-label="Close expanded image"
        onClick={() => dialogRef.current?.close()}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-md border border-white/30 bg-stone-950/60 text-white transition-colors duration-150 hover:bg-stone-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 md:right-6 md:top-6"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>

      <div className="pointer-events-none relative h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- Reuses the optimizer URL already loaded by the selected thumbnail. */}
        <img
          src={previewSrc}
          alt=""
          aria-hidden="true"
          className={`pointer-events-auto absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-200 ${
            isHighResolutionLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary serves one source matched to the selected image geometry. */}
        <img
          src={highResolutionSrc}
          alt={alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setIsHighResolutionLoaded(true)}
          className={`pointer-events-auto absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-200 ${
            isHighResolutionLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </dialog>
  )
}
