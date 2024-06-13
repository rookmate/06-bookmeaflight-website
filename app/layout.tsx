import type { Metadata } from "next";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

import { IBM_Plex_Sans } from "next/font/google";
import { Chivo } from "next/font/google";

import "./globals.css";

const ibm_plex_sans = IBM_Plex_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm_plex_sans",
});
const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});

export const metadata: Metadata = {
  title: "Bookmeaflight",
  description: "Bookmeaflight portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibm_plex_sans.variable} ${chivo.variable} flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
