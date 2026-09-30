"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinksProps {
  readonly links: readonly { readonly title: string; readonly href: string }[]
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav aria-label="Primary" className="flex gap-x-5 sm:gap-x-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className="inline-flex h-11 items-center text-sm font-medium text-stone-300 underline-offset-[6px] hover:text-white aria-[current=page]:text-white aria-[current=page]:underline"
          prefetch={false}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
