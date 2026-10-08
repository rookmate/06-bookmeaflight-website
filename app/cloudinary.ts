import type { ImageLoaderProps } from "next/image"

interface CloudinaryImageOptions extends ImageLoaderProps {
  readonly crop?: { readonly mode: "crop" | "fill"; readonly width: number; readonly height: number }
  readonly format?: "auto" | "jpg"
}

// Content stores versioned asset paths. Delivery sizes and crops belong here.
export function cloudinaryImageUrl({
  src,
  width,
  quality = 75,
  crop,
  format = "auto",
}: CloudinaryImageOptions) {
  const cropTransform = crop ? `c_${crop.mode},w_${crop.width},h_${crop.height},g_auto/` : ""
  return `https://res.cloudinary.com/dnwbkkjpo/image/upload/${cropTransform}c_limit,w_${width},q_${quality},f_${format}/${src}`
}

export default cloudinaryImageUrl
