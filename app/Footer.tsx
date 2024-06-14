"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`fixed bottom-0 left-0 w-full bg-gray-900/50 backdrop-blur-sm px-4 lg:px-6 py-2 transition-transform duration-300 ${scrollDirection === "down" ? "translate-y-full" : "translate-y-0"}`}>
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-xs text-white text-center">
          &copy; 2024 Bookmeaflight, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
