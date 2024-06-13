import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import EmailIcon from "./EmailIcon";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-10 bg-gray-900/50 backdrop-blur-sm px-4 lg:px-6 h-10 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="mailto:hello@bookmeaflight.eu" aria-label="Email" prefetch={false}>
            <EmailIcon className="h-5 w-5 text-white hover:text-gray-200" />
          </Link>
          <Link href="https://instagram.com/bookmeaflight" aria-label="Instagram" prefetch={false}>
            <InstagramIcon className="h-5 w-5 text-white hover:text-gray-200" />
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          &copy; 2024 Bookmeaflight, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
