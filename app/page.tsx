import NavigationTiles from "./components/NavigationTiles"
import InstagramIcon from "./components/InstagramIcon"
import EmailIcon from "./components/EmailIcon"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-stone-900">
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-stone-300 bg-stone-950 text-stone-50">
          <div className="responsive-bg hero-photo absolute inset-0" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.18),rgba(23,23,23,0.42)_44%,rgba(23,23,23,0.82))]" />

          <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 md:px-8 lg:px-10 lg:pb-20">
            <div className="max-w-3xl space-y-6">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Bookmeaflight
              </h1>
              <p className="max-w-2xl text-base leading-7 text-stone-200 sm:text-lg">
                Travel-led visual storytelling for hospitality, fashion and dining brands that want atmosphere to feel lived in.
              </p>

              <div className="grid gap-6 border-t border-white/20 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <p className="max-w-xl text-sm leading-6 text-stone-300 sm:text-base">
                  The portfolio moves between destinations, interiors, objects and people so each brand sees how place and product hold together in a natural, cohesive frame.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@bookmeaflight.eu"
                    className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-stone-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-label="Email Bookmeaflight"
                  >
                    <EmailIcon className="h-4 w-4" />
                    <span>Email</span>
                  </a>
                  <a
                    href="https://instagram.com/bookmeaflight"
                    className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-stone-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-label="Visit Bookmeaflight on Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex-shrink-0">
          <NavigationTiles />
        </div>
      </main>
    </div>
  )
}
