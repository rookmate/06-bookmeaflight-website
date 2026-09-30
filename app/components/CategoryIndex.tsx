import Image from "next/image"
import Link from "next/link"
import { portfolioSections } from "../portfolioSections"

/** How many photos each row shows at its widest. Phones show three and tablets four. */
const FRAMES_PER_ROW = 5

const FRAME_IMAGE_SIZES = [
  "(min-width: 1152px) 144px",
  "(min-width: 1024px) calc(20vw - 86px)",
  "(min-width: 768px) calc(25vw - 85px)",
  "(min-width: 640px) calc(25vw - 16px)",
  "calc(33.33vw - 19px)",
].join(", ")

// The fourth frame needs a tablet's width and the fifth a desktop's.
const frameVisibility = ["", "", "", "hidden sm:block", "hidden lg:block"]

export default function CategoryIndex() {
  return (
    <nav
      aria-label="Portfolio categories"
      className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
    >
      <ul className="border-b border-stone-300">
        {portfolioSections.map((section) => (
          <li key={section.title} className="border-t border-stone-300">
            <Link
              href={section.href}
              className="group grid grid-cols-1 gap-x-8 gap-y-4 py-5 md:grid-cols-[13rem_minmax(0,1fr)] md:py-6 lg:grid-cols-[17rem_minmax(0,1fr)]"
              prefetch={false}
            >
              <div>
                <h2 className="whitespace-nowrap text-3xl font-semibold tracking-[-0.03em] text-stone-900 underline-offset-[6px] group-hover:underline lg:text-4xl">
                  {section.title}
                  <span aria-hidden="true"> →</span>
                </h2>
                <p className="mt-1 text-sm leading-6 text-stone-600 md:mt-2">
                  {section.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:gap-3 lg:grid-cols-5">
                {section.images.slice(0, FRAMES_PER_ROW).map((image, index) => (
                  <div
                    key={image.src}
                    className={`relative aspect-[3/4] overflow-hidden bg-stone-200 ${frameVisibility[index]}`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes={FRAME_IMAGE_SIZES}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
