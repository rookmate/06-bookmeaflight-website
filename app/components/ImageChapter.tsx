import Image from "next/image"

interface ImageChapterProps {
  title: string
  images: {
    src: string
    alt: string
  }[]
}

export default function ImageChapter({ images }: ImageChapterProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
