import { getImageProps } from "next/image"
import { cloudinaryImageUrl } from "../cloudinary"

const portraitHeroSrc =
  "v1718299505/homepage3f.jpg"

const landscapeHeroSrc =
  "v1718299505/homepage3a.jpg"

const commonImageProps = {
  alt: "",
  sizes: "100vw",
  quality: 75,
  loading: "eager",
  fetchPriority: "high",
} as const

export default function HeroImage() {
  const {
    props: { srcSet: landscapeSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: landscapeHeroSrc,
    loader: (props) => cloudinaryImageUrl({
      ...props,
      crop: { mode: "crop", width: 1536, height: 864 },
    }),
    width: 1536,
    height: 864,
  })

  const {
    props: { srcSet: portraitSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: portraitHeroSrc,
    width: 1200,
    height: 1800,
  })

  return (
    <picture className="absolute inset-0 block">
      <source
        media="(orientation: landscape), (min-width: 768px)"
        srcSet={landscapeSrcSet}
        sizes="100vw"
      />
      <source srcSet={portraitSrcSet} sizes="100vw" />
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
