import { getImageProps, type ImageLoaderProps } from "next/image"
import { cloudinaryImageUrl } from "./cloudinary"
import type { GalleryImageData } from "./galleryImages"

// Match the gallery's max-w-6xl container, padding, gaps and 2/4/5 columns.
const sizes = [
  "(min-width: 1152px) 201.6px",
  "(min-width: 1024px) calc(20vw - 28.8px)",
  "(min-width: 768px) calc(25vw - 28px)",
  "calc(50vw - 28px)",
].join(", ")

export function galleryThumbnailUrl(props: ImageLoaderProps) {
  return cloudinaryImageUrl({
    ...props,
    crop: { mode: "fill", width: props.width, height: props.width, gravity: "center" },
  })
}

export function galleryThumbnailProps({ src, alt }: Pick<GalleryImageData, "src" | "alt">) {
  return getImageProps({
    src,
    alt,
    fill: true,
    sizes,
    loader: galleryThumbnailUrl,
    className: "object-cover",
  }).props
}
