import { getImageProps } from "next/image"

const portraitHeroSrc =
  "https://res.cloudinary.com/dnwbkkjpo/image/upload/c_limit,w_1200,q_auto,f_auto/v1718299505/homepage3f.jpg"

const landscapeHeroSrc =
  "https://res.cloudinary.com/dnwbkkjpo/image/upload/c_crop,w_1536,h_864,ar_16:9,g_auto,q_auto,f_auto/v1718299505/homepage3a.jpg"

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
    width: 1536,
    height: 864,
  })

  const { props: portraitProps } = getImageProps({
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
      />
      <img
        {...portraitProps}
        alt=""
        className="hero-photo h-full w-full object-cover"
      />
    </picture>
  )
}
