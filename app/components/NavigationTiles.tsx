import Link from "next/link"

const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto";

const tiles = [
  {
    title: "Hospitality",
    href: "/hotels",
    bgImage: `${cloudinaryBaseURL}/v1737809793/sof-room.jpg`,
  },
  {
    title: "Fashion",
    href: "/brands",
    bgImage: `${cloudinaryBaseURL}/v1737806060/mp-mustard-purse2.jpg`,
  },
  {
    title: "Dining",
    href: "/restaurants",
    bgImage: `${cloudinaryBaseURL}/v1737841790/da-salad.jpg`,
  },
]

export default function NavigationTiles() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {tiles.map((tile) => (
        <Link
          key={tile.title}
          href={tile.href}
          className="relative h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          prefetch={false}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tile.bgImage})` }} />
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-white">{tile.title}</h2>
          </div>
        </Link>
      ))}
    </section>
  )
}
