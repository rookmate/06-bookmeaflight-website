"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import PlaneIcon from "./components/PlaneIcon";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
        setIsMenuOpen(false);
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-10 bg-gray-900/50 backdrop-blur-sm px-4 lg:px-6 h-10 flex items-center transition-transform duration-300 ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`}>
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <PlaneIcon className="h-5 w-5 text-white" />
        <span className="ml-2 text-white text-sm font-medium">Bookmeaflight</span>
      </Link>

      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link href="/hotels" className="text-sm font-medium text-white hover:underline underline-offset-4" prefetch={false}>
          Hotels
        </Link>
        <Link href="/brands" className="text-sm font-medium text-white hover:underline underline-offset-4" prefetch={false}>
          Fashion
        </Link>
        <Link href="/restaurants" className="text-sm font-medium text-white hover:underline underline-offset-4" prefetch={false}>
          Restaurants
        </Link>
      </nav>

      {/* Dropdown Menu for Mobile */}
      <div className="ml-auto md:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-portfolio-menu"
          aria-label="Toggle portfolio menu"
          className="text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Portfolio
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-portfolio-menu"
          className="absolute right-0 top-full flex flex-col items-center bg-gray-900/50 backdrop-blur-sm md:hidden"
        >
          <Link
            href="/hotels"
            className="w-full border-t border-gray-700 px-6 py-2 text-center text-sm font-medium text-white hover:underline underline-offset-2"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            Hospitality
          </Link>
          <Link
            href="/brands"
            className="w-full border-t border-gray-700 px-6 py-2 text-center text-sm font-medium text-white hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            Fashion
          </Link>
          <Link
            href="/restaurants"
            className="w-full border-t border-gray-700 px-6 py-2 text-center text-sm font-medium text-white hover:underline underline-offset-4"
            prefetch={false}
            onClick={() => setIsMenuOpen(false)}
          >
            Dining
          </Link>
        </div>
      )}
    </header>
  );
}
