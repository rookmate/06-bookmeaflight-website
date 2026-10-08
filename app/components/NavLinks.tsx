"use client"

import { useHash } from "./useHash"
import { prefetchGallery } from "./prefetchGallery"

interface NavLinksProps {
  readonly links: readonly { readonly title: string; readonly id: string }[]
}

export default function NavLinks({ links }: NavLinksProps) {
  const hash = useHash()

  return (
    <nav aria-label="Primary" className="flex gap-x-5 sm:gap-x-6">
      {links.map((link) => (
        // Plain anchors, not Link, so the browser reports the hash change that opens the gallery.
        <a
          key={link.id}
          href={`/#${link.id}`}
          aria-current={hash === link.id ? "true" : undefined}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") prefetchGallery(link.id)
          }}
          onFocus={() => prefetchGallery(link.id)}
          className="inline-flex h-11 items-center text-sm font-medium text-stone-300 underline-offset-[6px] hover:text-white aria-[current=true]:text-white aria-[current=true]:underline"
        >
          {link.title}
        </a>
      ))}
    </nav>
  )
}
