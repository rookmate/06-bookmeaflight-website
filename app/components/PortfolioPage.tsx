import GalleryGrid, { type GalleryImageData } from "./GalleryGrid"

interface PortfolioPageProps {
  readonly title: string
  readonly description: string
  readonly images: readonly GalleryImageData[]
}

export default function PortfolioPage({ title, description, images }: PortfolioPageProps) {
  return (
    <section className="bg-stone-100" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-4 pt-8 md:pt-10">
        <h1 id="portfolio-heading" className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">{description}</p>
      </div>
      <GalleryGrid images={images} />
    </section>
  )
}
