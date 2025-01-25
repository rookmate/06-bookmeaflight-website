import Image from "next/image";
import { useState } from "react";

interface ImageChapterProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ImageChapter({ images }: ImageChapterProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <ImageWithPlaceholder key={index} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
}

function ImageWithPlaceholder({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="aspect-square relative overflow-hidden rounded-lg">
      <div
        className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${isLoading ? "opacity-100" : "opacity-0"
          }`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
