import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="fixed top-0 left-0 w-full z-10 bg-gray-900/50 backdrop-blur-sm px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-white" />
          <span className="sr-only">Portfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium text-white hover:underline underline-offset-4" prefetch={false}>
            Restaurants
          </Link>
          <Link href="#" className="text-sm font-medium text-white hover:underline underline-offset-4" prefetch={false}>
            Hotels
          </Link>
          <Link href="#" className="text-sm font-medium text-white hover:underline underline-offset-4" prefetch={false}>
            Brands
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full h-[100dvh] bg-[url('/hero-image.jpg')] bg-cover bg-center">
          <div className="w-full h-full bg-gray-900/50 flex items-center justify-center">
            <div className="text-center space-y-4 px-4 md:px-6">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">Discover the Best</h1>
              <p className="text-lg text-gray-300 max-w-[700px]">
                Explore our curated collection of top-rated restaurants, hotels, and brands.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Explore Restaurants
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Explore Hotels
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
