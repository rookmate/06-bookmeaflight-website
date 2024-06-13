import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import EmailIcon from "./EmailIcon";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full h-screen bg-[url('https://res.cloudinary.com/dnwbkkjpo/image/upload/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg')] bg-cover bg-center">
          <div className="w-full h-full bg-gray-900/50 flex flex-col items-center justify-center">
            <div className="text-center space-y-4 px-4 md:px-6">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Bookmeaflight
              </h1>
              <p className="text-lg text-gray-300 max-w-[700px]">
                Travel & Lifestyle Content Creators
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4"> {/* Added mt-4 for margin top */}
              <Link href="mailto:hello@bookmeaflight.eu" aria-label="Email" prefetch={false}>
                <EmailIcon className="h-5 w-5 md:h-7 md:w-7 text-white hover:text-gray-200" />
              </Link>
              <Link href="https://instagram.com/bookmeaflight" aria-label="Instagram" prefetch={false}>
                <InstagramIcon className="h-5 w-5 md:h-7 md:w-7 text-white hover:text-gray-200" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
