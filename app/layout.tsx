import type { Metadata } from "next"
import Header from "./Header.tsx"
import Footer from "./Footer.tsx"

import "./globals.css"

export const metadata: Metadata = {
  title: "Bookmeaflight",
  description: "Bookmeaflight portfolio website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-stone-50 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
