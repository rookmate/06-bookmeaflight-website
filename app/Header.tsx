import Link from "next/link"
import PlaneIcon from "./components/PlaneIcon"

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-stone-950 px-5 py-3 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 text-white">
        <Link
          href="/"
          className="order-1 flex min-h-11 items-center text-white"
          prefetch={false}
        >
          <PlaneIcon className="h-5 w-5 text-white" />
          <span className="ml-2 text-sm font-medium tracking-[-0.02em]">
            Bookmeaflight
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="order-3 flex w-full flex-wrap justify-center gap-x-6 md:order-2 md:w-auto"
        >
          <Link
            href="/hospitality"
            className="inline-flex min-h-11 items-center text-sm font-medium text-stone-200 hover:text-white"
            prefetch={false}
          >
            Hospitality
          </Link>
          <Link
            href="/fashion"
            className="inline-flex min-h-11 items-center text-sm font-medium text-stone-200 hover:text-white"
            prefetch={false}
          >
            Fashion
          </Link>
          <Link
            href="/dining"
            className="inline-flex min-h-11 items-center text-sm font-medium text-stone-200 hover:text-white"
            prefetch={false}
          >
            Dining
          </Link>
        </nav>
        <a
          href="mailto:hello@bookmeaflight.eu"
          className="order-2 inline-flex min-h-11 items-center text-sm font-medium underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:order-3"
        >
          Discuss a project
        </a>
      </div>
    </header>
  )
}
