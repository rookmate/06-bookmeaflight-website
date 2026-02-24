import type { Metadata } from "next";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmeaflight",
  description: "Bookmeaflight portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
