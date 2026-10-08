"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { portfolioSections } from "../portfolioSections"
import ChevronIcon from "./ChevronIcon"
import GalleryGrid from "./GalleryGrid"
import { clearHash, useHash } from "./useHash"
import { prefetchGallery } from "./prefetchGallery"

const COVER_IMAGE_SIZES = [
  "(min-width: 1152px) 347px",
  "(min-width: 768px) calc(33.33vw - 32px)",
  "calc(33.33vw - 19px)",
].join(", ")

/** How long the gallery takes to open. Keep in step with .gallery-drawer in globals.css. */
const DRAWER_MS = 500

/** Three photos in a row, one per category. The chosen one opens its gallery underneath. */
export default function CategoryGalleries() {
  // The open category lives in the URL hash, so the header links and the back button work too.
  const hash = useHash()
  const openSection = portfolioSections.find((section) => section.id === hash)
  // The last gallery stays rendered so the drawer has something to close over.
  const [shownSection, setShownSection] = useState(openSection)
  if (openSection && openSection !== shownSection) setShownSection(openSection)

  const openId = openSection?.id
  useEffect(() => {
    const cover = openId && document.getElementById(`${openId}-cover`)
    if (cover) return glideTo(cover)
  }, [openId])

  return (
    <div
      className="portfolio mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
      data-enhanced={hash === null ? undefined : ""}
    >
      <nav aria-label="Portfolio categories" className="grid grid-cols-3 gap-2 md:gap-4">
        {portfolioSections.map((section) => {
          const isOpen = section === openSection
          return (
            <a
              key={section.id}
              id={`${section.id}-cover`}
              href={`#${section.id}`}
              aria-expanded={hash === null ? undefined : isOpen}
              aria-controls={section.id}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") prefetchGallery(section.id)
              }}
              onFocus={() => prefetchGallery(section.id)}
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                if (!isOpen) return
                event.preventDefault()
                clearHash()
              }}
              className={`group block scroll-mt-16 transition-opacity duration-300 ${openSection && !isOpen ? "opacity-50 hover:opacity-100" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 md:aspect-[4/5]">
                <Image
                  src={section.images[0].src}
                  alt=""
                  fill
                  sizes={COVER_IMAGE_SIZES}
                  className="object-cover"
                />
              </div>
              <h2
                id={`${section.id}-label`}
                className={`mt-2 flex items-center justify-between text-base font-semibold tracking-[-0.03em] text-stone-900 underline-offset-[6px] group-hover:underline sm:text-2xl md:mt-3 lg:text-3xl ${isOpen ? "underline" : ""}`}
              >
                {section.title}
                <ChevronIcon
                  className={`hidden h-6 w-6 transition-transform duration-300 motion-reduce:transition-none sm:block ${isOpen ? "rotate-180" : ""}`}
                />
              </h2>
            </a>
          )
        })}
      </nav>

      <div
        id="gallery-drawer"
        className="gallery-drawer"
        data-open={openSection ? "" : undefined}
        inert={hash !== null && !openSection}
      >
        {/* The clip box is 4px wider and taller than the grid so focus rings on the edge photos show. */}
        <div className="-mx-1 -mb-1 overflow-hidden">
          {portfolioSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-label`}
              data-shown={section === shownSection ? "" : undefined}
              className="gallery-panel gallery-fade scroll-mt-16 px-1 pb-1 pt-6 md:pt-8"
            >
              <div className="border-t border-stone-300 pt-6 md:pt-8">
                <GalleryGrid images={section.images} active={section === openSection} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Scrolls the window until `element` sits at its scroll margin, in step with the drawer opening.
 * scrollIntoView cannot do this, because it settles on a destination before the page is long
 * enough to reach it. Returns a function that stops the scroll.
 */
function glideTo(element: HTMLElement) {
  const from = window.scrollY
  const to =
    from +
    element.getBoundingClientRect().top -
    parseFloat(getComputedStyle(element).scrollMarginTop)

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: to, behavior: "instant" })
    return
  }

  const startedAt = performance.now()
  const controller = new AbortController()
  const stop = () => controller.abort()
  // The reader's own scrolling wins.
  window.addEventListener("wheel", stop, { signal: controller.signal, passive: true })
  window.addEventListener("touchstart", stop, { signal: controller.signal, passive: true })

  function step(now: number) {
    if (controller.signal.aborted) return
    const progress = Math.min(1, (now - startedAt) / DRAWER_MS)
    // The same ease-in-out as the drawer, so the page never asks for more room than has opened.
    const eased =
      progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
    window.scrollTo({ top: from + (to - from) * eased, behavior: "instant" })
    if (progress < 1) requestAnimationFrame(step)
    else stop()
  }
  requestAnimationFrame(step)

  return stop
}
