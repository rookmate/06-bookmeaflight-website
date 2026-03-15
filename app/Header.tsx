"use client";

import Link from "next/link";
import PlaneIcon from "./components/PlaneIcon";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-stone-950 px-5 py-3 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-white md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="flex items-center justify-center text-white"
          prefetch={false}
        >
          <PlaneIcon className="h-5 w-5 text-white" />
          <span className="ml-2 text-sm font-medium tracking-[-0.02em]">Bookmeaflight</span>
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/hospitality" className="text-sm font-medium text-stone-200 hover:text-white" prefetch={false}>
            Hospitality
          </Link>
          <Link href="/fashion" className="text-sm font-medium text-stone-200 hover:text-white" prefetch={false}>
            Fashion
          </Link>
          <Link href="/dining" className="text-sm font-medium text-stone-200 hover:text-white" prefetch={false}>
            Dining
          </Link>
        </nav>
      </div>
    </header>
  )
}
