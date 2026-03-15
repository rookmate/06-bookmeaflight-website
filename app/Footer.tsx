export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-stone-950 px-5 py-4 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <p className="text-center text-[11px] text-stone-300">
          &copy; {currentYear} Bookmeaflight, All rights reserved.
        </p>
      </div>
    </footer>
  )
}
