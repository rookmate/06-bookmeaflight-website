"use client"

import { useEffect, useRef, useState } from "react"
import GalleryImage from "./GalleryImage"
import GalleryLightbox from "./GalleryLightbox"
import type { GalleryImageData } from "../galleryImages"

interface GalleryGridProps {
  readonly images: readonly GalleryImageData[]
  readonly active: boolean
}

interface LightboxSelection {
  readonly index: number
  readonly previewSrc?: string
}

export default function GalleryGrid({ images, active }: GalleryGridProps) {
  const [selection, setSelection] = useState<LightboxSelection | null>(null)
  const previews = useRef(new Map<string, string>())
  const gridRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set())

  useEffect(() => {
    const grid = gridRef.current
    if (!active || !grid) return
    const targets = Array.from(grid.children)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (!visible.length) return
      setLoaded((previous) => new Set([...previous, ...visible.map((entry) => targets.indexOf(entry.target))]))
      for (const entry of visible) observer.unobserve(entry.target)
    }, { rootMargin: "160px 0px" })
    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [active])
  // A closing drawer can retain its photos, but never its modal or scroll lock.
  if (!active && selection) setSelection(null)

  function selectImage(index: number) {
    const nextIndex = (index + images.length) % images.length
    setSelection({
      index: nextIndex,
      previewSrc: previews.current.get(images[nextIndex].src),
    })
  }

  return (
    <>
      <div ref={gridRef} className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image, index) => (
          <GalleryImage
            key={image.src}
            {...image}
            load={loaded.has(index)}
            onOpen={() => selectImage(index)}
            onPreviewLoad={(preview) => previews.current.set(image.src, preview)}
          />
        ))}
      </div>

      {active && selection && (
        <GalleryLightbox
          image={images[selection.index]}
          previewSrc={selection.previewSrc}
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
