import type { GalleryImageData } from "../components/GalleryGrid"
import PortfolioPage from "../components/PortfolioPage"
import { pageMetadata } from "../siteMetadata"

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

const description = "Accessories and lifestyle photography, with a focus on texture and detail."

export const metadata = pageMetadata("Fashion | Bookmeaflight", description, "/fashion")

export default function Fashion() {
  return <PortfolioPage title="Fashion" description={description} images={images} />
}
