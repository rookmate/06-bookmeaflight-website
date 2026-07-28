import type { Metadata } from "next"
import GalleryGrid, { type GalleryImageData } from "../components/GalleryGrid"

const cloudinaryBaseURL =
  "https://res.cloudinary.com/dnwbkkjpo/image/upload/c_limit,w_1200,q_auto,f_auto"

const images = [
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-mustard-purse.jpg`,
    alt: "Mustard purse",
  },
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-mustard-purse2.jpg`,
    alt: "Mustard purse",
  },
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-travel-bag.jpg`,
    alt: "Travel bag",
  },
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-travel-bag-wallet.jpg`,
    alt: "Travel bag and wallet",
  },
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-travel-bag-wallet2.jpg`,
    alt: "Travel bag and wallet",
  },
  { src: `${cloudinaryBaseURL}/v1737806061/mp-wallet.jpg`, alt: "Wallet" },
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-red-purse.jpg`,
    alt: "Red purse",
  },
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-red-purse2.jpg`,
    alt: "Red purse",
  },
  {
    src: `${cloudinaryBaseURL}/v1737806061/mp-red-purse3.jpg`,
    alt: "Red purse",
  },
  { src: `${cloudinaryBaseURL}/v1737806061/rings-brand.jpg`, alt: "Rings" },
] satisfies readonly GalleryImageData[]

export const metadata: Metadata = {
  title: "Fashion | Bookmeaflight",
  description: "Objects, texture and styling built for close attention.",
}

export default function Fashion() {
  return (
    <section className="bg-stone-100 py-12" aria-labelledby="fashion-heading">
      <h1 id="fashion-heading" className="sr-only">
        Fashion
      </h1>
      <GalleryGrid images={images} />
    </section>
  )
}
