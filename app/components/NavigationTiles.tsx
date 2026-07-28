import Image from "next/image"
import { portfolioSections } from "../portfolioSections"

const TILE_IMAGE_SIZES = [
  "(min-width: 1152px) 357px",
  "(min-width: 768px) calc(33vw - 27px)",
  "calc(100vw - 40px)",
].join(", ")

export default function NavigationTiles() {
  return (
    <nav
      aria-label="Portfolio categories"
      className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
    >
      <div className="grid gap-px border border-stone-300 bg-stone-300 md:grid-cols-3">
        {portfolioSections.map((tile) => (
          <a
            key={tile.title}
            href={tile.href}
            className="group flex h-full flex-col bg-stone-100"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
              <Image
                src={tile.imageSrc}
                alt=""
                fill
                sizes={TILE_IMAGE_SIZES}
                className="object-cover transition-[filter] duration-200 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,23,0.04),rgba(28,25,23,0.18)_52%,rgba(28,25,23,0.54))]" />
            </div>

            <div className="flex flex-1 items-start justify-between gap-5 border-t border-stone-300 px-5 py-4">
              <div className="space-y-1.5">
                <h2 className="text-lg font-semibold tracking-[-0.03em] text-stone-900">
                  {tile.title}
                </h2>
                <p className="max-w-xs text-sm leading-6 text-stone-600">
                  {tile.description}
                </p>
              </div>
              <span className="pt-0.5 text-sm text-stone-500 transition-colors duration-200 group-hover:text-stone-900">
                View
              </span>
            </div>
          </a>
        ))}
      </div>
    </nav>
  )
}
