import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import EmailIcon from "./EmailIcon";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-10 bg-gray-900/50 backdrop-blur-sm px-4 lg:px-6 h-10 flex items-center">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-xs text-white text-center">
          &copy; 2024 Bookmeaflight, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
