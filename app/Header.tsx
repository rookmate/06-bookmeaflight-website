import Link from "next/link"
import NavLinks from "./components/NavLinks"
import PlaneIcon from "./components/PlaneIcon"
import { portfolioSections } from "./portfolioSections"

const links = portfolioSections.map(({ title, id }) => ({ title, id }))

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-stone-950 px-5 md:px-8 lg:px-10">
      {/* One row at every width, 44px tall, so the sticky header stays thin on phones too. */}
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 text-white">
        <Link
          href="/"
          className="flex h-11 items-center text-white"
          prefetch={false}
        >
          <PlaneIcon className="h-5 w-5 text-white" />
          {/* Too narrow for the name and three links below 380px, so the icon stands in. */}
          <span className="ml-2 text-sm font-medium tracking-[-0.02em] max-[379px]:sr-only">
            Bookmeaflight
          </span>
        </Link>

        <NavLinks links={links} />
      </div>
    </header>
  )
}
