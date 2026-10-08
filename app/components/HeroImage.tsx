import { getImageProps } from "next/image"
import { cloudinaryImageUrl } from "../cloudinary"

const portraitHeroSrc =
  "v1718299505/homepage3f.jpg"

const landscapeHeroSrc =
  "v1718299505/homepage3a.jpg"

const commonImageProps = {
  alt: "",
  sizes: "100vw",
  loading: "eager",
  fetchPriority: "high",
} as const

function heroSources(format: "auto" | "avif" | "jxl") {
  // AVIF preserves the photograph's detail with fewer bytes on dense displays.
  const quality = format === "avif" ? 60 : 75
  const {
    props: { srcSet: landscapeSrcSet },
  } = getImageProps({
    ...commonImageProps,
    quality,
    src: landscapeHeroSrc,
    loader: (props) => cloudinaryImageUrl({
      ...props,
      format,
      crop: { mode: "crop", width: 1536, height: 864 },
    }),
    width: 1536,
    height: 864,
  })

  const {
    props: { srcSet: portraitSrcSet },
  } = getImageProps({
    ...commonImageProps,
    quality,
    src: portraitHeroSrc,
    loader: (props) => cloudinaryImageUrl({ ...props, format }),
    width: 1200,
    height: 1800,
  })

  return { landscapeSrcSet, portraitSrcSet }
}

export default function HeroImage() {
  // Safari already receives a smaller JPEG XL from Cloudinary's automatic format.
  const jxl = heroSources("jxl")
  const avif = heroSources("avif")
  const fallback = heroSources("auto")

  return (
    <picture className="absolute inset-0 block">
      <source
        type="image/jxl"
        media="(orientation: landscape), (min-width: 768px)"
        srcSet={jxl.landscapeSrcSet}
        sizes="100vw"
      />
      <source
        type="image/avif"
        media="(orientation: landscape), (min-width: 768px)"
        srcSet={avif.landscapeSrcSet}
        sizes="100vw"
      />
      <source
        media="(orientation: landscape), (min-width: 768px)"
        srcSet={fallback.landscapeSrcSet}
        sizes="100vw"
      />
      <source type="image/jxl" srcSet={jxl.portraitSrcSet} sizes="100vw" />
      <source type="image/avif" srcSet={avif.portraitSrcSet} sizes="100vw" />
      <source srcSet={fallback.portraitSrcSet} sizes="100vw" />
      <img
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        alt=""
        width={1200}
        height={1800}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="hero-photo h-full w-full object-cover"
      />
    </picture>
  )
}
