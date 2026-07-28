import GalleryImage, { type GalleryImageData } from "./GalleryImage"

export type { GalleryImageData } from "./GalleryImage"

interface GalleryGridProps {
  readonly images: readonly GalleryImageData[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image, index) => (
          <GalleryImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            preload={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
