"use client"

import { useEffect, useRef, useState } from "react"
import type { GalleryImageData, GalleryPreview } from "./GalleryImage"

const LIGHTBOX_WIDTHS = [1200, 1600, 2400] as const
const controlClassName =
  "pointer-events-auto inline-flex h-11 items-center justify-center rounded-md border border-white/30 px-4 text-sm text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

interface GalleryLightboxProps {
  readonly image: GalleryImageData
  readonly preview?: GalleryPreview
  readonly index: number
  readonly count: number
  readonly onPrevious: () => void
  readonly onNext: () => void
  readonly onClose: () => void
}

function getViewport() {
  const padding = window.innerWidth >= 768 ? 64 : 32
  return {
    width: window.innerWidth - padding,
    // Two 44px control rows, two 16px gaps, and the dialog padding.
    height: Math.max(1, window.innerHeight - padding - 120),
    pixelRatio: window.devicePixelRatio,
  }
}

export default function GalleryLightbox({
  image,
  preview,
  index,
  count,
  onPrevious,
  onNext,
  onClose,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [viewport, setViewport] = useState(getViewport)

  useEffect(() => {
    const dialog = dialogRef.current
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const updateViewport = () => setViewport(getViewport())

    root.style.overflow = "hidden"
    dialog?.showModal()
    window.addEventListener("resize", updateViewport)

    return () => {
      root.style.overflow = previousOverflow
      window.removeEventListener("resize", updateViewport)
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Expanded view: ${image.alt}`}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return
        if (event.key === "Tab") {
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "button, a[href]",
          )
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
          return
        }
        if (event.shiftKey || count < 2) return
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault()
          if (event.key === "ArrowLeft") onPrevious()
          else onNext()
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none flex-col gap-4 overflow-hidden border-0 bg-transparent p-4 text-white backdrop:bg-stone-950 open:flex md:p-8"
    >
      <div className="pointer-events-none flex h-11 shrink-0 items-center justify-between gap-4">
        <p role="status" aria-atomic="true" className="text-sm text-stone-200">
          Image {index + 1} of {count}
        </p>
        <button
          type="button"
          autoFocus
          aria-label="Close expanded image"
          onClick={() => dialogRef.current?.close()}
          className={controlClassName}
        >
          Close
        </button>
      </div>

      <div className="pointer-events-none flex min-h-0 flex-1 items-center justify-center">
        <LightboxPhoto
          key={image.src}
          image={image}
          preview={preview}
          viewport={viewport}
        />
      </div>

      <div className="pointer-events-none flex h-11 shrink-0 items-center justify-center gap-3">
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={onPrevious}
              className={controlClassName}
              aria-label="Previous image"
            >
              <span aria-hidden="true" className="mr-2">←</span>
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className={controlClassName}
              aria-label="Next image"
            >
              Next <span aria-hidden="true" className="ml-2">→</span>
            </button>
          </>
        )}
      </div>
    </dialog>
  )
}

interface LightboxPhotoProps {
  readonly image: GalleryImageData
  readonly preview?: GalleryPreview
  readonly viewport: ReturnType<typeof getViewport>
}

function LightboxPhoto({ image, preview, viewport }: LightboxPhotoProps) {
  const [aspectRatio, setAspectRatio] = useState(preview?.aspectRatio ?? null)
  const [previewFailed, setPreviewFailed] = useState(false)
  const [loadedSrc, setLoadedSrc] = useState("")
  const [failedSrc, setFailedSrc] = useState("")
  const ratio = aspectRatio ?? 1
  const width = Math.min(viewport.width, viewport.height * ratio)
  const sourceWidth =
    LIGHTBOX_WIDTHS.find((size) => size >= width * viewport.pixelRatio) ?? 2400
  const fullSrc = image.src.replace(
    "c_limit,w_1200,q_auto,f_auto",
    `c_limit,w_${sourceWidth},q_auto,f_auto`,
  )
  const isLoaded = loadedSrc === fullSrc
  const hasFailed = failedSrc === fullSrc

  return (
    <div
      className="pointer-events-auto relative max-h-full max-w-full"
      style={{ width, height: width / ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Reuse the loaded thumbnail while the display-sized Cloudinary image loads. */}
      <img
        src={preview?.src ?? image.src}
        alt=""
        aria-hidden="true"
        onLoad={(event) => {
          setAspectRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)
        }}
        onError={() => {
          setPreviewFailed(true)
          setAspectRatio(1)
        }}
        className={`absolute inset-0 h-full w-full object-contain ${isLoaded || previewFailed ? "invisible" : ""}`}
      />
      {aspectRatio !== null && (
        // eslint-disable-next-line @next/next/no-img-element -- Cloudinary serves a bounded image matched to the available space and pixel density.
        <img
          src={fullSrc}
          alt={image.alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setLoadedSrc(fullSrc)}
          onError={() => setFailedSrc(fullSrc)}
          className={`absolute inset-0 h-full w-full object-contain ${isLoaded ? "" : "invisible"}`}
        />
      )}
      {hasFailed && (
        <p role="status" className="absolute inset-x-0 bottom-0 bg-stone-950/90 p-3 text-center text-sm">
          {previewFailed ? "Image unavailable." : "Full-size image unavailable."}{" "}
          <a
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Open image directly
          </a>
        </p>
      )}
    </div>
  )
}
