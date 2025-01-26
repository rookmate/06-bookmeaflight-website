"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import PlaneIcon from "./components/PlaneIcon";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <button onClick={toggleMenu} className="text-white text-sm font-medium focus:outline-none">
          Portfolio
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full right-0 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center md:hidden">
          <Link href="/hotels" className="text-sm font-medium text-white hover:underline underline-offset-2 px-6 py-2 w-full text-center border-t border-gray-700" prefetch={false}>
            Hospitality
          </Link>
          <Link href="/brands" className="text-sm font-medium text-white hover:underline underline-offset-4 px-6 py-2 w-full text-center border-t border-gray-700" prefetch={false}>
            Fashion
          </Link>
          <Link href="/restaurants" className="text-sm font-medium text-white hover:underline underline-offset-4 px-6 py-2 w-full text-center border-t border-gray-700" prefetch={false}>
            Dining
          </Link>
        </div>
      )}
    </header>
  );
}
