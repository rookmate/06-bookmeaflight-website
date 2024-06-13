import Link from "next/link";
import PlaneIcon from "./PlaneIcon.tsx";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-gray-900/50 backdrop-blur-sm px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <PlaneIcon className="h-6 w-6 text-white" />
        <span className="sr-only">Portfolio</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/restaurants"
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          prefetch={false}
        >
          Restaurants
        </Link>
        <Link
          href="/hotels"
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          prefetch={false}
        >
          Hotels
        </Link>
        <Link
          href="/travel"
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          prefetch={false}
        >
          Travel
        </Link>
      </nav>
    </header>
  );
}
