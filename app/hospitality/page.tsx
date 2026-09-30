import PortfolioPage from "../components/PortfolioPage"
import { hospitalityImages } from "../galleryImages"
import { pageMetadata } from "../siteMetadata"

const description = "Photography of hotels, retreats and wellness spaces."

export const metadata = pageMetadata("Hospitality | Bookmeaflight", description, "/hospitality")

export default function Hospitality() {
  return <PortfolioPage title="Hospitality" description={description} images={hospitalityImages} />
}
