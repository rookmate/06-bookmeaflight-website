import PortfolioPage from "../components/PortfolioPage"
import { fashionImages } from "../galleryImages"
import { pageMetadata } from "../siteMetadata"

const description = "Accessories and lifestyle photography, with a focus on texture and detail."

export const metadata = pageMetadata("Fashion | Bookmeaflight", description, "/fashion")

export default function Fashion() {
  return <PortfolioPage title="Fashion" description={description} images={fashionImages} />
}
