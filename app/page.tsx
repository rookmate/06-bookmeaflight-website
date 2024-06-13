import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full h-[100dvh] bg-[url('/tropical.png')] bg-cover bg-center">
          <div className="w-full h-full bg-gray-900/50 flex items-center justify-center">
            <div className="text-center space-y-4 px-4 md:px-6">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Bookmeaflight
              </h1>
              <p className="text-lg text-gray-300 max-w-[700px]">
                Travel & Lifestyle Content Creators
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
